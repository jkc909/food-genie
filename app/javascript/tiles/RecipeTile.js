import React from "react";

const RecipeTile = props => {
	return (
		<div
			key={props.name} 
			className="dragon-box draggable"
			draggable
			style = {{backgroundColor:props.bgcolor}}
			onDragStart={(e) => this.OnDragStart(e, props.name)}
		/>
	)
};

export default RecipeTile;
