"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: string[];
  allowMultiple?: boolean;
}

export function Accordion({
  items,
  className,
  defaultOpen = [],
  allowMultiple = true,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);

  const toggle = (value: string) => {
    setOpen((current) => {
      if (current.includes(value)) return current.filter((item) => item !== value);
      return allowMultiple ? [...current, value] : [value];
    });
  };

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.value);
        return (
          <div key={item.value}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.value)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.value}`}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-sans text-sm font-medium text-ink transition-colors hover:text-brass"
              >
                <span>{item.title}</span>
                <span className="shrink-0 text-ink-soft" aria-hidden>
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
            </h3>
            <div
              id={`panel-${item.value}`}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-smooth",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 pr-8 text-sm leading-relaxed text-ink-soft">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
