import React, { useState, useEffect } from "react";
import { ArticleEditor } from "../../jsArticle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faTimes,
  faTrash,
  faClock,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./JavaScriptArticles.css";

function JavaScriptArticles() {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState("all");

  useEffect(() => {
    const savedArticles = JSON.parse(
      localStorage.getItem("jsArticles") || "[]"
    );
    setArticles(savedArticles);
  }, []);

  const handleEditComplete = () => {
    setIsEditing(false);
    const savedArticles = JSON.parse(
      localStorage.getItem("jsArticles") || "[]"
    );
    setArticles(savedArticles);
  };

  const handleEdit = (article) => {
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleView = (article) => {
    setSelectedArticle(article);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setSelectedArticle(null);
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderFormattedContent = (text, codeSnippets) => {
    return text.split("\n").map((line, index) => {
      if (line.startsWith("[code-snippet-")) {
        const snippetIndex = parseInt(line.match(/\d+/)[0]);
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
                  {" "}
                  {copiedIndex === snippetIndex ? "Copied!" : "Copy"}{" "}
                </button>{" "}
              </div>{" "}
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: "16px",
                  background: "#1e1e1e",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  fontFamily: "'Fira Code', monospace",
                }}
                codeTagProps={{
                  style: {
                    color: "inherit",
                    fontSize: "14px",
                    fontFamily: "'Fira Code', monospace",
                  },
                }}
                useInlineStyles={true}
              >
                {" "}
                {codeSnippets[snippetIndex].trim()}{" "}
              </SyntaxHighlighter>{" "}
            </div>
          );
        }
        return null;
      }

      if (line.startsWith("# ")) {
        return <h1 key={index}> {line.substring(2).trim()} </h1>;
      }
      if (line.startsWith("## ")) {
        return <h2 key={index}> {line.substring(3).trim()} </h2>;
      }
      if (line.startsWith("### ")) {
        return <h3 key={index}> {line.substring(4).trim()} </h3>;
      }
      if (line.startsWith("• ")) {
        return <li key={index}> {line.substring(2).trim()} </li>;
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
          <span
            key={match.index}
            style={{
              backgroundColor: match[1],
              padding: "0 4px",
              borderRadius: "3px",
            }}
          >
            {" "}
            {match[2].trim()}{" "}
          </span>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      if (parts.length === 0) {
        const boldRegex = /\*\*(.*?)\*\*/g;
        parts = line
          .split(boldRegex)
          .map((part, i) =>
            i % 2 === 0 ? part : <strong key={i}> {part.trim()} </strong>
          );
      }

      return line.trim() ? <p key={index}> {parts} </p> : <br key={index} />;
    });
  };

  const handleDelete = (articleId) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const updatedArticles = articles.filter(
        (article) => article.id !== articleId
      );
      localStorage.setItem("jsArticles", JSON.stringify(updatedArticles));
      setArticles(updatedArticles);
    }
  };

  const getUniqueTopics = () => {
    const topics = articles
      .map((article) => article.topic)
      .filter((topic) => topic); // Remove null/undefined
    return ["all", ...new Set(topics)];
  };

  const filteredArticles = articles.filter((article) =>
    selectedTopic === "all" ? true : article.topic === selectedTopic
  );

  if (isEditing) {
    return (
      <ArticleEditor
        editMode={true}
        article={selectedArticle}
        onComplete={handleEditComplete}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="js-articles">
      <div className="filter-section">
        <div className="topic-filter">
          <FontAwesomeIcon icon={faFilter} />{" "}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="topic-select"
          >
            {" "}
            {getUniqueTopics().map((topic) => (
              <option key={topic} value={topic}>
                {" "}
                {topic === "all" ? "All Topics" : topic}{" "}
              </option>
            ))}{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      <div className="articles-grid">
        {" "}
        {filteredArticles.map((article) => (
          <div key={article.id} className="article-card">
            <div className="article-card-content">
              <h3> {article.title} </h3>{" "}
              <div className="article-meta-info">
                <p className="article-date">
                  <FontAwesomeIcon icon={faClock} />{" "}
                  {formatDate(article.createdAt)}{" "}
                </p>{" "}
                {article.lastEdited && (
                  <p className="edit-date">
                    <FontAwesomeIcon icon={faEdit} />{" "}
                    {formatDate(article.lastEdited)}{" "}
                  </p>
                )}{" "}
                <p className="article-category">
                  {" "}
                  {article.category || "JavaScript"}{" "}
                </p>{" "}
                {article.topic && (
                  <p className="article-topic"> Topic: {article.topic} </p>
                )}{" "}
              </div>{" "}
            </div>{" "}
            <div
              className="delete-icon"
              onClick={() => handleDelete(article.id)}
            >
              <FontAwesomeIcon icon={faTrash} />{" "}
            </div>{" "}
            <div className="article-actions">
              <button
                className="action-btn edit-btn"
                onClick={() => handleEdit(article)}
                title="Edit Article"
              >
                <FontAwesomeIcon icon={faEdit} />
                Edit{" "}
              </button>{" "}
              <button
                className="action-btn view-btn"
                onClick={() => handleView(article)}
                title="View Article"
              >
                <FontAwesomeIcon icon={faEye} />
                View{" "}
              </button>{" "}
            </div>{" "}
          </div>
        ))}{" "}
        {articles.length === 0 && (
          <p className="no-articles"> No articles found.Start writing one! </p>
        )}{" "}
      </div>{" "}
      {showPreview && selectedArticle && (
        <div className="article-preview-sidebar">
          <div className="preview-header">
            <div className="preview-header-top">
              <h2> {selectedArticle.title} </h2>{" "}
              <button
                className="close-preview-btn"
                onClick={handleClosePreview}
              >
                <FontAwesomeIcon icon={faTimes} />{" "}
              </button>{" "}
            </div>{" "}
            <div className="article-meta">
              <p className="article-date">
                Created: {formatDate(selectedArticle.createdAt)}{" "}
              </p>{" "}
              {selectedArticle.lastEdited && (
                <p className="edit-date">
                  Edited: {formatDate(selectedArticle.lastEdited)}{" "}
                </p>
              )}{" "}
              <p className="article-category">
                Category: {selectedArticle.category || "JavaScript"}{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
          <div className="preview-content">
            <div className="article-content">
              {" "}
              {renderFormattedContent(
                selectedArticle.content,
                selectedArticle.codeSnippets
              )}{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default JavaScriptArticles;
