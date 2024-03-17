import React from 'react';

function MarkdownRenderer({ text }) {
  const renderMarkdown = (text) => {
    const regexHeading = /\*\*(.*?)\*\*/g;
    const regexItalic = /\*(.*?)\*/g;

    let result = text;

    // Replace bold text
    result = result.replace(regexHeading, (_, content) => {
      return <h2>{content}</h2>;
    });

    // Replace italic text
    result = result.replace(regexItalic, (_, content) => {
      return <i>{content}</i>;
    });

    return result;
  };

  return <div>{renderMarkdown(text)}</div>;
}

export default MarkdownRenderer;
