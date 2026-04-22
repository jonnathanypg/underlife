import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendNotification, notifyAdmin } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, email, firstName, lastName, donorType, method, comments } = body;

    // 1. Validate inputs
    if (!amount || !email || !firstName) {
      return NextResponse.json({ error: 'Faltan campos de donación obligatorios' }, { status: 400 });
    }

    // 2. Register Donation in Database (PENDING)
    const newDonation = await prisma.donation.create({
      data: {
        amount: parseFloat(amount),
        email,
        firstName,
        lastName: lastName || '',
        donorType,
        method,
        comment: comments,
        status: 'PENDING',
      },
    });

    // 3. Initiate Payment Gateway Session
    let paymentUrl = '';
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    if (method === 'paypal') {
      const paypalId = process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_ID;
      const paypalSecret = process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_SECRET;
      const paypalMode = process.env.PAYPAL_MODE || 'sandbox'; 
      const baseUrl = paypalMode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

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
      
      if (!tokenData.access_token) throw new Error('Error al autenticar con PayPal');

      // 2. Create PayPal Order
      const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData.access_token}`
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{
            reference_id: newDonation.id,
            amount: { currency_code: 'USD', value: amount.toString() },
            description: `Donación a Fundación Underlife (${donorType})`
          }],
          application_context: {
            brand_name: 'Fundación Underlife',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `${origin}/en?success=true&provider=paypal`,
            cancel_url: `${origin}/en`
          }
        }),
      });
      const orderData = await orderRes.json();
      const approveLink = orderData.links?.find((link: any) => link.rel === 'approve');
      
      if (!approveLink) throw new Error('Error al crear orden en PayPal');
      paymentUrl = approveLink.href;

    } else {
      // dLocal Go Implementation
      const dlocalApiKey = process.env.DLOCAL_API_KEY;
      const dlocalApiSecret = process.env.DLOCAL_API_SECRET;
      const webhookUrl = process.env.DLOCAL_WEBHOOK_URL; 
      
      // La API v1 de dLocal Go usa este endpoint unificado independiente del sandbox/live a veces, 
      // pero respetaremos si asignaron una variable manual
      const dlocalBaseUrl = 'https://api.dlocalgo.com/v1/payments';

      const dlocalRes = await fetch(dlocalBaseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dlocalApiKey}:${dlocalApiSecret}`
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'USD',
          country: 'EC', // Default a Ecuador para Underlife 
          description: `Donación a Fundación Underlife`,
          success_url: `${origin}/en?success=true&provider=dlocal`,
          back_url: `${origin}/en`,
          notification_url: `${webhookUrl}/api/donations/webhook`
        })
      });
      
      const dlocalData = await dlocalRes.json();
      if (!dlocalData.redirect_url) {
        console.error('dLocal Go Error:', dlocalData);
        throw new Error('Error al crear el link de pago en dLocal Go');
      }
      paymentUrl = dlocalData.redirect_url;
    }

    // 4. Send Notification to Admin about intended donation
    await notifyAdmin(
      `Intento de Donación: $${amount}`,
      `Se ha iniciado un proceso de donación.\n\nDonante: ${firstName} ${lastName}\nEmail: ${email}\nMonto: $${amount}\nMétodo: ${method}\nID Transacción Interna: ${newDonation.id}`
    );

    return NextResponse.json({ success: true, paymentUrl, donationId: newDonation.id });
  } catch (error) {
    console.error('Error in Donations API:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
