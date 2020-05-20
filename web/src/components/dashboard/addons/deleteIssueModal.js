import React from "react";
import axios from "axios";
import chroma from "chroma-js";

import Select from "react-select";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

const initialState = {
  id: null,
};

export default class EditIssueModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      id: props.id,
    });
  }

  onDelete = (e) => {
    if (!this.state.id) {
      return;
    }

    e.target.disabled = true;

    const body = {
      id: this.state.id,
    };

    axios
      .delete(process.env.REACT_APP_API_HOST + "api/issues", {
        data: body,
      })
      .then((response) => {
        console.log(response);
        this.props.update();
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log("Error message: " + error.response.data.message);
        }
      });

    e.target.disabled = false;
    this.setState({
      ...initialState,
    });

    this.props.update();
  };

  render() {
    return (
      <div
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        id="issue-delete-modal"
        aria-labelledby="issue-delete-modal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered delete-modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete issue: {this.state.id}</h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                data-dismiss="modal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={this.onDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
