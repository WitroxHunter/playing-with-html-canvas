import { useEffect, useState, useRef } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);
  const scaleRef = useRef(1);

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
  }, [props.x, props.y, props.scale]);

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
      props.setScale(scaleRef.current);
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [props]);

  return <canvas ref={canvasRef} className="canvas"></canvas>;
}

export default Canvas;
