import nodemailer from 'nodemailer'

const mailSender = async(email,title,body)=>{
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        })
        let info = transporter.sendMail({
            from: 'Coder Camp || Md Ajhar Alam',
            to:`${email}`,
            subject:`${title}`,
            body:`${body}`
        })
        console.log(info)
        return info;
    } catch (error) {
        console.log(error.message)
    }
}

export default mailSender