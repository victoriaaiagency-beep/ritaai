import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, Briefcase } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_EMAIL, LINKEDIN_URL, UPWORK_PROFILE_URL } from "@/lib/constants";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address" })
  .max(255, { message: "Email must be less than 255 characters" });

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({
        title: "Invalid email",
        description: result.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const subject = encodeURIComponent("Free Audit Checklist Request");
    const body = encodeURIComponent(
      `Hi Victoria,\n\nPlease send me the free audit checklist.\n\nMy email: ${email}\n`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSubmitting(false);
      setEmail("");
      toast({
        title: "You're on the list",
        description: "Your free audit checklist is on its way.",
      });
    }, 600);
  };

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

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-8 mx-auto flex flex-col sm:flex-row items-stretch gap-3 max-w-xl"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            placeholder="you@company.com"
            aria-label="Email address"
            className="flex-1 rounded-full bg-white text-text-primary placeholder:text-slate-400 px-5 py-3.5 text-sm outline-none ring-1 ring-transparent focus:ring-primary"
          />
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-70"
          >
            {submitting ? "Sending..." : "Get Free Audit Checklist"}
          </motion.button>
        </motion.form>
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
