"use client";

import React, { useState } from "react";
import DynamicTable, { TableConfig } from "./DynamicTable";
import DynamicModal, { ModalConfig } from "../DynamicModal";

const ProjectsTable: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [refreshTable, setRefreshTable] = useState(0);

  const handleView = (project: any) => {
    const config: ModalConfig = {
      title: "مشاهده جزئیات پروژه",
      type: "view",
      size: "xl",
      endpoint: "/api/projects/detailes",
      fields: [
        { key: "title", label: "عنوان پروژه", type: "text" },
        { key: "description", label: "توضیحات", type: "textarea" },
        { key: "customerId", label: "شناسه مشتری", type: "text" },
        { key: "contractId", label: "شناسه قرارداد", type: "text" },
        { key: "projectManagerId", label: "شناسه مدیر پروژه", type: "text" },
        { 
          key: "status", 
          label: "وضعیت پروژه", 
          type: "select",
          options: [
            { value: "planning", label: "در حال برنامه‌ریزی" },
            { value: "active", label: "فعال" },
            { value: "paused", label: "متوقف شده" },
            { value: "completed", label: "تکمیل شده" },
            { value: "cancelled", label: "لغو شده" }
          ]
        },
        { key: "startDate", label: "تاریخ شروع", type: "date" },
        { key: "expectedEndDate", label: "تاریخ پایان پیش‌بینی شده", type: "date" },
        { key: "actualEndDate", label: "تاریخ پایان واقعی", type: "date" },
        { 
          key: "paymentStatus", 
          label: "وضعیت پرداخت", 
          type: "select",
          options: [
            { value: "pending", label: "در انتظار پرداخت" },
            { value: "partial", label: "پرداخت جزئی" },
            { value: "paid", label: "پرداخت شده" },
            { value: "overdue", label: "معوقه" }
          ]
        },
        { key: "paidAmount", label: "مبلغ پرداخت شده", type: "number" },
        { key: "totalPrice", label: "قیمت کل", type: "number" },
        { key: "finalPrice", label: "قیمت نهایی", type: "number" },
        { key: "discount", label: "تخفیف", type: "number" },
        { key: "notes", label: "یادداشت‌ها", type: "textarea" },
        { key: "internalNotes", label: "یادداشت‌های داخلی", type: "textarea" },
        { key: "createdAt", label: "تاریخ ایجاد", type: "date" },
        { key: "updatedAt", label: "آخرین به‌روزرسانی", type: "date" },
      ],
      onClose: () => setShowModal(false),
    };

    setModalConfig(config);
    setSelectedProjectId(project._id || project.id);
    setShowModal(true);
  };

  const handleEdit = (project: any) => {
    const config: ModalConfig = {
      title: "ویرایش پروژه",
      type: "edit",
      size: "xl",
      endpoint: "/api/projects/detailes",
      method: "PATCH",
      fields: [
        { key: "title", label: "عنوان پروژه", type: "text", required: true },
        { key: "description", label: "توضیحات", type: "textarea", required: true },
        { key: "customerId", label: "شناسه مشتری", type: "text", required: true },
        { key: "contractId", label: "شناسه قرارداد", type: "text", required: true },
        { key: "projectManagerId", label: "شناسه مدیر پروژه", type: "text", required: true },
        { 
          key: "status", 
          label: "وضعیت پروژه", 
          type: "select",
          required: true,
          options: [
            { value: "planning", label: "در حال برنامه‌ریزی" },
            { value: "active", label: "فعال" },
            { value: "paused", label: "متوقف شده" },
            { value: "completed", label: "تکمیل شده" },
            { value: "cancelled", label: "لغو شده" }
          ]
        },
        { key: "startDate", label: "تاریخ شروع", type: "date" },
        { key: "expectedEndDate", label: "تاریخ پایان پیش‌بینی شده", type: "date" },
        { key: "actualEndDate", label: "تاریخ پایان واقعی", type: "date" },
        { 
          key: "paymentStatus", 
          label: "وضعیت پرداخت", 
          type: "select",
          required: true,
          options: [
            { value: "pending", label: "در انتظار پرداخت" },
            { value: "partial", label: "پرداخت جزئی" },
            { value: "paid", label: "پرداخت شده" },
            { value: "overdue", label: "معوقه" }
          ]
        },
        { key: "paidAmount", label: "مبلغ پرداخت شده", type: "number" },
        { key: "totalPrice", label: "قیمت کل", type: "number", required: true },
        { key: "finalPrice", label: "قیمت نهایی", type: "number", required: true },
        { key: "discount", label: "تخفیف", type: "number" },
        { key: "notes", label: "یادداشت‌ها", type: "textarea" },
        { key: "internalNotes", label: "یادداشت‌های داخلی", type: "textarea" },
      ],
      onSuccess: (data) => {
        console.log("Project updated successfully:", data);
        setRefreshTable(prev => prev + 1);
        alert("پروژه با موفقیت به‌روزرسانی شد");
      },
      onError: (error) => {
        console.error("Update error:", error);
        alert("خطا در به‌روزرسانی پروژه: " + error);
      },
      onClose: () => setShowModal(false),
      confirmText: "ذخیره تغییرات",
    };

    setModalConfig(config);
    setSelectedProjectId(project._id || project.id);
    setShowModal(true);
  };

  const handleDelete = (project: any) => {
    const config: ModalConfig = {
      title: "حذف پروژه",
      type: "delete",
      size: "md",
      endpoint: "/api/projects/detailes",
      method: "DELETE",
      onSuccess: (data) => {
        console.log("Project deleted successfully:", data);
        setRefreshTable(prev => prev + 1);
        alert("پروژه با موفقیت حذف شد");
      },
      onError: (error) => {
        console.error("Delete error:", error);
        alert("خطا در حذف پروژه: " + error);
      },
      onClose: () => setShowModal(false),
      confirmText: "حذف پروژه",
      cancelText: "لغو",
    };

    setModalConfig(config);
    setSelectedProjectId(project._id || project.id);
    setShowModal(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: 'IRR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const projectsTableConfig: TableConfig = {
    title: "لیست پروژه‌ها",
    description: "مدیریت و مشاهده اطلاعات پروژه‌ها",
    endpoint: "/api/projects",
    columns: [
      {
        key: "title",
        label: "عنوان پروژه",
        type: "text",
        sortable: true,
        width: "200px",
      },
      {
        key: "customerId",
        label: "مشتری",
        type: "text",
        sortable: true,
        width: "150px",
        render: (value) => {
          // You might want to populate this with actual customer name
          return value ? `مشتری: ${value.substring(0, 8)}...` : "-";
        },
      },
      {
        key: "status",
        label: "وضعیت پروژه",
        type: "status",
        sortable: true,
        width: "130px",
        render: (value) => {
          const statusConfig: { [key: string]: { label: string; className: string } } = {
            planning: { label: "برنامه‌ریزی", className: "bg-blue-100 text-blue-800" },
            active: { label: "فعال", className: "bg-green-100 text-green-800" },
            paused: { label: "متوقف", className: "bg-yellow-100 text-yellow-800" },
            completed: { label: "تکمیل شده", className: "bg-purple-100 text-purple-800" },
            cancelled: { label: "لغو شده", className: "bg-red-100 text-red-800" }
          };
          const config = statusConfig[value] || { label: value, className: "bg-gray-100 text-gray-800" };
          return (
            <span className={`px-2 py-1 rounded-full text-xs ${config.className}`}>
              {config.label}
            </span>
          );
        },
      },
      {
        key: "paymentStatus",
        label: "وضعیت پرداخت",
        type: "status",
        sortable: true,
        width: "120px",
        render: (value) => {
          const statusConfig: { [key: string]: { label: string; className: string } } = {
            pending: { label: "در انتظار", className: "bg-yellow-100 text-yellow-800" },
            partial: { label: "جزئی", className: "bg-orange-100 text-orange-800" },
            paid: { label: "پرداخت شده", className: "bg-green-100 text-green-800" },
            overdue: { label: "معوقه", className: "bg-red-100 text-red-800" }
          };
          const config = statusConfig[value] || { label: value, className: "bg-gray-100 text-gray-800" };
          return (
            <span className={`px-2 py-1 rounded-full text-xs ${config.className}`}>
              {config.label}
            </span>
          );
        },
      },
      {
        key: "totalPrice",
        label: "قیمت کل",
        type: "number",
        sortable: true,
        width: "120px",
        render: (value) => {
          return value ? formatCurrency(value) : "-";
        },
      },
      {
        key: "finalPrice",
        label: "قیمت نهایی",
        type: "number",
        sortable: true,
        width: "120px",
        render: (value) => {
          return value ? formatCurrency(value) : "-";
        },
      },
      {
        key: "paidAmount",
        label: "مبلغ پرداختی",
        type: "number",
        sortable: true,
        width: "120px",
        render: (value) => {
          return value ? formatCurrency(value) : "-";
        },
      },
      {
        key: "startDate",
        label: "تاریخ شروع",
        type: "date",
        sortable: true,
        width: "120px",
      },
      {
        key: "expectedEndDate",
        label: "تاریخ پایان",
        type: "date",
        sortable: true,
        width: "120px",
      },
      {
        key: "createdAt",
        label: "تاریخ ایجاد",
        type: "date",
        sortable: true,
        width: "120px",
      },
    ],
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  };

  return (
    <div>
      <DynamicTable 
        config={projectsTableConfig} 
        key={refreshTable}
      />
      
      {/* Dynamic Modal */}
      {showModal && modalConfig && (
        <DynamicModal
          isOpen={showModal}
          config={modalConfig}
          itemId={selectedProjectId}
        />
      )}
    </div>
  );
};

export default ProjectsTable;
