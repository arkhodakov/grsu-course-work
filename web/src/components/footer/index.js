import React from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return (
      <footer class="page-footer font-small bg-dark text-light">
        <div class="container text-center text-md-left pt-5">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 class="text-uppercase font-weight-bold">CW: Projects</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto bg-white"
                style={{ width: 60 + "px" }}
              />
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase font-weight-bold">Products</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto bg-white"
                style={{ width: 60 + "px" }}
              />
              <p>
                <Link to="/" class="footer-link">
                  Bug Tracker
                </Link>
              </p>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase font-weight-bold">Useful links</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto bg-white"
                style={{ width: 60 + "px" }}
              />
              <p>
                <Link to="/account" class="footer-link">
                  Your Account
                </Link>
              </p>
              <p>
                <Link to="/dashboard" class="footer-link">
                  Dashboard
                </Link>
              </p>
              <p>
                <Link to="/help" class="footer-link">
                  Help
                </Link>
              </p>
            </div>

            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase font-weight-bold">Contact</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto bg-white"
                style={{ width: 60 + "px" }}
              />
              <p>
                <i class="fa fa-home mr-1"></i> BY, Grodno, 22 Ozheshko str.
              </p>
              <p>
                <i class="fa fa-envelope mr-1"></i> bugtracker@gmail.com
              </p>
            </div>
          </div>
          <div class="footer-copyright text-center py-3">
            © 2020 Copyright: Artem Khodakov, Ekaterina Makarova
          </div>
        </div>
      </footer>
    );
  }
}
