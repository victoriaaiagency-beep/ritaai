import { useEffect, useRef, useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, Bot, Loader2 } from "lucide-react";
import { CALENDAR_URL, openLeadModal } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

type Msg = {
  role: "user" | "assistant";
  content: string;
  showBooking?: boolean;
  showCalendar?: boolean;
};

const GREETING =
  "Hi! I am Victoria's AI assistant. I can answer questions about how we use n8n, Make.com, or Voice Agents to save you 40-60 hours a week. What operational headache can I help you solve today?";

const ChatbotModal = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [completed, setCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chatbot", handler);
    return () => window.removeEventListener("open-chatbot", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  const close = () => setOpen(false);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending || completed) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const payload = next.map((m) => ({ role: m.role, content: m.content }));
      const { data, error } = await supabase.functions.invoke("ai-chat-agent", {
        body: { messages: payload },
      });
      if (error) throw error;
      const reply: Msg = {
        role: "assistant",
        content: data.reply,
        showBooking: !!data.show_booking,
        showCalendar: !!data.lead_captured,
      };
      setMessages((m) => [...m, reply]);
      if (data.lead_captured) setCompleted(true);
    } catch (err) {
      console.error("ai-chat-agent failed", err);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I hit a snag reaching the server. Mind trying that again? You can also email victoria.ai.agency@gmail.com directly.",
        },
      ]);
    } finally {
      setSending(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center px-4 py-6"
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
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg h-[80vh] sm:h-[640px] rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#0F172A] px-5 py-4 flex items-center gap-3">
              <div className="relative">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-display font-bold">
                  <Bot className="w-5 h-5" />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#0F172A]" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm leading-tight">
                  Victoria | AI Automation Agent
                </p>
                <p className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </p>
              </div>
              <button
                onClick={close}
                aria-label="Close chat"
                className="ml-auto p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-[#F8FAFC]"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-white border border-border text-text-primary rounded-bl-md shadow-sm"
                    }`}
                  >
                    {m.content}
                    {m.showBooking && (
                      <button
                        onClick={() => {
                          close();
                          setTimeout(openLeadModal, 200);
                        }}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Book Strategy Call
                      </button>
                    )}
                    {m.showCalendar && (
                      <a
                        href={CALENDAR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Pick a time on the calendar
                      </a>
                    )}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/60 animate-bounce" style={{ animationDelay: "120ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-text-secondary/60 animate-bounce" style={{ animationDelay: "240ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={send}
              className="border-t border-border bg-white px-3 py-3 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={sending || completed}
                placeholder={
                  completed
                    ? "Conversation handed off to Victoria"
                    : "Tell me about your bottleneck..."
                }
                maxLength={1000}
                className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm text-text-primary outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sending || completed || !input.trim()}
                aria-label="Send message"
                className="grid place-items-center w-10 h-10 rounded-full bg-primary text-primary-foreground disabled:opacity-50"
              >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatbotModal;
