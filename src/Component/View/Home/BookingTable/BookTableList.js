import React from 'react';

const BookTableList = ({handleTableAvailablePopup , tableCategories , setSelectCapacity ,setSelectTableCategory }) => {
    return (
        <>
        <section id="book-table" style={{marginTop : '50px'}}>
         <div className="container">
             <div className="row">
                 <div className="col-md-12">
                     <div className="heading">
                         <h2>Book Your Table Now</h2>
                     </div>
                 </div>
                 <div className="col-md-4  col-sm-12">
                     <div className="left-image">
                         <img src="assets/images/book_left_image.jpg" alt=""/>
                     </div>
                 </div>
                 <div className="col-md-6 col-sm-12">
                     <div className="right-info">
                         <h4>Reservation</h4>
                         <div id="form-submit" action="" method="get">
                             <div className="row">
                             <div className="col-md-6">
                                     <fieldset>
                                         <input  className="form-control" placeholder="Full name" required=""/>
                                     </fieldset> 
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <input className="form-control" id="phone" placeholder="Email " required=""/>
                                     </fieldset>
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <select 
                                         required 
                                         className="person" 
                                         onChange={e =>setSelectCapacity(e.target.value) } >
                                             <option value="">How many persons?</option>
                                             <option value={1}>1 Person</option>
                                             <option value={2}>2 Persons</option>
                                             <option value={3}>3 Persons</option>
                                             <option value={4}>4 Persons</option>
                                             <option value={5}>5 Persons</option>
                                             <option value={6}>6 Persons</option>
                                             <option value={7}>7 Persons</option>
                                             <option value={8}>8 Persons</option>
                                         </select>
                                     </fieldset>
                                 </div>
                                 <div className="col-md-6">
                                     <fieldset>
                                         <select
                                          required
                                           className="person" 
                                           onChange={e => setSelectTableCategory(e.target.value)}
                                            >
                                             <option value="" >Type Table ?</option>
                                             {
                                                tableCategories.map((item,index) => (
                                                    <option key={index} value={item.tableCategoryId}>{item.tableCategoryName} + {item.price?.toLocaleString('vi-Vn')}đ </option>
                                                ))
                                             }
                                         </select>
                                     </fieldset>
                                 </div>

                                 <div className="col-md-6">
                                     <input
                                       type='date'/>
                                 </div>
                                 
                                 <div className="col-md-6">
                                     <input
                                      type='time'/>
                                 </div>

                                 <div className="col-md-6">
                                     <fieldset>
                                        <button className="btn btn-primary" onClick={handleTableAvailablePopup}>Check </button>
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