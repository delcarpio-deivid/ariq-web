"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Minus, Send } from "lucide-react";
import {
  BOT_NODES,
  createMessage,
  getBotNode,
  getWhatsAppIntentForNode,
  isWhatsAppHandoff,
  WELCOME_NODE_ID,
  type ChatMessage,
  type QuickReply,
} from "@/lib/ariq-bot";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const TYPING_MS = 650;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AriqChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [nodeId, setNodeId] = useState(WELCOME_NODE_ID);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage("bot", BOT_NODES[WELCOME_NODE_ID].text),
  ]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const node = getBotNode(nodeId) ?? BOT_NODES[WELCOME_NODE_ID];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function pushBotNode(nextId: string) {
    const next = getBotNode(nextId);
    if (!next) return;
    const delay = prefersReducedMotion() ? 0 : TYPING_MS;
    if (delay === 0) {
      setNodeId(nextId);
      setMessages((prev) => [...prev, createMessage("bot", next.text)]);
      return;
    }
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setNodeId(nextId);
      setMessages((prev) => [...prev, createMessage("bot", next.text)]);
    }, delay);
  }

  function onReply(reply: QuickReply) {
    if (typing) return;
    setMessages((prev) => [...prev, createMessage("user", reply.label)]);

    if (reply.next === "price-scroll") {
      document.getElementById("precios")?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }

    if (isWhatsAppHandoff(reply.next)) {
      const intent = getWhatsAppIntentForNode(reply.next);
      if (intent) {
        window.open(buildWhatsAppUrl(intent), "_blank", "noopener,noreferrer");
      }
      setMessages((prev) => [
        ...prev,
        createMessage(
          "bot",
          "Te abrí WhatsApp con el mensaje listo. Si no se abrió, usa Continuar en WhatsApp.",
        ),
      ]);
      return;
    }

    pushBotNode(reply.next);
  }

  const handoffIntent = getWhatsAppIntentForNode(nodeId);
  const whatsappHref = buildWhatsAppUrl(handoffIntent ?? "generic");

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Chat de ARIQ Bot"
          className="pointer-events-auto flex h-[min(520px,calc(100dvh-7.5rem))] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-brand-primary/10"
        >
          <header className="flex items-center gap-3 bg-brand-primary px-4 py-3">
            <span
              className="flex size-10 items-center justify-center rounded-xl bg-brand-accent text-brand-primary"
              aria-hidden
            >
              <MessageCircle className="size-5" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-semibold text-brand-bg">
                ARIQ Bot
              </p>
              <p className="font-body text-xs text-brand-bg/80">
                Asistente comercial · Arequipa
              </p>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-11 items-center justify-center rounded-xl text-brand-bg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              aria-label="Minimizar chat de ARIQ Bot"
            >
              <Minus className="size-5" strokeWidth={2} />
            </button>
          </header>

          <div
            ref={scrollerRef}
            className="flex flex-1 flex-col gap-3 overflow-y-auto bg-brand-bg px-3 py-4"
          >
            {messages.map((msg) => (
              <p
                key={msg.id}
                className={
                  msg.role === "bot"
                    ? "max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3 py-2 font-body text-sm leading-5 text-brand-text shadow-sm"
                    : "max-w-[85%] self-end rounded-2xl rounded-br-md bg-brand-secondary px-3 py-2 font-body text-sm leading-5 text-white"
                }
              >
                {msg.text}
              </p>
            ))}
            {typing ? (
              <p
                className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3 py-2 font-body text-sm text-brand-text shadow-sm"
                aria-live="polite"
              >
                ARIQ Bot está escribiendo…
              </p>
            ) : null}
          </div>

          <div className="border-t border-brand-primary/10 bg-white px-3 py-3">
            {node.replies && node.replies.length > 0 ? (
              <ul className="mb-3 flex flex-col gap-2">
                {node.replies.map((reply) => (
                  <li key={reply.id}>
                    <button
                      type="button"
                      disabled={typing}
                      onClick={() => onReply(reply)}
                      className="inline-flex min-h-11 w-full items-center rounded-xl border border-brand-secondary bg-white px-3 py-2 text-left font-body text-sm font-medium text-brand-secondary hover:bg-[#2563EB1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary disabled:opacity-50"
                    >
                      {reply.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-accent px-3 font-body text-sm font-medium text-brand-primary hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
              aria-label="Continuar la conversación de ARIQ Bot en WhatsApp"
            >
              <Send className="size-4" strokeWidth={2} />
              Continuar en WhatsApp
            </a>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="pointer-events-auto inline-flex size-14 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary shadow-md hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar chat de ARIQ Bot" : "Abrir chat de ARIQ Bot"}
      >
        {open ? (
          <Minus className="size-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="size-6" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
