import { create } from "zustand";

type ScanState = {
  clientId: number | null;

  formOneData: any;
  formTwoData: any;

  setClientId: (id: number) => void;
  setFormOneData: (data: any) => void;
  setFormTwoData: (data: any) => void;
  reset: () => void;
};

export const useScanStore = create<ScanState>((set) => ({
  clientId: null,
  formOneData: {},
  formTwoData: {},

  setClientId: (id) => set({ clientId: id }),
  setFormOneData: (data) => set({ formOneData: data }),
  setFormTwoData: (data) => set({ formTwoData: data }),

  reset: () =>
    set({
      clientId: null,
      formOneData: {},
      formTwoData: {},
    }),
}));
