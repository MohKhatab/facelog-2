import React from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import { MdArrowForward, MdEmail, MdLock, MdPassword } from "react-icons/md";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/auth/authSlice";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import Checkbox from "../common/Checkbox";

export default function LoginForm() {
  const dispatch = useDispatch();

  const loginSchema = object({
    email: string("")
      .required("Email is required to login")
      .email("Please enter a valid email address"),
    password: string()
      .required("Password is required to login")
      .min(6, "Password must be longer than 6 characters"),
  });

  function handleLoginClick(values, actions) {
    console.log("fired");
    console.log(values);
    console.log(actions);
    console.log("hello login");
    dispatch(
      loginUser({
        ...values,
      })
    );
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold mb-2">
        Login to your account
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLoginClick}
        validationSchema={loginSchema}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            <TextInput
              icon={<MdEmail className="absolute text-primary-500 text-2xl" />}
              placeholder="email@example.com"
              name="email"
            ></TextInput>
            <TextInput
              icon={<MdLock className="absolute text-primary-500 text-2xl" />}
              placeholder="***************"
              name="password"
            ></TextInput>
          </div>

          <Checkbox></Checkbox>
          <Button
            type="submit"
            buttonText="LOGIN"
            rightIcon={<MdArrowForward className=" ml-2 text-xl" />}
          ></Button>
        </Form>
      </Formik>
    </>
  );
}
