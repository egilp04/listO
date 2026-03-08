import { createPortal } from "react-dom";
import Button from "./Button";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface DialogInterface {
  titulo: string;
  descripcion: string;
  show: boolean;
  onClose: (confirmar: boolean) => void;
  textoConfirmar?: string;
  textoCancelar?: string;
}

const Dialog = ({
  titulo,
  descripcion,
  show = false,
  onClose,
  textoConfirmar,
  textoCancelar,
}: DialogInterface) => {
  const { t } = useTranslation();
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
    <div
      className="dialog-overlay"
      onClick={() => onClose(false)}
      role="presentation"
    >
      <section
        className="dialog shadow-elevation-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-desc"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-end p-2">
          <button
            className="material-symbols-outlined cursor-pointer hover:text-danger-500 transition-colors bg-transparent border-none p-0"
            onClick={() => onClose(false)}
            aria-label={t('dialog.cerrar')}
          >
            close
          </button>
        </header>
        <article className="flex flex-col gap-4 px-6">
          <h2
            id="dialog-title"
            tabIndex={-1}
            className="text-xl font-bold focus:outline-none"
          >
            {titulo}
          </h2>
          <p
            id="dialog-desc"
            className="text-gray-600 dark:text-primary-100 text-pretty"
          >
            {descripcion}
          </p>
        </article>

        <footer className="flex flex-row gap-4 justify-end mt-8 p-6 bg-gray-50 dark:bg-primary-850/50 rounded-b-xl">
          <Button variant="fantasma" onClick={() => onClose(false)}>
            {textoCancelar || t('dialog.botonCancelar')}
          </Button>
          <Button
            className="bg-danger-500 text-white hover:bg-danger-600"
            onClick={() => onClose(true)}
          >
            {textoConfirmar || t('dialog.botonConfirmar')}
          </Button>
        </footer>
      </section>
    </div>,
    document.body,
  );
};

export default Dialog;
