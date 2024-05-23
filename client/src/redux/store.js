import {configureStore} from '@redux/toolkit';
import authReducer from './authSlice'

const store=configureStore({
    reducer:{
        auth:authReducer
    }
});

export default store;