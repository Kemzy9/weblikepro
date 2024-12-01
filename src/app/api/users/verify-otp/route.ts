// /Users/hasnainalam/weblike/hashweblix19aug-main/src/app/api/users/verify-otp/route.ts
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, otp } = reqBody;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Log the stored OTP and expiry for debugging
        console.log("Stored OTP:", user.otp);
        console.log("Submitted OTP:", otp);
        console.log("OTP Expiry:", user.otpExpiry);
        console.log("Current Time:", Date.now());

        // Check if OTP is valid and not expired
        if (user.otp === otp && user.otpExpiry.getTime() > Date.now()) {
            // OTP is valid, mark user as verified
            user.isVerified = true; // Update user status to verified
            user.otp = ""; // Clear OTP
            user.otpExpiry = new Date(0); // Clear OTP expiry
            await user.save(); // Save changes to the database

            // Generate session token for the user
            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            };

            const sessionToken = jwt.sign(
                tokenData,
                process.env.TOKEN_SECRET!,
                { expiresIn: "1h" } // Token expires in 1 hour
            );

            // Create response
            const response = NextResponse.json({
                message: "OTP verified successfully.",
                success: true
            });

            // Set cookies
            response.cookies.set("profile_session", sessionToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 3600 // 1 hour
            });

            // Redirect to the profile page
            response.headers.set("Location", "/profile");
            return response;

        } else {
            return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}