import { useState, useEffect } from "react";
import Canvas from "./components/canvas";
import "./App.css";

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
