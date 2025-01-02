"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="w-screen bg-transparent text-black backdrop:bg-black/20 backdrop:backdrop-blur-sm dark:text-white dark:backdrop:bg-card/70 md:p-16"
      onClose={onDismiss}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onDismiss();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
