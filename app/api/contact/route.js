import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Your Resend client initialization is correct and does not need to change
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      // ✅ FIX 1: Change the 'from' address to use your verified domain.
      // The name "Website Inquiry" is what the recipient sees.
      from: 'Website Inquiry <noreply@eaglestribemc.com>',

      // ✅ FIX 2: Change the 'to' address to your desired admin inbox.
      to: ['admin@eaglestribemc.com'],
      
      // This correctly sets the "Reply-To" header so when you click "Reply"
      // in your email client, it will reply to the person who filled out the form.
      reply_to: email, 
      
      subject: `New Message from ${name} via Website`,
      html: `
        <p>You have a new message from your website contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
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