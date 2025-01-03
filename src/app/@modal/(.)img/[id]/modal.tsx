"use client";

import {
  type ElementRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onDismiss = useCallback(async () => {
    setIsOpen(false);
    await new Promise((resolve) => setTimeout(resolve, 200));
    router.back();
  }, [router]);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        void onDismiss();
      }
    };

    dialog.addEventListener("keydown", handleEsc);
    return () => dialog.removeEventListener("keydown", handleEsc);
  }, [onDismiss]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="w-screen bg-transparent text-black backdrop:bg-black/20 backdrop:backdrop-blur-sm dark:text-white dark:backdrop:bg-card/70 md:p-16"
      onClick={async (e) => {
        if (e.target === dialogRef.current) {
          await onDismiss();
        }
      }}
    >
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
