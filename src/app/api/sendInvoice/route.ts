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

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function generateInvoicePdf({
  logoText = "AR FZC LOGO",
  invoiceNumber = "000001",
  date = "01 January, 2030",
  billedTo,
  billedFrom,
  items,
  paymentMethod = "Cash",
  note = "Thank you for choosing us!",
}: {
  logoText?: string;
  invoiceNumber?: string;
  date?: string;
  billedTo: { name: string; address: string; email: string };
  billedFrom: { name: string; address: string; email: string };
  items: Array<{
    description: string;
    quantity: number;
    amount: number;
    gstPercent?: number;
  }>;
  paymentMethod?: string;
  note?: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 750]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = 700; // Starting y position

  // Header
  page.drawText(logoText, {
    x: 40,
    y,
    size: 12,
    font,
    color: rgb(0.2, 0.2, 0.2),
  });
  page.drawText(`NO. ${invoiceNumber}`, {
    x: 490,
    y,
    size: 12,
    font,
    color: rgb(0.25, 0.25, 0.25),
  });

  // Big INVOICE title
  y -= 40;
  page.drawText("INVOICE", { x: 40, y, size: 38, font: fontBold });

  // Date
  y -= 30;
  page.drawText("Date:", { x: 40, y, size: 12, font: fontBold });
  page.drawText(date, { x: 80, y, size: 12, font });

  // Billed to and From blocks
  y -= 40;
  page.drawText("Billed to:", { x: 40, y, size: 12, font: fontBold });
  page.drawText("From:", { x: 340, y, size: 12, font: fontBold });

  const startY = y - 15;
  page.drawText(billedTo.name, { x: 40, y: startY, size: 11, font });
  page.drawText(billedTo.address, { x: 40, y: startY - 14, size: 11, font });
  page.drawText(billedTo.email, {
    x: 40,
    y: startY - 28,
    size: 11,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  page.drawText(billedFrom.name, { x: 340, y: startY, size: 11, font });
  page.drawText(billedFrom.address, { x: 340, y: startY - 14, size: 11, font });
  page.drawText(billedFrom.email, {
    x: 340,
    y: startY - 28,
    size: 11,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  // Table headers
  y = startY - 55;
  page.drawRectangle({
    x: 40,
    y: y - 5,
    width: 520,
    height: 25,
    color: rgb(0.84, 0.84, 0.86),
  });
  page.drawText("Item", {
    x: 50,
    y: y + 8,
    size: 12,
    font: fontBold,
    color: rgb(0.38, 0.38, 0.38),
  });
  page.drawText("Price", {
    x: 355,
    y: y + 8,
    size: 12,
    font: fontBold,
    color: rgb(0.38, 0.38, 0.38),
  });
  page.drawText("Quantity", {
    x: 260,
    y: y + 8,
    size: 12,
    font: fontBold,
    color: rgb(0.38, 0.38, 0.38),
  });
  page.drawText("GST%", {
    x: 355,
    y: y + 8,
    size: 12,
    font: fontBold,
    color: rgb(0.38, 0.38, 0.38),
  });
  page.drawText("Amount", {
    x: 460,
    y: y + 8,
    size: 12,
    font: fontBold,
    color: rgb(0.38, 0.38, 0.38),
  });

  // Table body
  let total = 0;
  y -= 25;
  for (const item of items) {
    const { description, quantity, amount, gstPercent = 0 } = item;
    const baseTotal = (amount || 0) * (quantity || 0);
    const itemTotal = baseTotal * (1 + gstPercent / 100);
    const pricePerUnit = baseTotal / (quantity || 1);

    page.drawText(description, { x: 50, y, size: 12, font });
    page.drawText(`$${pricePerUnit.toFixed(2)}`, { x: 355, y, size: 12, font });
    page.drawText(String(quantity), { x: 270, y, size: 12, font });
    page.drawText(`${gstPercent}%`, { x: 270, y, size: 12, font });
    page.drawText(`$${itemTotal.toFixed(2)}`, { x: 460, y, size: 12, font });
    y -= 22;
    total += itemTotal;
  }

  // Total line
  y -= 10;
  page.drawLine({
    start: { x: 350, y: y + 5 },
    end: { x: 540, y: y + 5 },
    thickness: 1.5,
    color: rgb(0.7, 0.7, 0.7),
  });
  page.drawText("Total", { x: 355, y: y - 10, size: 13, font: fontBold });
  page.drawText(`$${total.toFixed(2)}`, {
    x: 460,
    y: y - 10,
    size: 13,
    font: fontBold,
  });

  // Payment method and note
  y -= 40;
  page.drawText(`Payment method:  ${paymentMethod}`, {
    x: 40,
    y,
    size: 12,
    font: fontBold,
  });
  y -= 22;
  page.drawText("Note: ", { x: 40, y, size: 12, font: fontBold });
  page.drawText(note, { x: 95, y, size: 12, font });

  return await pdfDoc.save();
}

export async function POST(request: Request) {
  try {
    const doc = await request.json();

    // Fill in the details from your Sanity doc structure
    if (!doc || !doc.invoiceSent) {
      return NextResponse.json(
        { message: "No invoice sent flag found" },
        { status: 400 }
      );
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const pdfBytes = await generateInvoicePdf({
      logoText: "AR FZC LOGO",
      invoiceNumber: "000001", // You can auto-generate this
      date: formattedDate,
      billedTo: {
        name: doc.name,
        address: doc.invoiceDetails?.billingInfo || "",
        email: doc.email,
      },
      billedFrom: {
        name: "Testing POC",
        address: "123 Anywhere St., Any City",
        email: "hello@abc.com",
      },
      items: (doc.invoiceDetails?.items || []).map(
        (item: {
          description: string;
          quantity: number;
          amount: number;
          gstPercent?: number;
        }) => ({
          description: item.description,
          quantity: item.quantity,
          amount: item.amount,
          gstPercent: item.gstPercent ?? 0,
        })
      ),
      paymentMethod: "Cash", // Or from your doc if desired
      note: "Thank you for choosing us!",
    });

    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    const msg = {
      to: doc.email,
      from: "gandhinathan1447@gmail.com", // Verified sender
      subject: "Your Consultation Invoice",
      html: `<p>Hello ${doc.name}, please see your invoice attached.</p>`,
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
