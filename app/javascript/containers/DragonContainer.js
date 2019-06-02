import React, { Component } from "react";
import UnusedContainer from "./UnusedContainer"

class DragonContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes:
				[]
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
        this.setState({ recipes: body.payload })
        this.setState({ user: body.user });
      })
  }

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
		let id = ev.dataTransfer.getData("id");
		if (ev.target.classList[1] != "draggable") {
			ev.target.style.background = ""
		};
	  let recipes = this.state.recipes.filter((recipe) => {
			if (recipe.used == cat) {
				recipe.used = "unused"
			};
			if (recipe.name == id) {
		           recipe.used = cat;
		  };
		   return recipe;
	  });
		ev.dataTransfer.clearData()
		this.setState({
		  ...this.state,
		  recipes
		});
	};

	render() {
		let recipes = {
			unused: [],

			sunday1: [],
			monday1: [],
			tuesday1: [],
			wednesday1: [],
			thursday1: [],
			friday1: [],
			saturday1: [],
			
			sunday2: [],
			monday2: [],
			tuesday2: [],
			wednesday2: [],
			thursday2: [],
			friday2: [],
			saturday2: [],
						
			sunday3: [],
			monday3: [],
			tuesday3: [],
			wednesday3: [],
			thursday3: [],
			friday3: [],
			saturday3: []
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

		let used_recipes =	Object.keys(recipes).map(recipe =>
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
    		<h2 className="header" style={{backgroundColor:"blue"}}>DRAG SUMTHIN</h2>
				<div className="container">
					{used_recipes}
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