import React from "react";
import { Link, NavLink } from "react-router-dom";
import { customTranslate } from "../../../i18n";

const Header = () => {
  return (
    <div className="row">
      <nav className="navbar navbar-expand-xl">
        <div className="container h-100">
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
                   {customTranslate("Orders")}  <i className="fas fa-angle-down"></i>
                  </span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="nav-link active" to="/admin">
                    {customTranslate("Orders")}
                      <span className="sr-only">(current)</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/admin/UserOrder">
                    {customTranslate("User buy")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservation-cancelled-list"
                    >
                      {customTranslate("Reservation Cancelled List")}
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
                  {customTranslate("Reservations")} <i className="fas fa-angle-down"></i>
                  </span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservation"
                    >
                      {customTranslate("Reservation List")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservationOrderPayment"
                    >
                      {customTranslate("Reservation Order Payment List")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/admin/reservation-cancelled-list"
                    >
                      {customTranslate("Reservation Cancelled List")}
                    </NavLink>
                  </li>
                </ul>
              </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/foods">
                            <i class="fa-solid fa-pizza-slice"></i>
                            {customTranslate("Foods")}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/resTableList">
                            <i class="fa-solid fa-chair "></i>
                            {customTranslate("ResTable")}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/services">
                            <i class="fa-solid fa-concierge-bell"></i>
                            {customTranslate("Services")}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/admin/BlogList">
                            <i class="fa-solid fa-pencil"></i>
                            {customTranslate("Blog")}
                        </NavLink>
                    </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">
                  <i className="far fa-user"></i>
                  {customTranslate("Accounts")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/inventory">
                  <i class="fa-solid fa-warehouse"></i>
                  {customTranslate("Inventory")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/coupons">
                  <i class="fa-solid fa-ticket-simple"></i>
                  {customTranslate("Coupon")}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  to="/admin/revenue"
                  className="nav-link dropdown-toggle"
                >
                  <i className="far fa-file-alt"></i>
                  <span>{customTranslate("Reports Revenue")}</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin/reportpayment">
                  <i class="far fa-file-alt"></i>
                  {customTranslate("Payment Report")}
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
