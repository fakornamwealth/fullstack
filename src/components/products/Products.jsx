import React, { useEffect, useState } from "react";
import Image from "../../images/product.jpg";
import "./products.css";
import { generalRequest, userRequest } from "../../httpService";

const Products = () => {
  // products state
  const [products, setProducts] = useState([]);

  // get user from Local storage
  const user = JSON.parse(localStorage.getItem("user"));

  let cart = [];
  // add product to cart
  const addToCart = async (product) => {
    cart.push(product);
    try {
      const { data } = await userRequest.post("/cart", {
        id: user._id, // userId
        product: [
          {
            productId: product._id, //product Id
          },
        ],
        amount: product.price, //price
      });
      console.log(data, "added to cart ");

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.log(error);
    }
  };

  // fetch products when page renders
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await generalRequest.get("/product");

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts(); // return the get products function
  }, []);

  // add product to cart

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
              <button onClick={() => addToCart(product)} className="cartBtn">
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
