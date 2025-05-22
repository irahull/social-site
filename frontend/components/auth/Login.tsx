"use client";
import { z } from "zod";
import PasswordInput from "@/components/common/PasswordInput";
import LoadingButton from "@/components/helper/LoadingButton";
import { handleRequest } from "@/components/utils/apiRequest";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/authSlice";
import LoginBg from "@/public/images/login.webp"
// _______________________ Form Schema _____________________________
const formSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 character"),
});

// _______________________ Type Setting _____________________________
type FormData = z.infer<typeof formSchema>;

// _______________________ Main Signup Component _____________________________
const Login = () => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  // ______________________ Submitting User Data __________________________
  const onSubmit = async (data: FormData) => {
    const loginReq = async () => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
        data,
        {
          withCredentials: true,
        }
      );
    };
    const result = await handleRequest(loginReq, setisLoading);
    console.log(result?.data.data);
    if (result?.data.status === "success") {
      dispatch(setAuthUser(result.data.data.user));
      toast(result.data.message);
      reset();
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        <div className="lg:col-span-4 h-screen hidden lg:block">
          <Image
            src={LoginBg}
            width={1000}
            height={800}
            alt="signup"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-3 flex w-full h-screen flex-col items-center justify-center">
          <h1 className="text-xl font-bold sm:text-2xl text-left mb-8 uppercase">
            Login with <span className="text-rose-600">PhotoFlow</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[90%] 2xl:w-[80%]"
          >
            {/* ________________________ EMAIL _______________________________  */}
            <div className="mb-4">
              <label htmlFor="email" className="font-semibold mb-2 block">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                {...register("email")}
                className={`px-4 py-3 outline-none bg-gray-200 rounded-md w-full ${
                  errors.email ? "border border-red-500" : ""
                } `}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* ________________________ PASSWORD _______________________________  */}
            <div className="mb-4">
              <PasswordInput
                label="Password"
                placeholder="Enter Password"
                registration={register("password")}
                error={errors.password}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
              <Link
                href="/auth/forget-password"
                className="font-semibold text-right text-red-600 mt-2 block cursor-pointer"
              >
                Forget Password
              </Link>
            </div>

            {/* _________________________ SUBMIT BUTTON ______________________________   */}
            <LoadingButton
              size={"lg"}
              type="submit"
              className="text-center w-full rounded-md mb-4 cursor-pointer"
              isLoading={isLoading}
            >
              {isLoading ? "Submitting.." : "Login"}
            </LoadingButton>
            <div className="text-center">
              {" "}
              <span>Don&apos;t have account ?</span>{" "}
              <Link href="/auth/signup" className="underline text-blue-600 ">
                Signup here
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
