import React from "react";
import { IoClose } from "react-icons/io5";

const Sidebar = ({ menuOpen, setMenuOpen, filterProducts }) => {
  const handleFilter = (category) => {
    filterProducts(category);
    setMenuOpen(false); // Close the sidebar after filtering
  };
  return (
    <div className={`sidebar ${menuOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setMenuOpen(false)}>
        <IoClose />
      </button>
      <div className="mob_nav_container">
        <div className="mob_category_btns">
          <button
            onClick={() => {
              handleFilter("all");
              setMenuOpen(false);
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              handleFilter("men's clothing");
              setMenuOpen(false);
            }}
          >
            Men
          </button>
          <button
            onClick={() => {
              handleFilter("women's clothing");
              setMenuOpen(false);
            }}
          >
            Women
          </button>
          <button
            onClick={() => {
              handleFilter("electronics");
              setMenuOpen(false);
            }}
          >
            Electronics
          </button>
          <button
            onClick={() => {
              handleFilter("jewelery");
              setMenuOpen(false);
            }}
          >
            Jewelery
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
