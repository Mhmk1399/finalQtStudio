"use client";

import React, { useState } from "react";
import DynamicTable from "@/components/tables/DynamicTable";
import DynamicModal, { ModalConfig } from "@/components/DynamicModal";
import { TableConfig } from "@/types/tables";
import { HiOutlineCloudUpload } from "react-icons/hi";

const UserTasksPage = () => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showGoogleDriveModal, setShowGoogleDriveModal] = useState(false);

  const getCustomerIdFromToken = (): string | null => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("توکن کاربر در localStorage یافت نشد");
        return null;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("توکن رمزگشایی شده:", decodedToken);

      if (decodedToken.userId) {
        return decodedToken.userId;
      } else {
        console.error("userId در محتوای توکن یافت نشد");
        return null;
      }
    } catch (error) {
      console.error("خطا در رمزگشایی توکن:", error);
      return null;
    }
  };

  // Helper function to translate status to Persian
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "todo":
        return "انجام نشده";
      case "in-progress":
        return "در حال انجام";
      case "completed":
        return "تکمیل شده";
      case "pending":
        return "در انتظار";
      case "cancelled":
        return "لغو شده";
      default:
        return status;
    }
  };

  // Helper function to translate priority to Persian
  const getPriorityLabel = (priority: string): string => {
    switch (priority) {
      case "low":
        return "کم";
      case "medium":
        return "متوسط";
      case "high":
        return "بالا";
      case "urgent":
        return "فوری";
      case "critical":
        return "بحرانی";
      default:
        return priority;
    }
  };

  // Helper function to get status color classes
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Helper function to get priority color classes
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "critical":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Custom render functions for status and priority
  const renderStatus = (status: string) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
          status
        )}`}
      >
        {getStatusLabel(status)}
      </span>
    );
  };

  const renderPriority = (priority: string) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
          priority
        )}`}
      >
        {getPriorityLabel(priority)}
      </span>
    );
  };

  // Format date to Persian
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle Google Drive upload button click
  const handleGoogleDriveUpload = (row: any) => {
    console.log('Google Drive upload button clicked for task:', row._id);
    setSelectedTaskId(row._id);
    setShowGoogleDriveModal(true);
  };

  // Handle upload file button click - FIXED
  const handleUploadFile = (row: any) => {
    console.log('Upload button clicked for task:', row._id);
    console.log('Current showFileUpload state:', showFileUpload);
    setSelectedTaskId(row._id);
    setShowFileUpload(true);
    console.log('Modal should open now, showFileUpload set to true');
  };

  // Handle view task
  const handleViewTask = (row: any) => {
    const viewConfig: ModalConfig = {
      title: `جزئیات وظیفه: ${row.title}`,
      type: "view",
      size: "lg",
      endpoint: "/api/tasks/detailes",
      method: "GET",
      onClose: () => setIsModalOpen(false),
      fields: [
        {
          key: "title",
          label: "عنوان وظیفه",
          type: "text",
        },
        {
          key: "description",
          label: "توضیحات",
          type: "textarea",
        },
        {
          key: "status",
          label: "وضعیت",
          type: "text",
          render: (value: string) => getStatusLabel(value),
        },
        {
          key: "priority",
          label: "اولویت",
          type: "text",
          render: (value: string) => getPriorityLabel(value),
        },
        {
          key: "startDate",
          label: "تاریخ شروع",
          type: "date",
        },
        {
          key: "dueDate",
          label: "مهلت انجام",
          type: "date",
        },
        {
          key: "notes",
          label: "یادداشت‌ها",
          type: "textarea",
        },
        {
          key: "deliverables",
          label: "تحویلی‌ها",
          type: "textarea",
        },
      ],
    };

    setModalConfig(viewConfig);
    setSelectedTaskId(row._id);
    setIsModalOpen(true);
  };

  // Handle edit task
  const handleEditTask = (row: any) => {
    const editConfig: ModalConfig = {
      title: `ویرایش وظیفه: ${row.title}`,
      type: "edit",
      size: "md",
      endpoint: "/api/tasks/detailes",
      method: "PATCH",
      onSuccess: (data) => {
        console.log("Task updated successfully:", data);
        setIsModalOpen(false);
        // Refresh the table
        window.location.reload();
      },
      onError: (error) => {
        console.error("Error updating task:", error);
        alert("خطا در به‌روزرسانی وظیفه: " + error);
      },
      onClose: () => setIsModalOpen(false),
      confirmText: "ذخیره تغییرات",
      cancelText: "انصراف",
      fields: [
        {
          key: "status",
          label: "وضعیت",
          type: "select",
          required: true,
          options: [
            { value: "todo", label: "انجام نشده" },
            { value: "in-progress", label: "در حال انجام" },
            { value: "completed", label: "تکمیل شده" },
            { value: "pending", label: "در انتظار" },
            { value: "cancelled", label: "لغو شده" },
          ],
        },
        {
          key: "notes",
          label: "یادداشت‌ها",
          type: "textarea",
          required: false,
          placeholder: "یادداشت‌های خود را اینجا بنویسید...",
        },
        {
          key: "deliverables",
          label: "تحویلی‌ها",
          type: "textarea",
          required: false,
          placeholder: "تحویلی‌ها خود را اینجا بنویسید...",
        },
      ],
    };

    setModalConfig(editConfig);
    setSelectedTaskId(row._id);
    setIsModalOpen(true);
  };

  // Custom action renderer for upload button
  const renderUploadAction = (row: any) => {
    return (
      <button
        onClick={() => handleUploadFile(row)}
        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        title="آپلود فایل"
      >
        <HiOutlineCloudUpload className="w-4 h-4 mr-1" />
        آپلود
      </button>
    );
  };

  // Custom action renderer for Google Drive upload button
  const renderGoogleDriveAction = (row: any) => {
    return (
      <button
        onClick={() => handleGoogleDriveUpload(row)}
        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ml-2"
        title="آپلود به گوگل درایو"
      >
        <HiOutlineCloudUpload className="w-4 h-4 mr-1" />
        گوگل درایو
      </button>
    );
  };

  const id = getCustomerIdFromToken();

  const tableConfig: TableConfig = {
    title: `وظایف من`,
    description: "لیست وظایف اختصاص داده شده به شما.",
    endpoint: `/api/tasks/byUsers`,
    headers: id ? { id } : {},
    columns: [
      { key: "title", label: "عنوان", sortable: true },
      { key: "description", label: "توضیحات" },
      {
        key: "status",
        label: "وضعیت",
        type: "status",
        render: (value: string) => renderStatus(value),
      },
      {
        key: "priority",
        label: "اولویت",
        type: "status",
        render: (value: string) => renderPriority(value),
      },
      {
        key: "startDate",
        label: "تاریخ شروع",
        type: "date",
        render: (value: string) => formatDate(value),
      },
      {
        key: "dueDate",
        label: "مهلت انجام",
        type: "date",
        render: (value: string) => formatDate(value),
      },
      { key: "notes", label: "یادداشت‌ها" },
      { key: "deliverables", label: "تحویلی‌ها" },
      {
        key: "actions",
        label: "عملیات",
        type: "custom",
        render: (value: any, row: any) => (
          <div className="flex items-center space-x-2">
            {renderUploadAction(row)}
            {renderGoogleDriveAction(row)}
          </div>
        ),
      },
    ],
    actions: {
      view: true,
      edit: true,
      delete: false,
    },
    onView: handleViewTask,
    onEdit: handleEditTask,
    onDelete: (row) => {
      console.log("حذف وظیفه:", row);
      alert(`حذف وظیفه: ${row.title}`);
    },
  };

  // نمایش حالت بارگذاری یا خطا در صورت عدم وجود شناسه کاربر
  if (!id) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">
            امکان بارگذاری اطلاعات کاربر وجود ندارد. لطفاً دوباره وارد شوید.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <DynamicTable config={tableConfig} />

      {isModalOpen && modalConfig && (
        <DynamicModal
          isOpen={isModalOpen}
          config={modalConfig}
          itemId={selectedTaskId}
        />
      )}

      {/* Google Drive Upload Modal */}
      {showGoogleDriveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                آپلود فایل به گوگل درایو
              </h3>
              <button
                               onClick={() => setShowGoogleDriveModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 h-full">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  وظیفه: <span className="font-medium">{selectedTaskId}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  برای آپلود فایل‌های مربوط به این وظیفه، از گوگل درایو استفاده کنید.
                </p>
              </div>

              {/* Google Drive Iframe */}
              <div className="w-full h-5/6 border border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src="https://drive.google.com/drive/my-drive?lfhs=2"
                  className="w-full h-full"
                  title="Google Drive Upload"
                  allow="camera; microphone; fullscreen"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t border-gray-200 space-x-2 space-x-reverse">
              <button
                onClick={() => setShowGoogleDriveModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                بستن
              </button>
              <button
                onClick={() => {
                  // You can add any additional logic here if needed
                  console.log('Files uploaded for task:', selectedTaskId);
                  setShowGoogleDriveModal(false);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTasksPage;
