import React,{Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../Shared/utility";
class Auth extends Component{
    state={
        controls:{
             email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
        },
             password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
        },
        },
        isSignup:true
    }
    //this mount is for when user is not authenticated but user has added ingredients so to not loose the choice of user 
    // user will be redirected to authenticate page and after signin user will get the same ingredients
    //which he has selected.
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

  
    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }
    inputChangeHandler = (event, controlName)=>{
        const updatedControls = updateObject(this.state.controls,{
             [controlName]:updateObject(this.state.controls[controlName],{
                 value:event.target.value,
                valid:checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched:true
             })
        });
        this.setState({controls:updatedControls});
    }
    switchAuthModelHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignup: !prevState.isSignup
            }
        })
    }
    render(){
         //turn Auth form object into array 
        const formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }  
        let form = formElementsArray.map(formElement=>(
            <Input
            key={formElement.id}
             elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>this.inputChangeHandler(event, formElement.id)}/>
        ));
        if(this.props.loading){
            form=<Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}  
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                clicked={this.switchAuthModelHandler}
                btnType="Danger">SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
            </div>
        );
    }
}
const mapStateToProps =state=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        onAuth : (email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);