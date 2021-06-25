import React, { Component } from "react";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'; 
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {connect } from "react-redux";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

//For This Three Components Lazy Loading is applied using asynchronous call 
const asyncCheckout = asyncComponent(()=>{
  return import( "./containers/Checkout/Checkout");
})
const asynOrders = asyncComponent(()=>{
  return import( './containers/Orders/Orders');
})
const asyncAuth = asyncComponent(()=>{
  return import( "./containers/Auth/Auth");
})
class App extends Component{
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render(){
    //Route protection
    //this route is acts like a guard to protect our routes.
    //When we are trying to reach out to any component manually by typing url and passing route name 
    //It will guard our routes by using following method.
    let routes = (
      <Switch>
         <Route path="/auth"  component={asyncAuth}/>
         <Route path="/" exact component={BurgerBuilder}/>
         <Redirect to="/"/>
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
         <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/orders"  component={asynOrders}/>
          <Route path="/logout"  component={Logout}/>
          <Route path="/auth"  component={asyncAuth}/>
          <Route path="/checkout" component={asyncCheckout}/>
          <Redirect to="/"/>
        </Switch>
      );
    }
  return (
    <div>
      <Layout>
       {routes}
      </Layout>
    </div>
  );
}
}
const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !==null
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    onTryAutoSignup :()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
