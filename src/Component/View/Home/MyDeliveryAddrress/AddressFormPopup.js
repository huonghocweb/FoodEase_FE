import React from "react";
import { customTranslate } from "../../../../i18n";
import styles from "./AddressFormPopup.module.css"; // Importing the CSS Module

const AddressFormPopup = ({
  isOpenAddressPopup,
  handleCloesPopup,
  handleDeliveryAddressForm,
  register,
  handleSubmit,
  errors,
  provinces,
  districts,
  wards,
  handleGetDistrictByProvinceId,
  handleGetWardByDistrictId,
  dataEdit,
}) => {
  return (
    <>
      {isOpenAddressPopup && (
        <div className={styles["address-popup"]}>
          <div className={styles["address-popup__content"]}>
            <span
              className={styles["address-popup__close"]}
              onClick={handleCloesPopup}
            >
              &times;
            </span>
            <h2 className={styles["address-popup__title"]}>
              {customTranslate("Add Delivery Address")}
            </h2>
            <form onSubmit={handleSubmit(handleDeliveryAddressForm)}>
              {/* Form Row for Address Name and Phone Number */}
              <div className={styles["address-popup__form-row"]}>
                <div className={styles["address-popup__form-group"]}>
                  <label>{customTranslate("Address Name")}:</label>
                  <input
                    type="text"
                    placeholder="Address Name"
                    {...register("deliveryAddressName", {
                      required: "Address Name is Not Empty",
                    })}
                  />
                  {errors.deliveryAddressName && (
                    <p>{errors?.deliveryAddressName.message}</p>
                  )}
                </div>
                <div className={styles["address-popup__form-group"]}>
                  <label>{customTranslate("Phone Number")}:</label>
                  <input
                    type="tel"
                    placeholder="0912 345 678"
                    {...register("phoneAddress", {
                      required: "Phone Address is required",
                    })}
                  />
                  {errors.phoneAddress && <p>{errors?.phoneAddress.message}</p>}
                </div>
              </div>

              {/* Province Dropdown */}
              <div className={styles["address-popup__form-group"]}>
                <label>{customTranslate("Province")}:</label>
                <select
                  {...register("provinceId", {
                    required: "Province is required",
                    onChange: (e) =>
                      handleGetDistrictByProvinceId(e.target.value),
                  })}
                >
                  <option value="">{customTranslate("Choose Province")}</option>
                  {provinces.map((prov, index) => (
                    <option key={index} value={prov.ProvinceID}>
                      {prov.ProvinceName}
                    </option>
                  ))}
                </select>
                {errors.provinceId && <p>{errors?.provinceId.message}</p>}
              </div>

              {/* District Dropdown */}
              <div className={styles["address-popup__form-group"]}>
                <label>{customTranslate("District")}:</label>
                <select
                  {...register("districtId", {
                    required: "District is required",
                    onChange: (e) => handleGetWardByDistrictId(e.target.value),
                  })}
                >
                  <option value="">{customTranslate("Choose District")}</option>
                  {districts &&
                    districts.map((item, index) => (
                      <option key={index} value={item.DistrictID}>
                        {item.DistrictName}
                      </option>
                    ))}
                </select>
                {errors.districtId && <p>{errors?.districtId.message}</p>}
              </div>

              {/* Ward Dropdown */}
              <div className={styles["address-popup__form-group"]}>
                <label>{customTranslate("Ward")}:</label>
                <select
                  {...register("wardCode", { required: "Ward is required" })}
                >
                  <option value="">
                    {customTranslate("")}
                    {customTranslate("Choose Ward")}
                  </option>
                  {wards &&
                    wards.map((item, index) => (
                      <option key={index} value={item.WardCode}>
                        {customTranslate("")}
                        {item.WardName}
                      </option>
                    ))}
                </select>
                {errors.wardCode && <p>{errors?.wardCode.message}</p>}
              </div>

              {/* House Number */}
              <div className={styles["address-popup__form-group"]}>
                <label>{customTranslate("House Number")}:</label>
                <input
                  type="text"
                  placeholder="House Number, Ward Number"
                  {...register("houseNumber", {
                    required: "House Number is required",
                  })}
                />
                {errors.houseNumber && <p>{errors?.houseNumber.message}</p>}
              </div>

              {/* Submit Button */}
              <button type="submit">
                {dataEdit
                  ? customTranslate("Update")
                  : customTranslate("Create")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddressFormPopup;
