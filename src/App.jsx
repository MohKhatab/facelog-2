import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { tokenIsValid } from "./redux/features/auth/authSlice";
import AddPost from "./pages/AddPost";
import Navbar from "./components/common/Navbar";
import DefaultLayout from "./layouts/DefaultLayout";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage["token"]) dispatch(tokenIsValid(localStorage["token"]));
  }, [dispatch]);

  return (
    <div className="min-h-[100dvh] text-text-50">
      <div
        id="background-sphere"
        className="w-[100dvw] h-[100dvw] min-w-[1000px] min-h-[1000px] fixed left-4/7 top-1/2 -translate-y-1/2 -z-10"
      ></div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<AddPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
