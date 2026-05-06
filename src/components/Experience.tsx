import { motion } from "framer-motion";
import { Download } from "lucide-react";

const items = [
  {
    title: "Operations Manager",
    subtitle: "Vycible Nigeria Limited & NUVYLUX GLOBAL SERVICES | 2025 - Present",
    text: "Focus on operational efficiency and system management.",
  },
  {
    title: "Workflow Coordinator",
    subtitle: "Az Cleaning Service | 2024 - 2025",
    text: "Set up comprehensive AI workflows using Make.com and n8n.",
  },
  {
    title: "Administrative Assistant",
    subtitle: "Aj Cleaning Inc | 2024 - 2025",
    text: "Handled web research, lead generation, and email marketing implementation.",
  },
  {
    title: "Education",
    subtitle: "Obafemi Awolowo University",
    text: "B.Ed, English/Language Arts.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-display font-extrabold text-text-primary text-3xl sm:text-4xl md:text-5xl"
        >
          My Experience
        </motion.h2>

        <div className="mt-12 relative pl-8">
          {/* vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-10">
            {items.map((item, i) => (
              <motion.div
                key={item.title + i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                {/* dot */}
                <span className="absolute -left-8 top-2 grid place-items-center">
                  <span className="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background" />
                </span>

                <h3 className="font-display font-bold text-xl text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{item.subtitle}</p>
                <p className="mt-2 text-text-secondary leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25"
          >
            <Download className="w-4 h-4" />
            Download Full Resume
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
