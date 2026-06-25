import { create } from "zustand";

const useUiStore = create((set) => ({
  globalLoading: false,
  setGlobalLoading: (val) => set({ globalLoading: val }),

  sidebarOpen: false,
  setSidebarOpen: (val) => set({ sidebarOpen: val }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  modal: { open: false, content: null, title: "" },
  openModal: (title, content) =>
    set({ modal: { open: true, title, content } }),
  closeModal: () =>
    set({ modal: { open: false, content: null, title: "" } }),

  confirmDialog: {
    open: false,
    title: "",
    message: "",
    confirmText: "Onayla",
    cancelText: "İptal",
    variant: "danger",
    loading: false,
    onConfirm: null,
  },
  openConfirmDialog: (config) =>
    set({
      confirmDialog: {
        open: true,
        title: config.title || "Emin misiniz?",
        message: config.message || "",
        confirmText: config.confirmText || "Onayla",
        cancelText: config.cancelText || "İptal",
        variant: config.variant || "danger",
        loading: false,
        onConfirm: config.onConfirm || null,
      },
    }),
  closeConfirmDialog: () =>
    set({
      confirmDialog: {
        open: false,
        title: "",
        message: "",
        confirmText: "Onayla",
        cancelText: "İptal",
        variant: "danger",
        loading: false,
        onConfirm: null,
      },
    }),
  setConfirmLoading: (loading) =>
    set((s) => ({
      confirmDialog: { ...s.confirmDialog, loading },
    })),
}));

export default useUiStore;
