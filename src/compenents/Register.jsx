import { useState } from 'react'
import BrandMark from './BrandMark.jsx'

function Register({ customers, onRegister, onSwitchToLogin }) {
	const [notice, setNotice] = useState('')
	const [hasError, setHasError] = useState(false)

	function handleSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const name = formData.get('name').trim()
		const email = formData.get('email').trim().toLowerCase()
		const password = formData.get('password')
		const confirmPassword = formData.get('confirm-password')

		if (password !== confirmPassword) {
			setHasError(true)
			setNotice('Your passwords do not match.')
			return
		}

		if (customers.some((customer) => customer.email === email)) {
			setHasError(true)
			setNotice('An account with this email already exists. Sign in instead.')
			return
		}

		onRegister({ name, email, password })
	}

	return (
		<main className="login-page">
			<section
				className="brand-panel"
				aria-label="Tripthi"
				style={{
					backgroundImage:
						"linear-gradient(0deg, rgba(11, 27, 22, 0.42), rgba(11, 27, 22, 0.42)), url('https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1400&q=80')",
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div className="brand brand-no-glass">
					<BrandMark className="brand-mark brand-mark-light" />
					<span>Tripthi</span>
				</div>

				<div className="brand-message brand-message-clean">
					<span className="eyebrow">FRESHLY MADE DAILY</span>
					<h1>From Wheat to Warm Chapathis</h1>
					<p>Fresh homemade chapathis prepared daily with quality ingredients, care, and traditional taste.</p>
				</div>

				<div className="brand-footer">
					<span className="status-dot" aria-hidden="true" />
					<span>A good place to begin again.</span>
				</div>
				<div className="panel-orbit panel-orbit-one" aria-hidden="true" />
				<div className="panel-orbit panel-orbit-two" aria-hidden="true" />
			</section>

			<section className="form-panel" id="register">
				<div className="form-wrap">
					<div className="mobile-brand" aria-label="Tripthi">
						<BrandMark className="brand-mark" />
						<span>Tripthi</span>
					</div>
					<div className="form-heading">
						<span className="eyebrow">JOIN TRIPTHI</span>
						<h2>Create your account</h2>
						<p>Just a few details to get you started.</p>
					</div>

					<form className="register-form" onSubmit={handleSubmit}>
						<div className="register-fields">
							<div>
								<label className="field-label" htmlFor="register-name">Full name</label>
								<input className="text-input" id="register-name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
							</div>
							<div>
								<label className="field-label" htmlFor="register-email">Email address</label>
								<input className="text-input" id="register-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
							</div>
							<div>
								<label className="field-label" htmlFor="register-password">Password</label>
								<input className="text-input" id="register-password" name="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" minLength={8} required />
							</div>
							<div>
								<label className="field-label" htmlFor="confirm-password">Confirm password</label>
								<input className="text-input" id="confirm-password" name="confirm-password" type="password" placeholder="Enter your password again" autoComplete="new-password" minLength={8} required />
							</div>
						</div>

						<p className={`form-notice${hasError ? ' form-notice-error' : ''}`} role="status" aria-live="polite">{notice}</p>
						<button className="submit-button" type="submit">
							Create account
							<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg>
						</button>
					</form>

					<p className="signup-prompt">Already have an account? <button className="text-link link-button" type="button" onClick={onSwitchToLogin}>Sign in</button></p>
					<p className="terms-note">By creating an account, you agree to our <a href="mailto:support@tripthi.example?subject=Terms%20of%20service">Terms</a> and <a href="mailto:support@tripthi.example?subject=Privacy%20policy">Privacy Policy</a>.</p>
				</div>
			</section>
		</main>
	)
}

export default Register
