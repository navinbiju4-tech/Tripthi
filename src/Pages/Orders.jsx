import { useState } from 'react'
import { Badge, Button, Card, Container, Form, Modal } from 'react-bootstrap'
import {
	FaArrowRight,
	FaArrowRotateLeft,
	FaBagShopping,
	FaCalendarDays,
	FaCartShopping,
	FaCheck,
	FaCircleCheck,
	FaCircleInfo,
	FaCircleXmark,
	FaCreditCard,
	FaFilter,
	FaFire,
	FaHeadset,
	FaLocationDot,
	FaMagnifyingGlass,
	FaMapLocationDot,
	FaReceipt,
	FaTruckFast,
} from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const initialOrders = [
	{
		id: 'TP-2408',
		date: '2026-10-02',
		items: [
			{ id: 'classic', name: 'Classic Chapathi', quantity: 2, price: 4.5, image: 'https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=700', unit: 'pack of 5' },
			{ id: 'multigrain', name: 'Garden Multigrain', quantity: 1, price: 5.25, image: 'https://images.pexels.com/photos/5589943/pexels-photo-5589943.jpeg?auto=compress&cs=tinysrgb&w=700', unit: 'pack of 5' },
		],
		status: 'Out for Delivery',
		payment: 'UPI',
		address: '12 Marine Drive, Kochi, Kerala',
		time: '12:40 PM',
		estimated: '12-18 min',
		distance: '2.4 km',
	},
	{
		id: 'TP-2391',
		date: '2026-10-01',
		items: [
			{ id: 'family', name: 'Family Tawa Pack', quantity: 1, price: 8.5, image: 'https://images.pexels.com/photos/12427834/pexels-photo-12427834.jpeg?auto=compress&cs=tinysrgb&w=700', unit: 'pack of 10' },
		],
		status: 'Delivered',
		payment: 'Card ending in 2048',
		address: '12 Marine Drive, Kochi, Kerala',
		time: '7:15 PM',
		estimated: 'Delivered',
		distance: 'Delivered',
	},
	{
		id: 'TP-2378',
		date: '2026-09-28',
		items: [
			{ id: 'classic', name: 'Classic Chapathi', quantity: 1, price: 4.5, image: 'https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=700', unit: 'pack of 5' },
		],
		status: 'Preparing',
		payment: 'Cash on delivery',
		address: '12 Marine Drive, Kochi, Kerala',
		time: '6:05 PM',
		estimated: '25-35 min',
		distance: 'Kitchen preparing',
	},
]

const statusDetails = {
	'Order Placed': { icon: FaReceipt, className: 'placed' },
	Preparing: { icon: FaFire, className: 'preparing' },
	'Out for Delivery': { icon: FaTruckFast, className: 'on-the-way' },
	Delivered: { icon: FaCircleCheck, className: 'delivered' },
	Cancelled: { icon: FaCircleXmark, className: 'cancelled' },
}

const timelineSteps = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered']

function orderTotal(order) {
	return order.items.reduce((total, item) => total + item.price * item.quantity, 0)
}

function StatusBadge({ status }) {
	const details = statusDetails[status] || statusDetails['Order Placed']
	const Icon = details.icon
	return <Badge className={`tripthi-order-status ${details.className}`}><Icon />{status}</Badge>
}

function OrderTimeline({ status, time }) {
	const currentStep = timelineSteps.indexOf(status)
	const delivered = status === 'Delivered'
	const cancelled = status === 'Cancelled'

	return (
		<div className="tripthi-timeline">
			{(cancelled ? ['Order Placed', 'Cancelled'] : timelineSteps).map((step, index) => {
				const active = cancelled ? index === 1 : delivered || index <= currentStep
				return <div className={`tripthi-timeline-step${active ? ' is-complete' : ''}${cancelled && index === 1 ? ' is-cancelled' : ''}`} key={step}>
					<span className="tripthi-timeline-dot">{active ? <FaCheck /> : null}</span>
					<div><strong>{step}</strong><small>{active ? `${time}${index === 0 ? ' · Confirmed' : ''}` : 'Awaiting update'}</small></div>
				</div>
			})}
		</div>
	)
}

