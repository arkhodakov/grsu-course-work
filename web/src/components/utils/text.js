import React from "react";
import "./text.css";

export class Text extends React.Component {
  render() {
    const { content, limit } = this.props;
    if (content.length <= limit) {
      return <span>{content}</span>;
    } else {
      return <span>{content.substring(0, limit) + "..."}</span>;
    }
  }
}
