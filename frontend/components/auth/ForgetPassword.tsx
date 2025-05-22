"use client";
import LoadingButton from "@/components/helper/LoadingButton";
import axios from "axios";
import { KeySquareIcon } from "lucide-react";
import React, { useState } from "react";
import { handleRequest } from "../utils/apiRequest";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const handleForgetPassword = async ():Promise<void> => {
    const forgetPasswordReq = async () => {
      console.log(email);
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/forget-password`,
        {email},
        {
          withCredentials: true,
        }
      );
    };
    const result = await handleRequest(forgetPasswordReq, setIsLoading);
    console.log(result);
  };
  console.log(email);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 lg:gap-5">
      <KeySquareIcon size={80} className="text-red-600 rotate-10" />
      <h1 className="text-3xl font-bold leading-none">Forget your password?</h1>
      <p className="font-medium text-gray-600 text-center text-base">
        Enter your email for forget your password
      </p>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-3.5 outline-none bg-gray-200 rounded-md w-md"
      />
      <LoadingButton
        size={"lg"}
        type="submit"
        onClick={ handleForgetPassword}
        className="text-center w-max text-xl py-5.5 px-6 rounded-md mt-4 cursor-pointer"
        isLoading={isLoading}
      >
        Foget Password
      </LoadingButton>
    </div>
  );
};

export default ForgetPassword;
