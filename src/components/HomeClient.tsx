"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, TrendingUp, CheckCircle, MapPin, Phone, MessageCircle } from 'lucide-react';
import styles from './home.module.css';

export default function HomeClient({ settings }: { settings: Record<string, string> }) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleEnrollClick = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus('Success! We will contact you soon.');
        setFormData({ name: '', phone: '', email: '' });
      } else {
        setSubmitStatus('Error submitting form. Try again.');
      }
    } catch (err) {
      setSubmitStatus('Network error.');
    }
  };

  const coursePrice = settings?.course_price || '18000';
  const discountedPrice = settings?.course_discounted_price || '10500';
  const whatsappNum = settings?.whatsapp_number || '9171989911';

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.chartBg}>
          <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
            <motion.path 
              d="M0 50 Q25 20 50 50 T100 50 L100 100 L0 100 Z" 
              fill="url(#fadeGradient)" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="fadeGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,255,136,0.3)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, staggerChildren: 0.2 } }
          }}
        >
          <motion.h1 className={styles.title} variants={fadeInUp}>
            Master the Market with <br/><span className="text-gradient">Precision Trading Strategies</span>
          </motion.h1>
          <motion.p className={styles.subtitle} variants={fadeInUp}>
            Market Profile • Order Flow • Time-Based Trading
          </motion.p>
          <motion.div className={styles.ctaGroup} variants={fadeInUp}>
            <button className="glow-btn-primary" onClick={handleEnrollClick}>Join Now</button>
            <button className="glow-btn" onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}>View Course Details</button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className={`section container`} id="about">
        <motion.div 
          className={styles.about}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className={styles.aboutText}>
            <h2>12+ Years of Trading Experience</h2>
            <p>At Profit Ethics, we don't just teach theory; we teach market realities. With over a decade of real-world trading experience, our advanced methodologies cut through the noise.</p>
            <p>We specialize in institutional grade tracking to help retail traders navigate both Indian Markets (MCX) and Forex with confidence.</p>
            <div className={styles.trustBadge}>✅ Strategies Built for Indian Market</div>
          </div>
        </motion.div>
      </section>

      {/* Course Modules */}
      <section className={`section container`} id="modules">
        <motion.h2 
          className={styles.sectionTitle}
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        >
          Core <span className="text-gradient">Modules</span>
        </motion.h2>
        
        <div className={styles.grid3}>
          <motion.div className="glass-panel moduleCard" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className={styles.iconWrapper}><BarChart3 /></div>
            <h3>Market Profile</h3>
            <p>Understand the auction process of the market and track big money movements.</p>
          </motion.div>
          
          <motion.div className="glass-panel moduleCard" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.2 }}>
            <div className={styles.iconWrapper}><TrendingUp /></div>
            <h3>Order Flow Concept</h3>
            <p>Read the footprint charts to see aggressive buying and selling pressure in real time.</p>
          </motion.div>

          <motion.div className="glass-panel moduleCard" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ delay: 0.4 }}>
            <div className={styles.iconWrapper}><Clock /></div>
            <h3>Time-Based Trading</h3>
            <p>Master the exact timings that institutions utilize for major price manipulations.</p>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className={`section container`} id="features-detail">
        {/* Market Profile */}
        <motion.div 
          className={styles.featureShowcase}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
        >
          <div className={styles.featureText}>
            <h2>Market <span className="text-gradient">Profile</span></h2>
            <p>
              Market is giving Overall direction and identity the Intraday trends...
            </p>
            <p>
              We are Easily pick the Trades Using Its shapes and Activity, and predict in Sideways that market is bullish or bearish sentiment..
            </p>
          </div>
          <div className={styles.featureImages}>
            <div className={styles.imageGrid}>
              {/* @ts-ignore */}
              <img src="/market-profile-1.jpg" alt="Market Profile Chart 1" className={styles.showcaseImage} onError={(e) => { e.currentTarget.style.display = 'none' }} />
              {/* @ts-ignore */}
              <img src="/market-profile-2.jpg" alt="Market Profile Chart 2" className={styles.showcaseImage} onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
          </div>
        </motion.div>

        {/* Orderflow */}
        <motion.div 
          className={`${styles.featureShowcase} ${styles.reverseLayout}`}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.featureText}>
            <h2>Orderflow</h2>
            <p>
              Identify the Realtime Buyers and Sellers,
            </p>
            <p>
              Just by looking at the 1-minute chart, we can clearly understand whether there are buyers or sellers, and who is dominating on that day.
            </p>
          </div>
          <div className={styles.featureImages}>
            <div className={styles.imageGrid}>
              {/* @ts-ignore */}
              <img src="/orderflow-1.jpg" alt="Orderflow Chart 1" className={styles.showcaseImage} onError={(e) => { e.currentTarget.style.display = 'none' }} />
              {/* @ts-ignore */}
              <img src="/orderflow-2.jpg" alt="Orderflow Chart 2" className={styles.showcaseImage} onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Details & Pricing */}
      <section className={`section ${styles.pricingSection}`} id="pricing">
        <div className={`container ${styles.detailsWrapper}`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>Course <span className="text-gradient">Details</span></h2>
            <ul className={styles.detailsList}>
              <li><Clock className={styles.detailsIcon} /> Duration: {settings?.course_duration || '30 Days'}</li>
              <li><CheckCircle className={styles.detailsIcon} /> Classes: {settings?.course_classes || '15 Days'}</li>
              <li><TrendingUp className={styles.detailsIcon} /> Schedule: {settings?.course_schedule || 'Once every 2 days'}</li>
              <li><Clock className={styles.detailsIcon} /> Time: {settings?.course_time || '8:00 PM'}</li>
              <li><BarChart3 className={styles.detailsIcon} /> Mode: Online Classes</li>
            </ul>
          </motion.div>

          <motion.div className={styles.pricingBox} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className={styles.offerBadge}>LIMITED OFFER</div>
            <h3>Premium Mentorship</h3>
            <div style={{margin: '30px 0'}}>
              <div className={styles.strikePrice}>₹{coursePrice}</div>
              <div className={styles.finalPrice}>₹{discountedPrice}</div>
            </div>
            <button className="glow-btn-primary" style={{width: '100%', fontSize: '20px'}} onClick={handleEnrollClick}>Enroll Now</button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`section container`}>
        <motion.h2 className={styles.sectionTitle} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          Why Choose <span className="text-gradient">Profit Ethics?</span>
        </motion.h2>
        <div className={styles.featureList}>
          {["12+ Years Experience", "Practical Market Strategies", "Works in Real Market Conditions", "Focus on Indian Trading Environment"].map((feat, i) => (
            <motion.div key={i} className={styles.featureItem} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{delay: i * 0.1}}>
              <CheckCircle /> <span>{feat}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className={`section container`} id="contact-form">
        <div className={"glass-panel"}>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3>Let's Talk Trading</h3>
              <div className={styles.contactMethod}>
                <Phone />
                <div>
                  <div>+91 9171989911</div>
                  <div>+91 8870775988</div>
                </div>
              </div>
              <div className={styles.contactMethod}>
                <MapPin />
                <div>Thanjavur, Tamil Nadu</div>
              </div>
              <a href={`https://wa.me/91${whatsappNum}`} target="_blank" rel="noreferrer" style={{textDecoration: 'none'}}>
                <button className="glow-btn" style={{marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <MessageCircle /> Chat on WhatsApp
                </button>
              </a>
            </div>

            <div className={styles.formPanel}>
              <h3>Reserve Your Seat</h3>
              <form onSubmit={handleFormSubmit}>
                <div className={styles.inputGroup}>
                  <input type="text" className={styles.input} placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required/>
                </div>
                <div className={styles.inputGroup}>
                  <input type="tel" className={styles.input} placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required/>
                </div>
                <div className={styles.inputGroup}>
                  <input type="email" className={styles.input} placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
                </div>
                <button type="submit" className={`glow-btn-primary ${styles.submitBtn}`}>Request Callback</button>
                {submitStatus && <p style={{color: '#00ff88', marginTop: '15px'}}>{submitStatus}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.disclaimer}>
          <strong>RISK DISCLAIMER:</strong> Trading in financial markets involves a high degree of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Past performance is not indicative of future results. Profit Ethics provides educational material only.
        </div>
        <p>&copy; {new Date().getFullYear()} Profit Ethics. All Rights Reserved. | Thanjavur, Tamil Nadu</p>
      </footer>
    </>
  );
}
