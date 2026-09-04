import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

export interface ToastData {
  key: number;
  message: string;
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

const AUTO_DISMISS_MS = 2200;

export default function Toast({ toast, onDismiss }: ToastProps): JSX.Element | null {
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timeout);
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <CheckCircle2 size={16} />
      <span>{toast.message}</span>
    </div>
  );
}
