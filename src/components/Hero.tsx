import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Workflow, Database, Zap } from "lucide-react";
import avatar from "@/assets/rita-avatar.png";

const orbitIcons = [
  { Icon: Workflow, angle: 0, delay: 0 },
  { Icon: Database, angle: 120, delay: 0.4 },
  { Icon: Zap, angle: 240, delay: 0.8 },
];

const rotatingPhrases = [
  "Without the Operational Chaos.",
  "So You Never Drop a Lead Again.",
  "With Every Tool Connected in One Place.",
  "While Giving You Real-Time Clarity.",
];

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % rotatingPhrases.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative pt-36 pb-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-primary"
        >
          👋 Hi, I'm Rita Esomovie
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 font-display font-extrabold text-text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
        >
          AI Automation Systems That Scale Your Business{" "}
          <span className="text-primary">Without More Manual Work.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary"
        >
          I build smart workflows, lead systems, and AI-powered automations using
          Make.com, n8n, Monday.com, and custom integrations — so your business runs
          smoother, faster, and more profitably.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
          >
            Book a Free Systems Audit
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#"
            className="inline-flex items-center rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-text-primary hover:border-primary/40 transition-colors"
          >
            View My Upwork Profile
          </motion.a>
        </motion.div>

        {/* Avatar with orbiting icons */}
        <div className="relative mx-auto mt-16 w-[320px] h-[320px] flex items-center justify-center">
          {/* glow */}
          <div className="absolute inset-8 rounded-full bg-secondary blur-2xl opacity-60" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-[250px] h-[250px] rounded-full bg-secondary shadow-[0_20px_60px_-15px_rgba(251,191,36,0.6)] overflow-hidden ring-4 ring-white"
          >
            <img
              src={avatar}
              alt="Rita Esomovie, Workflow & Automation Specialist"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Orbit container */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {orbitIcons.map(({ Icon, angle, delay }, i) => {
              const radius = 150;
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: -360 }}
                    transition={{
                      y: { duration: 3, repeat: Infinity, delay, ease: "easeInOut" },
                      rotate: { duration: 22, repeat: Infinity, ease: "linear" },
                    }}
                    className="-translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-2xl bg-white border border-border shadow-xl shadow-primary/10"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
