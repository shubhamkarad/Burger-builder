// Higher Level Component. In this Component we are catching the Error and showing it.
// It will only be used in the export of any class not in jsx code that's why we stated the name in camelCase.
//where to use ? => wrap the component you want by using name of this component in Export of that Component.
//By using axios we can set it as a Global Error Handler. so Firebase errors can be shown by this Component.
// Axios Listner(Interceptors)=> To handle the Errors.
// To clear the error we use request.
import React, { Component } from 'react';
import Aux from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrapperComponent, axios)=>{
    return class extends Component{
        state={
            error:null
        }
        //Using the constructor or willMount be the same.
        // Before Child components are render.
        UNSAFE_componentWillMount(){
             this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res=>res, error=>{
                this.setState({error:error});
            });
        }
        //Whenever we don't need the burger builder component it will remove the interceptors.
        componentWillUnmount(){
            // console.log('will unMount');
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message: null} 
                    </Modal>
                    <WrapperComponent {...this.props}/>
                </Aux>
            )
        }
    }
}
export default withErrorHandler;