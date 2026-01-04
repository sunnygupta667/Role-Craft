// backend/utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // Create transporter (Use your Gmail or SMTP service)
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use host/port for other providers
    auth: {
      user: process.env.EMAIL_USERNAME, // Add to .env
      pass: process.env.EMAIL_PASSWORD, // Add to .env (Use App Password for Gmail)
    },
  });

  const message = {
    from: `RoleCraft Security <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(message);
};

export default sendEmail;

