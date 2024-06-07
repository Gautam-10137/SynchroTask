import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigator = ({ page }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="w-screen flex justify-between items-center p-5 bg-gray-800 text-white">
      <div className="pl-5 text-2xl font-bold">
        <Link to="/" className="hover:text-gray-300 transition duration-300">
          SynchroTask
        </Link>
      </div>
      <div className="text-xl font-semibold">{page}</div>
      <div className="pr-5">
        {!isAuthenticated ? (
          <div className="flex space-x-4">
            <Link to="/login" className="text-blue-300 hover:text-blue-500 transition duration-300">
              Login
            </Link>
            <Link to="/register" className="text-blue-300 hover:text-blue-500 transition duration-300">
              SignUp
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <span>Hello, {user.name}</span>
            <Link to="/logout" className="text-red-300 hover:text-red-500 transition duration-300">
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigator;
