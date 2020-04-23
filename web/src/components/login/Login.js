import React from "react";
import { Link } from "react-router-dom";

import "./Login.css";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div class="container">
        <div class="row justify-content-center h-100">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Husky Bug Tracker</h1>
                        <h1 class="h6 text-gray-900 mb-4">
                          Development footage
                        </h1>
                      </div>
                      <form class="user">
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control form-control-user"
                            id="inputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            id="inputPassword"
                            placeholder="Password"
                          />
                        </div>
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              class="custom-control-label"
                              for="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <Link
                          to="/dashboard"
                          class="btn btn-primary btn-user btn-block"
                        >
                          Login
                        </Link>
                      </form>
                      <hr />
                      <div class="text-center">
                        <Link to="/restore" class="small">
                          Forgot Password?
                        </Link>
                      </div>
                      <div class="text-center">
                        <Link to="/register" class="small">
                          Create an Account!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
