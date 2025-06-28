"use client";
import { useState, useRef, useEffect, createElement } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { companyValues, teamMembers, timelineEvents } from "../../data/aboutUs";
import Link from "next/link";

const AboutUs = () => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: false, margin: "-100px 0px" });
  const timelineInView = useInView(timelineRef, {
    once: false,
    margin: "-100px 0px",
  });
  const valuesInView = useInView(valuesRef, {
    once: false,
    margin: "-100px 0px",
  });
  const teamInView = useInView(teamRef, { once: false, margin: "-100px 0px" });
  const statsInView = useInView(statsRef, {
    once: false,
    margin: "-100px 0px",
  });

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacitySection = useTransform(
    scrollYProgress,
    [1, 1, 1, 1],
    [1, 1, 1, 1]
  );

  // Handle window resize for responsive adjustments
  const [isMobile, setIsMobile] = useState(false);
  console.log(isMobile);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get selected team member

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#030014]"
      dir="rtl" // RTL for Persian content
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050118] to-[#030014] opacity-80"></div>

      {/* Animated background image with parallax */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <Image
          src="/assets/images/cam1.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/70 to-transparent"></div>
      </motion.div>

      {/* Content container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20"
        style={{ opacity: opacitySection }}
      >
        {/* Hero section */}
        <div
          ref={heroRef}
          className="min-h-[80vh] flex flex-col justify-center"
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.19, 1.0, 0.22, 1.0],
              }}
            >
              ما{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                کارخانه محتوا
              </span>{" "}
              هستیم
            </motion.h1>

            <motion.div
              className="h-1 w-20 mx-auto rounded-full mb-8"
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={
                heroInView
                  ? { width: "80px", opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              transition={{ delay: 0.4, duration: 0.8 }}
            />

            <motion.p
              className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.19, 1.0, 0.22, 1.0],
              }}
            >
              ما یک تیم خلاق و متخصص هستیم که با ترکیب هنر و استراتژی، محتوای
              منحصر به فردی برای برندها خلق می‌کنیم. هدف ما کمک به کسب و کارها
              برای برقراری ارتباط مؤثر با مخاطبان و رشد در دنیای دیجیتال است.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={
                heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: [0.19, 1.0, 0.22, 1.0],
              }}
            >
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
                <Link href="/contact">تماس با ما</Link>{" "}
              </motion.button>

              <motion.button
                className="px-8 py-3 rounded-full text-white font-medium border border-white/20 backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                }}
                whileHover={{
                  scale: 1.05,
                  background: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/works">مشاهده نمونه کارها</Link>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <span className="text-gray-400 text-sm mb-2">بیشتر بدانید</span>
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-gray-400 flex justify-center p-1"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Our story section */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-square"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src="/assets/images/cam2.jpg"
                alt="Our Story"
                fill
                className="object-cover"
              />

              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-transparent mix-blend-overlay"></div>

              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full border border-white/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 70%)",
                }}
              />

              <motion.div
                className="absolute -top-5 -left-5 w-20 h-20 rounded-full border border-white/10"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2,
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(236, 72, 153, 0.1) 50%, transparent 70%)",
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                داستان ما
              </h2>

              <div className="h-1 w-20 rounded-full mb-8 bg-gradient-to-r from-purple-500 to-pink-500"></div>

              <div className="space-y-6 text-gray-300">
                <p>
                  کارخانه محتوا در سال ۱۳۹۷ با هدف ارائه خدمات تخصصی تولید محتوا
                  به کسب و کارها تأسیس شد. ما با یک تیم کوچک اما پرانگیزه شروع
                  کردیم و با تمرکز بر کیفیت و خلاقیت، توانستیم اعتماد مشتریان را
                  جلب کنیم.
                </p>

                <p>
                  با گذشت زمان، خدمات خود را گسترش دادیم و از تولید محتوای متنی
                  به سمت تولید ویدیو، عکاسی، طراحی گرافیک و استراتژی‌های دیجیتال
                  مارکتینگ حرکت کردیم. امروز، ما یک آژانس کامل خدمات محتوایی
                  هستیم که به برندها کمک می‌کنیم تا داستان خود را به شکلی جذاب و
                  تأثیرگذار بیان کنند.
                </p>

                <p>
                  فلسفه ما ساده است: ترکیب هنر، استراتژی و تکنولوژی برای خلق
                  محتوایی که نه تنها زیباست، بلکه نتایج واقعی برای کسب و کارها
                  به ارمغان می‌آورد.
                </p>
              </div>

              <div className="mt-10 flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    +۵
                  </div>
                  <div className="text-gray-400 text-sm">سال تجربه</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    +۱۰۰
                  </div>
                  <div className="text-gray-400 text-sm">مشتری راضی</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    +۵۰۰
                  </div>
                  <div className="text-gray-400 text-sm">پروژه موفق</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Our values section */}
        <div ref={valuesRef} className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ارزش‌های ما
            </h2>

            <motion.div
              className="h-1 w-20 mx-auto rounded-full mb-6"
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={
                valuesInView
                  ? { width: "80px", opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              ارزش‌های اصلی که هدایت‌کننده کار ما هستند و به ما کمک می‌کنند تا
              بهترین خدمات را به مشتریان ارائه دهیم
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.id}
                className="relative p-6 rounded-2xl backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${value.color}30`,
                  boxShadow: `0 10px 30px -5px ${value.color}10`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 15px 30px -5px ${value.color}20`,
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-6 text-2xl"
                  style={{
                    backgroundColor: `${value.color}20`,
                    color: value.color,
                  }}
                >
                  <>{value.icon && createElement(value.icon)}</>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>

                <p className="text-gray-300">{value.description}</p>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-10"
                  style={{
                    background: `radial-gradient(circle at top right, ${value.color}50, transparent 70%)`,
                  }}
                ></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline section */}
        <div ref={timelineRef} className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={
              timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              مسیر ما
            </h2>

            <motion.div
              className="h-1 w-20 mx-auto rounded-full mb-6"
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={
                timelineInView
                  ? { width: "80px", opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              نگاهی به مسیر رشد و تکامل کارخانه محتوا از ابتدا تا امروز
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-blue-500/50"></div>

            {/* Timeline events */}
            <div className="space-y-12 relative">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={event.year}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 items-center`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white bg-[#030014] z-10"></div>

                  {/* Content */}
                  <div className="md:w-1/2 text-center md:text-right">
                    <motion.div
                      className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
                      style={{
                        backgroundColor: `${event.color}20`,
                        color: event.color,
                      }}
                    >
                      {event.year}
                    </motion.div>

                    <h3 className="text-xl font-bold text-white mb-3">
                      {event.title}
                    </h3>

                    <p className="text-gray-300">{event.description}</p>
                  </div>

                  {/* Icon */}
                  <div className="relative md:w-1/2 flex justify-center md:justify-start items-center">
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl z-10"
                      style={{
                        backgroundColor: `${event.color}20`,
                        color: event.color,
                        boxShadow: `0 0 20px ${event.color}30`,
                      }}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 30px ${event.color}40`,
                      }}
                    >
                      {createElement(event.icon)}
                    </motion.div>

                    {/* Decorative elements */}
                    <motion.div
                      className="absolute w-32 h-32 rounded-full opacity-20"
                      style={{
                        background: `radial-gradient(circle, ${event.color}30 0%, transparent 70%)`,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team section */}
        <div ref={teamRef} className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              تیم ما
            </h2>

            <motion.div
              className="h-1 w-20 mx-auto rounded-full mb-6"
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={
                teamInView
                  ? { width: "80px", opacity: 1 }
                  : { width: 0, opacity: 0 }
              }
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              با افراد خلاق و متخصصی آشنا شوید که کارخانه محتوا را به یک آژانس
              برتر تبدیل کرده‌اند
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className={`relative rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                  selectedMember && selectedMember !== member.id
                    ? "opacity-60 scale-95"
                    : "opacity-100 scale-100"
                }`}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() =>
                  setSelectedMember(
                    selectedMember === member.id ? null : member.id
                  )
                }
                whileHover={{ y: -5 }}
              >
                {/* Member image */}
                <div className="relative aspect-[3/4]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent"></div>
                </div>

                {/* Member info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">{member.role}</p>

                  {/* Social links */}
                  <div className="flex gap-3">
                    {member.socialLinks.instagram && (
                      <a
                        href={member.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                        </svg>
                      </a>
                    )}

                    {member.socialLinks.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>
                      </a>
                    )}

                    {member.socialLinks.twitter && (
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bio overlay (visible when selected) */}
                <AnimatePresence>
                  {selectedMember === member.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-[#030014]/90 to-[#030014]/90 backdrop-blur-sm p-6 flex flex-col justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-300">{member.bio}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div ref={statsRef} className="py-20">
          <motion.div
            className="p-8 rounded-2xl backdrop-blur-lg"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "+۱۰۰", label: "مشتری راضی", color: "#8B5CF6" },
                { value: "+۵۰۰", label: "پروژه موفق", color: "#EC4899" },
                { value: "+۵", label: "سال تجربه", color: "#3B82F6" },
                { value: "+۹۸٪", label: "رضایت مشتری", color: "#10B981" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={
                    statsInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.h3
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: stat.color }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.9, 1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.5,
                    }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonial section */}
        <div className="py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              نظرات مشتریان
            </h2>

            <motion.div
              className="h-1 w-20 mx-auto rounded-full mb-6"
              style={{
                background: "linear-gradient(90deg, #8B5CF6, #EC4899)",
              }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "80px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            <motion.p
              className="text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              آنچه مشتریان ما درباره همکاری با کارخانه محتوا می‌گویند
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div
              className="p-8 rounded-2xl backdrop-blur-lg"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/assets/images/cam2.jpg" // Replace with testimonial image
                    alt="مشتری راضی"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 border-2 border-white/20 rounded-full"></div>
                </div>

                <div className="flex-1">
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 text-xl ml-1">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-white/90 text-lg mb-6 leading-relaxed">
                    همکاری با کارخانه محتوا یکی از بهترین تصمیمات کسب و کار ما
                    بود. آنها نه تنها محتوای با کیفیت بالا تولید کردند، بلکه
                    استراتژی دیجیتال ما را کاملاً متحول کردند. نتایج فراتر از
                    انتظارات ما بود و ما توانستیم افزایش چشمگیری در ترافیک سایت
                    و تعامل مخاطبان خود مشاهده کنیم.
                  </p>

                  <div>
                    <h4 className="text-white font-bold text-lg">سارا محمدی</h4>
                    <p className="text-gray-400">
                      مدیر بازاریابی، شرکت نوآوران دیجیتال
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="absolute -bottom-5 -left-5 w-10 h-10 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)",
                border: "1px solid rgba(236, 72, 153, 0.3)",
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              }}
            />
          </motion.div>
        </div>

        {/* Call to action */}
        <div className="py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              آماده همکاری با ما هستید؟
            </h2>

            <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
              با کارخانه محتوا تماس بگیرید و اولین قدم را برای ارتقای استراتژی
              محتوای خود بردارید.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
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
                <Link href="/contact">تماس با ما</Link>
              </motion.button>

              <motion.button
                className="px-8 py-3 rounded-full text-white font-medium border border-white/20 backdrop-blur-sm"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                }}
                whileHover={{
                  scale: 1.05,
                  background: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/works">مشاهده نمونه کارها</Link>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 20 + 10;
            const initialX = Math.random() * 100;
            const initialY = Math.random() * 100;
            const delay = Math.random() * 5;
            const colors = ["#8B5CF6", "#EC4899", "#3B82F6", "#10B981"];
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

          {/* Floating orbs with glass effect */}
          <motion.div
            className="absolute w-40 h-40 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)",
              boxShadow:
                "inset 0 0 20px rgba(139, 92, 246, 0.2), 0 0 30px rgba(139, 92, 246, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(139, 92, 246, 0.1)",
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
            className="absolute w-24 h-24 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)",
              boxShadow:
                "inset 0 0 15px rgba(236, 72, 153, 0.2), 0 0 20px rgba(236, 72, 153, 0.1)",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(236, 72, 153, 0.1)",
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
              delay: 2,
            }}
          />
        </div>

        {/* Animated light beams */}
        <motion.div
          className="absolute h-[200px] w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"
          style={{
            left: "70%",
            top: "10%",
            transform: "rotate(30deg)",
          }}
          animate={{
            opacity: [0, 0.7, 0],
            height: ["150px", "200px", "150px"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute h-[150px] w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent"
          style={{
            left: "25%",
            bottom: "20%",
            transform: "rotate(-20deg)",
          }}
          animate={{
            opacity: [0, 0.5, 0],
            height: ["100px", "150px", "100px"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </motion.div>
    </div>
  );
};

export default AboutUs;
