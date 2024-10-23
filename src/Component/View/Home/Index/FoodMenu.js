import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";
import Order from "../Details/Order";
import "./FoodMenu.css";

const FoodMenu = () => {
  const [mainDishes, setMainDishes] = useState([]);
  const [page, setPage] = useState(0);
  const [TotalPage, setTotalPage] = useState();
  const [wishLists, setWishLists] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null); // State để lưu món ăn đã chọn
  const [showWishlistModal, setShowWishlistModal] = useState(false); // State để hiển thị modal danh sách wishlist
  const [selectedWishListId, setSelectedWishListId] = useState(null); // ID của wishlist đã chọn
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const fetchMaindDishes = async () => {
    try {
      await axiosConfig
        .get(`/user/foodvariation/findFoodVariationByMainDishes?page=${page}`)
        .then((response) => {
          setMainDishes(response.data.content);
          setTotalPage(response.data.totalPages);
        });
    } catch (err) {
      console.log(err, "Lỗi không nhận dữ liệu");
    }
  };

  const fetchWishLists = async () => {
    const userId = localStorage.getItem("userIdLogin");
    try {
      const response = await axiosConfig.get(`/wishlist/user/${userId}`);
      setWishLists(response.data);
    } catch (error) {
      console.error("Error fetching wishlists", error);
    }
  };

  const Next = () => {
    setPage((prevPage) => {
      if (prevPage >= TotalPage - 1) {
        return 0; // Đặt lại page về 0 nếu prevPage lớn hơn hoặc bằng totalPages
      }
      return prevPage + 1; // Tăng page lên 1 nếu chưa quá totalPages
    });
  };
  const Previous = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    fetchMaindDishes();
    fetchWishLists(); // Fetch danh sách wishlist
  }, [page, wishLists]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (Food) => {
    setSelectedProduct(Food);
    console.log(Food, "Dữ liệu food");
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const openWishlistModal = (food) => {
    setSelectedFood(food); // Lưu món ăn đã chọn
    setShowWishlistModal(true); // Hiển thị modal danh sách wishlist
  };

  const closeWishlistModal = () => {
    setShowWishlistModal(false);
    setSelectedFood(null);
  };

  const addFoodToWishList = async (wishListId, foodId) => {
    try {
      const response = await axiosConfig.post(
        `/wishlist/${wishListId}/add-food/${foodId}`
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error adding food to wishlist:", error.response.data);
      } else {
        console.error("Error adding food to wishlist:", error.message);
      }
      throw error;
    }
  };

  const handleAddToWishlist = async () => {
    if (selectedWishListId && selectedFood) {
      try {
        const checkResponse = await axiosConfig.get(
          `/wishlist/${selectedWishListId}/contains-food/${selectedFood.foodId}`
        );

        if (checkResponse.data) {
          setAlert({
            type: "error",
            message: "This food is already in the selected wishlist!",
          });
          setTimeout(() => {
            setAlert(null);
          }, 2000);

          return; // Nếu có rồi, không làm gì thêm
        }

        const result = await addFoodToWishList(
          selectedWishListId,
          selectedFood.foodId
        );

        console.log("Added to wishlist:", result);
        setAlert({
          type: "success",
          message: "Added to wishlist successfully!",
        });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
        await fetchWishLists(); // Cập nhật lại danh sách wishlist
        closeWishlistModal(); // Đóng modal sau khi thêm thành công
      } catch (error) {
        alert("Failed to add to wishlist: " + error.message);
      }
    }
  };

  if (mainDishes == null) {
    return null;
  }

  return (
    <div>
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="menu-container ">
        {mainDishes.map((item) => (
          <div key={item.foodVariationId} className="menu-item">
            <div className="image-discount">
              <Link to={`FoodDetails/${item.foodVariationId}`}>
                <img
                  src={`/assets/images/${item.food.imageUrl}`}
                  alt={item.name}
                  className="menu-image"
                />
              </Link>
              <div className="disscount1">Discount:{item.food.discount}%</div>
            </div>

            <div className="menu-details">
              <div className="menu-header">
                <h3>{item.food.foodName}</h3>
                <div>
                  <b className="price">
                    {(
                      item.food.basePrice -
                      (item.food.discount / 100) * item.food.basePrice
                    ).toLocaleString("vi-VN")}{" "}
                    đ
                  </b>
                  <del className="price">
                    {item.food.basePrice.toLocaleString("vi-VN")}đ
                  </del>
                </div>

                <h5 className="description">{item.food.description}</h5>
                <div className="menu-footer">
                  <p>sold:{item.quantityStock}</p>
                  <p>Rating: 5⭐</p>
                </div>
              </div>
              <div className="row d-flex justify-content-center ">
                <button
                  onClick={() => openModal(item)}
                  className="col-sm-4 me-3"
                  disabled={!item.quantityStock}
                >
                  {item.quantityStock ? "Order" : "Out of stock"}
                </button>

                <button
                  className="col-sm-4"
                  onClick={() => openWishlistModal(item)}
                >
                  {customTranslate("Add to Wishlist")}
                </button>
                {/* <button className="col-sm-4 ">
          Add to cart
          </button> */}
              </div>
            </div>
          </div>
        ))}
        <Order product={selectedProduct} onClose={closeModal} />
      </div>

      {/* Modal chọn Wishlist */}
      {showWishlistModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select a Wishlist</h2>
            <ul>
              {wishLists.map((wishList) => (
                <li key={wishList.wishListId}>
                  <button
                    onClick={() => setSelectedWishListId(wishList.wishListId)}
                  >
                    {wishList.wishListName}
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={handleAddToWishlist}>Add to Wishlist</button>
            <button onClick={closeWishlistModal}>Cancel</button>
          </div>
        </div>
      )}

      <h6>
        {page + 1}/{TotalPage}
      </h6>
      <button className="Button-Previous" onClick={Previous}>
        Previous
      </button>
      <button className="Button-next" onClick={Next}>
        Next
      </button>
    </div>
  );
};

export default FoodMenu;
