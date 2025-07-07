"use client";

import React, { useState, useEffect } from "react";

export interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "number" | "date" | "email" | "phone" | "status";
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}
export interface CustomAction {
  label: string;
  icon: string;
  className?: string;
  onClick: (row: any) => void;
  condition?: (row: any) => boolean;
}



export interface TableConfig {
  title: string;
  description?: string;
  endpoint: string;
  deleteEndpoint?: string;
  columns: TableColumn[];
  actions?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    custom?: CustomAction[];
  };
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

interface DynamicTableProps {
  config: TableConfig;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ config }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    fetchData();
  }, [config.endpoint]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(config.endpoint);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch data");
      }

      setData(result.data || []);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
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

  const formatCellValue = (value: any, column: TableColumn) => {
    if (column.render) {
      return column.render(value, data);
    }

    switch (column.type) {
      case "date":
        return value ? new Date(value).toLocaleDateString("fa-IR") : "-";
      case "phone":
        return value || "-";
      case "email":
        return value || "-";
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              value === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {value === "active" ? "فعال" : "غیرفعال"}
          </span>
        );
      default:
        return value || "-";
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("آیا از حذف این آیتم اطمینان دارید؟")) {
      return;
    }

    try {
      // Use the detailes endpoint for delete operations
      const deleteEndpoint = config.endpoint.includes("/detailes")
        ? config.endpoint
        : `${config.endpoint}/detailes`;

      const response = await fetch(deleteEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          id: id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Refresh data after successful deletion
      await fetchData();

      if (config.onDelete) {
        config.onDelete(id);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("خطا در حذف آیتم");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">خطا در بارگذاری داده‌ها: {error}</p>
        <button
          onClick={fetchData}
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
                  هیچ داده‌ای یافت نشد
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
                      {formatCellValue(row[column.key], column)}
                    </td>
                  ))}
                  {(config.actions?.view ||
                    config.actions?.edit ||
                    config.actions?.delete) && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2 space-x-reverse">
                        {config.actions?.view && (
                          <button
                            onClick={() => config.onView?.(row)}
                            className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50"
                            title="مشاهده جزئیات"
                          >
                            👁
                          </button>
                        )}
                        {config.actions?.edit && (
                          <button
                            onClick={() => config.onEdit?.(row)}
                            className="text-yellow-600 hover:text-yellow-900 px-2 py-1 rounded hover:bg-yellow-50"
                            title="ویرایش"
                          >
                            ✏️
                          </button>
                        )}
                        {config.actions?.delete && (
                          <button
                            onClick={() => handleDelete(row._id || row.id)}
                            className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                            title="حذف"
                          >
                            🗑️
                          </button>
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
            نمایش {sortedData.length} آیتم
          </div>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            بروزرسانی
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
