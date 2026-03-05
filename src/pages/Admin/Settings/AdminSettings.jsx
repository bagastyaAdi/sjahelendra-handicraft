import { AlertCircle, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import './AdminSettings.css';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    business_name: '',
    whatsapp_number: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;

      const settingsMap = {};
      (data || []).forEach(s => { settingsMap[s.key] = s.value; });
      setSettings(prev => ({ ...prev, ...settingsMap }));
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({ key, value }, { onConflict: 'key' });
        if (error) throw error;
      }
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) return <div className="loading-state">Loading settings...</div>;

  return (
    <div className="admin-settings">
      <div className="page-header">
        <div>
          <h1>Site Settings</h1>
          <p>Configure global settings for your website</p>
        </div>
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? <><span className="spinner"></span>Saving...</> : <><Save size={18} /> Save Changes</>}
        </button>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          <AlertCircle size={16} />
          <span>{message.text}</span>
        </div>
      )}

      <div className="content-section">
        <h2>Business Information</h2>
        <div className="form-group">
          <label>Business Name</label>
          <input
            type="text"
            value={settings.business_name}
            onChange={(e) => handleChange('business_name', e.target.value)}
            placeholder="Sjahlendra Handicraft"
          />
        </div>
      </div>

      <div className="content-section">
        <h2>Purchase Channels</h2>
        <p className="section-description">
          These settings control the "Buy via WhatsApp" and "Buy via Email" buttons on product pages.
        </p>
        <div className="form-group">
          <label>WhatsApp Number</label>
          <input
            type="text"
            value={settings.whatsapp_number}
            onChange={(e) => handleChange('whatsapp_number', e.target.value)}
            placeholder="+6281316663377"
          />
          <small className="help-text">
            Used for "Buy via WhatsApp" button. Format: country code + number (no spaces/dashes).
          </small>
        </div>
        <div className="form-group">
          <label>Purchase Inquiry Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="info@sjahlendra.com"
          />
          <small className="help-text">
            Used for "Buy via Email" button on product pages.
          </small>
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={settings.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+62 813-1666-3377"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
