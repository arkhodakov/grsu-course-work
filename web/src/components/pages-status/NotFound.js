import React from "react";
import { Link } from "react-router-dom";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="text-center mt-h">
          <div className="error mx-auto" data-text="404">
            404
          </div>
          <p className="lead text-gray-800 mb-5">Page Not Found</p>
          <p className="text-gray-500 mb-0">How did you even get here...<i className="far fa-laugh-beam"></i></p>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    );
  }
}