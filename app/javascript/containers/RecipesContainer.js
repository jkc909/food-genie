import React, { Component } from "react";
import RecipeViewTile from "../tiles/RecipeViewTile";
import RecipeListTile from "../tiles/RecipeListTile"

class RecipesContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			used_recipes: [],
			user_recipes: [],
			week_of: ""
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
					user_recipes: body.user_recipes,
					week_of: body.week_of })
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

	onDragStart = (ev, title, id) => {
		ev.dataTransfer.setData("id", id);
		ev.dataTransfer.setData("title", title)
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
		let id = ev.dataTransfer.getData("id");
		let title = ev.dataTransfer.getData("title");
		if (ev.target.classList[1] != "draggable") {
			ev.target.style.background = ""
		};
	  let recipes = this.state.recipes.filter((recipe) => {
			if (recipe.used == cat) {
				recipe.used = "unused"
			};
			if (recipe.name == title && recipe.meal_id == id ) {
		           recipe.used = cat;
		  };
		   return recipe;
	  });
		ev.dataTransfer.clearData()
		this.setState({
		  ...this.state,
		  recipes
		});
		this.updateWeek(recipes)
	};

	render() {
		// sort alphabetically
		let user_recipes = this.state.user_recipes
		user_recipes.sort( function( a, b ) {
			a = a.name.toLowerCase();
			b = b.name.toLowerCase();	
			return a < b ? -1 : a > b ? 1 : 0;
	});

	let recipe_id = 0
	let user_recipe_tiles = user_recipes.map(recipe => {
		return(
			<RecipeListTile 
				key={`${(recipe_id+=1)}${recipe.recipe_id}`}
				recipe={recipe}
			/>
		)
	})




		let used_recipes = this.state.used_recipes
		used_recipes.sort( function( a, b ) {
			a = a.name.toLowerCase();
			b = b.name.toLowerCase();	
			return a < b ? -1 : a > b ? 1 : 0;
	});
		recipe_id = 0
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
    		<h2 className="header" style={{backgroundColor:"blue"}}>Recipes for week of {this.state.week_of}</h2>
				<div className="used-user-recipe-container">

					<div>
					{user_recipe_tiles}
					</div>
				
					<div className="user-recipe-container">
					{used_recipe_tiles}
					</div>


				</div>
 			</div>
		);
	}
}

export default RecipesContainer