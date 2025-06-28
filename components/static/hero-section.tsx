"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useAnimation,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { RiPlayFill } from "react-icons/ri";
import { slides } from "../../data/heroSection";
import { makeCall } from "@/utilities/callUtils";

const handleCallClick = () => {
  makeCall({
    phoneNumber: '+98-2166958702'
  });
};

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [direction, setDirection] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const progressAnimation = useAnimation();

  // Mouse position for parallax effect
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });

  // For light beams
  const lightBeam1Left = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["20%", "30%"]
  );
  const lightBeam2Right = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    ["30%", "35%"]
  );

  // Fix hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle progress bar animation
  useEffect(() => {
    if (isAutoPlaying && isMounted) {
      progressAnimation.start({
        scaleX: 1,
        transition: { duration: 6, ease: "linear" },
      });
    } else {
      progressAnimation.stop();
    }

    return () => {
      progressAnimation.stop();
    };
  }, [current, isAutoPlaying, progressAnimation, isMounted]);

  // Auto-advance slides
  useEffect(() => {
    if (!isMounted) return;

    let interval: NodeJS.Timeout;

    if (isAutoPlaying && !isHovering) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovering, isMounted]);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      mouseX.set(x);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    mouseX.set(0);
  };


 

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.85,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      },
    }),
  };

  const titleVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 1,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const subtitleVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };



 

  const videoGridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const videoItemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.19, 1.0, 0.22, 1.0],
      },
    },
  };

  // Don't render until mounted to prevent hydration errors
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#030014]">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#030014] relative overflow-hidden"
      dir="rtl"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-[#0F0728] via-[#070219] to-[#030014]"></div>

        {/* Light beams */}
        <motion.div
          className="absolute top-0 left-1/4 w-[2px] h-[30vh] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"
          style={{ left: lightBeam1Left }}
          animate={{
            height: ["30vh", "40vh", "30vh"],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute top-0 right-1/3 w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"
          style={{ right: lightBeam2Right }}
          animate={{
            height: ["20vh", "25vh", "20vh"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      {/* Main container */}
      <div
        ref={containerRef}
        className="max-w-7xl w-full relative z-10"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {/* Video Grid */}
            <motion.div
              variants={videoGridVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {slides[current]?.videos?.map(
                (videoUrl: string, index: number) => (
                  <motion.div
                    key={`${current}-${index}`}
                    variants={videoItemVariants}
                    className="relative aspect-video h-[600] w-full rounded-2xl overflow-hidden group"
                  >
                    <div className="absolute inset-0 rounded-2xl z-10 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl border border-white/20"></div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-50"></div>
                    </div>

                    <video
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source src={videoUrl} type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white text-sm font-medium">
                          Video {index + 1}
                        </div>
                      </div>
                    </div>

                    <motion.div
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <RiPlayFill size={16} className="text-white ml-0.5" />
                    </motion.div>
                  </motion.div>
                )
              ) ||
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={`${current}-placeholder-${index}`}
                    variants={videoItemVariants}
                    className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white/60">
                        <RiPlayFill size={48} className="mx-auto mb-2" />
                        <p className="text-sm">Video {index + 1}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>

            {/* Content */}
            <div className="text-center px-8">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`title-${current}`}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-white  text-base lg:text-2xl font-bold text-center mb-6 tracking-tight"
                >
                  <span className="relative inline-block">
                    {slides[current]?.title || "Default Title"}
                    <motion.span
                      className="absolute -bottom-5 left-0 h-[2px] rounded-full"
                      style={{
                        backgroundColor: slides[current]?.color || "#8B5CF6",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>
                </motion.h2>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`subtitle-${current}`}
                  variants={subtitleVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-gray-200 text-xs text-center max-w-3xl mx-auto mt-2 font-light leading-relaxed"
                >
                  {slides[current]?.subtitle || "Default subtitle"}
                </motion.p>
              </AnimatePresence>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-10 px-8 py-4  text-white font-medium text-lg border-b border-[#06b6d4]"
                onClick={handleCallClick}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 15px 30px -5px ${
                    slides[current]?.color || "#8B5CF6"
                  }80`,
                }}
                whileTap={{ scale: 0.98 }}
              >
                تماس با ما{" "}
              </motion.button>

              {/* Stats section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                {(
                  slides[current]?.stats || [
                    { value: "100+", label: "پروژه موفق" },
                    { value: "50+", label: "مشتری راضی" },
                    { value: "24/7", label: "پشتیبانی" },
                  ]
                ).map(
                  (stat: { value: string; label: string }, index: number) => (
                    <div key={index} className="text-center">
                      <motion.div
                        className="text-2xl md:text-3xl font-bold text-white mb-2"
                        style={{ color: slides[current]?.color || "#8B5CF6" }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 1.2 + index * 0.1,
                          type: "spring",
                        }}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </div>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-12 right-12 text-white/70 font-mono text-sm z-20">
        <motion.span
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {(current + 1).toString().padStart(2, "0")}
        </motion.span>
        <span className="mx-1">/</span>
        <span>{slides.length.toString().padStart(2, "0")}</span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
        <motion.div
          className="h-full origin-left"
          style={{ backgroundColor: slides[current]?.color || "#8B5CF6" }}
          animate={progressAnimation}
          initial={{ scaleX: 0 }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
