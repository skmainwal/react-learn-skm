import React, { useState, useEffect } from "react";
import { articleService } from "../../services/articleService";
import DisplayArticle from "../../components/displayArticle/DisplayArticle";
import {
  CATEGORY_QUERY_PARAMS,
  TECH_STACK_CATEGORIES,
} from "../../jsArticle/utils/contant";

const PythonQuestions = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await articleService.getAllArticles(
        CATEGORY_QUERY_PARAMS["Python"]
      );
      setArticles(data);
    } catch (error) {
      console.error("Failed to load articles:", error);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    await articleService.deleteArticle(
      articleId,
      CATEGORY_QUERY_PARAMS[TECH_STACK_CATEGORIES.PYTHON]
    );
    setArticles(articles.filter((article) => article.id !== articleId));
  };

  return (
    <DisplayArticle
      articles={articles}
      onArticleDelete={handleDeleteArticle}
      onArticleUpdate={loadArticles}
      serviceType={TECH_STACK_CATEGORIES.PYTHON}
    />
  );
};

export default PythonQuestions;
