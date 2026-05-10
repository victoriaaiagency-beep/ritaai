import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import r1 from "@/assets/review-1.jpg";
import r2 from "@/assets/review-2.jpg";
import r3 from "@/assets/review-3.jpg";
import r4 from "@/assets/review-4.jpg";
import { UPWORK_PROFILE_URL } from "@/lib/constants";

const reviews = [
  { img: r1, alt: "5-star Upwork review for Make.com email parsing automation" },
  { img: r2, alt: "5-star Upwork review for a Monday.com workflow project" },
  { img: r3, alt: "5-star Upwork review for legal practice systems & automation" },
  { img: r4, alt: "Upwork review describing Victoria as a builder of workflows" },
];

const Reviews = () => {
  return (
    <section id="reviews" className="relative py-14 md:py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Verified Client Feedback
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mt-3 font-display font-extrabold text-text-primary text-3xl sm:text-4xl md:text-5xl"
          >
            5-Star Reviews from Real Clients
          </motion.h2>
          <p className="mt-4 text-text-secondary">
            Every review below is a real, verified Upwork screenshot. Click any card
            to open Victoria's Upwork profile.
          </p>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 mx-auto max-w-3xl rounded-2xl bg-white border border-border p-8 shadow-md text-center"
        >
          <div className="flex justify-center gap-1 text-secondary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <blockquote className="mt-4 font-display text-xl md:text-2xl text-text-primary leading-snug">
            “She understood the workflow quickly and delivered a clean, reliable
            automation that works exactly as needed.”
          </blockquote>
          <figcaption className="mt-3 text-sm text-text-secondary">
            Verified Upwork client review
          </figcaption>
        </motion.figure>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <motion.a
              key={i}
              href={UPWORK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative block rounded-2xl overflow-hidden bg-[#0F172A] border border-border shadow-md hover:shadow-xl transition-shadow"
              aria-label="Open Victoria's Upwork profile to view this review"
            >
              <img
                src={r.img}
                alt={r.alt}
                loading="lazy"
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                View on Upwork <ExternalLink className="w-3 h-3" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={UPWORK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text-primary hover:border-primary/40 transition-colors"
          >
            See all reviews on Upwork <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
