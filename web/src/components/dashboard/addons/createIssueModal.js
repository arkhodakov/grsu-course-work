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

export default class CreateIssueModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: null,
      content: null,
      assignee: null,
      priority: null,
      project: null,
      due_date: null,
      users: [],
      projects: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      users: props.users,
      projects: props.projects,
    });
  }

  componentDidMount() {
    const dayPicker = document.getElementsByClassName("DayPickerInput")[0];
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

  onCreate = (e) => {
    var body = {
      title: this.state.title,
      content: this.state.content,
      assignee: this.state.assignee,
      priority: this.state.priority,
      project: this.state.project,
      due_date: this.state.due_date,
    };

    axios
      .post(process.env.REACT_APP_API_HOST + "api/v1/issues", body)
      .then((response) => {
        this.props.updateIssues();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log("Error message: " + error.response.data.message);
        }
      });
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
        id="issue-create-modal"
        aria-labelledby="issue-create-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create new issue</h5>
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
                        name="title"
                        placeholder="Title"
                        onChange={this.onChange}
                      />
                      <small className="form-text text-muted">
                        We'll never share your email with anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="content"
                        rows="3"
                        onChange={this.onChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label>Assignee</label>
                    <Select
                      name="assignee"
                      options={users}
                      onChange={(data) => this.onChange(data, "assignee")}
                    />

                    <hr />

                    <label>Priority</label>
                    <Select
                      name="priority"
                      options={[
                        { value: "LOW", label: "Low", color: "#1cc88a" },
                        { value: "MEDIUM", label: "Medium", color: "#f6c23e" },
                        { value: "HIGH", label: "High", color: "#e74a3b" },
                      ]}
                      styles={colourStyles}
                      onChange={(data) => this.onChange(data, "priority")}
                    />

                    <hr />

                    <label>Project</label>
                    <Select
                      name="project"
                      options={projects}
                      onChange={(data) => this.onChange(data, "project")}
                    />

                    <hr />

                    <div className="text-center w-100">
                      <DayPickerInput onDayChange={this.onDateChange} />
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
                  onClick={this.onCreate}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
