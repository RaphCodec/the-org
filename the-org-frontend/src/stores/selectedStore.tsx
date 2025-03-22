import { create } from "zustand";

interface SelectedStore {
    items: string[];
    addItem: (item: string) => void;
    removeItem: (item: string) => void;
    clearItems: () => void;
}

const useSelectedStore = create<SelectedStore>((set) => ({
    items: [],
    addItem: (item) => {
      set((state) => {
        console.log('Adding item:', item);
        console.log('Current items:', [...state.items, item]);
        return { items: [...state.items, item] };
      });
    },
    removeItem: (item) => {
      set((state) => {
        console.log('Removing item:', item);
        const newItems = state.items.filter((i) => i !== item);
        console.log('Current items:', newItems);
        return { items: newItems };
      });
    },
    clearItems: () => {
      set({ items: [] });
    },
  }));

export default useSelectedStore;

