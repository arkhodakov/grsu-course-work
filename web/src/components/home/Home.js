import React from "react";
import { Link } from "react-router-dom";

import Footer from "../footer/Footer";

import "./Home.css";

export default class Home extends React.Component {
  render() {
    return (
      <div id="landing-container">
        <header>
          <div class="bg-dark collapse" id="navigation-bar">
            <div class="container">
              <div class="row">
                <div class="col-sm-8 col-md-7 py-4">
                  <h4 class="text-white">About</h4>
                  <p class="text-muted">qwe</p>
                </div>
                <div class="col-sm-2 py-4">
                  <h4 class="text-white">Artem Khodakov</h4>
                  <p class="text-muted mb-0">Software Developer</p>
                  <hr
                    class="mt-0 mb-1 d-inline-block mx-auto bg-white"
                    style={{ width: 60 + "px" }}
                  />
                  <ul class="list-unstyled">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/artemkhodakov/"
                        class="text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link to LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/akhodakov"
                        class="text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link to GitHub
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-sm-2 py-4">
                  <h4 class="text-white">Ekaterina Makarova</h4>
                  <p class="text-muted mb-0">QA Engineer</p>
                  <hr
                    class="mt-0 mb-1 d-inline-block mx-auto bg-white"
                    style={{ width: 60 + "px" }}
                  />
                  <ul class="list-unstyled">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/ekaterina-makarova-mk"
                        class="text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link to LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/ekaterinamakarova"
                        class="text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Link to GitHub
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container d-flex justify-content-between">
              <a href="#" class="navbar-brand d-flex align-items-center">
                <strong>CW: Bug Tracker</strong>
              </a>
              <button
                class="navbar-toggler collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navigation-bar"
                aria-controls="navigation-bar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </header>
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
                  class="fa fa-github"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
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
