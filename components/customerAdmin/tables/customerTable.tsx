"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineOfficeBuilding,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineCalendar,
} from "react-icons/hi";

interface CustomerInfo {
  businessName: string;
  customerId: string;
  email: string;
  exp: number;
  iat: number;
  isActive: boolean;
  name: string;
  phoneNumber: string;
  verificationStatus: string;
}

const CustomersTable: React.FC = () => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to extract customer info from JWT token
  const getCustomerInfoFromToken = (): CustomerInfo | null => {
    try {
      const token = localStorage.getItem("customerToken");
      if (!token) {
        console.error("No customer token found in localStorage");
        return null;
      }

      // Decode JWT token to extract customer info
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded token:", decodedToken);

      return {
        businessName: decodedToken.businessName || "",
        customerId: decodedToken.customerId || "",
        email: decodedToken.email || "",
        exp: decodedToken.exp || 0,
        iat: decodedToken.iat || 0,
        isActive: decodedToken.isActive || false,
        name: decodedToken.name || "",
        phoneNumber: decodedToken.phoneNumber || "",
        verificationStatus: decodedToken.verificationStatus || "pending",
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);
    const info = getCustomerInfoFromToken();
    if (info) {
      setCustomerInfo(info);
    } else {
      toast.error("خطا در احراز هویت - لطفاً دوباره وارد شوید");
    }
    setLoading(false);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getVerificationStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          label: "تأیید شده",
          className: "bg-green-100 text-green-800 border-green-200",
          icon: <HiOutlineCheckCircle className="w-4 h-4" />,
        };
      case "rejected":
        return {
          label: "رد شده",
          className: "bg-red-100 text-red-800 border-red-200",
          icon: <HiOutlineXCircle className="w-4 h-4" />,
        };
      default:
        return {
          label: "در انتظار تأیید",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <HiOutlineClock className="w-4 h-4" />,
        };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="mr-3 text-gray-600">در حال بارگذاری اطلاعات...</span>
      </div>
    );
  }

  if (!customerInfo) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <HiOutlineXCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            خطا در بارگذاری اطلاعات
          </h3>
          <p className="text-red-600">
            امکان دریافت اطلاعات کاربری وجود ندارد. لطفاً دوباره وارد شوید.
          </p>
        </div>
      </div>
    );
  }

  const verificationConfig = getVerificationStatusConfig(
    customerInfo.verificationStatus
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section */}
      <div className=" bg-blue-600  rounded-t-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">پروفایل کاربری</h1>
            <p className="text-blue-100">اطلاعات حساب کاربری شما</p>
          </div>
          <div className="text-right">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                customerInfo.isActive
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {customerInfo.isActive ? (
                <>
                  <HiOutlineCheckCircle className="w-4 h-4" />
                  حساب فعال
                </>
              ) : (
                <>
                  <HiOutlineXCircle className="w-4 h-4" />
                  حساب غیرفعال
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
        {/* Personal Information Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiOutlineUser className="w-5 h-5 text-blue-600" />
            اطلاعات شخصی
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <HiOutlineUser className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">نام و نام خانوادگی</p>
                  <p className="text-lg font-medium text-gray-800">
                    {customerInfo.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <HiOutlineMail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">ایمیل</p>
                  <p className="text-lg font-medium text-gray-800">
                    {customerInfo.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <HiOutlinePhone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">شماره تلفن</p>
                  <p className="text-lg font-medium text-gray-800">
                    {customerInfo.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Name */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <HiOutlineOfficeBuilding className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">نام کسب‌وکار</p>
                  <p className="text-lg font-medium text-gray-800">
                    {customerInfo.businessName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Status Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiOutlineCheckCircle className="w-5 h-5 text-green-600" />
            وضعیت حساب
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verification Status */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">وضعیت تأیید</p>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${verificationConfig.className}`}
                  >
                    {verificationConfig.icon}
                    {verificationConfig.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer ID */}
            {/* <div className="bg-gray-50 rounded-lg p-4">
              <div>
                <p className="text-sm text-gray-500">شناسه کاربری</p>
                <p className="text-sm font-mono text-gray-800 bg-gray-200 px-2 py-1 rounded mt-1">
                  {customerInfo.customerId}
                </p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Token Information Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <HiOutlineCalendar className="w-5 h-5 text-indigo-600" />
            اطلاعات اکانت
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Token Issued At */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <HiOutlineCalendar className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">تاریخ ورود</p>
                  <p className="text-sm font-medium text-gray-800">
                    {formatDate(customerInfo.iat)}
                  </p>
                </div>
              </div>
            </div>

            {/* Token Expires At */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <HiOutlineClock className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">انقضای اکانت</p>
                  <p className="text-sm font-medium text-gray-800">
                    {formatDate(customerInfo.exp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={() => {
              const info = getCustomerInfoFromToken();
              setCustomerInfo(info);
              toast.success("اطلاعات به‌روزرسانی شد");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <HiOutlineCheckCircle className="w-4 h-4" />
            به‌روزرسانی اطلاعات
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("customerToken");
              window.location.href = "/customers/login";
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            خروج از حساب
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
