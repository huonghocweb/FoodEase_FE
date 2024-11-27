import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import Order from "../Details/Order";
const Propose = () => {
  const [Propose, setPropose] = useState([]);
  const userId = localStorage.getItem("userIdLogin");
  const fetchPropose = async () => {
    await axiosConfig
      .get(`/user/foodvariation/findFoodVariationByUserId/1`)
      .then((Response) => {
        setPropose(Response.data);
      });
  };
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openModal = (Food) => {
    setSelectedProduct(Food);
    console.log(Food, "Dữ liệu food");
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };
  useEffect(() => {
    fetchPropose();
  });
  return (
    <div className="menu-container ">
      {Propose.map((item) => (
        <div key={item.foodVariationId} className="menu-item">
          <div className="image-discount">
            <Link to={`FoodDetails/${item.foodVariationId}`}>
              <img
                src={`${item.food.imageUrl}`}
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
                <p>
                  {customTranslate("Sold")}:{item.quantityStock}
                </p>
                <p>{customTranslate("Rating")}: 5⭐</p>
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
            </div>
          </div>
        </div>
      ))}
      <Order product={selectedProduct} onClose={closeModal} />
    </div>
  );
};
export default Propose;
