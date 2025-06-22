import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, countryCode, mobileNumber } = body;

    if (!name || !email || !message || !countryCode || !mobileNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const fullPhoneNumber = `${countryCode} ${mobileNumber}`;

    const { data, error } = await resend.emails.send({
      from: 'Website Inquiry <noreply@eaglestribemc.com>',
      to: ['admin@eaglestribemc.com'],
      reply_to: email, 
      subject: `New Message from ${name} via Website`,
      html: `
        <p>You have a new message from your website contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${fullPhoneNumber}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `, // ✅ FIX: The incorrect comment line has been removed from the HTML string.
    });

    if (error) {
      console.error({ error });
      return NextResponse.json({ error: 'Error sending email.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}