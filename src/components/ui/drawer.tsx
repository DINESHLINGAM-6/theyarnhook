"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useDialog } from "@/lib/hooks/use-dialog";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";

type Side = "right" | "left" | "bottom";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: Side;
  className?: string;
  footer?: React.ReactNode;
  hideHeader?: boolean;
}

const panelPosition: Record<Side, string> = {
  right: "right-0 top-0 h-full w-[min(94vw,460px)]",
  left: "left-0 top-0 h-full w-[min(94vw,420px)]",
  bottom: "bottom-0 left-0 right-0 max-h-[90svh] rounded-t-[28px]",
};

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "right",
  className,
  footer,
  hideHeader = false,
}: DrawerProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  useDialog(open, onClose, panelRef);

  if (!mounted) return null;

  const initial =
    side === "right" ? { x: "100%" } : side === "left" ? { x: "-100%" } : { y: "100%" };
  const animate = side === "bottom" ? { y: 0 } : { x: 0 };

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close overlay"
            className="absolute inset-0 cursor-default bg-ink/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            tabIndex={-1}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            className={cn(
              "absolute flex flex-col overflow-hidden bg-paper shadow-drawer focus:outline-none",
              panelPosition[side],
              className,
            )}
            initial={reduce ? false : initial}
            animate={animate}
            exit={reduce ? undefined : initial}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.42 }}
          >
            {!hideHeader ? (
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="font-display text-xl tracking-tight">{title}</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={`Close ${title}`}
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <X size={18} />
                </button>
              </div>
            ) : null}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
            {footer ? <div className="border-t border-line bg-paper">{footer}</div> : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
