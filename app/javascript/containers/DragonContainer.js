import React, { Component } from "react";
import RecipeTile from "../tiles/RecipeTile";
import DayContainer from "./DayContainer"
import RecipeContainer from "./RecipeContainer"
import UnusedContainer from "./UnusedContainer"


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
						bgcolor: "red"}]
		});
	};

	onDragStart = (ev, id) => {
		ev.dataTransfer.setData("id", id);
	};

	onDragOver = (ev) => {
		// if classname like draggable, update the style
		ev.preventDefault();
		ev.target.style.background = "purple"
	};

	onDragLeave = (ev) => {
		ev.preventDefault();
		ev.target.style.background = ""
	};

	onDrop = (ev, cat) => {       
  let id = ev.dataTransfer.getData("id");
  let recipes = this.state.recipes.filter((recipe) => {
      if (recipe.name == id) {
               recipe.used = cat;
               recipe.bgcolor = "green"           
      }              
       return recipe;       
   });        
   this.setState({           
      ...this.state,           
      recipes       
   });    
	}

	render() {

// the plan:
// dragon container will control all state
// unused recipes will go into its own container => need to create unused container and populate it with recipe tiles
// used recipes will be mapped into recipe tiles, but first they should go into day containers... and meal container? yeah. wait, no. how about build the div with three tiles in it? hmmmm

// definitions:
// ok so dragon container is the top level parent
// unused container is inside dragon container, it has recipe tiles
// a recipe contains food data
// a meal is a time to eat (3/day)
// a day is the day of the week

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
					className="dragon-box draggable"
					style={{backgroundColor:r.bgcolor}}
				>
				{r.name}
				</div>
			);
		});





		return (
			<div className="container-drag">
    		<h2 className="header">Drag a Recipe</h2>
    				<div className="row">
							<div className="small-7 medium-7 large-7 columns droppable"
							onDragOver={(e)=>this.onDragOver(e)}
							onDragLeave={(e)=>this.onDragLeave(e)}
							onDrop={(e)=>this.onDrop(e, "sunday")}>
								<span className="task-header">Sunday</span>
									{recipes.sunday}                
							</div>   


							<div className="small-7 medium-7 large-7 columns droppable"
							onDragOver={(e)=>this.onDragOver(e)}
							onDragLeave={(e)=>this.onDragLeave(e)}
							onDrop={(e)=>this.onDrop(e, "monday")}>

							<span className="task-header">Monday</span>

							{recipes.monday}                
							</div> 




 </div>
					<div>
					
					<UnusedContainer
						recipes={recipes.unused}
						onDragOver={this.onDragOver}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
						/>
					</div>
 </div>
		);
	}
}

export default DragonContainer