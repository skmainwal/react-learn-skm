import React, { useState } from "react";
import "./styles/App.css";
import { faJs, faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  { name: "Become a mentor" },
  {
    name: "Log in",
    children: [
      { name: "Student Login" },
      { name: "Mentor Login" },
      { name: "Admin Login" },
    ],
  },
  { name: "Sign up", isButton: true },
];

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
    name: "React",
    icon: faReact,
  },
  {
    name: "Python",
    icon: faPython,
  },
  {
    name: "Write New Article",
    icon: faPlus,
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("JavaScript Q&A");
  const [showEditor, setShowEditor] = useState(false);
  const navLeftMenuItems = [
    {
      name: "JavaScript Q&A",
      key: "JavaScript Q&A",
      onClick: () => {
        setActiveTab("JavaScript Q&A");
      },
    },
    {
      name: "JavaScript Articles",
      key: "JavaScript Articles",
      onClick: () => {
        setActiveTab("JavaScript Articles");
      },
    },

    {
      name: "React",
      key: "React",
      onClick: () => {
        setActiveTab("React");
      },
    },
    {
      name: "Python",
      key: "Python",
      onClick: () => {
        setActiveTab("Python");
      },
    },
    {
      name: "Write New Article",
      key: "Write_new_Article",
      onClick: () => {
        setShowEditor(true);
      },
    },
  ];

  const handleTabChange = (tab) => {
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
      <nav className="top-nav">
        <ul>
          {" "}
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeTab === item.name ? "active" : ""}
              onClick={() => handleTabChange(item.name)}
            >
              {" "}
              {item.icon && <FontAwesomeIcon icon={item.icon} />}{" "}
              <span className="tab-text"> {item.name} </span>{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </nav>{" "}
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
