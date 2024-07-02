// src/components/ImageGenerator.js
import React, { useState, useRef } from "react";
import axios from "axios";
import "./ImageGenerator.css";
import default_image from "../Assets/aig.gif";


const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("/");
  const [error, setError] = useState(null);
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await axios.post(
        "https://api.generative-ai.googleapis.com/v1/projects/neon-net-408520/locations/global/images",
        {
          prompt: `${inputRef.current.value}`,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      let data = await response.json();
      console.log(data);
      let data_array = data.data;

      setImageUrl(data_array[0].url);
    } catch (err) {
      console.error("Error generating image:", err);
      setError(err.message);
    } finally {
      setPrompt(""); // Clear the prompt after submission
    }
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        Imagica<span>-Get Your Image Here</span>
      </div>
      <div className="img-loading">
        <div className="image">
          <img src={imageUrl === "/" ? default_image : imageUrl} alt="" />
        </div>
      </div>
      <div className="search-box">
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder="Enter Your Promt Here..."
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
