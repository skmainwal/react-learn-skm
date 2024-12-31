const fs = require("fs").promises;
const path = require("path");

const ARTICLES_FILE = path.join(__dirname, "data", "articles.json");

// Ensure the data directory exists
const ensureDataDirectory = async() => {
    const dataDir = path.join(__dirname, "data");
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir, { recursive: true });
    }
};

// Initialize articles file if it doesn't exist
const initializeArticlesFile = async() => {
    try {
        await fs.access(ARTICLES_FILE);
    } catch {
        await fs.writeFile(ARTICLES_FILE, "[]", "utf8");
    }
};

// Get all articles
const getAllArticles = async() => {
    await ensureDataDirectory();
    await initializeArticlesFile();
    const data = await fs.readFile(ARTICLES_FILE, "utf8");
    return JSON.parse(data);
};

// Save an article
const saveArticle = async(article) => {
    const articles = await getAllArticles();
    const newArticle = {
        ...article,
        id: Date.now(),
        createdAt: new Date().toISOString(),
    };
    articles.push(newArticle);
    await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf8");
    return newArticle;
};

// Update an article
const updateArticle = async(id, updatedArticle) => {
    const articles = await getAllArticles();
    const index = articles.findIndex((article) => article.id === id);
    if (index === -1) {
        throw new Error("Article not found");
    }
    articles[index] = {
        ...articles[index],
        ...updatedArticle,
        lastEdited: new Date().toISOString(),
    };
    await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf8");
    return articles[index];
};

// Delete an article
const deleteArticle = async(id) => {
    const articles = await getAllArticles();
    const filteredArticles = articles.filter((article) => article.id !== id);
    await fs.writeFile(
        ARTICLES_FILE,
        JSON.stringify(filteredArticles, null, 2),
        "utf8"
    );
};

module.exports = {
    getAllArticles,
    saveArticle,
    updateArticle,
    deleteArticle,
};