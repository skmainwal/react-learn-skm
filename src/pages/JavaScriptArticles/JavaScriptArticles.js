import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Select from "react-select";
import "./JavaScriptArticles.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { articleService } from "../../services/articleService";
import { ArticleEditor } from "../../jsArticle";

const ArticlePreview = ({ article }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!article) return null;

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderContent = () => {
    if (!article.content) return null;

    return article.content.split("\n").map((line, index) => {
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
                showLineNumbers
                customStyle={{
                  margin: 0,
                  borderRadius: "0 0 4px 4px",
                }}
              >
                {codeSnippets[snippetIndex]}{" "}
              </SyntaxHighlighter>{" "}
            </div>
          );
        }
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

const JavaScriptArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState({
    value: "all",
    label: "All Topics",
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await articleService.getAllArticles();
      setArticles(data);
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

  const getTopicOptions = () => {
    const topics = articles.map((article) => article.topic).filter(Boolean);
    const uniqueTopics = [...new Set(topics)];
    return [
      { value: "all", label: "All Topics" },
      ...uniqueTopics.map((topic) => ({ value: topic, label: topic })),
    ];
  };

  const filteredArticles = articles.filter(
    (article) =>
      selectedTopic.value === "all" || article.topic === selectedTopic.value
  );

  const handleEditArticle = (article, e) => {
    e.stopPropagation();
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    loadArticles(); // Reload articles to get the updated data
  };

  const handleDeleteArticle = async (articleId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await articleService.deleteArticle(articleId);
        setArticles(articles.filter((article) => article.id !== articleId));
        if (selectedArticle && selectedArticle.id === articleId) {
          setSelectedArticle(null);
        }
      } catch (error) {
        console.error("Failed to delete article:", error);
        alert("Failed to delete article. Please try again.");
      }
    }
  };

  if (isEditing && selectedArticle) {
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
    <div className="js-articles-container">
      <div className="articles-list">
        <div className="articles-header">
          <Select
            value={selectedTopic}
            onChange={setSelectedTopic}
            options={getTopicOptions()}
            className="topic-filter-container"
            classNamePrefix="topic-filter"
            placeholder="Search topics..."
            isClearable={false}
          />{" "}
        </div>{" "}
        <div className="articles-list-container">
          {" "}
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className={`article-card ${
                selectedArticle?.id === article.id ? "active" : ""
              }`}
              onClick={() => setSelectedArticle(article)}
            >
              <h3> {article.title} </h3>{" "}
              <div className="article-topic"> {article.topic} </div>{" "}
              <div className="article-actions">
                <FaEdit
                  className="icon edit"
                  onClick={(e) => handleEditArticle(article, e)}
                />{" "}
                <FaTrash
                  className="icon delete"
                  onClick={(e) => handleDeleteArticle(article.id, e)}
                />{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </div>{" "}
      <div className="article-content">
        {" "}
        {selectedArticle ? (
          <ArticlePreview article={selectedArticle} />
        ) : (
          <div className="no-article-selected">
            <h3> Select an article to read </h3>{" "}
            <p> Choose from the list of articles on the left </p>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default JavaScriptArticles;
