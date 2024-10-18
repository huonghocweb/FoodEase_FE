import { Link } from 'react-router-dom';
import axiosConfig from "../../../Config/AxiosConfig";
import React, { useState, useEffect } from "react";
import Header from './../../../Include/Admin/Header';
import './Revenue.css';
const Revenue = () => {
    const [daily, setDaily] = useState([]);
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);
    const [activeTable, setActiveTable] = useState('daily'); // Biến trạng thái để theo dõi bảng nào đang hoạt động

    const fetchDaily = async () => {
        try {
            const response = await axiosConfig.get(`/order/findTotalPriceAndQuantityByOrderDate`);
            setDaily(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching daily data: ", error);
        }
    };

    const fetchMonth = async () => {
        try {
            const response = await axiosConfig.get(`/order/ReportRevenueByMonth`);
            setMonth(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching monthly data: ", error);
        }
    };

    const fetchYear = async () => {
        try {
            const response = await axiosConfig.get(`/order/ReportRevenueByYear`);
            setYear(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching yearly data: ", error);
        }
    };

    useEffect(() => {
        fetchDaily(); // Tải dữ liệu ngày khi component mount
    }, []);

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

    return (
        <div>
        <div  className="revenue-container">
            
            <div className="revenue-button-container">
                <button onClick={handleShowDaily}>Daily Revenue</button>
                <button onClick={handleShowMonthly}>Monthly Revenue</button>
                <button onClick={handleShowYearly}>Yearly Revenue</button>
            </div>

            {activeTable === 'daily' && (
                <table className="revenue-table">
                    <thead>
                        <tr>
                            <th className="revenue-th">STT</th>
                            <th className="revenue-th">Order date</th>
                            <th className="revenue-th">Order time</th>
                            <th className="revenue-th">Total price</th>
                            <th className="revenue-th">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daily.map((item, index) => (
                            <tr key={index}>
                                <td className="revenue-td">{index + 1}</td>
                                <td className="revenue-td">{item.orderDate}</td>
                                <td className="revenue-td">{item.orderTime}</td>
                                <td className="revenue-td">{item.totalPrice.toLocaleString('vi-vn')}đ</td>
                                <td className="revenue-td">{item.totalQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTable === 'month' && (
                <table  className="revenue-table">
                    <thead>
                        <tr>
                            <th className="revenue-th">STT</th>
                            <th className="revenue-th">Year</th>
                            <th className="revenue-th">Month</th>
                            <th className="revenue-th">totalPrice</th>
                            <th className="revenue-th">totalQuantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {month.map((item, index) => (
                            <tr key={index}>
                                <td className="revenue-td">{index + 1}</td>
                                <td className="revenue-td">{item.year}</td>
                                <td className="revenue-td">{item.month}</td>
                                <td className="revenue-td">{item.totalPrice.toLocaleString('vi-vn')}đ</td>
                                <td className="revenue-td">{item.totalQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTable === 'year' && (
                <table  className="revenue-table">
                    <thead>
                        <tr>
                            <th className="revenue-th">STT</th>
                            <th className="revenue-th">Year</th>
                            <th className="revenue-th">Total price</th>
                            <th  className="revenue-th">Quantity</th>
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
        </div>
    );
};

export default Revenue;
