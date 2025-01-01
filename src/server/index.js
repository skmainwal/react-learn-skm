const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs").promises;
const {
  saveArticleToCategory,
  getArticlesByCategory,
  getAllCategories,
  deleteCategory,
  updateCategoriesList,
} = require("./utils/categoryFileManager");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT_URL
      : "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../build")));
}

// API Routes
// Get all articles for a category
app.get("/api/articles/:category", async (req, res) => {
  try {
    const articles = await getArticlesByCategory(req.params.category);
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific article by category and ID
app.get("/api/articles/:category/:id", async (req, res) => {
  try {
    // Get the original category name from the categories list
    const categories = await getAllCategories();
    const originalCategory = categories.find(
      (cat) => cat.toLowerCase() === req.params.category.toLowerCase()
    );

    if (!originalCategory) {
      console.log("Category not found. Available categories:", categories);
      console.log("Requested category:", req.params.category);
      return res.status(404).json({ error: "Category not found" });
    }

    const articles = await getArticlesByCategory(originalCategory);
    const article = articles.find((a) => a.id === parseInt(req.params.id));

    if (!article) {
      console.log(
        "Article not found. Available articles:",
        articles.map((a) => a.id)
      );
      console.log("Requested article ID:", req.params.id);
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create a new category
app.post("/api/categories", async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(400).json({ error: "Category name is required" });
    }
    const categories = await updateCategoriesList(category);
    res.status(201).json(categories);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a category
app.delete("/api/categories/:category", async (req, res) => {
  try {
    const result = await deleteCategory(req.params.category);
    if (result) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: error.message });
  }
});

// Create or update an article
app.post("/api/articles", async (req, res) => {
  try {
    const articles = await saveArticleToCategory(req.body);
    res.status(201).json(articles);
  } catch (error) {
    console.error("Error saving article:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update an article
app.put("/api/articles/:category/:id", async (req, res) => {
  try {
    // Get the original category name from the categories list
    const categories = await getAllCategories();
    console.log({ categories });
    const originalCategory = categories.find(
      (cat) => cat.toLowerCase().replace(/[\s-]+/g, "_") === req.params.category
    );

    if (!originalCategory) {
      console.log("Category not found. Available categories:", categories);
      console.log("Requested category:", req.params.category);
      return res.status(404).json({ error: "Category not found" });
    }

    const articleId = Number(req.params.id);

    // Get articles from the specific category file
    const articles = await getArticlesByCategory(originalCategory);
    const articleIndex = articles.findIndex((a) => a.id === articleId);

    if (articleIndex === -1) {
      console.log(
        "Article not found. Available articles:",
        articles.map((a) => a.id)
      );
      console.log("Requested article ID:", articleId);
      return res.status(404).json({ error: "Article not found" });
    }

    // Prepare the updated article data
    const updatedArticle = {
      ...articles[articleIndex],
      ...req.body,
      id: articleId,
      category: originalCategory,
      lastEdited: new Date().toISOString(),
    };

    // Save the article using the categoryFileManager
    await saveArticleToCategory(updatedArticle);

    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete an article
app.delete("/api/articles/:category/:id", async (req, res) => {
  try {
    const articles = await getArticlesByCategory(req.params.category);
    const updatedArticles = articles.filter(
      (article) => article.id !== parseInt(req.params.id)
    );

    if (articles.length === updatedArticles.length) {
      return res.status(404).json({ error: "Article not found" });
    }

    const filePath = path.join(
      __dirname,
      "data",
      `${req.params.category
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")}_articles.json`
    );
    await fs.writeFile(filePath, JSON.stringify(updatedArticles, null, 2));

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ error: error.message });
  }
});

// Serve React app for any other routes in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
