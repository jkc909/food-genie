import React, { Component } from "react";
import RecipeTile from "../tiles/RecipeTile";
import DayContainer from "./DayContainer"
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class DragonContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: ["recp1","recp2","recp3"],
			mon: {
				br: [],
				lu: [],
				dn: []
			}
		}
	};
	
	componentDidMount() {

	}

	render() {



		return (
			<div>
				<DayContainer white>
					<div> <RecipeTile /> </div>
				</DayContainer>
			</div>
		);
	}
}

export default DragonContainer