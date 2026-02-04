import React, { useEffect, useRef } from 'react';
import '../assets/styles/Services.css';

// Manual Image & Video Imports
import heroBg from '../assets/images/services_hero.png';
import expressImg from '../assets/images/express_delivery.png';
import storeVideo from '../assets/videos/intro.mp4';

const Services = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.muted = false; // Unmute on scroll
                    video.play().catch(error => {
                        console.log("Autoplay blocked or interrupted:", error);
                    });
                } else {
                    video.muted = true; // Force mute when moving away
                    video.pause();
                }
            },
            { threshold: 0.6 } // Increased threshold for "particular place" requirement
        );

        observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
        };
    }, []);

    const services = [
        {
            id: 1,
            icon: '🚚',
            title: 'Express Home Delivery',

        },
        {
            id: 2,
            icon: '🥬',
            title: 'Farm-Fresh Products',

        },
        {
            id: 3,
            icon: '📦',
            title: 'Monthly Subscriptions',

        },
        {
            id: 4,
            icon: '🏪',
            title: 'Bulk & Business Supply',

        },
        {
            id: 5,
            icon: '💳',
            title: 'Easy & Secure Payments',

        },
        {
            id: 6,
            icon: '📞',
            title: '24/7 Customer Support',

        }
    ];

    const steps = [
        {
            number: '01',
            icon: '🔍',
            title: 'Discover',
            desc: 'Browse our curated selection of fresh, organic products'
        },
        {
            number: '02',
            icon: '🛒',
            title: 'Select',
            desc: 'Add your favorites to cart with just one click'
        },
        {
            number: '03',
            icon: '💳',
            title: 'Checkout',
            desc: 'Secure payment with multiple convenient options'
        },
        {
            number: '04',
            icon: '🚀',
            title: 'Receive',
            desc: 'Get fresh products delivered right to your doorstep'
        }
    ];

    return (
        <div className="services-page">
            {/* 1. Hero Section */}
            <section
                className="services-hero"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroBg})` }}
            >
                <div className="container">
                    <div className="hero-content-inner" data-aos="fade-up">
                        <p className="hero-subtitle-caps">FRESH • FAST • RELIABLE</p>
                        <h1>Our Services</h1>
                        <p className="hero-description">
                            Experience premium organic farming delivered straight to your doorstep.
                            From farm-fresh produce to sustainable dairy, we bring nature closer to you.
                        </p>
                        <div className="hero-btns">
                            <a href="/products" className="btn-premium primary">Start Shopping</a>
                            <a href="/contact" className="btn-premium outline-white">Contact Support</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Video Section */}
            <section className="video-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Inside Our Store</h2>
                        <p>Quality You Can Trust</p>
                    </div>
                    <div className="video-container">
                        <video
                            ref={videoRef}
                            loop
                            playsInline
                            controls
                            poster={heroBg}
                        >
                            <source src={storeVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <p className="video-caption">Experience the freshness and hygiene of our physical store from your home.</p>
                </div>
            </section>

            {/* 3. Featured Service Section - Express Delivery */}
            <section className="featured-service-section">
                <div className="container">
                    <div className="split-layout">
                        <div className="split-image">
                            <img
                                src={expressImg}
                                alt="Express Delivery"
                            />
                        </div>
                        <div className="split-content">
                            <div className="delivery-header">
                                <span className="rocket-icon">🚀</span>
                                <h2>Express Delivery</h2>
                            </div>
                            <p className="delivery-description">Get it fast! Our express delivery keeps your greens fresh and your kitchen stocked.</p>
                            <ul className="feature-list">
                                <li>
                                    <span className="check-icon">✓</span>
                                    Delivered within 45 minutes guaranteed
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    Temperature controlled packaging for dairy
                                </li>
                                <li>
                                    <span className="check-icon">✓</span>
                                    No minimum order for premium members
                                </li>
                            </ul>
                            <a href="/products" className="inline-block-link">
                                <button className="order-now-btn">ORDER NOW</button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. How It Works Section */}
            <section className="how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <h2>How It Works</h2>
                        <p>Experience seamless shopping in 4 simple steps</p>
                    </div>
                    <div className="steps-container">
                        {steps.map((step, index) => (
                            <div
                                key={step.number}
                                className="step-box"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="step-icon-wrapper">
                                    <div className="step-icon">{step.icon}</div>
                                    <div className="step-number">{step.number}</div>
                                </div>
                                <div className="step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Services;
