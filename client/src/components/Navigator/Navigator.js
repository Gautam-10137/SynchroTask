import React from 'react'
import {Link} from 'react-router-dom';
const Navigator = () => {
  return (
    <div className=' w-screen flex justify-between p-5 bg-slate-200 ' >
      <div className=' pl-5 '>SynchroTask</div>
      <div className=' pr-5'>
        <div>
            <Link to="/login">Login</Link>
        </div>
        <div>
            <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Navigator
