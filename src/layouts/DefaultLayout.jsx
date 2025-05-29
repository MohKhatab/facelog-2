import React from "react";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
