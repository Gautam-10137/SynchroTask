import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showDialog,setShowDialog]=useState(false);
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;
    if (password !== confirmPassword) {
      setPasswordError("Password do not match");
      return;
    }
    dispatch(register(formData));
    setShowDialog(true);
  };

  return (
    <div>
      <div className="font-bold shadow hover:shadow-md hover:bg-red-200 text-2xl border-2 text-center w-fit  border-red-200 rounded  mx-auto mb-10 mt-6 h-8">
            SynchroTask
      </div>
      <div className="w-1/3 mx-auto border-2 shadow-md">
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-500 text-lg">name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className=" w-full border  rounded-md p-2 mt-1 "
              required
            ></input>
          </div>
          <div>
            <label className="block text-gray-500 text-lg">email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className=" w-full border  rounded-md p-2 mt-1 "
              required
            ></input>
          </div>
          <div>
            <label className="block text-gray-500 text-lg">password: </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              className=" w-full border  rounded-md p-2 mt-1 "
              required
            ></input>
          </div>
          <div>
            <label className="block text-gray-500 text-lg">
              confirm password:{" "}
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.currentPassword}
              onChange={handleInputChange}
              className=" w-full border  rounded-md p-2 mt-1 "
              required
            ></input>
          </div>
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <div className="my-5 text-center">
            <button
              className="bg-slate-100 border-2 border-red-100 hover:bg-slate-200 focus:bg-slate-300 w-28 text-xl font-medium"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        {showDialog && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center  justify-center z-50">
              <div className=" bg-slate-200 border-2 text-center border-gray-700 rounded-md  m-10">
                <h2 className=" text-xl font-bold mb-4">Email Verification</h2>
                <p className=" mb-4">A verification link has been sent to you email.Please verify your email to complete the registration.</p>
                <Link to="/"><button className="bg-white w-20 h-8 pb-5">Home</button></Link>
              </div>  
            </div>   
          )}
      </div>
    </div>
  );
};

export default Register;