function OrderDetailsModal({ order, onHide, onReorder }) {
	const [customerLocation, setCustomerLocation] = useState(null)
	const [locationMessage, setLocationMessage] = useState('Share your location to preview the route from your current location.')
	if (!order) return null

	const origin = customerLocation ? `${customerLocation.latitude},${customerLocation.longitude}` : 'Tripthi Kitchen, Kochi, Kerala'
	const mapSource = `https://maps.google.com/maps?output=embed&saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(order.address)}`
	const mapLink = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(order.address)}`

	function locateCustomer() {
		if (!navigator.geolocation) {
			setLocationMessage('Location is not available in this browser.')
			return
		}
		setLocationMessage('Finding your location...')
		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				setCustomerLocation({ latitude: coords.latitude, longitude: coords.longitude })
				setLocationMessage('Your location is now used as the route starting point.')
			},
			() => setLocationMessage('Location access was not granted. Showing the kitchen-to-delivery route instead.'),
			{ enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
		)
	}

	return (
		<Modal show={Boolean(order)} onHide={onHide} centered size="lg" scrollable className="tripthi-order-modal">
			<Modal.Header closeButton>
				<div><span className="tripthi-modal-kicker">ORDER DETAILS</span><Modal.Title>{order.id}</Modal.Title></div>
			</Modal.Header>
			<Modal.Body>
				<div className="tripthi-modal-summary"><StatusBadge status={order.status} /><span><FaCalendarDays /> {new Date(`${order.date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span><span><FaCreditCard /> {order.payment}</span></div>
				<div className="tripthi-modal-grid">
					<section>
						<h3>Items in this order</h3>
						<div className="tripthi-detail-items">{order.items.map((item) => <div className="tripthi-detail-item" key={item.id}>
							<img src={item.image} alt={item.name} />
							<div className="tripthi-detail-product"><strong>{item.name}</strong><span>{item.unit} · Qty {item.quantity}</span></div>
							<strong>${(item.price * item.quantity).toFixed(2)}</strong>
						</div>)}</div>
						<div className="tripthi-modal-total"><span>Total paid</span><strong>${orderTotal(order).toFixed(2)}</strong></div>
						<h3 className="tripthi-delivery-heading">Delivery address</h3>
						<p className="tripthi-address"><FaLocationDot /> {order.address}</p>
					</section>
					<section className="tripthi-tracking-panel">
						<div className="tripthi-tracking-head"><div><span className="tripthi-modal-kicker">LIVE TRACKING</span><h3>{order.status === 'Out for Delivery' ? 'Your chapathis are on their way' : order.status}</h3></div><FaMapLocationDot /></div>
						<div className="tripthi-map-wrap"><iframe title={`Google Maps route for ${order.id}`} src={mapSource} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
						<div className="tripthi-map-meta"><span><small>ESTIMATED</small><strong>{order.estimated}</strong></span><span><small>REMAINING</small><strong>{order.distance}</strong></span></div>
						<p className="tripthi-location-message">{locationMessage}</p>
						<div className="tripthi-map-actions"><Button variant="outline-success" size="sm" onClick={locateCustomer}><FaLocationDot /> Use my location</Button><a href={mapLink} target="_blank" rel="noreferrer">Open Google Maps <FaArrowRight /></a></div>
					</section>
				</div>
				<section className="tripthi-timeline-section"><h3>Order timeline</h3><OrderTimeline status={order.status} time={order.time} /></section>
			</Modal.Body>
			<Modal.Footer><Button variant="outline-secondary" onClick={onHide}>Close</Button><Button className="tripthi-reorder-button" onClick={() => onReorder(order)}><FaArrowRotateLeft /> Reorder</Button></Modal.Footer>
		</Modal>
	)
}

