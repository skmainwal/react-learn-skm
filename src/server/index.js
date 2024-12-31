const express = require("express");
const cors = require("cors");
const path = require("path");
const {
    getAllArticles,
    saveArticle,
    updateArticle,
    deleteArticle,
} = require("./articles");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === "production" ?
        process.env.CLIENT_URL :
        "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../build")));
}

// API Routes
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

// Serve React app for any other routes in production
if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});