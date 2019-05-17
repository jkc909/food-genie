import React from "react";

const MealContainer = props => {
		return (
    <div>
    	<span className="task-header">Unused</span>
    		<div className="unused-container unused"
						onDragOver={props.onDragOver}
						onDragLeave={props.hello}
						onDrop={(e)=>{props.onDrop(e, "unused")}}>
					{props.recipes}
				</div>
    </div>
		);
}

export default MealContainer
