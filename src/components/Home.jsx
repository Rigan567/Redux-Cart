import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Header from "./Header";

const ProductCard = ({
  name,
  id,
  price,
  category,
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

export const NavContent = () => {};

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setFilteredProducts(data);
      });
  }, [productList]);

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });

    dispatch({ type: "calculatePrice" });
    toast.success("Added to Cart");
  };

  const filterProducts = (category) => {
    if (category === "all") {
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
      <Header filterProducts={filterProducts} />
      <div className="home">
        <div className="category_tab">
          <div className="category_btns">
            <button onClick={() => filterProducts("all")}>all</button>
            <button onClick={() => filterProducts("men's clothing")}>
              Men
            </button>
            <button onClick={() => filterProducts("women's clothing")}>
              Women
            </button>
            <button onClick={() => filterProducts("electronics")}>
              Electronics
            </button>
            <button onClick={() => filterProducts("jewelery")}>Jewelery</button>
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
