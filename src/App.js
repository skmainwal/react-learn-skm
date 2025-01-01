import React, { useState } from "react";
import "./styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faJs, faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "./components/nav/NavigationBar";
import ReactQuestions from "./pages/ReactQuestions/ReactQuestions";
import JavaScriptQuestions from "./pages/JavaScriptQuestions/JavaScriptQuestions";
import JavaScriptArticles from "./pages/JavaScriptArticles/JavaScriptArticles";
import { ArticleEditor } from "./jsArticle";
import { articleService } from "./services/articleService";

const TAB_COMPONENTS = {
  "JavaScript Q&A": JavaScriptQuestions,
  "JavaScript Basics": JavaScriptArticles,
  React: ReactQuestions,
};

const MainContent = ({ activeTab, reloadKey }) => {
  const TabComponent = TAB_COMPONENTS[activeTab];
  return TabComponent ? <TabComponent key={reloadKey} /> : null;
};

function App() {
  const [activeTab, setActiveTab] = useState("JavaScript Basics");
  const [showEditor, setShowEditor] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const navLeftMenuItems = [
    {
      name: "JavaScript Basics",
      key: "JavaScript Basics",
      icon: faPenToSquare,
      onClick: () => handleTabChange("JavaScript Basics"),
    },
    {
      name: "React",
      key: "React",
      icon: faReact,
      onClick: () => handleTabChange("React"),
    },
    {
      name: "Python",
      key: "Python",
      icon: faPython,
      onClick: () => handleTabChange("Python"),
    },
  ];

  const navRightMenuItems = [
    {
      name: "Write New Article",
      key: "Write New Article",
      icon: faPlus,
      onClick: () => handleTabChange("Write New Article"),
    },
    {
      name: "Log in",
      key: "login",
      children: [
        { name: "Student Login", key: "Student Login" },
        { name: "Mentor Login", key: "Mentor Login" },
        { name: "Admin Login", key: "Admin Login" },
      ],
    },
    { name: "Sign up", isButton: true, key: "Sign up" },
  ];

  const handleTabChange = (tab) => {
    console.log("Selected tab:", tab);
    if (tab === "Write New Article") {
      setShowEditor(true);
    } else {
      setActiveTab(tab);
      setShowEditor(false);
    }
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setError(null);
  };

  const handleSaveArticle = async (articleData) => {
    try {
      await articleService.createArticle(articleData);
      setShowEditor(false);
      setActiveTab(activeTab);
      setReloadKey((prev) => prev + 1);
      setError(null);
    } catch (err) {
      setError("Failed to save article. Please try again later.");
      console.error("Error saving article:", err);
      throw err;
    }
  };

  return (
    <div className="app">
      <NavigationBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        leftMenuItems={navLeftMenuItems}
        rightMenuItems={navRightMenuItems}
      />{" "}
      <MainContent activeTab={activeTab} reloadKey={reloadKey} />{" "}
      {showEditor && (
        <ArticleEditor onClose={handleEditorClose} onSave={handleSaveArticle} />
      )}{" "}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
