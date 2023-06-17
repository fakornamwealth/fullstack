import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import Navbar from "../../components/navbar/Navbar";
import productImage from "../../images/product.jpg";
import "./cart.css";

const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
const Cart = () => {
  const [cart, setCart] = useState(cartStorage);

  const deleteFromCart = (id) => {
    const newCartStorage = cartStorage.filter((product) => product._id !== id);

    setCart(localStorage.setItem("cart", JSON.stringify(newCartStorage)));
  };

  return (
    <div>
      <Navbar />
      <div className="listContainer">
        <ListGroup>
          {cart?.map((product) => (
            <>
              <ListGroup.Item key={product._id}>
                <Row>
                  {" "}
                  <Col md={2}>
                    {product.img !== "" && (
                      <Image src={product.img} alt="product" fluid rounded />
                    )}
                    {product.img === "" && (
                      <Image src={productImage} alt="product" fluid rounded />
                    )}
                  </Col>
                  <Col md={2}>
                    <span>{product.title}</span>
                  </Col>
                  <Col md={2}>$ {product.price}</Col>
                  <Col md={2}>
                    <Form.Control as="select" value="2">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Form.Control>
                  </Col>
                  <Col>
                    <Button
                      onClick={() => deleteFromCart(product._id)}
                      type="button"
                      variant="light"
                    >
                      <AiFillDelete style={{ fontSize: "30px" }} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal: 5 items</span>
        <span style={{ fontSize: 20, fontWeight: 700 }}>Total: $ 3000</span>
        <Button type="button">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
