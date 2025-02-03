import React from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import MyNav from "./MyNav";
import { useNavigate } from "react-router-dom";

const MyLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const message = location.state?.message || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      userEmail: data.email.trim(),
      userPassword: data.password.trim(),
    };

    try {
      const response = await axios.post("http://localhost:8080/login", payload);
      localStorage.setItem("token", JSON.stringify(response.data.access_token));
      alert("Login Success");
      navigate("/");
    } catch (error) {
      alert("Login Failed");
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="myLogin-container w-full min-h-screen flex flex-col bg-gray-100">
      <MyNav />

      <div className="flex flex-grow justify-center items-center px-4">
        <div className="login-card shadow-lg rounded-lg p-8 w-full max-w-md">
          {isSubmitting && (
            <div className="submit text-center -mt-5">Loading...</div>
          )}
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          {message && (
            <p className="text-red-500 text-center mb-4">{message}</p>
          )}{" "}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="text"
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.email ? "border-2 border-red-500" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.password ? "border-2 border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyLogin;
