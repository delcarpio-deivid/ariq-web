"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessageCircle, Minus, Send, X } from "lucide-react";
import {
  BOT_NODES,
  BOT_PREVIEW_TEXT,
  HANDOFF_CONFIRMATION,
  createMessage,
  getBotNode,
  getWhatsAppIntentForNode,
  isWhatsAppHandoff,
  typingDelayMs,
  WELCOME_NODE_ID,
  type ChatMessage,
  type QuickReply,
} from "@/lib/ariq-bot";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function TypingDots() {
  return (
    <p
      className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-3 shadow-sm"
      aria-live="polite"
      aria-label="ARIQ Bot está escribiendo"
    >
      <span className="size-1.5 rounded-full bg-brand-text/45 animate-bounce [animation-delay:0ms]" />
      <span className="size-1.5 rounded-full bg-brand-text/45 animate-bounce [animation-delay:150ms]" />
      <span className="size-1.5 rounded-full bg-brand-text/45 animate-bounce [animation-delay:300ms]" />
    </p>
  );
}

export function AriqChatWidget() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [previewDismissed, setPreviewDismissed] = useState(false);
  const [typing, setTyping] = useState(false);
  const [nodeId, setNodeId] = useState(WELCOME_NODE_ID);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage("bot", BOT_NODES[WELCOME_NODE_ID].text),
  ]);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const typingTimerRef = useRef<number | null>(null);

  const node = getBotNode(nodeId) ?? BOT_NODES[WELCOME_NODE_ID];
  const showPreview = !open && !previewDismissed;

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

  useEffect(() => {
    return () => {
      if (typingTimerRef.current !== null) {
        window.clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  function afterTyping(text: string, then: () => void) {
    if (typingTimerRef.current !== null) {
      window.clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    const delay = typingDelayMs(text, prefersReducedMotion());
    if (delay === 0) {
      then();
      return;
    }

    setTyping(true);
    typingTimerRef.current = window.setTimeout(() => {
      typingTimerRef.current = null;
      setTyping(false);
      then();
    }, delay);
  }

  function pushBotNode(nextId: string) {
    const next = getBotNode(nextId);
    if (!next) return;
    afterTyping(next.text, () => {
      setNodeId(nextId);
      setMessages((prev) => [...prev, createMessage("bot", next.text)]);
    });
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
      afterTyping(HANDOFF_CONFIRMATION, () => {
        setMessages((prev) => [
          ...prev,
          createMessage("bot", HANDOFF_CONFIRMATION),
        ]);
        if (intent) {
          window.open(buildWhatsAppUrl(intent), "_blank", "noopener,noreferrer");
        }
      });
      return;
    }

    pushBotNode(reply.next);
  }

  function openChat() {
    setPreviewDismissed(true);
    setOpen(true);
  }

  const handoffIntent = getWhatsAppIntentForNode(nodeId);
  const whatsappHref = buildWhatsAppUrl(handoffIntent ?? "generic");
  const replies = node.replies ?? [];

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
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent text-brand-primary">
              <MessageCircle className="size-5" strokeWidth={2} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-semibold text-brand-bg">
                ARIQ Bot
              </p>
              <p className="flex items-center gap-1.5 font-body text-xs text-brand-bg/80">
                <span
                  className="size-1.5 rounded-full bg-brand-accent"
                  aria-hidden
                />
                En línea · Arequipa
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
            {typing ? <TypingDots /> : null}
            {!typing && replies.length > 0 ? (
              <ul className="flex flex-wrap gap-2 self-stretch">
                {replies.map((reply) => (
                  <li key={reply.id} className="max-w-full">
                    <button
                      type="button"
                      onClick={() => onReply(reply)}
                      className="inline-flex min-h-11 max-w-full items-center rounded-xl border border-brand-secondary bg-white px-3 py-2 text-left font-body text-sm font-medium text-brand-secondary hover:bg-[#2563EB1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
                    >
                      {reply.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="border-t border-brand-primary/10 bg-white px-3 py-3">
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

      {showPreview ? (
        <div className="pointer-events-auto flex max-w-[min(100vw-5.5rem,260px)] items-start gap-1">
          <button
            type="button"
            onClick={openChat}
            className="rounded-2xl bg-white px-3 py-2 text-left shadow-md ring-1 ring-brand-primary/10 hover:bg-brand-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
            aria-label={`Abrir chat de ARIQ Bot: ${BOT_PREVIEW_TEXT}`}
          >
            <span className="block font-heading text-xs font-semibold text-brand-primary">
              ARIQ Bot
            </span>
            <span className="mt-0.5 block font-body text-sm leading-5 text-brand-text">
              {BOT_PREVIEW_TEXT}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewDismissed(true)}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-text shadow-sm ring-1 ring-brand-primary/10 hover:bg-brand-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
            aria-label="Cerrar mensaje de ARIQ Bot"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        className="pointer-events-auto relative inline-flex size-14 items-center justify-center rounded-2xl bg-brand-accent text-brand-primary shadow-md hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          open
            ? "Cerrar chat de ARIQ Bot"
            : showPreview
              ? "Abrir chat de ARIQ Bot, 1 mensaje nuevo"
              : "Abrir chat de ARIQ Bot"
        }
      >
        {showPreview ? (
          <span
            className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-brand-secondary font-body text-[11px] font-medium text-white"
            aria-hidden
          >
            1
          </span>
        ) : null}
        {open ? (
          <Minus className="size-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="size-6" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
