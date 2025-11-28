import React from 'react'
import { useCart } from '../../context/CartContext'

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? <p>No items in cart</p> : (
        <ul>
          {cart.map(item => (
            <li key={item._id}>
              {item.name} - ₹{item.price}
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
