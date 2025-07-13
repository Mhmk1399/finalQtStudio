"use client";

import React from "react";
import { FormConfig } from "@/types/form";
import { DynamicForm } from "@/components/forms";
import { useRouter } from "next/navigation";

const UsersLoginForm = () => {
  const router = useRouter();
  const handleLoginSuccess = (response: any) => {
    const token = response?.data?.token;
    const user = response?.data?.user;

    if (token && user) {
      localStorage.setItem("userToken", token);
      localStorage.setItem("customerUser", JSON.stringify(user));

      if (response.status === 200) response;
      else router.push("/users/dashboard");
    } else {
      console.log("Token or user data missing in response:", response);
    }
  };

  const handleLoginError = (error: string) => {
    console.error("Login error:", error); // Debug log

    // Call the parent error handler if provided
    if (error && typeof onError === "function") {
      onError(error);
    } else {
      // Default error behavior
      console.error("Login failed:", error);
    }
  };

  const customerLoginFormConfig: FormConfig = {
    title: "ورود به حساب کاربری",
    description:
      "برای ورود به حساب کاربری خود، شماره تلفن و رمز عبور را وارد کنید",
    endpoint: "/api/customers/login",
    method: "POST",
    submitButtonText: "ورود",
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    className: "max-w-md", // Make it narrower for login form
    fields: [
      {
        name: "phoneNumber",
        label: "شماره تلفن",
        type: "tel",
        placeholder: "شماره تلفن خود را وارد کنید",
        required: true,
        validation: {
          pattern: "^[+]?[0-9]{10,15}$",
          minLength: 10,
          maxLength: 15,
        },
        description: "شماره تلفن همراه با کد کشور (مثال: +989123456789)",
      },
      {
        name: "password",
        label: "رمز عبور",
        type: "password",
        placeholder: "رمز عبور خود را وارد کنید",
        required: true,
        validation: {
          minLength: 8,
        },
        description: "رمز عبور باید حداقل 8 کاراکتر باشد",
      },
    ],
  };

  return <DynamicForm config={customerLoginFormConfig} />;
};

export default UsersLoginForm;
