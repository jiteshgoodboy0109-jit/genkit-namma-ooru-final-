import { useState, useEffect } from 'react';

import '../assets/styles/Home.css';

import ProductCard from '../components/common/ProductCard';
import { PRODUCTS_DATA } from '../services/products';
import { useCart } from './CartDrawer';
import slide1 from '../assets/images/banner.png';
import slide2 from '../assets/images/banner2.png';
import specials from '../assets/images/specials.jpeg';
import amul from '../assets/images/amul.jpeg';
import bottomBanner from '../assets/images/banner.png';

// ==========================================
// HOME PAGE CONFIGURATION
// ==========================================
// To edit content:
// 1. Slides: Update the 'slides' array below with new images.
// 2. Categories: Edit the 'categories' array (title, image).
// 3. Brands: Update the 'brands' array (name, logo).
// ==========================================

const slides = [
    { image: slide1 },
    { image: slide2 }
];

const categories = [
    { id: 1, title: 'Namma Ooru Specials', image: specials },
    { id: 2, title: 'Deals of the Month', image: specials },
    { id: 3, title: 'Cooking Essentials', image: specials },
    { id: 4, title: 'Ready to Cook', image: specials },
    { id: 5, title: 'Fresh Veggies', image: specials },
    { id: 6, title: 'Fresh Fruits', image: specials },
    { id: 7, title: 'Dairy Delights', image: specials },
    { id: 8, title: 'Rice & Grains', image: specials },
    { id: 9, title: 'Spices & Masala', image: specials },
    { id: 10, title: 'Household Items', image: specials }
];

const brands = [
    { id: 1, name: 'Biotique', logo: amul },
    { id: 2, name: 'Amul', logo: amul },
    { id: 3, name: 'Dabur', logo: amul },
    { id: 4, name: 'Colgate', logo: amul },
    { id: 5, name: 'Cadbury', logo: amul },
    { id: 6, name: 'Bru', logo: amul },
    { id: 7, name: 'Britannia', logo: amul }
];

function Home() {
    const { addToCart } = useCart();
    const [currentSlide, setCurrentSlide] = useState(0);

    // ============================================
    // SLIDER LOGIC
    // ============================================

    // Function to go to next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Function to go to previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto-play slider
    useEffect(() => {
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, []);

    const slide = slides[currentSlide];

    const featuredProducts = PRODUCTS_DATA
        .flatMap(category => category.products)
        .slice(0, 5);

    return (
        <div className="home-page">
            <section
                className="hero-section"
                style={{ backgroundImage: `url(${slide.image})` }}
            >
                <div className="hero-overlay"></div>
                <div className="slider-arrows">
                    {/* Previous Slide Button */}
                    <button
                        className="arrow arrow-left"
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                    ></button>

                    {/* Next Slide Button */}
                    <button
                        className="arrow arrow-right"
                        onClick={nextSlide}
                        aria-label="Next Slide"
                    ></button>
                </div>
            </section>
            <section className="category-section">
                <h2 className="category-heading">Shop By Category</h2>
                <div className="category-grid">
                    {categories.map((cat) => (
                        <div key={cat.id} className="category-card">
                            <div className="category-image">
                                <img src={cat.image} alt={cat.title} />
                            </div>
                            <p className="category-title">{cat.title}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="featured-section">
                <h2 className="featured-heading">Featured Products</h2>
                <div className="featured-grid">
                    {featuredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAdd={(product) => addToCart(product, 1)}
                        />
                    ))}
                </div>
            </section>
            <section className="bottom-banner-section">
                <div className="bottom-banner"
                    style={{ backgroundImage: `url(${bottomBanner})` }}>
                    <div className="bottom-banner-overlay"></div>
                </div>
            </section>
            <section className="brands-section">
                <h2 className="brands-heading">Brands You Love</h2>
                <div className="brands-marquee">
                    <div className="brands-track">
                        {[...brands, ...brands].map((brand, index) => (
                            <div key={index} className="brand-card">
                                <div className="brand-logo">
                                    <img src={brand.logo} alt={brand.name} />
                                </div>
                                <p className="brand-name">{brand.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;