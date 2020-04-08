import React from "react";
// import {
//   Route,
//   Link,
//   BrowserRouter as Router,
//   Switch,
//   Redirect,
// } from "react-router-dom";
//Stylesheet
import "../css/NavBar.css";
//Components
import Navigation from "./Navigation";
import Login from "./Login";
import Register from "./Register";
import MainDashboard from "./MainDashboard";
import UserProfile from "./UserProfile";
import ExercisePage from "./ExercisePage";
import NutritionPage from "./NutritionPage";
import SettingsPage from "./SettingsPage";
//Icons
import dashboardIcon from "../assets/dashboardicon.png";
import profileicon from "../assets/profileicon.png";
import exerciseicon from "../assets/exerciseicon.png";
import nutritionicon from "../assets/nutritionicon.png";
import settingsicon from "../assets/settingsicon.png";

function NavBar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={dashboardIcon} alt="" className="logoImg" />
        <a className="teamName">Team Seg_Fault</a>
      </div>
      <div className="content">
        <a className="routeLink" href="/dashboard">
          <div className="barItem">
            <img src={dashboardIcon} alt="" className="icon" />
            <a className="sidebarlink">Dashboard</a>
          </div>
        </a>
        <a className="routeLink" href="/profile">
          <div className="barItem">
            <img src={profileicon} alt="" className="icon" />
            <a className="sidebarlink">My Profile</a>
          </div>
        </a>
        <a className="routeLink" href="/exercise">
          <div className="barItem">
            <img src={exerciseicon} alt="" className="icon" />
            <a className="sidebarlink">Exercise</a>
          </div>
        </a>
        <a className="routeLink" href="/nutrition">
          <div className="barItem">
            <img src={nutritionicon} alt="" className="icon" />
            <a className="sidebarlink">Nutrition</a>
          </div>
        </a>
        <a className="routeLink" href="/settings">
          <div className="barItem">
            <img src={settingsicon} alt="" className="icon" />
            <a className="sidebarlink">Settings</a>
          </div>
        </a>
      </div>
    </div>
  );
}

export default NavBar;
