import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        // Find the user
        const user = await User.findOne({ email });
        
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Generate tokens
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        // Create permanent token
        const permanentToken = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!
        );

        // Create session token
        const sessionToken = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1h" }
        );

        // Create response
        const response = NextResponse.json({
            message: "Authentication successful",
            success: true
        });

        // Set cookies
        response.cookies.set("token", permanentToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        response.cookies.set("profile_session", sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 86400 // 24 hours
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 