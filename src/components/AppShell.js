import React from 'react';
import {Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { authService } from '../firebase';
//import Drawer from '@material-ui/core/Drawer';

const styles={
    root:{
        flexGrow:3,
    },
    menuButton:{
        marginRight:'auto'
    }
}

class AppShell extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toggle: false
        };
    };

    handleDrawerToggle = () => this.setState({toggle: !this.state.toggle})
    onLogOutClick = () => {
        authService.signOut();
        this.setState({toggle: !this.state.toggle})
    }
    render(){
        const{classes}=this.props;
        return(
            <div>
                <div className={classes.root}>
                    <AppBar position="static" style={{backgroundColor:'seagreen'}}>
                        <IconButton className={classes.menuBUtton} color="seagreen" onClick={this.handleDrawerToggle}>
                            <MenuIcon/>
                        </IconButton>
                    </AppBar>
                    <Drawer open={this.state.toggle}>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/home">
                                Home
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/huser">
                                User Info
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/calendar">
                                Calendar
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.handleDrawerToggle}>
                            <Link component={RouterLink} to="/logadd">
                                Food Log
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={this.onLogOutClick}>
                            <Link component={RouterLink} to="/">
                                Log Out
                            </Link>
                        </MenuItem>
                    </Drawer>
                </div>
                <div id="content" style={{margin:'auto',marginTop:'20px'}}>
                    {React.cloneElement(this.props.children)}
                </div>
            </div>
           
        );
    }


  
}

export default withStyles(styles)(AppShell);