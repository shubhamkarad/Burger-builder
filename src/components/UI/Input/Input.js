import React from 'react';
import classes from './Input.module.css';
const input = (props)=>{
    let inputElement = null;
    //To bind 2 css classes use array
    const inputClasses = [classes.InputElement];
    // if this condition is true it will add Invalid css class to input fields. 
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    // We have used  inputtype instead of inputType bcz it not usable in html as Default {it is case Insens itive}
    switch(props.elementType){
        case ('input'):
                inputElement = <input
                  className={inputClasses.join(' ')}
                  {...props.elementConfig} 
                  value={props.value}
                  onChange={props.changed}/>;
                break;
        case ('textarea'):
                inputElement = <textarea  
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                 value={props.value}
                 onChange={props.changed}/>;
                break;
        case ('select'):
                inputElement = (
                <select  
                className={inputClasses.join(' ')}
                 value={props.value}
                 onChange={props.changed}>
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.displayValue}
                        </option>
                    ))}
                 </select>
                );
                break;
                
        default:
                inputElement = <input 
                className={inputClasses.join(' ')}
                 {...props.elementConfig} 
                  value={props.value}
                  onChange={props.changed}/>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input;