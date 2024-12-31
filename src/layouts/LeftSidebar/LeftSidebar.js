import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function LeftSidebar({ activeTab, setActiveTab, menuItems }) {
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
        {" "}
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={activeTab === item.name ? "active" : ""}
            onClick={() => setActiveTab(item.name)}
          >
            <FontAwesomeIcon icon={item.icon} />{" "}
            <span className={`tab-text ${isCollapsed ? "hidden" : ""}`}>
              {" "}
              {item.name}{" "}
            </span>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}

LeftSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default LeftSidebar;
