import { createTransport } from "nodemailer"
import winstonLogger from "./logger/index.js"

async function sendEmail(data) {
    try {
        winstonLogger.INFO(data)
        const transport = createTransport({
            service: "gmail",
            port: process.env.PORT,
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD,
            },
        })
        await transport.sendMail({
            from: `Vibe <${process.env.GOOGLE_EMAIL}>`,
            to: data.email,
            subject: `User ${data.name.toUpperCase()} registration`,
            attachments: [{
                filename: "vibelogo.png",
                path: "public/vibelogo.png",
                cid: "vibelogo",
            }],
            html: `
                <body>
                    <div><img src='cid:vibelogo'/><h1>Vibe ~ <span>The place where you get the best music</span></h1></div>
                    <h2>Hello ${data.name.toUpperCase()}!</h2>
                    <h3>We are pleased to have you on board :) </h3>
                    <h4>Here is your verification code: <strong>${data.verifiedCode}</strong></h4>
                    <h4>Please verify your code in the following <a href="http://localhost:8080/verify">link</a></h4>
                </body>
                `,
        })
    } catch (error) {
        throw error
    }
}

export default sendEmail