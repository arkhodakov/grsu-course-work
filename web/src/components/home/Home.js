import React from "react";
import { Link } from "react-router-dom";

import Footer from "../footer/Footer";

import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div id="landing-container">
        <section class="jumbotron bg-white">
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <h1>Bug Tracker</h1>
                <p class="lead text-muted">
                  Something short and leading about the collection below—its
                  contents, the creator, etc. Make it short and sweet, but not
                  too short so folks don’t simply skip over it entirely.
                </p>
                <a
                  href="https://github.com/akhodakov/grsu-course-work"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fa fa-github"></i>
                </a>
                <a
                  href="/login"
                  role="button"
                  aria-pressed="true"
                  class="ml-3 btn btn-primary"
                >
                  Get Started
                </a>
              </div>
              <div class="col-md-6 d-none d-lg-block bg-home"></div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
