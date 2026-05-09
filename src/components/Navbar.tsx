import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import { openLeadModal } from "@/lib/constants";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#recent-work", label: "Recent Work" },
  { href: "#reviews", label: "Reviews" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4">
      <nav className="mx-auto max-w-6xl rounded-2xl border border-border/60 bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgb(15,23,42,0.06)]">
        <div className="flex items-center justify-between px-5 py-3">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-text-primary text-lg">
            <span className="grid place-items-center w-7 h-7 rounded-lg bg-primary/10">
              <Sparkles className="w-4 h-4 text-primary" />
            </span>
            Victoria
          </a>

          <ul className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={openLeadModal}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
            >
              Book a Strategy Call
            </motion.button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-text-primary hover:bg-muted"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-border/60 px-5 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-text-secondary hover:text-primary"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                openLeadModal();
              }}
              className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Book a Strategy Call
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
