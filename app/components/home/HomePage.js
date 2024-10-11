import React, { useState } from "react";
import "../css/HomePage.css";
import SearchBar from "../search/SearchBar";
import AddProduct from "../addProduct/addProduct";
import homeImage from "../../assets/home.png";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "search":
        return <SearchBar />;
      case "addProduct":
        return <AddProduct />;
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      <h1>FLAWA</h1>
      <div className="imageHome"></div>
      <div className="backHome"></div>
      <div className="button-container">
        <button onClick={() => setCurrentPage("search")}>
          SCANNER LE PRODUIT
        </button>
        <button onClick={() => setCurrentPage("addProduct")}>
          AJOUTER UN PRODUIT
        </button>
      </div>

      <div>{renderPage()}</div>
    </div>
  );
};

export default HomePage;
