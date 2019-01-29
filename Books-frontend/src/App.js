import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFound, Author, Ztm } from "./Pages/";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Author" component={Author} />
          <Route path="/Ztm" component={Ztm} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
