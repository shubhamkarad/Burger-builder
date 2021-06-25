import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders"
//Sychronous request
export const purchaseBurgerSuccess = (id, orderData)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };
};

export const purchaseBurgerFail = (error)=>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = ()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
} 
export const purchaseBurger = (orderData, token)=>{
    return dispatch=>{
         //whatever you pass as an endoint URL it will automatically created in Firebase.  
        //Always make sure to add .json at the end.
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response=> {
                //Set the spinner false to close it
                // this.setState({loading:false});
                // this.props.history.push("/");
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error=> {
                //Set the spinner false to close it
                // this.setState({loading:false});
                dispatch(purchaseBurgerFail(error));
            })
    }
}

export const purchaseInit = ()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}
export const fetchOrderStart = ()=>{
    return{
        type: actionTypes.FETCH_ORDERS_START,
    }
}
export const fetchOrderSuccess = (orders)=>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrderFail = (error)=>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrders =(token, userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        //This variable use to show the orders by userId or we can say User specific Order
        const queryParams =  '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json'+ queryParams) 
            .then(res=>{
                const fetchedOrders=[];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                        });
                }
                // console.log(res.data)
                dispatch(fetchOrderSuccess(fetchedOrders))
                // this.setState({loading:false, orders:fetchedOrders})
            })
            .catch(err=>{
                // this.setState({loading:false})
                dispatch(fetchOrderFail(err));
            })
    }
}