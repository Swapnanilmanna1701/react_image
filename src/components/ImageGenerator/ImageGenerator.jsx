// src/components/ImageGenerator.js
import React, { useState } from 'react';
import axios from 'axios';
//import { getApiKey } from '../utils/getApiKey';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await axios.post(
        'https://api.generative-ai.googleapis.com/v1/projects/neon-net-408520/locations/global/images',
        {
          prompt: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setImageUrl(response.data.imageUri);
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.message);
    } finally {
      setPrompt(''); // Clear the prompt after submission
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Enter your image prompt:</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ImageGenerator;
