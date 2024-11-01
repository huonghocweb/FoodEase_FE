import React, { useEffect, useState } from "react";
import "./ReservationList.css";
import axiosConfig from "../../../Config/AxiosConfig";

const ReservationCancelledList = () => {
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
    try {
      const reservationToUpdate = reservations.find(
        (reservation) => reservation.reservationId === id
      );

      // Kiểm tra nếu bàn đã được chấp nhận
      if (
        reservationToUpdate.status === "Accepted" &&
        newStatus === "Accepted"
      ) {
        alert(
          "This reservation has already been accepted and cannot be accepted again."
        );
        return; // Dừng hành động nếu bàn đã được chấp nhận
      }

      const response = await axiosConfig.patch(
        `http://localhost:8080/api/reservations/${id}/status`,
        { status: newStatus }
      );

      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.reservationId === id
            ? { ...reservation, status: response.data.status }
            : reservation
        )
      );

      setMessage(`Status updated to ${newStatus}`);
    } catch (error) {
      setMessage("Failed to update status");
    }
  };

  const sortedReservations = reservations
    .filter((reservation) => reservation.status === "Cancelled")
    .sort((a, b) => b.reservationId - a.reservationId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="col-12 tm-block-col">
      <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
        <h2 className="tm-block-title">Reservation Cancelled List</h2>
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
              .filter((reservation) => reservation.status == "Cancelled")
              .slice()
              .sort((a, b) => b.reservation - a.reservation)
              .map((reservation, index, cancelledArray) => (
                <tr key={reservation.reservationId}>
                  <th scope="row">#{cancelledArray.length - index}</th>
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

export default ReservationCancelledList;