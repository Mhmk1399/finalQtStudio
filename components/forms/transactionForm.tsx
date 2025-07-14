"use client";

import React, { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import { FormConfig } from "@/types/form";

const TransactionForm: React.FC = () => {
  const [users, setUsers] = useState<Array<{ value: string; label: string }>>(
    []
  );
  const [customers, setCustomers] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    // Fetch users
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(
            data.data.map((user: any) => ({
              value: user._id,
              label: user.name,
            }))
          );
        }
      });

    // Fetch customers
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomers(
            data.data.map((customer: any) => ({
              value: customer._id,
              label: customer.name,
            }))
          );
        }
      });
  }, []);

  const formConfig: FormConfig = {
    title: "ثبت تراکنش",
    description: "فرم ثبت تراکنش مالی جدید",
    endpoint: "/api/transactions",
    method: "POST",
    submitButtonText: "ثبت تراکنش",
    successMessage: "تراکنش با موفقیت ثبت شد",
    errorMessage: "خطا در ثبت تراکنش",
    validationErrorMessage: "لطفاً اطلاعات فرم را به درستی تکمیل کنید.",
    fields: [
      {
        name: "date",
        label: "تاریخ تراکنش",
        type: "date",
        required: true,
        defaultValue: new Date().toISOString().split("T")[0],
      },
      {
        name: "subject",
        label: "موضوع تراکنش",
        type: "text",
        required: true,
      placeholder: "موضوع تراکنش را وارد کنید",
        validation: {
          minLength: 2,
          maxLength: 200,
        },
      },
      {
        name: "debtor",
        label: "مبلغ بدهکار",
        type: "number",
        placeholder: "مبلغ بدهکار را وارد کنید",
        required: true,
        validation: {
          min: 0,
        },
        description: "مبلغ به تومان",
      },
      {
        name: "fastener",
        label: "مبلغ بستانکار",
        type: "number",
        placeholder: "مبلغ بستانکار را وارد کنید",
        required: true,
        validation: {
          min: 0,
        },
        description: "مبلغ به تومان",
      },
      {
        name: "users",
        label: "کاربر",
        type: "select",
        required: false,
        options: [{ value: "", label: "کاربر را انتخاب کنید" }, ...users],
      },
      {
        name: "customer",
        label: "مشتری",
        type: "select",
        required: false,
        options: [{ value: "", label: "مشتری را انتخاب کنید" }, ...customers],
      },
    ],
  };

  return <DynamicForm config={formConfig} />;
};

export default TransactionForm;
