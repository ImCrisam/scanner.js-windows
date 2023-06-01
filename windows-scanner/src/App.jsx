import { useState } from "react";

function App() {
  const [file, SetFile] = useState(null);
  const [images, setImages] = useState([]);

  const [parentWindow, setParentWindow] = useState(null);
  window.addEventListener("load", () => {
    setParentWindow(window.opener);
  });

  function handleSend() {
    if (window.opener) parentWindow.postMessage({ file, images }, "*");
    window.close();
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    SetFile(file);
  }

  function handleScanner(params) {
    scanner.scan(displayImagesOnPage, {
      output_settings: [
        {
          type: "return-base64",
          format: "jpg",
        },
      ],
    });
  }

  function displayImagesOnPage(successful, mesg, response) {
    if (!successful) {
      // On error
      console.error("Failed: " + mesg);
      return;
    }

    if (
      successful &&
      mesg != null &&
      mesg.toLowerCase().indexOf("user cancel") >= 0
    ) {
      // User cancelled.
      console.info("User cancelled");
      return;
    }

    const scannedImages = scanner.getScannedImages(response, true, false); // returns an array of ScannedImage
    for (
      let i = 0;
      scannedImages instanceof Array && i < scannedImages.length;
      i++
    ) {
      const scannedImage = scannedImages[i];
      setImages([...images, scannedImage]);
    }
  }

  return (
    <>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={handleScanner}>Scanner</button>
      <div>
        <button onClick={handleSend}>Enviar </button>
      </div>
      <div>{file && <img src={URL.createObjectURL(file)} height={50} />}</div>
      <div>
        {images.map((item) => {
          <img src={URL.createObjectURL(item)} height={50} />;
        })}
      </div>
    </>
  );
}

export default App;
