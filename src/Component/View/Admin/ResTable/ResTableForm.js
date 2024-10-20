import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // Để lấy params và điều hướng
import axiosConfig from "../../../Config/AxiosConfig";
import "./ResTable.css";
import { resTableSchema } from "./ValidationSchema";

const ResTableForm = () => {
  const { tableId } = useParams(); // Lấy tableId từ URL
  const navigate = useNavigate(); // Điều hướng sau khi hoàn thành
  const [tableCategories, setTableCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resTableSchema),
    defaultValues: {
      tableName: "",
      capacity: "",
      price: "",
      deposit: "",
      isAvailable: true,
      imageUrl: "",
      tableCategoryId: null,
    },
  });

  useEffect(() => {
    if (tableId) {
      // Lấy thông tin bàn từ API để chỉnh sửa
      axiosConfig.get(`/restables/get/${tableId}`).then((response) => {
        reset(response.data);
      });
    }
    axiosConfig.get("/tablecategories").then((response) => {
      setTableCategories(response.data);
    });
  }, [tableId, reset]);

  const onSubmit = (data) => {
    if (tableId) {
      // Cập nhật bàn
      axiosConfig
        .put(`/restables/update/${tableId}`, data)
        .then(() => navigate("/admin/resTableList")) // Điều hướng về danh sách sau khi cập nhật
        .catch((error) => console.error(error));
    } else {
      // Tạo mới bàn
      axiosConfig
        .post("/restables", data)
        .then(() => navigate("/admin/resTableList")) // Điều hướng về danh sách sau khi tạo
        .catch((error) => console.error(error));
    }
  };

  return (
    <form className="restable-form-container" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="restable-form-title">
        {tableId ? "Cập nhật bàn" : "Tạo bàn mới"}
      </h2>
      <div>
        <label className="restable-form-label">Table name</label>
        <input className="restable-form-input" {...register("tableName")} />
        {errors.tableName && (
          <p className="restable-form-error">{errors.tableName.message}</p>
        )}
      </div>

      <div>
        <label className="restable-form-label">Capacity</label>
        <input
          className="restable-form-input"
          type="number"
          {...register("capacity")}
        />
        {errors.capacity && (
          <p className="restable-form-error">{errors.capacity.message}</p>
        )}
      </div>

      <div>
        <label className="restable-form-label">Price</label>
        <input
          className="restable-form-input"
          type="number"
          {...register("price")}
        />
        {errors.price && (
          <p className="restable-form-error">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="restable-form-label">Deposit</label>
        <input
          className="restable-form-input"
          type="number"
          {...register("deposit")}
        />
        {errors.deposit && (
          <p className="restable-form-error">{errors.deposit.message}</p>
        )}
      </div>

      <div>
        <label className="restable-form-label">Available</label>
        <input
          className="restable-form-input"
          type="checkbox"
          {...register("isAvailable")}
        />
      </div>

      <div>
        <label className="restable-form-label">URL image</label>
        <input className="restable-form-input" {...register("imageUrl")} />
      </div>

      <div>
        <label className="restable-form-label">Table Category</label>
        <select
          className="restable-form-input"
          {...register("tableCategoryId")}
        >
          <option value="">Select table category</option>
          {tableCategories.map((category) => (
            <option
              key={category.tableCategoryId}
              value={category.tableCategoryId}
            >
              {category.tableCategoryName}
            </option>
          ))}
        </select>
        {errors.tableCategoryId && (
          <p className="restable-form-error">
            {errors.tableCategoryId.message}
          </p>
        )}
      </div>

      <button className="restable-form-button" type="submit">
        {tableId ? "Cập nhật bàn" : "Tạo bàn mới"}
      </button>
    </form>
  );
};

export default ResTableForm;
