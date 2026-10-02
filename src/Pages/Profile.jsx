import { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { FaArrowRight, FaBagShopping, FaCheck, FaEnvelope, FaLocationDot, FaPenToSquare, FaPhone, FaShieldHalved, FaUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function Profile({ customer, onUpdate }) {
	const [editing, setEditing] = useState(false)
	const [saved, setSaved] = useState(false)
	const [details, setDetails] = useState({
		name: customer?.name || '',
		email: customer?.email || '',
		phone: customer?.phone || '',
		address: customer?.address || '',
	})

	function handleChange(event) {
		setSaved(false)
		setDetails((current) => ({ ...current, [event.target.name]: event.target.value }))
	}

	function handleSubmit(event) {
		event.preventDefault()
		onUpdate({ ...customer, ...details })
		setEditing(false)
		setSaved(true)
	}

	function cancelEditing() {
		setDetails({
			name: customer?.name || '',
			email: customer?.email || '',
			phone: customer?.phone || '',
			address: customer?.address || '',
		})
		setEditing(false)
	}

	return (
		<Container className="tripthi-profile-page">
			<header className="tripthi-profile-heading">
				<div><span className="tripthi-profile-eyebrow">YOUR TRIPTHI ACCOUNT</span><h1>My Profile</h1><p>Keep your details and delivery information up to date.</p></div>
				<Button as={Link} to="/orders" className="profile-orders-link">My orders <FaArrowRight /></Button>
			</header>

			{saved && <Alert variant="success" className="profile-saved-alert"><FaCheck /> Your profile has been updated for this session.</Alert>}

			<Row className="g-4 align-items-start">
				<Col lg={4}>
					<Card className="tripthi-profile-summary">
						<Card.Body>
							<div className="tripthi-profile-avatar">{details.name.trim().charAt(0).toUpperCase() || <FaUser />}</div>
							<span className="tripthi-profile-eyebrow">TRIPTHI CUSTOMER</span>
							<h2>{details.name || 'Your name'}</h2>
							<p>{details.email}</p>
							<div className="tripthi-profile-perk"><FaShieldHalved /><span>Your details are only used to manage your orders and delivery.</span></div>
						</Card.Body>
					</Card>
					<div className="tripthi-profile-shortcuts">
						<Link to="/products"><FaBagShopping /> Browse chapathis <FaArrowRight /></Link>
						<Link to="/cart"><FaLocationDot /> Delivery details are used at checkout <FaArrowRight /></Link>
					</div>
				</Col>

				<Col lg={8}>
					<Card className="tripthi-profile-form-card">
						<Card.Body>
							<div className="tripthi-profile-card-heading"><div><span className="tripthi-profile-eyebrow">PERSONAL DETAILS</span><h2>Account information</h2></div>{!editing && <Button variant="outline-success" onClick={() => setEditing(true)}><FaPenToSquare /> Edit profile</Button>}</div>
							<Form onSubmit={handleSubmit}>
								<Row className="g-3">
									<Col md={6}><Form.Group><Form.Label htmlFor="profile-name"><FaUser /> Full name</Form.Label><Form.Control id="profile-name" name="name" value={details.name} onChange={handleChange} readOnly={!editing} required autoComplete="name" /></Form.Group></Col>
									<Col md={6}><Form.Group><Form.Label htmlFor="profile-email"><FaEnvelope /> Email address</Form.Label><Form.Control id="profile-email" name="email" type="email" value={details.email} onChange={handleChange} readOnly={!editing} required autoComplete="email" /></Form.Group></Col>
									<Col md={6}><Form.Group><Form.Label htmlFor="profile-phone"><FaPhone /> Phone number</Form.Label><Form.Control id="profile-phone" name="phone" type="tel" value={details.phone} onChange={handleChange} readOnly={!editing} placeholder={editing ? 'Add a phone number' : 'Not added yet'} autoComplete="tel" /></Form.Group></Col>
									<Col xs={12}><Form.Group><Form.Label htmlFor="profile-address"><FaLocationDot /> Delivery address</Form.Label><Form.Control id="profile-address" name="address" as="textarea" rows={3} value={details.address} onChange={handleChange} readOnly={!editing} placeholder={editing ? 'Add your preferred delivery address' : 'No delivery address saved yet'} autoComplete="street-address" /></Form.Group></Col>
								</Row>
								{editing && <div className="tripthi-profile-form-actions"><Button variant="outline-secondary" type="button" onClick={cancelEditing}>Cancel</Button><Button className="profile-save-button" type="submit"><FaCheck /> Save changes</Button></div>}
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default Profile
