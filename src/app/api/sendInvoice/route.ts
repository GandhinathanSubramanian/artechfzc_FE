// import { NextResponse } from "next/server";
// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export async function POST(request: Request) {
//   try {
//     const doc = await request.json();

//     if (!doc || !doc.invoiceSent) {
//       return NextResponse.json(
//         { message: "No invoice sent flag found" },
//         { status: 400 }
//       );
//     }

//     // Optionally verify webhook secret header:
//     const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
//     const receivedSecret = request.headers.get("x-webhook-secret");
//     if (!receivedSecret || receivedSecret !== webhookSecret) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const msg = {
//       to: doc.email,
//       from: "gandhinathan1447@gmail.com",
//       subject: "Your Consultation Invoice",
//       html: `
//         <h2>Hello ${doc.name},</h2>
//         <p>Thank you for your consultation.</p>
//         <p><strong>Service:</strong> ${doc.serviceName} (${doc.serviceType})</p>
//         <p><strong>Price:</strong> $${doc.invoiceDetails.price}</p>
//         <p><strong>Billing Info:</strong> ${doc.invoiceDetails.billingInfo}</p>
//         <p>Please see attached invoice PDF.</p>
//       `,
//       // attachments: [...] if needed
//     };

//     await sgMail.send(msg);

//     return NextResponse.json({ message: "Invoice email sent" });
//   } catch (error) {
//     console.error("SendInvoice error:", error);
//     return NextResponse.json(
//       { message: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }

import { PDFDocument, StandardFonts } from "pdf-lib";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function generateInvoicePdf({
  name,
  serviceName,
  price,
  billingInfo,
}: {
  name: string;
  serviceName: string;
  price: number;
  billingInfo: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 300]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText("Invoice", { x: 160, y: 280, size: 20, font });
  page.drawText(`Name: ${name}`, { x: 20, y: 250, size: 12, font });
  page.drawText(`Service: ${serviceName}`, { x: 20, y: 230, size: 12, font });
  page.drawText(`Price: $${price}`, { x: 20, y: 210, size: 12, font });
  page.drawText(`Billing Info:`, { x: 20, y: 190, size: 12, font });
  page.drawText(billingInfo, { x: 20, y: 170, size: 12, font });

  return await pdfDoc.save();
}

export async function POST(request: Request) {
  try {
    const doc = await request.json();

    if (!doc || !doc.invoiceSent) {
      return NextResponse.json(
        { message: "No invoice sent flag found" },
        { status: 400 }
      );
    }

    const pdfBytes = await generateInvoicePdf({
      name: doc.name,
      serviceName: doc.serviceName,
      price: doc.invoiceDetails.price,
      billingInfo: doc.invoiceDetails.billingInfo,
    });

    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

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
      attachments: [
        {
          content: pdfBase64,
          filename: "invoice.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "Invoice email sent with PDF" });
  } catch (error) {
    console.error("SendInvoice error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
