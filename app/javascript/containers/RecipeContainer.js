import React, { Component } from "react";

class RecipeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	};
	
	componentDidMount() {

	}

	render() {
		return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </div>
		);
	}
}

export default RecipeContainer