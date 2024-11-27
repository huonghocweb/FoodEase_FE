import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import react-hook-form
import { Link } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";
import OrderForWL from "../Details/OrderForWL";
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
  const [showAddModal, setShowAddModal] = useState(false);

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
      setShowAddModal(false);
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
      setShowAddModal(false);
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
    console.log("Dữ liệu food", food);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => {
    setShowAddModal(false);
    setRenameWishListId(null);
    reset();
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
      <div className="wishList-header">
        <h1>{customTranslate("My WishLists")}</h1>
        <button className="add-wishList-btn" onClick={openAddModal}>
          +
        </button>
      </div>
      <ul className="wishList-bar">
        {Array.isArray(wishLists) && wishLists.length > 0 ? (
          wishLists.map((wishList) => (
            <li
              key={wishList.wishListId}
              onClick={() => fetchFoods(wishList.wishListId)}
            >
              <span className="wishListName">{wishList.wishListName}</span>
              <div className="dropdown-wishlist">
                <button className="dropdown-btn-wishlist">
                  <i className="fa fa-ellipsis-vertical "></i>
                </button>
                <div className="dropdown-content-wishlist">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenameWishListId(wishList.wishListId);
                      setShowAddModal(true);
                      setRenameWishListName(wishList.wishListName);
                    }}
                  >
                    {customTranslate("Rename")}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteWishList(wishList.wishListId);
                    }}
                  >
                    {customTranslate("Delete")}
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li> {customTranslate("No wishlists available")}.</li> // Hiển thị khi không có wishlist nào
        )}
      </ul>
      <h2 className="wishListName1">
        {
          wishLists.find(
            (wishList) => wishList.wishListId === selectedWishListId
          )?.wishListName
        }
      </h2>
      <img src="https://res.cloudinary.com/dudr7ajma/image/upload/v1732095765/blog/i9j8qeh174zv2myuv1tn.png"></img>
      <table className="wishlist-container-table">
        <thead>
          <tr>
            <th>{customTranslate("Remove")}</th>
            <th>{customTranslate("Image")}</th>
            <th>{customTranslate("Product Name")}</th>
            <th>{customTranslate("Unit Price")}</th>
            <th>{customTranslate("In Stock")}</th>
            <th>{customTranslate("Order")}</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(foods) && foods.length > 0 ? (
            foods.map((food) => {
              if (!food) {
                console.warn("Food object is undefined or null:", food);
                return null;
              }

              const newPrice =
                (food.basePrice || 0) -
                (food.discount / 100) * (food.basePrice || 0);

              const availableVariation = food.foodVariations?.find(
                (variation) => variation.quantityStock > 0
              );

              return (
                <tr key={food.foodId}>
                  <td>
                    <button
                      onClick={() =>
                        removeFoodFromWishList(selectedWishListId, food.foodId)
                      }
                      className="wishlist-remove-btn"
                    >
                      ×
                    </button>
                  </td>
                  <td>
                    {availableVariation ? (
                      <Link
                        to={`FoodDetails/${availableVariation.foodVariationId}`}
                      >
                        <img
                          src={food.imageUrl || ""}
                          alt={food.foodName || "No Name"}
                          className="wishlist-product-image"
                        />
                      </Link>
                    ) : (
                      <img
                        src={food.imageUrl || ""}
                        alt={food.foodName || "No Name"}
                        className="wishlist-product-image"
                      />
                    )}
                  </td>
                  <td>{customTranslate(`${food.foodName}`)}</td>
                  <td>
                    <div>
                      <b className="wishlist-price">
                        {newPrice.toLocaleString("vi-VN")} đ
                      </b>
                      <br />
                      <span className="wishlist-price-original">
                        {food.basePrice?.toLocaleString("vi-VN") || 0}đ
                      </span>
                    </div>
                  </td>
                  <td>
                    {availableVariation
                      ? `${availableVariation.quantityStock}`
                      : "Out of stock"}
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(food)}
                      className="wishlist-add-to-cart-btn"
                      disabled={!availableVariation}
                    >
                      {customTranslate(
                        availableVariation ? "Order" : "Out of stock"
                      )}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">{customTranslate("No products available in this wishlist")} .</td>
            </tr>
          )}
        </tbody>
      </table>
      {(showAddModal || renameWishListId) && (
        <div className="modal">
          <form
            onSubmit={handleSubmit(
              renameWishListId ? renameWishList : addWishList
            )}
          >
            <input
              type="text"
              {...register("newWishListName", { required: true })}
              placeholder="Enter wishlist name"
              defaultValue={renameWishListName || ""}
            />
            {errors.newWishListName && (
              <span className="error">This field is required</span>
            )}
            <button type="submit">{renameWishListId ? "Rename" : "Add"}</button>
            <button type="button" onClick={closeAddModal}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <OrderForWL product={selectedProduct} onClose={closeModal} />;
    </div>
  );
};

export default WishList;
