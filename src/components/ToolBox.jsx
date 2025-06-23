import React from 'react';
import useBoardStore from '../../stores/boardStore';
import useToolboxStore from '../../stores/toolboxStore';
import classNames from 'classnames';

function Toolbox() {
  const { activeTool } = useBoardStore();
  const { tools, setStroke, setFill, setSize } = useToolboxStore();
  const fillableTools = ['rectangle', 'circle'];

  return (
    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-md shadow-lg p-4 flex flex-col gap-y-4 z-10">
      <div className="flex flex-col gap-y-2">
        <label className="text-sm font-semibold">Stroke Color</label>
        <div className="flex gap-x-2">
          <input
            type="color"
            value={tools[activeTool].stroke || '#000000'}
            onChange={(e) => setStroke(activeTool, e.target.value)}
            className="w-8 h-8 rounded"
          />
          <button
            className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
            onClick={() => setStroke(activeTool, null)}
          >
            X
          </button>
        </div>
      </div>
      {fillableTools.includes(activeTool) && (
        <div className="flex flex-col gap-y-2">
          <label className="text-sm font-semibold">Fill Color</label>
          <div className="flex gap-x-2">
            <input
              type="color"
              value={tools[activeTool].fill || '#000000'}
              onChange={(e) => setFill(activeTool, e.target.value)}
              className="w-8 h-8 rounded"
            />
            <button
              className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center"
              onClick={() => setFill(activeTool, null)}
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-y-2">
        <label className="text-sm font-semibold">{activeTool === 'text' ? 'Font Size' : 'Stroke Width'}</label>
        <input
          type="range"
          min={activeTool === 'text' ? 10 : 1}
          max={activeTool === 'text' ? 50 : 10}
          value={tools[activeTool].size}
          onChange={(e) => setSize(activeTool, parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default Toolbox;