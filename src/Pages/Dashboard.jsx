import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight, FaCartShopping, FaClock, FaFire, FaHouse, FaPlus, FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const products = [
  {
    id: 'classic',
    name: 'Classic Chapathi',
    description: 'Soft whole-wheat chapathis, rolled fresh every morning.',
    price: 4.5,
    unit: 'pack of 5',
    image: 'https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: 'Bestseller',
  },
  {
    id: 'multigrain',
    name: 'Garden Multigrain',
    description: 'A hearty blend of grains with a tender, golden finish.',
    price: 5.25,
    unit: 'pack of 5',
    image: 'https://images.pexels.com/photos/5589943/pexels-photo-5589943.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: 'Wholesome',
  },
  {
    id: 'family',
    name: 'Family Tawa Pack',
    description: 'A generous stack for gathering around the table.',
    price: 8.5,
    unit: 'pack of 10',
    image: 'https://images.pexels.com/photos/12427834/pexels-photo-12427834.jpeg?auto=compress&cs=tinysrgb&w=900',
    tag: 'Family pick',
  },
]

const recentOrders = [
  { id: 'TP-2048', items: 'Classic Chapathi · 2 packs', date: 'Today, 11:20 AM', status: 'Preparing' },
  { id: 'TP-1982', items: 'Family Tawa Pack · 1 pack', date: 'Yesterday', status: 'Delivered' },
]

function ProductCard({ product, onAddToCart, popular = false }) {
  return (
    <Card className="customer-product-card h-100">
      <div className="customer-product-image-wrap">
        <Card.Img className="customer-product-image" variant="top" src={product.image} alt={product.name} loading="lazy" />
        <Badge className="product-tag">{popular ? <><FaStar /> Popular</> : product.tag}</Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <Card.Title>{product.name}</Card.Title>
          <strong className="product-price">${product.price.toFixed(2)}</strong>
        </div>
        <Card.Text>{product.description}</Card.Text>
        <div className="product-card-footer mt-auto">
          <span>{product.unit}</span>
          <Button className="add-cart-button" onClick={() => onAddToCart(product)} aria-label={`Add ${product.name} to cart`}>
            <FaPlus /> Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

function OrderList() {
  return (
    <div className="recent-orders-list">
      {recentOrders.map((order) => (
        <div className="recent-order-row" key={order.id}>
          <div className="order-icon"><FaCartShopping /></div>
          <div className="order-info">
            <strong>{order.id}</strong>
            <span>{order.items}</span>
          </div>
          <span className="order-date">{order.date}</span>
          <Badge className={`order-status ${order.status === 'Delivered' ? 'is-delivered' : 'is-preparing'}`}>
            {order.status === 'Preparing' && <FaClock />}{order.status}
          </Badge>
        </div>
      ))}
    </div>
  )
}

function Dashboard({ customer, onAddToCart }) {
  return (
    <Container fluid className="customer-dashboard">
      <section className="dashboard-welcome" data-aos="fade-up">
        <div className="welcome-copy">
          <span className="dashboard-eyebrow">FRESH FROM OUR TAWA</span>
          <h1>Welcome Back to Tripthi<span>, {customer?.name?.split(' ')[0]}</span></h1>
          <p>Fresh homemade chapathis made daily.</p>
          <Button as={Link} to="/products" className="welcome-shop-button">Shop chapathis <FaArrowRight /></Button>
        </div>
        <div className="welcome-stamp" aria-hidden="true"><FaHouse /><span>Made fresh<br />every day</span></div>
      </section>

      <section className="dashboard-section" aria-labelledby="featured-title" data-aos="fade-up">
        <div className="section-heading">
          <div><span className="dashboard-eyebrow">A LITTLE SOMETHING FRESH</span><h2 id="featured-title">Featured for you</h2></div>
          <Link className="section-link" to="/products">All products <FaArrowRight /></Link>
        </div>
        <Row className="g-3 g-xl-4">
          {products.map((product) => <Col key={product.id} xs={12} sm={6} xl={4}><ProductCard product={product} onAddToCart={onAddToCart} /></Col>)}
        </Row>
      </section>

      <section className="today-special" data-aos="fade-up">
        <div className="special-icon"><FaFire /></div>
        <div className="special-copy"><span>TODAY'S SPECIAL</span><h2>Make it a meal to remember</h2><p>Pick up any two packs and enjoy 10% off your order today.</p></div>
        <Link className="special-link" to="/products">Explore today's menu <FaArrowRight /></Link>
      </section>

      <section className="dashboard-section popular-section" aria-labelledby="popular-title" data-aos="fade-up">
        <div className="section-heading">
          <div><span className="dashboard-eyebrow">LOVED AROUND THE TABLE</span><h2 id="popular-title">Popular products</h2></div>
        </div>
        <Row className="g-3 g-xl-4">
          {products.slice(0, 2).map((product) => <Col key={`popular-${product.id}`} xs={12} sm={6} xl={4}><ProductCard product={product} onAddToCart={onAddToCart} popular /></Col>)}
        </Row>
      </section>

      <section className="dashboard-section orders-section" id="orders" aria-labelledby="orders-title" data-aos="fade-up">
        <div className="section-heading">
          <div><span className="dashboard-eyebrow">FROM OUR KITCHEN TO YOUR DOOR</span><h2 id="orders-title">My recent orders</h2></div>
          <Link className="section-link" to="/orders">View all orders <FaArrowRight /></Link>
        </div>
        <OrderList />
      </section>

      <section className="quick-actions-section" id="profile" aria-labelledby="quick-actions-title" data-aos="fade-up">
        <div className="section-heading"><div><span className="dashboard-eyebrow">YOUR TRIPTHI</span><h2 id="quick-actions-title">Quick actions</h2></div></div>
        <div className="quick-actions-grid">
          <Link to="/products"><span className="quick-action-icon"><FaHouse /></span><span>View Products</span><FaArrowRight /></Link>
          <Link to="/cart"><span className="quick-action-icon"><FaCartShopping /></span><span>View Cart</span><FaArrowRight /></Link>
          <Link to="/orders"><span className="quick-action-icon"><FaClock /></span><span>My Orders</span><FaArrowRight /></Link>
          <Link to="/profile"><span className="quick-action-icon"><FaStar /></span><span>Profile</span><FaArrowRight /></Link>
        </div>
      </section>
    </Container>
  )
}

export function OrdersPage() {
  return <Container className="customer-subpage"><span className="dashboard-eyebrow">YOUR TRIPTHI ORDERS</span><h1>My orders</h1><OrderList /></Container>
}

export function ProfilePage({ customer }) {
  return (
    <Container className="customer-subpage" id="profile">
      <span className="dashboard-eyebrow">YOUR ACCOUNT</span><h1>Profile</h1>
      <Card className="profile-card"><Card.Body><span className="profile-avatar">{customer?.name?.charAt(0)?.toUpperCase() || 'T'}</span><div><strong>{customer?.name || 'Tripthi customer'}</strong><p>{customer?.email}</p></div></Card.Body></Card>
    </Container>
  )
}

export default Dashboard