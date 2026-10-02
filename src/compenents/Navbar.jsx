import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { FaBagShopping, FaBars, FaCartShopping, FaCircleInfo, FaClipboardList, FaComments, FaHouse, FaRightFromBracket, FaUser, FaXmark } from 'react-icons/fa6'
import { NavLink, useLocation } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

function Navbar({ customer, cartCount = 0, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { label: 'Dashboard', to: '/home', icon: <FaHouse /> },
    { label: 'Products', to: '/products', icon: <FaBagShopping /> },
    { label: 'Cart', to: '/cart', icon: <FaCartShopping /> },
    { label: 'Orders', to: '/orders', icon: <FaClipboardList /> },
    { label: 'Feedback', to: '/feedback', icon: <FaComments /> },
    { label: 'Profile', to: '/profile', icon: <FaUser /> },
    { label: 'About Us', to: '/about', icon: <FaCircleInfo /> },
  ]

  function closeMenu() {
    setMobileMenuOpen(false)
  }

  return (
    <header className="store-header">
      <NavLink className="store-brand" to="/home" aria-label="Tripthi dashboard" onClick={closeMenu}>
        <BrandMark className="brand-mark" />
        <span>Tripthi</span>
      </NavLink>

      <nav className="store-nav desktop-nav" aria-label="Main navigation">
        {navItems.map(({ label, to, icon }) => (
          <NavLink key={to} to={to} onClick={closeMenu} end={to === '/home'}>
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="store-account">
        <span>Hi, {customer?.name?.split(' ')[0] || 'there'}</span>
        <button className="store-signout" type="button" onClick={onLogout}><FaRightFromBracket /> Logout</button>
      </div>

      <button
        type="button"
        className="store-menu-toggle"
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="tripthi-mobile-menu"
        onClick={() => setMobileMenuOpen((open) => !open)}
      >
        {mobileMenuOpen ? <FaXmark /> : <FaBars />}
      </button>

      <div className={`store-side-overlay${mobileMenuOpen ? ' is-visible' : ''}`} onClick={closeMenu} aria-hidden={!mobileMenuOpen} />

      <nav id="tripthi-mobile-menu" className={`store-side-menu${mobileMenuOpen ? ' is-open' : ''}`} aria-label="Mobile navigation">
        <div className="store-side-header">
          <div className="store-side-brand">
            <BrandMark className="brand-mark" />
            <span>Tripthi</span>
          </div>
          <button type="button" className="store-side-close" aria-label="Close navigation menu" onClick={closeMenu}>
            <FaXmark />
          </button>
        </div>

        <div className="store-side-links">
          {navItems.map(({ label, to, icon }) => (
            <NavLink key={to} to={to} onClick={closeMenu} end={to === '/home'}>
              <span className="side-menu-icon">{icon}</span>
              <span>{label}</span>
              {to === '/cart' && cartCount > 0 && <Badge bg="light" text="dark" className="menu-badge">{cartCount}</Badge>}
            </NavLink>
          ))}

          <button type="button" className="store-side-logout" onClick={onLogout}>
            <span className="side-menu-icon"><FaRightFromBracket /></span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar