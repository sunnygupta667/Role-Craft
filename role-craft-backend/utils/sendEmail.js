// // backend/utils/sendEmail.js
// import nodemailer from "nodemailer";

// const sendEmail = async (options) => {
//   // Create transporter (Use your Gmail or SMTP service)
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or use host/port for other providers
//     auth: {
//       user: process.env.EMAIL_USERNAME, // Add to .env
//       pass: process.env.EMAIL_PASSWORD, // Add to .env (Use App Password for Gmail)
//     },
//   });

//   const message = {
//     from: `RoleCraft Security <${process.env.EMAIL_USERNAME}>`,
//     to: options.email,
//     subject: options.subject,
//     html: options.message,
//   };

//   await transporter.sendMail(message);
// };

// export default sendEmail;


import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  // 1. Log (hidden password) to verify variables are loaded
  console.log("Attempting to send email...");
  console.log("User:", process.env.EMAIL_USERNAME);
  console.log(
    "Password Length:",
    process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : "MISSING"
  );

  // 2. Force Trim (Removes accidental spaces)
  const user = process.env.EMAIL_USERNAME
    ? process.env.EMAIL_USERNAME.trim()
    : "";
  const pass = process.env.EMAIL_PASSWORD
    ? process.env.EMAIL_PASSWORD.trim()
    : "";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  // 3. Send and Catch specific error
  try {
    const info = await transporter.sendMail({
      from: `RoleCraft Security <${user}>`,
      to: options.email,
      subject: options.subject,
      html: options.message,
    });
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("CRITICAL EMAIL ERROR:", error);
    // This will show the REAL reason in Render Logs
    throw error;
  }
};

export default sendEmail;