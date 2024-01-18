import nodemailer from "nodemailer"
import { asyncHandler } from "../utils/asyncHandler.js"

const sendEmail = asyncHandler(async ({email,subject,message})=>{

    const transporter = nodemailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD
        },
        service:process.env.SMPT_SERVER
    })

    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:email,
        subject:subject,
        text:message
    }

    await transporter.sendMail(mailOptions)
})

export {sendEmail}