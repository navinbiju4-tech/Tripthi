import { Link } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

function Footer({ variant = 'store' }) {
	if (variant === 'feedback') {
		return (
			<footer className="feedback-footer">
				<Link className="feedback-footer-brand" to="/home"><BrandMark className="brand-mark brand-mark-light" /> Tripthi</Link>
				<p>Made fresh, shared with love.</p>
				<a href="mailto:support@tripthi.example">support@tripthi.example</a>
				<span>© {new Date().getFullYear()} Tripthi</span>
			</footer>
		)
	}

	return (
		<footer className="store-footer">
			<span className="store-footer-brand"><BrandMark className="brand-mark brand-mark-light" /> Tripthi</span>
			<p>Made fresh, shared with love.</p>
			<a className="store-footer-link" href="mailto:support@tripthi.example" aria-label="Email Tripthi support">Contact support</a>
			<span>© {new Date().getFullYear()} Tripthi</span>
		</footer>
	)
}

export default Footer
