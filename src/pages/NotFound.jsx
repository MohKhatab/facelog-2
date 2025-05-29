import React from "react";
import Button from "../components/common/Button";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="text-center flex flex-col gap-4 h-screen justify-center px-6">
      <span className="text-8xl font-bold text-text-50">404</span>
      <span className="text-text-50 text-3xl">
        This route is not implemented
      </span>
      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-[240px]">
          <Button
            buttonText="Return"
            clickHandler={() => navigate(-1)}
          ></Button>
        </div>
      </div>
    </div>
  );
}
