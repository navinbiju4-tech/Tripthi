import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa6'

const products = [
	{ id: 'classic', name: 'Classic Chapathi', description: 'Soft whole-wheat chapathis, rolled fresh every morning.', price: 4.5, unit: 'Pack of 5', image: 'https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=900' },
	{ id: 'multigrain', name: 'Garden Multigrain', description: 'A wholesome blend of grains with a tender golden finish.', price: 5.25, unit: 'Pack of 5', image: 'https://images.pexels.com/photos/5589943/pexels-photo-5589943.jpeg?auto=compress&cs=tinysrgb&w=900' },
	{ id: 'family', name: 'Family Tawa Pack', description: 'A generous stack for gathering around the table.', price: 8.5, unit: 'Pack of 10', image: 'https://images.pexels.com/photos/12427834/pexels-photo-12427834.jpeg?auto=compress&cs=tinysrgb&w=900' },
]

function Products({ onAddToCart }) {
	return (
		<Container className="customer-products-page">
			<div className="section-heading"><div><span className="dashboard-eyebrow">ROLLED FRESH, EVERY MORNING</span><h1>Our chapathis</h1><p>Made by hand, ready for your table.</p></div></div>
			<Row className="g-3 g-xl-4">{products.map((product) => (
				<Col key={product.id} xs={12} sm={6} md={6} xl={3}>
					<Card className="customer-product-card h-100"><div className="customer-product-image-wrap"><Card.Img className="customer-product-image" variant="top" src={product.image} alt={product.name} loading="lazy" /></div><Card.Body className="d-flex flex-column"><div className="d-flex justify-content-between gap-2"><Card.Title>{product.name}</Card.Title><strong className="product-price">${product.price.toFixed(2)}</strong></div><Card.Text>{product.description}</Card.Text><div className="product-card-footer mt-auto"><span>{product.unit}</span><Button className="add-cart-button" onClick={() => onAddToCart(product)}><FaPlus /> Add to cart</Button></div></Card.Body></Card>
				</Col>
			))}</Row>
		</Container>
	)
}

export default Products
