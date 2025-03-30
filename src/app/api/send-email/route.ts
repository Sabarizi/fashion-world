import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

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

    // 3. Calculate order summary and total
    const totalAmount = cart
      .reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
      .toFixed(2);

    // Build HTML rows for the order table
    const orderRows = cart
      .map(
        (item: any) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.Id}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.title}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `
      )
      .join("");

    // 4. Create the HTML content for the customer email
    const customerEmailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Hello <strong>${formData.firstName}</strong>,</p>

        <p>Thank you for your order! We are excited to have you as a customer and can’t wait for you to receive your items.</p>

        <h3 style="margin-bottom: 0;">Here’s a summary of your order:</h3>
        <table style="border-collapse: collapse; width: 100%; margin-top: 8px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px;">Item ID</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Title</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderRows}
          </tbody>
        </table>

        <p><strong>Total Price:</strong> $${totalAmount}</p>

        <p>
          We will deliver your order soon. If you have any questions or need help, 
          feel free to reach out to our support team at
          <a href="mailto:crafted.fusion.official@gmail.com">crafted.fusion.official@gmail.com</a>.
        </p>

        <p>
          Thank you again for choosing <strong>Crafted Fusion</strong>.
          We hope you love your purchase!
        </p>

        <p>Regards,<br/>
          Crafted Fusion Team
        </p>
      </div>
    `;

    // 5. Create the HTML content for the owner email
    const ownerEmailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>New Order Received!</h2>

        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Address:</strong> ${formData.address}, ${formData.postalCode}, ${formData.country}</p>

        <h3>Order Summary:</h3>
        <table style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px;">Item ID</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Title</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${orderRows}
          </tbody>
        </table>

        <p><strong>Total:</strong> $${totalAmount}</p>
        <p>Please process the order.</p>
      </div>
    `;

    // 6. Create transporter and send emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // (Optional) Verify SMTP connection
    await transporter.verify();

    // Send email to customer (HTML instead of text)
    await transporter.sendMail({
      from: emailUser,
      to: formData.email,
      subject: "Order Confirmation - Your Purchase Details",
      html: customerEmailContent,
    });

    // Send email to store owner (HTML instead of text)
    await transporter.sendMail({
      from: emailUser,
      to: storeOwnerEmail,
      subject: "New Order Received",
      html: ownerEmailContent,
    });

    // 7. Return success response as JSON
    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Email sending error:", error);
    return NextResponse.json(
      { message: `Failed to send emails: ${error.message}` },
      { status: 500 }
    );
  }
}
