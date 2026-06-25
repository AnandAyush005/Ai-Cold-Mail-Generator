import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

async function sendEmail(options) {
    try {
        const mailOptions = {
            from: '"Support" <anandayushcse@gmail.com>',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: `<p>${options.text}</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Mail sent:", info.messageId);

        return info;
    } catch (error) {
        console.log("Email sending failed:", error);
        throw error;
    }
}

export { sendEmail };