"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  iconClassName?: string;
}
const PasswordInput = ({
  name,
  label,
  placeholder = "Enter Password",
  value,
  onChange,
  inputClassName,
  labelClassName,
  iconClassName,
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
          name={name}
          value={value}
          onChange={onChange}
          className={`px-4 py-3 outline-none bg-gray-200 rounded-md w-full ${inputClassName} `}
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
