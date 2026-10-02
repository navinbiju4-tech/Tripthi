import { Link } from 'react-router-dom'

function Wishlist() {
	return (
		<section className="store-page store-empty-state">
			<span className="eyebrow">SAVED FOR LATER</span>
			<h1>Your wishlist is empty</h1>
			<p>Keep the chapathis you love close at hand.</p>
			<Link className="store-action" to="/products">Explore products</Link>
		</section>
	)
}

export default Wishlist
