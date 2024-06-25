import { useEffect, useRef, useState } from "react";
import "./App.css";

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

function App() {
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [scale, setScale] = useState(1);

  const moveLeft = () => {
    setX((prevX) => prevX - 10);
  };

  const moveRight = () => {
    setX((prevX) => prevX + 10);
  };

  const moveUp = () => {
    setY((prevY) => prevY - 10);
  };

  const moveDown = () => {
    setY((prevY) => prevY + 10);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="main">
        <div className="header">Witam wszystkich bardzo serdecznie</div>
        <div className="content">
          <Canvas x={x} y={y} scale={scale} setScale={setScale} />
        </div>
        <div className="footer"></div>
      </div>
    </>
  );
}
export default App;
