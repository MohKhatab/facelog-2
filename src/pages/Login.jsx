import Quote from "../components/Auth/Quote";
import Logo from "../components/common/Logo";
import AuthNavigate from "../components/Auth/AuthNavigate";
import LoginForm from "../components/Auth/LoginForm";
import { MdWarning } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { resetUserCreated } from "../redux/features/auth/authSlice";

export default function Login() {
  const authData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(resetUserCreated());

  useEffect(() => {
    if (authData.isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [authData, navigate]);

  return (
    <div className=" px-5 md:px-12 lg:px-22 xl:px-44 gap-10 min-h-[100svh] w-full flex flex-col justify-between py-16 md:py-20 z-50">
      <div className="flex w-[80%] mx-auto md:block md:w-full justify-center">
        <Logo></Logo>
      </div>

      <div className="flex gap-8 lg:gap-22">
        <div className="w-full hidden md:block">
          <Quote></Quote>
        </div>

        <div className="w-full flex flex-col gap-8 max-w-[760px]">
          <div className=" glass w-full p-6 flex flex-col gap-6">
            <LoginForm></LoginForm>
          </div>
          {authData.error && (
            <div className="glass p-6 flex gap-4 items-center md:text-lg justify-center font-semibold text-accent-400">
              <MdWarning className="text-xl shrink-0"></MdWarning>
              <p>Account not found, please check your credentials</p>
            </div>
          )}
        </div>
      </div>

      <div className="text-center md:text-left">
        <AuthNavigate currPage="login"></AuthNavigate>
      </div>
    </div>
  );
}
