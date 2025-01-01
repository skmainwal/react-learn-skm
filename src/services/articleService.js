import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api";

export const articleService = {
  getAllArticles: async (articleCategory) => {
    try {
      const response = await fetch(`${API_URL}/articles/${articleCategory}`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
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
      const data = await response.json();
      toast.success("Article created successfully");
      return data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Error creating article:", error);
      throw error;
    }
  },

  updateArticle: async (id, articleData, category) => {
    try {
      const response = await fetch(`${API_URL}/articles/${category}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...articleData,
          lastEdited: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update article");
      }
      const data = await response.json();
      toast.success("Article updated successfully");
      return data;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Error updating article:", error);
      throw error;
    }
  },

  deleteArticle: async (id, category) => {
    try {
      const response = await fetch(`${API_URL}/articles/${category}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete article");
      }
      toast.success("Article deleted successfully");
      return true;
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      console.error("Error deleting article:", error);
      throw error;
    }
  },
};
