const fetch = require("node-fetch");

async function testPostArticle() {
  try {
    const response = await fetch("http://localhost:5000/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Test Article",
        content: "Test Content",
        category: "JavaScript Basics",
        topic: "Variables & Data Types",
      }),
    });

    const data = await response.json();
    console.log("Response:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

testPostArticle();
