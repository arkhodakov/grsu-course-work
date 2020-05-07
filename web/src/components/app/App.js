import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "../../reducers";

import Home from "../home/Home";
import Dashboard from "../dashboard/Dashboard";

import Login from "../login/Login";
import Register from "../register/Register";

import NotFoundPage from "../pages-status/NotFound";
import ForbiddenPage from "../pages-status/Forbidden";

import "./App.css";

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
