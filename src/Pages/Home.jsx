import { useLayoutEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import { FaArrowDown, FaArrowRight, FaCheck, FaFire, FaHeart, FaLeaf, FaShieldHalved, FaWheatAwn } from 'react-icons/fa6'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Navbar from '../compenents/Navbar.jsx'
import Footer from '../compenents/Footer.jsx'
import BrandMark from '../compenents/BrandMark.jsx'

function Home({ customer, onLogout, cartCount }) {
    const { pathname } = useLocation()
    const isFeedbackPage = pathname === '/feedback'
    const showNavigation = pathname !== '/' && !isFeedbackPage

    return (
        <main className={`storefront${pathname === '/' ? ' landing-shell' : ''}`}>
            {showNavigation && <Navbar customer={customer} cartCount={cartCount} onLogout={onLogout} />}

            <div className={`store-content${pathname === '/' ? ' landing-store-content' : ''}`}>
                <Outlet />
            </div>

            {pathname !== '/' && !isFeedbackPage && <Footer />}
        </main>
    )
}

export function LandingPage() {
    const storyRef = useRef(null)

    useLayoutEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let context
        let cancelled = false

        async function setupScrollAnimations() {
            const { default: gsap } = await import('gsap')
            const { ScrollTrigger } = await import('gsap/ScrollTrigger')
            if (cancelled) return

            gsap.registerPlugin(ScrollTrigger)
            context = gsap.context(() => {
                if (reducedMotion) return

                gsap.fromTo('[data-hero-reveal]',
                    { y: 26, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.18 },
                )

                gsap.utils.toArray('[data-story-reveal]').forEach((element) => {
                    gsap.fromTo(element,
                        { y: 34, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            ease: 'power3.out',
                            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
                        },
                    )
                })

                gsap.utils.toArray('[data-story-image]').forEach((image) => {
                    gsap.fromTo(image,
                        { clipPath: 'inset(7% 5% 7% 5%)', scale: 1.035 },
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            scale: 1,
                            duration: 1,
                            ease: 'power2.out',
                            scrollTrigger: { trigger: image, start: 'top 88%', once: true },
                        },
                    )
                })
            }, storyRef)
        }

        setupScrollAnimations()
        return () => {
            cancelled = true
            context?.revert()
        }
    }, [])

    const processSteps = [
        { number: '01', title: 'Choose', text: 'We start with carefully selected, simple ingredients.' },
        { number: '02', title: 'Knead', text: 'Fresh dough is mixed and rested for a soft texture.' },
        { number: '03', title: 'Roll', text: 'Each chapathi is shaped by hand, one at a time.' },
        { number: '04', title: 'Cook & share', text: 'It meets the hot tawa, then heads to your table.' },
    ]

    return (
        <div className="tripthi-story" ref={storyRef}>
            <section className="landing-screen story-hero">
                <video className="landing-video story-hero-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" onLoadedMetadata={(event) => { event.currentTarget.playbackRate = 0.72 }}>
                    <source src="https://videos.pexels.com/video-files/8626685/8626685-uhd_3840_2160_25fps.mp4" type="video/mp4" />
                </video>
                <div className="story-hero-content">
                    <BrandMark className="story-mark" data-hero-reveal />
                    <span className="story-hero-kicker" data-hero-reveal>TRIPTHI · MADE FRESH, EVERY DAY</span>
                    <h1 data-hero-reveal>Made with care.<br /><em>Shared with love.</em></h1>
                    <p data-hero-reveal>Soft, homemade chapathis, thoughtfully prepared from our kitchen to your table.</p>
                    <a className="story-scroll-cue" href="#natural"><span>Discover our story</span><FaArrowDown /></a>
                </div>
                <div className="story-hero-caption"><FaWheatAwn /><span>Simple ingredients. A little patience. A lot of heart.</span></div>
            </section>

            <main className="story-main">
                <section className="story-natural story-section" id="natural">
                    <div className="story-container story-split">
                        <div className="story-copy" data-story-reveal>
                            <span className="story-eyebrow">01 / GOODNESS, KEPT SIMPLE</span>
                            <h2>100% natural<br /><em>by nature.</em></h2>
                            <p>We believe great food doesn't need a long list of extras. Our chapathis begin with carefully chosen ingredients and the kind of care you'd bring to your own kitchen.</p>
                            <ul className="story-check-list"><li><FaCheck /> No artificial ingredients</li><li><FaCheck /> No preservatives</li><li><FaCheck /> Honest, wholesome ingredients</li></ul>
                        </div>
                        <figure className="story-photo story-natural-photo" data-story-image><img src="https://images.pexels.com/photos/39519755/pexels-photo-39519755.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Fresh dough and simple ingredients ready for homemade flatbread" loading="lazy" /><figcaption><FaLeaf /> Nothing extra. Just good food.</figcaption></figure>
                    </div>
                </section>

                <section className="story-daily story-section">
                    <div className="story-container story-split story-split-reverse">
                        <figure className="story-photo story-daily-photo" data-story-image><img src="https://images.pexels.com/photos/7351727/pexels-photo-7351727.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="A fresh chapathi cooking on a hot tawa" loading="lazy" /><figcaption><FaFire /> Fresh from the tawa</figcaption></figure>
                        <div className="story-copy story-copy-light" data-story-reveal>
                            <span className="story-eyebrow">02 / A FRESH START, EVERY MORNING</span>
                            <h2>Prepared today.<br /><em>Enjoyed today.</em></h2>
                            <p>Every day brings a fresh batch. We knead, roll, and cook with care, so the chapathis arriving at your door are soft, warm, and ready to share.</p>
                            <div className="story-fresh-note"><span className="story-pulse-dot" /> Small batches, made fresh daily</div>
                        </div>
                    </div>
                </section>

                <section className="story-why story-section">
                    <div className="story-container">
                        <div className="story-section-heading" data-story-reveal><span className="story-eyebrow">03 / THE TRIPTHI DIFFERENCE</span><h2>Why choose Tripthi?</h2><p>Good food is more than what's on the plate. It's the care behind every bite.</p></div>
                        <div className="story-benefits">
                            <article data-story-reveal><span><FaWheatAwn /></span><h3>Quality ingredients</h3><p>We keep our pantry thoughtful and our recipes beautifully simple.</p></article>
                            <article data-story-reveal><span><FaShieldHalved /></span><h3>Hygienic preparation</h3><p>Careful hands and clean preparation, from mixing bowl to tawa.</p></article>
                            <article data-story-reveal><span><FaHeart /></span><h3>Homemade warmth</h3><p>Familiar comfort and the soft texture that makes a meal feel like home.</p></article>
                            <article data-story-reveal><span><FaCheck /></span><h3>Your happiness matters</h3><p>Your trust and satisfaction are part of every order we prepare.</p></article>
                        </div>
                    </div>
                </section>

                <section className="story-process story-section">
                    <div className="story-container">
                        <div className="story-section-heading story-section-heading-light" data-story-reveal><span className="story-eyebrow">04 / FROM FLOUR TO FRESH</span><h2>A little craft in every fold.</h2><p>Four simple steps. One comforting chapathi.</p></div>
                        <div className="story-process-list">{processSteps.map((step) => <article key={step.number} data-story-reveal><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
                    </div>
                </section>

                <section className="story-products story-section">
                    <div className="story-container">
                        <div className="story-section-heading" data-story-reveal><span className="story-eyebrow">05 / SOMETHING FOR EVERY TABLE</span><h2>Made fresh for your favourites.</h2><p>Discover familiar comforts, prepared with the same Tripthi care.</p></div>
                        <div className="story-product-grid">
                            <article className="story-product-card" data-story-reveal><img src="https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Fresh chapathis served with wholesome ingredients" loading="lazy" /><div><span>THE EVERYDAY FAVOURITE</span><h3>Chapathi</h3><p>Soft, warm, and ready to bring everyone to the table.</p><Link to="/products">Explore chapathis <FaArrowRight /></Link></div></article>
                            <article className="story-product-card" data-story-reveal><img src="https://images.pexels.com/photos/38532723/pexels-photo-38532723.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Golden homemade poori bread served fresh" loading="lazy" /><div><span>GOLDEN & PUFFED</span><h3>Poori</h3><p>A golden little treat for a meal worth slowing down for.</p><Link to="/products">Explore the menu <FaArrowRight /></Link></div></article>
                            <article className="story-product-card" data-story-reveal><img src="https://images.pexels.com/photos/6968519/pexels-photo-6968519.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Fresh batter being mixed in a bowl" loading="lazy" /><div><span>POURED FRESH</span><h3>Dosa Batter</h3><p>Freshly prepared batter, ready for your own hot tawa.</p><Link to="/products">Explore the menu <FaArrowRight /></Link></div></article>
                        </div>
                    </div>
                </section>

                <section className="story-family story-section">
                    <div className="story-container story-split">
                        <div className="story-copy" data-story-reveal>
                            <span className="story-eyebrow">06 / GOOD FOOD BRINGS US TOGETHER</span>
                            <h2>Healthy food<br /><em>for every family.</em></h2>
                            <p>From a quick lunch to a table full of loved ones, Tripthi is here for the everyday moments that matter. Warm, fresh food should feel welcoming to everyone.</p>
                            <div className="story-family-signoff">Made fresh. Shared with love.</div>
                        </div>
                        <figure className="story-photo story-family-photo" data-story-image><img src="https://images.pexels.com/photos/9346159/pexels-photo-9346159.jpeg?auto=compress&cs=tinysrgb&w=1300" alt="Family gathered together to share a meal" loading="lazy" /><figcaption><FaHeart /> A little more warmth at the table</figcaption></figure>
                    </div>
                </section>

                <section className="story-cta story-section">
                    <div className="story-cta-inner" data-story-reveal><span className="story-eyebrow">YOUR TABLE IS WAITING</span><h2>Bring home a little<br /><em>Tripthi warmth.</em></h2><p>Fresh homemade goodness is just around the corner.</p><div className="landing-actions"><Button as={Link} to="/register" className="landing-button landing-button-primary">Create Account <FaArrowRight /></Button><Button as={Link} to="/login" variant="outline-light" className="landing-button landing-button-secondary">Login</Button></div></div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export function HomeContent({ customer, onLogout }) {
    return (
        <section className="store-welcome">
            <span className="eyebrow">MADE FRESH, SHARED WITH LOVE</span>
            <h1>Welcome to Tripthi</h1>
            <p>Warm, homemade chapathis and the simple joy of a meal made with care.</p>
            <div className="store-divider" aria-hidden="true"><span /></div>
            {customer ? (
                <div className="welcome-actions">
                    <p className="store-signed-in">Welcome back, {customer.name}. Explore our products, cart, and wishlist.</p>
                    <button className="welcome-signout" type="button" onClick={onLogout}>Sign out</button>
                </div>
            ) : (
                <div className="welcome-actions">
                    <Link className="store-action" to="/register">Create your account</Link>
                    <Link className="welcome-login-link" to="/login">Already a customer? Sign in</Link>
                </div>
            )}
        </section>
    )
}

export default Home
