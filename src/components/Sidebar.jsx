import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className={`sidebar ${menuOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setMenuOpen(false)}>
        <IoClose />
      </button>
      <div className="mob_nav_container">
        <div className="mob_category_btns">
          <Link to="/category/all" onClick={() => setMenuOpen(false)}>
            All
          </Link>
          <Link
            to="/category/men's clothing"
            onClick={() => setMenuOpen(false)}
          >
            Men
          </Link>
          <Link
            to="/category/women's clothing"
            onClick={() => setMenuOpen(false)}
          >
            Women
          </Link>
          <Link to="/category/electronics" onClick={() => setMenuOpen(false)}>
            Electronics
          </Link>
          <Link to="/category/jewelery" onClick={() => setMenuOpen(false)}>
            Jewelery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
