"use client";
import LoadingButton from "@/components/helper/LoadingButton";
import axios from "axios";
import { KeySquareIcon } from "lucide-react";
import React, { useState } from "react";
import { handleRequest } from "../utils/apiRequest";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const handleForgetPassword = async (): Promise<void> => {
    if (!email || !isValidEmail(email)) {
      toast.error("Invalid Email");
      return;
    }
    const forgetPasswordReq = async () => {
      console.log(email);
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forget-password`,
        { email },
        {
          withCredentials: true,
        }
      );
    };
    const result = await handleRequest(forgetPasswordReq, setIsLoading);
    if (result?.data?.success === true) {
      setEmail("");
      toast.success(result?.data?.message);
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 lg:gap-5">
      <KeySquareIcon size={80} className="text-red-600 rotate-10" />
      <h1 className="text-2xl lg:text-3xl font-bold leading-none">Forget your password?</h1>
      <p className="font-medium text-gray-600 text-center text-sm lg:text-base">
        Enter your email for forget your password
      </p>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="input-width outline-none bg-gray-200 rounded-sm w-max"
      />
      <LoadingButton
        size={"lg"}
        type="submit"
        onClick={handleForgetPassword}
        className="loading-button"
        isLoading={isLoading}
      >
        Foget Password
      </LoadingButton>
    </div>
  );
};

export default ForgetPassword;
