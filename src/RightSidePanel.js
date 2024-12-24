import React, { useState } from "react";
import JavaScriptQuestion from "./questions/JavaScriptQuestion";
import ReactQuestion from "./questions/ReactQuestion";
import "./RightSidePanel.css";

function RightSidePanel() {
  const [activeTab, setActiveTab] = useState("JavaScript");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [visibleTabs, setVisibleTabs] = useState(["JavaScript"]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const showNextTab = () => {
    if (!visibleTabs.includes("React")) {
      setVisibleTabs([...visibleTabs, "React"]);
    }
  };

  return (
    <div className={`right-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      {isSidebarOpen && (
        <div className="tabs">
          {visibleTabs.includes("JavaScript") && (
            <button onClick={() => setActiveTab("JavaScript")}>
              JavaScript
            </button>
          )}
          {visibleTabs.includes("React") && (
            <button onClick={() => setActiveTab("React")}>React</button>
          )}
          {visibleTabs.length < 2 && (
            <button onClick={showNextTab}>Show Next Tab</button>
          )}
        </div>
      )}
      <div className="content">
        {activeTab === "JavaScript" && <JavaScriptQuestion />}
        {activeTab === "React" && <ReactQuestion />}
      </div>
    </div>
  );
}

export default RightSidePanel;
