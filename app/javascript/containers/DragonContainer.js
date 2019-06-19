import React, { Component } from "react";
import UnusedTile from "../tiles/UnusedTile"

class DragonContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			week_of: "",
			meals: [],
		};
	};

	componentDidMount() {
		let id = this.props.params.id
		this.fetchRecipeData(id)
	};

	fetchRecipeData(id){
    fetch(`/api/v1/weeks/${id}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`, error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ 
					recipes: body.payload,
					week_of: body.week_of,
					meals: body.meals 
				})
      })
	}
	
	updateWeek(recipes) {
		fetch(`/api/v1/weeks/${this.props.params.id}`, {
			method: 'PATCH',
			body: JSON.stringify({recipes}),
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(response => {
			if (response.ok) {
				return response
			} else {
				let errorMessage = `${response.status} (${response.statusText})`, error = new Error(errorMessage)
				throw(error)
			}
		})
		.catch(error => {
			console.error(`Error in fetch: ${error.message}`),
			alert("Error while updating Week")
		})
	}

	onDragStart = (ev, meal_id, recipe_id) => {
		ev.dataTransfer.setData("meal_id", meal_id);
		ev.dataTransfer.setData("recipe_id", recipe_id);
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

	onDrop = (ev, meal_title, meal_type_id) => {
		let meal_id = ev.dataTransfer.getData("meal_id");
		let recipe_id = ev.dataTransfer.getData("recipe_id");
		if (ev.target.classList[1] != "draggable") {
			ev.target.style.background = ""
		};
	  let recipes = this.state.recipes.filter((recipe) => {
			if (recipe.used == meal_title) {
				recipe.used = "unused"
			};
			if (recipe.recipe_id == recipe_id && recipe.meal_id == meal_id ) {
		    recipe.used = meal_title;
		  };
		  return recipe;
		});
		let update_meals = {meal_id: meal_id, meal_type_id: meal_type_id}
		ev.dataTransfer.clearData()
		this.setState({
		  ...this.state,
		  recipes
		});
		this.updateWeek(update_meals)
	};

	render() {
		let recipes = {}
		this.state.meals.forEach (m => {
			recipes[`${m[1]}_${m[0]}`] = []
			recipes[`${m[1]}_${m[0]}`].id = m[0]
		})

		// let week_totals = {}
		// this.state.meals.forEach (m => {
		// 	week_totals[`${m[1]}`] = {"nutrition":{"cals":0,"carbs":0,"fat":0,"protein":0}, "cost":0, "time":0}
		// })



		//  NEED TO FIGURE OUT WHY I CAN;T CALL VARIABLES INSIDE THESE FUNCTIONS :(
			// wtfffff
		
		// then I will be able to map the meals to an array with 7 indicies and calculate totals from there
		

		// it is within reach........ 


		let week_totals = this.state.meals.map (m => (
			m
		))


		this.state.recipes.forEach (r => {

			if (r.used != r.used.split("_")[1]) {
				debugger;
			}

			recipes[`${r.used.split("_")[0]}_${r.used.split("_")[1]}`].push(
				<div
				key={`${r.meal_id}_${r.recipe_id}`}
				onDragStart={(e)=>this.onDragStart(e, r.meal_id, r.recipe_id)}
				draggable
				className="dragon-box draggable"
				style={{backgroundColor:r.bgcolor}}>
					{r.name}
				</div>
			)
		});
		let unused_recipes = recipes[Object.keys(recipes)[0]]
		delete recipes["unused_1"]
		
		let used_recipes =	Object.keys(recipes).map(meal_title => 
			<div key={`${meal_title}_droppable`}>
				{meal_title}
				<div
					className="droppable meal-container"
					onDragOver={(e)=>this.onDragOver(e, meal_title)}
					onDragLeave={(e)=>this.onDragLeave(e)}
					onDrop={(e)=>this.onDrop(e, meal_title, recipes[meal_title].id)}>
				{recipes[meal_title]}
				</div>
			</div>
		)
		return (
			<div className="container-drag">
    		<h2 className="header" style={{backgroundColor:"blue"}}>Week of {this.state.week_of}</h2>
				<div className="container">
					{used_recipes}
				</div>
				<div >
					<UnusedTile
						key="unused"
						recipes={unused_recipes}
						onDragOver={(e)=>this.onDragOver(e, "unused", 1)}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
						/>
				</div>
 			</div>
		);
	}
}

export default DragonContainer