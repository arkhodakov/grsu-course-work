import React from "react";
import { Link } from "react-router-dom";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="text-center mt-h">
          <div class="error mx-auto" data-text="403">
            403
          </div>
          <p class="lead text-gray-800 mb-5">Access Forbidden</p>
          <p class="text-gray-500 mb-0">You don't have permissions to use this resource</p>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    );
  }
}
