import React from "react";
import { Link } from "react-router";

export default function AuthNavigate({ currPage }) {
  if (currPage === "login")
    return (
      <div className="justify-start text-lg md:text-xl">
        <span className="text-text-50  font-['Inter']">
          Don’t have an account?{" "}
        </span>
        <Link
          to="/signup"
          className="text-accent-500 underline font-normal font-['Inter']"
        >
          Sign up
        </Link>
      </div>
    );
  else if (currPage === "signup")
    return (
      <div className="justify-start text-lg md:text-xl">
        <span className="text-text-50  font-['Inter']">
          Already have an account?{" "}
        </span>
        <Link
          to="/login"
          className="text-accent-500 underline font-normal font-['Inter']"
        >
          Login
        </Link>
      </div>
    );
}
