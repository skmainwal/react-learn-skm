const fs = require("fs").promises;
const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");
const ARTICLES_FILE = path.join(DATA_DIR, "articles.json");

async function migrateArticlesToCategories() {
  try {
    // Read the original articles file
    const articlesData = await fs.readFile(ARTICLES_FILE, "utf8");
    const articles = JSON.parse(articlesData);

    // Group articles by category
    const articlesByCategory = {};
    articles.forEach((article) => {
      const category = article.category || "Uncategorized";
      if (!articlesByCategory[category]) {
        articlesByCategory[category] = [];
      }
      articlesByCategory[category].push(article);
    });

    // Create category files
    for (const [category, categoryArticles] of Object.entries(
      articlesByCategory
    )) {
      const sanitizedCategory = category
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_");
      const categoryFilePath = path.join(
        DATA_DIR,
        `${sanitizedCategory}_articles.json`
      );

      await fs.writeFile(
        categoryFilePath,
        JSON.stringify(categoryArticles, null, 2)
      );
      console.log(`Created category file: ${categoryFilePath}`);
    }

    // Rename the original articles.json to articles.json.backup
    const backupPath = path.join(DATA_DIR, "articles.json.backup");
    await fs.rename(ARTICLES_FILE, backupPath);
    console.log(`Original articles.json backed up to ${backupPath}`);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run the migration
migrateArticlesToCategories().catch(console.error);
