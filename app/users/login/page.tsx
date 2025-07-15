"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiPhone, BiLock } from "react-icons/bi";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !password) {
      toast.error("شماره موبایل و رمز عبور الزامی است");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error("ورود ناموفق بود");
      } else {
        toast.success("ورود با موفقیت انجام شد");
        localStorage.setItem("userToken", result.data.userToken);
        // Optional: store user info
        router.push("/users/admin"); // change this to your dashboard or redirect page
      }
    } catch (err) {
      console.error("خطا در ارتباط با سرور:", err);
      toast.error("خطای سرور!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          ورود به حساب کاربری
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              شماره موبایل
            </label>
            <div className="relative">
              <input
                type="tel"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="مثلاً 09121234567"
              />
              <BiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              رمز عبور
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
              />
              <BiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}
