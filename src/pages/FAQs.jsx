import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import './FAQs.css';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "How do I place an order?",
            answer: "Since our website is for viewing purposes only, orders can be placed by contacting us directly. Simply browse our catalog, note the products you’re interested in, and reach out to us via email on our website. Our team will assist you with product availability, pricing, and the next steps for placing your order."
        },
        {
            question: "How long is the production order (PO) time before dispatch?",
            answer: <>The production lead time depends on the complexity and quantity of the order. Typically, it takes <strong>4 to 8 weeks</strong> from order confirmation to dispatch. We will provide a more accurate timeline once the order details are confirmed.</>
        },
        {
            question: "What is the Minimum Order Quantity (MOQ)?",
            answer: <>The Minimum Order Quantity (MOQ) varies depending on the product category. Generally, our MOQ is <strong>50-100 units per item/code</strong>. Please contact us for more detailed information on specific products.</>
        },
        {
            question: "How much is the Down Payment?",
            answer: <>We require a <strong>50% down payment</strong> to confirm the order, with the remaining balance due before shipment. This down payment is essential to support our commitment to fair trade principles, ensuring that our artisans receive fair wages upfront for their hard work. By doing so, we help provide them with economic stability and empower them to continue their craft with dignity and respect.</>
        },
        {
            question: "What is the export procedure?",
            answer: "After the order is completed and the final payment is received, we handle all export procedures, including packaging, documentation, and shipping arrangements. We collaborate with trusted logistics partners to ensure safe and timely delivery. Our team will keep you informed throughout the entire process, from production to shipment."
        },
        {
            question: "Can I request custom designs or modifications?",
            answer: "Yes, we offer customization options to meet your specific needs. If you have a particular design or modification in mind, please contact us with your requirements. Our team will work closely with our artisans to bring your vision to life while maintaining the authenticity and quality of handmade craftsmanship."
        },
        {
            question: "Do you provide samples before placing a bulk order?",
            answer: "Yes, samples are available upon request. We understand the importance of evaluating product quality before placing a bulk order. Sample costs and shipping fees will be covered by the buyer. Please reach out to us for more details on the sampling process."
        },
        {
            question: "What payment methods do you accept?",
            answer: <>We accept payments via <strong>bank transfer.</strong> Detailed payment instructions will be provided during the order confirmation process.</>
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we ship worldwide. We work with reliable logistics partners to ensure safe and timely delivery. Shipping costs and delivery times vary based on the destination and order volume. Our team will provide detailed shipping information once the order is confirmed."
        },
        {
            question: "Are the products handmade and ethically sourced?",
            answer: "Absolutely. All of our products are handcrafted by local artisans in Bali, using ethically-sourced and sustainable materials. We are committed to fair trade principles, ensuring that our artisans receive fair wages and work in safe, supportive environments."
        },
        {
            question: "What is your return and exchange policy?",
            answer: "All of our products undergo a thorough quality check and are marked with a quality approval before they are shipped. This ensures that each item meets our high standards of craftsmanship and durability. Since our products are handmade and made to order, returns are generally not accepted."
        },
        {
            question: "Can I visit your workshop or meet the artisans?",
            answer: "We value transparency and are proud of the craftsmanship behind our products. Visits to our workshop can be arranged by appointment, allowing you to see the artisans at work and learn more about their craft. If you’re interested, please contact us to schedule a visit to Bali. We will welcoming you with open hand."
        },
        {
            question: "How do you support sustainability and fair trade?",
            answer: "We are committed to sustainable and ethical practices. Our products are made using environmentally friendly materials, and we prioritize “no plastic” packaging. We also adhere to fair trade principles by ensuring our artisans receive fair wages and work under ethical conditions. By choosing our products, you are supporting sustainable practices and helping to improve the livelihoods of local artisans."
        },
        {
            question: "What does “fair trade” mean for your business?",
            answer: "Fair trade means that we ensure our artisans receive fair wages, safe working conditions, and equitable treatment. We prioritize ethical practices that promote sustainability and empower communities."
        },
        {
            question: "How does my purchase impact the artisans?",
            answer: "Every purchase contributes to the economic stability of artisan communities, supporting education, healthcare, and overall well-being. You’re not just buying a product; you’re empowering lives. We are committed to transparency. Our product descriptions include details about the artisans, materials used, and the impact of your purchase."
        }
    ];

    return (
        <div className="faqs-page">
            <div className="container">
                <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'FAQs', path: '/faqs' }]} />

                <section className="faqs-header">
                    <h1 className="page-title">Frequently Asked Questions</h1>
                    <p className="page-subtitle">Find answers to common questions about our products, shipping, and more.</p>
                </section>

                <div className="faqs-container">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="faq-question">
                                <h3>{item.question}</h3>
                                {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
