"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn; // hook-form's register() result
  error?: FieldError;
  inputClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
}
const PasswordInput = ({
  label,
  placeholder = "Enter Password",
  inputClassName,
  labelClassName,
  iconClassName,
  registration,
  error,
}: Props) => {
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  return (
    <React.Fragment>
      {label && (
        <label
          htmlFor=""
          className={`font-semibold mb-2 block ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={togglePassword ? "text" : "password"}
          placeholder={placeholder}
          className={`px-4 py-3 outline-none bg-gray-200 rounded-md w-full ${inputClassName}  ${
            error ? "border border-red-500" : ""
          } `}
          {...registration}
        />
        <button
          type="button"
          aria-label="show password"
          onClick={() => setTogglePassword(!togglePassword)}
          className={`absolute top-1/2 -translate-y-1/2 right-3 ${iconClassName}`}
        >
          {togglePassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </button>
      </div>
    </React.Fragment>
  );
};

export default PasswordInput;
