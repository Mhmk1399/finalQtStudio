"use client";

import React, { useState } from "react";
import DynamicModal, { ModalConfig } from "../../components/DynamicModal";
import toast from "react-hot-toast";
import { TableConfig } from "@/types/tables";
import DynamicTable from "./DynamicTable";

const TransactionsAdmin: React.FC = () => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [refreshTable, setRefreshTable] = useState(0);

  const handleView = (transaction: any) => {
    const config: ModalConfig = {
      title: "مشاهده جزئیات تراکنش",
      type: "view",
      size: "lg",
      endpoint: "/api/transactions/details",
      fields: [
        { key: "subject", label: "موضوع", type: "text" },
        { key: "date", label: "تاریخ", type: "date" },
        { key: "debtor", label: "بدهکار", type: "number" },
        { key: "fastener", label: "بستانکار", type: "number" },
        { 
          key: "users", 
          label: "کاربر", 
          type: "text",
          render: (value: any) => {
            if (!value) return "-";
            if (typeof value === 'object' && value.name) {
              return `${value.name} (${value.email || 'بدون ایمیل'})`;
            }
            return value.toString();
          }
        },
        { 
          key: "customer", 
          label: "مشتری", 
          type: "text",
          render: (value: any) => {
            if (!value) return "-";
            if (typeof value === 'object' && value.name) {
              return `${value.name} ${value.businessName ? `- ${value.businessName}` : ''} (${value.email || 'بدون ایمیل'})`;
            }
            return value.toString();
          }
        },
      ],
      onClose: () => setShowModal(false),
    };

    setModalConfig(config);
    setSelectedTransactionId(transaction._id || transaction.id);
    setShowModal(true);
  };

  const handleEdit = (transaction: any) => {
    const config: ModalConfig = {
      title: "ویرایش تراکنش",
      type: "edit",
      size: "lg",
      endpoint: "/api/transactions/details",
      method: "PATCH",
      fields: [
        {
          key: "subject",
          label: "موضوع",
          type: "text",
          required: true,
        },
        {
          key: "date",
          label: "تاریخ",
          type: "date",
          required: true,
        },
        {
          key: "debtor",
          label: "بدهکار",
          type: "number",
          required: true,
        },
        {
          key: "fastener",
          label: "بستانکار",
          type: "number",
          required: true,
        },
        { 
          key: "users", 
          label: "کاربر", 
          type: "select",
          optionsEndpoint: "/api/users",
          optionLabelKey: "name"
        },
        { 
          key: "customer", 
          label: "مشتری", 
          type: "select",
          optionsEndpoint: "/api/customers",
          optionLabelKey: "name"
        },
      ],
      onSuccess: (data) => {
        console.log("Transaction updated successfully:", data);
        toast.success("تراکنش با موفقیت ویرایش شد");
        setRefreshTable((prev) => prev + 1);
      },
      onError: (error) => {
        toast.error("خطا در ویرایش تراکنش");
        console.error("Update error:", error);
      },
      onClose: () => setShowModal(false),
      confirmText: "ذخیره تغییرات",
    };

    setModalConfig(config);
    setSelectedTransactionId(transaction._id || transaction.id);
    setShowModal(true);
  };

  const handleDelete = (transaction: any) => {
    const config: ModalConfig = {
      title: "حذف تراکنش",
      type: "delete",
      size: "md",
      endpoint: "/api/transactions/details",
      method: "DELETE",
      onSuccess: (data) => {
        console.log("Transaction deleted successfully:", data);
        toast.success("تراکنش با موفقیت حذف شد");
        setRefreshTable((prev) => prev + 1);
      },
      onError: (error) => {
        toast.error("خطا در حذف تراکنش: " + error);
        console.error("Delete error:", error);
      },
      onClose: () => setShowModal(false),
      confirmText: "حذف تراکنش",
      cancelText: "لغو",
    };

    setModalConfig(config);
    setSelectedTransactionId(transaction._id || transaction.id);
    setShowModal(true);
  };

  const transactionsTableConfig: TableConfig = {
    title: "لیست تراکنش‌ها",
    description: "مدیریت و مشاهده تراکنش‌های سیستم",
    endpoint: "/api/transactions",
    columns: [
      {
        key: "subject",
        label: "موضوع",
        type: "text",
        sortable: true,
        width: "200px",
        render: (value) => (
          <span className="text-sm font-medium text-gray-900">
            {value || "-"}
          </span>
        ),
      },
      {
        key: "date",
        label: "تاریخ",
        type: "date",
        sortable: true,
        width: "120px",
        render: (value) => {
          if (!value) return "-";
          return (
            <span className="text-sm text-gray-600">
              {new Date(value).toLocaleDateString("fa-IR")}
            </span>
          );
        },
      },
      {
        key: "debtor",
        label: "بدهکار",
        type: "number",
        sortable: true,
        width: "120px",
        render: (value) => (
          <span className="font-semibold text-red-600">
            {value?.toLocaleString()} ریال
          </span>
        ),
      },
      {
        key: "fastener",
        label: "بستانکار",
        type: "number",
        sortable: true,
        width: "120px",
        render: (value) => (
          <span className="font-semibold text-green-600">
            {value?.toLocaleString()} ریال
          </span>
        ),
      },
      {
        key: "users",
        label: "کاربر",
        type: "text",
        sortable: true,
        width: "150px",
        render: (value) => {
          if (!value) return "-";
          return (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {typeof value === 'object' && value.name ? value.name : (typeof value === 'string' ? value.substring(0, 8) + "..." : "نامشخص")}
            </span>
          );
        },
      },
      {
        key: "customer",
        label: "مشتری",
        type: "text",
        sortable: true,
        width: "150px",
        render: (value) => {
          if (!value) return "-";
          return (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
              {typeof value === 'object' && value.name ? value.name : (typeof value === 'string' ? value.substring(0, 8) + "..." : "نامشخص")}
            </span>
          );
        },
      },
      {
        key: "_id",
        label: "شناسه",
        type: "text",
        sortable: false,
        width: "100px",
        render: (value) => (
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
            {value ? value.substring(0, 8) + "..." : "-"}
          </span>
        ),
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
        config={transactionsTableConfig}
        key={refreshTable}
      />

      {/* Dynamic Modal */}
      {showModal && modalConfig && (
        <DynamicModal
          isOpen={showModal}
          config={modalConfig}
          itemId={selectedTransactionId}
        />
      )}
    </div>
  );
};

export default TransactionsAdmin;
