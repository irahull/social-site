"use client";
import LoadingButton from "@/components/helper/LoadingButton";
import { handleRequest } from "@/components/utils/apiRequest";
import { setAuthUser } from "@/store/authSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { Loader, MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Verify = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const user = useSelector((state: RootState) => state?.auth?.user);
  const router = useRouter();

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

  const verifyOtp = async () => {
    const finalOtp = otp.join("");
    const verifyReq = async () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verify`,
        { otp: finalOtp },
        {
          withCredentials: true,
        }
      );
    };
    const result = await handleRequest(verifyReq, setIsLoading);
    if (result?.data?.status === "success") {
      setOtp(["", "", "", "", "", ""]);
      toast.success(result?.data?.message);
      router.push("/");
      dispatch(setAuthUser(result?.data?.data?.user));
    }
  };

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    } else if (user && user.isVerified) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <React.Fragment>
      {!user || user.isVerified ? (
        <div className="w-full h-screen flex items-center justify-center ">
          {" "}
          <Loader className="animate-spin" size={50} />
        </div>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
          <MailCheck size={100} className="text-red-400" />
          <h2 className="text-xl lg:text-4xl font-semibold">
            OTP Verification
          </h2>
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
                  className=" bg-gray-300 outline-gray-500 font-bold w-15 h-15 p-5 rounded-sm text-3xl no-spinner mx-auto"
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
            onClick={verifyOtp}
            className="text-center w-max text-xl py-6 px-7 rounded-md mt-4 cursor-pointer"
            isLoading={isLoading}
          >
            Verify Now
          </LoadingButton>
        </div>
      )}
    </React.Fragment>
  );
};

export default Verify;
