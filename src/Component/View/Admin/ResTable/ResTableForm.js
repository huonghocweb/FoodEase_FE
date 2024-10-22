import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // Để lấy params và điều hướng
import axiosConfig from "../../../Config/AxiosConfig";
import "./ResTable.css";

const ResTableForm = () => {
  const { tableId } = useParams(); // Lấy tableId từ URL
  const navigate = useNavigate(); // Điều hướng sau khi hoàn thành
  const [tableCategories, setTableCategories] = useState([]);
  const [tableCategoryId, settableCategoryId] = useState();
  const fileImgRestable = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageResTable, setImageResTable] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = async () => {
    // Khi liên kết useRef với input file , truy cập vào current.files để lấy ra files
    // Lúc này files là 1 đối tượng FileList, kh phải mảng nhưng sẽ chứa danh sách tệp chọn từ thẻ input
    // Và sử dụng như 1 mảng thông thường
    let files = fileImgRestable.current.files;
    // Kiểm tra nếu files không được chọn thì
    if (files.length === 0) {
      return [];
    }
    // Nếu files được chọn, chuyển files thành mảng và trả về
    return Array.from(files);
  };

  useEffect(() => {
    if (tableId) {
      // Lấy thông tin bàn từ API để chỉnh sửa
      axiosConfig.get(`/restables/get/${tableId}`).then((response) => {
        const resTableById = response.data.data;
        setImageResTable(resTableById.imageUrl);
        settableCategoryId(resTableById.tableCategory.tableCategoryId);
        console.log(response.data.data);
        reset(response.data.data);
      });
    }
    axiosConfig.get("/tablecategories").then((response) => {
      setTableCategories(response.data);
    });
  }, [tableId, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const payload = {
      ...data,
    };
    formData.append(
      "resTableRequest",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const files = await handleImage();
    if (files.length > 0) {
      for (const file of files) {
        formData.append("ImgResTable", file);
      }
    }
    if (tableId) {
      // Cập nhật bàn
      const resTableUpdate = await axiosConfig
        .put(`/restables/restables/${tableId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => navigate("/admin/resTableList")) // Điều hướng về danh sách sau khi cập nhật
        .catch((error) => console.error(error));
    } else {
      // Tạo mới bàn
      const resTableCreate = await axiosConfig
        .post("/restables/restables", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
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
        <input
          className="restable-form-input"
          {...register("tableName", {
            required: "Table name cannnot be blank !",
          })}
        />
        {errors.tableName && (
          <p className="restable-form-error">{errors.tableName.message}</p>
        )}
      </div>

      <div>
        <label className="restable-form-label">Capacity</label>
        <input
          className="restable-form-input"
          type="number"
          {...register("capacity", {
            required: "Capacity cannnot be blank !",
            min: { value: 1, message: "Capacity must be at least 1" },
            max: {
              value: 14,
              message: "Capacity must be less than or equal to 14",
            },
          })}
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
          {...register("price", {
            required: "Price cannnot be blank !",
            min: { value: 1, message: "Price must be at least 1" },
          })}
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
          {...register("deposit", {
            required: "Deposit cannnot be blank !",
            min: { value: 1, message: "Deposit must be at least 1" },
          })}
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
        <img
          src={selectedImage ? selectedImage : imageResTable}
          className="tm-avatar img-fluid mb-4"
        />
        <input
          className="restable-form-input"
          type="file"
          ref={fileImgRestable}
          onChange={handleImage}
        />
      </div>

      <div>
        <label className="restable-form-label">Table Category</label>
        <select
          className="restable-form-input"
          {...register("tableCategoryId", {
            required: "Please select Table Category",
          })}
        >
          <option value="">Select table category</option>
          {tableCategories.map((category) => (
            <option
              selected={tableCategoryId === category.tableCategoryId}
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