function Orders({ onReorder }) {
	const orders = initialOrders
	const [activeOrder, setActiveOrder] = useState(null)
	const [search, setSearch] = useState('')
	const [statusFilter, setStatusFilter] = useState('All statuses')
	const [dateFilter, setDateFilter] = useState('')
	const [notice, setNotice] = useState('')

	const filteredOrders = orders.filter((order) => {
		const matchesSearch = order.id.toLowerCase().includes(search.trim().toLowerCase())
		const matchesStatus = statusFilter === 'All statuses' || order.status === statusFilter
		const matchesDate = !dateFilter || order.date === dateFilter
		return matchesSearch && matchesStatus && matchesDate
	})
	const activeCount = orders.filter((order) => !['Delivered', 'Cancelled'].includes(order.status)).length

	function reorder(order) {
		order.items.forEach((item) => onReorder({ id: item.id, name: item.name, price: item.price, image: item.image, unit: item.unit }, item.quantity))
		setNotice(`${order.id} items were added to your cart.`)
		setActiveOrder(null)
	}

	return (
		<>
			<style>{ordersStyles}</style>
			<Container fluid className="tripthi-orders-page">
				<header className="tripthi-orders-hero">
					<div><span className="tripthi-orders-eyebrow">FRESHNESS, ALL THE WAY TO YOUR DOOR</span><h1>My Orders</h1><p>Follow every order from our kitchen to your table.</p></div>
					<div className="tripthi-orders-count"><span>{orders.length}</span><small>ORDERS<br />PLACED</small></div>
				</header>

				<div className="tripthi-orders-stats">
					<div><span className="tripthi-stat-icon"><FaReceipt /></span><span><small>ALL ORDERS</small><strong>{orders.length}</strong></span></div>
					<div><span className="tripthi-stat-icon active"><FaTruckFast /></span><span><small>ON THE WAY</small><strong>{activeCount}</strong></span></div>
					<div><span className="tripthi-stat-icon delivered"><FaCircleCheck /></span><span><small>DELIVERED</small><strong>{orders.filter((order) => order.status === 'Delivered').length}</strong></span></div>
				</div>

				<div className="tripthi-orders-layout">
					<section className="tripthi-orders-main">
						<div className="tripthi-orders-heading"><div><span className="tripthi-orders-eyebrow">YOUR TRIPTHI HISTORY</span><h2>Recent orders</h2></div><Link to="/products" className="tripthi-continue-link">Order again <FaArrowRight /></Link></div>
						<div className="tripthi-order-filters">
							<Form.Group className="tripthi-search-field"><Form.Label htmlFor="order-search"><FaMagnifyingGlass /> Search order</Form.Label><Form.Control id="order-search" type="search" placeholder="Try TP-2408" value={search} onChange={(event) => setSearch(event.target.value)} /></Form.Group>
							<Form.Group><Form.Label htmlFor="order-date"><FaCalendarDays /> Date</Form.Label><Form.Control id="order-date" type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} /></Form.Group>
							<Form.Group><Form.Label htmlFor="order-status-filter"><FaFilter /> Status</Form.Label><Form.Select id="order-status-filter" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option>{Object.keys(statusDetails).map((status) => <option key={status}>{status}</option>)}</Form.Select></Form.Group>
						</div>
						{notice && <div className="tripthi-order-notice" role="status"><FaCircleCheck /> {notice} <Link to="/cart">View cart</Link></div>}

						{filteredOrders.length ? <div className="tripthi-order-list">{filteredOrders.map((order) => <Card className="tripthi-order-card" key={order.id}>
							<Card.Body>
								<div className="tripthi-card-head"><div><span className="tripthi-card-label">ORDER NUMBER</span><strong>{order.id}</strong></div><StatusBadge status={order.status} /></div>
								<div className="tripthi-card-meta"><span><FaCalendarDays /> {new Date(`${order.date}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {order.time}</span><span><FaCreditCard /> {order.payment}</span></div>
								<div className="tripthi-order-products">{order.items.map((item) => <div className="tripthi-order-product" key={item.id}><img src={item.image} alt="" loading="lazy" /><div><strong>{item.name}</strong><span>{item.unit} · Qty {item.quantity}</span></div><b>${(item.price * item.quantity).toFixed(2)}</b></div>)}</div>
								<div className="tripthi-delivery-line"><FaLocationDot /><span>{order.address}</span></div>
								<div className="tripthi-card-footer"><div><small>TOTAL AMOUNT</small><strong>${orderTotal(order).toFixed(2)}</strong></div><div className="tripthi-card-actions"><Button variant="outline-success" onClick={() => setActiveOrder(order)}><FaCircleInfo /> View Details</Button><Button className="tripthi-reorder-button" onClick={() => reorder(order)}><FaArrowRotateLeft /> Reorder</Button></div></div>
							</Card.Body>
						</Card>)}</div> : <div className="tripthi-empty-orders"><div className="tripthi-empty-art"><img src="https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=500" alt="A fresh chapathi waiting to be enjoyed" /></div><h3>{orders.length ? 'No orders match those filters.' : "You haven't placed any orders yet."}</h3><p>{orders.length ? 'Try a different order number, date, or status.' : 'Fresh, homemade chapathis are only a few clicks away.'}</p><Button as={Link} to="/products" className="tripthi-reorder-button"><FaBagShopping /> Browse Products</Button></div>}
					</section>

					<aside className="tripthi-orders-aside">
						<section className="tripthi-aside-card tripthi-aside-special"><span className="tripthi-aside-kicker">A LITTLE SOMETHING FRESH</span><h2>Good food is worth coming back for.</h2><p>Bring home the comfort of warm chapathis, made fresh every day.</p><Link to="/products">Explore the menu <FaArrowRight /></Link></section>
						<section className="tripthi-aside-card tripthi-quick-actions"><h3>Quick actions</h3><Link to="/products"><FaBagShopping /> View Products <FaArrowRight /></Link><Link to="/cart"><FaCartShopping /> View Cart <FaArrowRight /></Link><a href="mailto:support@tripthi.example?subject=Order%20support"><FaHeadset /> Contact Support <FaArrowRight /></a>{orders[0] && <button type="button" onClick={() => reorder(orders[0])}><FaArrowRotateLeft /> Reorder last meal <FaArrowRight /></button>}</section>
						<p className="tripthi-demo-note"><FaCircleInfo /> Sample order history is shown until live checkout is connected.</p>
					</aside>
				</div>
			</Container>
			<OrderDetailsModal order={activeOrder} onHide={() => setActiveOrder(null)} onReorder={reorder} />
		</>
	)
}

const ordersStyles = `
.tripthi-orders-page{max-width:1440px;margin:auto;padding:34px clamp(16px,4vw,54px) 68px;color:#29382e;animation:tripthiOrdersIn .45s both}
.tripthi-orders-hero{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:25px 0 30px;border-bottom:1px solid #e2e7da}
.tripthi-orders-eyebrow,.tripthi-aside-kicker,.tripthi-card-label,.tripthi-map-meta small{display:block;color:#70856a;font-size:9px;font-weight:800;letter-spacing:1.45px;line-height:1.6}
.tripthi-orders-hero h1{margin:7px 0 4px;color:#203b2c;font:400 clamp(38px,5vw,56px)/1.08 Georgia,'Times New Roman',serif}
.tripthi-orders-hero p{margin:0;color:#788178;font-size:13px}
.tripthi-orders-count{display:flex;align-items:center;gap:11px;padding:12px 16px;border:1px solid #e3e7db;border-radius:5px;background:#fffdf7}
.tripthi-orders-count span{color:#2c5638;font:400 30px Georgia,serif}.tripthi-orders-count small{color:#798272;font-size:9px;font-weight:800;letter-spacing:1px;line-height:1.45}
.tripthi-orders-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px;margin:22px 0 34px}
.tripthi-orders-stats>div{display:flex;align-items:center;gap:12px;padding:15px 17px;border:1px solid #e6e9df;border-radius:5px;background:#fffdf7}
.tripthi-stat-icon{display:grid;width:38px;height:38px;place-items:center;border-radius:50%;color:#497350;background:#edf1e4}.tripthi-stat-icon.active{color:#a46c30;background:#f7edda}.tripthi-stat-icon.delivered{color:#47764d;background:#e7f0e3}
.tripthi-orders-stats small{display:block;color:#869084;font-size:9px;font-weight:800;letter-spacing:1px}.tripthi-orders-stats strong{display:block;margin-top:3px;color:#304534;font-size:20px;font-weight:600}
.tripthi-orders-layout{display:grid;grid-template-columns:minmax(0,1fr) 280px;align-items:start;gap:28px}
.tripthi-orders-heading{display:flex;align-items:end;justify-content:space-between;gap:15px;margin-bottom:17px}.tripthi-orders-heading h2{margin:3px 0 0;color:#233b2c;font:400 28px Georgia,'Times New Roman',serif}
.tripthi-continue-link{display:inline-flex;align-items:center;gap:7px;color:#47704d;font-size:11px;font-weight:700;text-decoration:none}.tripthi-continue-link:hover{color:#a65538}
.tripthi-order-filters{display:grid;grid-template-columns:minmax(150px,1fr) 150px 170px;gap:11px;margin-bottom:17px;padding:14px;border:1px solid #e6e9df;border-radius:5px;background:#f2f1e7}
.tripthi-order-filters .form-label{display:flex;align-items:center;gap:6px;margin-bottom:6px;color:#637262;font-size:10px;font-weight:700}.tripthi-order-filters .form-control,.tripthi-order-filters .form-select{min-height:38px;border-color:#dfe4d8;border-radius:4px;color:#304237;background-color:#fffefa;font-size:11px;box-shadow:none}.tripthi-order-filters .form-control:focus,.tripthi-order-filters .form-select:focus{border-color:#829b75;box-shadow:0 0 0 3px rgba(91,127,88,.12)}
.tripthi-order-list{display:grid;gap:13px}.tripthi-order-card{border:1px solid #e4e8df;border-radius:6px;background:#fffefa;box-shadow:0 5px 18px rgba(31,53,38,.035);animation:tripthiOrdersIn .4s both}.tripthi-order-card .card-body{padding:17px 19px}
.tripthi-card-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.tripthi-card-head>div{display:grid;gap:3px}.tripthi-card-head>div>strong{color:#294332;font-size:15px}.tripthi-order-status{display:inline-flex;align-items:center;gap:6px;padding:7px 9px;border-radius:20px;font-size:9px;font-weight:700;white-space:nowrap}.tripthi-order-status.placed{color:#50699a;background:#e9edf8}.tripthi-order-status.preparing{color:#94602b;background:#f5edda}.tripthi-order-status.on-the-way{color:#357164;background:#e3f1e9}.tripthi-order-status.delivered{color:#3d704b;background:#e6f0e4}.tripthi-order-status.cancelled{color:#9b4e42;background:#f7e8e3}
.tripthi-card-meta{display:flex;flex-wrap:wrap;gap:8px 18px;margin:12px 0;color:#788178;font-size:10px}.tripthi-card-meta span{display:inline-flex;align-items:center;gap:6px}
.tripthi-order-products{display:grid;gap:9px;padding:12px 0;border-top:1px solid #edf0e9;border-bottom:1px solid #edf0e9}.tripthi-order-product{display:flex;align-items:center;gap:10px}.tripthi-order-product img{width:43px;height:39px;border-radius:3px;object-fit:cover}.tripthi-order-product>div{display:grid;flex:1;gap:3px}.tripthi-order-product strong{color:#33483a;font-size:11px}.tripthi-order-product span{color:#879087;font-size:10px}.tripthi-order-product b{color:#3d5b41;font-size:11px}
.tripthi-delivery-line{display:flex;align-items:start;gap:8px;margin-top:12px;color:#737d73;font-size:10px;line-height:1.5}.tripthi-delivery-line svg{flex:0 0 auto;margin-top:2px;color:#688563}
.tripthi-card-footer{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-top:15px;padding-top:12px;border-top:1px solid #edf0e9}.tripthi-card-footer>div:first-child{display:grid;gap:3px}.tripthi-card-footer small{color:#879087;font-size:8px;font-weight:800;letter-spacing:1px}.tripthi-card-footer>div:first-child strong{color:#294b35;font-size:19px}.tripthi-card-actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:7px}.tripthi-card-actions .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 10px;border-radius:4px;font-size:10px;font-weight:700}.tripthi-reorder-button{border:0!important;color:#fff!important;background:#28583b!important}.tripthi-reorder-button:hover{background:#1d432d!important}
.tripthi-orders-aside{display:grid;gap:13px}.tripthi-aside-card{padding:19px;border:1px solid #e3e7dc;border-radius:6px;background:#fffdf7}.tripthi-aside-special{color:#fff;background:linear-gradient(145deg,#214832,#183c2d)}.tripthi-aside-special .tripthi-aside-kicker{color:#d0df9c}.tripthi-aside-special h2{margin:10px 0;color:#fff;font:400 24px/1.2 Georgia,'Times New Roman',serif}.tripthi-aside-special p{margin:0 0 17px;color:rgba(255,255,255,.75);font-size:11px;line-height:1.65}.tripthi-aside-special>a{display:inline-flex;align-items:center;gap:7px;color:#d7e89f;font-size:10px;font-weight:700;text-decoration:none}
.tripthi-quick-actions h3{margin:0 0 8px;color:#314737;font:400 19px Georgia,'Times New Roman',serif}.tripthi-quick-actions>a,.tripthi-quick-actions>button{display:flex;width:100%;align-items:center;gap:9px;padding:11px 0;border:0;border-top:1px solid #edf0e9;color:#536658;background:transparent;font-size:10px;text-align:left;text-decoration:none}.tripthi-quick-actions>a svg:first-child,.tripthi-quick-actions>button svg:first-child{color:#628261}.tripthi-quick-actions>a svg:last-child,.tripthi-quick-actions>button svg:last-child{margin-left:auto;color:#a1a99c;font-size:9px}.tripthi-quick-actions>a:hover,.tripthi-quick-actions>button:hover{color:#a65538}
.tripthi-demo-note{display:flex;align-items:start;gap:7px;margin:0;color:#92998f;font-size:9px;line-height:1.55}.tripthi-demo-note svg{flex:0 0 auto;margin-top:1px}
.tripthi-order-notice{display:flex;align-items:center;gap:8px;margin-bottom:14px;padding:11px 13px;border:1px solid #dce8d5;border-radius:4px;color:#3d6844;background:#f0f5eb;font-size:11px}.tripthi-order-notice a{margin-left:auto;color:#315d3c;font-weight:700}
.tripthi-empty-orders{display:grid;justify-items:center;padding:44px 20px;border:1px dashed #d7dfd1;border-radius:6px;background:#fffefa;text-align:center}.tripthi-empty-art{width:145px;height:110px;margin-bottom:17px;overflow:hidden;border-radius:50%;background:#f2ecdc}.tripthi-empty-art img{width:100%;height:100%;object-fit:cover}.tripthi-empty-orders h3{margin:0;color:#304535;font:400 22px Georgia,'Times New Roman',serif}.tripthi-empty-orders p{margin:8px 0 14px;color:#7b857b;font-size:11px}
.tripthi-order-modal .modal-content{overflow:hidden;border:1px solid rgba(255,255,255,.7);border-radius:8px;background:#fbfaf4;box-shadow:0 24px 70px rgba(22,42,29,.2)}.tripthi-order-modal .modal-header,.tripthi-order-modal .modal-footer{padding:16px 20px;border-color:#e5e8de}.tripthi-modal-kicker{display:block;color:#758b69;font-size:8px;font-weight:800;letter-spacing:1.3px}.tripthi-order-modal .modal-title{margin-top:3px;color:#274330;font:400 23px Georgia,'Times New Roman',serif}.tripthi-order-modal .modal-body{padding:18px 20px}.tripthi-modal-summary{display:flex;flex-wrap:wrap;align-items:center;gap:10px 15px;margin-bottom:18px}.tripthi-modal-summary>span{display:inline-flex;align-items:center;gap:6px;color:#748076;font-size:10px}.tripthi-modal-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(250px,.9fr);gap:20px}.tripthi-modal-grid h3,.tripthi-timeline-section h3{margin:0 0 11px;color:#334b39;font:400 17px Georgia,'Times New Roman',serif}.tripthi-detail-items{display:grid;gap:10px}.tripthi-detail-item{display:flex;align-items:center;gap:9px}.tripthi-detail-item img{width:46px;height:42px;border-radius:3px;object-fit:cover}.tripthi-detail-product{display:grid;flex:1;gap:4px}.tripthi-detail-product strong,.tripthi-detail-item>strong{color:#3b4d3e;font-size:10px}.tripthi-detail-product span{color:#818a7f;font-size:9px}.tripthi-modal-total{display:flex;justify-content:space-between;margin:13px 0;padding:11px 0;border-top:1px solid #e5e8de;border-bottom:1px solid #e5e8de;color:#778076;font-size:10px}.tripthi-modal-total strong{color:#2d5036;font-size:14px}.tripthi-delivery-heading{margin-top:15px!important}.tripthi-address{display:flex;align-items:start;gap:7px;margin:0;color:#738075;font-size:10px;line-height:1.5}.tripthi-address svg{flex:0 0 auto;color:#628261}.tripthi-tracking-panel{padding:14px;border:1px solid #e5e8de;border-radius:5px;background:#f5f4eb}.tripthi-tracking-head{display:flex;justify-content:space-between;gap:8px;margin-bottom:10px}.tripthi-tracking-head>svg{color:#5b7a5d;font-size:18px}.tripthi-tracking-head h3{margin:3px 0 0;font-size:15px}.tripthi-map-wrap{height:165px;overflow:hidden;border-radius:4px;background:#e7e8dc}.tripthi-map-wrap iframe{width:100%;height:100%;border:0}.tripthi-map-meta{display:flex;justify-content:space-between;gap:10px;margin-top:10px}.tripthi-map-meta span{display:grid;gap:3px}.tripthi-map-meta strong{color:#3b5a40;font-size:12px}.tripthi-location-message{margin:8px 0;color:#838b80;font-size:9px;line-height:1.5}.tripthi-map-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px}.tripthi-map-actions .btn,.tripthi-map-actions>a{display:inline-flex;align-items:center;gap:6px;font-size:9px}.tripthi-map-actions>a{color:#45694b;font-weight:700;text-decoration:none}.tripthi-timeline-section{margin-top:22px;padding-top:16px;border-top:1px solid #e5e8de}.tripthi-timeline{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}.tripthi-timeline-step{position:relative;display:grid;justify-items:center;gap:7px;color:#a0a79d;text-align:center}.tripthi-timeline-step:not(:last-child)::after{position:absolute;top:9px;left:calc(50% + 13px);width:calc(100% - 20px);height:1px;background:#dce1d7;content:''}.tripthi-timeline-step.is-complete:not(:last-child)::after{background:#9db58e}.tripthi-timeline-dot{z-index:1;display:grid;width:19px;height:19px;place-items:center;border:1px solid #d6ddd1;border-radius:50%;color:#fff;background:#fff;font-size:8px}.tripthi-timeline-step.is-complete .tripthi-timeline-dot{border-color:#557c56;background:#557c56}.tripthi-timeline-step.is-cancelled .tripthi-timeline-dot{border-color:#a95b4b;background:#a95b4b}.tripthi-timeline-step strong{font-size:8px;font-weight:700}.tripthi-timeline-step small{display:block;margin-top:3px;font-size:8px}.tripthi-order-modal .modal-footer .btn{font-size:10px}
@keyframes tripthiOrdersIn{from{transform:translateY(7px);opacity:0}to{transform:translateY(0);opacity:1}}
@media(max-width:1100px){.tripthi-orders-layout{grid-template-columns:minmax(0,1fr) 245px;gap:18px}.tripthi-order-filters{grid-template-columns:minmax(140px,1fr) 130px 150px}}
@media(max-width:850px){.tripthi-orders-layout{grid-template-columns:1fr}.tripthi-orders-aside{grid-template-columns:repeat(2,minmax(0,1fr))}.tripthi-demo-note{grid-column:1/-1}.tripthi-orders-aside .tripthi-aside-special{min-height:100%}}
@media(max-width:600px){.tripthi-orders-page{padding:22px 14px 45px}.tripthi-orders-hero{padding:13px 0 22px}.tripthi-orders-hero p{max-width:260px;font-size:11px}.tripthi-orders-count{gap:7px;padding:9px}.tripthi-orders-count span{font-size:24px}.tripthi-orders-stats{gap:7px;margin:15px 0 25px}.tripthi-orders-stats>div{gap:7px;padding:10px 8px}.tripthi-stat-icon{width:30px;height:30px;font-size:11px}.tripthi-orders-stats small{font-size:7px}.tripthi-orders-stats strong{font-size:16px}.tripthi-orders-heading h2{font-size:24px}.tripthi-order-filters{grid-template-columns:1fr 1fr;padding:11px}.tripthi-search-field{grid-column:1/-1}.tripthi-order-card .card-body{padding:14px}.tripthi-card-head{align-items:flex-start}.tripthi-order-status{font-size:8px}.tripthi-card-meta{gap:7px 12px}.tripthi-card-footer{align-items:flex-start;flex-direction:column}.tripthi-card-actions{width:100%;justify-content:flex-start}.tripthi-orders-aside{grid-template-columns:1fr}.tripthi-demo-note{grid-column:auto}.tripthi-modal-grid{grid-template-columns:1fr}.tripthi-order-modal .modal-dialog{margin:10px}.tripthi-order-modal .modal-header,.tripthi-order-modal .modal-footer{padding:12px 14px}.tripthi-order-modal .modal-body{padding:14px}.tripthi-timeline{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 4px}.tripthi-timeline-step:nth-child(2)::after{display:none}.tripthi-timeline-step:not(:last-child)::after{top:9px}.tripthi-timeline-step strong{font-size:8px}}
@media(prefers-reduced-motion:reduce){.tripthi-order-card{animation:none}}
`

export default Orders
