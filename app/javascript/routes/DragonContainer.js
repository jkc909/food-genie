import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DragonContainer from "../containers/DragonContainer";
// import RecipesContainer from "../../containers/RecipesContainer"


export default (
  <Router>
    <Switch>
      <Route path="/weeks/:id" component= {DragonContainer} />
    </Switch>
  </Router>
);