// import React from "react";
import "./UserLogin.css";
import MyNav from "./MyNav";
import React, { useEffect, useState } from "react";
import HomeLogo from "../Images/Home_Logo2.png";
import { Modal, ModalHeader } from "reactstrap";

const UserLogin = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [modal, setModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
    if (token) {
      const { name, email, id } = decodeToken(token);
      setUserName(name);
      setUserEmail(email);
    }
  }, []);

  return (
    <>
      {showPopup ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="pop-up rounded-lg p-6 shadow-lg max-w-md w-full bg-white">
            <h2 className="text-2xl text-center font-bold bg-slate-300 rounded-lg text-gray-700  mb-4">
              Your Profile
            </h2>

            <div className="mb-4 flex">
              <label className="block text-gray-700 font-medium mb-1">
                User Name:
              </label>
              <p className="text-gray-900 font-semibold ml-6">{userName}</p>
            </div>

            <div className="mb-4 flex">
              <label className="block text-gray-700 font-medium mb-1">
                User Email:
              </label>
              <p className="text-gray-900 font-semibold ml-6">{userEmail}</p>
            </div>

            <p className="text-gray-600 mb-6">Welcome to the DPR App!</p>

            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-1 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="userLogin-container w-full min-h-screen flex flex-col bg-gray-100">
        <MyNav />

        {userEmail === "admin@gmail.com" && (
          <div className="bg-yellow-300 text-black text-lg font-bold py-3 text-center shadow-md">
            🎉 Welcome, Admin! You have full access to manage all user reports.
            🚀
          </div>
        )}

        <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
          <img
            src={HomeLogo}
            alt="DPR Logo"
            className="w-auto transition-transform hover:scale-110 sm:h-80 md:h-80"
          />
          {userName ? (
            <h1 className="hello-msg text-2xl font-bold sm:text-4xl md:text-4xl">
              Hello,{" "}
              <span className="user-name cursor-pointer">
                <a onClick={() => setShowPopup(true)}>{userName}</a>
              </span>
              !
            </h1>
          ) : (
            ""
          )}
          <h1 className="mt-6 text-3xl font-bold text-gray-800 transition-all sm:mt-8 sm:text-4xl md:text-5xl">
            Welcome to <span className="welcome-text">DPR WEB APP</span>
          </h1>

          <p className="mt-4 text-base text-gray-600 sm:mt-6 sm:text-lg md:text-xl">
            Manage and track your daily progress with ease.
          </p>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
