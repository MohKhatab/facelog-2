import React from "react";

export default function Checkbox({ checkHandler, checkValue }) {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-2"
        htmlFor="ripple-on"
        data-ripple-dark="true"
      >
        <input
          id="ripple-on"
          type="checkbox"
          checked={checkValue}
          onChange={checkHandler}
          className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-background-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-9 before:w-9 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primary-500 before:opacity-0 before:transition-opacity checked:border-primary-500 checked:bg-primary-500 checked:before:bg-primary-400 hover:before:opacity-10"
        />
        <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.75"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </label>
      <label
        className="cursor-pointer text-text-300 hover:text-text-100"
        htmlFor="ripple-on"
      >
        Remember Me?
      </label>
    </div>
  );
}
