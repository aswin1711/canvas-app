import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [canvas, setCanvas] = useState(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 600,
    height: 400,
  });
  const [color, setColor] = useState("#000000");
  const [digit, setDigit] = useState("00");
  const [dropdownColor, setDropdownColor] = useState("#ffffff");
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawDigit();
    }
  }, [canvas, canvasSize, color]);

  function drawDigit() {
    const ctx = canvas.getContext("2d");
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    ctx.font = "bold 120px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(digit, x, y);
  }

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleDigitChange(e) {
    const newDigit = e.target.value;
    if (/^\d{0,2}$/.test(newDigit)) {
      setDigit(newDigit.padStart(2, "0"));
    }
  }

  function handleDropdownChange(e) {
    setDropdownColor(e.target.value);
  }

  function handleCanvasSizeChange(e) {
    const { name, value } = e.target;
    setCanvasSize((prevSize) => ({
      ...prevSize,
      [name]: parseInt(value),
    }));
  }

  function handleCanvasHover(e) {
    const { x, y } = e.nativeEvent;
    const zoomCanvas = document.getElementById("zoom-canvas");
    const zoomCtx = zoomCanvas.getContext("2d");
    const zoomSize = 100;
    zoomCtx.drawImage(
      canvas,
      x - zoomSize / 2,
      y - zoomSize / 2,
      zoomSize,
      zoomSize,
      0,
      0,
      zoomSize * 2,
      zoomSize * 2
    );
    zoomCanvas.style.left = x + "px";
    zoomCanvas.style.top = y + "px";
    setIsZoomedIn(true);
  }

  function handleCanvasMouseLeave() {
    const zoomCanvas = document.getElementById("zoom-canvas");
    const zoomCtx = zoomCanvas.getContext("2d");
    zoomCtx.clearRect(0, 0, zoomCanvas.width, zoomCanvas.height);
    setIsZoomedIn(false);
  }

  return (
    <div className="App">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          onMouseMove={handleCanvasHover}
          onMouseLeave={handleCanvasMouseLeave}
        />
        {isZoomedIn && (
          <canvas id="zoom-canvas" width="200" height="200"></canvas>
        )}
        <div className="controls">
          <div className="color-picker">
            <label htmlFor="color">Canvas Color:</label>
            <input
              type="color"
              id="color"
              name="color"
              value={color}
              onChange={handleColorChange}
              />
              </div>
              <div className="digit-input">
              <label htmlFor="digit">2D Digit:</label>
              <input
                         type="text"
                         id="digit"
                         name="digit"
                         value={digit}
                         onChange={handleDigitChange}
                       />
              </div>
              <div className="dropdown">
              <label htmlFor="dropdown">Background Color:</label>
              <select id="dropdown" value={dropdownColor} onChange={handleDropdownChange}>
              <option value="#ffffff">White</option>
              <option value="#e6e6e6">Light Grey</option>
              <option value="#cccccc">Grey</option>
              <option value="#333333">Dark Grey</option>
              <option value="#000000">Black</option>
              </select>
              </div>
              <div className="canvas-size">
              <label htmlFor="width">Width:</label>
              <input
                         type="number"
                         id="width"
                         name="width"
                         value={canvasSize.width}
                         onChange={handleCanvasSizeChange}
                       />
              <label htmlFor="height">Height:</label>
              <input
                         type="number"
                         id="height"
                         name="height"
                         value={canvasSize.height}
                         onChange={handleCanvasSizeChange}
                       />
              </div>
              </div>
              </div>
              </div>
              );
              }
              
              export default App;
              
              
              
              
