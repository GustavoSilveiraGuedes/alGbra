import { createContext, useContext, useState, useRef } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (message, type = "sucesso", duration = 3000) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setToast({ message, type });

    timerRef.current = setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div id="toast-container">
          <div className={`toast-mensagem ${toast.type} mostrar`}>
            {toast.message}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);