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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  Loader2 } from "lucide-react"
import Logo from "@/app/UI/logo/page"


export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup response:", response)
            
            toast.success("Account created successfully!")
            toast("Redirecting to your dashboard...", { 
                duration: 3000,
                icon: '🚀'
            })
            
            // Short delay before redirect to allow toasts to be seen
            setTimeout(() => {
                router.push("/profile") // or wherever you want to redirect after signup
            }, 2000)
            
        } catch (error: any) {
            console.error("Signup error:", error)
            toast.error(error.response?.data?.error || "Signup failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
            {/* Left side - Image and Testimonial */}
            <div className="hidden md:flex flex-col items-center justify-center w-full md:w-1/2 p-12 bg-gray-50">
                <Image 
                    src="/3.png" 
                    alt="Testimonial Image" 
                    width={500}
                    height={300}
                    loading='lazy' 
                    className="w-4/5 h-auto rounded-xl mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300" 
                />
                <div className="text-center max-w-md">
                    <p className="text-gray-700 italic text-lg leading-relaxed font-light">
                        WebLike has revolutionized our development workflow. The platform powerful features and seamless integration capabilities have made it an indispensable tool for our team.
                    </p>
                    <div className="mt-6 flex items-center justify-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                            JD
                        </div>
                        <div className="text-left">
                            <p className="text-blue-600 font-semibold">John Doe</p>
                            <p className="text-sm text-gray-500">Technical Lead, TechCorp</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Signup form */}
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 p-6 bg-white">
                <div className="mb-8 flex flex-col items-center">
                    <Logo />
                    <h1 className="text-xl font-bold text-gray-900 mt-4">Weblike</h1>
                    <p className="text-gray-500 mt-2">Create your  account</p>
                </div>
                <Card className="w-[350px] sm:w-[400px] border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="space-y-1 pb-6">
                        <CardTitle className="text-2xl font-bold text-gray-900">Sign Up</CardTitle>
                        <CardDescription className="text-gray-500">
                            Enter your details to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="devmaster"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            />
                        </div>
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
                            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-4">
                        <Button
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200"
                            disabled={!user.username || !user.email || !user.password}
                            onClick={onSignup}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                        <div className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                                Sign in
                            </Link>
                           
                        </div>
                    </CardFooter>
                </Card>
                <div className="mt-8 text-center text-sm text-gray-500">
                    By signing up, you agree to our{" "}
                    <Link href="/TermsAndConditions" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
Terms And Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/PrivacyPolicy" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    )
}
