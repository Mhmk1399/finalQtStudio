"use client";
import { useState, useRef, useEffect, createElement } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  HiOutlineBeaker,
  HiOutlineSparkles,
  HiOutlineX,
} from "react-icons/hi";
import { FiZap } from "react-icons/fi";
import {
  contentElements,
  contentFormulas,
} from "../../data/contentCreationLab";
import { useNavigation } from "@/utilities/navigationUtils";
// Define types for our content elements

const ContentCreationLab = () => {
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [activeFormula, setActiveFormula] = useState<string | null>(null);
  const [isLabMode, setIsLabMode] = useState(false);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [customFormula, setCustomFormula] = useState<string | null>(null);
  const { navigateTo } = useNavigation();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labRef = useRef<HTMLDivElement>(null);
  const formulasRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(titleRef, { once: false, margin: "-100px 0px" });
  const isLabInView = useInView(labRef, { once: false, margin: "-100px 0px" });
  const isFormulasInView = useInView(formulasRef, {
    once: false,
    margin: "-100px 0px",
  });

  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile);
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

  // Mouse position for hover effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

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

  // Handle element selection
  const handleElementClick = (elementId: string) => {
    if (isLabMode) {
      // In lab mode, add/remove elements from selection
      if (selectedElements.includes(elementId)) {
        setSelectedElements(selectedElements.filter((id) => id !== elementId));
      } else if (selectedElements.length < 3) {
        setSelectedElements([...selectedElements, elementId]);
      }
      setCustomFormula(null);
    } else {
      // Normal mode, just show element details
      setActiveElement(activeElement === elementId ? null : elementId);
    }
  };

  // Handle formula selection
  const handleFormulaClick = (formulaId: string) => {
    setActiveFormula(activeFormula === formulaId ? null : formulaId);
  };

  // Toggle lab mode
  const toggleLabMode = () => {
    setIsLabMode(!isLabMode);
    setSelectedElements([]);
    setCustomFormula(null);
  };

  // Create custom formula
  const createCustomFormula = () => {
    if (selectedElements.length >= 2) {
      setCustomFormula("فرمول سفارشی شما با موفقیت ساخته شد!");
      navigateTo("form");
    }
  };

  const handleFormNavigation = () => {
    navigateTo("form");
  };



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
            آزمایشگاه تولید محتوا
          </motion.h2>

          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            style={{
              background: `linear-gradient(90deg, ${
                contentElements[0].color
              }, ${contentElements[contentElements.length - 1].color})`,
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
            در آزمایشگاه تولید محتوای ما، علم و هنر با هم ترکیب می‌شوند تا
            محتوایی خلق شود که نتایج قابل اندازه‌گیری برای کسب و کار شما به
            ارمغان می‌آورد
          </motion.p>
        </div>

        {/* Periodic Table of Content Elements */}
        <div ref={labRef} className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <motion.h3
              className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isLabInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5 }}
            >
              جدول تناوبی عناصر محتوا
            </motion.h3>

            <motion.button
              className="px-6 py-2 rounded-full text-white font-medium flex items-center gap-2"
              style={{
                background: isLabMode
                  ? `linear-gradient(90deg, #EF4444, #F59E0B)`
                  : `linear-gradient(90deg, #3B82F6, #8B5CF6)`,
                boxShadow: isLabMode
                  ? `0 8px 20px -5px #EF444480`
                  : `0 8px 20px -5px #3B82F680`,
              }}
              onClick={toggleLabMode}
              whileHover={{
                scale: 1.05,
                boxShadow: isLabMode
                  ? `0 12px 25px -5px #EF444480`
                  : `0 12px 25px -5px #3B82F680`,
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isLabInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isLabMode ? (
                <>
                  <HiOutlineX className="text-xl" />
                  <span>خروج از حالت آزمایشگاه</span>
                </>
              ) : (
                <>
                  <HiOutlineBeaker className="text-xl" />
                  <span>ورود به حالت آزمایشگاه</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Lab mode instructions */}
          <AnimatePresence>
            {isLabMode && (
              <motion.div
                className="bg-black/30 backdrop-blur-md rounded-xl p-4 mb-8 border border-white/10"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <HiOutlineBeaker className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">
                      حالت آزمایشگاه فعال است
                    </h4>
                    <p className="text-gray-300 mb-4">
                      در این حالت می‌توانید تا ۳ عنصر محتوا را انتخاب کنید و
                      فرمول سفارشی خود را بسازید. عناصر را با کلیک انتخاب کنید.
                    </p>

                    {/* Selected elements */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedElements.length > 0 ? (
                        selectedElements.map((elementId) => {
                          const element = contentElements.find(
                            (e) => e.id === elementId
                          );
                          return (
                            <div
                              key={elementId}
                              className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                              style={{
                                backgroundColor: `${element?.color}33`,
                                color: element?.color,
                                border: `1px solid ${element?.color}66`,
                              }}
                            >
                              <span>{element?.name}</span>
                              <button
                                className="w-4 h-4 rounded-full flex items-center justify-center"
                                onClick={() => handleElementClick(elementId)}
                              >
                                <HiOutlineX className="text-xs" />
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-400 text-sm">
                          هیچ عنصری انتخاب نشده است
                        </p>
                      )}
                    </div>

                    {/* Create formula button */}
                    <motion.button
                      className="px-4 py-2 rounded-full text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: `linear-gradient(90deg, #10B981, #3B82F6)`,
                        boxShadow: `0 8px 20px -5px #10B98180`,
                      }}
                      disabled={selectedElements.length < 2}
                      onClick={createCustomFormula}
                      whileHover={
                        selectedElements.length >= 2
                          ? {
                              scale: 1.05,
                              boxShadow: `0 12px 25px -5px #10B98180`,
                            }
                          : {}
                      }
                      whileTap={
                        selectedElements.length >= 2 ? { scale: 0.98 } : {}
                      }
                    >
                      ساخت فرمول سفارشی
                    </motion.button>

                    {/* Custom formula result */}
                    <AnimatePresence>
                      {customFormula && (
                        <motion.div
                          className="mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {customFormula}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Elements grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {contentElements.map((element, index) => (
              <motion.div
                key={element.id}
                className={`relative cursor-pointer rounded-xl overflow-hidden backdrop-blur-lg transition-all duration-300 ${
                  isLabMode && selectedElements.includes(element.id)
                    ? "ring-2 ring-offset-2 ring-offset-[#030014]"
                    : ""
                }`}
                style={{
                  boxShadow: `0 10px 30px -5px ${element.color}40`,
                  border: `1px solid ${element.color}30`,
                  backgroundColor:
                    isLabMode && selectedElements.includes(element.id)
                      ? `${element.color}20`
                      : "rgba(0,0,0,0.3)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isLabInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleElementClick(element.id)}
                whileHover={{ scale: 1.03 }}
              >
                <div className="p-6 text-center">
                  <div className="flex justify-center items-center mb-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center relative"
                      style={{
                        backgroundColor: `${element.color}20`,
                        border: `1px solid ${element.color}`,
                      }}
                    >
                      <span className="text-white text-2xl">
                        {<element.icon />}
                      </span>

                      {/* Element symbol */}
                      <div
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor: element.color,
                          color: "white",
                        }}
                      >
                        {element.id}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-white font-bold text-lg mb-2">
                    {element.name}
                  </h4>

                  <AnimatePresence>
                    {activeElement === element.id && !isLabMode && (
                      <motion.p
                        className="text-gray-300 text-sm"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {element.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {activeElement !== element.id && !isLabMode && (
                    <p className="text-gray-400 text-xs">
                      برای مشاهده جزئیات کلیک کنید
                    </p>
                  )}

                  {isLabMode && (
                    <div className="mt-2">
                      {selectedElements.includes(element.id) ? (
                        <span
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: element.color }}
                        >
                          انتخاب شده
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full text-white/50 border border-white/20">
                          انتخاب کنید
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Formulas Section */}
        <div ref={formulasRef} className="mb-32">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={
              isFormulasInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5 }}
          >
            فرمول‌های محتوایی
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contentFormulas.map((formula, index) => (
              <motion.div
                key={formula.id}
                className="relative cursor-pointer rounded-xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isFormulasInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleFormulaClick(formula.id)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Background image */}
                <div className="relative aspect-video">
                  <video
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  >
                    <source src={formula.video} type="video/mp4" />
                    {/* Fallback for unsupported video */}
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-white/60">Video not supported</span>
                    </div>
                  </video>

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-90 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, gray-900, white, transparent)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h4 className="text-white text-xl font-bold mb-2">
                    {formula.title}
                  </h4>

                  <AnimatePresence>
                    {activeFormula === formula.id ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-white/90 text-sm mb-4">
                          {formula.description}
                        </p>

                        {/* Formula elements */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {formula.elements.map((elementId) => {
                            const element = contentElements.find(
                              (e) => e.id === elementId
                            );
                            return (
                              <div
                                key={elementId}
                                className="px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                style={{
                                  backgroundColor: `${element?.color}33`,
                                  color: element?.color,
                                  border: `1px solid ${element?.color}66`,
                                }}
                              >
                                <span className="text-lg">
                                  {element?.icon && createElement(element.icon)}
                                </span>
                                <span>{element?.name}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Result */}
                        <div
                          className="mt-2 px-4 py-2 rounded-lg inline-block"
                          style={{
                            backgroundColor: `${formula.color}33`,
                            border: `1px solid ${formula.color}66`,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <FiZap className="text-white" />
                            <span className="text-white font-bold">
                              نتیجه: {formula.result}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.p
                        className="text-white/80 text-sm line-clamp-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* {formula.description} */}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive 3D Card Section */}
        <div className="mb-32">
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            چرا آزمایشگاه محتوای ما را انتخاب کنید؟
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 3D Interactive Card */}
            <motion.div
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden perspective-1000"
              onMouseMove={(e) => {
                const { left, top, width, height } =
                  e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                mouseX.set(x);
                mouseY.set(y);
              }}
              onMouseLeave={() => {
                mouseX.set(0.5);
                mouseY.set(0.5);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  rotateY: useTransform(mouseXSpring, [0, 1], [10, -10]),
                  rotateX: useTransform(mouseYSpring, [0, 1], [-10, 10]),
                  boxShadow: `0 20px 50px -10px ${contentElements[0].color}80`,
                  border: `1px solid ${contentElements[0].color}50`,
                  background: `linear-gradient(135deg, ${
                    contentElements[0].color
                  }20, ${contentElements[contentElements.length - 1].color}20)`,
                }}
              >
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${contentElements[0].color}33`,
                      border: `2px solid ${contentElements[0].color}`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${contentElements[0].color}40`,
                        `0 0 30px ${contentElements[0].color}80`,
                        `0 0 20px ${contentElements[0].color}40`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <HiOutlineBeaker className="text-white text-3xl" />
                  </motion.div>

                  <h4 className="text-white text-2xl font-bold mb-4">
                    رویکرد علمی به محتوا
                  </h4>
                  <p className="text-white/80 mb-6">
                    ما با ترکیب علم و هنر، محتوایی تولید می‌کنیم که نه تنها زیبا
                    و جذاب است، بلکه نتایج قابل اندازه‌گیری برای کسب و کار شما
                    به ارمغان می‌آورد.
                  </p>

                  <motion.button
                    className="px-6 py-2 rounded-full text-white font-medium"
                    style={{
                      background: `linear-gradient(90deg, ${contentElements[0].color}, ${contentElements[2].color})`,
                      boxShadow: `0 8px 20px -5px ${contentElements[0].color}80`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 12px 25px -5px ${contentElements[0].color}80`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    درباره ما بیشتر بدانید
                  </motion.button>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute top-10 right-10 w-12 h-12 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${contentElements[1].color}40 0%, transparent 70%)`,
                    border: `1px solid ${contentElements[1].color}`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                <motion.div
                  className="absolute bottom-20 left-10 w-8 h-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${contentElements[3].color}40 0%, transparent 70%)`,
                    border: `1px solid ${contentElements[3].color}`,
                  }}
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Second card */}
            <motion.div
              className="relative h-80 md:h-96 rounded-2xl overflow-hidden perspective-1000"
              onMouseMove={(e) => {
                const { left, top, width, height } =
                  e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - left) / width;
                const y = (e.clientY - top) / height;
                mouseX.set(x);
                mouseY.set(y);
              }}
              onMouseLeave={() => {
                mouseX.set(0.5);
                mouseY.set(0.5);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  rotateY: useTransform(mouseXSpring, [0, 1], [10, -10]),
                  rotateX: useTransform(mouseYSpring, [0, 1], [-10, 10]),
                  boxShadow: `0 20px 50px -10px ${contentElements[2].color}80`,
                  border: `1px solid ${contentElements[2].color}50`,
                  background: `linear-gradient(135deg, ${contentElements[2].color}20, ${contentElements[4].color}20)`,
                }}
              >
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: `${contentElements[2].color}33`,
                      border: `2px solid ${contentElements[2].color}`,
                    }}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${contentElements[2].color}40`,
                        `0 0 30px ${contentElements[2].color}80`,
                        `0 0 20px ${contentElements[2].color}40`,
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                  >
                    <HiOutlineSparkles className="text-white text-3xl" />
                  </motion.div>

                  <h4 className="text-white text-2xl font-bold mb-4">
                    نتایج قابل اندازه‌گیری
                  </h4>
                  <p className="text-white/80 mb-6">
                    ما به نتایج واقعی باور داریم. هر محتوایی که تولید می‌کنیم با
                    دقت تحلیل می‌شود تا مطمئن شویم به اهداف کسب و کار شما کمک
                    می‌کند.
                  </p>

                  <motion.button
                    className="px-6 py-2 rounded-full text-white font-medium"
                    style={{
                      background: `linear-gradient(90deg, ${contentElements[2].color}, ${contentElements[4].color})`,
                      boxShadow: `0 8px 20px -5px ${contentElements[2].color}80`,
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: `0 12px 25px -5px ${contentElements[2].color}80`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    مشاهده نمونه کارها
                  </motion.button>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute top-20 left-10 w-10 h-10 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${contentElements[4].color}40 0%, transparent 70%)`,
                    border: `1px solid ${contentElements[4].color}`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                />

                <motion.div
                  className="absolute bottom-10 right-20 w-8 h-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${contentElements[5].color}40 0%, transparent 70%)`,
                    border: `1px solid ${contentElements[5].color}`,
                  }}
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1.5,
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            {
              value: "+۱۰۰",
              label: "فرمول محتوایی",
            },
            {
              value: "+۵۰۰",
              label: "پروژه موفق",
            },
            {
              value: "+۹۵٪",
              label: "رضایت مشتری",
            },
            {
              value: "+۲۰۰٪",
              label: "میانگین رشد",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -5,
                borderColor: "#06B6D4",
                backgroundColor: "rgba(6, 182, 212, 0.1)",
              }}
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-2 text-cyan-400"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 200,
                }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            آماده ورود به آزمایشگاه محتوا هستید؟
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            با ما تماس بگیرید تا با استفاده از فرمول‌های اختصاصی ما، محتوایی خلق
            کنیم که نتایج کسب و کار شما را متحول سازد.
          </p>
          <motion.button
            className="px-8 py-3 rounded-full text-white font-medium flex items-center gap-2 mx-auto"
            style={{
              background: `linear-gradient(90deg, ${contentElements[0].color}, ${contentElements[2].color})`,
              boxShadow: `0 8px 20px -5px ${contentElements[0].color}80`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 12px 25px -5px ${contentElements[0].color}80`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <HiOutlineBeaker className="text-xl" />
            <span onClick={handleFormNavigation}>شروع آزمایش محتوا</span>
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => {
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

          {/* Floating orbs with glass effect */}
          <motion.div
            className="absolute w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${contentElements[0].color}10 0%, ${contentElements[0].color}05 50%, transparent 70%)`,
              boxShadow: `inset 0 0 20px ${contentElements[0].color}20, 0 0 30px ${contentElements[0].color}10`,
              backdropFilter: "blur(5px)",
              border: `1px solid ${contentElements[0].color}10`,
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
              background: `radial-gradient(circle, ${contentElements[2].color}10 0%, ${contentElements[2].color}05 50%, transparent 70%)`,
              boxShadow: `inset 0 0 15px ${contentElements[2].color}20, 0 0 20px ${contentElements[2].color}10`,
              backdropFilter: "blur(5px)",
              border: `1px solid ${contentElements[2].color}10`,
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
      </motion.div>
    </div>
  );
};

export default ContentCreationLab;
