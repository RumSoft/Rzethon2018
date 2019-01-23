import React from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import "./index.scss";

class NotFound extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Paper>
          <h1>Page not found</h1>
          <Divider />
          <Link to={this.props.basePath || "/"}>Home</Link>
        </Paper>
      </div>
    );
  }
}

export default NotFound;
