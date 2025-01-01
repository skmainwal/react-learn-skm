import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./DisplayArticle.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ArticleEditor } from "../../jsArticle";
import ArticlePreview from "../articlePreview/ArticlePreview";
import { TOPICS } from "../../jsArticle/utils/contant";
import { articleService } from "../../services/articleService";
import { CATEGORY_QUERY_PARAMS } from "../../jsArticle/utils/contant";
const DisplayArticle = ({
  articles,
  onArticleDelete,
  onArticleUpdate,
  serviceType,
}) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState({
    value: "all",
    label: "All Topics",
  });

  const getTopicOptions = () => {
    const topics = TOPICS[serviceType];
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
    console.log({ article });
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    // onArticleUpdate(); // Notify parent to reload articles
  };

  const handleDeleteArticle = async (articleId, e, article) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await onArticleDelete(articleId);
        if (selectedArticle && selectedArticle.id === articleId) {
          setSelectedArticle(null);
        }
      } catch (error) {
        console.error("Failed to delete article:", error);
        alert("Failed to delete article. Please try again.");
      }
    }
  };
  const handleSaveArticle = async (articleData) => {
    try {
      if (isEditing && selectedArticle.id) {
        await articleService.updateArticle(
          selectedArticle.id,
          articleData,
          CATEGORY_QUERY_PARAMS[serviceType]
        );
      } else {
        await articleService.createArticle(articleData);
      }
      // setShowEditor(false);
      // setActiveTab("JavaScript Articles"); // Switch to articles view after saving
      // setError(null);
    } catch (err) {
      // setError("Failed to save article. Please try again later.");
      console.error("Error saving article:", err);
      throw err; // Re-throw to be caught by ArticleEditor's error handling
    }
  };

  if (isEditing && selectedArticle) {
    return (
      <ArticleEditor
        editMode={true}
        article={selectedArticle}
        onComplete={handleEditComplete}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveArticle}
        serviceType={serviceType}
      />
    );
  }

  return (
    <div className="display-articles-container">
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
              {process.env.REACT_APP_IS_ADMIN === "true" && (
                <div className="article-actions">
                  <FaEdit
                    className="icon edit"
                    onClick={(e) => handleEditArticle(article, e)}
                  />{" "}
                  <FaTrash
                    className="icon delete"
                    onClick={(e) => handleDeleteArticle(article.id, e, article)}
                  />{" "}
                </div>
              )}{" "}
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

export default DisplayArticle;
