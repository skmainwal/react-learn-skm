import React, { useState } from "react";
import "./App.css";
import CollapsibleQA from "./CollapsibleQA";
import questions from "./questions/reactQuestions";
import JavaScriptQuestion from "./questions/JavaScriptQuestion";
import ReactQuestion from "./questions/ReactQuestion";
import RightSidePanel from "./RightSidePanel";
import LeftSidebar from "./LeftSidebar";

function App() {
  const [activeTab, setActiveTab] = useState("JavaScript");

  return (
    <div className="app-container">
      <div className="left-sidebar-container">
        <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="main-content">
        {activeTab === "JavaScript" && <JavaScriptQuestion />}
        {activeTab === "React" && <ReactQuestion />}
      </div>
    </div>
  );
}

export default App;
