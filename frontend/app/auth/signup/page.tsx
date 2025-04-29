"use client";
import PasswordInput from "@/components/auth/PasswordInput";
import LoadingButton from "@/components/helper/LoadingButton";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData, "FF");
  };

  const handleSubmit = async(e:FormEvent) => {
    e.preventDefault()
    
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-4 h-screen hidden lg:block">
          <Image
            src=""
            width={1000}
            height={1000}
            alt="signup"
            className="w-full h-full object-cover bg-amber-500"
          />
        </div>
        <div className="lg:col-span-3 flex w-full h-screen flex-col items-center justify-center">
          <h1 className="text-xl font-bold sm:text-2xl text-left mb-8 uppercase">
            Sign Up with <span className="text-rose-600">PhotoFlow</span>
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[90%] 2xl:w-[80%] "
          >
            {/* ________________________ USERNAME _______________________________  */}
            <div className="mb-4">
              <label htmlFor="username" className="font-semibold mb-2 block">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="px-4 py-3 outline-none bg-gray-200 rounded-md w-full "
              />
            </div>
            {/* ________________________ EMAIL _______________________________  */}
            <div className="mb-4">
              <label htmlFor="email" className="font-semibold mb-2 block">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 outline-none bg-gray-200 rounded-md w-full "
              />
            </div>
            {/* ________________________ PASSWORD _______________________________  */}
            <div className="mb-4">
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {/* ________________________ CONFIRM PASSWORD _______________________________  */}
            <div className="mb-4">
              <PasswordInput
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <LoadingButton
              size={"lg"}
              type="submit"
              className="text-center w-full rounded-md mb-4 cursor-pointer"
              isLoading={isLoading}
            >
              Sign Up Now
            </LoadingButton>
            <div className="text-center">
              {" "}
              <span>Already have account?</span>{" "}
              <Link href="/auth/login" className="underline text-blue-600 ">
                Login here
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
