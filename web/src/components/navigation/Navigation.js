import React from "react";
import { Link } from "react-router-dom";

export default class NavigationBar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img
            src="logo.png"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />{" "}
          Husky Bug Tracker
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggle"
          aria-controls="navbarToggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggle">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>

          <div class="btn-group mr-right">
            <Link to="/login" class="mr-2">
              <button type="button" class="btn btn-success">
                <span class="mr-2">Login</span>
                <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </Link>
            <Link to="/register">
              <button type="button" class="btn btn-success">
                <span class="mr-2">Sign Up</span>
                <i class="fa fa-user-plus" aria-hidden="true"></i>
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
