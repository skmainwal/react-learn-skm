import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { articleService } from "../services/articleService";
import "./ArticleEditor.css";

const CATEGORIES = ["JavaScript", "React", "Python", "SQL", "Cookie", "Docker"];
const TOPICS = [
  "Variables",
  "Functions",
  "Scope",
  "CSS",
  "HTML",
  "Promise",
  "Hoisting",
  "Array",
  "String",
  "Object",
  "DOM",
  "Event",
  "Async",
  "Fetch",
  "Cookie",
  "Session",
  "LocalStorage",
  "SessionStorage",
  "let, const, var",
  "Arrow Function",
  "Template Literal",
  "Spread Operator",
  "Rest Operator",
  "Destructuring",
  "TDZ (Temporal Dead Zone)",
].map((topic) => ({ value: topic, label: topic }));

const ArticleEditor = ({
  editMode = false,
  article = null,
  onComplete = null,
  onClose = null,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [currentSnippet, setCurrentSnippet] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopicError, setShowTopicError] = useState(false);

  useEffect(() => {
    if (editMode && article) {
      setTitle(article.title);
      setContent(article.content);
      setCodeSnippets([...article.codeSnippets]);
      setCategory(article.category || CATEGORIES[0]);
      setSelectedTopic(
        article.topic ? { value: article.topic, label: article.topic } : null
      );
    }
  }, [editMode, article]);

  const colors = [
    { name: "Yellow", value: "#fff3cd" },
    { name: "Green", value: "#d4edda" },
    { name: "Blue", value: "#cce5ff" },
    { name: "Red", value: "#f8d7da" },
    { name: "Gray", value: "#e2e3e5" },
  ];

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSaveArticle = async () => {
    if (!title.trim()) {
      alert("Please enter a title for your article");
      return;
    }

    if (!content.trim()) {
      alert("Please enter some content for your article");
      return;
    }

    if (!selectedTopic) {
      setShowTopicError(true);
      alert("Please select a topic for your article");
      return;
    }

    const articleData = {
      title,
      content,
      codeSnippets,
      category,
      topic: selectedTopic.value,
      createdAt: new Date().toISOString(),
    };

    try {
      if (editMode && article) {
        // Update existing article
        await articleService.updateArticle(article.id, {
          ...articleData,
          lastEdited: new Date().toISOString(),
        });
      } else {
        // Create new article
        await articleService.createArticle(articleData);
      }

      // Reset form
      setTitle("");
      setContent("");
      setCodeSnippets([]);
      setCategory(CATEGORIES[0]);
      setSelectedTopic(null);
      setShowTopicError(false);
      alert(
        editMode
          ? "Article updated successfully!"
          : "Article saved successfully!"
      );

      if (onComplete) {
        onComplete();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    if (onComplete) {
      onComplete();
    }
    if (onClose) {
      onClose();
    }
  };

  const addCodeSnippet = () => {
    if (currentSnippet.trim()) {
      setCodeSnippets([...codeSnippets, currentSnippet]);
      setCurrentSnippet("");
      setContent(content + "\n[code-snippet-" + codeSnippets.length + "]\n");
    }
  };

  const handleFormat = (format, color = "") => {
    const textarea = document.querySelector(".content-input");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let formattedText = "";

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "h1":
        formattedText = `# ${selectedText}`;
        break;
      case "h2":
        formattedText = `## ${selectedText}`;
        break;
      case "h3":
        formattedText = `### ${selectedText}`;
        break;
      case "bullet":
        formattedText = selectedText
          .split("\n")
          .map((line) => `• ${line}`)
          .join("\n");
        break;
      case "highlight":
        formattedText = `[highlight=${color}]${selectedText}[/highlight]`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent =
      content.substring(0, start) + formattedText + content.substring(end);

    setContent(newContent);
    setShowColorPicker(false);
  };

  const handleDeleteSnippet = (snippetIndex) => {
    const newCodeSnippets = codeSnippets.filter(
      (_, index) => index !== snippetIndex
    );
    setCodeSnippets(newCodeSnippets);

    // Update content to remove the code snippet reference
    const newContent = content
      .split("\n")
      .filter((line) => !line.includes(`[code-snippet-${snippetIndex}]`))
      .join("\n");
    setContent(newContent);
  };

  const renderFormattedContent = (text) => {
    return text.split("\n").map((line, index) => {
      // Handle code snippets
      if (line.startsWith("[code-snippet-")) {
        const snippetIndex = parseInt(line.match(/\d+/)[0]);
        if (snippetIndex < codeSnippets.length) {
          return (
            <div key={index} className="code-preview">
              <div className="code-header">
                <span> JavaScript </span>{" "}
                <div className="code-header-actions">
                  <button
                    className="copy-btn"
                    onClick={() =>
                      handleCopyCode(codeSnippets[snippetIndex], snippetIndex)
                    }
                  >
                    {" "}
                    {copiedIndex === snippetIndex ? "Copied!" : "Copy"}{" "}
                  </button>{" "}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteSnippet(snippetIndex)}
                    title="Delete snippet"
                  >
                    <FontAwesomeIcon icon={faTrash} />{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                  backgroundColor: "#1E1E1E",
                  color: "#D4D4D4",
                  margin: "0",
                  borderRadius: "0 0 4px 4px",
                }}
              >
                {" "}
                {codeSnippets[snippetIndex]}{" "}
              </SyntaxHighlighter>{" "}
            </div>
          );
        }
        return null;
      }

      // Handle headings
      if (line.startsWith("# ")) {
        return <h1 key={index}> {line.substring(2)} </h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={index}> {line.substring(3)} </h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={index}> {line.substring(4)} </h3>;
      }

      // Handle bullet points
      if (line.startsWith("• ")) {
        return <li key={index}> {line.substring(2)} </li>;
      }

      // Handle highlights and bold text
      const highlightRegex =
        /\[highlight=(#[a-fA-F0-9]{6})\](.*?)\[\/highlight\]/g;
      let parts = [];
      let lastIndex = 0;
      let match;

      while ((match = highlightRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <span key={match.index} style={{ backgroundColor: match[1] }}>
            {" "}
            {match[2]}{" "}
          </span>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const boldRegex = /\*\*(.*?)\*\*/g;
      parts = parts.map((part, i) =>
        typeof part === "string"
          ? part
              .split(boldRegex)
              .map((boldPart, j) =>
                j % 2 === 0 ? boldPart : <strong key={j}> {boldPart} </strong>
              )
          : part
      );

      return <p key={index}> {parts} </p>;
    });
  };

  return (
    <div className="article-editor-overlay" onClick={handleCancel}>
      <div className="article-editor" onClick={(e) => e.stopPropagation()}>
        <button className="editor-close-btn" onClick={handleCancel}>
          <FontAwesomeIcon icon={faTimes} />{" "}
        </button>{" "}
        <div className="editor-header-container">
          <div className="editor-header-top">
            <h2> {editMode ? "Edit Article" : "Write New Article"} </h2>{" "}
            <div className="editor-header-actions">
              <button
                onClick={handleSaveArticle}
                className="header-btn header-save-btn"
              >
                {" "}
                {editMode ? "Save Changes" : "Save Article"}{" "}
              </button>{" "}
              <button
                onClick={handleCancel}
                className="header-btn header-cancel-btn"
              >
                Cancel{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="editor-header">
            <input
              type="text"
              placeholder="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              {" "}
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {" "}
                  {cat}{" "}
                </option>
              ))}{" "}
            </select>{" "}
            <Select
              value={selectedTopic}
              onChange={(option) => {
                setSelectedTopic(option);
                setShowTopicError(false);
              }}
              options={TOPICS}
              className={`topic-select-container ${
                showTopicError ? "error" : ""
              }`}
              classNamePrefix="topic-select"
              placeholder="Select Topic *"
              isClearable
              isSearchable
            />
          </div>{" "}
          <div className="formatting-toolbar">
            <button onClick={() => handleFormat("bold")} className="format-btn">
              Bold{" "}
            </button>{" "}
            <button onClick={() => handleFormat("h1")} className="format-btn">
              H1{" "}
            </button>{" "}
            <button onClick={() => handleFormat("h2")} className="format-btn">
              H2{" "}
            </button>{" "}
            <button onClick={() => handleFormat("h3")} className="format-btn">
              H3{" "}
            </button>{" "}
            <button
              onClick={() => handleFormat("bullet")}
              className="format-btn"
            >
              Bullet{" "}
            </button>{" "}
            <div className="color-picker-container">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="format-btn"
              >
                Highlight{" "}
              </button>{" "}
              {showColorPicker && (
                <div className="color-picker">
                  {" "}
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      className="color-btn"
                      style={{ backgroundColor: color.value }}
                      onClick={() => handleFormat("highlight", color.value)}
                      title={color.name}
                    />
                  ))}{" "}
                </div>
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="editor-content">
          <div className="content-container">
            <textarea
              placeholder="Write your article content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="content-input"
            />
            <div className="content-preview">
              <h3> Preview </h3> {renderFormattedContent(content)}{" "}
            </div>{" "}
          </div>{" "}
          <div className="editor-section">
            <h3> Add Code Snippets </h3>{" "}
            <textarea
              placeholder="Write your code snippet here..."
              value={currentSnippet}
              onChange={(e) => setCurrentSnippet(e.target.value)}
              className="code-input"
            />
            <button onClick={addCodeSnippet} className="add-snippet-btn">
              Add Code Snippet{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default ArticleEditor;
