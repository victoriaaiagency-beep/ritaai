import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { openChatbot } from "@/lib/constants";

const ChatLauncher = () => {
  return (
    <motion.button
      onClick={openChatbot}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Get a Free Audit — chat with Victoria's AI"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-2xl shadow-primary/40"
    >
      <span className="relative grid place-items-center w-6 h-6 rounded-full bg-white/15">
        <MessageSquare className="w-3.5 h-3.5" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-primary" />
      </span>
      Get Free Audit
    </motion.button>
  );
};

export default ChatLauncher;
