import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    console.log("cart", cart[0]);

    // Calculate total amount for all products in the cart
    const calculateTotalAmount = () => {
        const totalAmount = cart.reduce((total, item) => total + item.cost * item.quantity, 0);
        return totalAmount;
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping();
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    const handleIncrement = (item) => {
        const itemToIncrease = cart.find(cartItem => cartItem.name === item.name);
        if (itemToIncrease) {
            dispatch(updateQuantity({name: itemToIncrease.name, quantity: itemToIncrease.quantity + 1}));
        }
    };

    const handleDecrement = (item) => {
        const itemToDecrease = cart.find(cartItem => cartItem.name === item.name);
        if (itemToDecrease && itemToDecrease.quantity > 1) {
            dispatch(updateQuantity({name: itemToDecrease.name, quantity: itemToDecrease.quantity - 1}));
        } else {
            dispatch(removeItem(itemToDecrease));
        }
    };

    const handleRemove = (item) => {
        const itemToRemove = cart.find(cartItem => cartItem.name === item.name);
        if (itemToRemove) {
            dispatch(removeItem(itemToRemove));
        };
    };

    // Calculate total cost based on quantity for an item
    const calculateTotalCost = (item) => {
        const itemToCalculate = cart.find(cartItem => cartItem.name === item.name);
        if (itemToCalculate && itemToCalculate.quantity > 0) {
            const itemCost = itemToCalculate.cost * itemToCalculate.quantity;
            return itemCost;
        } else {
            return 0;
        }
    };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


