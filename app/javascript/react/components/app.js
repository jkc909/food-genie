import React from 'react'
import { Route, IndexRoute, Router, browserHistory, Link } from "react-router";
import DragonContainer from "../../containers/DragonContainer";
import RecipesContainer from "../../containers/RecipesContainer"

const App = props => {
  return (
  	<div>
  		<Router history={browserHistory}>
	  		<Route path="/weeks/:id" component= {DragonContainer} />
				<Route path="/weeks/:id/recipes" component= {RecipesContainer} />
	  	</Router>
  	</div>
  );
};

export default App