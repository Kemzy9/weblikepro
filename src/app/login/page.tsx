'use client'
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Image from "next/image"
import toast from "react-hot-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// Add this import at the top with your other imports
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

// Import or define your Logo component here
import Logo from "@/app/UI/logo/page" // Update this path as necessary

export default function LoginPage() {
    const router = useRouter()
    // Add this new state for password visibility
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            await axios.post("/api/users/login", user)
            toast.success("Login Successful")
            router.push("/profile")
        } catch (error: any) {
            toast.error("Email or Password is incorrect", error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  bg-[#0A0A0A]">
            {/* Left side - Login form */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6">
                <div className="mb-8 flex flex-col items-center">
                    <Logo />
                    <h1 className="text-xl font-bold text-white mt-4"></h1>
                    <p className="text-white mt-2">Welcome back! Please login to continue</p>
                </div>

                <Card className="w-[350px] sm:w-[400px] border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900">Login</CardTitle>
                        <CardDescription className="text-gray-500">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-white font-medium">Password</Label>
                                <Link 
                                    href="/forgotpassword" 
                                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-4">
                        <Button
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                            disabled={!user.email || !user.password}
                            onClick={onLogin}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Logging in...</span>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </Button>
                        <div className="text-center text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </CardFooter>
              
                </Card>
            </div>

      
          
        </div>
    )
}
