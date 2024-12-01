import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from "bcryptjs"

import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        
        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error :'User Already Exists'}, {status: 400})
        }

        //Hash the password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        //Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        //Save the new user to the database
        const savedUser = await newUser.save()

        // Generate permanent token
        const tokenData = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        }
        
        const permanentToken = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!
            // No expiresIn - token will never expire
        );

        // Create profile session token
        const sessionToken = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1h" }
        );

        // Create response
        const response = NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

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
            maxAge: 86400
        });

       

        return response;

    } catch(error: any) {
        return NextResponse.json({ error: error.message }, {status: 500})
    }
}
