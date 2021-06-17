import React, {Component} from 'react';
import {connect} from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import * as actions from "../../store/actions/index";
class Checkout extends Component{

    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary =<Redirect to="/"/>
        
            if(this.props.ings){
                const purchasedRedirect = this.props.purchased ? <Redirect to="/"/>: null;
                summary = (
                <div>
                    {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'}
                component={ContactData}/>
                </div>
                );
            }
        return summary;
               
                // {/* We are passing the props becz we want to use history method in Contact Data */}
    }
}
//Redux
const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    }
};
// const mapDispatchToProps = dispatch=>{
//     return{
//         onInitPurchase:()=>dispatch(actions.purchaseInit())
//     };
// }
export default connect(mapStateToProps)(Checkout);