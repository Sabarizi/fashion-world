// File: app/api/send-email/route.ts 
// or:   src/app/api/send-email/route.ts
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

// This is the POST handler for /api/send-email
export async function POST(request: Request) {
  try {
    // 1. Parse incoming JSON body
    const { formData, cart } = await request.json();

    // 2. Validate data
    if (!formData || !cart || cart.length === 0) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 }
      );
    }

    const storeOwnerEmail = process.env.OWNER_EMAIL;
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!storeOwnerEmail || !emailUser || !emailPass) {
      console.error("❌ Environment variables missing!");
      return NextResponse.json(
        { message: "Email configuration error" },
        { status: 500 }
      );
    }

    // 3. Build order summary & email content
    const orderSummary = cart
      .map(
        (item: any) =>
          `${item.title} (x${item.quantity}) - $${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const totalAmount = cart
      .reduce(
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      )
      .toFixed(2);

    const customerEmail = formData.email;

    const customerEmailContent = `
      Hello ${formData.firstName},

      Thank you for your order!We’re excited to have you as a customer and can’t wait for you to receive your items.

      Here’s a summary of your order:

         ${orderSummary}

      Total: $${totalAmount}

      We will Deliver your order soon.
      
     if you have any questions or need help, feel free to reach out to our support team at crafted.fusion.official@gmail.com .
     Thank you again for choosing Crafted Fusion . We hope you love your purchase!
     
     Regards,
       Crafted Fusion Team
    `;

    const ownerEmailContent = `
      New Order Received!

      Customer Details:
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email}
      Phone: ${formData.phone}
      Address: ${formData.address}, ${formData.postalCode}, ${formData.country}

      Order Summary:
      ${orderSummary}

      Total: $${totalAmount}

      Please process the order.
    `;

    // 4. Create transporter and send emails
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // (Optional) Verify SMTP connection
    await transporter.verify();

    // Send email to customer
    await transporter.sendMail({
      from: emailUser,
      to: customerEmail,
      subject: "Order Confirmation - Your Purchase Details",
      text: customerEmailContent,
    });

    // Send email to store owner
    await transporter.sendMail({
      from: emailUser,
      to: storeOwnerEmail,
      subject: "New Order Received",
      text: ownerEmailContent,
    });

    // 5. Return success response as JSON
    return NextResponse.json({ message: "Emails sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Email sending error:", error);
    return NextResponse.json(
      { message: `Failed to send emails: ${error.message}` },
      { status: 500 }
    );
  }
}
