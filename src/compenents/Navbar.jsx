import { Badge } from 'react-bootstrap'
import { FaBagShopping, FaCartShopping, FaCircleInfo, FaClipboardList, FaHouse, FaRightFromBracket, FaUser } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'

function Navbar({ customer, cartCount = 0, onLogout }) {
  return (
    <header className="store-header">
      <NavLink className="store-brand" to="/home" aria-label="Tripthi dashboard">
        <BrandMark className="brand-mark" />
        <span>Tripthi</span>
      </NavLink>
      <nav className="store-nav" aria-label="Main navigation">
        <NavLink to="/home"><FaHouse /> Dashboard</NavLink>
        <NavLink to="/products"><FaBagShopping /> Products</NavLink>
        <NavLink to="/cart"><FaCartShopping /> Cart {cartCount > 0 && <Badge bg="light" text="dark">{cartCount}</Badge>}</NavLink>
        <NavLink to="/orders"><FaClipboardList /> Orders</NavLink>
        <NavLink to="/profile"><FaUser /> Profile</NavLink>
        <NavLink to="/about"><FaCircleInfo /> About</NavLink>
      </nav>
      <div className="store-account">
        <span>Hi, {customer?.name?.split(' ')[0] || 'there'}</span>
        <button className="store-signout" type="button" onClick={onLogout}><FaRightFromBracket /> Logout</button>
      </div>
    </header>
  )
}

export default Navbar