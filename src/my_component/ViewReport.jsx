import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyNav from "./MyNav";
import "./ViewReport.css";

const ViewReport = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        if (!token) {
          alert("Please login first..");
          navigate("/login");
        }
        const response = await axios.get("http://localhost:8080/user/reports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("Reports:", response.data);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="container-main min-h-screen bg-gray-100">
      <MyNav />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Daily Progress Reports
        </h1>
        {loading ? (
          <p className="text-center text-gray-500">Loading reports...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-500">No reports available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Report</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{report.userName}</td>
                    <td className="p-3">{report.userEmail}</td>
                    <td className="p-3">{report.userReport}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReport;
