import React, { useState, useEffect } from 'react';
import '../assets/styles/Contact.css';
import logo from '../assets/images/Namma Oru Department Store Logo b.png';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formState, setFormState] = useState({
        fullName: '',
        mobile: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        let tempErrors = {};
        if (!formState.fullName) tempErrors.fullName = "Full name is required";
        if (!formState.mobile) tempErrors.mobile = "Mobile number is required";
        else if (!/^\d{10}$/.test(formState.mobile)) tempErrors.mobile = "Invalid mobile number";
        if (!formState.email) tempErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formState.email)) tempErrors.email = "Invalid email identity";
        if (!formState.subject) tempErrors.subject = "Please select a subject";
        if (!formState.message) tempErrors.message = "Message cannot be empty";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLoading(false);
                setSubmitted(true);
                setFormState({
                    fullName: '',
                    mobile: '',
                    email: '',
                    subject: '',
                    message: ''
                });
                setTimeout(() => setSubmitted(false), 5000);
            }, 2000);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            const nextElement = form.elements[index + 1];
            if (nextElement) {
                nextElement.focus();
            }
        }
    };

    return (
        <div className="contact-page">
            {/* 1. Header Section */}
            <header className="contact-header">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We’re Here to Help You</p>
                </div>
            </header>

            {/* 2. Main Content: Map & Form Split */}
            <section className="contact-main-section">
                <div className="container">
                    <div className="contact-main-grid">
                        {/* Map Left */}
                        <div className="map-container-left">
                            <iframe
                                title="Namma Ooru Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d78.1189!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTUnMzAuNyJOIDc4wrAwNycwOC4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin&t=k"
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Form Right */}
                        <div className="form-container-right">
                            <div className="form-card">
                                {submitted && (
                                    <div className="success-banner">
                                        ✨ Message sent successfully!
                                    </div>
                                )}
                                <form className="contact-form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Your Name"
                                                value={formState.fullName}
                                                onChange={handleChange}
                                            />
                                            <span className="error-msg">{errors.fullName}</span>
                                        </div>

                                        <div className="form-group">
                                            <label>Mobile Number</label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                placeholder="Phone Number"
                                                value={formState.mobile}
                                                onChange={handleChange}
                                            />
                                            <span className="error-msg">{errors.mobile}</span>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="email@example.com"
                                            value={formState.email}
                                            onChange={handleChange}
                                        />
                                        <span className="error-msg">{errors.email}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Subject</label>
                                        <select
                                            name="subject"
                                            value={formState.subject}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a topic</option>
                                            <option value="Order Issue">Order Issue</option>
                                            <option value="Delivery Query">Delivery Query</option>
                                            <option value="Product Feedback">Product Feedback</option>
                                            <option value="Business Inquiry">Business Inquiry</option>
                                        </select>
                                        <span className="error-msg">{errors.subject}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>Message</label>
                                        <textarea
                                            name="message"
                                            rows="4"
                                            placeholder="How can we help?"
                                            value={formState.message}
                                            onChange={handleChange}
                                        ></textarea>
                                        <span className="error-msg">{errors.message}</span>
                                    </div>

                                    <button type="submit" className="btn-submit" disabled={loading}>
                                        {loading ? <div className="spinner"></div> : "👉 Send Message"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Google Review Section */}
            <section className="google-review-section">
                <div className="container">
                    <div className="review-card">
                        <div className="review-logo">
                            <img src={logo} alt="Namma Ooru" className="store-logo" />
                        </div>
                        <h2 className="review-heading">Love Shopping with Us?</h2>
                        <a
                            href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="review-button"
                        >
                            <span>Write a Review</span>
                            <span className="star-icon">⭐</span>
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Contact;
