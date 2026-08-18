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
    const paymentMethod = method === 'googlepay' ? 'googlepay' : (method === 'paypal' ? 'paypal' : (method === 'cash' || method === 'efectivo' ? 'cash' : 'dlocal'));
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
            status: paymentMethod === 'googlepay' ? 'COMPLETED' : (paymentMethod === 'cash' ? 'PENDING_CASH' : 'PENDING'),
          },
        });
        donationId = newDonation.id;
      } catch (dbError) {
        console.warn('[Donations API] DB storage bypassed (offline or unavailable):', dbError);
      }
    }

    if (paymentMethod === 'cash') {
      try {
        await notifyAdmin(
          `Nueva Donación en Efectivo por Coordinar: $${parsedAmount} USD (${donorFirstName})`,
          `Se ha registrado una solicitud de donación en efectivo para coordinación directa.\n\nDonante: ${donorFirstName} ${donorLastName}\nEmail: ${donorEmail}\nTeléfono: ${phone || 'N/A'}\nMonto: $${parsedAmount} USD\nID: ${donationId}`
        );
      } catch (mailErr) {
        console.warn('[Donations API] Mail notify error:', mailErr);
      }

      return NextResponse.json({
        success: true,
        orderId: donationId,
        paymentUrl: '',
        donationId,
        amount: parsedAmount,
        isCash: true,
      });
    }

    // 3. Initiate Payment Gateway Session (or direct PayPal donation URL fallback)
    let paymentUrl = '';

    const paypalId = process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_ID;
    const paypalSecret = process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET;
    const paypalMode = process.env.PAYPAL_MODE || 'live';
    const baseUrl = paypalMode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

    let orderId = '';

    // Helper function to create PayPal dynamic Order
    const createPayPalOrder = async (isGuestCard: boolean) => {
      if (!paypalId || !paypalSecret) return null;
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
          // 2. Create PayPal Order (landing_page: BILLING forces Guest Card checkout)
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
                description: `Donación a Fundación Underlife (${donorFirstName})`,
              }],
              application_context: {
                brand_name: 'Fundación Underlife',
                landing_page: isGuestCard ? 'BILLING' : 'NO_PREFERENCE',
                user_action: 'PAY_NOW',
                return_url: `${origin}/?success=true&provider=${isGuestCard ? 'card' : 'paypal'}&donationId=${donationId}&amount=${parsedAmount}`,
                cancel_url: `${origin}/?canceled=true#donar`,
              },
            }),
          });
          const orderData = await orderRes.json();
          const approveLink = orderData.links?.find((link: any) => link.rel === 'approve');
          return {
            orderId: orderData.id || '',
            paymentUrl: approveLink?.href || '',
          };
        }
      } catch (paypalApiErr) {
        console.warn('[Donations API] PayPal dynamic session error:', paypalApiErr);
      }
      return null;
    };

    if (paymentMethod === 'googlepay') {
      paymentUrl = `${origin}/?success=true&provider=googlepay&donationId=${donationId}&amount=${parsedAmount}`;
    } else if (paymentMethod === 'paypal') {
      // 1. Try PayPal dynamic order
      const paypalOrder = await createPayPalOrder(false);
      if (paypalOrder) {
        orderId = paypalOrder.orderId;
        paymentUrl = paypalOrder.paymentUrl;
      }

      // 2. Fallback to direct PayPal URL
      if (!paymentUrl) {
        paymentUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@fundacionunderlife.org&currency_code=USD&amount=${parsedAmount}&item_name=Donacion+Fundacion+Underlife&no_shipping=1&no_note=1&return=${encodeURIComponent(origin + '/?success=true&provider=paypal&donationId=' + donationId)}&cancel_return=${encodeURIComponent(origin + '/?canceled=true#donar')}`;
      }
    } else {
      // paymentMethod === 'dlocal' (Tarjeta de Crédito / Débito)
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
              success_url: `${origin}/?success=true&provider=card&donationId=${donationId}&amount=${parsedAmount}`,
              back_url: `${origin}/?canceled=true#donar`,
              notification_url: `${webhookUrl}/api/donations/webhook`,
            }),
          });
          const dlocalData = await dlocalRes.json();
          if (dlocalData.redirect_url) {
            paymentUrl = dlocalData.redirect_url;
          }
        } catch (dlocalErr) {
          console.warn('[Donations API] dLocal Go API error:', dlocalErr);
        }
      }

      // If dLocal is not active, process with PayPal Guest Card Checkout (landing_page: BILLING)
      if (!paymentUrl) {
        const cardOrder = await createPayPalOrder(true);
        if (cardOrder) {
          orderId = cardOrder.orderId;
          paymentUrl = cardOrder.paymentUrl;
        }
      }

      // If dynamic order fails, use fallback with solution_type=sole & landing_page=billing
      if (!paymentUrl) {
        paymentUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@fundacionunderlife.org&currency_code=USD&amount=${parsedAmount}&item_name=Donacion+Fundacion+Underlife&no_shipping=1&no_note=1&solution_type=sole&landing_page=billing&return=${encodeURIComponent(origin + '/?success=true&provider=card&donationId=' + donationId)}&cancel_return=${encodeURIComponent(origin + '/?canceled=true#donar')}`;
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
      orderId,
      paymentUrl,
      donationId,
      amount: parsedAmount,
    });
  } catch (error) {
    console.error('Error in Donations API:', error);
    // Even in unexpected top-level errors, return safe direct PayPal checkout fallback
    return NextResponse.json({
      success: true,
      paymentUrl: 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=info@fundacionunderlife.org&currency_code=USD&amount=20&item_name=Donacion+Fundacion+Underlife&no_shipping=1',
      donationId: `UL-DON-${Date.now()}`,
    });
  }
}
