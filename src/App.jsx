import React, { useRef } from 'react';
import ToolBar from './components/ToolBar';
import Board from './components/Board';

function App() {
  const canvasRef = useRef(null);
  return (
    <div>
      <ToolBar canvasRef={canvasRef} />
      <Board canvasRef={canvasRef} />
    </div>
  );
}
export default App;