import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const RecipeViewTile = props => {

// 	<FontAwesomeIcon 
// 	icon={faPlus}  
// 	id={props.recipe.recipe_id} 
// /> 
		return (
    <div id={props.recipe.recipe_id}>
			<span className="task-header">{props.recipe.name}</span>
			<span id={props.recipe.recipe_id} style={{backgroundColor:"red", float:"right"}} onClick={props.handleClickAddRecipe}> 
				PLUS
			</span>
    </div>
		);
}

export default RecipeViewTile
