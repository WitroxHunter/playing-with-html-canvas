import { useState, useEffect } from "react";
import Canvas from "./components/canvas";
import "./App.css";

function App() {
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        setX((prevX) => prevX - 10);
        break;
      case "ArrowRight":
        setX((prevX) => prevX + 10);
        break;
      case "ArrowUp":
        setY((prevY) => prevY - 10);
        break;
      case "ArrowDown":
        setY((prevY) => prevY + 10);
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
          <Canvas x={x} y={y} setX={setX} setY={setY} />
        </div>
        <div className="footer">Controls - Move: arrow keys</div>
      </div>
    </>
  );
}

export default App;
