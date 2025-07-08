"use client";

import React, { useState, useRef, useEffect } from "react";
import DynamicTable, { TableConfig } from "../../tables/DynamicTable";
import { toast } from "react-hot-toast";
import {
  HiOutlinePencilAlt,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi";

const CustomerProjectsList: React.FC = () => {
  const tableRef = useRef<{ refreshData: () => void }>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  // Get customer ID from token on component mount
  useEffect(() => {
    const customerIdFromToken = getCustomerIdFromToken();
    setCustomerId(customerIdFromToken);
  }, []);

  // Get customer ID from token
  const getCustomerIdFromToken = (): string | null => {
    try {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        console.error("No customer token found in localStorage");
        return null;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.customerId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Status renderer with Persian labels and colors
  const renderStatus = (status: string) => {
    const statusConfig = {
      planning: {
        label: "در حال برنامه‌ریزی",
        color: "bg-yellow-100 text-yellow-800",
      },
      active: { label: "فعال", color: "bg-green-100 text-green-800" },
      paused: { label: "متوقف شده", color: "bg-orange-100 text-orange-800" },
      completed: { label: "تکمیل شده", color: "bg-blue-100 text-blue-800" },
      cancelled: { label: "لغو شده", color: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  // Payment status renderer
  const renderPaymentStatus = (paymentStatus: string) => {
    const statusConfig = {
      pending: {
        label: "در انتظار پرداخت",
        color: "bg-yellow-100 text-yellow-800",
        icon: HiOutlineClock,
      },
      partial: {
        label: "پرداخت جزئی",
        color: "bg-orange-100 text-orange-800",
        icon: HiOutlineCurrencyDollar,
      },
      paid: {
        label: "پرداخت شده",
        color: "bg-green-100 text-green-800",
        icon: HiOutlineCheckCircle,
      },
      overdue: {
        label: "معوقه",
        color: "bg-red-100 text-red-800",
        icon: HiOutlineXCircle,
      },
    };

    const config = statusConfig[paymentStatus as keyof typeof statusConfig] || {
      label: paymentStatus,
      color: "bg-gray-100 text-gray-800",
      icon: HiOutlineClock,
    };

    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent className="w-3 h-3 ml-1" />
        {config.label}
      </span>
    );
  };

  // Progress renderer
  const renderProgress = (progress: number) => {
    const progressValue = progress || 0;
    const progressColor =
      progressValue >= 80
        ? "bg-green-500"
        : progressValue >= 50
        ? "bg-yellow-500"
        : progressValue >= 25
        ? "bg-orange-500"
        : "bg-red-500";

    return (
      <div className="flex items-center space-x-2 space-x-reverse">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600 min-w-[35px]">
          {progressValue}%
        </span>
      </div>
    );
  };

  // Amount formatter
  const formatAmount = (amount: number) => {
    if (!amount) return "-";
    return (
      <span className="font-semibold text-green-600">
        {amount.toLocaleString()} تومان
      </span>
    );
  };

  // Date formatter
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  // Handle view project details
  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
  };

  // Handle edit project (redirect to edit form or show modal)
  const handleEditProject = (project: any) => {
    toast.error("ویرایش پروژه در حال توسعه است");
    // You can implement edit functionality here
    console.log("Edit project:", project);
  };

  // Handle delete project
  const handleDeleteProject = async (project: any) => {
    if (!confirm(`آیا از حذف پروژه "${project.title}" اطمینان دارید؟`)) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${project._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success("پروژه با موفقیت حذف شد");
        tableRef.current?.refreshData();
      } else {
        toast.error(result.error || "خطا در حذف پروژه");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("خطا در حذف پروژه");
    }
  };

  // Custom fetch function for DynamicTable
  const fetchProjectsData = async () => {
    if (!customerId) {
      throw new Error("Customer ID not found");
    }

    try {
      const response = await fetch("/api/projects/filterdByCustomer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          customerId: customerId,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch projects");
      }

      return result;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };

  // Table configuration
  const tableConfig: TableConfig = {
    title: "لیست پروژه‌های من",
    description: "مشاهده و مدیریت پروژه‌های شما",
    endpoint: "/api/projects/filterdByCustomer", // This will be overridden by custom fetch
    deleteEndpoint: "/api/projects",
    columns: [
      {
        key: "title",
        label: "عنوان پروژه",
        type: "text",
        sortable: true,
        width: "20%",
        render: (value: string, row: any) => (
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="bg-blue-100 p-2 rounded-lg">
              <HiOutlineDocumentText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{value}</div>
              {row.name && row.name !== value && (
                <div className="text-xs text-gray-500">{row.name}</div>
              )}
            </div>
          </div>
        ),
      },
      {
        key: "status",
        label: "وضعیت",
        type: "text",
        sortable: true,
        width: "12%",
        render: (value: string) => renderStatus(value),
      },
      {
        key: "progress",
        label: "پیشرفت",
        type: "number",
        sortable: true,
        width: "15%",
        render: (value: number) => renderProgress(value),
      },
      {
        key: "paymentStatus",
        label: "وضعیت پرداخت",
        type: "text",
        sortable: true,
        width: "13%",
        render: (value: string) => renderPaymentStatus(value),
      },
      {
        key: "totalAmount",
        label: "مبلغ کل",
        type: "number",
        sortable: true,
        width: "12%",
        render: (value: number) => formatAmount(value),
      },
      {
        key: "paidAmount",
        label: "پرداخت شده",
        type: "number",
        sortable: true,
        width: "12%",
        render: (value: number) => formatAmount(value),
      },
      {
        key: "startDate",
        label: "تاریخ شروع",
        type: "date",
        sortable: true,
        width: "10%",
        render: (value: string) => (
          <div className="flex items-center text-sm text-gray-600">
            <HiOutlineCalendar className="w-4 h-4 ml-1" />
            {formatDate(value)}
          </div>
        ),
      },
      {
        key: "expectedEndDate",
        label: "تاریخ پایان",
        type: "date",
        sortable: true,
        width: "10%",
        render: (value: string) => (
          <div className="flex items-center text-sm text-gray-600">
            <HiOutlineCalendar className="w-4 h-4 ml-1" />
            {formatDate(value)}
          </div>
        ),
      },
    ],
    actions: {
      view: true,
      edit: true,
      delete: true,
    },
    onView: handleViewProject,
    onEdit: handleEditProject,
    onDelete: handleDeleteProject,
    className: "shadow-lg",
  };

  // Close details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedProject(null);
  };

  // Don't render table until we have customer ID
  if (!customerId) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="mr-4 text-gray-600">در حال بارگذاری...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              پروژه‌های من
            </h1>
            <p className="text-blue-100">
              مشاهده و مدیریت تمام پروژه‌های شما در یک مکان
            </p>
          </div>
        </div>

        {/* Custom Table with header injection */}
        <CustomProjectTable
          ref={tableRef}
          config={tableConfig}
          customerId={customerId}
          fetchData={fetchProjectsData}
        />

        {/* Project Details Modal */}
        {showDetailsModal && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className=" bg-blue-600  p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">جزئیات پروژه</h2>
                    <p className="text-blue-100">{selectedProject.title}</p>
                  </div>
                  <button
                    onClick={closeDetailsModal}
                    className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                  >
                    <HiOutlineXCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      اطلاعات کلی
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          عنوان پروژه
                        </label>
                        <p className="text-gray-900 font-medium">
                          {selectedProject.title}
                        </p>
                      </div>

                      {selectedProject.description && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            توضیحات
                          </label>
                          <p className="text-gray-900">
                            {selectedProject.description}
                          </p>
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          وضعیت
                        </label>
                        <div className="mt-1">
                          {renderStatus(selectedProject.status)}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          پیشرفت
                        </label>
                        <div className="mt-2">
                          {renderProgress(selectedProject.progress)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      اطلاعات مالی
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          وضعیت پرداخت
                        </label>
                        <div className="mt-1">
                          {renderPaymentStatus(selectedProject.paymentStatus)}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          مبلغ کل
                        </label>
                        <p className="text-gray-900 font-medium">
                          {formatAmount(selectedProject.totalAmount)}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          مبلغ پرداخت شده
                        </label>
                        <p className="text-gray-900 font-medium">
                          {formatAmount(selectedProject.paidAmount)}
                        </p>
                      </div>

                      {selectedProject.remainingAmount && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            مبلغ باقی‌مانده
                          </label>
                          <p className="text-red-600 font-medium">
                            {formatAmount(selectedProject.remainingAmount)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Timeline Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      زمان‌بندی
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          تاریخ شروع
                        </label>
                        <div className="flex items-center mt-1">
                          <HiOutlineCalendar className="w-4 h-4 text-gray-400 ml-2" />
                          <p className="text-gray-900">
                            {formatDate(selectedProject.startDate)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          تاریخ پایان پیش‌بینی شده
                        </label>
                        <div className="flex items-center mt-1">
                          <HiOutlineCalendar className="w-4 h-4 text-gray-400 ml-2" />
                          <p className="text-gray-900">
                            {formatDate(selectedProject.expectedEndDate)}
                          </p>
                        </div>
                      </div>

                      {selectedProject.actualEndDate && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            تاریخ پایان واقعی
                          </label>
                          <div className="flex items-center mt-1">
                            <HiOutlineCalendar className="w-4 h-4 text-gray-400 ml-2" />
                            <p className="text-gray-900">
                              {formatDate(selectedProject.actualEndDate)}
                            </p>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          تاریخ ایجاد
                        </label>
                        <div className="flex items-center mt-1">
                          <HiOutlineCalendar className="w-4 h-4 text-gray-400 ml-2" />
                          <p className="text-gray-900">
                            {formatDate(selectedProject.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      تیم پروژه
                    </h3>

                    <div className="space-y-3">
                      {selectedProject.projectManagerId && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            مدیر پروژه
                          </label>
                          <div className="flex items-center mt-1">
                            <HiOutlineUser className="w-4 h-4 text-gray-400 ml-2" />
                            <p className="text-gray-900">
                              {selectedProject.projectManagerId.name ||
                                selectedProject.projectManagerId}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedProject.teamMembers &&
                        selectedProject.teamMembers.length > 0 && (
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              اعضای تیم
                            </label>
                            <div className="mt-2 space-y-1">
                              {selectedProject.teamMembers.map(
                                (member: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <HiOutlineUser className="w-3 h-3 text-gray-400 ml-2" />
                                    <span className="text-sm text-gray-700">
                                      {member.name || member}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {selectedProject.contractId && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">
                            شماره قرارداد
                          </label>
                          <div className="flex items-center mt-1">
                            <HiOutlineDocumentText className="w-4 h-4 text-gray-400 ml-2" />
                            <p className="text-gray-900">
                              {selectedProject.contractId}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {(selectedProject.notes ||
                  selectedProject.requirements ||
                  selectedProject.deliverables) && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      اطلاعات تکمیلی
                    </h3>

                    {selectedProject.requirements && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          الزامات پروژه
                        </label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-900 text-sm">
                            {selectedProject.requirements}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedProject.deliverables && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          تحویلات
                        </label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-900 text-sm">
                            {selectedProject.deliverables}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedProject.notes && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          یادداشت‌ها
                        </label>
                        <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-900 text-sm">
                            {selectedProject.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-3 space-x-reverse border-t pt-6">
                  <button
                    onClick={closeDetailsModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    بستن
                  </button>
                  <button
                    onClick={() => {
                      handleEditProject(selectedProject);
                      closeDetailsModal();
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <HiOutlinePencilAlt className="w-4 h-4 ml-2" />
                    ویرایش پروژه
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom table component that handles the header injection
const CustomProjectTable = React.forwardRef<
  { refreshData: () => void },
  {
    config: TableConfig;
    customerId: string;
    fetchData: () => Promise<any>;
  }
>(({ config, customerId, fetchData }, ref) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    if (customerId) {
      fetchProjectsData();
    }
  }, [customerId]);

  const fetchProjectsData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchData();
      setData(result.data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const formatCellValue = (value: any, column: any, row: any) => {
    if (column.render) {
      return column.render(value, row);
    }

    switch (column.type) {
      case "date":
        return value ? new Date(value).toLocaleDateString("fa-IR") : "-";
      case "number":
        return value || 0;
      default:
        return value || "-";
    }
  };

  const refreshData = () => {
    fetchProjectsData();
  };

  React.useImperativeHandle(ref, () => ({
    refreshData,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="mr-4 text-gray-600">در حال بارگذاری پروژه‌ها...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">خطا در بارگذاری پروژه‌ها: {error}</p>
        <button
          onClick={fetchProjectsData}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${config.className || ""}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">{config.title}</h2>
        {config.description && (
          <p className="text-gray-600 mt-1">{config.description}</p>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {config.columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer hover:bg-gray-100" : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center justify-between">
                    {column.label}
                    {column.sortable && (
                      <span className="ml-2">
                        {sortConfig?.key === column.key
                          ? sortConfig.direction === "asc"
                            ? "↑"
                            : "↓"
                          : "↕"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {(config.actions?.view ||
                config.actions?.edit ||
                config.actions?.delete) && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={config.columns.length + 1}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  هیچ پروژه‌ای یافت نشد
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr
                  key={row._id || row.id || index}
                  className="hover:bg-gray-50"
                >
                  {config.columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {formatCellValue(row[column.key], column, row)}
                    </td>
                  ))}
                  {(config.actions?.view ||
                    config.actions?.edit ||
                    config.actions?.delete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-1">
                        {config.actions?.view && (
                          <div className="relative group">
                            <button
                              onClick={() => config.onView?.(row)}
                              className="text-blue-600 border hover:text-blue-900 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                            >
                              <HiOutlineEye className="w-4 h-4" />
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              مشاهده جزئیات
                            </span>
                          </div>
                        )}
                        {config.actions?.edit && (
                          <div className="relative group">
                            <button
                              onClick={() => config.onEdit?.(row)}
                              className="text-amber-600 border hover:text-amber-900 px-3 py-2 rounded-lg hover:bg-amber-50 transition-all duration-200 flex items-center justify-center"
                            >
                              <HiOutlinePencilAlt className="w-4 h-4" />
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              ویرایش
                            </span>
                          </div>
                        )}
                        {config.actions?.delete && (
                          <div className="relative group">
                            <button
                              onClick={() => config.onDelete?.(row)}
                              className="text-red-600 border hover:text-red-900 px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center justify-center"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                              حذف
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            نمایش {sortedData.length} پروژه
          </div>
          <button
            onClick={fetchProjectsData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            بروزرسانی
          </button>
        </div>
      </div>
    </div>
  );
});

CustomProjectTable.displayName = "CustomProjectTable";

export default CustomerProjectsList;
