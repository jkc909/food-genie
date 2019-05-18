import React from "react";

const UnusedContainer = props => {
		return (
    <div>
    	<span className="task-header">Unused</span>
    		<div className="unused-container unused container"
						onDragOver={(e)=>props.onDragOver(e)}
						onDragLeave={(e)=>props.onDragLeave(e)}
						onDrop={(e)=>{props.onDrop(e, "unused")}}>
					{props.recipes}
				</div>
    </div>
		);
}

export default UnusedContainer
