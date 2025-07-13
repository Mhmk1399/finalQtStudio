"use client";

import React, { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import { FormConfig } from "@/types/form";

const TransactionForm: React.FC = () => {
  const [users, setUsers] = useState<Array<{value: string, label: string}>>([]);
  const [customers, setCustomers] = useState<Array<{value: string, label: string}>>([]);

  useEffect(() => {
    // Fetch users
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.data.map((user: any) => ({
            value: user._id,
            label: user.name
          })));
        }
      });

    // Fetch customers
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCustomers(data.data.map((customer: any) => ({
            value: customer._id,
            label: customer.name
          })));
        }
      });
  }, []);

  const formConfig: FormConfig = {
    title: "تسجيل المعاملة",
    description: "إضافة معاملة جديدة",
    endpoint: "/api/transactions",
    method: "POST",
    successMessage: "تم حفظ المعاملة بنجاح",
    errorMessage: "خطأ في حفظ المعاملة",
    submitButtonText: "حفظ المعاملة",
    fields: [
      {
        name: "date",
        label: "التاريخ",
        type: "date",
        required: true,
        defaultValue: new Date().toISOString().split('T')[0]
      },
      {
        name: "subject",
        label: "الموضوع",
        type: "text",
        required: true,
        placeholder: "أدخل موضوع المعاملة"
      },
      {
        name: "debtor",
        label: "المدين",
        type: "number",
        required: true,
        placeholder: "0"
      },
      {
        name: "fastener",
        label: "الدائن",
        type: "number",
        required: true,
        placeholder: "0"
      },
      {
        name: "users",
        label: "المستخدم",
        type: "select",
        required: false,
        options: [
          { value: "", label: "اختر المستخدم" },
          ...users
        ]
      },
      {
        name: "customer",
        label: "العميل",
        type: "select",
        required: false,
        options: [
          { value: "", label: "اختر العميل" },
          ...customers
        ]
      }
    ]
  };

  return <DynamicForm config={formConfig} />;
};

export default TransactionForm;