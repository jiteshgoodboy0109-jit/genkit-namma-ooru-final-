import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Navbar.css';
import logo from '../../assets/images/Namma Oru Department Store Logo b.png';


function Navbar({ cartCount, onCartClick }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setIsScrolled(true);
            else setIsScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false); // Close menu if open
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">

                {/* 1. Logo Section (Hidden on Mobile) */}
                <div className="navbar-logo">
                    <a href="/">
                        <img src={logo} alt="Namma Ooru Department Store" className="logo-image" />
                        <div className="logo-text-container">
                            <span className="logo-text-main">Namma Ooru</span>
                            <span className="logo-text-sub">Department Store</span>
                        </div>
                    </a>
                </div>

                {/* 1.5 Mobile Search Header (Visible ONLY on Mobile) */}
                <div className="mobile-header-search">
                    <form onSubmit={handleSearch} className="search-pill mobile-header-style">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="search-input-pill"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="search-button-pill">
                            <svg xmlns="http://www.w3.org/2000/svg" className="search-icon-svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </form>
                </div>

                {/* 2. Search Bar (Desktop) */}
                <div className="navbar-search-container desktop-only">
                    <div className="search-pill">
                        <input
                            type="text"
                            placeholder="Search our products"
                            className="search-input-pill"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                        />
                        <button className="search-button-pill" onClick={handleSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="search-icon-svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 3. Desktop Navigation & Actions */}
                <div className="desktop-nav-actions">

                    {/* Navigation Links */}
                    <ul className="nav-links-desktop">
                        <li><a href="/" className="nav-link">Home</a></li>
                        <li>
                            <a href="/products" className="nav-link dropdown-trigger">
                                Products <span className="chevron-down">▼</span>
                            </a>
                        </li>
                        <li><a href="/services" className="nav-link">Services</a></li>
                        <li><a href="/contact" className="nav-link">Contact</a></li>
                    </ul>

                    {/* Cart Section: Icon Only (Premium Outline) */}
                    <div className="cart-section">

                        {/* Circular Icon with Badge */}
                        <div className="cart-icon-circle hover-effect" onClick={onCartClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {cartCount > 0 && (
                                <span className="cart-badge-circle">{cartCount}</span>
                            )}
                        </div>

                    </div>
                </div>

                {/* 4. Mobile Menu Toggle */}
                <div className="mobile-toggle-container">
                    <div className="cart-icon-circle mobile-only" onClick={onCartClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="cart-icon-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="cart-badge-circle">{cartCount}</span>
                        )}
                    </div>

                    <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                        <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>

            </div>

            {/* Mobile Menu Drawer */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* Mobile Search - Removed from here as requested to be in header, specifically "remove shop name and add search bar connected to product page" */}

                <ul className="mobile-nav-links">
                    <li><a href="/" onClick={toggleMobileMenu}>Home</a></li>
                    <li><a href="/products" onClick={toggleMobileMenu}>Products</a></li>
                    <li><a href="/services" onClick={toggleMobileMenu}>Services</a></li>
                    <li><a href="/contact" onClick={toggleMobileMenu}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;