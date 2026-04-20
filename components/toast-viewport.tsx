"use client";

import { useEffect } from "react";
import { useToast } from "@/lib/toast-context";

export function ToastViewport() {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => {
      hideToast();
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [toast, hideToast]);

  if (!toast) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <div className="toast-card pointer-events-auto w-full max-w-md rounded-[24px] border border-[var(--line)] bg-white px-5 py-4 shadow-[var(--shadow)]">
        <p className="text-sm font-semibold text-[var(--primary)]">
          {toast.title}
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">{toast.description}</p>
      </div>
    </div>
  );
}
