import { motion } from "framer-motion";

const industries = [
  "Law Firms",
  "Realtors",
  "Construction",
  "Roofing",
  "Medspa",
  "Fintech",
  "Agencies",
  "Gyms",
  "Startups",
];
const stack = ["Make.com", "n8n", "Monday.com", "Notion AI", "Airtable", "Zapier", "Asana"];

const TrustBanner = () => {
  const marqueeItems = [...stack, ...stack];

  return (
    <section className="relative w-full bg-white border-y border-border py-8">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#475569]">
          Transforming Operations For:
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {industries.map((label) => (
            <span
              key={label}
              className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-semibold text-text-primary"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 overflow-hidden">
        <motion.div
          className="flex w-max gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-display font-bold text-[#94A3B8] flex items-center gap-12"
            >
              {item}
              <span className="text-[#94A3B8]">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBanner;
