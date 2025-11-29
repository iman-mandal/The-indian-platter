import { useCart } from "../../context/CartContext";
import './CartPage.css';

export default function CartPage() {
    const { cart, removeFromCart } = useCart();

    return (
        <div className="menuContaner">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p className="emptyCart">Your cart is empty.</p>
            ) : (
                <div className="menu-grid">
                    {cart.map(item => (
                        <div className="menu-card" key={item._id}>
                            <img src={item.image || '/placeholder.png'} alt={item.name} />

                            <div className="card-body">
                                <h3>{item.name}</h3>
                                <p>{item.category}</p>

                                <div className="card-foot">
                                    <div className="price">₹{item.price}</div>

                                    <button
                                        className="btnRemove"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
