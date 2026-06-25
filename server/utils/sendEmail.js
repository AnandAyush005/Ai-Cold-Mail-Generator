import nodemailer from "nodemailer"

async function sendEmail(options) {

    try{

        if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS){
            throw new Error("Email credentials are not set in any environment variable")
        }

        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        })

        const mailoptions = {
            from : `"Support" <${process.env.EMAIL_USER}>`,
            to : options.to,
            subject : options.subject,
            text : options.text,
            html : `<p>${options.text}</p>`
        }

        await transporter.sendMail(mailoptions);
        

    }
    catch(e){

        console.log(e);

        
    }
}

export {
    sendEmail
}