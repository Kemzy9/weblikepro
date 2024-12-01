// /Users/hasnainalam/weblike/hashweblix19aug-main/src/app/verify-otp/page.tsx
'use client';
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyOtp = async () => {
        try {
            setLoading(true);
            const email = localStorage.getItem("userEmail");
            const response = await axios.post("/api/users/verify-otp", { email, otp });
            
            // After successful OTP verification, make a request to get authentication tokens
            await axios.post("/api/users/auth", { email });
            
            toast.success("Email verified successfully!");
            localStorage.removeItem("userEmail"); // Clean up
            
            // Add a small delay before redirect
            setTimeout(() => {
                router.push("/profile");
            }, 1000);
            
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-wrap flex-col items-center justify-center bg-gray-900 text-gray-100">
            <h1 className="text-3xl font-bold text-gray-100">Verify OTP</h1>
            <div className="grid gap-2">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="bg-gray-700 text-gray-300 placeholder-gray-500 p-2 rounded"
                />
            </div>
            <button 
                onClick={verifyOtp} 
                disabled={loading}
                className="mt-4 bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
                {loading ? "Verifying..." : "Verify OTP"}
            </button>
        </div>
    );
}