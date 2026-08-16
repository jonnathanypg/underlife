import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyAdmin } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, email, firstName, lastName, donorType, method, comments, phone, documentId } = body;

    // 1. Validate & sanitize inputs
    const parsedAmount = Math.max(1, parseFloat(amount) || 20);
    const donorFirstName = (firstName && String(firstName).trim()) || (donorType === 'anonymous' ? 'Donante Anónimo' : 'Amigo de Underlife');
    const donorLastName = (lastName && String(lastName).trim()) || '';
    const donorEmail = (email && String(email).trim()) || (donorType === 'anonymous' ? 'anonimo@fundacionunderlife.org' : 'donaciones@fundacionunderlife.org');
    const paymentMethod = method === 'googlepay' ? 'googlepay' : (method === 'paypal' ? 'paypal' : 'dlocal');
    const origin = req.headers.get('origin') || 'https://fundacionunderlife.org';

    // 2. Register Donation in Database (with safe offline fallback)
    let donationId = `UL-DON-${Date.now()}`;
    const dbUrl = process.env.DATABASE_URL?.trim();
    const hasRealDatabase = Boolean(
      dbUrl &&
      dbUrl.length > 15 &&
      !dbUrl.includes('user:password') &&
      !dbUrl.includes('localhost:3306/underlife') &&
      (dbUrl.startsWith('mysql://') || dbUrl.startsWith('postgresql://'))
    );

    if (hasRealDatabase) {
      try {
        const newDonation = await prisma.donation.create({
          data: {
            amount: parsedAmount,
            email: donorEmail,
            firstName: donorFirstName,
            lastName: donorLastName,
            donorType: donorType || 'personal',
            method: paymentMethod,
            comment: comments || (phone ? `Tel: ${phone} | Doc: ${documentId || 'N/A'}` : null),
            status: paymentMethod === 'googlepay' ? 'COMPLETED' : 'PENDING',
          },
        });
        donationId = newDonation.id;
      } catch (dbError) {
        console.warn('[Donations API] DB storage bypassed (offline or unavailable):', dbError);
      }
    }

    // 3. Initiate Payment Gateway Session (or direct PayPal donation URL fallback)
    let paymentUrl = '';

    if (paymentMethod === 'googlepay') {
      paymentUrl = `${origin}/es?success=true&provider=googlepay&donationId=${donationId}&amount=${parsedAmount}`;
    } else if (paymentMethod === 'paypal') {
      const paypalId = process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_ID;
      const paypalSecret = process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET;
      const paypalMode = process.env.PAYPAL_MODE || 'live';
      const baseUrl = paypalMode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

      if (paypalId && paypalSecret) {
        try {
          // 1. Get PayPal Access Token
          const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Accept-Language': 'en_US',
              'Authorization': `Basic ${Buffer.from(paypalId + ':' + paypalSecret).toString('base64')}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials',
          });
          const tokenData = await tokenRes.json();

          if (tokenData.access_token) {
            // 2. Create PayPal Order
            const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenData.access_token}`,
              },
              body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                  reference_id: donationId,
                  amount: { currency_code: 'USD', value: parsedAmount.toFixed(2) },
                  description: `Donación a Fundación Underlife (${donorType || 'Aporte Social'})`,
                }],
                application_context: {
                  brand_name: 'Fundación Underlife',
                  landing_page: 'NO_PREFERENCE',
                  user_action: 'PAY_NOW',
                  return_url: `${origin}/es?success=true&provider=paypal&donationId=${donationId}`,
                  cancel_url: `${origin}/es#donar`,
                },
              }),
            });
            const orderData = await orderRes.json();
            const approveLink = orderData.links?.find((link: any) => link.rel === 'approve');
            if (approveLink?.href) {
              paymentUrl = approveLink.href;
            }
          }
        } catch (paypalApiErr) {
          console.warn('[Donations API] PayPal dynamic session error, falling back to direct URL:', paypalApiErr);
        }
      }

      // If dynamic order wasn't created, use the direct official PayPal checkout URL
      if (!paymentUrl) {
        paymentUrl = `https://www.paypal.com/donate?business=info@fundacionunderlife.org&currency_code=USD&amount=${parsedAmount}&item_name=Donacion+Fundacion+Underlife`;
      }

    } else {
      // dLocal Go Implementation (Cards / Local Payment in Ecuador)
      const dlocalApiKey = process.env.DLOCAL_API_KEY;
      const dlocalApiSecret = process.env.DLOCAL_API_SECRET;
      const webhookUrl = process.env.DLOCAL_WEBHOOK_URL || origin;

      if (dlocalApiKey && dlocalApiSecret) {
        try {
          const dlocalBaseUrl = 'https://api.dlocalgo.com/v1/payments';
          const dlocalRes = await fetch(dlocalBaseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${dlocalApiKey}:${dlocalApiSecret}`,
            },
            body: JSON.stringify({
              amount: parsedAmount,
              currency: 'USD',
              country: 'EC',
              description: `Donación a Fundación Underlife (${donorFirstName})`,
              success_url: `${origin}/es?success=true&provider=dlocal&donationId=${donationId}`,
              back_url: `${origin}/es#donar`,
              notification_url: `${webhookUrl}/api/donations/webhook`,
            }),
          });
          const dlocalData = await dlocalRes.json();
          if (dlocalData.redirect_url) {
            paymentUrl = dlocalData.redirect_url;
          }
        } catch (dlocalErr) {
          console.warn('[Donations API] dLocal Go API error, falling back to direct payment:', dlocalErr);
        }
      }

      // If dLocal credentials are not configured or failed, use secure PayPal direct checkout
      if (!paymentUrl) {
        paymentUrl = `https://www.paypal.com/donate?business=info@fundacionunderlife.org&currency_code=USD&amount=${parsedAmount}&item_name=Donacion+Fundacion+Underlife`;
      }
    }

    // 4. Send Notification to Admin (non-blocking)
    try {
      await notifyAdmin(
        `Donación Iniciada: $${parsedAmount} USD (${donorType})`,
        `Se ha iniciado un proceso de donación.\n\nDonante: ${donorFirstName} ${donorLastName}\nEmail: ${donorEmail}\nMonto: $${parsedAmount} USD\nMétodo: ${paymentMethod}\nID Transacción: ${donationId}`
      );
    } catch (mailErr) {
      console.warn('[Donations API] Mail notify error:', mailErr);
    }

    return NextResponse.json({
      success: true,
      paymentUrl,
      donationId,
      amount: parsedAmount,
    });
  } catch (error) {
    console.error('Error in Donations API:', error);
    // Even in unexpected top-level errors, return safe direct PayPal checkout fallback
    return NextResponse.json({
      success: true,
      paymentUrl: 'https://www.paypal.com/donate?business=info@fundacionunderlife.org&currency_code=USD&amount=20&item_name=Donacion+Fundacion+Underlife',
      donationId: `UL-DON-${Date.now()}`,
    });
  }
}
