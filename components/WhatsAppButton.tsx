"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";

/** Floating "Chat on WhatsApp" button that appears once you scroll past the hero. */
export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!site.contact.whatsapp) return null;
  const href = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
    `Assalam o Alaikum ${site.name}, I'd like to discuss a design project.`,
  )}`;
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          className="wa-fab"
          href={href}
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path
              d="M9 8.5c.3-.6.6-.6.9-.6h.6c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c.4.9 1.3 1.8 2.3 2.3l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.6c0 .3 0 .6-.6.9-.6.3-1.6.4-3-.3a8.6 8.6 0 0 1-3.6-3.6c-.7-1.4-.6-2.4-.3-3Z"
              fill="currentColor"
            />
          </svg>
          <span>Chat on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
