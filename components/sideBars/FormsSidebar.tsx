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
import CustomersTable from "../tables/CustomersTable";
import ProjectsTable from "../tables/ProjectsTable";
import ContractsTable from "../tables/ContractsTable";
import UsersTable from "../tables/UserTable";
import TeamsTable from "../tables/TeamsTable";
// Import other table components when they're created
// import ServicesTable from "../tables/ServicesTable";
// import ServiceRequestsTable from "../tables/ServiceRequestsTable";
// import TasksTable from "../tables/TasksTable";

type FormType =
  | "customer"
  | "customers-list"
  // | "contract"
  | "contracts-list" // Add this line
  | "project"
  | "projects-list"
  | "user-register"
  | "users-list" // Add this line
  | "team"
  | "team-list" // Add this line
  | "service"
  | "services-list"
  | "service-request"
  | "service-requests-list"
  | "task"
  | "tasks-list";

interface FormOption {
  id: FormType;
  label: string;
  icon: string;
  category: string;
  description: string;
}

const FormsSidebar: React.FC = () => {
  const [activeForm, setActiveForm] = useState<FormType>("customer");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const formOptions: FormOption[] = [
    // Customer Management
    {
      id: "customer",
      label: "ثبت مشتری جدید",
      icon: "👤",
      category: "مدیریت مشتریان",
      description: "ثبت نام مشتری جدید در سیستم",
    },
    {
      id: "customers-list",
      label: "لیست مشتریان",
      icon: "👥",
      category: "مدیریت مشتریان",
      description: "مشاهده و مدیریت لیست مشتریان",
    },
    // {
    //   id: "contract",
    //   label: "ایجاد قرارداد",
    //   icon: "📋",
    //   category: "مدیریت مشتریان",
    //   description: "ایجاد قرارداد جدید برای مشتری",
    // },
    {
      id: "contracts-list",
      label: "لیست قراردادها",
      icon: "📋",
      category: "مدیریت مشتریان",
      description: "مشاهده و مدیریت لیست قراردادها",
    },

    // Project Management
    {
      id: "project",
      label: "ایجاد پروژه جدید",
      icon: "🚀",
      category: "مدیریت پروژه‌ها",
      description: "ایجاد و تعریف پروژه جدید",
    },
    {
      id: "projects-list",
      label: "لیست پروژه‌ها",
      icon: "📊",
      category: "مدیریت پروژه‌ها",
      description: "مشاهده و مدیریت لیست پروژه‌ها",
    },

    // User & Team Management
    {
      id: "user-register",
      label: "ثبت کاربر جدید",
      icon: "👤",
      category: "مدیریت کاربران و تیم‌ها",
      description: "ثبت نام کاربر جدید در سیستم",
    },
    {
      id: "users-list",
      label: "لیست کاربران",
      icon: "👥",
      category: "مدیریت کاربران و تیم‌ها",
      description: "مشاهده و مدیریت لیست کاربران",
    },
    {
      id: "team",
      label: "ایجاد تیم جدید",
      icon: "👥",
      category: "مدیریت کاربران و تیم‌ها",
      description: "ایجاد تیم جدید و تخصیص اعضا",
    },
    {
      id: "team-list",
      label: "لیست تیم‌ها",
      icon: "👥",
      category: "مدیریت کاربران و تیم‌ها",
      description: "مشاهده تیم ها و تخصیص اعضا",
    },

    // Service Management
    {
      id: "service",
      label: "تعریف سرویس جدید",
      icon: "⚙️",
      category: "مدیریت سرویس‌ها",
      description: "تعریف و ایجاد سرویس جدید",
    },
    {
      id: "services-list",
      label: "لیست سرویس‌ها",
      icon: "🔧",
      category: "مدیریت سرویس‌ها",
      description: "مشاهده و مدیریت لیست سرویس‌ها",
    },

    // Requests & Tasks Management
    {
      id: "service-request",
      label: "درخواست سرویس جدید",
      icon: "📝",
      category: "درخواست‌ها و وظایف",
      description: "ثبت درخواست سرویس جدید",
    },
    {
      id: "service-requests-list",
      label: "لیست درخواست‌ها",
      icon: "📋",
      category: "درخواست‌ها و وظایف",
      description: "مشاهده و مدیریت درخواست‌های سرویس",
    },
    {
      id: "task",
      label: "ایجاد وظیفه جدید",
      icon: "✅",
      category: "درخواست‌ها و وظایف",
      description: "ایجاد و تعریف وظیفه جدید",
    },
    {
      id: "tasks-list",
      label: "لیست وظایف",
      icon: "📌",
      category: "درخواست‌ها و وظایف",
      description: "مشاهده و مدیریت لیست وظایف",
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
    setMessage({ type: "success", text: "عملیات با موفقیت انجام شد!" });
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
      // Customer Management
      case "customer":
        return <CustomerForm onSuccess={handleSuccess} onError={handleError} />;
      case "customers-list":
        return <CustomersTable />;
      // case "contract":
      //   return (
      //     <ContractFormHidden onSuccess={handleSuccess} onError={handleError} />
      //   );
      case "contracts-list":
        return <ContractsTable />;

      // Project Management
      case "project":
        return <ProjectForm onSuccess={handleSuccess} onError={handleError} />;
      case "projects-list":
        return <ProjectsTable />;

      // User & Team Management
      case "user-register":
        return (
          <UserRegisterForm onSuccess={handleSuccess} onError={handleError} />
        );
      case "users-list":
        return <UsersTable />;

      case "team":
        return <TeamForm onSuccess={handleSuccess} onError={handleError} />;
      case "team-list":
        return <TeamsTable />;
      // Service Management
      case "service":
        return <ServiceForm onSuccess={handleSuccess} onError={handleError} />;
      case "services-list":
        return (
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              جدول سرویس‌ها
            </h3>
            <p className="text-gray-500">جدول سرویس‌ها در حال توسعه است...</p>
          </div>
        );

      // Requests & Tasks Management
      case "service-request":
        return (
          <ServiceRequestForm onSuccess={handleSuccess} onError={handleError} />
        );
      case "service-requests-list":
        return (
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              جدول درخواست‌ها
            </h3>
            <p className="text-gray-500">
              جدول درخواست‌های سرویس در حال توسعه است...
            </p>
          </div>
        );
      case "task":
        return <TaskForm onSuccess={handleSuccess} onError={handleError} />;
      case "tasks-list":
        return (
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📌</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              جدول وظایف
            </h3>
            <p className="text-gray-500">جدول وظایف در حال توسعه است...</p>
          </div>
        );

      default:
        return (
          <div className="text-center p-8">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              انتخاب کنید
            </h3>
            <p className="text-gray-500">
              یکی از گزینه‌های موجود در نوار کناری را انتخاب کنید
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">مدیریت سیستم</h1>
          <p className="text-gray-600 text-sm mt-1">مدیریت کامل اجزای سیستم</p>
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
                    className={`w-full text-right p-3 rounded-lg transition-colors duration-200 ${
                      activeForm === form.id
                        ? "bg-blue-50 border-r-4 border-blue-500 text-blue-700"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-xl ml-3">{form.icon}</span>
                      <div className="text-right">
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
              <span className="text-2xl ml-3">
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
          <div className="bg-white rounded-lg shadow-sm">{renderForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default FormsSidebar;
