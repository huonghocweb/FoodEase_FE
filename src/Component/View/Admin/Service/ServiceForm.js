import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // Để lấy params và điều hướng
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Service.css";

const ServiceForm = () => {
  const { serviceId } = useParams(); // Lấy tableId từ URL
  const navigate = useNavigate(); // Điều hướng sau khi hoàn thành
  const fileImgService = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageService, setImageService] = useState([]);

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
    let files = fileImgService.current.files;
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
    if (serviceId) {
      // Lấy thông tin bàn từ API để chỉnh sửa
      axiosConfig.get(`/tableService/${serviceId}`).then((response) => {
        const tableServicesById = response.data.data;
        setImageService(tableServicesById.imageUrl);
        console.log(response.data.data);
        reset(response.data.data);
      });
    }
  }, [serviceId, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const payload = {
      ...data,
    };
    formData.append(
      "tableServicesRequest",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const files = await handleImage();
    if (files.length > 0) {
      for (const file of files) {
        formData.append("ImgService", file);
      }
    }
    if (serviceId) {
      // Cập nhật bàn
      const tableServiceUpdate = await axiosConfig
        .put(`/tableService/tableService/${serviceId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => navigate("/admin/services")) // Điều hướng về danh sách sau khi cập nhật
        .catch((error) => console.error(error));
    } else {
      // Tạo mới bàn
      const tableServiceCreate = await axiosConfig
        .post("/tableService/tableService", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => navigate("/admin/services")) // Điều hướng về danh sách sau khi tạo
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
                  {serviceId
                    ? customTranslate("Edit Service")
                    : customTranslate("Create Service")}
                </h2>
                <div className="form-group col-lg-6">
                  <label>{customTranslate("Service Name")}</label>
                  <input
                    type="text"
                    className="form-control validate"
                    {...register("serviceName", {
                      required: customTranslate(
                        "Service Name cannot be blank !"
                      ),
                    })}
                  />
                  {errors?.serviceName && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors?.serviceName.message}
                    </p>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label>{customTranslate("Price")}:</label>
                  <input
                    className="form-control validate"
                    type="number"
                    {...register("servicePrice", {
                      required: customTranslate("Price cannot be blank !"),
                      min: {
                        min: 0,
                        message: customTranslate("Price must be at least 0 !"),
                      },
                    })}
                  />
                  {errors?.servicePrice && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors?.servicePrice.message}
                    </p>
                  )}
                </div>
                <div className="form-group col-lg-12">
                  <label>{customTranslate("Description")}</label>
                  <textarea
                    className="service-form-input"
                    rows="3"
                    cols="30"
                    {...register("description", {
                      required: customTranslate("Description cannot be blank!"),
                    })}
                  />
                  {errors?.description && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors?.description.message}
                    </p>
                  )}
                </div>
                <div className="form-group col-lg-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    {serviceId
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
                  src={selectedImage ? selectedImage : imageService}
                  alt="Avatar"
                  className="tm-avatar img-fluid mb-4"
                />
              </div>
              <input
                id="fileImgService"
                type="file"
                ref={fileImgService}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label
                for="fileImgService"
                class="btn btn-primary btn-block text-uppercase "
              >
                {serviceId
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

export default ServiceForm;
