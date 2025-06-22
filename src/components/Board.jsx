import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
function Board() {
  const screenRef = useRef(null);

  useEffect(() => {
    const canvas = screenRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw a red rectangle
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 300, 300);

let roughCanvas = rough.canvas(canvas);
let generator = roughCanvas.generator;
let rect1 = generator.rectangle(10, 10, 100, 100);
let rect2 = generator.rectangle(10, 120, 100, 100, {fill: 'red'});
let rect3 = generator.rectangle(0,0,300,300);
roughCanvas.draw(rect1);
roughCanvas.draw(rect2);
roughCanvas.draw(rect3);
  }, []);

  return (
    <div>
      <canvas ref={screenRef} />
    </div>
  );
}

export default Board;
