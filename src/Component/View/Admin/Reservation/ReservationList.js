import React, { useEffect, useState } from "react";
import "./ReservationList.css";
import axiosConfig from "../../../Config/AxiosConfig";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axiosConfig.get(
          "http://localhost:8080/api/reservations"
        );
        console.log(response.data); // Kiểm tra dữ liệu
        setReservations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    // Tìm kiếm đơn đặt bàn
    const reservationToUpdate = reservations.find(
      (reservation) => reservation.reservationId === id
    );

    // Kiểm tra nếu bàn đã được chấp nhận
    if (newStatus === "Accepted") {
      const hasSameReservation = reservations.some(
        (reservation) =>
          reservation.status === "Accepted" &&
          reservation.name === reservationToUpdate.name &&
          reservation.reservationDate === reservationToUpdate.reservationDate &&
          reservation.reservationTime === reservationToUpdate.reservationTime
      );

      if (hasSameReservation) {
        alert(
          "This reservation has already been accepted and cannot be accepted again for the same name, date, and time."
        );
        return; // Dừng hành động nếu bàn đã được chấp nhận
      }
    }

    // Cập nhật trạng thái mới
    try {
      const response = await axiosConfig.patch(
        `http://localhost:8080/api/reservations/${id}/status`,
        { status: newStatus }
      );

      // Cập nhật trạng thái trong state
      setReservations((prev) => {
        // Cập nhật đơn với trạng thái mới
        const updatedReservations = prev.map((reservation) =>
          reservation.reservationId === id
            ? { ...reservation, status: response.data.status }
            : reservation
        );

        // Loại bỏ đơn nếu đã được chấp nhận hoặc hủy
        if (newStatus === "Accepted" || newStatus === "Cancelled") {
          return updatedReservations.filter(
            (reservation) => reservation.reservationId !== id
          );
        }
        return updatedReservations;
      });

      setMessage(`Status updated to ${newStatus}`);
    } catch (error) {
      setMessage("Failed to update status");
    }
  };

  // Sort reservation list by ID in descending order
  const sortedReservations = reservations
    .filter((reservation) => reservation.status === "Pending")
    .sort((a, b) => b.reservationId - a.reservationId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="col-12 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
        <h2 className="tm-block-title">Reservation List</h2>
        <table className="table-ReservationList">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">STATUS</th>
              <th scope="col">NAME</th>
              <th scope="col">EMAIL</th>
              <th scope="col">PHONE</th>
              <th scope="col">DATE</th>
              <th scope="col">TIME</th>
              <th scope="col">PERSON</th>
              <th scope="col">TABLE</th>
              <th scope="col">CONTROL</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservations
              .filter((reservation) => reservation.status === "Pending")
              .slice()
              .sort((a, b) => b.reservation - a.reservation)
              .map((reservation, index, pendingArray) => (
                <tr key={reservation.reservationId}>
                  <th scope="row">#{pendingArray.length - index}</th>
                  <td>
                    <div
                      className={`tm-status-circle ${reservation.status.toLowerCase()}`}
                    ></div>
                    {reservation.status}
                  </td>
                  <td>{reservation.name}</td>
                  <td>{reservation.email}</td>
                  <td>{reservation.phone}</td>
                  <td>{reservation.reservationDate}</td>
                  <td>{reservation.reservationTime}</td>
                  <td>
                    {reservation.guests}{" "}
                    {reservation.guests === 1 ? "Person" : "Persons"}
                  </td>
                  <td>{reservation.tableName || "N/A"}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          reservation.reservationId,
                          "Accepted"
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          reservation.reservationId,
                          "Cancelled"
                        )
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  );
};

export default ReservationList;