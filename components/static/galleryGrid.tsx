"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoClose, IoExpand } from "react-icons/io5";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GalleryItem, categories, galleryItems } from "../../data/galleryGrid";
const GalleryGrid = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Filter items when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(
        galleryItems.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isModalOpen
      ) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300); // Clear selected item after animation
  };

  const navigateGallery = (direction: "next" | "prev") => {
    if (!selectedItem) return;

    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedItem.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredItems.length;
    } else {
      newIndex =
        (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    }

    setSelectedItem(filteredItems[newIndex]);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left, go to next
      navigateGallery("next");
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right, go to previous
      navigateGallery("prev");
    }
  };

  return (
    <div
      className="py-16 px-4 md:px-8 bg-gradient-to-b from-[#030014] to-[#070219]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            نمونه کارهای ما
          </motion.h2>
          <motion.div
            className="h-1 w-20 mx-auto rounded-full mb-6"
            style={{
              background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            نمونه‌ای از پروژه‌های اخیر ما که با افتخار برای مشتریان خود انجام
            داده‌ایم
          </motion.p>
        </div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-white text-[#030014] shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => openModal(item)}
                whileHover={{ y: -5 }}
                layout
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white text-xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm">{item.category}</p>
                    </motion.div>
                  </div>

                  {/* Expand icon */}
                  <motion.div
                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IoExpand className="text-white text-lg" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                ref={modalRef}
                className="relative max-w-5xl w-full max-h-[90vh] bg-[#0A0A1B]/90 rounded-2xl overflow-hidden backdrop-blur-lg border border-white/10"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                >
                  <IoClose className="text-white text-xl" />
                </button>

                {/* Navigation buttons */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery("prev");
                  }}
                >
                  <FiChevronLeft className="text-white text-xl" />
                </button>

                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md p-3 rounded-full hover:bg-white/20 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateGallery("next");
                  }}
                >
                  <FiChevronRight className="text-white text-xl" />
                </button>

                {/* Image container */}
                <div className="relative w-full h-[60vh] overflow-hidden">
                  <motion.div
                    key={selectedItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 bg-gradient-to-t from-[#0A0A1B] to-transparent">
                  <motion.h3
                    className="text-white text-2xl font-bold mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {selectedItem.title}
                  </motion.h3>
                  <motion.div
                    className="flex items-center mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <span className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm">
                      {selectedItem.category}
                    </span>
                  </motion.div>
                  <motion.p
                    className="text-gray-300 text-base"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {selectedItem.description}
                  </motion.p>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${
                        ((filteredItems.findIndex(
                          (item) => item.id === selectedItem.id
                        ) +
                          1) /
                          filteredItems.length) *
                        100
                      }%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              نمونه کاری یافت نشد
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              در این دسته‌بندی فعلاً نمونه کاری ثبت نشده است. لطفاً دسته‌بندی
              دیگری را انتخاب کنید.
            </p>
            <button
              className="mt-6 px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-300"
              onClick={() => setActiveCategory("all")}
            >
              نمایش همه نمونه کارها
            </button>
          </motion.div>
        )}

        {/* Load more button */}
        {filteredItems.length > 0 &&
          filteredItems.length < galleryItems.length &&
          activeCategory === "all" && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <button
                className="px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] hover:opacity-90 transition-opacity duration-300"
                onClick={() => setFilteredItems(galleryItems)}
              >
                نمایش بیشتر
              </button>
            </motion.div>
          )}

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default GalleryGrid;
