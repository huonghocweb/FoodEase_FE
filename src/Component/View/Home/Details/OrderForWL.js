import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";

import "./Order.css";

const OrderForWL = ({ product, onClose }) => {
  //  dử liệu size Name
  const [selectedSize, setSelectedSize] = useState(null);
  // dử liệu tổng tiền
  const [total, setTotal] = useState(0);
  // dử liệu bảng foodSize được nhận từ quá trình findFoodSizeById vàSizeName
  const [foodVariation, setFoodVariation] = useState(null);
  // dử liệu  lấy từ bảng foodSize
  const [TableFoodSize, setTableFoodSize] = useState([]);
  // dử liệu lấy từ bảng database topping
  const [TableToppings, setTableToppings] = useState([]);
  // dử liệu được lấy từ từ quá trình chọn topping
  const [SelectedTopping, setSelectedToppings] = useState([]);
  // dử liệu chứa tổng tiền của topping
  const [totalToppingPrice, setTotalToppingPrice] = useState(0);
  const [FoodVariationgTopping, setFoodVariationTopping] = useState([]);
  const [alert, setAlert] = useState(null);

  // lấy dử liệu từ bảng topping
  const fetchToppings = async () => {
    axiosConfig.get("/user/topping/findAllTopping").then((response) => {
      setTableToppings(response.data);
    });
  };

  const fetchFoodVariationTopping = async () => {
    axiosConfig
      .get(`/user/topping/findVariationTopping/${product.foodId}`)
      .then((response) => {
        setFoodVariationTopping(response.data);
        console.log("dử liệu của foodVariationTopping", response.data);
      });
  };

  // lấy giá trị bảng foodSize theo tên size
  // const fetchFoodSize = async ()=>{
  //   axios.get('http://localhost:8080/user/findAllFoodSize')
  //   .then(response=>{
  //     setTableFoodSize(response.data)

  //   })
  // }

  const fetchFoodSize = async () => {
    axiosConfig
      .get(`/user/foodSize/findFoodSizeByFoodId/${product.foodId}`)
      .then((response) => {
        setTableFoodSize(response.data);
        console.log("dử liệu size", response.data);
      });
  };
  // tính tổng tiền topping
  const fetchTopping = async () => {
    console.log(SelectedTopping);
    // tính tổng tiền topping và + vào total

    setTotalToppingPrice(
      SelectedTopping.reduce((accumulator, topping) => {
        return accumulator + topping.toppings.price;
      }, 0)
    );

    console.log(totalToppingPrice);
  };
  // số tiền sau khi giảm giá
  let newPrice = 0;
  if (product) {
    newPrice = product.basePrice - (product.basePrice * product.discount) / 100;
  }
  // tiến hành cập nhật số tiền total
  const fetchToTal = async () => {
    if (foodVariation) {
      console.log(foodVariation, "dữ liệu của foodVariation");
      setTotal(foodVariation.foodSize.price + newPrice);
    }
    if (totalToppingPrice) {
      setTotal(newPrice + totalToppingPrice);
    }
    if (foodVariation && totalToppingPrice) {
      setTotal(newPrice + totalToppingPrice + foodVariation.foodSize.price);
    }
  };
  // sử dụng useEffect để tiến hành chạy và cập nhật giá trị mới nhất
  useEffect(() => {
    fetchToppings();
    fetchToTal();
    fetchTopping();

    // nếu có dử liệu product mới được gọi
    if (product) {
      fetchFoodSize();
      fetchFoodVariationTopping();
    }

    console.log(product, "dử liệu product");
    console.log("dử liệu topping id", SelectedTopping);
  }, [foodVariation, SelectedTopping, totalToppingPrice, product]);

  if (!product) return <div></div>;

  const handleSizeChange = (event) => {
    const newSize = event.target.value; // Lưu giá trị mới
    setSelectedSize(newSize); // Cập nhật kích thước được chọn
    console.log("size name là", newSize);
    axiosConfig
      .get(
        `/user/foodvariation/findFoodVariationBySize?id=${product.foodId}&sizeName=${newSize}`
      )
      .then((response) => {
        setFoodVariation(response.data);
        console.log(response.data, "dử liệu cảu foodSize");
      });
  };

  // sử lí nút checked
  const handleToppingChange = (topping) => {
    const toppingId = topping.toppingId;
    // Kiểm tra trạng thái của checkbox
    const checkbox = document.querySelector(
      `input[value="${topping.toppingId}"]`
    );
    const isChecked = checkbox.checked;
    if (isChecked) {
      // Nếu checkbox được chọn, thêm topping vào danh sách
      setSelectedToppings((prev) => [...prev, topping]);
    } else {
      // Nếu checkbox bị bỏ chọn, loại bỏ topping ra khỏi danh sách
      setSelectedToppings((prev) =>
        prev.filter((t) => t.toppingId !== toppingId)
      );
    }
  };

  const handleAddToCart = async (foodVaId) => {
    console.log(foodVaId);
    const quantity = 1;
    const cartId = 1;
    try {
      const resCart = await axiosConfig.post(
        `/cart/addCartItem/${cartId}/${foodVaId}/${quantity}`
      );
      setAlert({
        type: "success",
        message: "Add Food To Cart Success",
      });
      setTimeout(() => {
        setAlert(null);
        onClose();
      }, 2000);
      console.log(resCart.data);
    } catch (error) {
      console.error("error in handle add to Cart", error);
    }
  };

  return (
    <div>
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="modal">
        <div className="modal-content">
          <span
            className="close"
            onClick={() => {
              onClose && onClose();
              setTotal(0);
              setSelectedToppings([]);
            }}
          >
            &times;
          </span>
          <h2>{customTranslate("Order")}</h2>
          <div className="image-container">
            <img src={`${product.imageUrl}`} alt="" className="product-image" />
            <div className="disscount2">
              {customTranslate("Discount")}:{product.discount}%
            </div>
          </div>
          {/* nếu số lượng = 0 thì sẻ hiển thị  */}

          {foodVariation && foodVariation.quantityStock === 0 && (
            <span className="out-of-stock1">
              {" "}
              {customTranslate("Out of stock")}
            </span>
          )}
          <h4>{customTranslate(`${product.foodName}`)} </h4>
          <div>
            <b className="price"> {newPrice.toLocaleString("vi-VN")}đ</b>
            <del className="price">
              {product.basePrice.toLocaleString("vi-VN")}đ
            </del>
          </div>

          <div className="options">
            <div className="size-options">
              <h4> {customTranslate("Size")}</h4>
              {TableFoodSize.map((foodSize) => (
                <div key={foodSize.foodSizeId}>
                  <input
                    type="radio"
                    name="size"
                    value={foodSize.foodSizeName} // sử dụng giá trị từ sizeName
                    onClick={handleSizeChange}
                  />
                  {customTranslate(`${foodSize.foodSizeName}`)}{" "}
                  <span>+ {foodSize.price.toLocaleString("vi-VN")}</span>
                </div>
              ))}

              <br />
              {foodVariation && (
                <h4>
                  {customTranslate("Sold")}:{foodVariation.quantityStock}
                </h4>
              )}
            </div>

            {product && (
              <div className="topping-options">
                <h4>{customTranslate("Topping")}</h4>
                {FoodVariationgTopping.map((topping) => (
                  <div key={topping.toppingId}>
                    <input
                      type="checkbox"
                      name="topping"
                      value={topping.toppingId}
                      onChange={() => handleToppingChange(topping)}
                    />
                    {customTranslate(`${topping.toppings.toppingName}`)} +{" "}
                    <span>
                      {topping.toppings.price.toLocaleString("vi-VN")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {foodVariation && (
            <button
              className="Check"
              disabled={foodVariation.quantityStock <= 0}
              onClose
              onClick={() => handleAddToCart(foodVariation.foodVariationId)}
            >
              {customTranslate("Total")}: {total} đ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForWL;
