import React from "react";

const RecipeViewTile = props => {
		return (
    <div>
    	<span className="task-header">View {props.recipe.name}</span>
    </div>
		);
}

export default RecipeViewTile
