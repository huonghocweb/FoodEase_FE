import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";

const PaymentReport = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2024-10-19");
  const [endDate, setEndDate] = useState("2024-11-02");

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
      setRevenueData(response.data);
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenue();
  }, [startDate, endDate]);

  if (loading) {
    return <p>{customTranslate("Loading")}...</p>;
  }

  if (error) {
    return (
      <div>
        {customTranslate("Error")}: {JSON.stringify(error)}
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">
        {customTranslate("Payment Revenue Report")}
      </h1>
      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">{customTranslate("Start Date")}</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">{customTranslate("End Date")}</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10">
          <h3 className="text-center">
            {customTranslate("Total Revenue by Payment Method")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="paymentMethodName" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="totalRevenue" fill="#8884d8" name="Total Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ số lượng người dùng */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10">
          <h3 className="text-center">
            {customTranslate("User Count by Payment Method")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="paymentMethodName" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="userCount"
                stroke="#82ca9d"
                name="User Count"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ số lượng đơn hàng */}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="text-center">
            {customTranslate("Order Count by Payment Method")}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="paymentMethodName" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="orderCount"
                stroke="#ff7300"
                name="Order Count"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="mt-4">
        {revenueData.length > 0 ? (
          <ul className="list-group">
            {revenueData.map((item, index) => (
              <li key={index} className="list-group-item">
                {item.paymentMethodName}: {formatCurrency(item.totalRevenue)} -{" "}
                <strong>{customTranslate("Users")}:</strong> {item.userCount} -{" "}
                <strong>{customTranslate("Orders")}:</strong> {item.orderCount}
              </li>
            ))}
          </ul>
        ) : (
          <p>{customTranslate("No revenue data available")}.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentReport;
