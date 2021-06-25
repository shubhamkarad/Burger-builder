import axios from 'axios';
//Adding axios instance Method 
const instance = axios.create({
    baseURL:"Enter Your Path";
});

export default instance;