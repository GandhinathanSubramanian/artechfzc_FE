import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  try {
    const doc = await request.json();

    if (!doc || !doc.invoiceSent) {
      return NextResponse.json(
        { message: "No invoice sent flag found" },
        { status: 400 }
      );
    }

    // Optionally verify webhook secret header:
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
    const receivedSecret = request.headers.get("x-webhook-secret");
    if (!receivedSecret || receivedSecret !== webhookSecret) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const msg = {
      to: doc.email,
      from: "gandhinathan1447@gmail.com",
      subject: "Your Consultation Invoice",
      html: `
        <h2>Hello ${doc.name},</h2>
        <p>Thank you for your consultation.</p>
        <p><strong>Service:</strong> ${doc.serviceName} (${doc.serviceType})</p>
        <p><strong>Price:</strong> $${doc.invoiceDetails.price}</p>
        <p><strong>Billing Info:</strong> ${doc.invoiceDetails.billingInfo}</p>
        <p>Please see attached invoice PDF.</p>
      `,
      // attachments: [...] if needed
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "Invoice email sent" });
  } catch (error) {
    console.error("SendInvoice error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
