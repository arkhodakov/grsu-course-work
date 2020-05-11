import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";

import * as actions from "../../actions";

import "./style.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      error: null,
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.loadAccount();
  }

  componentDidUpdate() {
    if (this.props.account.isAuthenticated && !this.state.redirect) {
      this.setState({
        redirect: true,
      });
    }
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
      [name]: value,
    });

    var form = document.getElementById("login-form");
    var submitButton = document.getElementById("submitButton");
    submitButton.disabled = !form.checkValidity();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      return;
    } else {
      const email = this.state.email;
      const password = this.state.password;

      axios
        .post(process.env.REACT_APP_API_HOST + "api/v1/account/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          var name = response.data.name;
          var token = response.data.token;

          this.props.authenticate(email, name, token);

          this.setState({
            redirect: true,
          });
        })
        .catch((error) => {
          if (error.response) {
            var message = error.response.data.message;
            this.setState({
              error: message,
            });
          } else {
            this.setState({
              error: "Internal server error : 500",
            });
          }
        });
    }
  };

  render() {
    const exception = this.state.error ? (
      <div class="alert alert-danger mt-2 text-center" role="alert">
        {this.state.error}
      </div>
    ) : (
      <div class="alert alert-success mt-2 text-center" role="alert">
        You can connect securely
      </div>
    );
    return (
      <div class="container">
        {this.state.redirect ? <Redirect to="/dashboard" /> : null}
        <div class="row justify-content-center h-100">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Bug Tracker</h1>
                        <h1 class="h6 text-gray-900 mb-4">
                          Development footage
                        </h1>
                      </div>
                      <form
                        id="login-form"
                        class="user"
                        onSubmit={this.handleSubmit}
                        noValidate
                      >
                        <div class="form-group">
                          <input
                            type="email"
                            name="email"
                            class="form-control form-control-user"
                            id="inputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div class="form-group">
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
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="rememberMeCheck"
                            />
                            <label
                              class="custom-control-label"
                              for="rememberMeCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          id="submitButton"
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                          disabled
                        >
                          Login
                        </button>
                        {exception}
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

const mapStateToProps = (state) => {
  return { account: state.account };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, name, token) =>
      dispatch(actions.authenticate(email, name, token)),
    loadAccount: () => dispatch(actions.load()),
  };
};

const Component = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Component;
