import { create } from 'zustand';

const useBoardStore = create((set, get) => ({
  // State
  activeTool: 'line',
  toolAction: 'none',
  elements: [],
  history: [[]],
  historyIndex: 0,

  // Actions
  setActiveTool: (tool) => set({ 
    activeTool: tool, 
    toolAction: 'none' 
  }),

  setToolAction: (action) => set({ toolAction: action }),

  addElement: (element) => {
    set((state) => {
      const newElements = [...state.elements, element];
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newElements);
      return {
        elements: newElements,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
        toolAction: 'none',
      };
    });
  },

  updateLastElement: (element) => {
    set((state) => {
      const newElements = [...state.elements];
      newElements[newElements.length - 1] = element;
      return { elements: newElements };
    });
  },

  removeElements: (filterFn) => {
    set((state) => {
      const newElements = state.elements.filter((el) => !filterFn(el));
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(newElements);
      return {
        elements: newElements,
        history: newHistory,
        historyIndex: state.historyIndex + 1,
        toolAction: 'none',
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex <= 0) return state;
      const newIndex = state.historyIndex - 1;
      return {
        elements: [...state.history[newIndex]],
        historyIndex: newIndex,
        toolAction: 'none',
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;
      const newIndex = state.historyIndex + 1;
      return {
        elements: [...state.history[newIndex]],
        historyIndex: newIndex,
        toolAction: 'none',
      };
    });
  },

  saveHistory: () => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push([...state.elements]);
      return {
        history: newHistory,
        historyIndex: state.historyIndex + 1,
      };
    });
  },
}));

export default useBoardStore;