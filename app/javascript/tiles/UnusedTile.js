import React from "react";

const UnusedTile = props => {
	// debugger;
	if (props.recipes) {
	props.recipes.shift()
	}
		return (
    <div>
    	<span className="task-header">Unused</span>
    		<div className="unused-container unused container"
						onDragOver={(e)=>props.onDragOver(e, 1)}
						onDragLeave={(e)=>props.onDragLeave(e)}
						onDrop={(e)=>{props.onDrop(e, 1)}}>
					{props.recipes}
				</div>
    </div>
		);
}

export default UnusedTile
