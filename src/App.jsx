import "./style.css";
import { useState, useEffect, Suspense } from "react";

import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Flat from "./Flat.jsx";
import Fallback from "./Fallback";

const App = () => {
  const [isMobile, setIsMobile] = useState(null);
  const [isFlat, setIsFlat] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return !isFlat && !isMobile ? (
    <Suspense fallback={<Fallback />}>
      <Canvas
        className="canvas"
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
      >
        <Experience isFlat={isFlat} setIsFlat={setIsFlat} />
      </Canvas>
    </Suspense>
  ) : (
    <>
      <Flat />
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);
