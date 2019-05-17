import React, { Component } from "react";
import RecipeTile from "../tiles/RecipeTile";
import DayContainer from "./DayContainer"
import RecipeContainer from "./RecipeContainer"
import UnusedContainer from "./UnusedContainer"
import MealContainer from "./MealContainer"

class DragonContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// recipes: [] });
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
		};
	};

	componentDidMount() {
		this.setState({
			// recipes:
			// 		[{name: "recp1",
			// 			used: "unused",
			// 			bgcolor: "red"},
			// 		{name: "recp2",
			// 			used: "unused",
			// 			bgcolor: "red"},
			// 		{name: "recp3",
			// 			used: "unused",
			// 			bgcolor: "red"}]
		});
	};

	onDragStart = (ev, id) => {
		ev.dataTransfer.setData("id", id);
	};

	onDragOver = (ev, id, drop) => {
		ev.preventDefault();
		ev.dataTransfer.setData("droppable_id", id);
		if (drop == "drop") {
			ev.target.style.background = "purple"
		}
	};

	onDragLeave = (ev) => {
		ev.preventDefault();
		ev.dataTransfer.setData("droppable_id", "");
		ev.target.style.background = ""
	};

	onDrop = (ev, cat) => {
debugger;
	ev.target.style.background = ""
  var id = ev.dataTransfer.getData("id");
  let recipes = this.state.recipes.filter((recipe) => {
			if (recipe.used == cat) {
				recipe.used = "unused"
			}
			if (recipe.name == id) {
               recipe.used = cat;
      }
       return recipe;
   });
	 // ev.dataTransfer.clearData()
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


	// let recipes = [[],[],[],[],[],[],[],[]]



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
		this.state.recipes.forEach (r => {
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
			)
		});


			let unused_recipes = recipes[Object.keys(recipes)[0]]
			delete recipes["unused"]




		let thisthing =	Object.keys(recipes).map(recipe =>
				<div
					key={recipe}
					className="droppable meal-container"
					onDragOver={(e)=>this.onDragOver(e, recipe, "drop")}
					onDragLeave={(e)=>this.onDragLeave(e)}
					onDrop={(e)=>this.onDrop(e, recipe)}>
					{recipe}
				</div>
)

		return (
			<div className="container-drag">
    		<h2 className="header">TEST</h2>
    				<div className="row">



{thisthing}




 </div>
					<div>

					<UnusedContainer
						recipes={unused_recipes}
						onDragOver={(e)=>this.onDragOver(e, "unused")}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
						/>
					</div>
 </div>
		);
	}
}

export default DragonContainer
