import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Cart({ items }) {
	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

	if (items.length) {
		return (
			<Container className="customer-subpage">
				<span className="dashboard-eyebrow">READY FOR YOUR TABLE</span><h1>Your cart</h1>
				<div className="cart-items">{items.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><strong>{item.name}</strong><span>{item.unit} · Qty {item.quantity}</span></div><strong>${(item.price * item.quantity).toFixed(2)}</strong></div>)}</div>
				<div className="cart-total"><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div>
				<Button className="welcome-shop-button" disabled>Continue to checkout</Button>
				<p className="checkout-note">Checkout will be available when online ordering is connected.</p>
			</Container>
		)
	}

	return (
		<section className="store-page store-empty-state">
			<span className="eyebrow">YOUR ORDER</span>
			<h1>Your cart is empty</h1>
			<p>When you find something you love, it will be waiting here.</p>
			<Link className="store-action" to="/products">Browse products</Link>
		</section>
	)
}

export default Cart
