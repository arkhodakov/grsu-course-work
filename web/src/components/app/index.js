import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "../home";
import Dashboard from "../dashboard";

import Login from "../login";
import Register from "../register";

import NotFoundPage from "../pages-status/NotFound";
import ForbiddenPage from "../pages-status/Forbidden";

import "./style.css";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/login" component={Login} />
          <Route excat path="/register" component={Register} />

          <Route exact path="/status/forbidden" component={ForbiddenPage} />
          <Route exact path="/status/notfound" component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
