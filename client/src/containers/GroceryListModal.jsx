import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


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
};


class GroceryListModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      grocery_list: [],
      open: false,
    }
    this.handleOpen=this.handleOpen.bind(this)
    this.handleClose=this.handleClose.bind(this)
    this.handleToggleCheck=this.handleToggleCheck.bind(this)
  }

  componentDidMount() {
    this.setState({
      grocery_list: this.props.grocery_list
    })
  }

  handleOpen = () => {
    this.props.fetchGroceryList()
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  handleToggleCheck = (e) => {
    let grocery_list = this.props.grocery_list
		grocery_list.filter(g =>{
      if (g.ingredient_id == e.target.name.to_i){
        g.checked = e.target.checked
			}
    })
    this.setState({
			grocery_list: grocery_list
		})
    let toggle_checked = {ingredient_id: e.target.name, checked: e.target.checked, week_id: this.props.week_id}
    this.props.updateGroceryList(toggle_checked,grocery_list)
  };

  render(){
    const { classes } = this.props;
    



    // debugger;



  let grocery_list = this.props.grocery_list.map((g, i) =>
    <Fragment key={i}>
        <div className='ingredient-name'>{g.name}</div> 
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
                <div className="ingredient-name">Item</div> <div>Quantity</div> <div>Unit</div>
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