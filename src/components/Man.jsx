import React, { useEffect } from "react";
import { ProductCard } from "./Home";

const Man = ({
  productList,
  filteredProducts,
  setFilteredProducts,
  category,
  addToCartHandler,
}) => {
  useEffect(() => {
    const filterProducts = (category) => {
      // if (category === "all") {
      //   setFilteredProducts(productList);
      // } else {}
      if (!productList) return;
      else {
        const filtered = productList.filter(
          (product) => product.category === category
        );
        setFilteredProducts(filtered);
      }
    };

    filterProducts(category);
  }, [category, productList, setFilteredProducts]);
  return (
    <>
      <div className="products_tab">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </>
  );
};

export default Man;
