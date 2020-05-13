import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import Plot from "react-plotly.js";

import axios from "axios";

import Navigation from "../navigation";
import Sidebar from "../sidebar";

import IssueModal from "./addons/createIssueModal";
import { Text } from "../utils/text";

import * as actions from "../../actions";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./style.css";

const updateIssues = (next) => {
  axios
    .get(process.env.REACT_APP_API_HOST + "api/v1/issues")
    .then((response) => {
      var issues = response.data.issues;
      console.log("Successfully updated issues!", issues);
      next(issues);
    })
    .catch((error) => {
      console.log("Error during issues update!");
      if (error.response) {
        console.log("Error message: " + error.response.data.message);
      }
      console.error(error);
    });
};

const updateProjects = (next) => {
  axios
    .get(process.env.REACT_APP_API_HOST + "api/v1/projects")
    .then((response) => {
      var projects = response.data.projects;
      console.log("Successfully updated projects!", projects);
      next(projects);
    })
    .catch((error) => {
      console.log("Error during projects update!");
      if (error.response) {
        console.log("Error message: " + error.response.data.message);
      }
      console.error(error);
    });
};

const updateUsers = (next) => {
  axios
    .get(process.env.REACT_APP_API_HOST + "api/v1/users")
    .then((response) => {
      var users = response.data.users;
      console.log("Successfully updated users!", users);
      next(users);
    })
    .catch((error) => {
      console.log("Error during users update!");
      if (error.response) {
        console.log("Error message: " + error.response.data.message);
      }
      console.error(error);
    });
};

