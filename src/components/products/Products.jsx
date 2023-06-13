import React, { useEffect, useState } from "react";
import Image from "../../images/product.jpg";
import "./products.css";
import { generalRequest } from "../../httpService";

const Products = () => {
  // products state
  const [products, setProducts] = useState([]);

  // fetch products when page renders
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await generalRequest.get("/product");
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    return () => {
      getProducts();
    };
  }, []);

  return (
    <div>
      <div className="productContainer">
        <div className="productTitle">Our Products</div>
        <div className="productWrapper">
          {products?.map((product) => (
            <div className="prodCard" key={product._id}>
              <div className="prodImg">
                {product.img !== "" ? (
                  <img src={product.img} alt="Product Image" />
                ) : (
                  <img src={Image} alt="Product Image" />
                )}
              </div>
              <div className="prodTitle">{product.title}</div>
              <div className="prodDesc">{product.desc}</div>
              <div className="prodColor">{product.color}</div>
              <div className="prodPrice">£{product.price}</div>
              <button className="cartBtn">Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
