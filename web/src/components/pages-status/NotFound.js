import React from "react";
import { Link } from "react-router-dom";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="text-center mt-h">
          <div class="error mx-auto" data-text="404">
            404
          </div>
          <p class="lead text-gray-800 mb-5">Page Not Found</p>
          <p class="text-gray-500 mb-0">How did you even get here...<i class="far fa-laugh-beam"></i></p>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    );
  }
}