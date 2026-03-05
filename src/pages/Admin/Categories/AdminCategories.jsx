import { AlertCircle, ArrowDown, ArrowUp, Edit2, Trash2, Upload, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import './AdminCategories.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', sort_order: 0 });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [deleteId, setDeleteId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage({ type: 'error', text: 'Failed to load categories.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'sort_order' ? parseInt(value) || 0 : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `categories/${fileName}`;

    const { error } = await supabase.storage
      .from('product')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('product')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const deleteOldImage = async (imageUrl) => {
    if (imageUrl && imageUrl.includes('/storage/v1/object/public/product/')) {
      try {
        const path = imageUrl.split('/storage/v1/object/public/product/')[1];
        if (path) {
          await supabase.storage.from('product').remove([path]);
        }
      } catch (err) {
        console.warn('Could not delete old image:', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', sort_order: 0 });
    setImageFile(null);
    setImagePreview('');
    setIsEditing(false);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      sort_order: category.sort_order || 0
    });
    setImagePreview(category.image_url || '');
    setImageFile(null);
    setEditId(category.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      let imageUrl = imagePreview;

      // Upload new image if selected
      if (imageFile) {
        // Delete old image if editing
        if (isEditing) {
          const oldCategory = categories.find(c => c.id === editId);
          if (oldCategory?.image_url) {
            await deleteOldImage(oldCategory.image_url);
          }
        }
        imageUrl = await uploadImage(imageFile);
      }

      const saveData = {
        name: formData.name,
        image_url: imageUrl || null,
        sort_order: formData.sort_order,
      };

      if (isEditing) {
        const oldCategory = categories.find(c => c.id === editId);
        const oldName = oldCategory?.name;
        const newName = saveData.name;

        const { error } = await supabase
          .from('categories')
          .update(saveData)
          .eq('id', editId);
        if (error) throw error;

        // If name changed, update all products referencing the old name
        if (oldName && newName && oldName !== newName) {
          // Update products where main_category matches old name
          await supabase
            .from('products')
            .update({ main_category: newName })
            .eq('main_category', oldName);

          // Update products where sub_category matches old name
          await supabase
            .from('products')
            .update({ sub_category: newName })
            .eq('sub_category', oldName);
        }

        setMessage({ type: 'success', text: 'Category updated successfully! Products have been updated.' });
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([saveData]);
        if (error) throw error;
        setMessage({ type: 'success', text: 'Category created successfully!' });
      }
      fetchCategories();
      resetForm();
    } catch (err) {
      if (err.code === '23505') {
        setMessage({ type: 'error', text: 'A category with this name already exists.' });
      } else {
        setMessage({ type: 'error', text: err.message || 'Failed to save category.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const category = categories.find(c => c.id === id);
      if (category?.image_url) {
        await deleteOldImage(category.image_url);
      }
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      setCategories(categories.filter(c => c.id !== id));
      setMessage({ type: 'success', text: 'Category deleted successfully.' });
      setDeleteId(null);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete category. It might be in use.' });
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newCategories = [...categories];
    const currentOrder = newCategories[index].sort_order;
    const prevOrder = newCategories[index - 1].sort_order;

    // Swap sort_order values
    try {
      await supabase.from('categories').update({ sort_order: prevOrder }).eq('id', newCategories[index].id);
      await supabase.from('categories').update({ sort_order: currentOrder }).eq('id', newCategories[index - 1].id);
      fetchCategories();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to reorder.' });
    }
  };

  const handleMoveDown = async (index) => {
    if (index === categories.length - 1) return;
    const newCategories = [...categories];
    const currentOrder = newCategories[index].sort_order;
    const nextOrder = newCategories[index + 1].sort_order;

    try {
      await supabase.from('categories').update({ sort_order: nextOrder }).eq('id', newCategories[index].id);
      await supabase.from('categories').update({ sort_order: currentOrder }).eq('id', newCategories[index + 1].id);
      fetchCategories();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to reorder.' });
    }
  };

  return (
    <div className="admin-categories">
      <div className="page-header">
        <div>
          <h1>Product Categories</h1>
          <p>Manage categories and their display covers for the Shop by Category section</p>
        </div>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          <AlertCircle size={16} />
          <span>{message.text}</span>
          <button onClick={() => setMessage({ type: '', text: '' })}>×</button>
        </div>
      )}

      <div className="categories-grid-layout">
        {/* Form Section */}
        <div className="category-form-card">
          <h3>{isEditing ? 'Edit Category' : 'Add New Category'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Category Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g. Furniture"
              />
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label>Cover Image</label>
              <div
                className={`cat-image-upload ${imagePreview ? 'has-image' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => !imagePreview && fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className="cat-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" className="remove-image-btn" onClick={(e) => { e.stopPropagation(); removeImage(); }}>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="cat-upload-placeholder">
                    <Upload size={28} />
                    <p>Click or drag image here</p>
                    <span>Max 5MB • JPG, PNG, WebP</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
              </div>
              {imagePreview && (
                <button
                  type="button"
                  className="change-cat-image-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Image
                </button>
              )}
            </div>

            <div className="form-actions-inline">
              {isEditing && (
                <button type="button" className="btn-cancel" onClick={resetForm}>
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="categories-list-card">
          <h3>Current Categories ({categories.length})</h3>
          {loading && categories.length === 0 ? (
            <div className="loading-state">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="empty-state-mini">No categories found. Add one to get started.</div>
          ) : (
            <div className="categories-list">
              {categories.map((category, index) => (
                <div key={category.id} className="category-list-item">
                  <div className="cat-order-controls">
                    <button
                      className="order-btn"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      aria-label="Move Up"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <span className="order-number">{index + 1}</span>
                    <button
                      className="order-btn"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === categories.length - 1}
                      aria-label="Move Down"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                  <div className="cat-thumbnail">
                    <img src={category.image_url || 'https://placehold.co/100x100/f0f0f0/999?text=None'} alt={category.name} />
                  </div>
                  <div className="cat-details">
                    <h4>{category.name}</h4>
                  </div>
                  <div className="cat-actions">
                    <button className="icon-btn edit" onClick={() => handleEdit(category)} aria-label="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn delete" onClick={() => setDeleteId(category.id)} aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Category</h3>
            <p>Are you sure? This will remove the category and its cover image.</p>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-delete" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
