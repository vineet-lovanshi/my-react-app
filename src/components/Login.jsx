import React from "react";
import "./form.css";
import axios from "axios";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    check,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const input = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    try {
      if (data.role === "Admin") {
        // Call admin login API
        const response = await axios.post(
          "http://localhost:8082/loginAdmin",
          input
        );
        if (response.data === false) {
          alert("Invalid email & password for Admin");
        } else {
          alert("Admin login successful");
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("role", "Admin");
          window.location.href = "/admin";
        }
      } else {
        // Call user login API
        const response = await axios.post(
          "http://localhost:8082/loginUser",
          input
        );
        if (response.data === false) {
          alert("Invalid email & password for User");
        } else {
          alert("User login successful");
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("role", "User");
          window.location.href = "/home";
        }
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const redirectSignUp = () => {
    window.location.href = "/signup";
  };

  return (
    <div>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <p className="field-name">Role</p>
            <select
              className={errors.role ? "input-error" : ""}
              {...register("role", {
                required: {
                  value: true,
                  message: "Role selection is required",
                },
              })}
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && <p className="error">{errors.role.message}</p>}
          </div>
          <div>
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          </div>
          <a onClick={redirectSignUp}>SignUp</a>
        </form>
      </div>
    </div>
  );
};

export default Login;
