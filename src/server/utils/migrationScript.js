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

    // Delete the original articles.json since we've migrated all data
    await fs.unlink(ARTICLES_FILE);
    console.log(`Original articles.json deleted`);

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}

// Run the migration
migrateArticlesToCategories().catch(console.error);
