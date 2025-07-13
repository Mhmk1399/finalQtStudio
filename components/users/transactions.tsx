"use client";

import React from "react";
import DynamicTable from "@/components/tables/DynamicTable";
import { TableConfig } from "@/types/tables";

const UserTransactionsPage = () => {
  const getUserIdFromToken = (): string | null => {
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

  // Format currency numbers
  const formatCurrency = (amount: number) => {
    if (!amount && amount !== 0) return "-";
    return new Intl.NumberFormat("fa-IR").format(amount) + " تومان";
  };

  // Get transaction type based on debtor and fastener values
  const getTransactionType = (debtor: number, fastener: number) => {
    if (debtor > 0 && fastener === 0) {
      return {
        type: "debt",
        label: "بدهکار",
        color: "bg-red-100 text-red-800 border-red-200",
      };
    } else if (fastener > 0 && debtor === 0) {
      return {
        type: "credit",
        label: "بستانکار",
        color: "bg-green-100 text-green-800 border-green-200",
      };
    } else {
      return {
        type: "unknown",
        label: "نامشخص",
        color: "bg-gray-100 text-gray-800 border-gray-200",
      };
    }
  };

  // Render transaction type badge
  const renderTransactionType = (debtor: number, fastener: number) => {
    const transactionType = getTransactionType(debtor, fastener);
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${transactionType.color}`}
      >
        {transactionType.label}
      </span>
    );
  };

  // Calculate net amount (positive for credit, negative for debt)
  const calculateNetAmount = (debtor: number, fastener: number) => {
    return fastener - debtor;
  };

  // Render net amount with appropriate color
  const renderNetAmount = (debtor: number, fastener: number) => {
    const netAmount = calculateNetAmount(debtor, fastener);
    const isPositive = netAmount > 0;
    const isNegative = netAmount < 0;

    return (
      <span
        className={`font-medium ${
          isPositive
            ? "text-green-600"
            : isNegative
            ? "text-red-600"
            : "text-gray-600"
        }`}
      >
        {isPositive ? "+" : ""}
        {formatCurrency(Math.abs(netAmount))}
      </span>
    );
  };

  const id = getUserIdFromToken();

  const tableConfig: TableConfig = {
    title: `تراکنش‌های من`,
    description: "لیست تراکنش‌های مالی اختصاص داده شده به شما.",
    endpoint: `/api/transactions/byUsers`,
    headers: id ? { id: id } : {},
    columns: [
      {
        key: "date",
        label: "تاریخ",
        type: "date",
        sortable: true,
        render: (value: string) => formatDate(value),
      },
      {
        key: "subject",
        label: "موضوع",
        sortable: true,
      },
      {
        key: "debtor",
        label: "بدهکار",
        render: (value: number) => formatCurrency(value),
      },
      {
        key: "fastener",
        label: "بستانکار",
        render: (value: number) => formatCurrency(value),
      },
      {
        key: "type",
        label: "نوع تراکنش",
        render: (value: any, rowData: any) =>
          renderTransactionType(rowData.debtor, rowData.fastener),
      },
      {
        key: "netAmount",
        label: "مبلغ خالص",
        render: (value: any, rowData: any) =>
          renderNetAmount(rowData.debtor, rowData.fastener),
      },
    ],
    actions: {
      view: true,
      edit: false, // Users typically shouldn't edit transactions
      delete: false, // Users typically shouldn't delete transactions
    },
    onView: (row) => {
      const transactionType = getTransactionType(row.debtor, row.fastener);
      const netAmount = calculateNetAmount(row.debtor, row.fastener);

      alert(
        `جزئیات تراکنش:\n` +
          `تاریخ: ${formatDate(row.date)}\n` +
          `موضوع: ${row.subject}\n` +
          `بدهکار: ${formatCurrency(row.debtor)}\n` +
          `بستانکار: ${formatCurrency(row.fastener)}\n` +
          `نوع: ${transactionType.label}\n` +
          `مبلغ خالص: ${formatCurrency(Math.abs(netAmount))}`
      );
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
    </div>
  );
};

export default UserTransactionsPage;