const statusPie = (issues) => {
  var values = [];
  var labels = [];

  const to_do = issues.filter((x) => x.status === "TO_DO").length;
  if (to_do !== 0) {
    values.push(to_do);
    labels.push("To Do");
  }

  const in_progress = issues.filter((x) => x.status === "IN_PROGRESS").length;
  if (in_progress !== 0) {
    values.push(in_progress);
    labels.push("In Progress");
  }

  const done = issues.filter((x) => x.status === "DONE").length;
  if (done !== 0) {
    values.push(done);
    labels.push("Done");
  }

  return (
    <Plot
      style={{ margin: 5 + "px", width: 95 + "%" }}
      data={[
        {
          values: values,
          labels: labels,
          type: "pie",
          textinfo: "label+percent",
          textposition: "outside",
          automargin: true,
        },
      ]}
      layout={{
        showlegend: false,
        title: "<b>Status</b><br />Issues status pie char",
        font: {
          size: 16,
        },
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
    />
  );
};

const priorityPie = (issues) => {
  var values = [];
  var labels = [];
  var colors = [];

  const low = issues.filter((x) => x.priority === "LOW").length;
  if (low !== 0) {
    values.push(low);
    labels.push("Low");
    colors.push("rgb(28, 200, 138)");
  }

  const medium = issues.filter((x) => x.priority === "MEDIUM").length;
  if (medium !== 0) {
    values.push(medium);
    labels.push("Medium");
    colors.push("#f6c23e");
  }

  const high = issues.filter((x) => x.priority === "HIGH").length;
  if (high !== 0) {
    values.push(high);
    labels.push("High");
    colors.push("#e74a3b");
  }

  return (
    <Plot
      style={{ margin: 5 + "px", width: 95 + "%" }}
      data={[
        {
          y: values,
          x: labels,
          type: "bar",
          marker: {
            color: colors,
          },
          textinfo: "label+percent",
          textposition: "outside",
          automargin: true,
        },
      ]}
      layout={{
        autosize: true,
        showlegend: false,
        title: "<b>Priority</b><br />Issues priority bar chart",
        font: {
          size: 16,
        },
      }}
      config={{
        responsive: true,
        displayModeBar: false,
      }}
    />
  );
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      updated: false,
      issues: [],
      projects: [],
      users: [],
    };
  }

  componentWillUpdate(props, state) {
    if (!this.state.updated) {
      if (
        state.issues.length > 0 &&
        state.projects.length > 0 &&
        state.users.length > 0
      ) {
        this.setState({
          updated: true,
        });
      }
    }
  }

  componentWillMount() {
    this.props.loadAccount();

    updateIssues((issues) => this.setState({ issues: issues }));

    updateProjects((projects) => this.setState({ projects: projects }));

    updateUsers((users) => this.setState({ users: users }));
  }

  componentDidUpdate() {
    if (!this.props.account.isAuthenticated && !this.state.redirect) {
      this.setState({
        redirect: true,
      });
    }
  }

  getIssues(issues) {
    return (
      <div className="list-group w-100">
        {issues.map((item) => {
          var date = new Date(item.due_date);
          var timeLeft = Math.round(
            (date.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
          );

          var border = null;
          switch (item.priority) {
            case "HIGH":
              border = "border-left-danger";
              break;

            case "MEDIUM":
              border = "border-left-warning";
              break;

            case "LOW":
              border = "border-left-success";
              break;

            default:
              border = "";
              break;
          }

          var status = null;
          var color = null;
          switch (item.status) {
            case "TO_DO":
              status = "To Do";
              color = "dark";
              break;

            case "IN_PROGRESS":
              status = "In Progress";
              color = "primary";
              break;

            case "DONE":
              status = "Done";
              color = "success";
              break;

            default:
              status = "Unknown";
              color = "secondary";
              break;
          }

          var statusContent = (<span className={"text-" + color}>{status}</span>)

          var assignee = this.state.users.find((x) => x.id === item.assignee);
          var assigneeContent = assignee ? (
            <span>
              Assignee: <b>{assignee.name}</b>
            </span>
          ) : null;

          return (
            <li
              key={item.id}
              className={
                "list-group-item list-group-item-action flex-column align-items-start " +
                border
              }
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  <Text content={item.name} limit={60} />
                </h5>
                <small>
                  <b>{timeLeft}</b> days left
                </small>
              </div>
              <p className="mb-1">
                <Text content={item.content} limit={120} />
              </p>
              <small>
                {assigneeContent} - {statusContent}
              </small>
            </li>
          );
        })}
      </div>
    );
  }

  render() {
    var myIssuesList = this.state.issues.filter(
      (x) => x.assignee === Number(this.props.account.id)
    );

    if (!myIssuesList) {
      myIssuesList = [];
    }

    const myIssues =
      myIssuesList.length !== 0 ? (
        this.getIssues(myIssuesList)
      ) : (
        <div className="ml-auto mr-auto mt-auto mb-auto text-center">
          <i className="far fa-laugh-beam" style={{ fontSize: 42 + "px" }}></i>
          <p>You've done all your tasks. Congratulations!</p>
        </div>
      );

    const issues =
      this.state.issues.length !== 0 ? (
        this.getIssues(this.state.issues)
      ) : (
        <div className="ml-auto mr-auto mt-auto mb-auto text-center">
          <i className="far fa-meh" style={{ fontSize: 42 + "px" }}></i>
          <p>No project tasks. Is this even real?</p>
        </div>
      );

    const projects = this.state.projects.map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

    const graphs =
      this.state.issues.length !== 0 ? (
        <div className="card-columns">
          <div className="card border-0">{statusPie(this.state.issues)}</div>
          <div className="card border-0">{priorityPie(this.state.issues)}</div>
        </div>
      ) : (
        <div className="ml-auto mr-auto mt-auto mb-auto text-center">
          <i className="fas fa-chart-pie" style={{ fontSize: 42 + "px" }}></i>
          <p>There are no any issues to calculate statistics!</p>
        </div>
      );

    const content = (
      <div className="row my-4">
        <div className="col-md-8 col-lg-6 col-xl-4 mb-1em mx-auto">
          <div className="card shadow-sm w-100">
            <div className="card-header py-3">
              <div className="d-flex justify-content-between">
                <h6 className="my-auto font-weight-bold text-primary">
                  <i className="fas fa-project-diagram"></i> Projects Issues
                </h6>
                <div className="input-group w-50 pl-3">
                  <select
                    className="custom-select"
                    onChange={() => {}}
                    defaultValue={0}
                  >
                    <option value="0">All</option>
                    {projects}
                  </select>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="card-title">
                There are <b>{this.state.issues.length}</b> issues to do!
              </p>
              <hr />
              <div className="card-issues d-flex">{issues}</div>
            </div>
          </div>
        </div>

        <div className="col-md-8 col-lg-6 col-xl-4 mb-1em mx-auto">
          <div className="card shadow-sm w-100">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h6 className="my-auto font-weight-bold text-primary">
                  <i className="fas fa-tasks"></i> My Issues
                </h6>
                <a
                  type="button"
                  href="#issue-create-modal"
                  className="btn btn-primary btn-icon-split text-light"
                  data-toggle="modal"
                  data-target="#issue-create-modal"
                >
                  <span className="icon text-white-50">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span className="text">Create</span>
                </a>
              </div>
            </div>
            <div className="card-body">
              <p className="card-title">
                You have <b>{myIssuesList.length}</b> issues to do!
              </p>
              <hr />
              <div className="card-issues d-flex">{myIssues}</div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-12 col-xl-4 mb-1em mx-auto">
          <div className="card shadow-sm">
            <a
              href="#statistics"
              className="d-block card-header py-3"
              data-toggle="collapse"
              role="button"
              aria-expanded="true"
              aria-controls="statistics"
            >
              <h6 className="my-auto font-weight-bold text-primary">
                <i className="fas fa-poll"></i> Projects Statistics
              </h6>
            </a>
            <div className="collapse show" id="statistics">
              {graphs}
            </div>
          </div>
        </div>
      </div>
    );

    const loader = (
      <div className="row d-flex" style={{ minHeight: 90 + "vh" }}>
        <div className="m-auto text-center">
          <Loader type="Grid" color="#00BFFF" height={100} width={100} />
          <h4 className="my-3 text-muted">
            Getting everything done. Wait, please!
          </h4>
        </div>
      </div>
    );

    return (
      <div id="dashboard">
        {this.state.redirect ? <Redirect to="/login" /> : null}
        <Navigation />

        <div id="container-wrapper">
          <Sidebar />

          <IssueModal
            projects={this.state.updated ? this.state.projects : []}
            users={this.state.updated ? this.state.users : []}
            updateIssues={() =>
              updateIssues((issues) => this.setState({ issues }))
            }
          />
          <div id="dashboard-wrapper" className="d-flex flex-column">
            <div className="container-fluid">
              {this.state.updated ? content : loader}
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
    issues: state.issues.list,
    projects: state.projects.list,
    users: state.users.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAccount: () => dispatch(actions.accounts.load()),
    update_projects: (projects) => dispatch(actions.projects.update(projects)),
    update_issues: (issues) => dispatch(actions.issues.update(issues)),
    update_users: (users) => dispatch(actions.users.update(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
