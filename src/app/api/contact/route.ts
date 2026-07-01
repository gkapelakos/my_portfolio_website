import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn(
        'Warning: RESEND_API_KEY environment variable is not defined. Email submission was simulated.'
      );
      // Fallback response for development/unconfigured environments
      return NextResponse.json(
        { 
          success: true, 
          message: 'Message simulation successful. Please configure RESEND_API_KEY to send actual emails.' 
        },
        { status: 200 }
      );
    }

    // Call Resend REST API directly
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev',
        to: 'johnkapelakos5@gmail.com',
        subject: `New Portfolio Enquiry from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; rounded: 8px;">
            <h2 style="color: #111; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Website Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin-top: 15px; white-space: pre-wrap;">
              ${message}
            </div>
            <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
            <p style="font-size: 11px; color: #888;">This email was sent automatically from your portfolio website's contact form.</p>
          </div>
        `,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send message via email provider.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact Form Route Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
