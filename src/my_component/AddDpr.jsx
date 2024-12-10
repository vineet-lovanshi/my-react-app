import React, { useState, useEffect } from "react";
import dprLogo from "../Images/addDpr_Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyNav from "./MyNav";
import { useForm } from "react-hook-form";
import "./AddDpr.css";

const AddDpr = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    },
  });

  const [currentISTTime, setCurrentISTTime] = useState("");
  const navigate = useNavigate();

  const getIndianTime = () => {
    const now = new Date();
    const istOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const istTime = new Date(utc + istOffset);

    const hours = istTime.getHours();
    const minutes = String(istTime.getMinutes()).padStart(2, "0");
    const seconds = String(istTime.getSeconds()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes}:${seconds} ${period}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentISTTime(getIndianTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), d * 1000);
    });
  };

  const decodeToken = (token) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadDecoded = atob(payloadBase64);
      const payload = JSON.parse(payloadDecoded);

      return {
        name: payload.namString || null,
        id: payload.userId || null,
        email: payload.sub || payload.userEmail || null,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { name: null, email: null, id: null };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
    if (token) {
      const { name, email, id } = decodeToken(token);

      if (email === "admin@gmail.com") {
        navigate("/");
      }

      reset({
        id: id || "",
        name: name || "",
        email: email || "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [reset, navigate]);

  const onSubmit = async (data) => {
    await delay(3);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        await axios.post(
          "http://localhost:8080/save-report",
          {
            userId: data.id.trim(),
            userName: data.name.trim(),
            userEmail: data.email.trim(),
            userReport: data.description.trim(),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        alert("Report saved successfully!");
      } else {
        alert("User not logged in");
      }
    } catch (error) {
      alert("Failed to save report");
      console.error("Error while saving report", error);
    }
  };

  return (
    <div className="dpr-container w-full min-h-screen flex flex-col bg-gray-100">
      <MyNav />
      <div className="flex flex-grow items-center justify-center px-4 lg:flex-row flex-col">
        <div className="lg:w-1/2 flex flex-col justify-center items-center p-4 text-center">
          <img
            src={dprLogo}
            alt="DPR Logo"
            className="w-auto max-w-sm lg:h-auto lg:w-full transition-transform hover:scale-110"
          />
          <p className="mt-6 text-gray-700 text-lg font-medium max-w-md">
            “The key to success is action, and the essential in action is
            perseverance.”
          </p>
        </div>

        <div className="lg:w-1/2 bg-white shadow-lg rounded-lg p-8 max-w-xl">
          {isSubmitting && (
            <div className="submit text-center">
              Data Submitting Please Wait...
            </div>
          )}
          <h2 className="text-2xl font-bold text-center mb-6">
            Submit Your Daily Progress Report
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 grid-cols-2"
          >
            <input type="hidden" {...register("id", { required: true })} />

            <div className="col-span-1">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-400"
                readOnly
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-400"
                readOnly
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="date" className="block text-gray-700">
                Date
              </label>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-400"
                readOnly
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="time" className="block text-gray-700">
                Time
              </label>
              <input
                type="text"
                value={currentISTTime}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-400"
                readOnly
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block text-gray-700">
                Description
              </label>
              <textarea
                rows="4"
                {...register("description", {
                  required: { value: true, message: "Description is required" },
                  minLength: {
                    value: 10,
                    message: "Min length is 10 characters",
                  },
                })}
                className="w-full p-2 border rounded-md"
              ></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 mt-4 hover:bg-blue-600"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDpr;
