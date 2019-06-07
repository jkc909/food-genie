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
		if (ev.target.classList[0] === "used-user-recipe-container") {
			ev.target.style.background = "purple"
		}
	};

	onDragLeave = (ev) => {
		ev.preventDefault();
		if (ev.target.classList[0] === "used-user-recipe-container") {
			ev.target.style.background = ""
		}
	};

	onDrop = (ev, cat) => {
		let id = ev.dataTransfer.getData("id");
		let title = ev.dataTransfer.getData("title");
		if (ev.target.classList[0] === "used-user-recipe-container") {
			ev.target.style.background = ""
		};
	  let recipes = this.state.used_recipes.filter((recipe) => {
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
	let user_recipe_tiles = user_recipes.map(r => {
		return(
			<div 
				key={`${(recipe_id+=1)}${r.recipe_id}`}
				onDragStart={(e)=>this.onDragStart(e, r)}
				draggable
				style={{backgroundColor:"green", height:"300px"}}>
					<RecipeListTile 
						recipe={r}
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
						onDragOver={(e)=>this.onDragOver(e)}
						onDragLeave={this.onDragLeave}
						onDrop={this.onDrop}
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