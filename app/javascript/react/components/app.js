import React from 'react'
import { Route, IndexRoute, Router, browserHistory, Link } from "react-router";
import WeekContainer from "../../containers/WeekContainer";
import DragonContainer from "../../containers/DragonContainer";

const App = props => {
  return (
  	<div>
  		<Router history={browserHistory}>
	  		<Route path="/weeks/:id" component= {DragonContainer} />
	  	</Router>
  	</div>
  );
};

export default App