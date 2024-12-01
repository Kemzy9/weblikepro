import { Resend } from 'resend'
import User from '@/models/userModel'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ email, emailType, userId, otp }: any) => {
    try {
        const hashedToken = userId.toString()

        const mailOptions = {
            from: 'weblike.ai@gmail.com',
            to: email,
            subject: emailType === "OTP" ? "Your OTP Code" : "Verify Your Email",
            html: emailType === "OTP"
                ? `<p>Your OTP is: <strong>${otp}</strong>. It is valid for 5 minutes.</p>`
                : `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your email.</p>`
        }
        // Send email using Resend
        const mailResponse = await resend.emails.send(mailOptions);
        return mailResponse;

    } catch (error: any) {
        console.error("Error sending email:", error.message);
        throw new Error(error.message);
    }
}
