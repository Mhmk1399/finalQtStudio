"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { IoSend, IoLocation } from "react-icons/io5";
import toast from "react-hot-toast";
import {
  FormData,
  contactInfo,
  formFields,
  serviceOptions,
} from "../../data/contactForm";

const ContactForm = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs for animations
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  // const isFormInView = useInView(formRef, {
  //   once: false,
  //   margin: "-100px 0px",
  // });
  const isTitleInView = useInView(titleRef, {
    once: false,
    margin: "-100px 0px",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    // Validate required fields
    formFields.forEach((field) => {
      if (field.required && !formData[field.name as keyof FormData]) {
        newErrors[field.name as keyof FormData] = `${field.label} الزامی است`;
        isValid = false;
      }
    });

    // Validate email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل صحیح نیست";
      isValid = false;
    }

    // Validate phone format (simple validation)
    if (formData.phone && !/^((\+|00)98|0)?9\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره موبایل صحیح نیست";
      isValid = false;
    }

    // Validate message
    if (!formData.message) {
      newErrors.message = "پیام الزامی است";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "پیام باید حداقل ۱۰ کاراکتر باشد";
      isValid = false;
    }

    // Validate service selection
    if (!formData.service) {
      newErrors.service = "انتخاب خدمات الزامی است";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("لطفاً خطاهای فرم را برطرف کنید");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setIsSubmitted(true);
      toast.success("پیام شما با موفقیت ارسال شد");

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          service: "",
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.log(error);

      toast.error("خطا در ارسال پیام. لطفاً دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden pb-20 bg-[#030014]"
      dir="rtl"
    >
      {/* Background image with blur effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/cam1.jpg" // Replace with your image
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-[#030014]/80 via-[#030014]/70 to-[#030014]/90"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-500/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            تماس با ما
          </motion.h2>

          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={
              isTitleInView
                ? { width: "120px", opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isTitleInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ما مشتاق شنیدن نظرات و پیشنهادات شما هستیم. برای درخواست مشاوره یا
            همکاری با ما تماس بگیرید.
          </motion.p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact information */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">
                اطلاعات تماس
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="w-12 h-12 md:text-2xl rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                      {info.icon && <info.icon />}
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-1">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-300 hover:text-white transition-colors duration-300"
                          target={
                            info.link.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            info.link.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-gray-300">{info.details}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social media links */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </h3>

              <div className="flex gap-4 mt-6">
                {[
                  {
                    name: "Instagram",
                    icon: "instagram.svg",
                    color: "#E1306C",
                  },
                  { name: "Twitter", icon: "twitter.svg", color: "#1DA1F2" },
                  { name: "LinkedIn", icon: "linkedin.svg", color: "#0077B5" },
                  { name: "Telegram", icon: "telegram.svg", color: "#0088cc" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${social.color}40, ${social.color}20)`,
                      border: `1px solid ${social.color}30`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    <span className="text-white text-lg">
                      {social.name.charAt(0)}
                    </span>
                  </motion.a>
                ))}
              </div>

              <motion.div
                className="mt-8 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-white/80 text-sm">
                  ساعات پاسخگویی: شنبه تا چهارشنبه از ساعت ۹ صبح تا ۵ بعدازظهر
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 filter blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-pink-500/10 filter blur-3xl"></div>

              <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                فرم تماس
              </h3>

              <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500/20 to-green-500/40 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>

                    <motion.h4
                      className="text-2xl font-bold text-white mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      پیام شما با موفقیت ارسال شد
                    </motion.h4>

                    <motion.p
                      className="text-gray-300 mb-8"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      از تماس شما متشکریم. کارشناسان ما در اسرع وقت با شما تماس
                      خواهند گرفت.
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {formFields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          className={
                            field.id === "subject" ? "md:col-span-2" : ""
                          }
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.2 + index * 0.1,
                            duration: 0.5,
                          }}
                        >
                          <label
                            htmlFor={field.id}
                            className="block text-white font-medium mb-2"
                          >
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 mr-1">*</span>
                            )}
                          </label>

                          <input
                            type={field.type}
                            id={field.id}
                            name={field.name}
                            value={formData[field.name as keyof FormData]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            required={field.required}
                            minLength={field.minLength}
                            maxLength={field.maxLength}
                            pattern={field.pattern}
                            className={`w-full px-4 py-3 bg-white/5 border ${
                              errors[field.name as keyof FormData]
                                ? "border-red-500"
                                : "border-white/10"
                            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-400 transition-colors duration-300`}
                          />

                          {errors[field.name as keyof FormData] && (
                            <p className="mt-1 text-red-500 text-sm">
                              {errors[field.name as keyof FormData]}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <label
                        htmlFor="service"
                        className="block text-white font-medium mb-2"
                      >
                        خدمات مورد نظر <span className="text-red-500">*</span>
                      </label>

                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.service ? "border-red-500" : "border-white/10"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white appearance-none transition-colors duration-300`}
                      >
                        <option value="" disabled>
                          انتخاب کنید
                        </option>
                        {serviceOptions.map((option) => (
                          <option
                            className="bg-black"
                            key={option.id}
                            value={option.id}
                          >
                            {option.name}
                          </option>
                        ))}
                      </select>

                      {errors.service && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.service}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <label
                        htmlFor="message"
                        className="block text-white font-medium mb-2"
                      >
                        پیام <span className="text-red-500">*</span>
                      </label>

                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="پیام خود را بنویسید..."
                        rows={5}
                        className={`w-full px-4 py-3 bg-white/5 border ${
                          errors.message ? "border-red-500" : "border-white/10"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-gray-400 transition-colors duration-300`}
                      />

                      {errors.message && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.message}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-medium flex items-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>در حال ارسال...</span>
                          </>
                        ) : (
                          <>
                            <span>ارسال پیام</span>
                            <IoSend className="rotate-180" />
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Map section */}
        <motion.div
          className="mt-16 rounded-2xl overflow-hidden border border-white/10 h-[400px] relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Placeholder for map - replace with actual map component */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A1B] to-[#1A1A3A] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <IoLocation className="text-white text-2xl" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">
                موقعیت ما روی نقشه
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                برای مشاهده موقعیت دقیق ما روی نقشه، کلیک کنید
              </p>
              <button className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors duration-300">
                نمایش نقشه
              </button>
            </div>
          </div>
        </motion.div>

        {/* FAQ section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            سوالات متداول
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "چگونه می‌توانم پروژه خود را به شما بسپارم؟",
                answer:
                  "شما می‌توانید از طریق فرم تماس بالا، تماس تلفنی یا ایمیل با ما در ارتباط باشید. کارشناسان ما در اسرع وقت با شما تماس گرفته و مشاوره رایگان ارائه می‌دهند.",
              },
              {
                question: "هزینه خدمات شما چگونه محاسبه می‌شود؟",
                answer:
                  "هزینه خدمات ما بر اساس نوع پروژه، حجم کار، زمان تحویل و پیچیدگی آن متغیر است. برای دریافت قیمت دقیق، می‌توانید درخواست مشاوره و استعلام قیمت دهید.",
              },
              {
                question: "مدت زمان انجام پروژه‌ها چقدر است؟",
                answer:
                  "زمان تحویل پروژه‌ها بسته به نوع و حجم آن متفاوت است. معمولاً پروژه‌های کوچک بین ۳ تا ۷ روز و پروژه‌های بزرگتر بین ۲ تا ۴ هفته زمان می‌برند.",
              },
              {
                question: "آیا امکان اصلاح و تغییر در پروژه وجود دارد؟",
                answer:
                  "بله، ما معمولاً تا دو مرحله اصلاحات جزئی را بدون هزینه اضافی انجام می‌دهیم. برای تغییرات اساسی ممکن است هزینه اضافی در نظر گرفته شود.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -5px rgba(139, 92, 246, 0.15)",
                }}
              >
                <h4 className="text-lg font-bold text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            آماده همکاری با ما هستید؟
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            با کارخانه محتوا تماس بگیرید و اولین قدم را برای ارتقای استراتژی
            محتوای خود بردارید.
          </p>
          <motion.button
            className="px-8 py-3 rounded-full text-white font-medium"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              boxShadow: "0 8px 20px -5px rgba(139, 92, 246, 0.5)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 25px -5px rgba(139, 92, 246, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            مشاوره رایگان
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated particles */}
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 20 + 10;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const delay = Math.random() * 5;
            const colors = ["#8B5CF6", "#EC4899", "#3B82F6"];
            const color = colors[Math.floor(Math.random() * colors.length)];

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: size,
                  height: size,
                  x: `${initialX}%`,
                  y: `${initialY}%`,
                  backgroundColor: color,
                  opacity: 0.4,
                }}
                animate={{
                  y: [`${initialY}%`, `${initialY - 30}%`],
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.5, 0.8],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
