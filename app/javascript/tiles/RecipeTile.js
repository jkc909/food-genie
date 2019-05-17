import React from "react";

const RecipeTile = props => {

	return (
		<div
			key={props.name}
			className={props.className}
			draggable
			style = {props.style}
			onDragStart={props.OnDragStart}
		/>
	)
};

export default RecipeTile;
