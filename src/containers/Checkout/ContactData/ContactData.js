import React, {Component} from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        // console.log(this.props.ingredients);
        //  alert('You continue !!');
        this.setState({loading:true})
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.price,
            customer:{
                name:'Shubham D Karad',
                address:{
                    street:'Nashik Road',
                    zipCode:422101,
                    country:'India'
                },
            email:'shubhkrd@gmail.com'
            },
            deliveryMethod:'fastest'
        }
        //whatever you pass as an endoint URL it will automatically created in Firebase.  
        //Always make sure to add .json at the end.
        axios.post('/orders.json', order)
            .then(response=> {
                //Set the spinner false to close it
                this.setState({loading:false});
                this.props.history.push("/");
            })
            .catch(error=> {
                //Set the spinner false to close it
                this.setState({loading:false});
            })
            
    }
    render(){
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Name'/>
                <input className={classes.Input} type='email' name='email' placeholder='Email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                <input className={classes.Input} type='text' name='postal' placeholder='PostalCode'/>
                <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
            </form>
                );
        if(this.state.loading){
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
export default ContactData;