"use client";

import React from "react";
import DynamicForm from "../DynamicForm";
import { FormConfig } from "@/types/form";

interface UserRegisterFormProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const UserRegisterForm: React.FC<UserRegisterFormProps> = ({
  onSuccess,
  onError,
}) => {
  const handleRegisterSuccess = (data: any) => {
    console.log("User registration successful:", data);
    if (onSuccess) {
      onSuccess(data);
    }
  };

  const handleRegisterError = (error: string) => {
    console.error("User registration failed:", error);
    if (onError) {
      onError(error);
    }
  };
  const userRegisterFormConfig: FormConfig = {
    title: "Create User Account",
    description: "Fill out the form below to create a new user account",
    endpoint: "/api/users",
    method: "POST",
    submitButtonText: "Create User",
    onSuccess: handleRegisterSuccess,
    onError: handleRegisterError,
    fields: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        required: true,
        validation: {
          minLength: 2,
          maxLength: 100,
        },
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "Enter email address",
        required: true,
        validation: {
          pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        },
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter password",
        required: true,
        validation: {
          minLength: 8,
        },
        description: "Password must be at least 8 characters long",
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        options: [
          { value: "admin", label: "Administrator" },
          { value: "manager", label: "Manager" },
          { value: "developer", label: "Developer" },
          { value: "designer", label: "Designer" },
          { value: "qa", label: "Quality Assurance" },
          { value: "support", label: "Support" },
          { value: "intern", label: "Intern" },
        ],
      },
      {
        name: "permissions",
        label: "Permissions",
        type: "select",
        required: true,
        defaultValue: "read",
        options: [
          { value: "read", label: "Read Only" },
          { value: "write", label: "Read & Write" },
          { value: "admin", label: "Full Admin Access" },
          { value: "manager", label: "Manager Access" },
        ],
        description: "Select the permission level for this user",
      },
    ],
  };

  return <DynamicForm config={userRegisterFormConfig} />;
};

export default UserRegisterForm;
