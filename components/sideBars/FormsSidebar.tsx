"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaUsers,
  FaProjectDiagram,
  FaPlus,
  FaChevronLeft,
  FaUserPlus,
  FaUserCog,
  FaCog,
  FaServicestack,
  FaFileAlt,
  FaCheckSquare,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import {
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineCollection,
  HiOutlineCash,
} from "react-icons/hi";
import CustomerForm from "../forms/customers/CustomerForm";
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
import ServicesTable from "../tables/serviceTable";
import ServiceRequestsTable from "../tables/serviceRequestTable";
import TasksTable from "../tables/taskTable";
import TransactionForm from "../forms/transactionForm";

type FormType =
  | "customer"
  | "customers-list"
  // | "contracts-list"
  | "project"
  | "projects-list"
  | "user-register"
  | "users-list"
  | "team"
  | "team-list"
  | "service"
  | "services-list"
  | "service-request"
  | "service-requests-list"
  | "task"
  | "tasks-list"
  | "transactions";

interface FormOption {
  id: FormType;
  label: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  color: string;
}

const FormsSidebar: React.FC = () => {
  const [activeForm, setActiveForm] = useState<FormType>("customer");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const formOptions: FormOption[] = [
    // Customer Management
    {
      id: "customer",
      label: "ثبت مشتری جدید",
      icon: <FaUserPlus className="w-5 h-5" />,
      category: "مدیریت مشتریان",
      description: "ثبت نام مشتری جدید در سیستم",
      color: "bg-blue-500",
    },
    {
      id: "customers-list",
      label: "لیست مشتریان",
      icon: <HiOutlineUserGroup className="w-5 h-5" />,
      category: "مدیریت مشتریان",
      description: "مشاهده و مدیریت لیست مشتریان",
      color: "bg-blue-500",
    },
    {
      id: "transactions",
      label: "ثبت تراکنش جدید",
      icon: <HiOutlineCash className="w-5 h-5" />,
      category: "مدیریت تراکنش‌ها",
      description: "   ثبت تراکنش جدید",
      color: "bg-blue-500",
    },

    // Project Management
    {
      id: "project",
      label: "ایجاد پروژه جدید",
      icon: <FaProjectDiagram className="w-5 h-5" />,
      category: "مدیریت پروژه‌ها",
      description: "ایجاد و تعریف پروژه جدید",
      color: "bg-green-500",
    },
    {
      id: "projects-list",
      label: "لیست پروژه‌ها",
      icon: <HiOutlineCollection className="w-5 h-5" />,
      category: "مدیریت پروژه‌ها",
      description: "مشاهده و مدیریت لیست پروژه‌ها",
      color: "bg-green-500",
    },

    // User & Team Management
    {
      id: "user-register",
      label: "ثبت کاربر جدید",
      icon: <FaUser className="w-5 h-5" />,
      category: "مدیریت کاربران و تیم‌ها",
      description: "ثبت نام کاربر جدید در سیستم",
      color: "bg-purple-500",
    },
    {
      id: "users-list",
      label: "لیست کاربران",
      icon: <FaUsers className="w-5 h-5" />,
      category: "مدیریت کاربران و تیم‌ها",
      description: "مشاهده و مدیریت لیست کاربران",
      color: "bg-purple-500",
    },
    {
      id: "team",
      label: "ایجاد تیم جدید",
      icon: <FaUserCog className="w-5 h-5" />,
      category: "مدیریت کاربران و تیم‌ها",
      description: "ایجاد تیم جدید و تخصیص اعضا",
      color: "bg-purple-500",
    },
    {
      id: "team-list",
      label: "لیست تیم‌ها",
      icon: <HiOutlineUserGroup className="w-5 h-5" />,
      category: "مدیریت کاربران و تیم‌ها",
      description: "مشاهده تیم ها و تخصیص اعضا",
      color: "bg-purple-500",
    },

    // Service Management
    {
      id: "service",
      label: "تعریف سرویس جدید",
      icon: <FaServicestack className="w-5 h-5" />,
      category: "مدیریت سرویس‌ها",
      description: "تعریف و ایجاد سرویس جدید",
      color: "bg-orange-500",
    },
    {
      id: "services-list",
      label: "لیست سرویس‌ها",
      icon: <HiOutlineCog className="w-5 h-5" />,
      category: "مدیریت سرویس‌ها",
      description: "مشاهده و مدیریت لیست سرویس‌ها",
      color: "bg-orange-500",
    },

    // Requests & Tasks Management
    // {
    //   id: "service-request",
    //   label: "درخواست سرویس جدید",
    //   icon: <FaFileAlt className="w-5 h-5" />,
    //   category: "درخواست‌ها و وظایف",
    //   description: "ثبت درخواست سرویس جدید",
    //   color: "bg-red-500",
    // },
    {
      id: "service-requests-list",
      label: "لیست درخواست‌ها",
      icon: <HiOutlineClipboardList className="w-5 h-5" />,
      category: "درخواست‌ها و وظایف",
      description: "مشاهده و مدیریت درخواست‌های سرویس",
      color: "bg-red-500",
    },
    {
      id: "task",
      label: "ایجاد وظیفه جدید",
      icon: <FaPlus className="w-5 h-5" />,
      category: "درخواست‌ها و وظایف",
      description: "ایجاد و تعریف وظیفه جدید",
      color: "bg-red-500",
    },
    {
      id: "tasks-list",
      label: "لیست وظایف",
      icon: <FaCheckSquare className="w-5 h-5" />,
      category: "درخواست‌ها و وظایف",
      description: "مشاهده و مدیریت لیست وظایف",
      color: "bg-red-500",
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
    console.log("Success:", data);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleError = (error: string) => {
    setMessage({ type: "error", text: error });
    console.error("Error:", error);
    setTimeout(() => setMessage(null), 8000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderForm = () => {
    switch (activeForm) {
      case "customer":
        return <CustomerForm onSuccess={handleSuccess} onError={handleError} />;
      case "customers-list":
        return <CustomersTable />;
      // case "contracts-list":
      //   return <ContractsTable />;
      case "project":
        return <ProjectForm onSuccess={handleSuccess} onError={handleError} />;
      case "projects-list":
        return <ProjectsTable />;
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
      case "service":
        return <ServiceForm onSuccess={handleSuccess} onError={handleError} />;
      case "services-list":
        return <ServicesTable />;
      case "service-request":
        return (
          <ServiceRequestForm onSuccess={handleSuccess} onError={handleError} />
        );
      case "service-requests-list":
        return <ServiceRequestsTable />;
      case "task":
        return <TaskForm onSuccess={handleSuccess} onError={handleError} />;
      case "tasks-list":
        return <TasksTable />;
      case "transactions":
        return <TransactionForm />;
      default:
        return (
          <div className="text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              📋
            </motion.div>
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

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
  };

  const currentForm = formOptions.find((f) => f.id === activeForm);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Toggle Button */}

      {/* Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Animated Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            className="fixed lg:relative w-80 bg-white shadow-2xl overflow-y-auto z-40 h-full"
          >
            {/* Header */}
            <motion.div
              variants={itemVariants}
              className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    مدیریت سیستم
                  </h1>
                  <p className="text-blue-100 text-sm mt-1">
                    مدیریت کامل اجزای سیستم
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-white"
                >
                  <FaCog className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.div>

            {/* Navigation Items */}
            <div className="p-4">
              {Object.entries(groupedForms).map(
                ([category, forms], categoryIndex) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="mb-6"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className={`w-3 h-3 rounded-full mx-2 ${
                          categoryIndex === 0
                            ? "bg-blue-500"
                            : categoryIndex === 1
                            ? "bg-green-500"
                            : categoryIndex === 2
                            ? "bg-purple-500"
                            : categoryIndex === 3
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                      />
                      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        {category}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {forms.map((form, index) => (
                        <motion.button
                          key={form.id}
                          onClick={() => {
                            setActiveForm(form.id);
                            toggleSidebar();
                          }}
                          className={`w-full text-right p-4 rounded-xl transition-all duration-300 group ${
                            activeForm === form.id
                              ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md"
                              : "hover:bg-gray-50 border-2 border-transparent hover:border-gray-200"
                          }`}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: categoryIndex * 0.1 + index * 0.05,
                          }}
                        >
                          <div className="flex items-center">
                            <motion.div
                              className={`p-2 rounded-lg ml-3 ${
                                activeForm === form.id
                                  ? form.color + " text-white shadow-lg"
                                  : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                              }`}
                              whileHover={{ rotate: 5 }}
                            >
                              {form.icon}
                            </motion.div>
                            <div className="text-right flex-1">
                              <div
                                className={`font-medium text-sm ${
                                  activeForm === form.id
                                    ? "text-blue-700"
                                    : "text-gray-700"
                                }`}
                              >
                                {form.label}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {form.description}
                              </div>
                            </div>
                            {activeForm === form.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-blue-500 rounded-full ml-2"
                              />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )
              )}
            </div>

            {/* Footer */}
            <motion.div
              variants={itemVariants}
              className="p-4 border-t border-gray-200 bg-gray-50"
            >
              <div className="text-center text-xs text-gray-500">
                <p>نسخه 1.0.0</p>
                <p className="mt-1">© 2024 Qt Studio</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div className="flex-1 overflow-y-auto ">
        <div className="py-6 px-2">
          {/* Header */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between gap-20">
              <div className="flex items-center ">
                <motion.div
                  onClick={toggleSidebar}
                  className={`p-3 rounded-xl ml-4 ${
                    currentForm?.color || "bg-blue-500"
                  } text-white shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {currentForm?.icon || <FaUser className="w-6 h-6" />}
                </motion.div>
                <div>
                  <h2 className="md:text-3xl font-bold text-gray-900">
                    {currentForm?.label || "خوش آمدید"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {currentForm?.description ||
                      "یکی از گزینه‌های موجود را انتخاب کنید"}
                  </p>
                </div>
              </div>

              {/* Breadcrumb */}
              <div className="hidden  md:flex items-center space-x-2 text-sm text-gray-500">
                <span>داشبورد</span>
                <FaChevronLeft className="w-3 h-3" />
                <span>{currentForm?.category}</span>
                <FaChevronLeft className="w-3 h-3 " />
                <span className="text-gray-900">{currentForm?.label}</span>
              </div>
            </div>
          </motion.div>

          {/* Form Content */}
          <motion.div
            className="bg-white rounded-2xl  overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="py-6 px-2">{renderForm()}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormsSidebar;
