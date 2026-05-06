import { motion } from "framer-motion";
import { Magnet, Blocks, BarChart3, Cpu, type LucideIcon } from "lucide-react";

const services: { title: string; text: string; Icon: LucideIcon }[] = [
  {
    title: "Lead Generation & Follow-Up Automation",
    text: "Capture, qualify, and nurture leads automatically without losing the human touch.",
    Icon: Magnet,
  },
  {
    title: "CRM & Workflow Integration",
    text: "Connect Monday.com, Notion, Airtable, and your messaging systems into one seamless central hub.",
    Icon: Blocks,
  },
  {
    title: "Operations & Process Improvement",
    text: "Simplify monthly reconciliations, automate reporting, and streamline client onboarding.",
    Icon: BarChart3,
  },
  {
    title: "Custom AI & Automation Infrastructure",
    text: "Tailored Make.com and n8n architecture designed specifically for scalable growth.",
    Icon: Cpu,
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-text-primary text-3xl sm:text-4xl md:text-5xl"
          >
            Solutions Built for Growth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-text-secondary"
          >
            I design automated systems that eliminate repetitive tasks and boost productivity.
          </motion.p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ title, text, Icon }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl bg-white border border-border p-7 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 font-display font-bold text-xl text-text-primary">
                {title}
              </h3>
              <p className="mt-2 text-text-secondary leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
