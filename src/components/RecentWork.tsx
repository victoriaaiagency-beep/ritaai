import { motion } from "framer-motion";
import legal from "@/assets/case-legal.jpg";
import roofing from "@/assets/case-roofing.jpg";
import voice from "@/assets/case-voice.jpg";
import email from "@/assets/case-email.jpg";
import health from "@/assets/case-health.jpg";

const cases = [
  {
    img: legal,
    tag: "Legal Practice Systems",
    title: "Practice Management Built for a Law Firm",
    text: "A complete practice management and workflow setup so the team stops chasing paperwork and starts winning cases.",
  },
  {
    img: roofing,
    tag: "Roofing Operations",
    title: "Scaling a 4-Office Roofing Company",
    text: "Organized price books and production pipelines inside House Call Pro so jobs move smoothly from quote to install.",
  },
  {
    img: voice,
    tag: "GHL Voice Agent",
    title: "Bilingual AI Voice Agent (English / Spanish)",
    text: "Built a voice agent that talks to leads in two languages and routes their data straight into SharePoint and n8n.",
  },
  {
    img: email,
    tag: "Email-to-Data Automation",
    title: "Turning Messy Inboxes Into Clean Spreadsheets",
    text: "A custom Make.com parser that reads structured emails and drops the data into Google Sheets — no copy-paste needed.",
  },
  {
    img: health,
    tag: "Ongoing — Health & Recovery",
    title: "AI Lead Funnel for a Growing Health Platform",
    text: "Currently building an AI-powered lead funnel and workflow system for a high-growth health and recovery brand.",
    ongoing: true,
  },
];

const RecentWork = () => {
  return (
    <section id="recent-work" className="relative py-14 md:py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display font-extrabold text-text-primary text-3xl sm:text-4xl md:text-5xl"
        >
          Recent Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-center mt-3 text-text-secondary max-w-2xl mx-auto"
        >
          Real systems built for real operators. Each project gave the team back
          their time and made the business run more smoothly.
        </motion.p>

        <div className="mt-8 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl bg-white border border-border overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={c.img}
                  alt={c.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {c.tag}
                  {c.ongoing && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-secondary/20 text-[10px] font-semibold text-text-primary px-2 py-0.5 normal-case tracking-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      In Progress
                    </span>
                  )}
                </p>
                <h3 className="mt-2 font-display font-bold text-lg text-text-primary">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {c.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
