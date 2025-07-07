"use client";

import React, { useState } from "react";
import CustomerForm from "../forms/customers/CustomerForm";
import ContractFormHidden from "../forms/ContractForm";
import UserRegisterForm from "../forms/usersAndTeams/UserRegisterForm";
import TeamForm from "../forms/usersAndTeams/TeamForm";
import ServiceForm from "../forms/ServiceForm";
import ServiceRequestForm from "../forms/ServiceRequestForm";
import TaskForm from "../forms/TaskForm";
import ProjectForm from "../forms/projectAndServices/ProjectForm";

type FormType =
  | "customer"
  | "contract"
  | "user-register"
  | "team"
  | "service"
  | "service-request"
  | "task"
  | "project";

interface FormOption {
  id: FormType;
  label: string;
  icon: string;
  category: string;
  description: string;
}

const CustomerSideBar: React.FC = () => {
  const [activeForm, setActiveForm] = useState<FormType>("customer");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const formOptions: FormOption[] = [
    // مالی و حسابداری
    {
      id: "contracts-list",
      label: "لیست قراردادها",
      icon: "📋",
      category: "مالی و حسابداری",
      description: "مشاهده و مدیریت قراردادهای شما",
    },
    {
      id: "transactions",
      label: "تراکنش‌ها",
      icon: "💰",
      category: "مالی و حسابداری",
      description: "تاریخچه پرداخت‌ها و تراکنش‌های مالی",
    },
    {
      id: "personal-info",
      label: "اطلاعات شخصی",
      icon: "👤",
      category: "مالی و حسابداری",
      description: "مدیریت اطلاعات حساب کاربری",
    },

    // پروژه‌ها و خدمات
    {
      id: "projects-list",
      label: "لیست پروژه‌ها",
      icon: "🚀",
      category: "پروژه‌ها و خدمات",
      description: "مشاهده پروژه‌های در حال اجرا و تکمیل شده",
    },
    {
      id: "service-requests-list",
      label: "لیست درخواست خدمات",
      icon: "📝",
      category: "پروژه‌ها و خدمات",
      description: "پیگیری درخواست‌های خدماتی شما",
    },

    // آموزش‌ها و بلاگ‌ها
    {
      id: "latest-blogs",
      label: "آخرین بلاگ‌ها",
      icon: "📚",
      category: "آموزش‌ها و بلاگ‌ها",
      description: "مطالعه جدیدترین مقالات و راهنماها",
    },
    {
      id: "latest-videos",
      label: "آخرین ویدیوها",
      icon: "🎥",
      category: "آموزش‌ها و بلاگ‌ها",
      description: "تماشای آموزش‌های ویدیویی جدید",
    },

   
  ];

  // Group forms by category
  const groupedForms = formOptions.reduce((acc, form) => {
    if (!acc[form.category]) {
      acc[form.category] = [];
    }
    acc[form.category].push(form);
    return acc;
  }, {} as Record<string, FormOption[]>);

  const handleSuccess = (data: any) => {
    setMessage({ type: "success", text: "Form submitted successfully!" });
    console.log("Success:", data);

    // Auto-clear message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  const handleError = (error: string) => {
    setMessage({ type: "error", text: error });
    console.error("Error:", error);

    // Auto-clear message after 8 seconds
    setTimeout(() => setMessage(null), 8000);
  };

  const renderForm = () => {
    switch (activeForm) {
      case "customer":
        return <CustomerForm onSuccess={handleSuccess} onError={handleError} />;
      case "contract":
        return (
          <ContractFormHidden onSuccess={handleSuccess} onError={handleError} />
        );
      case "project":
        return <ProjectForm onSuccess={handleSuccess} onError={handleError} />;
      case "user-register":
        return (
          <UserRegisterForm onSuccess={handleSuccess} onError={handleError} />
        );
      case "team":
        return <TeamForm onSuccess={handleSuccess} onError={handleError} />;
      case "service":
        return <ServiceForm onSuccess={handleSuccess} onError={handleError} />;
      case "service-request":
        return (
          <ServiceRequestForm onSuccess={handleSuccess} onError={handleError} />
        );
      case "task":
        return <TaskForm onSuccess={handleSuccess} onError={handleError} />;
      default:
        return <div>Select a form from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Form Management</h1>
          <p className="text-gray-600 text-sm mt-1">
            Create and manage system entities
          </p>
        </div>

        <div className="p-4">
          {Object.entries(groupedForms).map(([category, forms]) => (
            <div key={category} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {category}
              </h3>
              <div className="space-y-1">
                {forms.map((form) => (
                  <button
                    key={form.id}
                    onClick={() => setActiveForm(form.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                      activeForm === form.id
                        ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{form.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{form.label}</div>
                        <div className="text-xs text-gray-500">
                          {form.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center">
              <span className="text-2xl mr-3">
                {formOptions.find((f) => f.id === activeForm)?.icon}
              </span>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {formOptions.find((f) => f.id === activeForm)?.label}
                </h2>
                <p className="text-gray-600">
                  {formOptions.find((f) => f.id === activeForm)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <p
                className={`${
                  message.type === "success" ? "text-green-700" : "text-red-700"
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          {/* Form Content */}
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default CustomerSideBar;
