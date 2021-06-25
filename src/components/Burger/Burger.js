import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const burger = (props)=>{
    // In BurgerIngredients we have object of Ingredients but we need Array of ingredients
    // for that we are using the following method
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        // Array with the 2 elements
        //Mapping an object{key value pairs} into an Array
        return[...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey + i} type={igKey}/>
            //where igKey is the Ingredients
        });
    })
    // resulting in a single output value/ Tranform an array, (prev, curr value)
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length ===0 ) {
        transformedIngredients = <p>Please start adding Ingredients!</p>
    }
    // console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};
export default burger;