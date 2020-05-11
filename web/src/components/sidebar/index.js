import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

export default class Sidebar extends React.Component {
  render() {
    return (
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        id="accordionSidebar"
      >
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <img src="./logo.png" style={{ width: 45 + "px" }} alt="sidebar-logo"/>
          </div>
        </a>

        <hr class="sidebar-divider my-0" />

        <li class="nav-item active">
          <Link class="nav-link" to="/dashboard">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr class="sidebar-divider" />

        <div class="sidebar-heading">Account</div>

        <li class="nav-item">
          <a class="nav-link" href="charts.html">
            <i class="fas fa-user-circle"></i>
            <span>Profile</span>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="tables.html">
            <i class="fas fa-sliders-h"></i>
            <span>Settings</span>
          </a>
        </li>
      </ul>
    );
  }
}
