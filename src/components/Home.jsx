import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const img1 =
  "https://cdnus.globalso.com/wellypaudio/Touch-Wireless-TWS-Gaming-Earbuds.jpg";

const img2 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp25esgz9ESv6P0OywMHj2gLhU_f9oZnqEe03ihNLAHovgsUGmLY-9Yaoz1mnrveSrhM4&usqp=CAU";

const ProductCard = ({ name, id, price, handler, imgSrc }) => {
  return (
    <div className="productCard">
      <img src={imgSrc} alt={name} />
      <p>{name}</p>
      <h4>${price}</h4>
      <button onClick={() => handler({ name, price, id, quantity: 1, imgSrc })}>
        Add to Cart
      </button>
    </div>
  );
};

const Home = () => {
  const productList = [
    {
      name: "EarBuds",
      price: "2000",
      imgSrc: img1,
      id: "dasdasdasd",
    },
    {
      name: "Black Shoes",
      price: "10000",
      imgSrc: img2,
      id: "diuotyuiot",
    },
  ];

  const dispatch = useDispatch();

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
          imgSrc={product.imgSrc}
          name={product.name}
          price={product.price}
          id={product.id}
          handler={addToCartHandler}
        />
      ))}
    </div>
  );
};

export default Home;
