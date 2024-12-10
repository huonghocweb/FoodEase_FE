import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
 
 
  const fetchMaindDishes = async () => {
    try {
      await axiosConfig
        .get(`/user/foodvariation/findFoodVariationByDrink?page=${page}`)
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
    fetchWishLists();
  }, [page, wishLists]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (Food) => {
    setSelectedProduct(Food);
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
      console.log(foodId);
      return response.data;
    } catch (error) {
      setAlert({
        type: "error",
        message: "Error adding food to wishlist!",
      });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      throw error;
    }
  };

  const handleAddToWishlist = async () => {
    if (selectedWishListId && selectedFood) {
      try {
        // Kiểm tra xem món ăn đã có trong wishlist chưa
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
        await fetchWishLists(); // Gọi lại API để cập nhật danh sách wishlist
        closeWishlistModal(); // Đóng modal sau khi thêm thành công
      } catch (error) {
        alert("Failed to add to wishlist");
      }
    }
  };

  //  số tiền sau khi giảm giá
  // const newPrice = mainDishes.food.basePrice - mainDishes.food.basePrice * mainDishes.food.discount / 100;
  // console.log(newPrice);
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
                  src={item.food.imageUrl}
                  alt={item.name}
                  className="menu-image"
                />
              </Link>
              <div className="disscount1">
                {customTranslate("Discount")}:{item.food.discount}%
              </div>
            </div>

            <div className="menu-details">
              <div className="menu-header">
                <h3>{customTranslate(`${item.food.foodName}`)}</h3>
                <div>
                  <b className="price">
                    {" "}
                    {(
                      item.food.basePrice -
                      (item.food.basePrice * item.food.discount) / 100
                    ).toLocaleString("vi-VN")}
                    đ
                  </b>
                  <del className="price">
                    {item.food.basePrice.toLocaleString("vi-VN")}đ
                  </del>
                </div>
                <h5 className="description">
                  {customTranslate(`${item.food.description}`)}
                </h5>
                <div className="menu-footer">
                  <p>Stock:{item.quantityStock}</p>
                  
                </div>
              </div>
              <div className="row d-flex justify-content-center ">
                <button
                  onClick={() => openModal(item)}
                  className="col-sm-4 me-3"
                  disabled={!item.quantityStock}
                >
                  {item.quantityStock
                    ? customTranslate("Order")
                    : customTranslate("Out of stock")}
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
            <h2>{customTranslate("Select a Wishlist")}</h2>
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
            <button onClick={handleAddToWishlist}>
              {customTranslate("Add to Wishlist")}
            </button>
            <button onClick={closeWishlistModal}>
              {customTranslate("Cancel")}
            </button>
          </div>
        </div>
      )}

      <h6>
        {page + 1}/{TotalPage}
      </h6>
      <button className="Button-Previous" onClick={Previous}>
        {customTranslate("Previous")}
      </button>
      <button className="Button-next" onClick={Next}>
        {customTranslate("Next")}
      </button>
    </div>
  );
};

export default FoodMenu;
