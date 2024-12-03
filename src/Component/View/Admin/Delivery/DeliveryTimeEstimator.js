import axios from "axios";
import React, { useState } from "react";
import { customTranslate } from "../../../../i18n";
import "./DeliveryTimeEstimator.css";

function DeliveryTimeEstimator() {
  const [distance, setDistance] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(null);

  const handleEstimate = async () => {
    try {
      const response = await axios.post("/api/predictDeliveryTime", {
        distance: parseFloat(distance),
        timeOfDay: parseInt(timeOfDay),
        preparationTime: parseInt(preparationTime),
      });
      setEstimatedTime(response.data);
    } catch (error) {
      console.error("Error estimating delivery time:", error);
    }
  };

  return (
    <div className="delivery-estimator-container">
      <input
        className="delivery-estimator-input"
        type="number"
        placeholder="Distance"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <input
        className="delivery-estimator-input"
        type="number"
        placeholder="Time of Day (1-3)"
        value={timeOfDay}
        onChange={(e) => setTimeOfDay(e.target.value)}
      />
      <input
        className="delivery-estimator-input"
        type="number"
        placeholder="Preparation Time"
        value={preparationTime}
        onChange={(e) => setPreparationTime(e.target.value)}
      />
      <button className="delivery-estimator-button" onClick={handleEstimate}>
        {customTranslate("Estimate Delivery Time")}
      </button>
      {estimatedTime && (
        <p className="delivery-estimator-estimated-time">
          {customTranslate("Estimated Delivery Time")}: {estimatedTime}{" "}
          {customTranslate("minutes")}
        </p>
      )}
    </div>
  );
}

export default DeliveryTimeEstimator;
