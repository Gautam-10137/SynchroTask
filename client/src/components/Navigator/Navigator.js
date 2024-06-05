import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navigator = ({ page }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="w-screen flex justify-between p-5 bg-gray-800 text-white">
      <div className="pl-5 text-xl font-bold">SynchroTask</div>
      <div>{page}</div>
      {!isAuthenticated ? (
        <div className="pr-5">
          <div>
            <Link to="/login" className="text-blue-300 hover:text-blue-500">
              Login
            </Link>
          </div>
          <div>
            <Link
              to="/register"
              className="text-blue-300 hover:text-blue-500 ml-2"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className="pr-5">Hello, {user.name}</div>
      )}
    </div>
  );
};

export default Navigator;
