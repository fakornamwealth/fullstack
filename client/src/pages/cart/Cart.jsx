import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Navbar from '../../components/navbar/Navbar';

import './cart.css';
import { userRequest } from '../../httpService';

// const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);

  // get user from Local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // get cart funtion
  const getCart = async () => {
    try {
      const { data } = await userRequest.get(`/cart/find/${user._id}`);

      // calculate the total
      const total = data.reduce(
        (total, currentItem) =>
          (total =
            Number(total) + Number(currentItem.amount * currentItem.quantity)),
        0
      );
      setCart(data);

      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  // call the getCart function when the page loads/renders
  useEffect(() => {
    getCart();
  }, []);

  // function to delete a product from cart
  const deleteFromCart = async (id) => {
    try {
      const { data } = await userRequest.delete(`/cart/${id}`);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
    // filter the cart array
    setCart(cart.filter((cart) => cart._id !== id));
    getCart();
  };

  // function to update/edit a product from cart
  const updateCart = async (cart) => {
    // return if the quantity is less than 1
    if (quantity < 1)
      return alert(
        `Default quantity is 0, Please input a value greater than 0 to increase quantity`
      );
    try {
      // api call to edit
      const { data } = await userRequest.put(`/cart/${cart._id}`, {
        id: user._id, // userId
        product: cart.product.map((p) => ({
          productId: p.productId, //product Id
          quantity: p.quantity + Number(quantity), //quantity
        })),
        quantity: cart.quantity + Number(quantity),
        amount: cart.amount,
        total: cart.amount * cart.quantity,
        //total = cart amount multiply by quantity
      });
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='cartWrapper'>
        Input a value to increase the quantity of desired product and click the
        "Edit" button
        <input
          className='numInput'
          type='number'
          placeholder=''
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        {cart?.map((c) => (
          <div key={c._id}>
            {c?.product.map((p) => (
              <div className='prodValues'>
                <div className='prodValue'>ProductId : {p.productId} </div>
                <div className='prodValue'>
                  Product quantity: {p.quantity}{' '}
                </div>{' '}
              </div>
            ))}
            <div className='prodValues'>Product Amount: {c.amount} </div>
            <button
              className='deleteBtn'
              onClick={() => {
                deleteFromCart(c._id);
              }}
            >
              Remove
            </button>
            <button
              className='editBtn'
              onClick={() => {
                updateCart(c);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <div className='filters summary'>
        <span className='title'>Subtotal: {cart.length} item(s)</span>
        <span style={{ fontSize: 20, fontWeight: 700 }}>Total: £ {total}</span>
        <Button type='button'>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
