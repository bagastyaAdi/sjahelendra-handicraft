import { AlertCircle, Plus, Save, Trash2, Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import AdminErrorBoundary from '../../../components/common/ErrorBoundary/ErrorBoundary';
import { supabase } from '../../../lib/supabaseClient';
import './AdminAbout.css';

const AdminAbout = () => {
  const [storyContent, setStoryContent] = useState({ paragraphs: [], image: '' });
  const [sustainabilityContent, setSustainabilityContent] = useState({ paragraphs: [] });
  const [teamContent, setTeamContent] = useState({ members: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .in('section_key', ['about_story', 'about_sustainability', 'about_team']);

      if (error) throw error;

      (data || []).forEach(item => {
        if (item.section_key === 'about_story') {
          // Backward compatibility: Convert paragraph array to string if needed
          const content = item.content || { paragraphs: [], image: '' };
          if (content.paragraphs && Array.isArray(content.paragraphs)) {
            content.html_content = content.paragraphs.map(p => `<p>${p}</p>`).join('');
            delete content.paragraphs;
          }
          setStoryContent(content);
        }
        if (item.section_key === 'about_sustainability') {
          const content = item.content || { paragraphs: [] };
          if (content.paragraphs && Array.isArray(content.paragraphs)) {
            content.html_content = content.paragraphs.map(p => `<p>${p}</p>`).join('');
            delete content.paragraphs;
          }
          setSustainabilityContent(content);
        }
        if (item.section_key === 'about_team') {
          setTeamContent(item.content || { members: [] });
        }
      });
    } catch (err) {
      console.error('Error fetching about content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const updates = [
        { section_key: 'about_story', title: 'Our Story', content: storyContent },
        { section_key: 'about_sustainability', title: 'Sustainability & Impact', content: sustainabilityContent },
        { section_key: 'about_team', title: 'OUR TEAM', content: teamContent },
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from('site_content')
          .upsert(update, { onConflict: 'section_key' });
        if (error) throw error;
      }

      setMessage({ type: 'success', text: 'About page updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `about/${fileName}`;

    const { error } = await supabase.storage
      .from('product')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('product')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setLoading(true);

      // Delete old image if it exists to optimize storage
      if (storyContent.image && storyContent.image.includes('/storage/v1/object/public/product/')) {
        const oldPath = storyContent.image.split('/storage/v1/object/public/product/')[1];
        if (oldPath) await supabase.storage.from('product').remove([oldPath]);
      }

      const url = await uploadImage(file);
      setStoryContent({ ...storyContent, image: url });
      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to upload image.' });
    } finally {
      setLoading(false);
    }
  };

  const handleTeamImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setLoading(true);

      // Delete old image if it exists to optimize storage
      const oldImage = teamContent.members[index]?.image;
      if (oldImage && oldImage.includes('/storage/v1/object/public/product/')) {
        const oldPath = oldImage.split('/storage/v1/object/public/product/')[1];
        if (oldPath) await supabase.storage.from('product').remove([oldPath]);
      }

      const url = await uploadImage(file);
      updateTeamMember(index, 'image', url);
      setMessage({ type: 'success', text: 'Team image uploaded successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to upload team image.' });
    } finally {
      setLoading(false);
    }
  };

  // Modules for ReactQuill
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamContent.members];
    updated[index] = { ...updated[index], [field]: value };
    setTeamContent({ ...teamContent, members: updated });
  };

  const addTeamMember = () => {
    setTeamContent({
      ...teamContent,
      members: [...teamContent.members, { name: '', role: '', image: '' }],
    });
  };

  const removeTeamMember = (index) => {
    const updated = teamContent.members.filter((_, i) => i !== index);
    setTeamContent({ ...teamContent, members: updated });
  };

  if (loading) return <div className="loading-state">Loading about content...</div>;

  return (
    <div className="admin-about">
      <div className="page-header">
        <div>
          <h1>About Page</h1>
          <p>Edit the content displayed on your About page</p>
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

      {/* Our Story Section */}
      <div className="content-section">
        <h2>Our Story</h2>
        <div className="form-group flex-col">
          <label>Story Image</label>
          <div className="upload-input-group" style={{ display: 'inline-block' }}>
            <label className="upload-btn">
              <Upload size={16} /> Upload Image
              <input type="file" accept="image/*" onChange={handleHeroImageUpload} hidden />
            </label>
          </div>
          {storyContent.image && (
             <img src={storyContent.image} alt="Hero Preview" className="hero-preview" />
          )}
        </div>
        
        <div className="quill-editor-container">
          <label>Story Content</label>
          <ReactQuill 
            theme="snow" 
            value={storyContent.html_content || ''} 
            onChange={(value) => setStoryContent({ ...storyContent, html_content: value })}
            modules={quillModules}
          />
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="content-section">
        <h2>Sustainability & Impact</h2>
        <div className="quill-editor-container">
          <ReactQuill 
            theme="snow" 
            value={sustainabilityContent.html_content || ''} 
            onChange={(value) => setSustainabilityContent({ ...sustainabilityContent, html_content: value })}
            modules={quillModules}
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="content-section">
        <h2>Team Members</h2>
        {teamContent.members?.map((member, i) => (
          <div key={i} className="team-member-form">
            <div className="member-fields">
              <input
                type="text"
                value={member.name}
                onChange={(e) => updateTeamMember(i, 'name', e.target.value)}
                placeholder="Name"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => updateTeamMember(i, 'role', e.target.value)}
                placeholder="Role"
              />
              <div className="upload-input-group team-upload-group" style={{ display: 'inline-block' }}>
                  <label className="upload-btn">
                     <Upload size={14} /> Upload Image
                     <input type="file" accept="image/*" onChange={(e) => handleTeamImageUpload(e, i)} hidden />
                  </label>
              </div>
            </div>
            <button type="button" className="remove-btn" onClick={() => removeTeamMember(i)}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <button type="button" className="add-item-btn" onClick={() => addTeamMember()}>
          <Plus size={16} /> Add Team Member
        </button>
      </div>
    </div>
  );
};

const AdminAboutWithBoundary = () => (
  <AdminErrorBoundary>
    <AdminAbout />
  </AdminErrorBoundary>
);

export default AdminAboutWithBoundary;
