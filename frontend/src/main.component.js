import React, { useState } from "react";
import axios from "axios";
import './main.component.css'

export default function MainComponent() {
  const [image, setImage] = useState({ preview: "" });
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [result, setResult] = React.useState(false);
  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
    });
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("image", selectedFile);
    const url = "http://127.0.0.1:8000/api/image/";
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post(url, formData, config)
      .then(() => {
        setResult(true);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  const newPhoto = () => {
    setResult(false);
    setImage({
      preview: "",
    });
  };
  return (
    <div style={{ position: 'absolute',
    top: "30%",
    left: "50%",
    marginTop: '-100px',
    marginLeft: "-150px",
    padding: "10px",
    border: "4px dashed rgb(124, 123, 123)"}}>
      <label htmlFor="upload-button">
        {image.preview ? (
          <>
            <img
              src={image.preview}
              alt="dummy"
              width="300"
              height="300"
              className="image"
            />
            {result ? (
              ""
            ) : (
              <p className="text-center">Click Here To Upload Again</p>
            )}
          </>
        ) : (
          <>
            <h5
              className="text-center"
              style={{
                lineHeight: "170px",
                color: "black",
                fontFamily: "Arial",
                fontSize: "20px",
              }}
            >
              Drag your X-Ray here or Click in this area.
            </h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {result ? (
        ""
      ) : image.preview ? (
        <button onClick={handleUpload}>Upload</button>
      ) : (
        ""
      )}
      {result ? <h1>You have COVID</h1> : ""}
      {result ? (
        <button
          style={{ marginTop: "50px", width: "250px" }}
          onClick={newPhoto}
        >
          Click Here To Upload New X-Ray
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
