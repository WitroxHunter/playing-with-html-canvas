import { useEffect, useState, useRef } from "react";

function Canvas(props) {
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);
  const scaleRef = useRef(1);
  const draggingRef = useRef(false);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Apply scaling
      context.save();
      context.scale(scaleRef.current, scaleRef.current);

      // Draw the rectangle
      context.fillStyle = "white";
      context.fillRect(props.x, props.y, 10, 10);

      context.restore();
    };

    draw();
  }, [props.x, props.y, scale]);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (event.deltaY < 0) {
        // Zoom in
        scaleRef.current = Math.min(scaleRef.current * 1.1, 5);
      } else {
        // Zoom out
        scaleRef.current = Math.max(scaleRef.current / 1.1, 0.2);
      }
      setScale(scaleRef.current);
    };

    const handleMouseDown = (event) => {
      draggingRef.current = true;
      lastMousePositionRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event) => {
      if (draggingRef.current) {
        const dx = event.clientX - lastMousePositionRef.current.x;
        const dy = event.clientY - lastMousePositionRef.current.y;
        props.setX((prevX) => prevX + dx / scaleRef.current);
        props.setY((prevY) => prevY + dy / scaleRef.current);
        lastMousePositionRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handleMouseUp = () => {
      draggingRef.current = false;
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [props]);

  return <canvas ref={canvasRef} className="canvas"></canvas>;
}

export default Canvas;
