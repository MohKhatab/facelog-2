import React from "react";

export default function Quote() {
  return (
    <div className="flex gap-6 flex-col">
      <div className="self-stretch justify-start">
        <span className="text-text-50 text-3xl lg:text-5xl font-bold">
          Stay Connected.{" "}
        </span>
        <span className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          Always
        </span>
      </div>
      <div className="self-stretch justify-start">
        <span className="text-text-50 text-xl lg:text-2xl font-normal">
          Experience social networking redefined...{" "}
        </span>
        <span className="text-text-50 text-xl lg:text-2xl font-bold">
          again
        </span>
        <span className="text-text-50 text-xl lg:text-2xl font-normal">
          . Connect with Friends, Reconnect with Family, and Forge New
          Relationships. but this time, I actually know how to code.
        </span>
      </div>
    </div>
  );
}
