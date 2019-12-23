import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Favourite } from "./components/Favourite";
import { Home } from "./components/Home";
import { NoMatchPage } from "./components/NoMatchPage";
import history from "./utils/history";
import { PrivateRoute } from "./components/PrivateRoute";

export const App = () => {
  return (
    <Router history={history}>
      <header>
        <NavBar />
      </header>
      <Switch>
        <Route path="/" exact />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/favourite" component={Favourite} />
        <Route component={NoMatchPage} />
      </Switch>
    </Router>
  );
};
