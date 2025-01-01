import React, { useState, useEffect } from "react";
import "./JavaScriptArticles.css";
import { articleService } from "../../services/articleService";
import DisplayArticle from "../../components/displayArticle/DisplayArticle";
import { CATEGORY_QUERY_PARAMS } from "../../jsArticle/utils/contant";

const JavaScriptArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await articleService.getAllArticles(
        CATEGORY_QUERY_PARAMS["JavaScript Basics"]
      );
      setArticles(data);
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    await articleService.deleteArticle(
      articleId,
      CATEGORY_QUERY_PARAMS["JavaScript Basics"]
    );
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  return (
    <DisplayArticle
      articles={articles}
      onArticleDelete={handleDeleteArticle}
      onArticleUpdate={loadArticles}
      serviceType="JavaScript Basics"
    />
  );
};

export default JavaScriptArticles;
