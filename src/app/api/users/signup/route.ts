import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"
import { sendEmail } from '@/helpers/mailer'
import crypto from 'crypto'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: 'User Already Exists' }, { status: 400 })
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Save the new user to the database
        const savedUser = await newUser.save()

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString()
        const otpExpiry = Date.now() + 300000

        // Update user with OTP and expiry
        await User.findByIdAndUpdate(savedUser._id, { otp, otpExpiry })

        // Send OTP email
        await sendEmail({
            email,
            emailType: "OTP",
            userId: savedUser._id,
            otp
        })

        return NextResponse.json({
            message: "User created successfully. Please check your email for the OTP.",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
