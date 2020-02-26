  import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import Login from '../Login.js'
import Signup from '../Signup.js'

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, handleToggleSignup, login, hosttt, handleSignup, handleLoginClick, errors, ...other } = props;
  const [value, setValue] = React.useState(valueProp);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleOk = (value) => {
    onClose(value);
  };

  let login_or_signup
  if(props.login){
    login_or_signup = <Login 
      handleLogin={handleOk} 
      handleLoginClick={props.handleLoginClick}
      handleToggleSignup={props.handleToggleSignup}
      hosttt={props.hosttt}
      errors={props.errors}
    />
  } else {
    login_or_signup = <Signup 
      handleSignup={props.handleSignup}
      handleLogin={handleOk} 
      handleToggleSignup={props.handleToggleSignup} 
      hosttt={props.hosttt}
      errors={props.errors}
    />
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Welcome to Food Genie!</DialogTitle>
      <DialogContent dividers>
          <div> Food Genie is a cutting-edge meal prep assistant app. Users can schedule and plan meals for the week by dragging and dropping recipes into meal slots. Food Genie will track spending, calories, and nutrition metrics. Once users have added recipes for the week, Food Genie provides a grocery checklist that is also available on mobile. </div>
      </DialogContent>
      <DialogContent dividers>
          {login_or_signup}
      </DialogContent>
    </Dialog>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
}));

    

class ConfirmationDialog extends Component {
    constructor(props){
        super(props);
        this.state={
            open: true,
            login: true
        }
        this.handleClose=this.handleClose.bind(this)
        this.handleToggleSignup=this.handleToggleSignup.bind(this)
    }
    handleClose(data) {
        this.props.handleLogin(data)
        this.setState({ open: false })
    }

    handleToggleSignup(){
      this.setState({ login: !this.state.login })
    }

    render() {

        return (
          <div>
              <ConfirmationDialogRaw
                id="login-modal"
                keepMounted
                open={this.state.open}
                onClose={this.handleClose}
                handleLoginClick={this.props.handleLoginClick}
                handleSignup={this.props.handleSignup}
                handleToggleSignup={this.handleToggleSignup}
                login={this.state.login}
                hosttt={this.props.hosttt}
                errors={this.props.errors}
              />
          </div>
        );
    }
}

export default ConfirmationDialog;