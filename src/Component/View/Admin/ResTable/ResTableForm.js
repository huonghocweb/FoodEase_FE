import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // Để lấy params và điều hướng
import { customTranslate } from "../../../../i18n";
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

  // Hàm xử lý khi người dùng chọn một ảnh mới
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
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
    <div className="body">
      <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="tm-block-col tm-col-account-settings">
            <div className="tm-bg-primary-dark tm-block tm-block-settings">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="tm-signup-form row"
              >
                <h2 className="tm-block-title">
                  {tableId
                    ? customTranslate("Edit ResTable")
                    : customTranslate("Create Table")}
                </h2>
                <div className="form-group col-lg-6">
                  <label>{customTranslate("Table Name")}</label>
                  <input
                    type="text"
                    className="form-control validate"
                    {...register("tableName", {
                      required: customTranslate("Table Name cannot be blank!"),
                    })}
                  />
                  {errors?.tableName && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors?.tableName.message}
                    </p>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label>{customTranslate("Capacity")} </label>
                  <input
                    className="form-control validate"
                    type="number"
                    {...register("capacity", {
                      required: customTranslate("Capacity cannot be blank!"),
                      min: {
                        min: 1,
                        message: customTranslate(
                          "Capacity must be at least 1!"
                        ),
                      },
                      max: {
                        min: 14,
                        message: customTranslate(
                          "Capacity must be less than or equal to 14!"
                        ),
                      },
                    })}
                  />
                  {errors?.capacity && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors?.capacity.message}
                    </p>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label>{customTranslate("Price")}</label>
                  <input
                    type="number"
                    className="form-control validate"
                    {...register("price", {
                      required: customTranslate("Price cannot be blank!"),
                      min: {
                        value: 0,
                        message: customTranslate("Price must be at least 0!"),
                      },
                    })}
                  />
                  {errors?.price && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors?.price.message}
                    </p>
                  )}
                </div>

                <div className="form-group col-lg-6">
                  <label>{customTranslate("Deposit")}</label>
                  <input
                    type="number"
                    className="form-control validate"
                    {...register("deposit", {
                      required: customTranslate("Deposit cannot be blank!"),
                      min: {
                        value: 0,
                        message: customTranslate("Deposit must be at least 0!"),
                      },
                    })}
                  />
                  {errors?.deposit && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors?.deposit.message}
                    </p>
                  )}
                </div>
                <div className="form-group col-lg-12">
                  <label className="text-white">
                    {customTranslate("Available")}
                  </label>
                  <input
                    className="form-control validate"
                    type="checkbox"
                    {...register("isAvailable")}
                    defaultChecked={true}
                  />
                </div>
                <div className="form-group col-lg-12">
                  <div>
                    <label className="text-white">
                      {customTranslate("Table Category")}
                    </label>
                    <select
                      className="restable-form-input"
                      {...register("tableCategoryId", {
                        required: customTranslate(
                          "Please select Table Category"
                        ),
                      })}
                    >
                      <option value="">
                        {customTranslate("Select table category")}
                      </option>
                      {tableCategories.map((category) => (
                        <option
                          selected={
                            tableCategoryId === category.tableCategoryId
                          }
                          key={category.tableCategoryId}
                          value={category.tableCategoryId}
                        >
                          {customTranslate(`${category.tableCategoryName}`)}
                        </option>
                      ))}
                    </select>
                    {errors?.tableCategoryId && (
                      <p style={{ color: "red", fontSize: "16px" }}>
                        {errors?.tableCategoryId.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group col-lg-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    {tableId
                      ? customTranslate("Update")
                      : customTranslate("Create")}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="tm-block-col tm-col-avatar">
            <div className="tm-bg-primary-dark tm-block tm-block-avatar">
              <h2 className="tm-block-title">{customTranslate("Image")}</h2>
              <div className="tm-avatar-container">
                <img
                  src={selectedImage ? selectedImage : imageResTable}
                  alt="Avatar"
                  className="tm-avatar img-fluid mb-4"
                />
              </div>
              <input
                id="fileImgRestable"
                type="file"
                ref={fileImgRestable}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label
                for="fileImgRestable"
                class="btn btn-primary btn-block text-uppercase "
              >
                {tableId
                  ? customTranslate("Edit Image")
                  : customTranslate("Add Image")}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResTableForm;
