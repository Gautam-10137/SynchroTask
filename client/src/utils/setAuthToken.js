import axiosApi from '../axios/api';
const setAuthToken= (token)=>{
    if(token){
        axiosApi.defaults.headers.common['Authorization']=`Bearer ${token}`;
    }
    else{
        delete axiosApi.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;    