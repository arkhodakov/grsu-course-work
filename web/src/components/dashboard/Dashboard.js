import React from "react";

import Navigation from "./Navigation";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="dashboard">
        <Navigation />
        <h1> Hello</h1>
      </div>
    );
  }
}
