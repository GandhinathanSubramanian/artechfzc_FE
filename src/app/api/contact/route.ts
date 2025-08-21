import sgMail from "@sendgrid/mail";
import { NextRequest, NextResponse } from "next/server";

import { sanityClient } from "@/lib/sanity";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
      );
    }

    const body = (await request.json()) as ContactFormData;
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const msg = {
      to: "gandhinathan1447@gmail.com", // Your inbox to receive contact form messages
      from: "gandhinathan1447@gmail.com", // Verified email you control and set up in SendGrid
      replyTo: email, // The visitor’s email from form submission
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    };

    await sgMail.send(msg);

    // Optional: save submission to Sanity
    await sanityClient.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    );
  }
}
