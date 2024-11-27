import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { customTranslate } from "../../../../i18n";
import './main.css';

const FoodReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1); 
  const [year, setYear] = useState(new Date().getFullYear());    

  // Gọi API khi filter thay đổi
  useEffect(() => {
    fetchReviews();
  }, [rating, month, year]);

  // Hàm fetch dữ liệu từ API
  const fetchReviews = () => {
    axios.get(`http://localhost:8080/food-review/filter`, {
      params: {
        rating: rating || null,
        month: month,
        year: year
      }
    })
    .then(response => {
      setReviews(response.data);
    })
    .catch(error => {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
    });
  };

  return (
    <div className="food-review-table">
      <h1>{customTranslate("Food Review Table")}</h1>

      {/* Bộ lọc */}
      <div className="filters">
        {/* Filter rating */}
        <label>{customTranslate("Rating")}: </label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All Ratings</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        {/* Filter month */}
        <label>{customTranslate("Month")}: </label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Filter year */}
        <label>{customTranslate("Year")}: </label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Bảng dữ liệu */}
      <table>
        <thead>
          <tr>
            <th>{customTranslate("ID")}</th>
            <th>{customTranslate("Rating")}</th>
            <th>{customTranslate("Review")}</th>
            <th>{customTranslate("Review Date")}</th>
            <th>{customTranslate("User name")}</th>
            <th>{customTranslate("Food Name")}</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review,index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{review.rating}</td>
                <td>{review.review}</td>
                <td>{review.reviewDate}</td>
                <td>{review.user.fullname}</td>
                <td>{customTranslate("")}{review.food.foodName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">{customTranslate("No reviews found")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodReviewTable;
