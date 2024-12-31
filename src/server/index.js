const express = require("express");
const cors = require("cors");
const {
    getAllArticles,
    saveArticle,
    updateArticle,
    deleteArticle,
} = require("./articles");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all articles
app.get("/api/articles", async(req, res) => {
    try {
        const articles = await getAllArticles();
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ error: error.message });
    }
});

// Create a new article
app.post("/api/articles", async(req, res) => {
    try {
        const newArticle = await saveArticle(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
        console.error("Error creating article:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update an article
app.put("/api/articles/:id", async(req, res) => {
    try {
        const updatedArticle = await updateArticle(
            parseInt(req.params.id),
            req.body
        );
        res.json(updatedArticle);
    } catch (error) {
        console.error("Error updating article:", error);
        res
            .status(error.message === "Article not found" ? 404 : 500)
            .json({ error: error.message });
    }
});

// Delete an article
app.delete("/api/articles/:id", async(req, res) => {
    try {
        await deleteArticle(parseInt(req.params.id));
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});