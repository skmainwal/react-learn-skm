import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faJs, faReact } from "@fortawesome/free-brands-svg-icons";

function LeftSidebar({ activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`left-sidebar ${isCollapsed ? "collapsed" : ""}`}
      onClick={isCollapsed ? toggleSidebar : undefined}
    >
      <ul>
        <li
          className={activeTab === "JavaScript" ? "active" : ""}
          onClick={() => setActiveTab("JavaScript")}
        >
          <FontAwesomeIcon icon={faJs} />
          <span className={`tab-text ${isCollapsed ? "hidden" : ""}`}>
            {" "}
            JavaScript
          </span>
        </li>
        <li
          className={activeTab === "React" ? "active" : ""}
          onClick={() => setActiveTab("React")}
        >
          <FontAwesomeIcon icon={faReact} />
          <span className={`tab-text ${isCollapsed ? "hidden" : ""}`}>
            {" "}
            React
          </span>
        </li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
