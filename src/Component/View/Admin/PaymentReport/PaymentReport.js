import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axiosConfig from "../../../Config/AxiosConfig";

const PaymentReport = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2024-10-19"); // Default start date
  const [endDate, setEndDate] = useState("2024-11-02"); // Default end date

  const fetchRevenue = async () => {
    const requestData = {
      startDate: startDate,
      endDate: endDate,
    };

    try {
      const response = await axiosConfig.post(
        "/report/revenue-by-payment-method",
        requestData
      );
      setRevenueData(response.data); // Save data to state
    } catch (error) {
      setError(error.response ? error.response.data : error.message); // Save error to state
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [startDate, endDate]); // Call when start or end date changes

  // Handle display of loading state, error, or data
  if (loading) {
    return <p>Loading...</p>; // Display loading text while fetching
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>; // Display error if any
  }

  // Currency formatting function
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">Payment Revenue Report</h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="paymentMethodName" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="totalRevenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4">
        {revenueData.length > 0 ? (
          <ul className="list-group">
            {revenueData.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.paymentMethodName}: {formatCurrency(item.totalRevenue)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No revenue data available.</p> // Display a message if there's no data
        )}
      </div>
    </div>
  );
};

export default PaymentReport;
