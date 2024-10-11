import React, { useState } from "react";
import "../css/HomePage.css";
import SearchBar from "../search/SearchBar";
import AddProduct from "../addProduct/addProduct";

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
      <h1>Welcome to My App</h1>

      <div className="button-container">
        <button onClick={() => setCurrentPage("search")}>Rechercher un produit</button>
        <button onClick={() => setCurrentPage("addProduct")}>
          Ajouter un produit
        </button>
      </div>

      <div>{renderPage()}</div>
    </div>
  );
};

export default HomePage;
