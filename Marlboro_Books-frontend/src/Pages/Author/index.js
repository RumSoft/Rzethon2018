import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { AuthorDashboard, AuthorManage, AuthorInfo } from "../../Components";
import "./index.scss";

import classnames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import InfoIcon from "@material-ui/icons/Info";
import DraftsIcon from "@material-ui/icons/Drafts";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Create";
import BooksIcon from "@material-ui/icons/LibraryBooks";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

class Author extends Component {
  state = {
    open: true
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div
        className={classnames("dashboard", {
          "dashboard--open": this.state.open
        })}
      >
        <CssBaseline />
        <AppBar className="bar">
          <Toolbar disableGutters={!this.state.open}>
            {!this.state.open && (
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classnames({ hidden: this.state.open })}
              >
                <MenuIcon>asdasd</MenuIcon>
                asdas
              </IconButton>
            )}
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Author Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" className="menu">
          <Divider />
          <Link to="/Author">
            <MenuItem className="big-menu-item">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText inset primary="Dashboard" />
            </MenuItem>
          </Link>
          <Divider />
          <Link to="/Author/Manage">
            <MenuItem className="big-menu-item">
              <ListItemIcon>
                <BooksIcon />
              </ListItemIcon>
              <ListItemText inset primary="Zarządzaj zawartością" />
            </MenuItem>
          </Link>
          <Divider />
          <Link to="/Author/Info">
            <MenuItem className="big-menu-item">
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText inset primary="Info" />
            </MenuItem>
          </Link>
        </Drawer>
        <section className="content">
          <Switch>
            <Route exact path="/Author" component={AuthorDashboard} />
            <Route path="/Author/Manage" component={AuthorManage} />
            <Route path="/Author/Info" component={AuthorInfo} />
            <Route path="/Author/*" component={AuthorDashboard} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default Author;
