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
		this.collapse_timer = null
	};

	componentDidMount() {
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
		fetch(`/api/v1/weeks/${this.props.match.params.id}`, {
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
		clearTimeout(this.collapse_timer)
		ev.dataTransfer.setData("droppable_id", id);
		ev.target.closest("#droppable").style.background = "purple"
	};

	onDragLeave = (ev) => {
		ev.preventDefault();
		if (ev.target.classList[1] != "draggable") {
			ev.dataTransfer.setData("droppable_id", "");
			ev.target.closest("#droppable").style.background = ""
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
			let subtract_values = (recipe, dt) => {
				dt.calories -= recipe.metrics.calories
				dt.fat -= recipe.metrics.fat
				dt.carbs -= recipe.metrics.carbs
				dt.protein -= recipe.metrics.protein
				dt.time -= recipe.metrics.time
				dt.cost -= recipe.metrics.cost
				update_totals[0] = dt
			}
			let recipes = this.state.recipes.filter((recipe) => {
				if (old_meal_type_id != meal_type_id && recipe.meal_type_id != 1 && recipe.meal_type_id == meal_type_id) {
					daily_totals.filter((dt) => {
						if (dt.day_id == day_id) {
							subtract_values(recipe, dt)
						}}
					);
						recipe.meal_type_id = 1	
				};

				if (recipe.meal_type_id != 1 && recipe.meal_type_id == old_meal_type_id && old_meal_type_id != meal_type_id) {
					daily_totals.filter((dt) => {
						if (dt.day_id == old_day_id && old_day_id != day_id) {
							subtract_values(recipe, dt)
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

	timer = (fn) => {
		clearTimeout(this.collapse_timer)
		this.collapse_timer = setTimeout(fn, 500)
	}

	handleCollapse = (id) => {
		let collapsibles_all = document.querySelectorAll(".collapsible")
		let updateCollapse = (id, collapsibles) => {
			for(let i = 0, len=collapsibles.length; i < len; i++ ) {
				if (collapsibles[i].classList.contains(id)) {
					collapsibles[i].nextElementSibling.style.maxHeight = collapsibles[i].nextElementSibling.scrollHeight + "px";
				} else {
					collapsibles[i].nextElementSibling.style.maxHeight = null;
				} 
			}
		}
		if (event.type == "dragenter") {
			this.timer(function() {updateCollapse(id, collapsibles_all)})
			event.target.closest(".collapsible").style.background = "#555"
		}
		else (updateCollapse(id, collapsibles_all))
	}

	handleStopProp = () => {
		event.stopPropagation()
		console.log("but srsly. wtf")
	}

	handleLeaveCollapse = () => {
		if (event.target.classList.contains("recipe-name-abridge")) {
			event.target.closest(".collapsible").style.background = null
		}
	}

	render() {
		let recipes = []
		let just_names = []
		this.state.meals.forEach (m => {
			recipes[m.id] = [{"meal": m}]
			just_names[m.id] = [{"meal": m}]
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
			just_names[r.meal_type_id].push(
				r.name
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
					onDrop={(e)=>this.onDrop(e, meal_id, recipes[meal_id][0].meal.day_id)}
					id="droppable">
					{recipes[meal_id][1]}
				</div>
			</div>
		)

		let bridges = just_names.map((name, i) => 
			<div key = {`abridged ${i}`} onDragLeave={(e)=>this.handleStopProp()} className="recipe-name-abridge"> {name[1]} </div>
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

		bridges.splice(0, 2)
		let meal_times = []
		for(let i = 0; i < 3; i++) {
			meal_times.push(
				<div key={`collapsiblecontainer ${i}`}>
					<div 
						className={`collapsible container droppable ${i}`} 
						onClick={(e)=>this.handleCollapse(i)}
						onDragEnter={(e)=>this.handleCollapse(i)}
						onDragLeave={(e)=>this.handleLeaveCollapse(i)}
					>
						{bridges.splice(0,7)}
					</div>
					<div className="content">
						<div className="container">
							{used_recipes.splice(0,7)}
						</div>
					</div>	
				</div>
			);
		}

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
				<div id="droppable">
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