import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //prostokont
    context.fillStyle = "white";
    context.fillRect(10, 10, 10, 10);
  }, []);

  return <canvas ref={canvasRef} className="canvas"></canvas>;
}
