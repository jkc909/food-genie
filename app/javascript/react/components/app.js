import React from 'react'
import { Route, IndexRoute, Router, Link } from "react-router";
import DragonContainer from "../../containers/DragonContainer";
import RecipesContainer from "../../containers/RecipesContainer"

const App = props => {
  return (
  	<div>
  		<Router>
	  		<Route path="/weeks/:id" component= {DragonContainer} />
				<Route path="/weeks/:id/recipes" component= {RecipesContainer} />
	  	</Router>
  	</div>
  );
};

export default App