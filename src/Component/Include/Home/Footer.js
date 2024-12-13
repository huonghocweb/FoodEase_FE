import React from "react";
import { customTranslate } from "../../../i18n";

const Footer = () => {
  return (
    <>
      <section className="sign-up">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading">
                <h2>{customTranslate("Signup for our newsletters")}</h2>
              </div>
            </div>
          </div>
          <form id="contact" action="" method="get">
            <div className="row">
              <div className="col-md-4 col-md-offset-3">
                <fieldset>
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder={customTranslate("Enter your email here...")}
                    required=""
                  />
                </fieldset>
              </div>
              <div className="col-md-2">
                <fieldset>
                  <button type="submit" id="form-submit" className="btn">
                    {customTranslate("Send Message")}
                  </button>
                </fieldset> 
              </div>
            </div>
          </form>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <p>{customTranslate("")} 2020 Victory Restaurants</p>
            </div>
            <div className="col-md-4">
              <ul className="social-icons">
                <li>
                  <a rel="nofollow" href="https://fb.com/templatemo">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-rss"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-dribbble"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <p>{customTranslate("")}Design: Group 3</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
