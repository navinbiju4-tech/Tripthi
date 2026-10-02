import { Button, Col, Container, Row } from 'react-bootstrap'
import { FaArrowRight, FaHeart, FaLeaf, FaShieldHalved, FaStar, FaWheatAwn } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const reasons = [
  { icon: FaWheatAwn, title: 'Freshly Prepared Every Day', copy: 'Made in small batches so every order reaches you soft and fresh.' },
  { icon: FaHeart, title: 'Homemade Taste', copy: 'The warmth and comfort of chapathis made with a little extra care.' },
  { icon: FaLeaf, title: 'Quality Ingredients', copy: 'Thoughtfully selected ingredients, kept simple and wholesome.' },
  { icon: FaShieldHalved, title: 'Hygienic Preparation', copy: 'Clean hands, careful preparation, and consistent kitchen standards.' },
  { icon: FaStar, title: 'Customer Satisfaction', copy: 'Your table and your trust are at the heart of everything we make.' },
]

const values = [
  { title: 'Quality', copy: 'Good ingredients, carefully made.' },
  { title: 'Trust', copy: 'Honest care in every order.' },
  { title: 'Freshness', copy: 'Prepared daily, enjoyed warm.' },
  { title: 'Care', copy: 'A little more thought in every detail.' },
]

function Aboutus() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-image" role="img" aria-label="Fresh chapathi being prepared on a hot tawa" />
        <div className="about-hero-shade" />
        <div className="about-hero-content">
          <span className="about-kicker">A LITTLE ABOUT US</span>
          <h1>About Tripthi</h1>
          <p>Fresh Homemade Chapathis Made With Love</p>
          <span className="about-hero-note"><FaWheatAwn /> Made fresh, shared with love</span>
        </div>
      </section>

      <section className="about-story-section" data-aos="fade-up">
        <Container>
          <Row className="align-items-center g-4 g-lg-5">
            <Col lg={6}>
              <div className="about-story-image-wrap">
                <img src="https://images.pexels.com/photos/39519755/pexels-photo-39519755.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Fresh flatbread dough and ingredients ready for preparation" loading="lazy" />
                <span className="about-image-caption">Simple ingredients. Made with care.</span>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-story-copy">
                <span className="about-kicker about-kicker-dark">OUR STORY</span>
                <h2>Comfort food, made thoughtfully.</h2>
                <p>Tripthi began with a simple idea: everyone deserves a soft, fresh chapathi that feels like home. We prepare ours daily, with care at every step, so the goodness of a homemade meal is never far away.</p>
                <p>From the ingredients we choose to the way each order is prepared, quality, taste, and your satisfaction guide the work we do. It is our small way of bringing a little more warmth to your table.</p>
                <div className="about-story-signoff"><span>Tripthi Kitchen</span><small>Freshness you can feel in every bite.</small></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-mission-section" data-aos="fade-up">
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={5}>
              <span className="about-kicker about-kicker-dark">WHAT GUIDES US</span>
              <h2>Our mission</h2>
              <p>To make everyday meals a little more comforting with fresh homemade chapathis and service you can count on.</p>
            </Col>
            <Col lg={7}>
              <div className="mission-points">
                <div><span>01</span><p>Deliver fresh homemade chapathis daily.</p></div>
                <div><span>02</span><p>Maintain high quality and hygiene standards.</p></div>
                <div><span>03</span><p>Provide excellent customer service, every time.</p></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="about-reasons-section" data-aos="fade-up">
        <Container>
          <div className="about-section-heading">
            <span className="about-kicker about-kicker-dark">THE TRIPTHI DIFFERENCE</span>
            <h2>Good food starts with good care.</h2>
          </div>
          <Row className="g-3 g-lg-4">
            {reasons.map(({ icon: Icon, title, copy }, index) => (
              <Col key={title} xs={12} sm={6} lg={index === 4 ? 12 : 3}>
                <article className={`about-reason${index === 4 ? ' about-reason-wide' : ''}`}>
                  <span className="about-reason-icon"><Icon /></span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="about-values-section" data-aos="fade-up">
        <Container>
          <div className="about-values-heading"><span className="about-kicker">ROOTED IN WHAT MATTERS</span><h2>Our values</h2></div>
          <div className="about-values-list">
            {values.map((value, index) => <div className="about-value" key={value.title}><span>0{index + 1}</span><h3>{value.title}</h3><p>{value.copy}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="about-gallery-section" aria-label="A little of the Tripthi experience" data-aos="fade-up">
        <Container>
          <div className="about-section-heading about-gallery-heading"><span className="about-kicker about-kicker-dark">FROM PREP TO YOUR TABLE</span><h2>Made fresh, enjoyed together.</h2></div>
          <div className="about-gallery-grid">
            <figure><img src="https://images.pexels.com/photos/7351727/pexels-photo-7351727.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Chapathi cooking on a hot tawa" loading="lazy" /><figcaption>Fresh from the tawa</figcaption></figure>
            <figure><img src="https://images.pexels.com/photos/9797029/pexels-photo-9797029.jpeg?auto=compress&cs=tinysrgb&w=900" alt="A basket of freshly made roti with ingredients" loading="lazy" /><figcaption>Simple, wholesome ingredients</figcaption></figure>
            <figure><img src="https://images.pexels.com/photos/9346159/pexels-photo-9346159.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Family sharing a meal together" loading="lazy" /><figcaption>Better when shared</figcaption></figure>
          </div>
        </Container>
      </section>

      <section className="about-cta-section" data-aos="fade-up">
        <Container className="about-cta-inner">
          <div><span className="about-kicker">A WARM MEAL IS A FEW CLICKS AWAY</span><h2>Ready to Enjoy Fresh Chapathis?</h2></div>
          <Button as={Link} to="/products" className="about-cta-button">View Products <FaArrowRight /></Button>
        </Container>
      </section>
    </main>
  )
}

export default Aboutus