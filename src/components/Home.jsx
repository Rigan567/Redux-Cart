import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Header from "./Header";
import { Link, useParams } from "react-router-dom";

export const ProductCard = ({
  name,
  id,
  price,

  handler,
  imgSrc,
  description,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const sliceDes = description.slice(0, 100);
  const sliceName = name.slice(0, 5);

  const toggleBar = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <>
      <div className="container">
        <div className="productCard">
          <img src={imgSrc} alt={name} />
          <p className="name_p">
            {isEnabled ? name : `${sliceName}...   `}
            <span
              className="toggle"
              onClick={toggleBar}
              style={{ fontWeight: "650", cursor: "pointer" }}
            >
              {isEnabled ? "   See Less" : "   See More"}
            </span>
          </p>
          <h4>${price}</h4>

          <p className="des_p">
            {isEnabled ? description : `${sliceDes}...   `}
            <span
              className="toggle"
              onClick={toggleBar}
              style={{ fontWeight: "650", cursor: "pointer" }}
            >
              {isEnabled ? "   See Less" : "   See More"}
            </span>
          </p>
        </div>
        <div className="btndiv">
          <button
            onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        filterProducts(category);
      });
  }, [category]);

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added to Cart");
  };

  const filterProducts = (category) => {
    if (category === "all" || !category) {
      setFilteredProducts(productList);
    } else {
      const filtered = productList.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <Header />
      <div className="home">
        <div className="category_tab">
          <div className="category_btns">
            <Link to="/category/all">All</Link>
            <Link to="/category/men's clothing">Men</Link>
            <Link to="/category/women's clothing">Women</Link>
            <Link to="/category/electronics">Electronics</Link>
            <Link to="/category/jewelery">Jewelery</Link>
          </div>
        </div>
        <div className="products_tab">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              imgSrc={product.image}
              name={product.title}
              price={product.price}
              category={product.category}
              description={product.description}
              id={product.id}
              handler={addToCartHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
