const fs = require("fs").promises;
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");

// Counter for ensuring unique IDs even when created in the same millisecond
let lastTimestamp = 0;
let counter = 0;

// Generate a unique ID combining timestamp and counter
function generateUniqueId() {
  const timestamp = Date.now();
  if (timestamp === lastTimestamp) {
    counter++;
  } else {
    counter = 0;
    lastTimestamp = timestamp;
  }
  return Number(`${timestamp}${counter.toString().padStart(3, "0")}`);
}

// Ensure the data directory exists
async function ensureDataDirectory() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Get category file path
function getCategoryFilePath(category) {
  const sanitizedCategory = category.toLowerCase().replace(/[\s-]+/g, "_");
  return path.join(__dirname, "../data", `${sanitizedCategory}_articles.json`);
}

// Get original category case
async function getOriginalCategory(category) {
  const categories = await getAllCategories();
  return categories.find(
    (cat) =>
      cat.toLowerCase().replace(/[\s-]+/g, "_") ===
      category.toLowerCase().replace(/[\s-]+/g, "_")
  );
}

// Update categories list
async function updateCategoriesList(newCategory) {
  try {
    let categories = [];
    try {
      const data = await fs.readFile(CATEGORIES_FILE, "utf8");
      categories = JSON.parse(data);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    if (newCategory) {
      // Check case-insensitive duplicate
      const exists = categories.some(
        (cat) => cat.toLowerCase() === newCategory.toLowerCase()
      );
      if (!exists) {
        categories.push(newCategory);
        categories.sort();
        await fs.writeFile(
          CATEGORIES_FILE,
          JSON.stringify(categories, null, 2)
        );
      }
    }

    return categories;
  } catch (error) {
    console.error("Error updating categories list:", error);
    throw error;
  }
}

// Save article to category-specific file
async function saveArticleToCategory(article) {
  if (!article.category) {
    throw new Error("Article must have a category");
  }

  await ensureDataDirectory();

  // Get the original category case if it exists
  const originalCategory =
    (await getOriginalCategory(article.category)) || article.category;
  const filePath = getCategoryFilePath(originalCategory);

  // Generate ID first for new articles
  const newArticle = {
    ...article,
    id: article.id || generateUniqueId(),
    category: originalCategory,
  };

  try {
    // Update categories list first
    await updateCategoriesList(originalCategory);

    // Try to read existing articles
    const existingData = await fs.readFile(filePath, "utf8");
    const articles = JSON.parse(existingData);

    let savedArticle;
    // Update existing article or add new one
    const index = articles.findIndex((a) => a.id === newArticle.id);
    if (index !== -1) {
      savedArticle = {
        ...newArticle,
        lastEdited: new Date().toISOString(),
      };
      articles[index] = savedArticle;
    } else {
      savedArticle = {
        ...newArticle,
        createdAt: new Date().toISOString(),
      };
      articles.push(savedArticle);
    }

    // Save back to file
    await fs.writeFile(filePath, JSON.stringify(articles, null, 2));
    return savedArticle;
  } catch (error) {
    if (error.code === "ENOENT") {
      // File doesn't exist, create new file with single article
      const savedArticle = {
        ...newArticle,
        createdAt: new Date().toISOString(),
      };
      const articles = [savedArticle];
      await fs.writeFile(filePath, JSON.stringify(articles, null, 2));
      return savedArticle;
    }
    throw error;
  }
}

// Get all articles for a specific category
async function getArticlesByCategory(category) {
  const filePath = getCategoryFilePath(category);
  try {
    const data = await fs.readFile(filePath, "utf8");
    const articles = JSON.parse(data);
    // Ensure all articles have the correct category case
    const originalCategory = (await getOriginalCategory(category)) || category;
    return articles.map((article) => ({
      ...article,
      category: originalCategory,
    }));
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

// Get all categories
async function getAllCategories() {
  try {
    const data = await fs.readFile(CATEGORIES_FILE, "utf8");
    console.log({ data: JSON.parse(data) });
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

// Delete a category and its articles
async function deleteCategory(category) {
  try {
    const originalCategory = await getOriginalCategory(category);
    if (!originalCategory) return false;

    const filePath = getCategoryFilePath(originalCategory);
    await fs.unlink(filePath);

    // Update categories list
    let categories = await getAllCategories();
    categories = categories.filter((c) => c !== originalCategory);
    await fs.writeFile(CATEGORIES_FILE, JSON.stringify(categories, null, 2));

    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

module.exports = {
  saveArticleToCategory,
  getArticlesByCategory,
  getAllCategories,
  deleteCategory,
  updateCategoriesList,
};
