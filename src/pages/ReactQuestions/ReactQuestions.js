import React, { useState, useEffect } from "react";
import { articleService } from "../../services/articleService";
import DisplayArticle from "../../components/displayArticle/DisplayArticle";
import { CATEGORY_QUERY_PARAMS } from "../../jsArticle/utils/contant";

const ReactQuestions = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setError(null);
      const data = await articleService.getAllArticles(
        CATEGORY_QUERY_PARAMS["React"]
      );
      setArticles(data);
    } catch (error) {
      console.error("Failed to load articles:", error);
      setError("Failed to load React articles. Please try again later.");
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await articleService.deleteArticle(
        articleId,
        CATEGORY_QUERY_PARAMS["React"]
      );
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error("Failed to delete article:", error);
      setError("Failed to delete article. Please try again later.");
    }
  };

  const handleUpdateArticle = async (articleId, articleData) => {
    try {
      await articleService.updateArticle(
        articleId,
        articleData,
        CATEGORY_QUERY_PARAMS["React"]
      );
      await loadArticles(); // Reload all articles to get the updated data
    } catch (error) {
      console.error("Failed to update article:", error);
      setError("Failed to update article. Please try again later.");
    }
  };

  if (error) {
    return <div className="error-message"> {error} </div>;
  }

  return (
    <DisplayArticle
      articles={articles}
      onArticleDelete={handleDeleteArticle}
      // onArticleUpdate={handleUpdateArticle}
      serviceType="React"
    />
  );
};

export default ReactQuestions;
