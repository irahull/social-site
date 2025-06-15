"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../helper/LoadingButton";
import PasswordInput from "../helper/PasswordInput";
import { Button } from "../ui/button";
import axios from "axios";
import { handleRequest } from "../utils/apiRequest";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";

// Zod schema
const resetPasswordSchema = z
  .object({
    otp: z
      .string()
      .nonempty("OTP is required")
      .min(6, "OTP must be at least 6 character"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 character"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .min(4, "Please confirm your passord"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const resetPasswordReq = async () => {
        return await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
          {
            otp: data.otp,
            password: data.password,
            confirmPassword: data.confirmPassword,
            email,
          },
          {
            withCredentials: true,
          }
        );
      };
      const result = await handleRequest(resetPasswordReq, setIsLoading);
      if (result?.data?.status === "success") {
        reset();
        toast(result?.data?.message);
        router.push("/");
        dispatch(setAuthUser(result?.data?.data?.user));
      }
    } catch (error) {
      console.error("Reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 lg:gap-5">
      <h1 className="text-3xl font-bold leading-none">Reset your password?</h1>
      <p className="font-medium text-gray-600 text-center text-base">
        Enter your New Password
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full items-center"
      >
        <div>
          <input
            type="number"
            placeholder="Enter OTP"
            {...register("otp")}
            className="input-width text-base outline-none bg-gray-200 rounded-sm no-spinner mx-auto"
          />
          {errors.otp && (
            <p className="text-red-500 text-[13px] ml-1.5">
              {errors.otp.message}
            </p>
          )}
        </div>
        <div>
          <PasswordInput
            placeholder="Enter New Password"
            inputClassName="input-width text-base outline-none"
            registration={register("password")}
            error={errors.password}
          />
          {errors.password && (
            <p className="text-red-500 text-[13px] ml-1.5">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <PasswordInput
            placeholder="Confirm New Password"
            inputClassName="input-width text-base outline-none"
            registration={register("confirmPassword")}
            error={errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-[13px] ml-1.5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          <LoadingButton
            size={"lg"}
            type="submit"
            className="loading-button"
            isLoading={isLoading}
          >
            Change Password
          </LoadingButton>
          <Button
            variant={"outline"}
            type="button"
            onClick={() => router.back()}
            className="loading-button"
          >
            Go Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
