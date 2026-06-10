import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

let addToastFn: (toast: Omit<ToastMessage, 'id'>) => void = () => {};

export const toast = {
  success: (message: string) => addToastFn({ type: 'success', message }),
  error: (message: string) => addToastFn({ type: 'error', message }),
  info: (message: string) => addToastFn({ type: 'info', message }),
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    addToastFn = (toast) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { ...toast, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    };
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {t.type === 'success' && <CheckCircle size={20} className="text-success" />}
          {t.type === 'error' && <AlertCircle size={20} className="text-danger" />}
          {t.type === 'info' && <Info size={20} className="text-accent" />}
          <span style={{ flex: 1 }}>{t.message}</span>
          <button onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))} style={{ color: 'var(--text-secondary)' }}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};