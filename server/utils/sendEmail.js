import nodemailer from "nodemailer";

async function sendEmail(options) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error("Email credentials are not set");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.verify(); // important for debugging

    const mailOptions = {
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: `<p>${options.text}</p>`
    };

    return await transporter.sendMail(mailOptions);
}

export { sendEmail };