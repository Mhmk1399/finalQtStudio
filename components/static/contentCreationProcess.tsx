"use client";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import {
  HiOutlineCheck,
} from "react-icons/hi";
import { FiPlus, FiMinus } from "react-icons/fi";
import {
  contentTypes,
  portfolioItems,
  processSteps,
} from "../../data/contentCreationProcess";
// Define types for our content creation process

const ContentCreationProcess = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [activeContentType, setActiveContentType] = useState<string | null>(
    null
  );
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
  const [isHoveringPortfolio, setIsHoveringPortfolio] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const contentTypesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { once: false, margin: "-100px 0px" });
  const isProcessInView = useInView(processRef, {
    once: false,
    margin: "-100px 0px",
  });
  console.log(setIsHoveringPortfolio);
  console.log(currentPortfolioIndex);
  const isContentTypesInView = useInView(contentTypesRef, {
    once: false,
    margin: "-100px 0px",
  });

  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacitySection = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mouse move for interactive effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Auto-rotate portfolio items
  useEffect(() => {
    if (isHoveringPortfolio) return;

    const interval = setInterval(() => {
      setCurrentPortfolioIndex((prev) =>
        prev === portfolioItems.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isHoveringPortfolio]);

  // Get active step data

  // Get active content type data

  // Handle step selection
  const handleStepClick = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  // Handle content type selection
  const handleContentTypeClick = (typeId: string) => {
    setActiveContentType(activeContentType === typeId ? null : typeId);
  };

  // Handle portfolio navigation

  // Get current portfolio item

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#030014] py-20 px-4 md:px-8"
      dir="rtl" // RTL for Persian content
      onMouseMove={handleMouseMove}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050118] to-[#030014] opacity-80"></div>

      {/* Animated background image with parallax */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent"></div>
      </motion.div>

      {/* Content container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        style={{ opacity: opacitySection }}
      >
        {/* Section header with animated title */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            فرآیند تولید محتوا
          </motion.h2>

          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            style={{
              background: `linear-gradient(90deg, ${processSteps[0].color}, ${
                processSteps[processSteps.length - 1].color
              })`,
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView
                ? { width: "120px", opacity: 1 }
                : { width: 0, opacity: 0 }
            }
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            در استدیو کیوتی، ما با یک فرآیند منظم و خلاقانه، محتوای با کیفیت و
            تأثیرگذار برای کسب و کار شما تولید می‌کنیم
          </motion.p>
        </div>

        {/* Process Steps Section */}
        <div ref={processRef} className="mb-32">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isProcessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
          >
            مراحل تولید محتوا
          </motion.h3>

          {/* Process Steps Timeline - Desktop */}
          <div className="hidden md:block relative">
            {/* Process steps */}
            <div className="grid grid-cols-6 gap-4 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isProcessInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 cursor-pointer relative ${
                      activeStep === step.id ? "z-20" : "z-10"
                    }`}
                    style={{
                      backgroundColor: `${step.color}33`,
                      border: `2px solid ${step.color}`,
                      boxShadow:
                        activeStep === step.id
                          ? `0 0 20px ${step.color}80`
                          : "none",
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 20px ${step.color}80`,
                    }}
                    onClick={() => handleStepClick(step.id)}
                    animate={
                      activeStep === step.id
                        ? {
                            scale: 1.1,
                            backgroundColor: `${step.color}66`,
                          }
                        : {
                            scale: 1,
                            backgroundColor: `${step.color}33`,
                          }
                    }
                  >
                    <span className="text-white text-3xl">
                      {step.icon && <step.icon />}
                    </span>

                    {/* Step number */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: step.color,
                        color: "white",
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  <h4 className="text-white font-bold text-center text-sm">
                    {step.title}
                  </h4>

                  {/* Description popup */}
                  <AnimatePresence>
                    {activeStep === step.id && (
                      <motion.div
                        className="absolute top-full mt-4 bg-black/80 backdrop-blur-md rounded-xl p-4 max-w-xs z-30"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: "spring", damping: 20 }}
                        style={{
                          border: `1px solid ${step.color}50`,
                          boxShadow: `0 10px 25px -5px ${step.color}40`,
                        }}
                      >
                        <h5
                          className="text-lg font-bold mb-2"
                          style={{ color: step.color }}
                        >
                          {step.title}
                        </h5>
                        <p className="text-gray-300 text-sm">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Process Steps Cards - Mobile */}
          <div className="md:hidden space-y-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative rounded-xl overflow-hidden backdrop-blur-lg"
                style={{
                  boxShadow: `0 10px 30px -5px ${step.color}40`,
                  border: `1px solid ${step.color}30`,
                  backgroundColor:
                    activeStep === step.id
                      ? `${step.color}20`
                      : "rgba(0,0,0,0.3)",
                }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={
                  isProcessInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStepClick(step.id)}
              >
                <div className="flex items-start p-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ml-4 relative"
                    style={{
                      backgroundColor: `${step.color}33`,
                      border: `1px solid ${step.color}`,
                    }}
                  >
                    <span className="text-white text-3xl">
                      {step.icon && <step.icon />}
                    </span>

                    {/* Step number */}
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: step.color,
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1">
                      {step.title}
                    </h4>

                    <AnimatePresence>
                      {activeStep === step.id && (
                        <motion.p
                          className="text-gray-300 text-sm"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {activeStep !== step.id && (
                      <p className="text-gray-400 text-xs">
                        برای مشاهده جزئیات ضربه بزنید
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Types Section */}
        <div ref={contentTypesRef} className="mb-32">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isContentTypesInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
          >
            انواع محتوا
          </motion.h3>

          {/* Content Types Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {contentTypes.map((type, index) => (
              <motion.div
                key={type.id}
                className="relative cursor-pointer rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isContentTypesInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleContentTypeClick(type.id)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background image */}
                <div className="relative aspect-square">
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={type.video} type="video/mp4" />
                    {/* Fallback for unsupported video */}
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-white/60">Video not supported</span>
                    </div>
                  </video>

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-90 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${type.color}CC, ${type.color}33, transparent)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                      style={{
                        backgroundColor: `${type.color}66`,
                        border: `1px solid ${type.color}`,
                      }}
                    >
                      <span className="text-white text-3xl ">
                        {type.icon && <type.icon />}
                      </span>
                    </div>
                    <h4 className="text-white text-xl font-bold mr-3">
                      {type.title}
                    </h4>
                  </div>

                  <AnimatePresence>
                    {activeContentType === type.id ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/90 text-sm mb-4">
                          {type.description}
                        </p>

                        <ul className="space-y-2">
                          {type.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              className="flex items-center text-white/90 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                            >
                              <HiOutlineCheck className="text-white ml-2 flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : (
                      <motion.p
                        className="text-white/80 text-sm line-clamp-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {type.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Expand/collapse indicator */}
                <motion.div
                  className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  style={{
                    border: `1px solid ${type.color}`,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {activeContentType === type.id ? (
                    <FiMinus className="text-white" />
                  ) : (
                    <FiPlus className="text-white" />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Portfolio Showcase */}
      </motion.div>
    </div>
  );
};

export default ContentCreationProcess;
