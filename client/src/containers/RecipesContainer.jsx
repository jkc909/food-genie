import React from 'react';

const RecipesContainer = props => {
    if (props.recipes) {props.recipes.shift()}
    
	return (
    <div className="recipes-container unused"
                onDragOver={(e)=>props.onDragOver(e, 1)}
                onDragLeave={(e)=>props.onDragLeave(e)}
                onDrop={(e)=>{props.onDrop(e, 1, 0)}}>
            {props.recipes}
        </div>
		);
    }

export default RecipesContainer
