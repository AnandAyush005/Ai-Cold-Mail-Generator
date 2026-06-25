import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

async function sendEmail(options) {
  try {
    const mailOptions = {
      from: `"Support" <anandayushcse@gmail.com>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: `<p>${options.text}</p>`,
    };

    console.log(options.to);

    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Email sending failed:", error.message);
    throw error;
  }
}

export { sendEmail };