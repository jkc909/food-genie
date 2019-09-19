import React, { Component } from "react";
import UnusedTile from "../tiles/UnusedTile"

class DragonContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: [],
			week_of: "",
			meals: [],
			daily_totals: []
		};
	};

	componentDidMount() {
		debugger;
		let id = this.props.match.params.id
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

	onDragStart = (ev, meal_id, recipe_id, day_id, meal_type_id) => {
		ev.dataTransfer.setData("meal_id", meal_id);
		ev.dataTransfer.setData("recipe_id", recipe_id);
		ev.dataTransfer.setData("day_id", day_id);
		ev.dataTransfer.setData("meal_type_id", meal_type_id);
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

	onDrop = (ev, meal_type_id, day_id) => {
		let old_meal_type_id = ev.dataTransfer.getData("meal_type_id");
		if (old_meal_type_id != meal_type_id) {
			let old_meal_id = ev.dataTransfer.getData("meal_id");
			let old_recipe_id = ev.dataTransfer.getData("recipe_id");
			let old_day_id = ev.dataTransfer.getData("day_id");
			let daily_totals = this.state.daily_totals;
			let update_totals = ["",""]
			if (ev.target.classList[1] != "draggable") {
				ev.target.style.background = ""
			};
			let recipes = this.state.recipes.filter((recipe) => {
				if (old_meal_type_id != meal_type_id && recipe.meal_type_id != 1 && recipe.meal_type_id == meal_type_id) {
					daily_totals.filter((dt) => {
						if (dt.day_id == day_id) {
							dt.calories -= recipe.metrics.calories
							dt.fat -= recipe.metrics.fat
							dt.carbs -= recipe.metrics.carbs
							dt.protein -= recipe.metrics.protein
							dt.time -= recipe.metrics.time
							dt.cost -= recipe.metrics.cost
							update_totals[0] = dt
						}}
					);
						recipe.meal_type_id = 1	
				};

				if (recipe.meal_type_id != 1 && recipe.meal_type_id == old_meal_type_id && old_meal_type_id != meal_type_id) {
					daily_totals.filter((dt) => {
						if (dt.day_id == old_day_id && old_day_id != day_id) {
							dt.calories -= recipe.metrics.calories
							dt.fat -= recipe.metrics.fat
							dt.carbs -= recipe.metrics.carbs
							dt.protein -= recipe.metrics.protein
							dt.time -= recipe.metrics.time
							dt.cost -= recipe.metrics.cost
							update_totals[0] = dt
						}}
					);
				};

				if (recipe.meal_id == old_meal_id) {
					daily_totals.filter((dt) => {
						if (dt.day_id == day_id && old_day_id != day_id) {
							dt.calories += recipe.metrics.calories
							dt.fat += recipe.metrics.fat
							dt.carbs += recipe.metrics.carbs
							dt.protein += recipe.metrics.protein
							dt.time += recipe.metrics.time
							dt.cost += recipe.metrics.cost
							update_totals[1] = dt
						}
					})
					recipe.meal_type_id = meal_type_id;
				};
				return recipe;
			});
			ev.dataTransfer.clearData()
			this.setState({
				recipes: recipes,
				daily_totals: daily_totals
			});
				let update_meals = {meal_id: old_meal_id, meal_type_id: meal_type_id, update_totals: update_totals}
				this.updateWeek(update_meals)
		}
	};

	handleClickCollapse = (ev) => {
		document.querySelectorAll(".collapsible").forEach(function(collapsible) {
			if (ev.target.classList[1] == collapsible.classList[1]){
				collapsible.nextElementSibling.style.maxHeight = collapsible.nextElementSibling.scrollHeight + "px";
			} else {
				collapsible.nextElementSibling.style.maxHeight = null;
			} 
		})
	}

	render() {
		let recipes = []
		this.state.meals.forEach (m => {
			recipes[m.id] = [{"meal": m}]
		})
		this.state.recipes.forEach (r => {
			let day_id = recipes[r.meal_type_id][0].meal.day_id
			recipes[r.meal_type_id].push(
				<div
					key={`${r.meal_id}_${r.recipe_id}`}
					onDragStart={(e)=>this.onDragStart(e, r.meal_id, r.recipe_id, day_id, r.meal_type_id)}
					draggable
					className="recipe-tile-container draggable"
				>
				<img src = {r.image_url} className="recipe-image"/>
				<div className="recipe-title">{r.name}</div>
					<div className = "recipe-details"> 
						{r.metrics.calories} calories, ${(r.metrics.cost / 100).toFixed(2)}
					</div>
					<div className="recipe-more-details">
						View Details
					</div>
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
					onDrop={(e)=>this.onDrop(e, meal_id, recipes[meal_id][0].meal.day_id)}>
					{recipes[meal_id][1]}
				</div>
			</div>
		)
		
		let days = this.state.meals.map (m => 
			m.day
		)
		days = [...new Set(days)]; 

		let daily_totals = this.state.daily_totals.map(dt =>
			<div key={dt.id}>
				<div>{dt.calories}</div>
				<div>{dt.time}</div>
				<div>{(dt.cost / 100).toFixed(2)}</div>
			</div>		
		)

		let abridged_meals = ["Add", "Data", "Please"]
		let handleClickCollapse = this.handleClickCollapse
		let meal_times = []
		abridged_meals.forEach(function(meal, i) {
			meal_times.push(
				<div key={`${meal}`}>
					<div className={`collapsible ${i}`} onClick={handleClickCollapse}>
					{meal}
					</div>
					<div className="content">
						<div className="container">
							{used_recipes.slice(i,i+7)}
						</div>
					</div>	
				</div>
			)
		})

		return (
			<div className="container-drag">
				<h2 className="header" style={{backgroundColor:"green"}}>
					Week of {this.state.week_of}
				</h2>
				<div>
					{meal_times}
				</div>
				<div className="container">
					{daily_totals}
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