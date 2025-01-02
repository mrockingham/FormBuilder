import { create } from 'zustand';

interface FormData {
  id: string; // Unique identifier for each form
  name: string;

  event: string;
}

interface FormStore {
  forms: FormData[]; // List of all saved forms
  currentForm: FormData | null; // The form currently being worked on
  saveForm: (form: FormData) => void; // Save a form to the list
  setCurrentForm: (form: FormData) => void; // Set the current form
  resetCurrentForm: () => void; // Clear the current form
}

const useFormStore = create<FormStore>((set) => ({
  forms: [],
  currentForm: null,
  saveForm: (form) =>
    set((state) => ({
      forms: [...state.forms, form], // Add new form to the list
    })),
  setCurrentForm: (form) => set(() => ({ currentForm: form })),
  resetCurrentForm: () => set(() => ({ currentForm: null })),
}));

export default useFormStore;
