"use client";
import React, { useState } from "react";
import LoadingButton from "../helper/LoadingButton";
import PasswordInput from "../common/PasswordInput";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleResetPassword = () => {};
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 lg:gap-5">
      <h1 className="text-3xl font-bold leading-none">Reset your password?</h1>
      <p className="font-medium text-gray-600 text-center text-base">
        Enter your New Password    </p>
      <input
        type="number"
        placeholder="Enter OTP"
        className=" px-4 py-3 text-base outline-none bg-gray-200 rounded-md w-sm no-spinner mx-auto"
      />
        <PasswordInput placeholder="Enter New Password" inputClassName="w-sm  px-4 py-3 text-base outline-none" />

        <PasswordInput placeholder="Enter New Password" inputClassName="w-sm  px-4 py-3 text-base outline-none" />
      <LoadingButton
        size={"lg"}
        type="submit"
        onClick={handleResetPassword}
        className="text-center w-max text-xl py-5 px-5 rounded-md mt-4 cursor-pointer"
        isLoading={isLoading}
      >
        Reset Password
      </LoadingButton>
    </div>
  );
};

export default ResetPassword;
