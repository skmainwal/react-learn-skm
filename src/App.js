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
import PythonQuestions from "./pages/python/PythonQuestions";
import { TECH_STACK_CATEGORIES } from "./jsArticle/utils/contant";
import { ArticleEditor } from "./jsArticle";
import { articleService } from "./services/articleService";
import DjangoQuestions from "./pages/django/DjangoQuestions";

const TAB_COMPONENTS = {
  "JavaScript Q&A": JavaScriptQuestions,
  "JavaScript Basics": JavaScriptArticles,
  React: ReactQuestions,
  Python: PythonQuestions,
  Django: DjangoQuestions,
};

const MainContent = ({ activeTab, reloadKey }) => {
  const TabComponent = TAB_COMPONENTS[activeTab];
  return TabComponent ? <TabComponent key={reloadKey} /> : null;
};

function App() {
  const [activeTab, setActiveTab] = useState(
    TECH_STACK_CATEGORIES.JAVASCRIPT_BASICS
  );
  const [showEditor, setShowEditor] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const navLeftMenuItems = [
    {
      name: TECH_STACK_CATEGORIES.JAVASCRIPT_BASICS,
      key: TECH_STACK_CATEGORIES.JAVASCRIPT_BASICS,
      icon: faPenToSquare,
      onClick: () => handleTabChange(TECH_STACK_CATEGORIES.JAVASCRIPT_BASICS),
    },
    {
      name: TECH_STACK_CATEGORIES.REACT,
      key: TECH_STACK_CATEGORIES.REACT,
      icon: faReact,
      onClick: () => handleTabChange(TECH_STACK_CATEGORIES.REACT),
    },
    {
      name: TECH_STACK_CATEGORIES.PYTHON,
      key: TECH_STACK_CATEGORIES.PYTHON,
      icon: faPython,
      onClick: () => handleTabChange(TECH_STACK_CATEGORIES.PYTHON),
    },
    {
      name: TECH_STACK_CATEGORIES.DJANGO,
      key: TECH_STACK_CATEGORIES.DJANGO,
      icon: faPython,
      onClick: () => handleTabChange(TECH_STACK_CATEGORIES.DJANGO),
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
