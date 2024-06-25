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
    context.fillRect(props.x, 10, 10, 10);
  }, [props.x]); // Dependency array includes props.x

  return <canvas ref={canvasRef} className="canvas"></canvas>;
}

function App() {
  const [x, setX] = useState(10);

  const handleClickLeft = () => {
    setX((prevX) => prevX - 10);
  };

  const handleClickRight = () => {
    setX((prevX) => prevX + 10);
  };
  return (
    <>
      <div className="main">
        <div className="header">Witam wszystkich bardzo serdecznie</div>
        <div className="content">
          <Canvas x={x} />
        </div>
        <div className="footer">
          <button className="moveButton" onClick={handleClickLeft}>
            {"<"}
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
