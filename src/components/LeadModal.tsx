import { useEffect, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_EMAIL, CALENDAR_URL } from "@/lib/constants";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(5, "Please enter a phone number").max(40),
  bottleneck: z
    .string()
    .trim()
    .min(5, "Tell us a little more")
    .max(1000, "Keep it under 1000 characters"),
});

const LeadModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "thanks">("form");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", bottleneck: "" });
  const { toast } = useToast();

  useEffect(() => {
    const handler = () => {
      setStep("form");
      setOpen(true);
    };
    window.addEventListener("open-lead-modal", handler);
    return () => window.removeEventListener("open-lead-modal", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", bottleneck: "" });
      setStep("form");
    }, 300);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast({
        title: "Please check your details",
        description: result.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    // Send via mailto (no backend). The browser opens the user's email client.
    const subject = encodeURIComponent(`New strategy call request — ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMain business bottleneck:\n${form.bottleneck}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSubmitting(false);
      setStep("thanks");
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden"
          >
            {/* Brand header */}
            <div className="bg-[#0F172A] px-6 py-5 flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary/20">
                <Sparkles className="w-4 h-4 text-secondary" />
              </span>
              <div>
                <p className="font-display font-bold text-white text-base leading-tight">
                  Victoria
                </p>
                <p className="text-xs text-slate-300">Business Systems Architect</p>
              </div>
              <button
                onClick={close}
                aria-label="Close dialog"
                className="ml-auto p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {step === "form" ? (
                <>
                  <h2
                    id="lead-modal-title"
                    className="font-display font-extrabold text-2xl text-text-primary"
                  >
                    Book your strategy call
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary">
                    Share a few details so Victoria can come prepared with ideas to
                    fix your biggest bottleneck.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-text-primary">
                        Your name
                      </label>
                      <input
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Cooper"
                        className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-text-primary">
                          Email
                        </label>
                        <input
                          required
                          type="email"
                          maxLength={255}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-text-primary">
                          Phone number
                        </label>
                        <input
                          required
                          type="tel"
                          maxLength={40}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+1 555 000 1234"
                          className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-text-primary">
                        What is your main business bottleneck?
                      </label>
                      <textarea
                        required
                        maxLength={1000}
                        value={form.bottleneck}
                        onChange={(e) =>
                          setForm({ ...form, bottleneck: e.target.value })
                        }
                        rows={4}
                        placeholder="e.g. Leads slipping through the cracks between our forms and CRM."
                        className="mt-1 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-70"
                    >
                      {submitting ? "Sending..." : "Submit"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="mt-5 font-display font-extrabold text-2xl text-text-primary">
                    Thank you!
                  </h2>
                  <p className="mt-3 text-text-secondary">
                    Your details are secured. Victoria is reviewing your request now.
                    Use the button below to pick a time on the calendar that works for
                    you.
                  </p>
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30"
                  >
                    <Calendar className="w-4 h-4" />
                    Pick a time on the calendar
                  </a>
                  <button
                    onClick={close}
                    className="mt-3 block mx-auto text-xs font-medium text-text-secondary hover:text-primary"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
