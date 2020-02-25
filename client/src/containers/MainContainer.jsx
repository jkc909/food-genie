import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import RecipesContainer from './RecipesContainer';
import GroceryListModal from './GroceryListModal';

import WeekSelectDialog from './WeekSelectDialog.jsx';

import WeekdayContainer from './WeekdayContainer';

class MainContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
			user_id: props.user.id,
			recipes: [],
			week_id: 0,
            week_of: "",
            meals: [],
			daily_totals: [],
			grocery_list: [],
			groceryOpen: false,
		}
		this.fetchGroceryList=this.fetchGroceryList.bind(this)
		this.updateGroceryList=this.updateGroceryList.bind(this)
    }

    componentDidMount(){
		this.fetchRecipeData(0)
    }
    
	fetchRecipeData(date) {
		fetch(`/api/users/${this.props.user.id}/weeks/${date}`)
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
			week_id: body.id,
			recipes: body.payload,
			week_of: body.week_of,
			meals: body.meals,
			daily_totals: body.daily_totals
			})
		})
	}

	updateWeek(recipes) {
		fetch(`/api/users/${this.props.user.id}/weeks/${this.state.week_id}`, {
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
			alert("Error while updating Week")
		})
	}

	updateGroceryList(grocery) {
		fetch(`/api/users/${this.props.user.id}/grocery/1`, {
			method: 'PATCH',
			body: JSON.stringify({grocery}),
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
			alert("Error while updating Week")
		})
	}

	fetchGroceryList(){
		fetch(`/api/users/${this.state.user_id}/grocery/${this.state.week_id}`)
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
				grocery_list: body
			})
		})
	}

	toggleGrocerySelect = (grocery,new_state) => {
		this.updateGroceryList(grocery) 

		this.setState({
			grocery_list: new_state
		})

	}

	selectWeek = (date) => {
		this.fetchRecipeData(date);
	}
    
	onDragStart = (ev, meal_id, recipe_id, day_id, meal_type_id) => {
		ev.dataTransfer.setData("meal_id", meal_id);
		ev.dataTransfer.setData("recipe_id", recipe_id);
		ev.dataTransfer.setData("day_id", day_id);
		ev.dataTransfer.setData("meal_type_id", meal_type_id);
	};

	onDragOver = (ev, id) => {
        ev.preventDefault();
        if (ev.target.closest("#droppable")) {
            ev.target.closest("#droppable").style.background = "purple";
        }
	};

	onDragLeave = (ev) => {
		ev.preventDefault();
		if (ev.target.classList[1] != "draggable" && ev.target.closest("#droppable")) {
			ev.dataTransfer.setData("droppable_id", "");
			ev.target.closest("#droppable").style.background = ""
		}
    };
    
	onDrop = (ev, meal_type_id, day_id) => {
        document.querySelectorAll("#droppable").forEach(d => {
            d.style.background = ""
        })
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

    render(){
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
					{/* <div className = "recipe-details"> 
						{r.metrics.calories} calories, ${(r.metrics.cost / 100).toFixed(2)}
					</div> */}
				</div>
			)
			just_names[r.meal_type_id].push(
				r.name
			)
		});
		
		let unused_recipes = recipes[1]
		delete recipes[1]


		let used_recipes = Object.keys(recipes).map((meal_id, i) => 
			<div key={meal_id}>
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

		let days = this.state.meals.map (m => 
			m.day
		)
		days = [...new Set(days)]; 

        delete days[0]

        let day_names = days.map (d =>
            <div key={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</div>
        )

		let daily_totals = this.state.daily_totals.map(dt =>
			<div key={dt.id}>
				<div>{dt.calories}</div>
				<div>{(dt.cost / 100).toFixed(2)}</div>
			</div>		
		)

        return(
            <Container>
                <div className="week-of-header">
                    
					
					<div className="top-features">
					<WeekSelectDialog 
						selectWeek = {this.selectWeek}
						selected_week = {this.state.week_of}
					/>

					<GroceryListModal
						fetchGroceryList={this.fetchGroceryList}
						updateGroceryList={this.toggleGrocerySelect}
						user_id={this.state.user_id}
						week_id={this.state.week_id}
						grocery_list={this.state.grocery_list}
					/>
					</div>

                </div>
                <div className="container">
					{day_names}
					{used_recipes}
					{daily_totals}
                </div>
                    <RecipesContainer 
						recipes={unused_recipes}
						onDragOver={this.onDragOver}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
                    />
            </Container>
        )
    };
};

export default MainContainer;