import React from "react";
import "./NavigationBar.css";

const NavigationBar = ({
  leftMenuItems = [],
  rightMenuItems = [],
  activeTab = "",
}) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img
          src="https://avatars.githubusercontent.com/u/61382724?v=4&size=64"
          alt="Logo"
        />{" "}
        {leftMenuItems.map((item) => (
          <a
            key={item.key}
            href={item.href || "#"}
            onClick={item.onClick}
            className={`${item.children ? "has-dropdown" : ""} ${
              activeTab === item.key ? "active" : ""
            }`}
          >
            {" "}
            {item.name}{" "}
          </a>
        ))}{" "}
      </div>{" "}
      <div className="navbar-right">
        {" "}
        {rightMenuItems.map((item) => (
          <a
            key={item.key}
            href={item.href || "#"}
            className={`${item.isButton ? "btn-signup" : ""} ${
              item.children ? "has-dropdown" : ""
            } ${activeTab === item.key ? "active" : ""}`}
            onClick={item.onClick}
          >
            {" "}
            {item.name}{" "}
          </a>
        ))}{" "}
      </div>{" "}
    </div>
  );
};

export default NavigationBar;
