import React from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

//Stylesheet
import "../css/NavBar.css";

//Icons
import dashboardIcon from "../assets/dashboardicon.png";
import profileicon from "../assets/profileicon.png";
import exerciseicon from "../assets/exerciseicon.png";
import nutritionicon from "../assets/nutritionicon.png";
import settingsicon from "../assets/settingsicon.png";

function NavBar({ userId, setUserId }) {
  const handleClick = () => {
    if (userId) {
      setUserId(null);
      localStorage.removeItem("userId");
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dashboardIcon} alt="" className="logoImg" />
        <span className="teamName">Team Seg_Fault</span>
      </div>
      <div className="content">
        <NavLink className="routeLink" to="/">
          <div className="barItem">
            <img src={dashboardIcon} alt="" className="icon" />
            <span className="sidebarlink">Dashboard</span>
          </div>
        </NavLink>
        <NavLink className="routeLink" to="/profile">
          <div className="barItem">
            <img src={profileicon} alt="" className="icon" />
            <span className="sidebarlink">My Profile</span>
          </div>
        </NavLink>
        <NavLink className="routeLink" to="/exercise">
          <div className="barItem">
            <img src={exerciseicon} alt="" className="icon" />
            <span className="sidebarlink">Exercise</span>
          </div>
        </NavLink>
        <NavLink className="routeLink" to="/nutrition">
          <div className="barItem">
            <img src={nutritionicon} alt="" className="icon" />
            <span className="sidebarlink">Nutrition</span>
          </div>
        </NavLink>
        <NavLink className="routeLink" to="/settings">
          <div className="barItem">
            <img src={settingsicon} alt="" className="icon" />
            <span className="sidebarlink">Settings</span>
          </div>
        </NavLink>
        {userId && (
          <NavLink className="routeLink" to="/login" onClick={handleClick}>
            <div className="barItem">
              <span className="sidebarlink">Sign Out</span>
            </div>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;
