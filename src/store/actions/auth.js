import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess = (token, userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}
export const authFail = (error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
} 
export const checkAuthTimeout = (expirationTime)=>{
    return dispatch=>{
            setTimeout(()=>{
                dispatch(logout());
            }, expirationTime *1000);
    }
}
export const auth = (email, password, isSignup) =>{
    return dispatch=> {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = "Enter URL";
        if(!isSignup){
            url="Enter URL";
        }
        axios.post(url, authData)
            .then(response=>{
                // console.log(response);
                // * 1000 beacuse JS works in milliseconds
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error=>{
                console.log(error);
                dispatch(authFail(error.response.data.error));
            })
        
    }
}

export const setAuthRedirectPath = (path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path :path
    }
}

export const authCheckState =()=>{
    return dispatch=>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate =new Date(localStorage.getItem('expirationDate'));
            //Checking the current Date and Expiration date
            if(expirationDate <= new Date()){
                dispatch(logout());
            }
            else{
                // If not less than current date it is not logout on refresh
                const userId = localStorage.getItem('userId');
                 dispatch(authSuccess(token, userId));
                 dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
           
        }
    };
}