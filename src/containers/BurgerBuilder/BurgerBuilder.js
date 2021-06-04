import React,{ Component } from "react";
import {connect} from "react-redux";
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from "../../store/actions";


class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }
    state = {
            purchasing:false,
            loading:false,
            error:false
    }
    // componentDidMount()
    // {
    //     //To get the data from Database
    //     axios.get('https://burger-builder-75593-default-rtdb.firebaseio.com/ingredients.json')
    //         .then(response=>{
    //             //Getting the ingredients from Firebase
    //             this.setState({ingredients: response.data});
    //         })
    //         .catch(error=>{
    //             //Getting the error
    //             this.setState({error:true});
    //         });
    // }
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
        let burger=this.state.error ? <p style={{color:'red', textAlign:'center'}}>Ingredients can't be loaded!</p> :<Spinner/>
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
        if(this.state.loading){
            orderSummary = <Spinner/>
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
        ings:state.ingredients,
        price:state.totalPrice
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onIngredientsAdded :(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientsRemoved :(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));