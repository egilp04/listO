import { create } from "zustand";

interface NotificationState {
  mensaje: string | null;
  tipo: "exito" | "error" | null;
  mostrar: boolean;
  setNotificacion: (mensaje: string, tipo: "exito" | "error") => void;
  limpiarNotificacion: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  mensaje: null,
  tipo: null,
  mostrar: false,
  setNotificacion: (mensaje, tipo) => {
    set({ mensaje, tipo, mostrar: true });
    setTimeout(() => {
      get().limpiarNotificacion();
    }, 2000);
  },
  limpiarNotificacion: () =>
    set({
      mostrar: false,
      mensaje: null,
      tipo: null,
    }),
}));
