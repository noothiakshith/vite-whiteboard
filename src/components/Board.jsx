import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import useBoardStore from '../../stores/boardStore';
import useToolboxStore from '../../stores/toolboxStore';
import rough from 'roughjs/bundled/rough.esm.js';
import { getStroke } from 'perfect-freehand';
import { createElement, drawElement } from '../../utils/element';
import { isPointNearElement } from '../../utils/math';

function Board({ canvasRef }) {
  const { activeTool, toolAction, elements, addElement, updateLastElement, removeElements, setToolAction } = useBoardStore();
  const { tools } = useToolboxStore();
  const [text, setText] = useState('');
  const textAreaRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const roughCanvas = rough.canvas(canvas);

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const roughCanvas = rough.canvas(canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => drawElement(context, roughCanvas, element));
  }, [elements, canvasRef]);

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (activeTool === 'eraser' && toolAction === 'erasing') {
      const filterFn = (element) => isPointNearElement({ x, y }, element, canvas.getContext('2d'));
      removeElements(filterFn);
      return;
    }

    if (activeTool === 'text' && toolAction === 'writing') {
      setToolAction('writing');
      const element = createElement({
        id: elements.length,
        type: 'text',
        x1: x,
        y1: y,
        text: '',
        stroke: tools.text.stroke,
        size: tools.text.size,
      });
      addElement(element);
      setText('');
      return;
    }

    if (['brush', 'line', 'rectangle', 'circle', 'arrow'].includes(activeTool)) {
      setToolAction('drawing');
      const element = createElement({
        id: elements.length,
        type: activeTool,
        x1: x,
        y1: y,
        x2: x,
        y2: y,
        points: activeTool === 'brush' ? [{ x, y }] : [],
        stroke: tools[activeTool].stroke,
        fill: tools[activeTool].fill,
        size: tools[activeTool].size,
      });
      addElement(element);
    }
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (toolAction === 'drawing' && ['brush', 'line', 'rectangle', 'circle', 'arrow'].includes(activeTool)) {
      const lastElement = elements[elements.length - 1];
      const updatedElement = createElement({
        id: lastElement.id,
        type: lastElement.type,
        x1: lastElement.x1,
        y1: lastElement.y1,
        x2: x,
        y2: y,
        points: lastElement.type === 'brush' ? [...lastElement.points, { x, y }] : [],
        stroke: lastElement.stroke,
        fill: lastElement.fill,
        size: lastElement.size,
      });
      updateLastElement(updatedElement);
    }
  };

  const handleMouseUp = () => {
    if (toolAction === 'drawing') {
      setToolAction('none');
    }
  };

  useEffect(() => {
    if (toolAction === 'writing' && textAreaRef.current) {
      setTimeout(() => textAreaRef.current.focus(), 0);
    }
  }, [toolAction]);

  const handleTextChange = (e) => {
    setText(e.target.value);
    const lastElement = elements[elements.length - 1];
    if (lastElement.type === 'text') {
      const updatedElement = createElement({
        id: lastElement.id,
        type: 'text',
        x1: lastElement.x1,
        y1: lastElement.y1,
        text: e.target.value,
        stroke: lastElement.stroke,
        size: lastElement.size,
      });
      updateLastElement(updatedElement);
    }
  };

  const handleTextBlur = () => {
    setToolAction('none');
    setText('');
  };

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {toolAction === 'writing' && (
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          className="absolute p-1 bg-transparent border-none outline-none"
          style={{
            left: elements[elements.length - 1]?.x1 || 0,
            top: elements[elements.length - 1]?.y1 || 0,
            fontSize: `${tools.text.size}px`,
            color: tools.text.stroke || '#000000',
            fontFamily: 'Roboto, sans-serif',
          }}
        />
      )}
    </div>
  );
}

export default Board;