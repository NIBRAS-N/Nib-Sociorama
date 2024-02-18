import nodemailer from "nodemailer"
import { asyncHandler } from "../utils/asyncHandler.js"

const sendEmail = asyncHandler(async ({email,subject,message})=>{
    // trvq zgin wnzu wkus
    const transporter = nodemailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        auth:{
            user:process.env.SMPT_MAIL,
            // user: process.env.USER_MAIl,
            pass:process.env.SMPT_PASSWORD
            // pass: process.env.USER_PASS
        },
        // service:process.env.SMPT_SERVER
    })
    // console.log(email)
    const mailOptions={
        from:process.env.SMPT_MAIL,
        // from:process.env.USER_MAIl,
        to:email,
        subject:subject,
        text:message
    }

    await transporter.sendMail(mailOptions)
})

export {sendEmail}