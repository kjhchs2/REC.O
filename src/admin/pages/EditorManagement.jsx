import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../../lib/dataService';
import './EditorManagement.css';

function EditorManagement() {
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchEditors();
  }, []);

  const fetchEditors = async () => {
    try {
      const data = await dataService.getEditors();
      setEditors(data);
    } catch (error) {
      console.error('Error fetching editors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (editor) => {
    setEditingId(editor.id);
    setFormData({
      name: editor.name,
      displayName: editor.displayName,
      email: editor.email || '',
      bio: editor.bio || '',
      profileImage: editor.profileImage || '',
      instagramUrl: editor.instagramUrl || '',
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = async () => {
    alert('Supabase가 설정되면 저장됩니다. 현재는 Mock 데이터 모드입니다.');
    setEditingId(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="editor-management">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="editor-management">
      <header className="page-header">
        <h1>에디터 관리</h1>
        <p>에디터 프로필을 관리합니다. 에디터 추가/삭제는 Supabase에서 직접 해야 합니다.</p>
      </header>

      <div className="editors-grid">
        {editors.map((editor) => (
          <div key={editor.id} className="editor-card">
            {editingId === editor.id ? (
              <div className="editor-edit-form">
                <div className="form-group">
                  <label>이름</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름"
                  />
                </div>
                <div className="form-group">
                  <label>표시 이름</label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="에디터 OOO"
                  />
                </div>
                <div className="form-group">
                  <label>이메일</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>프로필 이미지 URL</label>
                  <input
                    type="url"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>
                <div className="form-group">
                  <label>인스타그램 URL</label>
                  <input
                    type="url"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="form-group full-width">
                  <label>소개</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="에디터 소개글을 작성하세요"
                    rows={4}
                  />
                </div>
                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={handleCancel}>
                    취소
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="editor-avatar">
                  {editor.profileImage ? (
                    <img src={editor.profileImage} alt={editor.displayName} />
                  ) : (
                    <div className="avatar-placeholder">
                      {editor.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="editor-info">
                  <h3>{editor.displayName}</h3>
                  <p className="editor-name">{editor.name}</p>
                  {editor.bio ? (
                    <p className="editor-bio">{editor.bio}</p>
                  ) : (
                    <p className="editor-bio empty">소개글이 없습니다</p>
                  )}
                </div>
                <div className="editor-actions">
                  <button 
                    className="btn btn-edit"
                    onClick={() => handleEdit(editor)}
                  >
                    수정
                  </button>
                  <Link 
                    to={`/editor/${editor.id}`} 
                    className="btn btn-view"
                    target="_blank"
                  >
                    보기
                  </Link>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="info-notice">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <p>
          에디터 프로필 이미지는 Supabase Storage에 업로드 후 URL을 입력하세요.
          또는 외부 이미지 URL을 사용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}

export default EditorManagement;
