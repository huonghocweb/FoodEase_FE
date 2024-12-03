import React from "react";
import { customTranslate } from "../../../../i18n";

const BookTableList = ({
  handleTableAvailablePopup,
  tableCategories,
  setSelectCapacity,
  setSelectTableCategory,
}) => {
  return (
    <>
      <section id="book-table" style={{ marginTop: "50px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading">
                <h2>{customTranslate("Book Your Table Now")}</h2>
              </div>
            </div>
            <div className="col-md-4  col-sm-12">
              <div className="left-image">
                <img src="assets/images/book_left_image.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="right-info">
                <h4>{customTranslate("Reservation")}</h4>
                <div id="form-submit" action="" method="get">
                  <div className="row">
                    <div className="col-md-6">
                      <fieldset>
                        <input
                          className="form-control"
                          placeholder={customTranslate("Full name")}
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-6">
                      <fieldset>
                        <input
                          className="form-control"
                          id="phone"
                          placeholder="Email"
                          required=""
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-6">
                      <fieldset>
                        <select
                          required
                          className="person"
                          onChange={(e) => setSelectCapacity(e.target.value)}
                        >
                          <option value="">
                            {customTranslate("Select number of people")}
                          </option>
                          <option value={1}>
                            1 {customTranslate("People")}
                          </option>
                          <option value={2}>
                            2 {customTranslate("Peoples")}
                          </option>
                          <option value={3}>
                            3 {customTranslate("Peoples")}
                          </option>
                          <option value={4}>
                            4 {customTranslate("Peoples")}
                          </option>
                          <option value={5}>
                            5 {customTranslate("Peoples")}
                          </option>
                          <option value={6}>
                            6 {customTranslate("Peoples")}
                          </option>
                          <option value={7}>
                            7 {customTranslate("Peoples")}
                          </option>
                          <option value={8}>
                            8 {customTranslate("Peoples")}
                          </option>
                        </select>
                      </fieldset>
                    </div>
                    <div className="col-md-6">
                      <fieldset>
                        <select
                          required
                          className="person"
                          onChange={(e) =>
                            setSelectTableCategory(e.target.value)
                          }
                        >
                          <option value="">
                            {customTranslate("Select type table")}
                          </option>
                          {tableCategories.map((item, index) => (
                            <option key={index} value={item.tableCategoryId}>
                              {customTranslate(`${item.tableCategoryName}`)} +{" "}
                              {item.price?.toLocaleString("vi-Vn")}đ{" "}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                    </div>

                    <div className="col-md-6">
                      <input type="date" />
                    </div>

                    <div className="col-md-6">
                      <input type="time" />
                    </div>

                    <div className="col-md-6">
                      <fieldset>
                        <button
                          className="btn btn-primary"
                          onClick={handleTableAvailablePopup}
                        >
                          {customTranslate("Check")}{" "}
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookTableList;
