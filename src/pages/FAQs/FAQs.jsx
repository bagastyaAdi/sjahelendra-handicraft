import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { supabase } from '../../lib/supabaseClient';
import './FAQs.css';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const { data, error } = await supabase
                .from('faqs')
                .select('*')
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setFaqs(data || []);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    if (loading) {
        return <div className="container" style={{ padding: '100px 50px', textAlign: 'center' }}>Loading FAQs...</div>;
    }

    return (
        <div className="faqs-page">
            <div className="container">
                <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'FAQs', path: '/faqs' }]} />

                <section className="faqs-header">
                    <h1 className="page-title">Frequently Asked Questions</h1>
                    <p className="page-subtitle">Find answers to common questions about our products, shipping, and more.</p>
                </section>

                <div className="faqs-container">
                    {faqs.length > 0 ? (
                        faqs.map((item, index) => (
                            <div
                                key={item.id}
                                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <div className="faq-question">
                                    <h3>{item.question}</h3>
                                    {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                                <div className="faq-answer">
                                    {/* Using dangerouslySetInnerHTML if we want to support basic HTML like strong/br */}
                                    <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#666' }}>No FAQs available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQs;
