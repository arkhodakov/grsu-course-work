import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Footer from "../footer";

import * as actions from "../../actions";

import "./style.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
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

  render() {
    return (
      <div id="landing-container">
        {this.state.redirect ? <Redirect to="/dashboard" /> : null}
        <section className="jumbotron bg-white">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h1>Bug Tracker</h1>
                <p className="lead text-muted">
                  Something short and leading about the collection below—its
                  contents, the creator, etc. Make it short and sweet, but not
                  too short so folks don’t simply skip over it entirely.
                </p>
                <a
                  href="https://github.com/akhodakov/grsu-course-work"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-github"></i>
                </a>
                <a
                  href="/login"
                  role="button"
                  aria-pressed="true"
                  className="ml-3 btn btn-primary"
                >
                  Get Started
                </a>
              </div>
              <div className="col-md-6 d-none d-lg-block bg-home"></div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { account: state.account };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAccount: () => dispatch(actions.accounts.load()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
