import React, { useState, useEffect } from "react";
import "./Comment.css"; // Để thêm CSS cho component
import axiosConfig from "../../../Config/AxiosConfig";
import { jwtDecode } from "jwt-decode";

const Comment = ({ foodDetail }) => {
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState(""); // Thêm state để hiển thị thông báo

  // Lấy userId từ JWT token
  const fetchUserIdFromToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId); // Giả sử userId có trong payload của token
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  // Hàm fetch comments từ API
  const fetchComments = async () => {
    if (foodDetail && foodDetail.foodId) {
      try {
        const response = await axiosConfig.get(
          `/user/foodReview/findfoodReviewByFoodId/${foodDetail.foodId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
  };

  // Hàm xử lý khi submit review
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!foodDetail || !foodDetail.foodId) {
      console.error("foodId is undefined");
      return;
    }

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append("rating", rating);
    formData.append("review", review);
    formData.append("foodId", foodDetail.foodId);

    if (userId) {
      formData.append("userId", userId); // Thêm userId vào formData
    } else {
      console.error("User ID is undefined");
      return;
    }

    try {
      const response = await axiosConfig.post("/user/foodReview/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Added successfully", response);
      setMessage("Review submitted successfully!"); // Cập nhật thông báo thành công
      fetchComments(); // Lấy lại danh sách bình luận
      // Reset form
      setRating(0);
      setReview("");
      setFile(null);
    } catch (error) {
      console.error("Error in adding review:", error);
      setMessage("Error submitting review. Please try again."); // Cập nhật thông báo lỗi
    }
  };

  // Phương thức xử lý rating
  const handleRating = (value) => {
    setRating(value);
  };

  useEffect(() => {
    fetchUserIdFromToken(); // Lấy userId từ token khi component được mount
    fetchComments();
  }); // Thêm foodDetail vào dependency array

  return (
    <div className="review-container">
      {/* Form thêm review */}
      <form onSubmit={handleAdd} encType="multipart/form-data">
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`star ${value <= rating ? "active" : ""}`}
              onClick={() => handleRating(value)}
            >
              &#9733;
            </span>
          ))}
          <span className="rating-value">{rating} sao</span>
        </div>
        <div className="comment">
          <input
            type="text"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="styled-input"
            placeholder="Comment..."
            required
          />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Send</button>
        </div>
      </form>
      {message && <p className="message">{message}</p>} {/* Hiển thị thông báo */}
      <hr />
      {/* Hiển thị danh sách comment */}
      {comments.map((comment) => (
        <div key={comment.reviewId} className="comment-item">
          <div className="user-info">
            <div className="avatar">{/* Có thể thêm hình đại diện người dùng */}</div>
            <div className="user-details">
              <span className="user-name">{comment.userName || "Anonymous"}</span>{" "}
              <span className="review-date">{new Date(comment.reviewDate).toLocaleString()}</span>
            </div>
          </div>
          <div className="rating">{comment.rating} ⭐</div>
          <div className="comment-text">{comment.review}</div>
          {comment.imageUrl && (
            <div className="comment-image">
              {/* Cập nhật đường dẫn để phù hợp với ảnh người dùng đã đăng lên */}
              <img src={`${comment.imageUrl}`} alt="Review" />
            </div>
          )}
          <div className="reply">
            <span className="reply-from">TASTY Kitchen</span>
            <div className="reply-message">
              Cảm ơn quý khách đã tin yêu và ủng hộ TASTY, chúc quý khách có những trải nghiệm tuyệt
              vời cùng TASTY!
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Comment;
