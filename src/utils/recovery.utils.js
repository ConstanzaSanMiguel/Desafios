import env from "./env.utils.js"
import { createTransport } from "nodemailer"
import __dirname from "../../utils.js"

async function recoveryEmail(data, token) {
    try {
        const recoveryLink = `${env.RECOVERY}?token=${token}`
        const transport = createTransport({
            service: "gmail",
            port: env.PORT,
            auth: {
                user: env.GOOGLE_EMAIL,
                pass: env.GOOGLE_PASSWORD,
            },
        })

        await transport.sendMail({
            from: `Vibe <${process.env.GOOGLE_EMAIL}>`,
            to: data.email,
            subject: `User ${data.name.toUpperCase()} password recovery`,
            attachments: [{
                filename: "vibelogo.png",
                path: "public/vibelogo.png",
                cid: "vibelogo",
            }],
            html: `
                <!doctype html>
                <html lang="en">

                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Vibe</title>
                </head>

                <body>
                    <div class="text-center w-50">
                        <div><img src='cid:vibelogo'/><h1>Vibe ~ <span>The place where you get the best music</span></h1></div>
                        <h2>Hello ${data.name.toUpperCase()},</h2>
                        <h3>We're sending this email because you requested a password reset. Click on the link below to create a new password:</h3>
                        <a href="${recoveryLink}">Set a new password</a>
                        <h4>If you didn't request a password reset, you can ignore this email. Your password will not be changed.</h4>
                    </div>
                </body>
                </html>
            `,
        })
    } catch (error) {
        throw error
    }
}
export default recoveryEmail