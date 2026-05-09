import { motion } from "framer-motion";
import { Linkedin, Mail, Briefcase, MessageSquare } from "lucide-react";
import { CONTACT_EMAIL, LINKEDIN_URL, UPWORK_PROFILE_URL, openChatbot, openLeadModal } from "@/lib/constants";

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-[#0F172A] text-white">
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="font-display font-extrabold text-white text-3xl sm:text-4xl md:text-5xl"
        >
          Ready to get your time back?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto"
        >
          Let's make your business run smoothly so you can focus on real growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={openChatbot}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
          >
            <MessageSquare className="w-4 h-4" />
            Get Free Audit
          </button>
          <button
            onClick={openLeadModal}
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Book Strategy Call
          </button>
        </motion.div>
      </div>

      <div className="border-t border-[#334155]">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            © 2026 Victoria — Business Systems Architect. Built for Scale.
          </p>
          <div className="flex items-center gap-5">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-secondary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={UPWORK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork"
              className="text-slate-400 hover:text-secondary transition-colors"
            >
              <Briefcase className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email Victoria"
              className="text-slate-400 hover:text-secondary transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
