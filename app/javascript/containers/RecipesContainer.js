import React, { Component } from "react";
import RecipeViewTile from "../tiles/RecipeViewTile";
import RecipeListTile from "../tiles/RecipeListTile"

class RecipesContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			used_recipes: [],
			user_recipes: [],
			week_of: "",
			week_id: ""
		};
		this.handleClickAddRecipe = this.handleClickAddRecipe.bind(this)
	};

	componentDidMount() {
		let id = this.props.params.id
		this.fetchRecipesData(id)
	};

	fetchRecipesData(id){
    fetch(`/api/v1/weeks/${id}/recipes`)
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
					used_recipes: body.used_recipes,
					user_recipes: body.user_recipes,
					week_of: body.week_of,
					week_id: body.id })
      })
	}
	
	postMeal(week_id, recipe_id) {
		fetch(`/api/v1/weeks/${week_id}/recipes/${recipe_id}/meals`, {
			method: 'POST',
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
		.then(response => response.json())
		.then(body => {
			this.setState ({
				used_recipes: body.used_recipes,
				user_recipes: body.user_recipes,
				week_of: body.week_of,
				week_id: body.id
			})
		})
		.catch(error => {
			console.error(`Error in fetch: ${error.message}`),
			alert("Error while updating Week")
		})
	}

	handleClickAddRecipe(ev) {
		this.postMeal(this.state.week_id, ev.target.id)
	}

	render() {
		// sort alphabetically
		let user_recipes = this.state.user_recipes
		user_recipes.sort( function( a, b ) {
			a = a.name.toLowerCase();
			b = b.name.toLowerCase();	
			return a < b ? -1 : a > b ? 1 : 0;
	});

	let recipe_id = 0
	let user_recipe_tiles = user_recipes.map(r => {
		return(
			<div 
				key={`${(recipe_id+=1)}${r.recipe_id}`}
				style={{backgroundColor:"green", height:"50px"}}
				>
					<RecipeListTile 
						recipe={r}
						handleClickAddRecipe={this.handleClickAddRecipe}
					/>
			</div>
		)
	})

		let used_recipes = this.state.used_recipes
		used_recipes.sort( function( a, b ) {
			a = a.name.toLowerCase();
			b = b.name.toLowerCase();	
			return a < b ? -1 : a > b ? 1 : 0;
	});
		recipe_id = 0
		let used_recipe_tiles = used_recipes.map(r => {
			return(
					<RecipeViewTile 
						key={`${(recipe_id+=1)}${r.recipe_id}`}
						recipe={r}
					/>
			)
		})

		return (
			<div className="container-drag">
    		<h2 className="header" style={{backgroundColor:"blue"}}>Recipes for week of {this.state.week_of}</h2>
					<div className="user-recipe-container">
					<div>
						{user_recipe_tiles}
					</div>
					<div					
						className="used-user-recipe-container"
						style={{backgroundColor:"blue", height:"600px", width:"900px"}}
					>
						{used_recipe_tiles}
					</div>
				</div>
 			</div>
		);
	}
}

export default RecipesContainer