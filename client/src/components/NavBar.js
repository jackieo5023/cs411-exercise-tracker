import React from "react";
import "../css/NavBar.css";
import dashboardIcon from "../assets/dashboardicon.png";

function NavBar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dashboardIcon} alt="" className="logoImg" />
        <a href="responsive_example.html" className="teamName">
          Team Seg_Fault
        </a>
      </div>
      <div className="content">
        <div className="barItem">
          <img src={dashboardIcon} alt="" className="icon" />
          <a href="responsive_example.html" className="sidebarlink">
            Responsive Home
          </a>
        </div>
        <div className="barItem">
          <img src={dashboardIcon} alt="" className="icon" />
          <a href="responsive_example.html" className="sidebarlink">
            Responsive Example
          </a>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
