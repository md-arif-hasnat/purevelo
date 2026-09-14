import { NextResponse } from 'next/server';

function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const company = clean(body.company, 160);
    const email = clean(body.email, 180);
    const phone = clean(body.phone, 80);
    const country = clean(body.country, 100);
    const businessType = clean(body.businessType, 100);
    const message = clean(body.message, 3000);

    if (!name || !company || !email || !message) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || 'PureVelo Website <onboarding@resend.dev>';

    if (!apiKey || !to) {
      return NextResponse.json({ error: 'Contact email service is not configured yet.' }, { status: 503 });
    }

    const text = [
      `New PureVelo business enquiry`,
      ``,
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${phone || '-'}`,
      `Country: ${country || '-'}`,
      `Business type: ${businessType || '-'}`,
      ``,
      `Message:`,
      message,
    ].join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `PureVelo enquiry — ${company}`,
        text,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error('Resend error:', response.status, details);
      return NextResponse.json({ error: 'Email delivery failed. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
