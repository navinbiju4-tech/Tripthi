import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './compenents/login.jsx'
import Register from './compenents/Register.jsx'
import Home, { LandingPage } from './Pages/Home.jsx'
import Products from './Pages/Products.jsx'
import Cart from './Pages/Cart.jsx'
import Wishlist from './Pages/Wishlist.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import Orders from './Pages/Orders.jsx'
import Aboutus from './Pages/Aboutus.jsx'
import Profile from './Pages/Profile.jsx'
import Feedback from './Pages/Feedback.jsx'
import './App.css'

function AppRoutes() {
  const [customers, setCustomers] = useState([])
  const [authenticatedCustomer, setAuthenticatedCustomer] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 70,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    })
  }, [])

  useEffect(() => {
    AOS.refreshHard()
  }, [location.pathname])

  function handleRegister(customer) {
    setCustomers((currentCustomers) => [...currentCustomers, customer])
    navigate('/login', {
      state: {
        email: customer.email,
        message: 'Your account is ready. Sign in to continue.',
      },
    })
  }

  function handleLogin(customer) {
    setAuthenticatedCustomer(customer)
    navigate('/home')
  }

  function handleLogout() {
    setAuthenticatedCustomer(null)
    setCartItems([])
    navigate('/')
  }

  function addToCart(product, quantity = 1) {
    setCartItems((currentItems) => {
      const existing = currentItems.find((item) => item.id === product.id)
      return existing
        ? currentItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...currentItems, { ...product, quantity }]
    })
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <Login
            customers={customers}
            onLoginSuccess={handleLogin}
            onRegisterClick={() => navigate('/register')}
          />
        }
      />
      <Route
        path="/register"
        element={
          <Register
            customers={customers}
            onRegister={handleRegister}
            onSwitchToLogin={() => navigate('/login')}
          />
        }
      />
      <Route element={authenticatedCustomer ? <Home customer={authenticatedCustomer} onLogout={handleLogout} cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)} /> : <Navigate to="/" replace />}>
        <Route path="home" element={<Dashboard customer={authenticatedCustomer} onAddToCart={addToCart} />} />
        <Route path="products" element={<Products onAddToCart={addToCart} />} />
        <Route path="cart" element={<Cart items={cartItems} />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="about" element={<Aboutus />} />
        <Route path="orders" element={<Orders onReorder={addToCart} />} />
        <Route path="profile" element={<Profile customer={authenticatedCustomer} onUpdate={setAuthenticatedCustomer} />} />
        <Route path="feedback" element={<Feedback customer={authenticatedCustomer} cartCount={cartItems.reduce((count, item) => count + item.quantity, 0)} onLogout={handleLogout} />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
