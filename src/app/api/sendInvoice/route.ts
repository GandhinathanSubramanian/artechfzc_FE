// // import type { NextApiRequest, NextApiResponse } from "next";
// // import sgMail from "@sendgrid/mail";

// // sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// // export default async function handler(
// //   req: NextApiRequest,
// //   res: NextApiResponse
// // ) {
// //   if (req.method !== "POST")
// //     return res.status(405).json({ message: "Method not allowed" });

// //   const doc = req.body; // Check webhook payload has updated document and invoiceSent is true

// //   if (!doc || !doc.invoiceSent) {
// //     return res.status(400).json({ message: "No invoice sent flag found" });
// //   }

// //   try {
// //     // Compose email using doc data
// //     const msg = {
// //       to: doc.email,
// //       from: "no-reply@yourcompany.com",
// //       subject: "Your Consultation Invoice",
// //       html: `
// //             <h2>Hello ${doc.name},</h2>
// //             <p>Thank you for your consultation.</p>
// //             <p><strong>Service:</strong> ${doc.serviceName} (${doc.serviceType})</p>
// //             <p><strong>Price:</strong> $${doc.invoiceDetails.price}</p>
// //             <p><strong>Billing Info:</strong> ${doc.invoiceDetails.billingInfo}</p>
// //             <p>Please see attached invoice PDF.</p>
// //             `, // Optionally attach generated PDF here (see Step 3)
// //     };

// //     await sgMail.send(msg);

// //     return res.status(200).json({ message: "Invoice email sent" });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({ message: "Failed to send email" });
// //   }
// // }

// import type { NextApiRequest, NextApiResponse } from "next";
// import sgMail from "@sendgrid/mail";

// // Set SendGrid API key from env
// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Allow only POST method
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   // Verify webhook secret header
//   const webhookSecret = process.env.SANITY_WEBHOOK_SECRET;
//   const receivedSecret = req.headers["x-webhook-secret"];

//   if (!receivedSecret || receivedSecret !== webhookSecret) {
//     return res
//       .status(401)
//       .json({ message: "Unauthorized: Invalid webhook secret" });
//   }

//   const doc = req.body;

//   // Ensure payload includes invoiceSent=true to send email
//   if (!doc || !doc.invoiceSent) {
//     return res
//       .status(400)
//       .json({ message: "Invalid payload: invoiceSent flag missing or false" });
//   }

//   try {
//     // Compose email using data from Sanity document
//     const msg = {
//       to: doc.email,
//       from: "gandhinathan1447@gmail.com", // Use your verified domain/email in SendGrid
//       subject: "Your Consultation Invoice",
//       html: `
//         <h2>Hello ${doc.name},</h2>
//         <p>Thank you for your consultation.</p>
//         <p><strong>Service:</strong> ${doc.serviceName} (${doc.serviceType})</p>
//         <p><strong>Price:</strong> $${doc.invoiceDetails.price}</p>
//         <p><strong>Billing Info:</strong> ${doc.invoiceDetails.billingInfo}</p>
//         <p>Please find your attached invoice PDF.</p>
//       `,
//       // Optionally add attachments here for PDF invoice
//       // attachments: [{ content: doc.invoicePdfBase64, filename: 'invoice.pdf', type: 'application/pdf', disposition: 'attachment' }]
//     };

//     await sgMail.send(msg);

//     return res.status(200).json({ message: "Invoice email sent successfully" });
//   } catch (error) {
//     console.error("SendGrid email error:", error);
//     return res.status(500).json({ message: "Failed to send email" });
//   }
// }
