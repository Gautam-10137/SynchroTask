import React,{useEffect, useState} from 'react'
import {useDispatch } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom';
import { login } from '../../redux/authSlice';
import axiosApi from '../../axios/api';
const Login = ({}) => {
    const dispatch=useDispatch();
    const Navigate=useNavigate();
    const [formData,setFormData]=useState({
        email:'',
        password:''
    });
    const [showDialog,setShowDialog]=useState(false);
    const [showEmail,setShowEmail]=useState(false);
    const handleInputChange=(e)=>{
        const {name,value}=e.target;     
        setFormData({
            ...formData,
         [name]:value
        })
    };

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        dispatch(login(formData));
        if(!showDialog){
          const timer=setTimeout(()=>{
            Navigate('/dashboard');
         },1000)
        }
    };

    useEffect(()=>{
      if(showDialog){
        const timer=setTimeout(()=>{
           Navigate('/');
        },5000)
      }
    },[showDialog]);

    const handleReset= async(e)=>{
        try{
           e.preventDefault();
           if(!formData.email){
            setShowEmail(true);
            return;
           }
           const body=JSON.stringify({email:formData.email});
           const res=await axiosApi.post('user/auth/forgot-password',body);
           if(res.status===200){
              setShowDialog(true);
           }
        }catch(err){
          console.error(err.message);
        }
    };

  return (
    <div>
      <div className="font-bold shadow hover:shadow-md hover:bg-red-200 text-2xl border-2 text-center w-fit  border-red-200 rounded  mx-auto mb-10 mt-6 h-8">        
        SynchroTask</div>
       <div className='w-1/3 mx-auto border-2 shadow'>
    <form className='mx-2' onSubmit={handleFormSubmit}>         

      
      <div>
      <label className='block text-gray-500 text-lg font-medium' >email: </label>
      <input
        type='email'
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className='w-full border-2 border-red-100   rounded-md p-2 mt-1 '
        required
      >
      </input>
      </div>
      <div>
      <label className='block text-gray-500 text-lg font-medium' >password: </label>
      <input
        type='password'
        name="password"
        autoComplete='current-password'
        value={formData.password}
        onChange={handleInputChange}
        className='w-full border-2 border-red-100   rounded-md p-2 mt-1 '
        required
      >
      </input>
      <div className=' flex justify-end'>
        <button onClick={handleReset}>Forgot Password?</button>
      </div>
      {showEmail && (<div className=' text-red-500'>
        Enter your email to forgot password & click Forgot !
      </div>)}
      </div>
      {showDialog && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center  justify-center z-50">
              <div className=" bg-slate-200 border-2 text-center border-gray-700 rounded-md  m-10">
                <h2 className=" text-xl font-bold mb-4">Password Reset Link:</h2>
                <p className=" mb-4">A Password reset link has been sent to you email.Please click the link to forgot password.</p>
                <Link to="/"><button className="bg-white w-20 h-8 pb-5">Home</button></Link>
              </div>  
            </div>   
          )}
      <div className='my-5 text-center'>
        <button className='bg-slate-100 border-2 border-red-100 hover:bg-slate-200 focus:bg-slate-300 w-28 text-xl font-medium' type="submit">Login</button>
      </div>
    </form>
    </div>
    </div>
  )
}

export default Login
