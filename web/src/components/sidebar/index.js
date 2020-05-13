import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default class Sidebar extends React.Component {
  render() {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <img src="./logo.png" style={{ width: 45 + "px" }} alt="sidebar-logo"/>
          </div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Account</div>

        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <i className="fas fa-user-circle"></i>
            <span>Profile</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="tables.html">
            <i className="fas fa-sliders-h"></i>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    );
  }
}
