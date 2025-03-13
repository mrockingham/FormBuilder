import { create } from "zustand";
import { FormElementInstance } from "../components/FormElements";

interface DesignerContext {
  elements: FormElementInstance[];
  setElements: (elements: FormElementInstance[]) => void;
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: (element: FormElementInstance | null) => void;
  updateElement: (id: string, element: FormElementInstance) => void;
  clear: () => void;
}

const useBuilderStore = create<DesignerContext>((set) => ({
  elements: [],
  addElement: (index, element) => {
    set((state) => {
      const newElements = [...state.elements];
      newElements.splice(index, 0, element);
      return { elements: newElements };
    });
  },
  removeElement: (id) => {
    set((state) => {
      const newElements = state.elements.filter((element) => element.id !== id);
      return { elements: newElements };
    });
  },
  selectedElement: null,
  setSelectedElement: (element) => {
    set({ selectedElement: element });
  },
  updateElement: (id, element) => {
    set((state) => {
      const newElements = state.elements.map((e) =>
        e.id === id ? element : e
      );
      return { elements: newElements };
    });
  },
  setElements: (elements) => {
    set({ elements });
  },
  clear: () => set({ elements: [] }),
}));

export default useBuilderStore;
