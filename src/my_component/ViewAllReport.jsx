import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyNav from "../my_component/MyNav";

const ViewAllReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      return decodedPayload;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      navigate("/");
    } else {
      const decoded = decodeToken(token);

      if (decoded?.userEmail !== "admin@gmail.com") {
        navigate("/");
      } else {
        const fetchReports = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8080/get-reports",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setReports(response.data);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching reports:", err);
            setError("Failed to fetch reports. Please try again later.");
            setLoading(false);
          }
        };

        fetchReports();
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNav />

      <div className="container mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center">All Reports</h1>

        {loading && <p className="text-center">Loading reports...</p>}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && reports.length > 0 ? (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">No.</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Report</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.userName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.userEmail}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {report.userReport}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && !error && <p className="text-center">No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewAllReport;
