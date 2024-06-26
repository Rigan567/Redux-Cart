import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoReorderThree } from "react-icons/io5";
import Sidebar from "./Sidebar";

const Header = ({ filterProducts }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav>
        <h2 className="logo">Shopping Cart</h2>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/cart"}>
            <FiShoppingCart />
            <p>{cartItems.length}</p>
          </Link>
          <button className="nav_btn" onClick={() => setMenuOpen(!menuOpen)}>
            <IoReorderThree />
          </button>
        </div>
      </nav>
      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        filterProducts={filterProducts}
      />
    </>
  );
};

export default Header;
