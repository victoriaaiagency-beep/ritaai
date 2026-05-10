import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Workflow, Database, Zap } from "lucide-react";
import avatar from "@/assets/rita-avatar.png";
import { UPWORK_PROFILE_URL, openLeadModal } from "@/lib/constants";

const orbitIcons = [
  { Icon: Workflow, angle: 0, delay: 0 },
  { Icon: Database, angle: 120, delay: 0.4 },
  { Icon: Zap, angle: 240, delay: 0.8 },
];

const rotatingPhrases = [
  "So You Get Your Time Back.",
  "So You Never Drop a Lead Again.",
  "So Every Tool Talks to Each Other.",
  "So Your Business Just Runs Smoothly.",
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
    <section className="relative pt-24 md:pt-36 pb-10 md:pb-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-primary"
        >
          👋 Hi, I'm Victoria
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 font-display font-extrabold text-text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
        >
          Systems That Just Work —{" "}
          <span className="relative inline-block align-top w-full sm:w-auto min-h-[1.15em] sm:min-h-[1.15em]">
            <span className="invisible block" aria-hidden>
              So Every Tool Talks to Each Other.
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 text-primary"
              >
                {rotatingPhrases[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary"
        >
          I'm Victoria — I help busy operators get their time back. I build the
          workflows, lead systems and AI helpers that make your business run
          smoothly, using the tools you already love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={openLeadModal}
            className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
          >
            Book a Strategy Call
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href={UPWORK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-text-primary hover:border-primary/40 transition-colors"
          >
            View My Upwork Profile
          </motion.a>
        </motion.div>

        {/* Avatar with orbiting icons */}
        <div className="relative mx-auto mt-16 w-[320px] h-[320px] flex items-center justify-center">
          <div className="absolute inset-8 rounded-full bg-secondary blur-2xl opacity-60" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-[250px] h-[250px] rounded-full bg-secondary shadow-[0_20px_60px_-15px_rgba(251,191,36,0.6)] overflow-hidden ring-4 ring-white"
          >
            <img
              src={avatar}
              alt="Victoria, Business Systems Architect"
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>

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
