import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./form.css";

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
      await axios.post("http://localhost:8082/addUser", {
        email: data.email.trim(),
        name: data.name.trim(),
        password: data.password.trim(),
      });
      alert("Sign-up successful!"); // Optional: Success message
      window.location.href = "/login";
    } catch (error) {
      console.error("Sign-up failed", error);
    }
  };
  const redirectLogin = () => {
    window.location.href = "/login";
  };
  return (
    <div>
      <div className="container">
        {isSubmitting && (
          <div className="submit">Data Submitting Please Wait...</div>
        )}
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <p className="field-name">Name</p>
            <input
              type="text"
              className={errors.name ? "input-error" : ""}
              {...register("name", {
                required: { value: true, message: "Name is required" },
                minLength: { value: 4, message: "Min length is 4" },
                validate: (value) =>
                  value.trim() !== "" || "Empty space are not allowed",
              })}
            ></input>
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div>
            <p className="field-name">Email</p>
            <input
              type="text"
              className={errors.email ? "input-error" : ""}
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
            ></input>
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div>
            <p className="field-name">Password</p>
            <input
              type="password"
              className={errors.password ? "input-error" : ""}
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: { value: 4, message: "Min length is 4" },
                validate: (value) =>
                  value.trim() !== "" || "Empty space are not allowed",
              })}
            ></input>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <div>
            <p className="field-name">Confirm Password</p>
            <input
              type="password"
              className={errors.confirmPassword ? "input-error" : ""}
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
            ></input>
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          </div>
          <a onClick={redirectLogin}>Login</a>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
