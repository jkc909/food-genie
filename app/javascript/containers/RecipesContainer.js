import React, { Component } from "react";
import RecipeViewTile from "../tiles/RecipeViewTile";

class RecipesContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			used_recipes:
				[]
		};
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
					user_recipes: body.user_recipes })
      })
	}
	
	updateRecipe(recipe) {
		fetch(`/api/v1/recipes/${recipe.id}`, {
			method: 'PATCH',
			body: JSON.stringify({recipes: recipes}),
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
			
		})
		.catch(error => {
			console.error(`Error in fetch: ${error.message}`),
			alert("Error while updating Week")
		})
	}

	render() {
		// sort alphabetically
		let used_recipes = this.state.used_recipes
		used_recipes.sort( function( a, b ) {
			a = a.name.toLowerCase();
			b = b.name.toLowerCase();	
			return a < b ? -1 : a > b ? 1 : 0;
	});
		let recipe_id = 0
		let used_recipe_tiles = used_recipes.map(recipe => {
			return(
				<RecipeViewTile 
					key={`${(recipe_id+=1)}${recipe.recipe_id}`}
					recipe={recipe}
				/>
			)
		})

		return (
			<div className="container-drag">
    		<h2 className="header" style={{backgroundColor:"blue"}}>ALL DA RECIPES</h2>
				<div>
				{used_recipe_tiles}
				</div>
 			</div>
		);
	}
}

export default RecipesContainer