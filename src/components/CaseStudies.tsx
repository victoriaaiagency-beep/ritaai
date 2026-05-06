import { motion } from "framer-motion";
import { Workflow, Mail, Database, ArrowRight } from "lucide-react";

const CaseStudies = () => {
  return (
    <section id="case-studies" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display font-extrabold text-text-primary text-3xl sm:text-4xl md:text-5xl"
        >
          Real Business Results
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-border bg-white shadow-md"
        >
          {/* Left: mockup */}
          <div className="relative bg-secondary/90 p-8 md:p-12 flex items-center justify-center min-h-[320px]">
            <div className="absolute inset-0 bg-secondary" />
            <div className="relative w-full max-w-sm">
              <div className="bg-white rounded-2xl shadow-xl p-5 ring-1 ring-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Mail className="w-5 h-5 text-primary" />
                    <div className="h-2 flex-1 rounded bg-border" />
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10">
                    <Workflow className="w-5 h-5 text-primary" />
                    <div className="h-2 flex-1 rounded bg-primary/30" />
                  </div>
                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Database className="w-5 h-5 text-primary" />
                    <div className="h-2 flex-1 rounded bg-border" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg px-3 py-2 text-xs font-semibold text-text-primary ring-1 ring-black/5">
                +20 hrs / week
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="bg-white p-8 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Case Study
            </p>
            <h3 className="mt-3 font-display font-extrabold text-2xl md:text-3xl text-text-primary">
              Automated Client Onboarding for Service Agency
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <p className="font-display font-bold text-text-primary">The Problem</p>
                <p className="text-text-secondary mt-1">
                  Manual data entry and missed follow-ups leading to dropped clients.
                </p>
              </li>
              <li>
                <p className="font-display font-bold text-text-primary">The Solution</p>
                <p className="text-text-secondary mt-1">
                  Built a custom Make.com and n8n workflow connecting web forms to the
                  CRM and triggering automated email sequences.
                </p>
              </li>
              <li>
                <p className="font-display font-bold text-text-primary">The Result</p>
                <p className="text-text-secondary mt-1">
                  Saved 20+ hours a week and increased client retention.
                </p>
              </li>
            </ul>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="mt-8 inline-flex items-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text-primary hover:border-primary/40 transition-colors"
            >
              Hire Me For A Similar Project
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
