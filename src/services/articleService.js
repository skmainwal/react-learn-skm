const API_URL = "http://localhost:5000/api";

export const articleService = {
  getAllArticles: async () => {
    try {
      const response = await fetch(`${API_URL}/articles`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  createArticle: async (articleData) => {
    try {
      const response = await fetch(`${API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      if (!response.ok) {
        throw new Error("Failed to create article");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating article:", error);
      throw error;
    }
  },

  updateArticle: async (id, articleData) => {
    try {
      const response = await fetch(`${API_URL}/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });
      if (!response.ok) {
        throw new Error("Failed to update article");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating article:", error);
      throw error;
    }
  },

  deleteArticle: async (id) => {
    try {
      const response = await fetch(`${API_URL}/articles/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete article");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      throw error;
    }
  },
};
