import React from 'react';
import useBoardStore from '../store/UseBoardStore';
import { FaPaintBrush, FaMinus, FaSquare, FaCircle, FaArrowRight, FaFont, FaEraser, FaUndo, FaRedo, FaDownload } from 'react-icons/fa';
import classNames from 'classnames';

function ToolBar({ canvasRef }) {
  const { activeTool, setActiveTool, setToolAction, undo, redo, history, historyIndex } = useBoardStore();

  const handleToolClick = (type, action) => {
    setActiveTool(type);
    setToolAction(action);
  };

  const handleDownload = () => {
    if (canvasRef?.current) {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'whiteboard.png';
      link.click();
    }
  };

  return (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-md shadow-lg p-2 flex flex-col gap-y-2 z-10">
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'bg-blue-200 text-blue-800': activeTool === 'brush' }
        )}
        onClick={() => handleToolClick('brush', 'drawing')}
        title="Brush"
      >
        <FaPaintBrush />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'bg-blue-200 text-blue-800': activeTool === 'line' }
        )}
        onClick={() => handleToolClick('line', 'drawing')}
        title="Line"
      >
        <FaMinus />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'bg-blue-200 text-blue-800': activeTool === 'rectangle' }
        )}
        onClick={() => handleToolClick('rectangle', 'drawing')}
        title="Rectangle"
      >
        <FaSquare />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'bg-blue-200 text-blue-800': activeTool === 'circle' }
        )}
        onClick={() => handleToolClick('circle', 'drawing')}
        title="Circle"
      >
        <FaCircle />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'bg-blue-200 text-blue-800': activeTool === 'arrow' }
        )}
        onClick={() => handleToolClick('arrow', 'drawing')}
        title="Arrow"
      >
        <FaArrowRight />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'bg-blue-200 text-blue-800': activeTool === 'text' }
        )}
        onClick={() => handleToolClick('text', 'writing')}
        title="Text"
      >
        <FaFont />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'bg-blue-200 text-blue-800': activeTool === 'eraser' }
        )}
        onClick={() => handleToolClick('eraser', 'erasing')}
        title="Eraser"
      >
        <FaEraser />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'opacity-50 cursor-not-allowed': historyIndex <= 0 }
        )}
        onClick={undo}
        disabled={historyIndex <= 0}
        title="Undo"
      >
        <FaUndo />
      </button>
      <button
        className={classNames(
          'p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl',
          { 'opacity-50 cursor-not-allowed': historyIndex >= history.length - 1 }
        )}
        onClick={redo}
        disabled={historyIndex >= history.length - 1}
        title="Redo"
      >
        <FaRedo />
      </button>
      <button
        className="p-2 rounded text-gray-700 hover:bg-gray-200 transition-colors duration-200 text-xl"
        onClick={handleDownload}
        title="Download"
      >
        <FaDownload />
      </button>
    </div>
  );
}

export default ToolBar;