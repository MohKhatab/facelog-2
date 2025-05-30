import { Route, Routes, useLocation } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect } from "react";
import {
  clearAuthError,
  markAuthAsChecked,
  tokenIsValid,
} from "./redux/features/auth/authSlice";
import AddPost from "./pages/AddPost";
import Navbar from "./components/common/Navbar";
import DefaultLayout from "./layouts/DefaultLayout";
import Signup from "./pages/Signup";
import { resetPostSaved } from "./redux/features/posts/postsSlice";
import Logo from "./components/common/Logo";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const authChecked = useSelector((state) => state.auth.authChecked);

  // state resets on route change
  useEffect(() => {
    dispatch(clearAuthError());
    dispatch(resetPostSaved());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (localStorage["token"]) dispatch(tokenIsValid(localStorage["token"]));
    else dispatch(markAuthAsChecked());
  }, [dispatch]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  if (!authChecked)
    return (
      <div className="min-h-[100dvh] text-text-50 flex items-center justify-center">
        <div
          id="background-sphere"
          className="w-[100dvw] h-[100dvw] min-w-[1000px] min-h-[1000px] fixed left-4/7 top-1/2 -translate-y-1/2 -z-10"
        ></div>

        <div className="animate-pulse mx-8">
          <Logo></Logo>
        </div>
      </div>
    );

  return (
    <div className="min-h-[100dvh] text-text-50">
      <div
        id="background-sphere"
        className="w-[100dvw] h-[100dvw] min-w-[1000px] min-h-[1000px] fixed left-4/7 top-1/2 -translate-y-1/2 -z-10"
      ></div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<AddPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
