import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider'


let styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    textAlign: 'center',
    backgroundColor: "black",
    color: "white",
    fontSize: "25px",
    border: '2px solid white',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    height: '700px',
    width: '900px',
    overflow: 'auto',
  },
  divider: {
    backgroundColor: "white"
  }
};


class GroceryListModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      grocery_list: [],
      open: false,
    }
    this.handleOpen=this.handleOpen.bind(this)
    this.handleToggleCheck=this.handleToggleCheck.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.fetchGroceryList=this.fetchGroceryList.bind(this)
  }

  componentDidMount() {

  }

  handleOpen = () => {
    this.fetchGroceryList()
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  handleToggleCheck (e) {
    let grocery_list = this.state.grocery_list.slice()
		grocery_list.filter(g =>{
      if (g.ingredient_id == parseInt(e.target.name)){
        g.checked = e.target.checked
			}
    })
    grocery_list.sort((a,b) => (a.checked > b.checked) ? 1 : (a.checked === b.checked) ? ((a.name > b.name) ? 1 : -1) : -1)
    let toggle_checked = {ingredient_id: e.target.name, checked: e.target.checked, week_id: this.props.week_id}
    this.setState({
			grocery_list: grocery_list
		})
    this.updateGroceryList(toggle_checked,grocery_list)
  };

  updateGroceryList(grocery) {
		fetch(`/api/users/${this.props.user_id}/grocery/1`, {
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
			alert("Error while updating Grocery List")
		})
	}

	fetchGroceryList(){
		fetch(`/api/users/${this.props.user_id}/grocery/${this.props.week_id}`)
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
      body.sort((a,b) => (a.checked > b.checked) ? 1 : (a.checked === b.checked) ? ((a.name > b.name) ? 1 : -1) : -1)
			this.setState({ 
				grocery_list: body
			})
		})
	}

  isChecked(check){
    if (check){
      return "ingredient-checked"
    }
  }

  render(){
    console.log("RENDERRRRR")
    
    const { classes } = this.props;

  let grocery_list = this.state.grocery_list.map((g, i) =>
    <Fragment key={i}>
        <div className={`ingredient-name ${ this.isChecked(g.checked) }`}>{g.name}</div> 
        <div>{g.amount} {g.unit}</div> 
        <div> 
          <input 
            type="checkbox" 
            name={g.ingredient_id} 
            defaultChecked={g.checked}
            onClick={this.handleToggleCheck}
          />
        </div>
    </Fragment>
  )

  return (
    <div style={{cursor: 'pointer'}}>
      <div onClick={this.handleOpen}>
      <h4>Get Grocery List</h4>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className="transition-modal-title">Grocery list for the week:</h2>
            <div className="ingredient-grid">
                <div className="ingredient-name">Item</div> <div>Quantity</div> <div> Acquired </div>
            </div>
            <div>
                <Divider 
                  className={classes.divider}
                />
            </div>
            <div className="ingredient-grid">
                {grocery_list}
            </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}
}

export default withStyles(styles)(GroceryListModal);