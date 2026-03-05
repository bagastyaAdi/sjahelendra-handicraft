import { AlertCircle, Eye, EyeOff, Plus, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import './AdminFAQs.css';

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = () => {
    setFaqs([...faqs, {
      id: `new-${Date.now()}`,
      question: '',
      answer: '',
      sort_order: faqs.length,
      is_active: true,
      isNew: true,
    }]);
  };

  const handleUpdateFAQ = (index, field, value) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleDeleteFAQ = async (index) => {
    const faq = faqs[index];

    if (!faq.isNew) {
      try {
        const { error } = await supabase.from('faqs').delete().eq('id', faq.id);
        if (error) throw error;
      } catch (err) {
        setMessage({ type: 'error', text: 'Failed to delete FAQ.' });
        return;
      }
    }

    setFaqs(faqs.filter((_, i) => i !== index));
    setMessage({ type: 'success', text: 'FAQ removed.' });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      for (let i = 0; i < faqs.length; i++) {
        const faq = faqs[i];
        const faqData = {
          question: faq.question,
          answer: faq.answer,
          sort_order: i,
          is_active: faq.is_active,
        };

        if (faq.isNew) {
          const { error } = await supabase.from('faqs').insert([faqData]);
          if (error) throw error;
        } else {
          const { error } = await supabase.from('faqs').update(faqData).eq('id', faq.id);
          if (error) throw error;
        }
      }

      setMessage({ type: 'success', text: 'All FAQs saved successfully!' });
      fetchFAQs(); // Refresh to get IDs for new items
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save FAQs.' });
    } finally {
      setSaving(false);
    }
  };

  const moveFAQ = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= faqs.length) return;
    const updated = [...faqs];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFaqs(updated);
  };

  if (loading) return <div className="loading-state">Loading FAQs...</div>;

  return (
    <div className="admin-faqs">
      <div className="page-header">
        <div>
          <h1>FAQs</h1>
          <p>{faqs.length} frequently asked questions</p>
        </div>
        <div className="header-actions">
          <button className="add-btn" onClick={handleAddFAQ}>
            <Plus size={18} /> Add FAQ
          </button>
          <button className="save-btn" onClick={handleSaveAll} disabled={saving}>
            {saving ? <><span className="spinner"></span>Saving...</> : <><Save size={18} /> Save All</>}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          <AlertCircle size={16} />
          <span>{message.text}</span>
        </div>
      )}

      <div className="faqs-list">
        {faqs.length === 0 ? (
          <div className="empty-state">
            <h3>No FAQs yet</h3>
            <p>Add your first FAQ to help customers.</p>
          </div>
        ) : (
          faqs.map((faq, index) => (
            <div key={faq.id} className={`faq-card ${!faq.is_active ? 'inactive' : ''}`}>
              <div className="faq-card-header">
                <div className="drag-controls">
                  <button onClick={() => moveFAQ(index, -1)} disabled={index === 0} className="move-btn">▲</button>
                  <span className="sort-number">#{index + 1}</span>
                  <button onClick={() => moveFAQ(index, 1)} disabled={index === faqs.length - 1} className="move-btn">▼</button>
                </div>
                <div className="faq-actions">
                  <button
                    className="toggle-active-btn"
                    onClick={() => handleUpdateFAQ(index, 'is_active', !faq.is_active)}
                    title={faq.is_active ? 'Hide from website' : 'Show on website'}
                  >
                    {faq.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button className="remove-btn" onClick={() => handleDeleteFAQ(index)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="faq-fields">
                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleUpdateFAQ(index, 'question', e.target.value)}
                    placeholder="Enter the question"
                  />
                </div>
                <div className="form-group">
                  <label>Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleUpdateFAQ(index, 'answer', e.target.value)}
                    placeholder="Enter the answer"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminFAQs;
