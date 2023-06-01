import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [img, SetImg] = useState();
  const [images, setImages] = useState([]);
  function handleNewWindows() {
    window.open(
      "http://localhost:5173",
      "Scanner",
      "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=900,height=900,left = 390,top = 50"
    );
  }

  window.addEventListener("message", (event) => {
    SetImg(event.data.file || img);
    setImages(event.data.images || []);
  });

  return (
    <>
      <button onClick={handleNewWindows}>scanner</button>
      <div>
        {img && <img src={URL.createObjectURL(img)} height={150} />}
        <div>
          {images.map((item) => {
            <img src={URL.createObjectURL(item)} height={150} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
