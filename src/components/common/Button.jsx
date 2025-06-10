import React from "react";
import {
  MdArrowForward,
  MdRestartAlt,
  MdSync,
  MdRefresh,
} from "react-icons/md";

export default function Button({
  buttonText,
  rightIcon,
  leftIcon,
  clickHandler,
  type,
  loading,
  isDisabled,
  height,
}) {
  return (
    <button
      disabled={isDisabled}
      type={type}
      onClick={clickHandler}
      className={`relative w-full z-0 ${
        height ? height : "h-14"
      } rounded-lg font-semibold 
    after:content-[''] after:absolute after:w-full after:h-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2
    after:bg-linear-to-tl after:from-accent-500/50 after:to-primary-500/30 after:z-0 after:rounded-lg 
    hover:after:bg-right after:bg-left after:bg-size-[200%] after:blur-xs after:box-content after:transition-all 
    active:after:to-primary-500/50 active:after:from-accent-500/60 
    cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-50 disabled:after:bg-none disabled:after:content-none
  `}
    >
      {!loading && (
        <div className="relative tracking-wide z-10 rounded-lg border bg-linear-to-tl from-accent-500/50 to-primary-500/30 border-primary-500/50 hover:border-primary-500 transition-all w-full h-full flex items-center justify-center">
          {leftIcon || null}
          {buttonText || null}
          {rightIcon || null}
        </div>
      )}
      {loading && (
        <div className="relative tracking-wide z-10 rounded-lg border bg-linear-to-tl from-accent-500/50 to-primary-500/30 border-primary-500/50 hover:border-primary-500 transition-all w-full h-full flex items-center justify-center">
          <span className="animate-spin text-4xl">
            <MdRefresh></MdRefresh>
          </span>
        </div>
      )}
    </button>
  );
}
