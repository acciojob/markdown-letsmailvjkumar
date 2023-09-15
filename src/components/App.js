import React, { useState, useEffect } from 'react';
import '../styles/App.css';

const App = () => {
  const [markdown, setMarkdown] = useState('# Hello world');

  // Create a state to track loading
  const [isLoading, setIsLoading] = useState(false);

  // Use useEffect to simulate loading after a delay
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading for 1 second
  }, [markdown]);

  // Function to convert Markdown to React components
  const convertToReact = (markdownText) => {
    return markdownText
      .split('\n')
      .map((line, index) => {
        // Check if the line starts with '#' and remove it
        if (line.startsWith('# ')) {
          return <h1 key={index}>{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={index}>{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index}>{line.substring(4)}</h3>;
        } else {
          return <p key={index}>{line}</p>;
        }
      });
  };

  // Parse Markdown to React components using the custom function
  const parsedMarkdown = convertToReact(markdown);

  return (
    <div className='app'>
      <div className='textarea'>
        <textarea
          className='textarea'
          onChange={(e) => setMarkdown(e.target.value)}
          value={markdown}
        ></textarea>
      </div>
      <div className='preview'>
        {isLoading ? (
          <div className='loading'>Loading...</div>
        ) : (
          <div>{parsedMarkdown}</div>
        )}
      </div>
    </div>
  );
};

export default App;
