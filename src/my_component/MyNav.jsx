import React, { useState } from "react";
import DPRLogo from "../Images/dpr-logo.png";
import "../my_component/MyNav.css";
import { useNavigate } from "react-router-dom";

const MyNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage?.getItem("token");

  const decodeToken = (token) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadDecoded = atob(payloadBase64);
      const payload = JSON.parse(payloadDecoded);
      return {
        email: payload.sub || payload.userEmail || null,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return { email: null };
    }
  };

  const userEmail = token ? decodeToken(token).email : null;

  return (
    <div>
      <nav className="myNav-container flex justify-between items-center h-16 px-8 text-black bg-white drop-shadow-md relative">
        <a onClick={() => navigate("/")}>
          <img
            src={DPRLogo}
            alt="DPR Logo"
            className="h-20 w-auto hover:scale-125 transition-all"
          />
        </a>

        <div className="hidden md:flex items-center gap-12 text-base font-semibold">
          <a
            onClick={() => navigate("/")}
            className="py-0.5 px-2 hover:bg-blue-500 hover:text-white rounded-md transition-all cursor-pointer"
          >
            {token ? "Home" : ""}
          </a>

          {token && userEmail !== "admin@gmail.com" && (
            <a
              onClick={() => navigate("/addReport")}
              className="py-0.5 px-2 hover:bg-blue-500 hover:text-white rounded-md transition-all cursor-pointer"
            >
              Add Report
            </a>
          )}

          <a
            onClick={() => {
              if (token) {
                if (userEmail === "admin@gmail.com") {
                  navigate("/viewAllReport");
                } else {
                  navigate("/viewReport");
                }
              }
            }}
            className="py-0.5 px-2 hover:bg-blue-500 hover:text-white rounded-md transition-all cursor-pointer"
          >
            {token
              ? userEmail === "admin@gmail.com"
                ? "View All Report"
                : "View Report"
              : ""}
          </a>
        </div>

        <div className="flex gap-x-4">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="px-5 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                Sign in
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
              className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Logout
            </button>
          )}
        </div>

        <div className="menu-button md:hidden">
          <i
            className="bx bx-menu text-5xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></i>
        </div>

        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-lg px-8 py-4 flex flex-col gap-4 text-base font-semibold transition-transform ${
            isMenuOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <a
            onClick={() => navigate("/")}
            className="py-2 px-4 hover:bg-blue-500 hover:text-white rounded-md transition-all cursor-pointer"
          >
            Home
          </a>

          {token && userEmail !== "admin@gmail.com" && (
            <a
              onClick={() => navigate("/addReport")}
              className="py-2 px-4 hover:bg-blue-500 hover:text-white rounded-md transition-all cursor-pointer"
            >
              Add Report
            </a>
          )}

          <a
            onClick={() => {
              if (token) {
                if (userEmail === "admin@gmail.com") {
                  navigate("/viewAllReport");
                } else {
                  navigate("/viewReport");
                }
              }
            }}
            className="py-2 px-4 hover:bg-blue-500 hover:text-white rounded-md transition-all cursor-pointer"
          >
            {token
              ? userEmail === "admin@gmail.com"
                ? "View All Report"
                : "View Report"
              : ""}
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MyNav;
