
import React, { useState } from 'react';
import './Contact.css';
import Breadcrumbs from '../components/Breadcrumbs';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct mailto link
        const subject = encodeURIComponent(`Contact Form: ${formData.subject}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);

        // Open email client
        window.location.href = `mailto:info@sjahlendra.com?subject=${subject}&body=${body}`;

        alert('Opening your email client to send the message...');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="container">
                <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Contact', path: '/contact' }]} />

                <div className="contact-header">
                    <h1>We’d Love To Hear From You</h1>
                    <p>Have a question about our products or want to discuss a custom order? Get in touch with us.</p>
                </div>

                <div className="contact-container">
                    <div className="contact-info-section">
                        <div className="info-card">
                            <h3>Find us Here</h3>
                            <div className="info-item">
                                <MapPin className="info-icon" />
                                <p>Nuansa Kori Taman Griya, Jimbaran, Kuta Selatan Bali</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Get In Touch</h3>
                            <div className="info-item">
                                <Phone className="info-icon" />
                                <p>+62 813-1666-3377</p>
                            </div>
                            <div className="info-item">
                                <Mail className="info-icon" />
                                <p>info@sjahlendra.com</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <h3>Workshop Hours</h3>
                            <div className="info-item">
                                <Clock className="info-icon" />
                                <div>
                                    <p>Mon- Fri: 9am- 8pm</p>
                                    <p>Saturday: 10am-4pm</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2>Take the first step, we will take care for the rest</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="How can we help you?"
                                    rows="5"
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn btn-primary">
                                Send Message <Send size={18} style={{ marginLeft: '8px' }} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
