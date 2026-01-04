import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. Debug Logs
  console.log("Processing email request...");
  console.log("To:", options.email);

  // 2. Clean variables
  const user = process.env.EMAIL_USERNAME
    ? process.env.EMAIL_USERNAME.trim()
    : "";
  const pass = process.env.EMAIL_PASSWORD
    ? process.env.EMAIL_PASSWORD.trim()
    : "";

  // 3. Create Transporter with EXPLICIT settings
  // Port 465 (SSL) is more reliable on Render than the default
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass,
    },
    // Fix for some cloud timeouts:
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    socketTimeout: 10000, // 10 seconds
  });

  try {
    // 4. Verify connection before sending
    await transporter.verify();
    console.log("SMTP Connection verified.");

    const info = await transporter.sendMail({
      from: `RoleCraft Security <${user}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    });

    console.log("✅ Email sent successfully. ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ CRITICAL EMAIL ERROR:", error.message);
    if (error.code === "EAUTH") {
      console.error(
        "--> Your Email/Password is incorrect. Check Render Environment Variables."
      );
    }
    // Re-throw so the frontend knows it failed
    throw error;
  }
};

export default sendEmail;
