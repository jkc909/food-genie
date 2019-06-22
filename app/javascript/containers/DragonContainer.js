import React, { Component } from "react";
import UnusedTile from "../tiles/UnusedTile"

class DragonContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			week_of: "",
			meals: [],
			daily_totals: {}
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
					meals: body.meals,
					daily_totals: body.daily_totals
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

	onDrop = (ev, meal_type_id) => {
		
		let meal_id = ev.dataTransfer.getData("meal_id");
		let recipe_id = ev.dataTransfer.getData("recipe_id");
		let daily_totals = this.state.daily_totals;
		if (ev.target.classList[1] != "draggable") {
			ev.target.style.background = ""
		};
	  let recipes = this.state.recipes.filter((recipe) => {
			if (recipe.used != 1 && recipe.used == meal_type_id) {
				recipe.used = 1
			};
			if (recipe.recipe_id == recipe_id && recipe.meal_id == meal_id ) {
				// debugger;
				recipe.used = meal_type_id;
		  };
		  return recipe;
		});
		let update_meals = {meal_id: meal_id, meal_type_id: meal_type_id}
		ev.dataTransfer.clearData()
		this.setState({
			recipes: recipes,
			daily_totals: daily_totals
		});
		this.updateWeek(update_meals)
	};

	render() {
		let recipes = {}
		this.state.meals.forEach (m => {
			recipes[m.id] = [{"meal": m}]
		})
		// debugger;
		this.state.recipes.forEach (r => {
			// debugger;
			recipes[r.used].push(
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
		
		let unused_recipes = recipes[1]
		delete recipes[1]
		let used_recipes = Object.keys(recipes).map(meal_id => 
			<div key={meal_id}>
				{recipes[meal_id][0].meal.day}
				<div
					className="droppable meal-container"
					onDragOver={(e)=>this.onDragOver(e, meal_id)}
					onDragLeave={(e)=>this.onDragLeave(e)}
					onDrop={(e)=>this.onDrop(e, meal_id)}>
					{recipes[meal_id][1]}
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