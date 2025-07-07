"use client";

import React, { useState, useEffect } from "react";


export interface ModalConfig {
  title: string;
  type: "view" | "edit" | "delete" | "custom";
  size?: "sm" | "md" | "lg" | "xl";
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  fields?: any[];
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
  customContent?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

interface DynamicModalProps {
  isOpen: boolean;
  config: ModalConfig;
  itemId?: string | undefined | null;
  initialData?: any;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  config,
  itemId,
  initialData,
}) => {
  const [data, setData] = useState<any>(initialData || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && itemId && config.endpoint && config.type !== "delete") {
      fetchData();
    }
  }, [isOpen, itemId, config.endpoint]);

  const fetchData = async () => {
    if (!itemId || !config.endpoint) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(config.endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "id": itemId,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch data");
      }

      setData(result.data || {});
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      if (config.onError) {
        config.onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!itemId || !config.endpoint) return;

    try {
      setLoading(true);
      setError(null);

      const method = config.method || (config.type === "delete" ? "DELETE" : "PATCH");
      
      const response = await fetch(config.endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          "id": itemId,
        },
        body: config.type !== "delete" ? JSON.stringify(data) : undefined,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Operation failed");
      }

      if (config.onSuccess) {
        config.onSuccess(result);
      }

      handleClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      if (config.onError) {
        config.onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setData({});
    setError(null);
    if (config.onClose) {
      config.onClose();
    }
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const getSizeClass = () => {
    switch (config.size) {
      case "sm":
        return "max-w-md";
      case "lg":
        return "max-w-4xl";
      case "xl":
        return "max-w-6xl";
      default:
        return "max-w-2xl";
    }
  };

  const renderField = (field: any) => {
    const value = data[field.key] || "";
    const isReadOnly = config.type === "view";

    const baseClassName = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      isReadOnly ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
    }`;

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            key={field.key}
            value={value}
            onChange={(e) => !isReadOnly && handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={`${baseClassName} h-24 resize-vertical`}
            readOnly={isReadOnly}
            rows={3}
          />
        );

      case "select":
        return (
          <select
            key={field.key}
            value={value}
            onChange={(e) => !isReadOnly && handleInputChange(field.key, e.target.value)}
            className={baseClassName}
            disabled={isReadOnly}
          >
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "date":
        return (
          <input
            key={field.key}
            type="text"
            value={value ? new Date(value).toLocaleDateString("fa-IR") : ""}
            className={`${baseClassName} bg-gray-100`}
            readOnly
          />
        );

      default:
        return (
          <input
            key={field.key}
            type={field.type || "text"}
            value={value}
            onChange={(e) => !isReadOnly && handleInputChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            className={baseClassName}
            readOnly={isReadOnly}
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-lg ${getSizeClass()} w-full max-h-[90vh] overflow-hidden`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">{config.title}</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            disabled={loading}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-700">{error}</p>
            </div>
          ) : config.type === "delete" ? (
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                تأیید حذف
              </h4>
              <p className="text-gray-600 mb-6">
                آیا از حذف این آیتم اطمینان دارید؟ این عمل قابل بازگشت نیست.
              </p>
            </div>
          ) : config.customContent ? (
            config.customContent
          ) : (
            <div className="space-y-4">
              {config.fields?.map((field) => (
                <div key={field.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 mr-1">*</span>}
                  </label>
                  {renderField(field)}
                  {field.description && (
                    <p className="text-gray-500 text-sm">{field.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 space-x-reverse p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            {config.cancelText || "لغو"}
          </button>
          
          {config.type !== "view" && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-4 py-2 rounded transition-colors ${
                config.type === "delete"
                  ? "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400"
                  : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400"
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  در حال پردازش...
                </div>
              ) : (
                config.confirmText || 
                (config.type === "delete" ? "حذف" : "ذخیره تغییرات")
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
