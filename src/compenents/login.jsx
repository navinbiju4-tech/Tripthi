import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

function Login({ customers, onLoginSuccess, onRegisterClick }) {
	const location = useLocation()
	const videoRef = useRef(null)
	const [showPassword, setShowPassword] = useState(false)
	const [notice, setNotice] = useState(location.state?.message || '')
	const [hasError, setHasError] = useState(false)

	useEffect(() => {
		const video = videoRef.current
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
		const smallScreen = window.matchMedia('(max-width: 640px)')
		const handleTimeUpdate = () => {
			if (video.currentTime >= 16) video.currentTime = 0
		}
		const syncPlayback = () => {
			if (reducedMotion.matches || smallScreen.matches) {
				video.pause()
				return
			}

			video.play().catch(() => {})
		}

		video.addEventListener('timeupdate', handleTimeUpdate)
		reducedMotion.addEventListener('change', syncPlayback)
		smallScreen.addEventListener('change', syncPlayback)
		syncPlayback()

		return () => {
			video.removeEventListener('timeupdate', handleTimeUpdate)
			reducedMotion.removeEventListener('change', syncPlayback)
			smallScreen.removeEventListener('change', syncPlayback)
		}
	}, [])

	function handleSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		const email = formData.get('email').trim().toLowerCase()
		const password = formData.get('password')
		const customer = customers.find((account) => account.email === email && account.password === password)

		setHasError(!customer)
		if (customer) {
			onLoginSuccess(customer)
		} else {
			setNotice('We could not find an account with those details.')
		}
	}

	return (
		<main className="login-page">
			<section className="brand-panel" aria-label="Tripthi">
				<video
					ref={videoRef}
					className="brand-video"
					muted
					playsInline
					preload="none"
					aria-hidden="true"
				>
					<source src="https://videos.pexels.com/video-files/10038337/10038337-hd_1920_1080_30fps.mp4" type="video/mp4" />
				</video>
				<a className="brand" href="#sign-in" aria-label="Tripthi home">
					<BrandMark className="brand-mark brand-mark-light" />
					<span>Tripthi</span>
				</a>

				<div className="brand-message">
					<span className="eyebrow">Tripthi Products....</span>
					<h2> perfectly conveys the feeling of satisfaction and fullness after a great meal.</h2>
					<p>A little more clarity for the work you do every day.</p>
				</div>

				<div className="brand-footer">
					<span className="status-dot" aria-hidden="true" />
					<span>A good place to begin again.</span>
				</div>
				<div className="panel-orbit panel-orbit-one" aria-hidden="true" />
				<div className="panel-orbit panel-orbit-two" aria-hidden="true" />
			</section>

			<section className="form-panel" id="sign-in">
				<div className="form-wrap">
					<div className="mobile-brand" aria-label="Tripthi">
						<BrandMark className="brand-mark" />
						<span>Tripthi</span>
					</div>
					<div className="form-heading">
						<span className="eyebrow">WELCOME BACK</span>
						<h2>Sign in to your account</h2>
						<p>Pick up right where you left off.</p>
					</div>

					<form className="login-form" onSubmit={handleSubmit}>
						<label className="field-label" htmlFor="email">Email address</label>
						<input
							className="text-input"
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							defaultValue={location.state?.email || ''}
							autoComplete="email"
							required
						/>

						<div className="password-label-row">
							<label className="field-label" htmlFor="password">Password</label>
							<a className="text-link" href="mailto:support@tripthi.example?subject=Password%20reset">
								Forgot password?
							</a>
						</div>
						<div className="password-input-wrap">
							<input
								className="text-input"
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter your password"
								autoComplete="current-password"
								required
							/>
							<button
								className="password-toggle"
								type="button"
								onClick={() => setShowPassword((visible) => !visible)}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
								title={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? (
									<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.2 9.5 7-.4 1.1-1.1 2.2-2.1 3.2M6.2 6.2C3.9 7.7 2.8 10 2.5 12c.5 1.3 1.5 2.7 2.9 3.8A10.3 10.3 0 0012 19c1.1 0 2.1-.2 3-.5" /></svg>
								) : (
									<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="2.5" /></svg>
								)}
							</button>
						</div>

						<label className="remember-row">
							<input type="checkbox" name="remember" />
							<span className="checkmark" aria-hidden="true" />
							<span>Keep me signed in</span>
						</label>

						<button className="submit-button" type="submit">
							Sign in
							<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M10 5l5 5-5 5" /></svg>
						</button>
						<p className={`form-notice${hasError ? ' form-notice-error' : ''}`} role="status" aria-live="polite">{notice}</p>
					</form>

					<p className="signup-prompt">New to Tripthi? <button className="text-link link-button" type="button" onClick={onRegisterClick}>Create an account</button></p>
					<p className="terms-note">By continuing, you agree to our <a href="mailto:support@tripthi.example?subject=Terms%20of%20service">Terms</a> and <a href="mailto:support@tripthi.example?subject=Privacy%20policy">Privacy Policy</a>.</p>
				</div>
			</section>
		</main>
	)
}

export default Login
