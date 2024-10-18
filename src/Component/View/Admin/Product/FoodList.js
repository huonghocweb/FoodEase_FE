import React from 'react';

const FoodList = () => {
    return (
        <div className="body">
             <div className="container mt-5">
      <div className="row tm-content-row">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-products">
            <div className="tm-product-table-container">
              <table className="table table-hover tm-table-small tm-product-table">
                <thead>
                  <tr>
                    <th scope="col">&nbsp;</th>
                    <th scope="col">PRODUCT NAME</th>
                    <th scope="col">UNIT SOLD</th>
                    <th scope="col">IN STOCK</th>
                    <th scope="col">EXPIRE DATE</th>
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><input type="checkbox" /></th>
                    <td className="tm-product-name">Lorem Ipsum Product 1</td>
                    <td>1,450</td>
                    <td>550</td>
                    <td>28 March 2019</td>
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><input type="checkbox" /></th>
                    <td className="tm-product-name">Lorem Ipsum Product 2</td>
                    <td>1,250</td>
                    <td>750</td>
                    <td>21 March 2019</td>
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><input type="checkbox" /></th>
                    <td className="tm-product-name">Lorem Ipsum Product 3</td>
                    <td>1,100</td>
                    <td>900</td>
                    <td>18 Feb 2019</td>
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><input type="checkbox" /></th>
                    <td className="tm-product-name">Lorem Ipsum Product 4</td>
                    <td>1,400</td>
                    <td>600</td>
                    <td>24 Feb 2019</td>
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><input type="checkbox" /></th>
                    <td className="tm-product-name">Lorem Ipsum Product 5</td>
                    <td>1,800</td>
                    <td>200</td>
                    <td>22 Feb 2019</td>
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><input type="checkbox" /></th>
                    <td className="tm-product-name">Lorem Ipsum Product 6</td>
                    <td>1,000</td>
                    <td>1,000</td>
                    <td>20 Feb 2019</td>
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              href="add-product.html"
              className="btn btn-primary btn-block text-uppercase mb-3">Add Food</a>
            <button className="btn btn-primary btn-block text-uppercase">
              Delete Food
            </button>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
            <h2 className="tm-block-title">Product Categories</h2>
            <div className="tm-product-table-container">
              <table className="table tm-table-small tm-product-table">
                <tbody>
                  <tr>
                    <td className="tm-product-name">Product Category 1</td>
                    <td className="text-center">
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="tm-product-name">Product Category 2</td>
                    <td className="text-center">
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="tm-product-name">Product Category 3</td>
                    <td className="text-center">
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="tm-product-name">Product Category 4</td>
                    <td className="text-center">
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="tm-product-name">Product Category 5</td>
                    <td className="text-center">
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary btn-block text-uppercase mb-3">
              Add new category
            </button>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default FoodList;