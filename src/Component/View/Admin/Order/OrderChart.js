import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { customTranslate } from "../../../../i18n";
import "./chart.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OrderPage = () => {
  const [data, setData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState(null);

  // Fetch dữ liệu API khi month hoặc year thay đổi
  useEffect(() => {
    fetch(`http://localhost:8080/order/statistical?month=${month}&year=${year}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        prepareChartData(data.data);
      });
  }, [month, year]);

  // Chuẩn bị dữ liệu cho biểu đồ
  const prepareChartData = (apiData) => {
    const labels = apiData.labels; // Lấy nhãn (các ngày trong tháng)
    const values = apiData.values; // Lấy doanh thu của từng ngày

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Total Revenue",
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
        },
      ],
    });
  };

  return (
    <div className="order-page">
      <h1>{customTranslate("Order Revenue")}</h1>

      {/* Chọn tháng */}
      <label>{customTranslate("Month")}: </label>
      <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Chọn năm */}
      <label>{customTranslate("Year")}: </label>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
          (y) => (
            <option key={y} value={y}>
              {y}
            </option>
          )
        )}
      </select>

      {/* Hiển thị biểu đồ nếu có dữ liệu */}
      {chartData && (
        <div className="chart-container">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: { display: true, text: `Revenue for ${month}/${year}` },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OrderPage;
