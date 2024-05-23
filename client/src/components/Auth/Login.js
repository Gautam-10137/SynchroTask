import React,{useState} from 'react'
import {useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice';
const Login = ({}) => {
    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    });

    const handleInputChange=(e)=>{
        const {name,value}=e.target;     
        setFormData({
            ...formData,
         [name]:value
        })
    }

    const handleFormSubmit=async (e)=>{
        e.preventDefault();
        dispatch(login(formData));
    }

  return (
    <div>
      <div className="font-bold shadow hover:shadow-md hover:bg-red-200 text-2xl border-2 text-center w-28  border-red-200 rounded bg-red-100 mx-auto mb-10 mt-6 h-8">        
        </div>
       <div className='w-1/3 mx-auto border-2 shadow'>
    <form className='mx-2' onSubmit={handleFormSubmit}>         
      
     <div>
      <label className='block text-gray-500 text-lg font-medium'>username: </label>
      <input
        type='text'
        name="username"
        value={formData.name}
        onChange={handleInputChange}
        className=' w-full border-2 border-red-100  rounded-md p-2 mt-1  '
        required
      >
      </input>
      </div>
      
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
      </div>
      <div className='my-5 text-center'>
        <button className='bg-slate-100 border-2 border-red-100 hover:bg-slate-200 focus:bg-slate-300 w-28 text-xl font-medium' type="submit">Login</button>
      </div>
    </form>
    </div>
    </div>
  )
}

export default Login
