"use client";
import LoadingButton from "@/components/helper/LoadingButton";
import { MailCheck } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

const Verify = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }

    if (value.length === 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleOtpDelete = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (
      e.key === "Backspace" &&
      !inputRef.current[index]?.value &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <MailCheck size={100} className="text-red-400" />
      <h2 className="text-xl lg:text-4xl font-semibold">OTP Verification</h2>
      <p>
        We have sent a code to <span>ab@gmail.com</span>{" "}
      </p>
      <div className="flex items-center justify-center gap-2 lg:gap-3 mx-auto">
        {[0, 1, 2, 3, 4, 5].map((item) => {
          return (
            <input
              key={item}
              type="number"
              maxLength={1}
              value={otp[item] || ""}
              ref={(el) => {
                inputRef.current[item] = el;
              }}
              onChange={(el) => handleChange(el, item)}
              onKeyDown={(el) => handleOtpDelete(el, item)}
              className=" bg-gray-300 outline-gray-500 font-bold w-20 h-20 lg:w-15 lg:h-15 p-5 rounded-sm text-3xl no-spinner mx-auto"
            />
          );
        })}
      </div>
      <div className="flex items-center gap-1 text-gray-800">
        <span>Didt get code? </span>{" "}
        <span className="underline text-blue-900 cursor-pointer">
          {" "}
          Resend Code
        </span>
      </div>
      <LoadingButton
        size={"lg"}
        type="submit"
        className="text-center w-max text-xl py-8 px-8 rounded-md mt-4 cursor-pointer"
        isLoading={isLoading}
      >
        Verify Now
      </LoadingButton>
    </div>
  );
};

export default Verify;
