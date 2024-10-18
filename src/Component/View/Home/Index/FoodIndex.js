import React from 'react';
import FoodMenu from './FoodMenu';
import Drink from './Drink';
import Search from './Search';
import Propose from './Propose';
import { useTranslation } from 'react-i18next';
import { customTranslate } from '../../../../i18n';
const FoodIndex =()=>{
    const { t } = useTranslation(); // Khai báo useTranslation
    return (
        <section className="bg-white " >
     <section className="banner">
         <div className="container">
             <div className="row">
                 <div className="col-md-6 col-md-offset-3">
                    <h4>{customTranslate("Here you can find delecious foods")}</h4>
                    <h2>{customTranslate("Asian Restaurant")}</h2>
                     <p>Quisque nec nibh id lacus fringilla eleifend sed sit amet sem. Donec lectus odio, mollis a nisl non, tempor interdum nisl.</p>
                     <div className="primary-button">
                         <a href="#" className="scroll-link" data-id="book-table">{customTranslate("Order Right Now")}</a>
                     </div>
                 </div>
             </div>
         </div>
     </section>
 
 
 
     <section className="cook-delecious">
         <div className="container">
             <div className="row">
                 <div className="col-md-3 col-md-offset-1">
                     <div className="first-image">
                         <img src="assets/images/index1.jpg" alt=""/>
                     </div>
                 </div>
                 <div className="col-md-4">
                     <div className="cook-content">
                     <h4>{customTranslate("We cook delecious")}</h4>
                         <div className="contact-content">
                         <span>{customTranslate("You can call us on")}:</span>
                             <h6>+ 1234 567 8910</h6>
                         </div>
                         <span>or</span>
                         <div className="primary-white-button">
                         <a href="#" className="scroll-link" data-id="book-table">{customTranslate("Order Now")}</a>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-3">
                     <div className="second-image">
                         <img src="assets/images/index2.jpg" alt=""/>
                     </div>
                 </div>
             </div>
         </div>
     </section>
 
 <img src=""/>
 
     <section className="services">
         <div className="container">
             <div className="row">
                 <div className="col-md-3 col-sm-6 col-xs-12">
                     <div className="service-item">
                         <a href="menu.html">
                         <img src="assets/images/cook_breakfast.png" alt="Breakfast"/>
                         <h4>{customTranslate("Breakfast")}</h4>
                         </a>
                     </div>
                 </div>
                 <div className="col-md-3 col-sm-6 col-xs-12">
                     <div className="service-item">
                         <a href="menu.html">
                         <img src="assets/images/cook_lunch.png" alt="Lunch"/>
                         <h4>{customTranslate("Lunch")}</h4>
                         </a>
                     </div>
                 </div>
                 <div className="col-md-3 col-sm-6 col-xs-12">
                     <div className="service-item">
                         <a href="menu.html">
                         <img src="assets/images/cook_dinner.png" alt="Dinner"/>
                         <h4>{customTranslate("Dinner")}</h4>
                         </a>
                     </div>
                 </div>
                 <div className="col-md-3 col-sm-6 col-xs-12">
                     <div className="service-item">
                         <a href="menu.html">
                         <img src="assets/images/cook_dessert.png" alt="Desserts"/>
                         <h4>{customTranslate("Desserts")}</h4>
                         </a>
                     </div>
                 </div>
             </div>
         </div>
     </section>
     
                <section>
                <Search/>
                <h2>{customTranslate("Main dishes")}</h2>
                    
                    <hr></hr>
                <FoodMenu />
                </section>

                <br/>
                <hr/>
                <section>
                <h2>{customTranslate("Drinks")}</h2>
                    <hr></hr>
                <Drink />
                </section>
                <section>
                    <h2>Propose</h2>
                    <hr></hr>
                <Propose />
                </section>

     <section id="book-table">
         <div className="container">
             <div className="row">
                 <div className="col-md-12">
                     <div className="heading">
                         <h2>Book Your Table Now</h2>
                     </div>
                 </div>
                 <div className="col-md-4 col-md-offset-2 col-sm-12">
                     <div className="left-image">
                         <img src="assets/images/book_left_image.jpg" alt=""/>
                     </div>
                 </div>
                 <div className="col-md-4 col-sm-12">
                     <div className="right-info">
                         <h4>Reservation</h4>
                         <form id="form-submit" action="" method="get">
                             <div className="row">
                                 <div className="col-md-6">
                                     <fieldset>
                                         <select required name='day'>
                                             <option value="">Select day</option>
                                             <option value="Monday">Monday</option>
                                             <option value="Tuesday">Tuesday</option>
                                             <option value="Wednesday">Wednesday</option>
                                             <option value="Thursday">Thursday</option>
                                             <option value="Friday">Friday</option>
                                             <option value="Saturday">Saturday</option>
                                             <option value="Sunday">Sunday</option>
                                         </select>
                                     </fieldset>
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <select required name='hour' >
                                             <option value="">Select hour</option>
                                             <option value="10-00">10:00</option>
                                             <option value="12-00">12:00</option>
                                             <option value="14-00">14:00</option>
                                             <option value="16-00">16:00</option>
                                             <option value="18-00">18:00</option>
                                             <option value="20-00">20:00</option>
                                             <option value="22-00">22:00</option>
                                         </select>
                                     </fieldset>
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <input name="name" type="name" className="form-control" id="name" placeholder="Full name" required=""/>
                                     </fieldset> 
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <input name="phone" type="phone" className="form-control" id="phone" placeholder="Phone number" required=""/>
                                     </fieldset>
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <select required className="person" name='persons' >
                                             <option value="">How many persons?</option>
                                             <option value="1-Person">1 Person</option>
                                             <option value="2-Persons">2 Persons</option>
                                             <option value="3-Persons">3 Persons</option>
                                             <option value="4-Persons">4 Persons</option>
                                             <option value="5-Persons">5 Persons</option>
                                             <option value="6-Persons">6 Persons</option>
                                         </select>
                                     </fieldset>
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <button type="submit" id="form-submit" className="btn">Book Table</button>
                                     </fieldset>
                                 </div>
                             </div>
                         </form>
                     </div>
                 </div>
             </div>
         </div>
     </section>
 
        
 
   
 
 
 
     <section className="featured-food">
         <div className="container">
             <div className="row">
                 <div className="heading">
                 <h2>{customTranslate("Weekly Featured Food")}</h2>
                 </div>
             </div>
             <div className="row">
                 <div className="col-md-4">
                     <div className="food-item">
                     <h2>{customTranslate("Breakfast")}</h2>
                         <img src="assets/images/breakfast_item.jpg" alt=""/>
                         <div className="price">$4.50</div>
                         <div className="text-content">
                             <h4>Kale Chips Art Party</h4>
                             <p>Dreamcatcher squid ennui cliche chicharros nes echo  small batch jean shorts hexagon street art knausgaard wolf...</p>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-4">
                     <div className="food-item">
                     <h2>{customTranslate("Lunch")}</h2>
                         <img src="assets/images/lunch_item.jpg" alt=""/>
                         <div className="price">$7.50</div>
                         <div className="text-content">
                             <h4>Taiyaki Gastro Tousled</h4>
                             <p>Dreamcatcher squid ennui cliche chicharros nes echo  small batch jean shorts hexagon street art knausgaard wolf...</p>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-4">
                     <div className="food-item">
                     <h2>{customTranslate("Dinner")}</h2>
                         <img src="assets/images/dinner_item.jpg" alt=""/>
                         <div className="price">$12.50</div>
                         <div className="text-content">
                             <h4>Batch Squid Jean Shorts</h4>
                             <p>Dreamcatcher squid ennui cliche chicharros nes echo  small batch jean shorts hexagon street art knausgaard wolf...</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </section>
 
     <section className="our-blog">
         <div className="container">
             <div className="row">
                 <div className="col-md-12">
                     <div className="heading">
                     <h2>{customTranslate("Our blog post")}</h2>
                     </div>
                 </div>
             </div>
             <div className="row">
                 <div className="col-md-6">
                     <div className="blog-post">
                         <img src="assets/images/blog_post_01.jpg" alt=""/>
                         <div className="date">26 Oct 2020</div>
                         <div className="right-content">
                             <h4>Stumptown Tofu Schlitz</h4>
                             <span>Branding / Admin</span>
                             <p>Skateboard iceland twee tofu shaman crucifix vice before they sold out corn hole occupy drinking vinegar chambra meggings kale chips hexagon...</p>
                             <div className="text-button">
                                 <a href="#">Continue Reading</a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6">
                     <div className="blog-post">
                         <img src="assets/images/blog_post_02.jpg" alt=""/>
                         <div className="date">21 Oct 2020</div>
                         <div className="right-content">
                             <h4>Succulents Hashtag Folk</h4>
                             <span>Branding / Admin</span>
                             <p>Skateboard iceland twee tofu shaman crucifix vice before they sold out corn hole occupy drinking vinegar chambra meggings kale chips hexagon...</p>
                             <div className="text-button">
                                 <a href="#">Continue Reading</a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6">
                     <div className="blog-post">
                         <img src="assets/images/blog_post_03.jpg" alt=""/>
                         <div className="date">11 Oct 2020</div>
                         <div className="right-content">
                             <h4>Knaus Sriracha Pinterest</h4>
                             <span>Dessert / Chef</span>
                             <p>Skateboard iceland twee tofu shaman crucifix vice before they sold out corn hole occupy drinking vinegar chambra meggings kale chips hexagon...</p>
                             <div className="text-button">
                                 <a href="#">Continue Reading</a>
                             </div>
                         </div>
                     </div>
                 </div>
                 <div className="col-md-6">
                     <div className="blog-post">
                         <img src="assets/images/blog_post_04.jpg" alt=""/>
                         <div className="date">03 Oct 2020</div>
                         <div className="right-content">
                             <h4>Crucifix Selvage Coat</h4>
                             <span>Plate / Chef</span>
                             <p>Skateboard iceland twee tofu shaman crucifix vice before they sold out corn hole occupy drinking vinegar chambra meggings kale chips hexagon...</p>
                             <div className="text-button">
                                 <a href="#">Continue Reading</a>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </section>
</section>
    );
};
export default FoodIndex;