import { useEffect, useRef, useState } from "react";
import "./App.css";

function Canvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the rectangle
    context.fillStyle = "white";
    context.fillRect(props.x, props.y, 10, 10);
  }, [props.x, props.y]); // Dependency array includes props.x and props.y

  return <canvas ref={canvasRef} className="canvas"></canvas>;
}

function App() {
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);

  const handleClickLeft = () => {
    setX((prevX) => prevX - 10);
  };

  const handleClickRight = () => {
    setX((prevX) => prevX + 10);
  };

  const handleClickUp = () => {
    setY((prevY) => prevY - 10);
  };

  const handleClickDown = () => {
    setY((prevY) => prevY + 10);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        handleClickLeft();
        break;
      case "ArrowRight":
        handleClickRight();
        break;
      case "ArrowUp":
        handleClickUp();
        break;
      case "ArrowDown":
        handleClickDown();
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
          <Canvas x={x} y={y} />
        </div>
        <div className="footer">
          <button className="moveButton" onClick={handleClickLeft}>
            {"<"}
          </button>
          <button className="moveButton" onClick={handleClickUp}>
            {"^"}
          </button>
          <button className="moveButton" onClick={handleClickDown}>
            {"v"}
          </button>
          <button className="moveButton" onClick={handleClickRight}>
            {">"}
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
