import '../../assets/styles/Footer.css';
import logo from '../../assets/images/Namma Oru Department Store Logo b.png';
import instagramIcon from '../../assets/images/instagram-icon.png';
import facebookIcon from '../../assets/images/facebook-icon.png';
import whatsappIcon from '../../assets/images/whatsapp-icon.png';
import genkitWatermark from '../../assets/images/genkit.png';

function Footer({ onCartClick, cartCount }) {

    return (
        <footer className="footer">

            <div className="footer-content">

                <div className="footer-section company-section">
                    <div className="footer-logo">
                        <img src={logo} alt="Namma Ooru" className="footer-logo-image" />
                        <h3 className="footer-brand">Namma Ooru</h3>
                    </div>
                    <p className="footer-description">
                        “Serving you with honesty, care, and quality.”
                        “Trusted by families. Chosen by you.
                        “Everything you need. One store. One click.”
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="section-title">Explore More</h4>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/services">Services</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-section social-section">
                    <h4 className="section-title">Connect With Us</h4>
                    <div className="social-links">
                        <a href="https://www.instagram.com/nammaooru" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Instagram">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                        <a href="https://www.facebook.com/nammaooru" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Facebook">
                            <img src={facebookIcon} alt="Facebook" />
                        </a>
                        <a href="https://wa.me/919363768009" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp" aria-label="WhatsApp">
                            <img src={whatsappIcon} alt="WhatsApp" />
                        </a>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="footer-section contact-section">
                    <h4 className="section-title">Contact Us</h4>
                    <ul className="contact-info">
                        <li>
                            <span className="contact-icon">📍</span>
                            <span>No. 6, Kamaralingam Road, Amutharam Bus Stop, Udumalapet-642126, Tamil Nadu</span>
                        </li>
                        <li>
                            <span className="contact-icon">📞</span>
                            <span>9363768009, 8883785516</span>
                        </li>
                    </ul>
                </div>

                {/* Genkit Branding (Moved for Mobile Layout) */}
                <div className="watermark-container">
                    {/* 1. POWERED BY TEXT (Top) */}
                    <span className="powered-by-text">Powered By</span>

                    {/* 2. LOGO IMAGE (Bottom) */}
                    <a
                        href="https://genkit.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="watermark-link"
                    >
                        <img src={genkitWatermark} alt="Genkit" className="footer-watermark" />
                        {/* Mobile text fallback (hidden by CSS if not needed) */}
                        <span className="mobile-brand-text">Genkit</span>
                    </a>
                </div>

            </div>

            {/* Footer Bottom - Copyright */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="copyright">
                        © Copy Right Powered By Genkit.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;