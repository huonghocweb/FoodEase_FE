import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm từ react-hook-form
import axiosConfig from "../../../Config/AxiosConfig";
import "./TableReservation.css";

const TableReservation = () => {
    const { register, handleSubmit, setValue } = useForm(); // Khởi tạo useForm
    const [tables, setTables] = useState([]); // List of available tables
    const [reservations, setReservations] = useState([]); // Danh sách đặt bàn
    const [message, setMessage] = useState("");

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        setValue("date", formattedDate); // Sử dụng setValue để thiết lập giá trị ngày
    }, [setValue]);

    // Fetch danh sách đặt bàn
    const fetchReservations = async () => {
        try {
            const response = await axiosConfig.get(
                "http://localhost:8080/api/reservations"
            );
            setReservations(response.data); // Cập nhật danh sách đặt bàn
        } catch (error) {
            console.error("Error fetching reservations", error);
        }
    };

    // Fetch available tables based on guest count
    const fetchAvailableTables = async (capacity) => {
        if (!capacity) return; // Tránh gọi API nếu không có số lượng khách
        try {
            const response = await axiosConfig.get(
                `http://localhost:8080/api/tables/available/${capacity}`
            );
            console.log(response.data); // Kiểm tra dữ liệu trả về

            // Lọc bàn đã được chấp nhận
            const acceptedTableIds = reservations
                .filter((reservation) => reservation.status === "Accepted")
                .map((reservation) => reservation.tableId);

            // Chỉ giữ lại bàn không được chấp nhận
            const availableTables = response.data.filter(
                (table) => !acceptedTableIds.includes(table.tableId)
            );

            setTables(availableTables);
        } catch (error) {
            console.error("Error fetching available tables", error);
        }
    };

    // Gọi fetchReservations khi component được mount
    useEffect(() => {
        fetchReservations(); // Lấy danh sách đặt bàn
    }, []);

    // Handle guest count change to fetch available tables accordingly
    const onGuestChange = (event) => {
        const numberOfGuests = event.target.value;
        setValue("guests", numberOfGuests); // Cập nhật giá trị số lượng khách
        fetchAvailableTables(numberOfGuests); // Gọi hàm để lấy bàn dựa trên số lượng khách
    };

    const onSubmit = async (data) => {
        const reservationData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            reservationDate: data.date,
            reservationTime: data.time,
            guests: parseInt(data.guests, 10), // Đảm bảo guests là số
            tableId: parseInt(data.tableId, 10), // Đảm bảo tableId là số
        };

        try {
            const response = await axiosConfig.post(
                "http://localhost:8080/api/reservations",
                reservationData
            );
            if (response.status === 200) {
                setMessage("Booking successful!");
                // Clear form inputs after successful booking
                setValue("name", "");
                setValue("email", "");
                setValue("phone", "");
                setValue("date", "");
                setValue("time", "");
                setValue("guests", "");
                setValue("tableId", "");
                setTables([]); // Xóa danh sách bàn đã chọn
            }
        } catch (error) {
            console.error("Error booking table", error);
            setMessage(
                `Booking failed: ${error.response.data.message || "Please try again."}`
            );
        }
    };

    return (
        <div className="reservation-wrapper">
            <div className="reservation-container">
                <h2>Reservation</h2>
                <h1>Book a table</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="reservation-form">
                    <div className="form-row">
                        <div className="form-group-reservation">
                            <label>Name:</label>
                            <input
                                type="text"
                                {...register("name", { required:"Tên không được bỏ trống" })} // Đăng ký trường name
                                
                            />
                        </div>
                        <div className="form-group-reservation">
                            <label>Email:</label>
                            <input
                                type="email"
                                {...register("email", { required: true })} // Đăng ký trường email
                            />
                        </div>
                        <div className="form-group-reservation">
                            <label>Phone:</label>
                            <input
                                type="tel"
                                {...register("phone", { required: true })} // Đăng ký trường phone
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group-reservation">
                            <label>Date:</label>
                            <input
                                type="date"
                                {...register("date", { required: true })} // Đăng ký trường date
                            />
                        </div>
                        <div className="form-group-reservation">
                            <label>Time:</label>
                            <select {...register("time", { required: true })}>
                                <option value="">Select time</option>
                                {Array.from({ length: 24 }, (_, index) => {
                                    const hour = index < 10 ? `0${index}:00` : `${index}:00`;
                                    return (
                                        <option key={index} value={hour}>
                                            {hour}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group-reservation">
                            <label>Person:</label>
                            <select
                                {...register("guests", { required: true })}
                                onChange={onGuestChange}
                            >
                                <option value="">Many persons?</option>
                                {Array.from({ length: 8 }, (_, index) => {
                                    const numberOfGuests = index + 1;
                                    return (
                                        <option key={numberOfGuests} value={numberOfGuests}>
                                            {numberOfGuests}{" "}
                                            {numberOfGuests > 1 ? "Persons" : "Person"}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="form-group-reservation">
                            <label>Table:</label>
                            <select {...register("tableId", { required: true })}>
                                <option value="">Select a table</option>
                                {tables.length === 0 ? (
                                    <option disabled>No available tables</option> // Hiển thị nếu không có bàn nào
                                ) : (
                                    tables.map((table) => (
                                        <option key={table.tableId} value={table.tableId}>
                                            {table.tableName} - Capacity: {table.capacity}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="submit-button-wrapper">
                        <button type="submit" className="submit-button">
                            Book a table
                        </button>
                    </div>
                    {message && <p className="success-message">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default TableReservation;