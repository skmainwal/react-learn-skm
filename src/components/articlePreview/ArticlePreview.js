import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./ArticlePreview.css";

const ArticlePreview = ({ article }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!article) return null;

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const renderContent = () => {
    if (!article.content) return null;

    return article.content.split("\n").map((line, index) => {
      if (line.startsWith("[video-")) {
        const videoIndex = parseInt(line.match(/\d+/)[0]);
        const videoUrls = article.videoUrls || [];
        if (videoIndex < videoUrls.length) {
          const videoId = getYouTubeVideoId(videoUrls[videoIndex]);
          if (videoId) {
            return (
              <div key={index} className="video-preview">
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>{" "}
              </div>
            );
          }
        }
        return null;
      }

      if (line.startsWith("[code-snippet-")) {
        const snippetIndex = parseInt(line.match(/\d+/)[0]);
        const codeSnippets = article.codeSnippets || [];
        if (snippetIndex < codeSnippets.length) {
          return (
            <div key={index} className="code-preview">
              <div className="code-header">
                <span> JavaScript </span>{" "}
                <button
                  className="copy-btn"
                  onClick={() =>
                    handleCopyCode(codeSnippets[snippetIndex], snippetIndex)
                  }
                >
                  {copiedIndex === snippetIndex ? "Copied!" : "Copy"}{" "}
                </button>{" "}
              </div>{" "}
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  backgroundColor: "#1E1E1E",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                {codeSnippets[snippetIndex]}{" "}
              </SyntaxHighlighter>{" "}
            </div>
          );
        }
        return null;
      }

      if (line.startsWith("# ")) {
        return <h1 key={index}> {line.substring(2)} </h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={index}> {line.substring(3)} </h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={index}> {line.substring(4)} </h3>;
      }
      if (line.startsWith("• ")) {
        return <li key={index}> {line.substring(2)} </li>;
      }

      // First process bold text
      const boldProcessed = line.split(/\*\*(.*?)\*\*/g).map((part, i) => {
        return i % 2 === 0 ? part : <strong key={i}> {part} </strong>;
      });

      // Then process highlights in the text parts
      const processHighlights = (content) => {
        if (typeof content === "string") {
          const parts = content.split(
            /\[highlight=(#[a-fA-F0-9]{6})\](.*?)\[\/highlight\]/g
          );
          return parts
            .map((part, i) => {
              if (i % 3 === 1) return null; // This is the color
              if (i % 3 === 2)
                return (
                  <span key={i} style={{ backgroundColor: parts[i - 1] }}>
                    {" "}
                    {part}{" "}
                  </span>
                );
              return part;
            })
            .filter(Boolean);
        }
        return content;
      };

      const finalContent = boldProcessed.map((part, index) =>
        typeof part === "string" ? processHighlights(part) : part
      );

      return <p key={index}> {finalContent} </p>;
    });
  };

  return (
    <div className="article-preview">
      <div className="preview-header">
        <h2> {article.title} </h2>{" "}
        <div className="article-meta">
          <span className="article-date">
            Created at: {new Date(article.createdAt).toLocaleDateString()}{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <div className="preview-content"> {renderContent()} </div>{" "}
    </div>
  );
};

export default ArticlePreview;
