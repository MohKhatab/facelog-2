import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogoutClick() {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <>
      <div className="flex py-6 px-5 lg:px-10 xl:px-32 justify-between gap-6 items-center fixed w-full z-20 backdrop-blur ">
        <div className="w-60">
          <Logo />
        </div>

        <div className="w-32 shrink-0">
          <Button
            clickHandler={handleLogoutClick}
            buttonText="Logout"
            leftIcon={<MdLogout className="mr-1 text-lg" />}
          />
        </div>
      </div>
      <div className="w-full h-[104px]"></div>
    </>
  );
}
