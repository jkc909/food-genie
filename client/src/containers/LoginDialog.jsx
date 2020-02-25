import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';

import Login from '../Login.js'
import Signup from '../Signup.js'

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, handleToggleSignup, login, ...other } = props;
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
    login_or_signup = <Login handleLogin={handleOk} handleToggleSignup={props.handleToggleSignup}/>
  } else {
    login_or_signup = <Signup handleLogin={handleOk} handleToggleSignup={props.handleToggleSignup} />
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
      <DialogTitle id="confirmation-dialog-title">Please Login</DialogTitle>
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
                handleToggleSignup={this.handleToggleSignup}
                login={this.state.login}
              />
          </div>
        );
    }
}

export default ConfirmationDialog;