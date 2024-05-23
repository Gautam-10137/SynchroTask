import axios from 'axios';
import axiosApi from ''
const axiosApi= axios.create({
    baseURL:'http://127.0.0.1:6000',
    headers:{
        'Content-type':'application/json',
    },
});

export default axiosApi;
