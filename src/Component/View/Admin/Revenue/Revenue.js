import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import './Revenue.css';
const Revenue = () => {
    const [daily, setDaily] = useState([]);
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const [activeTable, setActiveTable] = useState('daily'); // Biến trạng thái để theo dõi bảng nào đang hoạt động
    const [date,setDate]= useState('');
    const [endDate,setEndDate]=useState('');
    const [page,setPage]= useState(0);
    const [TotalPage,setTotalPage] = useState();
    const [inputFind, setInputFind] = useState('');
     const [inputFindEndDate, setinputFindEndDate] = useState("");
     const [inputYear,setInputYearset]= useState(2024);
     const handleinputFindendDate = (e) => {
        setinputFindEndDate(e.target.value);
      };
    const fetchDaily = async () => {
        try {
            const response = await axiosConfig.get(`/order/findRevenueByDaily?date=${date}&EndDate=${endDate}&page=${page}`);
            setDaily(response.data.content);
           setTotalPage(response.data.totalPages);
          
        } catch (error) {
            console.error("Error fetching daily data: ", error);
        }
    };

    const fetchMonth = async () => {
        try {
            const response = await axiosConfig.get(`/order/findRevenueByMonthAndYear?year=${inputYear}`);
            setMonth(response.data);
            
        } catch (error) {
            console.error("Error fetching monthly data: ", error);
        }
    };

    const fetchYear = async () => {
        try {
            const response = await axiosConfig.get(`/order/ReportRevenueByYear`);
            setYear(response.data);
           
        } catch (error) {
            console.error("Error fetching yearly data: ", error);
        }
    };
    const handleinputFind=(e)=>{
        setInputFind(e.target.value);
       
        }
      const findDate =()=>{
          const formattedDate = inputFind.replace(/\//g, '-');
          const formattedEndDate = inputFindEndDate.replace(/\//g, "-");
          setDate(formattedDate)
          setEndDate(formattedEndDate);
          if(inputFind == null){
            setDate('');
          }
          if (inputFindEndDate == null) {
            setEndDate("");
          }
          console.log(inputFind);
        }
        const Next = () => {
            setPage((prevPage) => {
              if (prevPage >= TotalPage - 1) {
                return 0; // Đặt lại page về 0 nếu prevPage lớn hơn hoặc bằng totalPages
              }
              return prevPage + 1; // Tăng page lên 1 nếu chưa quá totalPages
            });
          };
          const Previous = () => {
            if (page > 0) {
              setPage((prevPage) => prevPage - 1);
            }
          };
    useEffect(() => {
        fetchDaily(); // Tải dữ liệu ngày khi component mount
        fetchMonth();
    }, [daily]);

    const handleShowDaily = () => {
        fetchDaily();
        setActiveTable('daily'); // Đặt bảng hoạt động là bảng ngày
    };

    const handleShowMonthly = () => {
        fetchMonth();
        setActiveTable('month'); // Đặt bảng hoạt động là bảng tháng
    };

    const handleShowYearly = () => {
        fetchYear();
        setActiveTable('year'); // Đặt bảng hoạt động là bảng năm
    };
    const handleYearChange = (event) => {
        setInputYearset(parseInt(event.target.value)); // Cập nhật selectedYear
        console.log(event.target.value);
    };
    return (
        <div>
        <div  className="revenue-container">
            
            <div className="revenue-button-container">
                <button onClick={handleShowDaily}>{customTranslate("Daily Revenue")}</button>
                <button onClick={handleShowMonthly}>{customTranslate("Monthly Revenue")}</button>
                <button onClick={handleShowYearly}>{customTranslate("Yearly Revenue")}</button>
            </div>
           
            {activeTable === 'daily' && (
                <div>
                 <div className='orderlist-find'>
                 <input type='date' value={inputFind}onChange={handleinputFind}/>
                 <input
                      type="date"
                      value={inputFindEndDate}
                      onChange={handleinputFindendDate}
                    />
                 <button onClick={findDate}>{customTranslate("find")}</button>
               </div>
                <table className="revenue-table">
                    
                    <thead>
                        <tr>
                            <th className="revenue-th">{customTranslate("No.")}</th>
                            <th className="revenue-th">{customTranslate("Order date")}</th>
                            
                            <th className="revenue-th">{customTranslate("Total price")}</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {daily.map((item, index) => (
                            <tr key={index}>
                                <td className="revenue-td">{index + 1}</td>
                                <td className="revenue-td">{item.date}</td>
                               
                                <td className="revenue-td">{item.sum.toLocaleString('vi-vn')}đ</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                 <h6>
                                    {page + 1}/{TotalPage}
                                  </h6>
                                  <button className="Button-Previous" onClick={Previous}>
                                    {customTranslate("Previous")}
                                  </button>
                                  <button className="Button-next" onClick={Next}>
                                    {customTranslate("Next")}
                                  </button>
                </div>
            )}

{activeTable === 'month' && (
                <div>
                    <select value={inputYear} onChange={handleYearChange}>
                        <option value={2021}>2021</option>
                        <option value={2022}>2022</option>
                        <option value={2023}>2023</option>
                        <option defaultChecked value={2024}>2024</option>
                    </select>

                    <table className="revenue-table">
                        <thead>
                            <tr>
                                <th className="revenue-th">{customTranslate("No.")}</th>
                                <th className="revenue-th">{customTranslate("Year")}</th>
                                <th className="revenue-th">{customTranslate("Month")}</th>
                                <th className="revenue-th">{customTranslate("total Price")}</th>
                                <th className="revenue-th">{customTranslate("total Quantity")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {month.map((item, index) => (
                                <tr key={index}>
                                    <td className="revenue-td">{index + 1}</td>
                                    <td className="revenue-td">{item.year}</td>
                                    <td className="revenue-td">{item.month}</td>
                                    <td className="revenue-td">{item.totalPrice.toLocaleString('vi-VN')} đ</td>
                                    <td className="revenue-td">{item.totalQuantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
   

            {activeTable === 'year' && (
                <table  className="revenue-table">
                    <thead>
                        <tr>
                            <th className="revenue-th">{customTranslate("No.")}</th>
                            <th className="revenue-th">{customTranslate("Year")}</th>
                            <th className="revenue-th">{customTranslate("Total price")}</th>
                            <th  className="revenue-th">{customTranslate("Quantity")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {year.map((item, index) => (
                            <tr key={index}>
                                <td className="revenue-td">{index + 1}</td>
                                <td className="revenue-td">{item.year}</td>
                                <td className="revenue-td">{item.totalPrice.toLocaleString('vi-vn')}đ</td>
                                <td className="revenue-td">{item.totalQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        
    );
};

export default Revenue;
