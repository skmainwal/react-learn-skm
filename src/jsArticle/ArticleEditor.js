import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CATEGORIES, TOPICS } from "./utils/contant";
import "./ArticleEditor.css";

const ArticleEditor = ({
  editMode = false,
  article = null,
  onComplete = null,
  onClose = null,
  onSave = null,
  categories = CATEGORIES,
  topics = [],
  features = {
    codeSnippets: true,
    formatting: true,
    preview: true,
    categories: true,
    topics: true,
  },
  syntaxHighlighterTheme = vscDarkPlus,
  syntaxHighlighterLanguage = "javascript",
  className = "",
  overlayClassName = "",
  title = "",
  titlePlaceholder = "Article Title",
  contentPlaceholder = "Write your article content here...",
  codeSnippetPlaceholder = "Write your code snippet here...",
  saveButtonText = "Save",
  cancelButtonText = "Cancel",
  addSnippetButtonText = "Add Code Snippet",
  previewTitle = "Preview",
  colors = [
    { name: "Yellow", value: "#fff3cd" },
    { name: "Green", value: "#d4edda" },
    { name: "Blue", value: "#cce5ff" },
    { name: "Red", value: "#f8d7da" },
    { name: "Gray", value: "#e2e3e5" },
  ],
  serviceType,
}) => {
  const [articleTitle, setArticleTitle] = useState(title);
  const [content, setContent] = useState("");
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [currentSnippet, setCurrentSnippet] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [category, setCategory] = useState(categories[0] || "");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopicError, setShowTopicError] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState(
    TOPICS[serviceType] || []
  );

  useEffect(() => {
    if (editMode && article) {
      setArticleTitle(article.title);
      setContent(article.content);
      setCodeSnippets([...article.codeSnippets]);
      setCategory(article.category || categories[0] || "");
      setSelectedTopic(
        article.topic ? { value: article.topic, label: article.topic } : null
      );
    }
  }, [editMode, article, categories]);

  useEffect(() => {
    const topicsForCategory = TOPICS[serviceType] || [];
    setFilteredTopics(topicsForCategory);
    if (selectedTopic && !topicsForCategory.includes(selectedTopic.value)) {
      setSelectedTopic(null);
    }
  }, [serviceType, selectedTopic]);

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSaveArticle = async (e) => {
    if (e) {
      e.stopPropagation();
    }

    if (!articleTitle.trim()) {
      alert("Please enter a title for your article");
      return;
    }

    if (!content.trim()) {
      alert("Please enter some content for your article");
      return;
    }

    if (features.topics && !selectedTopic) {
      setShowTopicError(true);
      alert("Please select a topic for your article");
      return;
    }

    const articleData = {
      title: articleTitle,
      content,
      codeSnippets: features.codeSnippets ? codeSnippets : [],
      ...(features.categories && { category }),
      ...(features.topics && {
        topic: selectedTopic ? selectedTopic.value : null,
      }),
      createdAt: new Date().toISOString(),
    };

    try {
      if (onSave) {
        await onSave(articleData, editMode);
      }

      // Reset form
      setArticleTitle("");
      setContent("");
      setCodeSnippets([]);
      setCategory(categories[0] || "");
      setSelectedTopic(null);
      setShowTopicError(false);

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

    const newContent = content
      .split("\n")
      .filter((line) => !line.includes(`[code-snippet-${snippetIndex}]`))
      .join("\n");
    setContent(newContent);
  };

  const onSelectCategory = (value) => {
    setCategory(value);
    setFilteredTopics(TOPICS[value]);
  };

  const renderFormattedContent = (text) => {
    return text.split("\n").map((line, index) => {
      if (features.codeSnippets && line.startsWith("[code-snippet-")) {
        const snippetIndex = parseInt(line.match(/\d+/)[0]);
        if (snippetIndex < codeSnippets.length) {
          return (
            <div key={index} className="code-preview">
              <div className="code-header">
                <span> {syntaxHighlighterLanguage} </span>{" "}
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
                language={syntaxHighlighterLanguage}
                style={syntaxHighlighterTheme}
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
    <div
      className={`article-editor-overlay ${overlayClassName}`}
      onClick={handleCancel}
    >
      <div
        className={`article-editor ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="editor-close-btn" onClick={handleCancel}>
          <FontAwesomeIcon icon={faTimes} />{" "}
        </button>{" "}
        <div className="editor-header-container">
          <div className="editor-header-top">
            <h2> {editMode ? "Edit Article" : "Write New Article"} </h2>{" "}
            <div className="editor-header-actions">
              <button
                onClick={(e) => handleSaveArticle(e)}
                className="header-btn header-save-btn"
              >
                {" "}
                {saveButtonText}{" "}
              </button>{" "}
              <button
                onClick={handleCancel}
                className="header-btn header-cancel-btn"
              >
                {" "}
                {cancelButtonText}{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div className="editor-header">
            <input
              type="text"
              placeholder={titlePlaceholder}
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              className="title-input"
            />{" "}
            {features.categories && categories.length > 0 && (
              <select
                value={category}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="category-select"
              >
                {" "}
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {" "}
                    {cat}{" "}
                  </option>
                ))}{" "}
              </select>
            )}{" "}
            {features.topics && (
              <Select
                value={selectedTopic}
                onChange={(option) => {
                  setSelectedTopic(option);
                  setShowTopicError(false);
                }}
                options={filteredTopics.map((topic) => ({
                  value: topic,
                  label: topic,
                }))}
                className={`topic-select-container ${
                  showTopicError ? "error" : ""
                }`}
                classNamePrefix="topic-select"
                placeholder="Select Topic *"
                isClearable
                isSearchable
              />
            )}{" "}
          </div>{" "}
          {features.formatting && (
            <div className="formatting-toolbar">
              <button
                onClick={() => handleFormat("bold")}
                className="format-btn"
              >
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
            </div>
          )}{" "}
        </div>{" "}
        <div className="editor-content">
          <div className="content-container">
            <textarea
              placeholder={contentPlaceholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="content-input"
            />{" "}
            {features.preview && (
              <div className="content-preview">
                <h3> {previewTitle} </h3> {renderFormattedContent(content)}{" "}
              </div>
            )}{" "}
          </div>{" "}
          {features.codeSnippets && (
            <div className="editor-section">
              <h3> Add Code Snippets </h3>{" "}
              <textarea
                placeholder={codeSnippetPlaceholder}
                value={currentSnippet}
                onChange={(e) => setCurrentSnippet(e.target.value)}
                className="code-input"
              />
              <button onClick={addCodeSnippet} className="add-snippet-btn">
                {" "}
                {addSnippetButtonText}{" "}
              </button>{" "}
            </div>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

ArticleEditor.propTypes = {
  editMode: PropTypes.bool,
  article: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string,
    codeSnippets: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    topic: PropTypes.string,
  }),
  onComplete: PropTypes.func,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.string),
  topics: PropTypes.arrayOf(PropTypes.string),
  features: PropTypes.shape({
    codeSnippets: PropTypes.bool,
    formatting: PropTypes.bool,
    preview: PropTypes.bool,
    categories: PropTypes.bool,
    topics: PropTypes.bool,
  }),
  syntaxHighlighterTheme: PropTypes.object,
  syntaxHighlighterLanguage: PropTypes.string,
  className: PropTypes.string,
  overlayClassName: PropTypes.string,
  title: PropTypes.string,
  titlePlaceholder: PropTypes.string,
  contentPlaceholder: PropTypes.string,
  codeSnippetPlaceholder: PropTypes.string,
  saveButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  addSnippetButtonText: PropTypes.string,
  previewTitle: PropTypes.string,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

export default ArticleEditor;
