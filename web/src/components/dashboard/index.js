import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Plot from "react-plotly.js";

import Navigation from "../navigation";
import Sidebar from "../sidebar";

import * as actions from "../../actions";

import "./style.css";

const AddIssueModal = () => {
  return (
    <div
      className="modal fade"
      tabindex="-1"
      role="dialog"
      id="issue-create-modal"
      aria-labelledby="issue-create-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create new issue</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body"></div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-danger"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-outline-success">
              Save changes
            </button>
            <button type="button" class="btn btn-outline-primary">
              Push
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

class Dashboard extends React.Component {
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
    if (!this.props.account.isAuthenticated && !this.state.redirect) {
      this.setState({
        redirect: true,
      });
    }
  }

  getIssues(issues) {
    return issues.map((item) => {
      return null;
    });
  }

  render() {
    var issues =
      this.props.issues.length !== 0 ? (
        this.getIssues(this.props.issues)
      ) : (
        <div class="ml-auto mr-auto mt-auto mb-auto text-center">
          <i class="far fa-laugh-beam" style={{ fontSize: 42 + "px" }}></i>
          <p>You've done all your tasks. Congratulations!</p>
        </div>
      );

    var projectIssues =
      this.props.projectsIssues.length !== 0 ? (
        this.getIssues(this.props.issues)
      ) : (
        <div class="ml-auto mr-auto mt-auto mb-auto text-center">
          <i class="far fa-meh" style={{ fontSize: 42 + "px" }}></i>
          <p>No project tasks. Is this even real?</p>
        </div>
      );

    return (
      <div id="dashboard">
        {this.state.redirect ? <Redirect to="/login" /> : null}
        <Navigation />

        <div id="container-wrapper">
          <Sidebar />
          {AddIssueModal()}
          <div id="dashboard-wrapper" class="d-flex flex-column">
            <div class="container-fluid">
              <div class="row my-4">
                <div class="col-md-4">
                  <div class="card shadow-sm w-100">
                    <div class="card-header py-3">
                      <div class="d-flex justify-content-between">
                        <h6 class="my-auto font-weight-bold text-primary">
                          <i class="fas fa-project-diagram"></i> Projects Issues
                        </h6>
                        <div class="input-group w-50 pl-3">
                          <select class="custom-select" onChange={() => {}}>
                            <option value="0" selected>
                              Everything
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="card-body">
                      <p class="card-title">
                        There are <b>{0}</b> issues to do!
                      </p>
                      <hr />
                      <div class="card-issues d-flex">{projectIssues}</div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="card shadow-sm w-100">
                    <div class="card-header">
                      <div class="d-flex justify-content-between">
                        <h6 class="my-auto font-weight-bold text-primary">
                          <i class="fas fa-tasks"></i> My Issues
                        </h6>
                        <a
                          type="button"
                          href="#issue-create-modal"
                          class="btn btn-primary btn-icon-split text-light"
                          data-toggle="modal"
                          data-target="#issue-create-modal"
                        >
                          <span class="icon text-white-50">
                            <i class="fas fa-plus"></i>
                          </span>
                          <span class="text">Create</span>
                        </a>
                      </div>
                    </div>
                    <div class="card-body">
                      <p class="card-title">
                        You have <b>{0}</b> issues to do!
                      </p>
                      <hr />
                      <div class="card-issues d-flex">{issues}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 mx-auto">
                  <div class="card shadow-sm">
                    <a
                      href="#statistics"
                      class="d-block card-header py-3"
                      data-toggle="collapse"
                      role="button"
                      aria-expanded="true"
                      aria-controls="statistics"
                    >
                      <h6 class="my-auto font-weight-bold text-primary">
                        <i class="fas fa-poll"></i> Projects Statistics
                      </h6>
                    </a>
                    <div class="collapse show" id="statistics">
                      <div class="card-body">
                        <Plot
                          style={{ margin: 5 + "px", width: 95 + "%" }}
                          data={[
                            {
                              values: [12, 25, 26],
                              labels: ["Opened", "In progress", "Closed"],
                              type: "pie",
                              textinfo: "label+percent",
                              textposition: "outside",
                              automargin: true,
                            },
                          ]}
                          layout={{
                            autosize: true,
                            showlegend: false,
                            title: "Issues Progress",
                            font: {
                              size: 16,
                            },
                          }}
                        />
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
  return {
    account: state.account,
    issues: state.issues.issues,
    projects: state.projects.projects,
    projectsIssues: state.issues.projectsIssues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAccount: () => dispatch(actions.load()),
  };
};

const Component = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default Component;
