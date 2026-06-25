    import nodemailer from "nodemailer";

    async function sendEmail(options) {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error("Email credentials are not set");
        }



        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER, // Brevo login
                pass: process.env.EMAIL_PASS  // Brevo SMTP key
            }
        });

        const mailOptions = {
            from: '"Support" <anandayushcse@gmail.com>',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: `<p>${options.text}</p>`
        };

        const info = await transporter.sendMail(mailOptions);
        
        return info;
    }

    export { sendEmail };