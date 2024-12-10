import React, { useState } from "react";
import MyNav from "./MyNav";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./SignUp.css";
const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    check,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve();
      }, d * 1000);
    });
  };

  const onSubmit = async (data) => {
    await delay(5);
    try {
      // Send the sign-up data to the backend
      await axios.post("http://localhost:8080/save-user", {
        userName: data.name.trim(),
        userEmail: data.email.trim(),
        userPassword: data.password.trim(),
      });
      alert("Sign-up successful!"); // Optional: Success message
      window.location.href = "/login";
    } catch (error) {
      alert("Sign in failed");
      console.error("Sign-up failed", error);
    }
  };

  return (
    <div className="myLogin-container w-full min-h-screen flex flex-col bg-gray-100">
      {/* Keep Navbar Design Untouched */}
      <MyNav />

      {/* Login Form Card */}
      <div className="flex flex-grow justify-center items-center px-4">
        <div className="login-card shadow-lg rounded-lg p-8 w-full max-w-md">
          {isSubmitting && (
            <div className="submit text-center">
              Data Submitting Please Wait...
            </div>
          )}
          <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block   text-gray-700">
                Name
              </label>
              <input
                type="text"
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                  minLength: { value: 4, message: "Min length is 4" },
                  validate: (value) =>
                    value.trim() !== "" || "Empty space are not allowed",
                })}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block   text-gray-700">
                Email
              </label>
              <input
                type="text"
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  minLength: { value: 4, message: "Min length is 4" },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Empty space are not allowed",
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block   text-gray-700">
                Password
              </label>
              <input
                type="password"
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: { value: 4, message: "Min length is 4" },
                  validate: (value) =>
                    value.trim() !== "" || "Empty space are not allowed",
                })}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block   text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.name ? "input-error" : ""
                }`}
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  minLength: { value: 4, message: "Min length is 4" },
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords are not equal";
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
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

export default SignUp;
