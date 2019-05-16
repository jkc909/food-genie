import React, { Component } from "react";
import RecipeTile from "../tiles/RecipeTile";
import DayContainer from "./DayContainer"
import RecipeContainer from "./RecipeContainer"


class DragonContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		};
	};
	
	componentDidMount() {
		this.setState({
			recipes: 
					[{name: "recp1",
						used: "unused",
						bgcolor: "red"},
					{name: "recp2",
						used: "unused",
						bgcolor: "red"},
					{name: "recp3",
						used: "unused",
						bgcolor: "blue"}]
		});
	};

	onDragStart = (ev, id) => {
		console.log('dragstart:', id);
		ev.dataTransfer.setData("id", id);
	};

	onDragOver = (ev) => {
		ev.preventDefault();
	};

	onDrop = (ev, cat) => {       
  let id = ev.dataTransfer.getData("id");
  let recipes = this.state.recipes.filter((recipe) => {
      if (recipe.name == id) {
               recipe.used = cat;           
      }              
       return recipe;       
   });        
   this.setState({           
      ...this.state,           
      recipes       
   });    
	}

	render() {


		let recipes = {
			unused: [],
			sunday: [],
			monday: [],
			tuesday: [],
			wednesday: [],
			thursday: [],
			friday: [],
			saturday: []
		}

		this.state.recipes.forEach ((r) => {
			recipes[r.used].push(
				<div 
					key={r.name}
					onDragStart={(e)=>this.onDragStart(e, r.name)}
					draggable
					className="draggable"
					style = {{backgroundColor:r.bgcolor}}
				>
				{r.name}
				</div>
				);
			// used_recipes = recipes.filter(r => r.used = "unused");
		});

		return (
			<div className="container-drag">
    		<h2 className="header">Drag a Recipe</h2>
					<div className="unused" 
					 onDragOver={(e)=>this.onDragOver(e)}
					 onDrop={(e)=>{this.onDrop(e, "unused")}}>

					<span className="task-header">Unused</span>

					{recipes.unused}  

					</div>


					<div className="row">

					<div className="small-7 medium-7 large-7 columns droppable"
					onDragOver={(e)=>this.onDragOver(e)}

					onDrop={(e)=>this.onDrop(e, "sunday")}>

					<span className="task-header">Sunday</span>

					{recipes.sunday}                
					</div>   


					<div className="small-7 medium-7 large-7 columns droppable"
					onDragOver={(e)=>this.onDragOver(e)}

					onDrop={(e)=>this.onDrop(e, "monday")}>

					<span className="task-header">Monday</span>

					{recipes.monday}                
					</div> 



 </div>
 </div>
		);
	}
}

export default DragonContainer