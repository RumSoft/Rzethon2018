import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { ZtmDashboard } from "../../Components";
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
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuList from "@material-ui/core/MenuList";
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

export default class Ztm extends Component {
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
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classnames({ hidden: this.state.open })}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              ZTM Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" className="menu">
          <Divider />
          <Link to="/Ztm">
            <MenuItem className="big-menu-item">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText inset primary="Dashboard" />
            </MenuItem>
          </Link>
          <Divider />
          <Link to="/Ztm">
            <MenuItem className="big-menu-item">
              <ListItemIcon>
                <BooksIcon />
              </ListItemIcon>
              <ListItemText inset primary="Pobierz dane" />
            </MenuItem>
          </Link>
        </Drawer>
        <Router>
          <section className="content">
            <Switch>
              <Route exact path="/Ztm" component={ZtmDashboard} />
              <Route path="/Ztm/*" component={ZtmDashboard} />
            </Switch>
          </section>
        </Router>
      </div>
    );
  }
}
