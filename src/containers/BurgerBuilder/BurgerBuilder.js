import React,{ Component } from "react";
import {connect} from "react-redux";
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../store/actions/index";
import axios from '../../axios-orders';



class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }
    state = {
            purchasing:false,
            
    }
    componentDidMount()
    {
        console.log(this.props);
        //To get the data from Database
        this.props.onInitIngredients();
       
    }
    // Update the price
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey];
            })
            .reduce((sum, el)=>{
                return sum  + el;
            },0)
            return sum >0;
    }
    // Handle Purchase Handler
    purchaseHandler = ()=>{
        this.setState({purchasing:true})
    }
    
    //TO closed the Backdrop
    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }
    // To continue purchase continue
    purchaseContinue=()=>{
       this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render(){
        // This logic is used to diabled the button if that ingred. is not selected.
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }
        let orderSummary = null;
        let burger=this.props.error ? <p style={{color:'red', textAlign:'center'}}>Ingredients can't be loaded!</p> :<Spinner/>
        if(this.props.ings){
        burger = (
        <Aux>
                <Burger ingredients={this.props.ings}/>       
                <BuildControls 
                ingredientAdded={this.props.onIngredientsAdded}
                ingredientRemoved={this.props.onIngredientsRemoved}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                disabled={disabledInfo}
                price={this.props.price}/>
        </Aux>
        );
        orderSummary = <OrderSummary ingredients={this.props.ings}
                            price={this.props.price}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinue}/>
        }

        //salad:true, meat:false  
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}
const mapStateToProps = state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error : state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientsAdded :(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved :(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : ()=> dispatch(actions.initIngredient()),
        onInitPurchase : ()=> dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));