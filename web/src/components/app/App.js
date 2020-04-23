import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "../home/Home";
import Dashboard from "../dashboard/Dashboard";

import Login from "../login/Login";
import Register from "../register/Register";

import NotFoundPage from "../pages-status/NotFound";
import ForbiddenPage from "../pages-status/Forbidden";

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
