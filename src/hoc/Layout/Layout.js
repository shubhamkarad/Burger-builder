import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
//We have added the css file
import classes from './Layout.module.css';
// To use the aux(Higher Order Component) wrap all the jsx file using "()" and <Aux>.
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    SideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    //setting the state when it depends on old state
    SideDrawerToggleHandler =()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
    });
    }
    render(){
        return(
                <Aux>
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer 
                isAuth={this.props.isAuthenticated}
                closed={this.SideDrawerCloseHandler}
                open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
                </Aux>
        )
    }
}  
const mapStateToProps = state =>{
    return {
        isAuthenticated :  state.auth.token !==null
    }
}
export default connect(mapStateToProps) (Layout);