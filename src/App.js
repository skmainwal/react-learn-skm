import React, { useState } from "react";
import "./styles/App.css";
import { faJs, faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "./components/nav/NavigationBar";
import ReactQuestions from "./pages/ReactQuestions/ReactQuestions";
import JavaScriptQuestions from "./pages/JavaScriptQuestions/JavaScriptQuestions";
import JavaScriptArticles from "./pages/JavaScriptArticles/JavaScriptArticles";
import { ArticleEditor } from "./jsArticle";

const TAB_COMPONENTS = {
  "JavaScript Q&A": JavaScriptQuestions,
  "JavaScript Articles": JavaScriptArticles,
  React: ReactQuestions,
};

const MainContent = ({ activeTab }) => {
  const TabComponent = TAB_COMPONENTS[activeTab];
  return TabComponent ? <TabComponent /> : null;
};

const navRightMenuItems = [
  { name: "Become a mentor", key: "Become a mentor" },
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

function App() {
  const [activeTab, setActiveTab] = useState("JavaScript Articles");
  const [showEditor, setShowEditor] = useState(false);

  const navLeftMenuItems = [
    {
      name: "JavaScript Q&A",
      key: "JavaScript Q&A",
      icon: faJs,
      onClick: () => handleTabChange("JavaScript Q&A"),
    },
    {
      name: "JavaScript Articles",
      key: "JavaScript Articles",
      icon: faPenToSquare,
      onClick: () => handleTabChange("JavaScript Articles"),
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
    {
      name: "Write New Article",
      key: "Write New Article",
      icon: faPlus,
      onClick: () => handleTabChange("Write New Article"),
    },
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
  };

  return (
    <div className="app-container">
      <NavigationBar
        leftMenuItems={navLeftMenuItems}
        rightMenuItems={navRightMenuItems}
      />{" "}
      <main className="main-content">
        {" "}
        {showEditor ? (
          <ArticleEditor onClose={handleEditorClose} />
        ) : (
          <MainContent activeTab={activeTab} />
        )}{" "}
      </main>{" "}
    </div>
  );
}

export default App;
