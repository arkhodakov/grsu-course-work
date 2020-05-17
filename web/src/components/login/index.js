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
        .post(process.env.REACT_APP_API_HOST + "api/account/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          var id = response.data.id;
          var name = response.data.name;
          var token = response.data.token;

          this.props.authenticate(id, email, name, token);

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
              error: "Oops... Something wrong",
            });
          }
        });
    }
  };

  render() {
    const exception = this.state.error ? (
      <div className="alert alert-danger mt-2 text-center" role="alert">
        {this.state.error}
      </div>
    ) : (
      <div className="alert alert-success mt-2 text-center" role="alert">
        You can connect securely
      </div>
    );
    return (
      <div className="container">
        {this.state.redirect ? <Redirect to="/dashboard" /> : null}
        <div className="row justify-content-center h-100">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Bug Tracker</h1>
                        <h1 className="h6 text-gray-900 mb-4">
                          Development footage
                        </h1>
                      </div>
                      <form
                        id="login-form"
                        className="user"
                        onSubmit={this.handleSubmit}
                        noValidate
                      >
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-user"
                            id="inputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-user"
                            id="inputPassword"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="rememberMeCheck"
                            />
                            <label
                              className="custom-control-label"
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
                      <div className="text-center">
                        <Link to="/restore" className="small">
                          Forgot Password?
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link to="/register" className="small">
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
    authenticate: (id, email, name, token) =>
      dispatch(actions.accounts.authenticate(id, email, name, token)),
    loadAccount: () => dispatch(actions.accounts.load()),
  };
};

const Component = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Component;
