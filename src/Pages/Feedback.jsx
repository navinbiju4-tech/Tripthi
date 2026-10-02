import { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { FaCheck, FaPaperPlane, FaRightFromBracket, FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Navbar from '../compenents/Navbar.jsx'
import Footer from '../compenents/Footer.jsx'

function Feedback({ customer, cartCount = 0, onLogout }) {
	const [reviews, setReviews] = useState([
		{ id: 1, name: 'Aarav Nair', rating: 5, message: 'The chapathis were soft, warm, and tasted just like home. Loved the freshness!', date: 'Sep 18, 2026' },
		{ id: 2, name: 'Meera S.', rating: 4, message: 'Delivery was quick and the poori was crisp and fresh. Will order again.', date: 'Sep 12, 2026' },
		{ id: 3, name: 'Rohit K.', rating: 5, message: 'The dosa batter was excellent and the quality felt premium. Great service.', date: 'Sep 05, 2026' },
	])
	const [formData, setFormData] = useState({
		name: customer?.name || '',
		rating: 0,
		message: '',
	})
	const [notice, setNotice] = useState('')

	const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length

	function handleChange(event) {
		const { name, value } = event.target
		setFormData((current) => ({ ...current, [name]: value }))
	}

	function handleSubmit(event) {
		event.preventDefault()

		if (!formData.name.trim() || !formData.message.trim() || formData.rating === 0) {
			setNotice('Please enter your name, rating, and feedback before submitting.')
			return
		}

		const newReview = {
			id: Date.now(),
			name: formData.name.trim(),
			rating: Number(formData.rating),
			message: formData.message.trim(),
			date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
		}

		setReviews((current) => [newReview, ...current])
		setFormData({
			name: customer?.name || '',
			rating: 0,
			message: '',
		})
		setNotice('Thank you! Your feedback has been submitted successfully.')
	}

	return (
		<>
			<style>{feedbackStyles}</style>
			<div className="feedback-site">
				<Navbar customer={customer} cartCount={cartCount} onLogout={onLogout} />

				<main className="feedback-main">
					<Container className="feedback-container">
						<div className="feedback-topbar">
							<div className="feedback-intro">
								<span className="feedback-kicker">WE VALUE YOUR FEEDBACK</span>
								<h1>Tell us how Tripthi feels to you.</h1>
								<p>Your thoughts help us improve every order, every batch, and every bite.</p>
							</div>

							<div className="feedback-summary">
								<div className="feedback-score-box">
									<span className="feedback-score">{averageRating.toFixed(1)}</span>
									<span className="feedback-score-total">/ 5.0</span>
								</div>
								<div className="feedback-score-meta">
									<div className="feedback-stars-static" aria-label={`Average rating ${averageRating.toFixed(1)} out of 5`}>
										{[1, 2, 3, 4, 5].map((star) => (
											<span key={star} className={star <= Math.round(averageRating) ? 'filled' : ''}><FaStar /></span>
										))}
									</div>
									<small>{reviews.length} customer reviews</small>
								</div>
							</div>
						</div>

						<div className="feedback-grid">
							<section className="feedback-form-wrap">
								<div className="feedback-form-heading"><FaStar /><span>YOUR REVIEW</span></div>
								<Form onSubmit={handleSubmit} className="feedback-form">
									<Form.Group className="feedback-field">
										<Form.Label htmlFor="feedback-name">Name</Form.Label>
										<Form.Control id="feedback-name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" required />
									</Form.Group>

									<Form.Group className="feedback-rating-group">
										<Form.Label>Rating</Form.Label>
										<div className="feedback-stars" role="radiogroup" aria-label="Rate your experience">
											{[1, 2, 3, 4, 5].map((value) => (
												<button
													key={value}
													type="button"
													role="radio"
													aria-checked={formData.rating === value}
													aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
													className={value <= formData.rating ? 'selected' : ''}
													onClick={() => setFormData((current) => ({ ...current, rating: value }))}
												>
													<FaStar />
												</button>
											))}
										</div>
									</Form.Group>

									<Form.Group className="feedback-field">
										<Form.Label htmlFor="feedback-message">Feedback Message</Form.Label>
										<Form.Control id="feedback-message" as="textarea" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us what you loved or what we can improve." minLength={8} required />
									</Form.Group>

									<div className="feedback-form-bottom">
										<span>Your feedback is shared with the Tripthi team.</span>
										<Button type="submit" className="feedback-submit"><FaPaperPlane /> Submit</Button>
									</div>
									{notice && <div className="feedback-notice" role="status">{notice}</div>}
								</Form>
							</section>

							<aside className="feedback-reviews-panel">
								<div className="feedback-list-header">
									<h3>Recent customer reviews</h3>
									<span>{reviews.length} reviews</span>
								</div>
								<div className="feedback-review-list">
									{reviews.map((review) => (
										<article key={review.id} className="feedback-review-card">
											<div className="feedback-review-head">
												<div>
													<strong>{review.name}</strong>
													<small>{review.date}</small>
												</div>
												<div className="feedback-star-row" aria-label={`${review.rating} star review`}>
													{[1, 2, 3, 4, 5].map((value) => (
														<span key={`${review.id}-${value}`} className={value <= review.rating ? 'filled' : ''}><FaStar /></span>
													))}
												</div>
											</div>
											<p>{review.message}</p>
										</article>
									))}
								</div>
							</aside>
						</div>
					</Container>
				</main>

				<Footer variant="feedback" />
			</div>
		</>
	)
}

const feedbackStyles = `
.feedback-site{min-height:100vh;color:#2b3d30;background:#faf9f3}
.feedback-main{min-height:calc(100vh - 158px);padding:52px 0 58px;background:radial-gradient(ellipse at 50% 0%,#f0f0e3 0,transparent 47%)}
.feedback-container{max-width:1100px}
.feedback-topbar{display:flex;align-items:end;justify-content:space-between;gap:22px;margin-bottom:30px}
.feedback-intro{max-width:620px;animation:feedback-rise .45s both}
.feedback-kicker{color:#6b8660;font-size:9px;font-weight:800;letter-spacing:1.6px}
.feedback-intro h1{margin:10px 0;color:#203a2b;font:400 clamp(32px,4vw,50px)/1.1 Georgia,'Times New Roman',serif}
.feedback-intro p{margin:0;color:#778176;font-size:13px;line-height:1.7}
.feedback-summary{display:flex;align-items:center;gap:16px;padding:18px 20px;border:1px solid #e4e8dd;border-radius:14px;background:#fffdf8;box-shadow:0 14px 32px rgba(30,54,37,.04)}
.feedback-score-box{display:flex;align-items:flex-end;gap:6px;color:#223d2d}
.feedback-score{font:400 clamp(28px,3vw,42px)/1 Georgia,'Times New Roman',serif}
.feedback-score-total{font-size:12px;font-weight:700;color:#5f6d61}
.feedback-score-meta{display:grid;gap:5px}
.feedback-stars-static{display:flex;gap:4px;color:#d0b279}
.feedback-stars-static span{display:inline-flex;opacity:.35}
.feedback-stars-static span.filled{opacity:1}
.feedback-score-meta small{color:#788176;font-size:10px;letter-spacing:.6px;text-transform:uppercase}
.feedback-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:24px;align-items:start}
.feedback-form-wrap,.feedback-reviews-panel{padding:clamp(20px,3vw,30px);border:1px solid #e3e7dc;border-radius:12px;background:rgba(255,255,250,.94);box-shadow:0 18px 42px rgba(30,54,37,.06)}
.feedback-form-heading{display:flex;align-items:center;gap:9px;padding-bottom:14px;border-bottom:1px solid #e9ece4;color:#315c3e;font-size:10px;font-weight:800;letter-spacing:1.2px}
.feedback-form-heading svg{color:#a77934}
.feedback-form{margin-top:18px}
.feedback-field{margin-bottom:18px}
.feedback-field .form-label,.feedback-rating-group .form-label{margin-bottom:8px;color:#425742;font-size:11px;font-weight:700}
.feedback-field .form-control{min-height:46px;border:1px solid #dfe4da;border-radius:6px;color:#2a3d30;background:#fffefa;font-size:13px;box-shadow:none}.feedback-field textarea.form-control{min-height:132px;resize:vertical}
.feedback-field .form-control:focus{border-color:#859f7a;box-shadow:0 0 0 3px rgba(91,127,88,.11)}
.feedback-rating-group{margin-bottom:18px}
.feedback-stars{display:flex;gap:8px}.feedback-stars button{display:grid;width:42px;height:42px;place-items:center;border:1px solid #e1e5d9;border-radius:8px;color:#c5c8bb;background:#fffefa;transition:all .15s ease}.feedback-stars button:hover{transform:translateY(-2px);color:#a77934}.feedback-stars button.selected{border-color:#ead5a7;color:#b48436;background:#fbf3df}
.feedback-form-bottom{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:8px}
.feedback-form-bottom>span{color:#879086;font-size:10px}
.feedback-submit{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 18px;border:none;border-radius:6px;color:#fff;background:#28583b;font-size:11px;font-weight:700}.feedback-submit:hover{color:#fff;background:#1d432d}.feedback-submit:disabled{opacity:1}
.feedback-notice{margin-top:14px;padding:10px 12px;border:1px solid #dfe9d7;border-radius:6px;color:#355d3d;background:#f3f7ee;font-size:11px}
.feedback-list-header{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #e9ece4}
.feedback-list-header h3{margin:0;color:#234032;font:400 24px Georgia,'Times New Roman',serif}
.feedback-list-header span{color:#758474;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase}
.feedback-review-list{display:grid;gap:14px}
.feedback-review-card{padding:16px;border:1px solid #e8ebdf;border-radius:10px;background:#fffefb}
.feedback-review-head{display:flex;align-items:start;justify-content:space-between;gap:12px;margin-bottom:10px}
.feedback-review-head strong{display:block;color:#2d473a;font-size:13px}
.feedback-review-head small{color:#7a8478;font-size:10px}
.feedback-star-row{display:flex;gap:3px;color:#d0b279;font-size:11px}
.feedback-star-row span{opacity:.35}
.feedback-star-row span.filled{opacity:1}
.feedback-review-card p{margin:0;color:#58675d;font-size:12px;line-height:1.7}
.feedback-footer{display:flex;min-height:82px;align-items:center;justify-content:space-between;gap:18px;padding:16px clamp(18px,5vw,72px);color:#ccd7c9;background:#173d2d;font-size:10px}.feedback-footer-brand{color:#fff;font-size:15px}.feedback-footer-brand img{width:28px;height:28px}.feedback-footer p{margin:0}.feedback-footer>a:not(.feedback-footer-brand){color:#d8e4c8;text-decoration:none}.feedback-footer>a:hover{color:#fff;text-decoration:underline}.feedback-footer>span{white-space:nowrap}
@keyframes feedback-rise{from{transform:translateY(9px);opacity:0}to{transform:translateY(0);opacity:1}}
@media(max-width:900px){.feedback-topbar,.feedback-grid{grid-template-columns:1fr;display:grid}.feedback-summary{justify-content:flex-start}.feedback-form-wrap,.feedback-reviews-panel{padding:20px}} 
@media(max-width:620px){.feedback-main{padding:34px 0 42px}.feedback-footer{flex-wrap:wrap;justify-content:center;gap:10px 18px;text-align:center}.feedback-footer-brand{flex-basis:100%;justify-content:center}.feedback-form-bottom{align-items:flex-start;flex-direction:column}.feedback-form-bottom .btn{align-self:stretch}.feedback-review-head{flex-direction:column}.feedback-list-header{align-items:flex-start;flex-direction:column}}
@media(prefers-reduced-motion:reduce){.feedback-intro,.feedback-form-wrap,.feedback-success{animation:none}}
`

export default Feedback
