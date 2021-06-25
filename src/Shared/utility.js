export const updateObject = (oldObject, updatedProperties)=>{
    return {
        ...oldObject,
        ...updatedProperties
    }
}

 export const checkValidity= (value, rules)=>{
        let isValid = true;
        //This is for deliveryMethod bcs it is not contain any validation
        // if(!rules){
        //     return true;
        // }
        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid=value.length >= rules.minLength && isValid ;
        }
        if(rules.isEmail){
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid=pattern.test(value) && isValid;
        }
        if(rules.maxLength){
            isValid=value.length <= rules.maxLength &&isValid;
        }
        return isValid;
    }