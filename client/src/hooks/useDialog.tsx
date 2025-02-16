import { create } from "zustand";

export enum ModalTypeEnum {
  COMMENT = "comment",
}

interface DialogState {
  type: ModalTypeEnum | null;
  isOpen: boolean;
  openDialog: (type: ModalTypeEnum) => void;
  closeDialog: () => void;
}

export const useDialog = create<DialogState>((set) => ({
  type: null,
  isOpen: false,
  openDialog: (type: ModalTypeEnum) => set({ type, isOpen: true }),
  closeDialog: () => set({ isOpen: false, type: null }),
}));
