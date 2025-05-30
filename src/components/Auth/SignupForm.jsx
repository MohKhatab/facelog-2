import React from "react";
import TextInput from "../common/TextInput";
import Button from "../common/Button";
import {
  MdArrowForward,
  MdEmail,
  MdLock,
  MdPassword,
  MdPerson,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import { object, ref, string } from "yup";
import { createUser } from "../../redux/features/auth/authSlice";

export default function SignupForm() {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);

  const signUpSchema = object({
    firstName: string("first name must be a string")
      .required("First name is required")
      .min(2, "First name must be at least 2 characters long")
      .max(16, "First name can't be longer than 16 characters"),
    lastName: string("first name must be a string")
      .required("Second name is required")
      .min(2, "Second name must be at least 2 characters long")
      .max(16, "Second name can't be longer than 16 characters"),
    email: string("")
      .required("Email is required")
      .email("Please enter a valid email address"),
    password: string()
      .required("Password is required to sign up")
      .min(6, "Password must be longer than 6 characters"),
    confirm: string().oneOf([ref("password"), null], "Passwords must match"),
  });

  function handleSignupClick(values) {
    const valuesCopy = { ...values };
    delete valuesCopy.confirm;
    dispatch(
      createUser({
        ...valuesCopy,
      })
    );
  }

  return (
    <>
      <h1 className="text-xl text-center md:text-3xl font-bold mb-3">
        Create an account
      </h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirm: "",
        }}
        onSubmit={handleSignupClick}
        validationSchema={signUpSchema}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 mb-4">
            <TextInput
              initialType="text"
              icon={<MdPerson className="absolute text-primary-500 text-2xl" />}
              placeholder="First Name"
              name="firstName"
            ></TextInput>
            <TextInput
              initialType="text"
              icon={<MdPerson className="absolute text-primary-500 text-2xl" />}
              placeholder="Last Name"
              name="lastName"
            ></TextInput>
            <TextInput
              initialType="text"
              icon={<MdEmail className="absolute text-primary-500 text-2xl" />}
              placeholder="email@example.com"
              name="email"
            ></TextInput>
            <TextInput
              initialType="password"
              icon={<MdLock className="absolute text-primary-500 text-2xl" />}
              placeholder="***************"
              name="password"
            ></TextInput>
            <TextInput
              initialType="password"
              icon={
                <MdPassword className="absolute text-primary-500 text-2xl" />
              }
              placeholder="***************"
              name="confirm"
            ></TextInput>
          </div>

          <Button
            loading={authData.loading}
            type="submit"
            buttonText="CREATE YOUR ACCOUNT"
            rightIcon={<MdArrowForward className=" ml-2 text-xl" />}
          ></Button>
        </Form>
      </Formik>
    </>
  );
}
