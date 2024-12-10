import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const Home = () => {
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
  const date = new Date();
  const onSubmit = async (data) => {
    await delay(5);
    try {
      // Send the sign-up data to the backend
      await axios.post("http://localhost:8082/add", {
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
        <h2>Daily Progress Report</h2>
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
          {/* Date Field */}
          <div className="field">
            <p className="field-name">Date</p>
            <input
              className="date-text"
              {...register("date", {
                required: { value: true, message: "Date is required" },
              })}
              disabled
              type="date"
              defaultValue={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
            />
          </div>

          {/* Description Field */}
          <div className="field">
            <p className="field-name">Description</p>
            <textarea
              rows="5"
              className={errors.text ? "input-error" : ""}
              {...register("text", {
                required: { value: true, message: "Description is required" },
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters long",
                },
              })}
            ></textarea>
            {errors.text && <p className="error">{errors.text.message}</p>}
          </div>

          <div>
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
