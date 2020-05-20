import React from "react";
import axios from "axios";
import chroma from "chroma-js";

import Select from "react-select";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const priorities = [
  { value: "LOW", label: "Low", color: "#1cc88a" },
  { value: "MEDIUM", label: "Medium", color: "#f6c23e" },
  { value: "HIGH", label: "High", color: "#e74a3b" },
];

const statuses = [
  { value: "TO_DO", label: "To Do", color: "#1cc88a" },
  { value: "IN_PROGRESS", label: "In Progress", color: "#f6c23e" },
  { value: "DONE", label: "Done", color: "#e74a3b" },
];

export default class EditIssueModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: null,
      content: null,
      assignee: null,
      priority: null,
      status: null,
      project: null,
      due_date: null,
      users: [],
      projects: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...props.issue,
      users: props.users,
      projects: props.projects,
    });
  }

  componentDidMount() {
    const dayPicker = document.getElementsByClassName("DayPickerInput")[1];
    const input = dayPicker.children[0];

    input.classList.add("form-control");
    input.setAttribute("name", "due_date");

    this.setState({});
  }

  onDateChange = (date) => {
    this.setState({
      due_date: date,
    });
  };

  onChange = (e, name) => {
    if (e.target) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    } else {
      this.setState({
        [name]: e.value,
      });
    }
  };

  onSave = (e) => {
    e.target.disabled = true;

    var body = {
      id: this.state.id,
      name: this.state.name,
      content: this.state.content,
      assignee: this.state.assignee,
      priority: this.state.priority,
      status: this.state.status,
      project: this.state.project,
      due_date: this.state.due_date,
    };

    axios
      .put(process.env.REACT_APP_API_HOST + "api/issues", body)
      .then((response) => {
        console.log(response)
        this.props.update();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log("Error message: " + error.response.data.message);
        }
      });

    e.target.disabled = false;

    this.props.update();
  };

  render() {
    var users = this.state.users.map((item) => {
      return { value: item.id, label: item.name };
    });

    var projects = this.state.projects.map((item) => {
      return { value: item.id, label: item.name };
    });

    return (
      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        id="issue-edit-modal"
        aria-labelledby="issue-edit-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit existing issue</h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                data-dismiss="modal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Title"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                      <small className="form-text text-muted">
                        Shortly describe your idea or your problem
                      </small>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="content"
                        rows="3"
                        value={this.state.content}
                        onChange={this.onChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label>Assignee</label>
                    <Select
                      name="assignee"
                      options={users}
                      value={users.find(
                        (user) => user.id === this.state.assignee
                      )}
                      onChange={(data) => this.onChange(data, "assignee")}
                    />

                    <hr />

                    <label>Priority</label>
                    <Select
                      name="priority"
                      options={priorities}
                      styles={colourStyles}
                      value={priorities.find(
                        (priority) => priority.value === this.state.priority
                      )}
                      onChange={(data) => this.onChange(data, "priority")}
                    />

                    <hr />

                    <label>Status</label>
                    <Select
                      name="status"
                      options={statuses}
                      styles={colourStyles}
                      value={statuses.find(
                        (status) => status.value === this.state.status
                      )}
                      onChange={(data) => this.onChange(data, "status")}
                    />

                    <hr />

                    <label>Project</label>
                    <Select
                      name="project"
                      options={projects}
                      value={projects.find(
                        (project) => project.id === this.state.project
                      )}
                      onChange={(data) => this.onChange(data, "project")}
                    />

                    <hr />

                    <div className="text-center w-100">
                      <DayPickerInput
                        onDayChange={this.onDateChange}
                        value={new Date(this.state.due_date)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  data-dismiss="modal"
                  onClick={this.onSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
