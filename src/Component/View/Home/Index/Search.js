import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosConfig.get(
        `http://localhost:8080/api/user/foodvariation/findFoodVariationByFoodName?foodName=${query}`
      );
      setResults(response.data);
      // Chuyển hướng đến trang FoodDetails với ID của sản phẩm đầu tiên trong kết quả
      if (response.data.length > 0) {
        const firstResult = response.data[0];
        console.log("dử liệu result", firstResult);
        navigate(`/FoodDetails/${firstResult.foodVariationId}`);
      }
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={customTranslate("Search for food...")}
        />
        <button className="search-button" type="submit">
          {customTranslate("Search")}
        </button>
      </form>
    </div>
  );
};
export default Search;
