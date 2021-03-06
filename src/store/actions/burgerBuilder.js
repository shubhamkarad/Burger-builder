import * as actionTypes from "./actionTypes";
import axios from '../../axios-orders';
export const addIngredient = (name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
export const setIngredients = (ingredients)=>{
    return{
        type : actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchIngredientsFailed = ()=>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredient = ()=>{
    return dispatch =>{
         axios.get('Enter URL')
            .then(response=>{
                //Getting the ingredients from Firebase
                dispatch(setIngredients(response.data));
                // this.setState({ingredients: response.data});
            })
            .catch(error=>{
                //Getting the error
                dispatch(fetchIngredientsFailed());
            });
    };
}