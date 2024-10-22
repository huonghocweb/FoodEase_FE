import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="row">
      <nav className="navbar navbar-expand-xl">
        <div className="container h-100">
          <NavLink className="navbar-brand" to="/admin">
            <h1 className="tm-site-title mb-0">Product Admin</h1>
          </NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto h-100">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-tachometer-alt"></i>
                  <span>
                    Order <i className="fas fa-angle-down"></i>
                  </span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="nav-link active" to="/admin">
                      Orders
                      <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/admin/UserOrder">
                      User buy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservation-cancelled-list"
                    >
                      Reservation Cancelled List
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="far fa-file-alt"></i>
                  <span>
                    Reservation <i className="fas fa-angle-down"></i>
                  </span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservation-list"
                    >
                      Reservation List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservation-accepted-list"
                    >
                      Reservation Accepted List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservation-cancelled-list"
                    >
                      Reservation Cancelled List
                    </NavLink>
                  </li>
                </ul>
              </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/foods">
                            <i class="fa-solid fa-pizza-slice"></i>
                            Foods
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/resTableList">
                            <i class="fa-solid fa-table"></i>
                            ResTable
                        </NavLink>
                    </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  <i className="far fa-user"></i>
                  Accounts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/inventory">
                  <i class="fa-solid fa-warehouse"></i>
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/coupons">
                  <i class="fa-solid fa-ticket-simple"></i>
                  Coupon
                </Link>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="/admin/revenue"
                  className="nav-link dropdown-toggle"
                >
                  <i className="far fa-file-alt"></i>
                  <span>Reports Revenue</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/reportpayment">
                  <i class="far fa-file-alt"></i>
                  Payment Report
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
