import { useState } from "react";
import "./App.css";
import Canvas from "./components/canvas";

function App() {
  return (
    <>
      <div className="main">
        <div className="header">Witam wszystkich bardzo serdecznie</div>
        <div className="content">
          <Canvas />
        </div>
        <div className="footer">Aplikacja do testuw</div>
      </div>
    </>
  );
}

export default App;
