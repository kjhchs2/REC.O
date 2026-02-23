import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminForm.css';

function AdminForm({ 
  title, 
  fields, 
  initialData = {}, 
  onSubmit, 
  backPath,
  isEdit = false 
}) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (name, value) => {
    const items = value.split('\n').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      [name]: items
    }));
  };

  const handleJsonChange = (name, value) => {
    try {
      const parsed = JSON.parse(value);
      setFormData(prev => ({
        ...prev,
        [name]: parsed
      }));
    } catch (e) {
      setFormData(prev => ({
        ...prev,
        [`${name}_raw`]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await onSubmit(formData);
      navigate(backPath);
    } catch (err) {
      setError(err.message || '저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const value = formData[field.name] ?? field.defaultValue ?? '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
          >
            <option value="">선택하세요</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'array':
        return (
          <textarea
            name={field.name}
            value={Array.isArray(value) ? value.join('\n') : value}
            onChange={(e) => handleArrayChange(field.name, e.target.value)}
            placeholder={field.placeholder || '한 줄에 하나씩 입력'}
            rows={field.rows || 4}
          />
        );

      case 'json':
        return (
          <textarea
            name={field.name}
            value={formData[`${field.name}_raw`] || JSON.stringify(value, null, 2)}
            onChange={(e) => handleJsonChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 6}
            className="json-input"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            name={field.name}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step}
            required={field.required}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            name={field.name}
            value={value}
            onChange={handleChange}
            required={field.required}
          />
        );

      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              name={field.name}
              checked={!!value}
              onChange={handleChange}
            />
            <span>{field.checkboxLabel || field.label}</span>
          </label>
        );

      default:
        return (
          <input
            type={field.type || 'text'}
            name={field.name}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  return (
    <div className="admin-form-container">
      <div className="admin-form-header">
        <Link to={backPath} className="back-link">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          돌아가기
        </Link>
        <h1>{isEdit ? `${title} 수정` : `${title} 추가`}</h1>
      </div>

      {error && (
        <div className="admin-form-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        {fields.map((field) => (
          <div 
            key={field.name} 
            className={`form-field ${field.fullWidth ? 'full-width' : ''}`}
          >
            <label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="required">*</span>}
            </label>
            {field.description && (
              <p className="field-description">{field.description}</p>
            )}
            {renderField(field)}
          </div>
        ))}

        <div className="form-actions">
          <Link to={backPath} className="admin-btn admin-btn-secondary">
            취소
          </Link>
          <button 
            type="submit" 
            className="admin-btn admin-btn-primary"
            disabled={loading}
          >
            {loading ? '저장 중...' : (isEdit ? '수정' : '추가')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
