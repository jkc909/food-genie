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
			recipes:
					[{name: "recp1",
						used: "unused",
						bgcolor: "red"},
					{name: "recp2",
						used: "unused",
						bgcolor: "red"},
					{name: "recp3",
						used: "saturday",
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

	onDragOver = (ev, id) => {
		ev.preventDefault();
		if (ev.target.classList[1] != "draggable") {
		ev.dataTransfer.setData("droppable_id", id);
			ev.target.style.background = "purple"
		}
	};

	onDragLeave = (ev) => {
		ev.preventDefault();
		if (ev.target.classList[1] != "draggable") {
			ev.dataTransfer.setData("droppable_id", "");
			ev.target.style.background = ""
		}
	};

	onDrop = (ev, cat) => {
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
	 ev.dataTransfer.clearData()
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
			<div key={`${recipe}_droppable`}>
				{recipe}
				<div
					className="droppable meal-container"
					onDragOver={(e)=>this.onDragOver(e, recipe)}
					onDragLeave={(e)=>this.onDragLeave(e)}
					onDrop={(e)=>this.onDrop(e, recipe)}>
					{recipes[recipe]}
				</div>
			</div>
)

		return (
			<div className="container-drag">
    		<h2 className="header">DRAG SUMTHIN</h2>
    			


<div className="container">
{thisthing}
</div>

					<div >
					<UnusedContainer
						key="unused"
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
