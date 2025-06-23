import { create } from 'zustand';

const useToolboxStore = create((set) => ({
  tools: {
    brush: { stroke: '#000000', fill: null, size: 5 },
    line: { stroke: '#000000', fill: null, size: 2 },
    rectangle: { stroke: '#000000', fill: null, size: 2 },
    circle: { stroke: '#000000', fill: null, size: 2 },
    arrow: { stroke: '#000000', fill: null, size: 2 },
    text: { stroke: '#000000', fill: null, size: 20 },
    eraser: { stroke: null, fill: null, size: 10 },
  },

  setStroke: (tool, stroke) => set((state) => ({
    tools: { ...state.tools, [tool]: { ...state.tools[tool], stroke } },
  })),

  setFill: (tool, fill) => set((state) => ({
    tools: { ...state.tools, [tool]: { ...state.tools[tool], fill } },
  })),

  setSize: (tool, size) => set((state) => ({
    tools: { ...state.tools, [tool]: { ...state.tools[tool], size } },
  })),
}));

export default useToolboxStore;