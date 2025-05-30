import React, { useEffect } from "react";
import Quote from "../components/Auth/Quote";
import Logo from "../components/common/Logo";
import AuthNavigate from "../components/Auth/AuthNavigate";
import SignupForm from "../components/Auth/SignupForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { MdWarning } from "react-icons/md";

export default function Signup() {
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData.userCreated) {
      navigate("/login");
    }
  }, [authData.userCreated, navigate]);

  return (
    <div className=" px-5 md:px-12 lg:px-22 xl:px-44 gap-10 min-h-[100svh] w-screen flex flex-col justify-between py-16 md:py-20 z-50">
      <div className="flex mx-auto justify-center">
        <Logo></Logo>
      </div>

      <div className="flex justify-center">
        <div className="w-full flex flex-col gap-8 max-w-[760px]">
          <div className=" glass w-full p-6 flex flex-col gap-6">
            <SignupForm></SignupForm>
          </div>
          {authData.error && (
            <div className="glass p-6 flex gap-4 items-center md:text-lg justify-center font-semibold text-accent-400">
              <MdWarning className="text-xl shrink-0"></MdWarning>
              <p>{authData.error.message}</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center">
        <AuthNavigate currPage="signup"></AuthNavigate>
      </div>
    </div>
  );
}
