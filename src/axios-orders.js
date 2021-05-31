import axios from 'axios';
//Adding axios instance Method 
const instance = axios.create({
    baseURL:'https://burger-builder-75593-default-rtdb.firebaseio.com/'
});

export default instance;