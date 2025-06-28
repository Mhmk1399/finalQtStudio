"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  textColor?: string;
}

function ParallaxText({
  children,
  baseVelocity = 100,
  textColor = "text-white",
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Continuous movement regardless of scroll
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      className="parallax py-4 relative overflow-hidden group
                    bg-black border-double  border-y-8
                    backdrop-blur-xl border-white"
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

      <motion.div
        className="scroller relative flex items-center justify-center"
        style={{ x }}
      >
        {[...Array(4)].map((_, index) => (
          <motion.span
            key={index}
            className={`inline-block bg-gradient-to-r ${textColor} 
                       bg-clip-text text-transparent
                       text-4xl md:text-5xl lg:text-2xl
                       font-bold mx-6 tracking-tight
                       hover:scale-110 transition-all duration-300 
                       cursor-default text-center`}
            whileHover={{
              filter: `drop-shadow(0 0 15px )`,
              transition: { duration: 0.2 },
            }}
          >
            {children}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
        initial={{ opacity: 0, x: "-100%" }}
        animate={{
          opacity: [0, 1, 0],
          x: ["100%", "-100%", "-100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <section className="flex flex-col justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="space-y-2"
      >
        <ParallaxText baseVelocity={3} textColor="from-white to-white">
          تدوین آموزشی حرفه ای با سطح بالا
        </ParallaxText>
      </motion.div>
    </section>
  );
}
