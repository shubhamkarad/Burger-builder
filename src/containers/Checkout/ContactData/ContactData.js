// For the form validation we are using more generic way all the inputs we are accepting dynamically.
import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from "../../../store/actions/index"; 
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

class ContactData extends Component{
    state={
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
        },
            street:{
                
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
        },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
        },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
        },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
        },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                   options:[{value:'fastest', displayValue:'Fastest'},
                            {value:'cheapest', displayValue:'Cheapest'}
                ]
                },
                value:'fastest',
                validation:{},
                valid:true
        },
        },
        formIsValid:false,
        loading:false

    }
    orderHandler=(event)=>{
        event.preventDefault();
        // console.log(this.props.ingredients);
        //  alert('You continue !!');
        this.setState({loading:true})
        // Code to catch the input data and send it to the database 
        const formData={}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData
        }

           this.props.onOrderBurger(order);

    }
    checkValidity(value, rules){
        let isValid = true;
        //This is for deliveryMethod bcs it is not have validation
        // if(!rules){
        //     return true;
        // }
        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid ;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength &&isValid;
        }
        return isValid;
    }
    inputChangeHandler=(event, inputIdentifier)=>{
        // console.log(event.target.value);
        const updatedOrderForm = {
            //copy of the orderForm
            ...this.state.orderForm
        }
        const updatedFormElement= {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        // console.log(updatedFormElement);
        let isFormValid=true;
        for (let inputIdentifier in updatedOrderForm){
            isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid
        }
        this.setState({orderForm:updatedOrderForm, formIsValid:isFormValid})
    }
    render(){
            //turn order form object into array 
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }  
        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType=".." elementConfig=".." value=".." /> */}
                {
                    formElementsArray.map(formElement=>(
                        <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               invalid={!formElement.config.valid}
                               shouldValidate={formElement.config.validation}
                               touched={formElement.config.touched}
                               changed={(event)=>this.inputChangeHandler(event, formElement.id)}/>
                    ))
                }
                <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
            </form>
                );
        if(this.props.loading){
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading:state.order.loading
    }
};
const mapDispatchToProps = dispatch=>{
    return{
            onOrderBurger: (orderData)=> dispatch(actions.purchaseBurger(orderData))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));