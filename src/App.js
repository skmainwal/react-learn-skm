import React, { useState } from "react";
import "./styles/App.css";
import LeftSidebar from "./layouts/LeftSidebar/LeftSidebar";
import { faJs, faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

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

const menuItems = [
  {
    name: "JavaScript Q&A",
    icon: faJs,
  },
  {
    name: "JavaScript Articles",
    icon: faPenToSquare,
  },
  {
    name: "Write New Article",
    icon: faPlus,
  },
  {
    name: "React",
    icon: faReact,
  },
  {
    name: "Python",
    icon: faPython,
  },
  {
    name: "SQL",
    icon: "",
  },
  {
    name: "Cookie",
    icon: "",
  },
  {
    name: "Docker",
    icon: "",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("JavaScript Q&A");
  const [showArticleEditor, setShowArticleEditor] = useState(false);

  const handleTabChange = (tab) => {
    if (tab === "Write New Article") {
      setShowArticleEditor(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleEditorClose = () => {
    setShowArticleEditor(false);
    setActiveTab("JavaScript Articles");
  };

  return (
    <div className="app">
      <LeftSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        menuItems={menuItems}
      />{" "}
      <main className="main-content">
        <MainContent activeTab={activeTab} />{" "}
      </main>{" "}
      {showArticleEditor && (
        <ArticleEditor
          onClose={handleEditorClose}
          onComplete={handleEditorClose}
        />
      )}{" "}
    </div>
  );
}

export default App;
