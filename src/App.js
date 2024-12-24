import React, { useState } from "react";
import "./App.css";

// Component imports
import LeftSidebar from "./LeftSidebar";
import JavaScriptQuestion from "./questions/JavaScriptQuestion";
import ReactQuestion from "./questions/ReactQuestion";

const TAB_COMPONENTS = {
  JavaScript: JavaScriptQuestion,
  React: ReactQuestion,
};

const MainContent = ({ activeTab }) => {
  const TabComponent = TAB_COMPONENTS[activeTab];
  return TabComponent ? <TabComponent /> : null;
};

function App() {
  const [activeTab, setActiveTab] = useState("JavaScript");

  return (
    <div className="app-container">
      <div className="left-sidebar-container">
        <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />{" "}
      </div>{" "}
      <div className="main-content">
        <MainContent activeTab={activeTab} />{" "}
      </div>{" "}
    </div>
  );
}

export default App;
