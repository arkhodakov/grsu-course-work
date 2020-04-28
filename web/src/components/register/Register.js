import React from "react";
import { Link } from "react-router-dom";

import "./Register.css";

export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordCheck: "",
      firstName: "",
      lastName: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const valid = e.target.checkValidity();

    if (value !== null && value !== "") {
      e.target.classList.remove("valid", "invalid");
      e.target.classList.add(valid ? "valid" : "invalid");
    } else {
      e.target.classList.remove("valid", "invalid");
    }

    this.setState({
      [name]: value
    });

    var form = document.getElementById("register-form")
    var submitButton = document.getElementById("submitButton");
    submitButton.disabled = !form.checkValidity()
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div class="container">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form id="register-form" class="user" onSubmit={this.handleSubmit} noValidate>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          name="firstName"
                          class="form-control form-control-user"
                          id="firstName"
                          placeholder="First Name"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="text"
                          name="lastName"
                          class="form-control form-control-user"
                          id="lastName"
                          placeholder="Last Name"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        type="email"
                        name="email"
                        class="form-control form-control-user"
                        id="inputEmail"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          name="password"
                          class="form-control form-control-user"
                          id="inputPassword"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                      <div class="col-sm-6">
                        <input
                          type="password"
                          name="passwordCheck"
                          class="form-control form-control-user"
                          id="passwordCheck"
                          placeholder="Repeat Password"
                          value={this.state.passwordCheck}
                          onChange={this.handleChange}
                          required
                        />
                      </div>
                    </div>
                    <button
                      id="submitButton"
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                      disabled
                    >
                      Register Account
                    </button>
                  </form>
                  <hr />
                  <div class="text-center">
                    <Link class="small" to="/restore">
                      Forgot Password?
                    </Link>
                  </div>
                  <div class="text-center">
                    <Link class="small" to="/login">
                      Already have an account? Login!
                    </Link>
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
