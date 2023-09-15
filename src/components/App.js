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

  // Function to convert Markdown to HTML
  const convertToHTML = (markdownText) => {
    return markdownText
      .split('\n')
      .map((line, index) => {
        // Check if the line starts with '#' and remove it
        if (line.startsWith('#')) {
          return `<h3 key=${index}>${line.substring(1)}</h3>`;
        } else if (line.startsWith('# ')) {
          return `<h3 key=${index}>${line.substring(2)}</h3>`;
        } else if (line.startsWith('## ')) {
          return `<h3 key=${index}>${line.substring(3)}</h3>`;
        } else {
          return `<h3 key=${index}>${line}</h3>`;
        }
      })
      .join('');
  };

  // Parse Markdown to HTML using the custom function
  const parsedMarkdown = convertToHTML(markdown);

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
          <div dangerouslySetInnerHTML={{ __html: parsedMarkdown }}></div>
        )}
      </div>
    </div>
  );
};

export default App;
