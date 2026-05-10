import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { openChatbot } from "@/lib/constants";

const ChatLauncher = () => {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const idleTimer = useRef<number | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      const atBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setVisible(true);
      } else if (dy > 4) {
        // scrolling down
        setVisible(false);
      } else if (dy < -4) {
        // scrolling up
        setVisible(true);
      }
      lastY.current = y;

      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setVisible(true), 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="chat-launcher"
          onClick={openChatbot}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get a Free Audit — chat with Victoria's AI"
          className="fixed bottom-24 right-5 sm:bottom-8 sm:right-6 z-40 grid place-items-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-primary" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ChatLauncher;
