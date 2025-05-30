import { useField } from "formik";
import React, { useState } from "react";
import { MdError, MdVisibilityOff, MdVisibility } from "react-icons/md";

export default function TextInput({ icon, initialType, ...props }) {
  const [inputType, setInputType] = useState(initialType);
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      <div className=" h-14 flex items-center rounded-lg border border-primary-100/20 bg-primary-100/5 px-2 focus-within:border-primary-100/70 focus-within:bg-primary-100/10 transition-all ">
        {/* <MdEmail className="absolute text-primary-500 text-2xl"></MdEmail> */}
        {icon}
        {icon && (
          <div className="w-[1px] h-8 bg-primary-100/20 absolute focus peer-focus:bg-primary-100/70 left-10"></div>
        )}
        <input
          type={inputType}
          {...field}
          {...props}
          className={` h-full w-full ${
            icon ? "pl-11" : "pl-2"
          } text-lg peer focus:outline-0`}
        />

        {initialType === "password" &&
          (inputType === "password" ? (
            <MdVisibility
              className="absolute right-4 text-primary-500 text-2xl cursor-pointer"
              onClick={() => setInputType("text")}
            ></MdVisibility>
          ) : (
            <MdVisibilityOff
              className="absolute right-4 text-primary-500 text-2xl cursor-pointer"
              onClick={() => setInputType("password")}
            ></MdVisibilityOff>
          ))}
      </div>

      <span
        className={`pt-2 ${
          meta.touched && meta.error ? "flex" : "hidden"
        } items-center gap-1 text-accent-400 `}
      >
        <MdError />
        {meta.error}
      </span>
    </div>
  );
}
