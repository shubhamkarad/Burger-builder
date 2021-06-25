import React, {Component} from "react";
//This component is used to load unneccessary component asynchronously(lazilly).
//Call this component in App.js
const asyncComponent = (importComponent)=>{
    return class extends Component{
        state={
            component:null
        }
        componentDidMount(){
            importComponent()
                .then(cmp=>{
                    this.setState({component:cmp.default});
                });
        }
        render(){
            const C = this.state.component;

            return C ? <C {...this.props}/> :null;
        }
    }
}
export default asyncComponent;