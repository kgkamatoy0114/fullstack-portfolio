"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Mail, Phone, Send } from "lucide-react";
import { submitContact } from "../lib/api";

type ChatMessage = {
  id: number;
  from: "user" | "tal";
  text: string;
  time: string;
};

type Field = "name" | "email" | "message";

const STEPS: { field: Field; prompt: string; placeholder: string; type?: string }[] = [
  { field: "name",    prompt: "Hey! 👋 What's your name?",              placeholder: "Your name…"              },
  { field: "email",   prompt: "Nice to meet you! What's your email?",   placeholder: "you@example.com…", type: "email" },
  { field: "message", prompt: "What would you like to talk about?",     placeholder: "Type your message…"     },
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Contact() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, from: "tal", text: STEPS[0].prompt, time: now() },
  ]);
  const [step, setStep]         = useState(0);
  const [input, setInput]       = useState("");
  const [formData, setFormData] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [sending, setSending]   = useState(false);
  const [done, setDone]         = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  function addMessage(msg: Omit<ChatMessage, "id">) {
    setMessages((prev) => [...prev, { ...msg, id: prev.length }]);
  }

  async function handleSend() {
    const value = input.trim();
    if (!value || sending || done) return;

    // Basic email validation on step 1
    if (step === 1 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      addMessage({ from: "tal", text: "Hmm, that doesn't look like a valid email. Try again?", time: now() });
      setInput("");
      return;
    }

    const currentField = STEPS[step].field;
    const updated = { ...formData, [currentField]: value };
    setFormData(updated);

    addMessage({ from: "user", text: value, time: now() });
    setInput("");

    if (step < STEPS.length - 1) {
      // Move to next question
      const nextStep = step + 1;
      setStep(nextStep);
      setTimeout(() => {
        addMessage({ from: "tal", text: STEPS[nextStep].prompt, time: now() });
      }, 400);
    } else {
      // All fields collected — submit
      setSending(true);
      setTimeout(() => {
        addMessage({ from: "tal", text: "Got it! Sending your message…", time: now() });
      }, 400);

      try {
        await submitContact(updated);
        setTimeout(() => {
          addMessage({
            from: "tal",
            text: `Thanks ${updated.name}! 🎉 I received your message and I'll get back to you at ${updated.email} soon.`,
            time: now(),
          });
          setDone(true);
        }, 1000);
      } catch (err) {
        setTimeout(() => {
          addMessage({
            from: "tal",
            text: err instanceof Error ? err.message : "Something went wrong. Please try again.",
            time: now(),
          });
          // Let them retry the message step
        }, 1000);
      } finally {
        setSending(false);
      }
    }
  }

  const currentStep = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 py-24"
    >
      <div className="max-w-5xl w-full grid gap-8 md:grid-cols-[0.9fr_1.1fr] items-start">

        {/* Left — info */}
        <div className="text-left">
          <p className="text-sm uppercase tracking-[0.22em] text-gray-500">Contact</p>
          <h2 className="text-3xl font-bold mt-2">Let's build something useful</h2>
          <p className="text-gray-400 mt-4 leading-7">
            Send a quick note about the role, project, or collaboration. I can
            help with responsive UI, API integration, and full-stack feature work.
          </p>

          <div className="space-y-3 mt-8">
            <a href="mailto:kgkamatoy0114@gmail.com" className="flex items-center gap-3 text-gray-200 hover:text-white">
              <Mail className="h-5 w-5" />
              kgkamatoy0114@gmail.com
            </a>
            <a href="tel:+639951389332" className="flex items-center gap-3 text-gray-200 hover:text-white">
              <Phone className="h-5 w-5" />
              09951389332
            </a>
            <a
              href="/KRISTAL_KAMATOY.pdf"
              download
              className="inline-flex items-center gap-2 mt-2 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition text-sm"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </div>
        </div>

        {/* Right — chat box */}
        <div className="flex flex-col rounded-2xl border border-white/10 bg-gray-950 overflow-hidden shadow-2xl h-[520px]">

          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-gray-900">
            <div className="relative">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                T
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-gray-900" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Tal</p>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.from === "tal" && (
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                    T
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-white text-black rounded-br-sm"
                      : "bg-gray-800 text-white rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                  <p className={`text-[10px] mt-1 ${msg.from === "user" ? "text-gray-400 text-right" : "text-gray-500"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {sending && (
              <div className="flex items-end gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                  T
                </div>
                <div className="bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-white/10 bg-gray-900 px-3 py-3 flex gap-2 items-end">
            {!done ? (
              <>
                {currentStep.field === "message" ? (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
                    }}
                    placeholder={currentStep.placeholder}
                    disabled={sending}
                    className="flex-1 resize-none rounded-xl bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-50"
                  />
                ) : (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={currentStep.type ?? "text"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                    placeholder={currentStep.placeholder}
                    disabled={sending}
                    className="flex-1 rounded-xl bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-50 h-10"
                  />
                )}
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || sending}
                  className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-white text-black hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </button>
              </>
            ) : (
              <p className="text-xs text-gray-500 text-center w-full py-1">
                Message sent ✓ — I'll be in touch soon!
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
