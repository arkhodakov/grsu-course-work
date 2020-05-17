import React from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import * as actions from "../../actions";

import "./style.css";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      error: null,
      email: "",
      password: "",
      passwordCheck: "",
      firstName: "",
      lastName: "",
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

  checkValidity() {
    var form = document.getElementById("register-form");

    var password = document.getElementsByName("password")[0];
    var passwordCheck = document.getElementsByName("passwordCheck")[0];

    var valid = form.checkValidity() * (password.value === passwordCheck.value);
    return valid;
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

    if (name === "password" || name === "passwordCheck") {
      var password = document.getElementsByName("password")[0];
      var passwordCheck = document.getElementsByName("passwordCheck")[0];

      if (password.value !== passwordCheck.value) {
        password.classList.remove("valid", "invalid");
        password.classList.add("invalid");

        passwordCheck.classList.remove("valid", "invalid");
        passwordCheck.classList.add("invalid");
      } else {
        password.classList.remove("valid", "invalid");
        password.classList.add("valid");

        passwordCheck.classList.remove("valid", "invalid");
        passwordCheck.classList.add("valid");
      }
    }

    this.setState({
      [name]: value,
    });

    var submitButton = document.getElementById("submitButton");
    submitButton.disabled = !this.checkValidity();
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const email = this.state.email;
    const name = this.state.firstName + " " + this.state.lastName;
    const password = this.state.password;

    axios
      .post(process.env.REACT_APP_API_HOST + "api/account/signup", {
        email: email,
        name: name,
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
        console.log(error);
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
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form
                    id="register-form"
                    className="user"
                    onSubmit={this.handleSubmit}
                    noValidate
                  >
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          name="firstName"
                          className="form-control form-control-user"
                          id="firstName"
                          placeholder="First Name"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          name="lastName"
                          className="form-control form-control-user"
                          id="lastName"
                          placeholder="Last Name"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-user"
                        id="inputEmail"
                        placeholder="Email Address"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
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
                      <div className="col-sm-6">
                        <input
                          type="password"
                          name="passwordCheck"
                          className="form-control form-control-user"
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
                      className="btn btn-primary btn-user btn-block"
                      disabled
                    >
                      Register Account
                    </button>
                    {exception}
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/restore">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/login">
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
