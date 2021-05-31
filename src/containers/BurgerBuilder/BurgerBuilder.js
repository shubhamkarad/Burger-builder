import React,{ Component } from "react";
import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES={
    salad:0.5,
    bacon:0.3,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }
    state = {
        ingredients:null,
            totalPrice:4,
            purchasable:false,
            purchasing:false,
            loading:false,
            error:false
    }
    componentDidMount(){
        //To get the data from Database
        axios.get('https://burger-builder-75593-default-rtdb.firebaseio.com/ingredients.json')
            .then(response=>{
                //Getting the ingredients from Firebase
                this.setState({ingredients: response.data});
            })
            .catch(error=>{
                //Getting the error
                this.setState({error:true});
            });
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
            this.setState({purchasable: sum > 0});
    }
    // Handle Purchase Handler
    purchaseHandler = ()=>{
        this.setState({purchasing:true})
    }
    //Add Ingredients Handler
    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }
    // Remove Ingredients Handler
    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0 ){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice + priceDeduction;
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    }
    //TO closed the Backdrop
    purchaseCancelHandler = ()=>{
        this.setState({purchasing:false})
    }
    // To continue purchase continue
    purchaseContinue=()=>{
       
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' +this.state.totalPrice)
        const queryStrings = queryParams.join('&');
            this.props.history.push({
                pathname:'/checkout',
                search:'?' + queryStrings
            });
    }
    render(){
        // This logic is used to diabled the button if that ingred. is not selected.
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0
        }
        let orderSummary = null;
        let burger=this.state.error ? <p style={{color:'red', textAlign:'center'}}>Ingredients can't be loaded!</p> :<Spinner/>
        if(this.state.ingredients){
        burger = (
        <Aux>
                <Burger ingredients={this.state.ingredients}/>       
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}/>
        </Aux>
        );
        orderSummary = <OrderSummary ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
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
export default withErrorHandler(BurgerBuilder, axios);