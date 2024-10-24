import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import react-hook-form
import { Link } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";
import Order from "../Details/Order";
import "./WishList.css";

const WishList = () => {
  const [wishLists, setWishLists] = useState([]);
  const [renameWishListId, setRenameWishListId] = useState(null);
  const [renameWishListName, setRenameWishListName] = useState("");
  const [selectedWishListId, setSelectedWishListId] = useState(null);
  const [foods, setFoods] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const userId = localStorage.getItem("userIdLogin");
  const [alert, setAlert] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // Initialize useForm

  useEffect(() => {
    if (userId) {
      fetchWishLists();
    }
  }, [userId]);

  const fetchWishLists = async () => {
    try {
      const response = await axiosConfig.get(`/wishlist/user/${userId}`);
      setWishLists(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching wishlists", error);
    }
  };

  const fetchFoods = async (wishListId) => {
    try {
      const response = await axiosConfig.get(`/wishlist/${wishListId}/foods`);
      console.log(response.data);
      setFoods(response.data);
      setSelectedWishListId(wishListId);
    } catch (error) {
      console.error("Error fetching foods", error);
    }
  };

  const addWishList = async (data) => {
    try {
      await axiosConfig.post(`/wishlist/create`, {
        wishListName: data.newWishListName,
        userId: userId,
      });
      fetchWishLists();
      reset();
    } catch (error) {
      console.error("Error adding wishlist", error);
    }
  };

  const deleteWishList = async (id) => {
    try {
      await axiosConfig.delete(`/wishlist/delete/${id}`);
      fetchWishLists();
      setSelectedWishListId(null);
      setFoods([]);
    } catch (error) {
      console.error("Error deleting wishlist", error);
    }
  };

  const renameWishList = async (id) => {
    try {
      await axiosConfig.put(`/wishlist/update/${id}`, {
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
      await axiosConfig.delete(`/wishlist/${wishListId}/remove-food/${foodId}`);
      fetchFoods(wishListId);
    } catch (error) {
      console.error("Error removing food from wishlist", error);
    }
  };

  const openModal = (food) => {
    setSelectedProduct(food);
    console.log(food, "Dữ liệu food");
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="wishList-container">
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleSubmit(addWishList)}>
        <input
          type="text"
          {...register("newWishListName", { required: true })} // Register input with validation
          placeholder="Enter your wish list name"
        />
        {errors.newWishListName && (
          <span className="error">This field is required</span>
        )}
        <button type="submit">Add</button>
      </form>
      <h1>Wish List</h1>
      <ul className="wishList-bar">
        {Array.isArray(wishLists) && wishLists.length > 0 ? (
          wishLists.map((wishList) => (
            <li
              key={wishList.wishListId}
              onClick={() => fetchFoods(wishList.wishListId)}
            >
              <span>{wishList.wishListName}</span>
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
                <button
                  onClick={() => setRenameWishListId(wishList.wishListId)}
                >
                  Rename
                </button>
              )}
            </li>
          ))
        ) : (
          <li>No wishlists available.</li> // Hiển thị khi không có wishlist nào
        )}
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
            {Array.isArray(foods) && foods.length > 0 ? (
              foods.map((food) => {
                // Lọc biến thể có quantityStock > 0
                const availableVariation = food.foodVariations.find(
                  (variation) => variation.quantityStock > 0
                );

                return (
                  <div key={food.foodId} className="menu-item">
                    <div className="image-discount">
                      {availableVariation ? (
                        <Link
                          to={`FoodDetails/${availableVariation.foodVariationId}`}
                        >
                          <img
                            src={`/assets/images/${food.imageUrl}`}
                            alt={food.foodName}
                            className="menu-image"
                          />
                        </Link>
                      ) : (
                        <img
                          src={`/assets/images/${food.imageUrl}`}
                          alt={food.foodName}
                          className="menu-image"
                        />
                      )}
                      <div className="disscount1">
                        {`Discount: ${food.discount}%`}
                      </div>
                    </div>
                    <div className="menu-details">
                      <div className="menu-header">
                        <h3>{food.foodName}</h3>
                        <div>
                          <b className="price">
                            {(
                              food.basePrice?.toLocaleString("vi-VN") -
                              (food.discount / 100) * food.basePrice?.toLocaleString("vi-VN")
                            )}{" "}
                            đ
                          </b>
                          <del className="price">
                            {food.basePrice?.toLocaleString("vi-VN")}đ
                          </del>
                        </div>
                        <h5 className="description">{food.description}</h5>
                        <div className="menu-footer">
                          <p>
                            {customTranslate("sold")}:{" "}
                            {availableVariation
                              ? availableVariation.quantityStock
                              : "chưa có"}
                          </p>
                          <p>{customTranslate("Rating")}: 5⭐</p>
                        </div>
                      </div>
                      <div className="row d-flex justify-content-center">
                        <button
                          onClick={() => openModal(food)}
                          className="col-sm-4 me-3"
                          disabled={!availableVariation}
                        >
                          {customTranslate(
                            availableVariation ? "Order" : "Out of stock"
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
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No foods available in this wishlist.</p> // Hiển thị khi không có món ăn nào
            )}
          </div>
        </div>
      )}
      <Order product={selectedProduct} onClose={closeModal} />;
    </div>
  );
};

export default WishList;
