import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import Order from "../Details/Order";
const WishList = () => {
  const [wishLists, setWishLists] = useState([]);
  const [newWishListName, setNewWishListName] = useState("");
  const [renameWishListId, setRenameWishListId] = useState(null);
  const [renameWishListName, setRenameWishListName] = useState("");
  const [selectedWishListId, setSelectedWishListId] = useState(null);
  const [foods, setFoods] = useState([]); // Khởi tạo là mảng
  const [selectedProduct, setSelectedProduct] = useState(null);
  const userId = localStorage.getItem("userIdLogin");

  useEffect(() => {
    if (userId) {
      fetchWishLists();
    }
  }, [userId]);

  const fetchWishLists = async () => {
    try {
      const response = await axiosConfig.get(
        `/wishlist/get-wishlist/user/${userId}`
      );
      setWishLists(response.data);
    } catch (error) {
      console.error("Error fetching wishlists", error);
    }
  };

  const fetchFoods = async (wishListId) => {
    try {
      const response = await axiosConfig.get(`/wishlist/${wishListId}/foods`);
      console.log(response.data); // Kiểm tra xem response có chứa quantityStock không
      setFoods(response.data || []);
      setSelectedWishListId(wishListId);
    } catch (error) {
      console.error("Error fetching foods", error);
      setFoods([]);
    }
  };

  const addWishList = async () => {
    try {
      await axiosConfig.post(`/wishlist/user/${userId}`, {
        wishListName: newWishListName,
      });
      fetchWishLists();
      setNewWishListName("");
    } catch (error) {
      console.error("Error adding wishlist", error);
    }
  };

  const deleteWishList = async (id) => {
    try {
      await axiosConfig.delete(`/wishlist/delete/${id}`);
      fetchWishLists();
      setSelectedWishListId(null);
      setFoods([]); // Reset foods khi wishlist bị xóa
    } catch (error) {
      console.error("Error deleting wishlist", error);
    }
  };

  const renameWishList = async (id) => {
    try {
      await axiosConfig.put(`/wishlist/rename/${id}`, {
        wishListName: renameWishListName,
      });
      fetchWishLists();
      setRenameWishListId(null);
      setRenameWishListName("");
    } catch (error) {
      console.error("Error renaming wishlist", error);
    }
  };

  const cancelRename = () => {
    setRenameWishListId(null);
    setRenameWishListName("");
  };

  const removeFoodFromWishList = async (wishListId, foodId) => {
    try {
      const response = await axiosConfig.delete(
        `/wishlist/${wishListId}/remove-food/${foodId}`
      );
      fetchFoods(wishListId);
    } catch (error) {
      console.error("Error removing food from wishlist", error);
    }
  };
  const openModal = (food) => {
    setSelectedProduct(food);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <div>
      <h1>Wish List</h1>
      <input
        type="text"
        value={newWishListName}
        onChange={(e) => setNewWishListName(e.target.value)}
        placeholder="Enter your wish list name"
      />
      <button onClick={addWishList}>Add</button>
      <ul>
        {wishLists.map((wishList) => (
          <li key={wishList.wishListId}>
            <span
              onClick={() => fetchFoods(wishList.wishListId)}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {wishList.wishListName}
            </span>
            <button onClick={() => deleteWishList(wishList.wishListId)}>
              Delete
            </button>
            {renameWishListId === wishList.wishListId ? (
              <>
                <input
                  type="text"
                  value={renameWishListName}
                  onChange={(e) => setRenameWishListName(e.target.value)}
                  placeholder="Enter new name"
                />
                <button onClick={() => renameWishList(wishList.wishListId)}>
                  Rename
                </button>

                <button onClick={cancelRename}>Cancel</button>
              </>
            ) : (
              <button onClick={() => setRenameWishListId(wishList.wishListId)}>
                Rename
              </button>
            )}
          </li>
        ))}
      </ul>

      {selectedWishListId && (
        <div>
          <h2>
            {
              wishLists.find(
                (wishList) => wishList.wishListId === selectedWishListId
              )?.wishListName
            }
          </h2>
          <div className="menu-container">
            {Array.isArray(foods) &&
              foods.map(
                (
                  food // Kiểm tra xem foods có phải là mảng không
                ) => (
                  <div key={food.foodVariationId} className="menu-item">
                    <div className="image-discount">
                      <Link to={`FoodDetails/${food.foodVariationId}`}>
                        <img
                          src={`/assets/images/${food.imageUrl}`}
                          alt={food.name}
                          className="menu-image"
                        />
                      </Link>
                      <div className="disscount1">
                        {`Discount: ${food.discount}%`}{" "}
                        {/* Hiển thị giảm giá */}
                      </div>
                    </div>
                    <div className="menu-details">
                      <div className="menu-header">
                        <h3>{food.foodName}</h3>
                        <div>
                          <b className="price">
                            {(
                              food.basePrice -
                              (food.discount / 100) * food.basePrice
                            ).toLocaleString("vi-VN")}{" "}
                            đ
                          </b>
                          <del className="price">
                            {food.basePrice.toLocaleString("vi-VN")}đ
                          </del>
                        </div>
                        <h5 className="description">{food.description}</h5>
                        <div className="menu-footer">
                          <p>
                            {customTranslate("sold")}: {food.foodVariations.quantityStock || "chưa có"} 
                          </p>
                          <p>{customTranslate("Rating")}: 5⭐</p>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-center">
                        <button
                          onClick={() => openModal(food)}
                          className="col-sm-4 me-3"
                          disabled={!food.quantityStock}
                        >
                          {customTranslate(
                            food.quantityStock ? "Order" : "Out of stock"
                          )}
                        </button>

                        <button
                          onClick={() =>
                            removeFoodFromWishList(
                              selectedWishListId,
                              food.foodId
                            )
                          }
                          className="col-sm-4"
                        >
                          Remove
                        </button>
                        <Order product={selectedProduct} onClose={closeModal} />
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
