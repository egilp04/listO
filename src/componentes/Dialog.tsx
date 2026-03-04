import { createPortal } from "react-dom";
import Button from "./Button";
import { useEffect, useRef } from "react";

interface DialogInterface {
  titulo: string;
  descripcion: string;
  show: boolean;
  onClose: (confirmar: boolean) => void;
}

const Dialog = ({
  titulo,
  descripcion,
  show = false,
  onClose,
}: DialogInterface) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (show) {
      previouslyFocused.current = document.activeElement as HTMLElement;

      if (modalRef.current) {
        const titleElement = modalRef.current.querySelector(
          "#dialog-title",
        ) as HTMLElement;
        if (titleElement) {
          titleElement.focus();
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose(false);
          return;
        }

        if (e.key === "Tab" && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          if (e.shiftKey) {
            if (
              document.activeElement === firstElement ||
              document.activeElement ===
              modalRef.current.querySelector("#dialog-title")
            ) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        if (previouslyFocused.current) {
          previouslyFocused.current.focus();
        }
      };
    }
  }, [show, onClose]);

  if (!show) return null;
  return createPortal(
    <>
      <div className="dialog-overlay" onClick={() => onClose(false)}></div>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        ref={modalRef}
      >
        <div className="flex justify-end">
          <button
            className="material-symbols-outlined cursor-pointer hover:text-gray-500 bg-transparent border-none p-0"
            onClick={() => onClose(false)}
            aria-label="Cerrar modal"
          >
            close
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <h2 id="dialog-title" tabIndex={-1} className="text-xl font-bold focus:outline-none">{titulo}</h2>
          <p id="dialog-desc" className="text-gray-600">{descripcion}</p>
        </div>

        <div className="flex flex-row gap-2 justify-end mt-6">
          <Button
            variant="fantasma"
            onClick={() => {
              onClose(false);
            }}
          >
            <span>No, cancelar</span>
          </Button>
          <Button
            className="bg-danger-500 text-white"
            onClick={() => {
              onClose(true);
            }}
          >
            <span>Sí, confirmar</span>
          </Button>
        </div>
      </div>
    </>,
    document.body
  );
};

export default Dialog;
