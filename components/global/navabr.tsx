"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaVideo,
  FaImages,
  FaUserAlt,
  FaEnvelope,
  FaShareAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import SocialModal from "./SocialModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    icon: FaHome,
    title: "خانه",
    color: "#4ade80",
    href: "/",
  },
  {
    icon: FaVideo,
    title: "ویدیوها",
    color: "#fb923c",
    href: "/videos",
  },
  {
    icon: FaImages,
    title: "گالری",
    color: "#60a5fa",
    href: "/works",
  },
  {
    icon: FaUserAlt,
    title: "درباره ما",
    color: "#f472b6",
    href: "/about",
  },
  {
    icon: FaEnvelope,
    title: "تماس",
    color: "#a78bfa",
    href: "/contact",
  },
  {
    icon: FaShareAlt,
    title: "اشتراک گذاری",
    color: "#34d399",
    href: "#",
    hasSocials: true,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  // Refs for positioning
  const shareButtonRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Position state for the social modal
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left?: number;
    right?: number;
  }>({ top: 0 });

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle share button click
  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();

      if (isDesktop) {
        // Position modal in the center of the page on desktop
        setModalPosition({
          top: window.innerHeight / 2 - 200, // Center vertically (200px is approximately half the modal height)
          left: window.innerWidth / 2 - 150, // Center horizontally (300px modal width / 2 = 150px)
        });
      } else {
        // Position modal above the share button on mobile
        setModalPosition({
          top: rect.top - 350, // Position above with some spacing
          left: window.innerWidth / 2 - 150, // Center horizontally
        });
      }

      setSocialModalOpen(true);
    }
  };

  if (
    pathname === "/admin" ||
    pathname === "/customers/admin" ||
    pathname === "/users/admin"
  ) {
    return null;
  }

  // Desktop Navbar Component
  const DesktopNav = () => {
    return (
      <div className="fixed left-10 top-10 z-50">
        <motion.div
          // initial={{ opacity: 0, y: -20 }}
          // animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Toggle button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center w-12 h-12 rounded-full ${
              isOpen ? "bg-gray-800" : "bg-gray-900/80"
            } backdrop-blur-lg border border-gray-700/30 text-white`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  // initial={{ rotate: -90, opacity: 0 }}
                  // animate={{ rotate: 0, opacity: 1 }}
                  // exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  // initial={{ rotate: 90, opacity: 0 }}
                  // animate={{ rotate: 0, opacity: 1 }}
                  // exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Menu panel */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={navRef}
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                  transition: {
                    height: { duration: 0.4 },
                    opacity: { duration: 0.3, delay: 0.1 },
                  },
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -20,
                  transition: {
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 },
                  },
                }}
                className="absolute top-16 left-0 min-w-[240px] bg-gray-900/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700/30 shadow-xl"
                style={{
                  boxShadow: isScrolled
                    ? "0 10px 30px rgba(0, 0, 0, 0.3)"
                    : "0 10px 25px rgba(0, 0, 0, 0.2)",
                }}
              >
                <div className="py-3" dir="rtl">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.1 + index * 0.05 },
                      }}
                      exit={{ opacity: 0, x: -20 }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-5 py-3 text-gray-300 hover:text-white relative group`}
                        onClick={(e) => {
                          if (item.hasSocials) {
                            handleShareClick(e);
                          } else {
                            setActiveItem(index);
                          }
                          setIsOpen(false);
                        }}
                      >
                        {/* Active indicator */}
                        {activeItem === index && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-gray-800 rounded-md z-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}

                        {/* Icon with color */}
                        <div
                          className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-md ${
                            activeItem === index
                              ? "bg-gray-700"
                              : "bg-gray-800/50"
                          }`}
                          ref={item.hasSocials ? shareButtonRef : null}
                        >
                          <item.icon size={16} color={item.color} />
                        </div>

                        {/* Title */}
                        <span className="relative z-10 font-medium">
                          {item.title}
                        </span>

                        {/* Hover indicator */}
                        <motion.div
                          className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b rounded-full opacity-0 group-hover:opacity-100 group-hover:h-1/2"
                          style={{ background: item.color }}
                          transition={{ duration: 0.2 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Social Modal */}
        <SocialModal
          isOpen={socialModalOpen}
          onClose={() => setSocialModalOpen(false)}
          modalPosition={modalPosition}
        />
      </div>
    );
  };

  // Mobile Navbar Component
  const MobileNav = () => {
    return (
      <div className="fixed bottom-8 left-0 right-0 z-50 px-4">
        <motion.div className="relative">
          {/* Mobile menu bar */}
          <motion.div
            className="flex items-center justify-center p-2 bg-gray-900/30 backdrop-blur-lg rounded-full border border-gray-700/30"
            style={{
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Main navigation items */}
            <div className="flex items-center justify-between gap-4 md:gap-8 w-full">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="relative flex flex-col items-center"
                  onClick={(e) => {
                    if (item.hasSocials) {
                      handleShareClick(e);
                    } else {
                      setActiveItem(index);
                    }
                  }}
                >
                  <motion.div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      activeItem === index ? "bg-gray-600" : "bg-transparent"
                    }`}
                    transition={{ duration: 0.2 }}
                    ref={item.hasSocials ? shareButtonRef : null}
                  >
                    <item.icon
                      size={20}
                      color={activeItem === index ? item.color : "#9CA3AF"}
                    />
                  </motion.div>

                  {/* Active indicator dot */}
                  {activeItem === index && (
                    <motion.div
                      layoutId="mobileActiveIndicator"
                      className="w-1 h-1 rounded-full mt-1"
                      style={{ backgroundColor: item.color }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social Modal */}
          <SocialModal
            isOpen={socialModalOpen}
            onClose={() => setSocialModalOpen(false)}
            modalPosition={modalPosition}
          />
        </motion.div>
      </div>
    );
  };

  return isDesktop ? <DesktopNav /> : <MobileNav />;
};

export default Navbar;
