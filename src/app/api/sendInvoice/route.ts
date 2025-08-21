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

import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

function getInvoiceHtml({
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
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Invoice</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; }
        .header, .footer { text-align: center; margin-bottom: 40px; }
        .invoice-details { margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f5f5f5; }
        .total { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Invoice</h1>
        <p>Your Company<br/>1234 Your Street<br/>City, State ZIP<br/>Phone: 555-555-5555</p>
      </div>
      <div class="invoice-details">
        <strong>Billed To:</strong><br/>
        ${name}<br/>
        Billing Info: ${billingInfo}<br/><br/>
        <strong>Service:</strong> ${serviceName}<br/>
        <strong>Price:</strong> $${price.toFixed(2)}<br/>
      </div>
      <table>
        <thead>
          <tr><th>Description</th><th>Amount</th></tr>
        </thead>
        <tbody>
          <tr><td>${serviceName}</td><td>$${price.toFixed(2)}</td></tr>
        </tbody>
        <tfoot>
          <tr><td class="total">Total</td><td class="total">$${price.toFixed(
            2
          )}</td></tr>
        </tfoot>
      </table>
      <div class="footer">
        <p>Thank you for your business!</p>
      </div>
    </body>
  </html>
  `;
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

    // Launch Puppeteer with chrome-aws-lambda for Vercel compatibility
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Generate HTML invoice
    const html = getInvoiceHtml({
      name: doc.name,
      serviceName: doc.serviceName,
      price: doc.invoiceDetails.price,
      billingInfo: doc.invoiceDetails.billingInfo,
    });

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({ format: "a4", printBackground: true });

    await browser.close();

    const pdfBase64 = pdfBuffer.toString("base64");

    const msg = {
      to: doc.email,
      from: "gandhinathan1447@gmail.com",
      subject: "Your Consultation Invoice",
      html: `
        <h2>Hello ${doc.name},</h2>
        <p>Thank you for your consultation.</p>
        <p>Please find your invoice attached.</p>
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
