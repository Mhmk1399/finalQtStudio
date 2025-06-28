"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoArrowUp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { services } from "../../data/servicesShowcase";
import { makeCall } from "@/utilities/callUtils";
import { useNavigation } from "@/utilities/navigationUtils";

const ServicesShowcase = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoverService, setHoverService] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  console.log(viewportHeight);
  const { navigateTo } = useNavigation();

  const handleNavigateToWorks = () => {
    navigateTo("works");
  };

  const haandlCallClick = () => {
    makeCall({
      phoneNumber: "+98-2166958702",
    });
  };

  // Parallax effect for background

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportHeight(window.innerHeight);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle service selection and scroll to details
  const handleServiceClick = (id: string) => {
    const newActiveService = activeService === id ? null : id;
    setActiveService(newActiveService);

    // If selecting a service (not deselecting), scroll to details section
    if (newActiveService && detailsRef.current) {
      // Wait for the details to render before scrolling
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // Get active service data
  const activeServiceData = services.find(
    (service) => service.id === activeService
  );
  const hoverServiceData = services.find(
    (service) => service.id === hoverService
  );

  // Display color based on active or hover state
  const displayColor =
    activeServiceData?.color || hoverServiceData?.color || services[0].color;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#030014] py-20 px-4 md:px-8"
      dir="rtl" // Set RTL direction for Persian text
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050118] to-[#030014] opacity-80"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            animate={{
              textShadow: [
                "0 0 8px rgba(255, 255, 255, 0.4)",
                "0 0 16px rgba(255, 255, 255, 0.2)",
                "0 0 8px rgba(255, 255, 255, 0.4)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            خدمات ما
          </motion.h2>
          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            style={{ backgroundColor: displayColor }}
            animate={{ width: ["20px", "120px", "20px"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <p className="text-gray-300 max-w-2xl mx-auto text-xl">
            نگاهی متفاوت به تولید محتوا
          </p>
        </motion.div>

        {/* Services grid/list */}
        <div
          className={`${
            isMobile ? "flex flex-col space-y-6" : "grid grid-cols-3 gap-8"
          }`}
        >
          {/* Service items */}
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`
                relative group cursor-pointer overflow-hidden
                ${isMobile ? "w-full" : "h-[280px]"}
                ${
                  activeService && activeService !== service.id
                    ? "opacity-40"
                    : "opacity-100"
                }
                transition-all duration-500 ease-out
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.19, 1.0, 0.22, 1.0],
              }}
              onClick={() => handleServiceClick(service.id)}
              onMouseEnter={() => setHoverService(service.id)}
              onMouseLeave={() => setHoverService(null)}
            >
              {/* Card background with glass effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
              >
                {/* Background image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                  style={{
                    background: `linear-gradient(to top, black, white/10, transparent)`,
                  }}
                ></div>

                {/* Glass effect border */}
                <div className="absolute inset-0 rounded-2xl border border-white/10"></div>
              </motion.div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 z-10">
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 "
                  style={{
                    backgroundColor: `${service.color}33`,
                    border: `1px solid ${service.color}66`,
                  }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: `${service.color}66`,
                  }}
                >
                  {/* React Icon */}
                  <span className="text-white text-xl">
                    {service.icon && <service.icon />}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-sm md:text-2xl font-bold text-white"
                  layout
                >
                  {service.title}
                </motion.h3>
                <motion.div
                  className="mt-4 flex items-center text-sm text-white font-medium"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  <span>مشاهده جزئیات</span>
                  <IoIosArrowBack className="mr-1 text-sm" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed view for active service */}
        <AnimatePresence>
          {activeService && (
            <motion.div
              ref={detailsRef}
              className="mt-16 bg-black/30 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Image */}
                <motion.div
                  className="w-full md:w-1/2 h-[300px] relative rounded-xl overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Image
                    src={activeServiceData?.image || ""}
                    alt={activeServiceData?.title || ""}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                    style={{
                      background: `linear-gradient(to top, ${activeServiceData?.color}99, transparent)`,
                    }}
                  ></div>
                </motion.div>

                {/* Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${activeServiceData?.color}33`,
                      border: `1px solid ${activeServiceData?.color}66`,
                    }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* React Icon */}
                    <span className="text-white text-2xl">
                      {activeServiceData?.icon && <activeServiceData.icon />}
                    </span>
                  </motion.div>

                  <motion.h3
                    className="text-3xl font-bold text-white mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {activeServiceData?.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {activeServiceData?.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <motion.button
                      className="px-6 py-3 rounded-full text-white font-medium"
                      style={{
                        background: `linear-gradient(90deg, ${activeServiceData?.color}, ${activeServiceData?.color}CC)`,
                        boxShadow: `0 8px 20px -5px ${activeServiceData?.color}80`,
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0 12px 25px -5px ${activeServiceData?.color}80`,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      شروع کنید
                    </motion.button>
                  </motion.div>
                </div>
              </div>

              {/* Features list */}
              <motion.div
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {activeServiceData?.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{
                      y: -5,
                      boxShadow: `0 10px 30px -5px ${activeServiceData?.color}40`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: `${activeServiceData?.color}33`,
                      }}
                    >
                      <span
                        className="text-xl font-bold"
                        style={{ color: activeServiceData?.color }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="text-white font-medium mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Back to top button */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm backdrop-blur-sm border border-white/10"
                  onClick={() => setActiveService(null)}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IoArrowUp className="h-4 w-4" />
                  <span>بازگشت به بالا</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => {
            const duration = Math.random() * 20 + 10;
            const initialY = Math.random() * 100;
            const delay = Math.random() * 5;

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
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

        {/* Floating orbs with glass effect */}
        <motion.div
          className="absolute w-40 h-40 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${displayColor}10 0%, ${displayColor}05 50%, transparent 70%)`,
            boxShadow: `inset 0 0 20px ${displayColor}20, 0 0 30px ${displayColor}10`,
            backdropFilter: "blur(5px)",
            border: `1px solid ${displayColor}10`,
            left: "10%",
            top: "20%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute w-24 h-24 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${displayColor}10 0%, ${displayColor}05 50%, transparent 70%)`,
            boxShadow: `inset 0 0 15px ${displayColor}20, 0 0 20px ${displayColor}10`,
            backdropFilter: "blur(5px)",
            border: `1px solid ${displayColor}10`,
            right: "15%",
            bottom: "25%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Call to action section */}
      <motion.div
        className="relative z-10 mt-32 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
          آماده تحول در استراتژی محتوای خود هستید؟
        </h3>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          به برندهایی بپیوندید که به کارخانه محتوا اعتماد می‌کنند تا حضور
          دیجیتال خود را ارتقا دهند و تعامل معنادار ایجاد کنند.
        </p>
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            className="px-8 py-3 rounded-full text-white font-medium"
            style={{
              background: `linear-gradient(90deg, ${services[0].color}, ${services[1].color})`,
              boxShadow: `0 8px 20px -5px ${services[0].color}80`,
            }}
            onClick={haandlCallClick}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 12px 25px -5px ${services[0].color}80`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            رزرو مشاوره
          </motion.button>
          <motion.button
            className="px-8 py-3 rounded-full text-white font-medium bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            }}
            onClick={handleNavigateToWorks}
            whileTap={{ scale: 0.98 }}
          >
            مشاهده نمونه کارها
          </motion.button>
        </motion.div>
        {/* Brands/clients logos */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
        ></motion.div>
        ّ
      </motion.div>

      {/* Animated rings */}
      <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <motion.div
          className="w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 w-40 h-40 rounded-full border border-white/10"
          animate={{
            scale: [1, 1.5],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </div>
    </div>
  );
};

export default ServicesShowcase;
