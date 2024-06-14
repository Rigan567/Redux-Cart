import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const ProductCard = ({ name, id, price, handler, imgSrc, description }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const sliceDes = description.slice(0, 100);
  const sliceName = name.slice(0, 5);

  const toggleBar = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className="container">
      <div className="productCard">
        <img src={imgSrc} alt={name} />
        <p>
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
        <p>
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
  );
};

const Home = () => {
  const [productList, setProductList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setProductList(data));
  }, [productList]);

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });

    dispatch({ type: "calculatePrice" });
    toast.success("Added to Cart");
  };

  return (
    <div className="home">
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          imgSrc={product.image}
          name={product.title}
          price={product.price}
          description={product.description}
          id={product.id}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

export default Home;
