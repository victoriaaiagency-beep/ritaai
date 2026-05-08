import { motion } from "framer-motion";

const steps = [
  {
    n: 1,
    title: "We Find the Bottlenecks",
    text: "We sit down together and map out where your time is leaking — the chaotic handoffs, the manual work, the dropped leads.",
  },
  {
    n: 2,
    title: "I Build the System",
    text: "I design and build a clear, reliable system around how your business actually works — using the tools that fit you best.",
  },
  {
    n: 3,
    title: "You Get Your Time Back",
    text: "Your new setup runs quietly in the background, catching leads, moving work along, and giving you real-time clarity.",
  },
];

const Process = () => {
  return (
    <section id="process" className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center font-display font-extrabold text-text-primary text-3xl sm:text-4xl md:text-5xl"
        >
          A System Engineered for Results
        </motion.h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
          {steps.map(({ n, title, text }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div
                className="mx-auto md:mx-0 grid place-items-center w-16 h-16 rounded-full font-display font-extrabold text-2xl text-primary"
                style={{ backgroundColor: "hsl(var(--primary) / 0.2)" }}
              >
                {n}
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

export default Process;
