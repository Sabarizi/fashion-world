import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // 1. Create a transporter with your email credentials.
    //    For example, using Gmail SMTP or any other service.
    //    If your credentials are stored in .env, retrieve them via process.env.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g. "myaddress@gmail.com"
        pass: process.env.EMAIL_PASS, // e.g. "mySuperSecretAppPassword"
      },
    });

    // 2. Define the email details.
    const mailOptions = {
      from: email, // the user's email (or your own, if you prefer)
      to: "crafted.fusion.official@gmail.com", // the owner email address
      subject: subject || "New Contact Form Submission",
      text: `Name: ${name}
Email: ${email}

Message:
${message}`,
    };

    // 3. Send the email
    await transporter.sendMail(mailOptions);

    // 4. Return success response
    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
