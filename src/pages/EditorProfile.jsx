import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './EditorProfile.css';

function EditorProfile() {
  const { id } = useParams();
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const editorData = await dataService.getEditor(id);
        const contentData = await dataService.getEditorContent(id);
        setEditor(editorData);
        setContent(contentData);
      } catch (error) {
        console.error('Error fetching editor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="editor-profile page-container">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="editor-profile page-container">
        <div className="not-found">
          <h1>에디터를 찾을 수 없습니다</h1>
          <Link to="/" className="btn btn-primary">홈으로 돌아가기</Link>
        </div>
      </div>
    );
  }

  const allContent = content ? [
    ...content.videoInterviews.map(item => ({ ...item, type: 'video_interview', typeLabel: '영상 인터뷰', link: '/interview/video' })),
    ...content.artistInterviews.map(item => ({ ...item, type: 'artist_interview', typeLabel: '아티스트 서면 인터뷰', link: `/interview/artist/${item.id}` })),
    ...content.emergingArtistInterviews.map(item => ({ ...item, type: 'emerging_interview', typeLabel: '저점 매수 인터뷰', link: `/interview/emerging/${item.id}` })),
    ...content.albumRecommendations.map(item => ({ ...item, type: 'album', typeLabel: '음반 추천', link: `/albums/recommendations/${item.id}` })),
    ...content.albumReviews.map(item => ({ ...item, type: 'review', typeLabel: '음반 리뷰', link: `/albums/reviews/${item.id}` })),
    ...content.concertReviews.map(item => ({ ...item, type: 'concert', typeLabel: '공연 후기', link: `/reviews/concert/${item.id}` })),
  ].sort((a, b) => new Date(b.date || b.releaseDate) - new Date(a.date || a.releaseDate)) : [];

  const filteredContent = activeTab === 'all' 
    ? allContent 
    : allContent.filter(item => item.type === activeTab);

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'video_interview', label: '영상 인터뷰' },
    { id: 'artist_interview', label: '서면 인터뷰' },
    { id: 'emerging_interview', label: '저점 매수' },
    { id: 'album', label: '음반 추천' },
    { id: 'review', label: '음반 리뷰' },
    { id: 'concert', label: '공연 후기' },
  ];

  return (
    <div className="editor-profile page-container">
      <header className="editor-header">
        <div className="editor-avatar-wrapper">
          {editor.profileImage ? (
            <img src={editor.profileImage} alt={editor.displayName} className="editor-avatar" />
          ) : (
            <div className="editor-avatar-placeholder">
              <span>{editor.name.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="editor-info">
          <h1 className="editor-name">{editor.displayName}</h1>
          {editor.bio ? (
            <p className="editor-bio">{editor.bio}</p>
          ) : (
            <p className="editor-bio placeholder">아직 소개가 작성되지 않았습니다.</p>
          )}
          {editor.instagramUrl && (
            <a href={editor.instagramUrl} target="_blank" rel="noopener noreferrer" className="editor-social">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          )}
        </div>
      </header>

      <div className="editor-content-section">
        <div className="content-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`content-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredContent.length > 0 ? (
          <div className="content-grid">
            {filteredContent.map((item, index) => (
              <Link 
                key={`${item.type}-${item.id}-${index}`} 
                to={item.link} 
                className="content-card"
              >
                {(item.thumbnail || item.coverImage || item.cover || item.image) && (
                  <img 
                    src={item.thumbnail || item.coverImage || item.cover || item.image} 
                    alt={item.title} 
                    className="content-card-image"
                  />
                )}
                <div className="content-card-body">
                  <span className="content-card-type">{item.typeLabel}</span>
                  <h3 className="content-card-title">{item.title}</h3>
                  {item.artist && <p className="content-card-artist">{item.artist}</p>}
                  <span className="content-card-date">{item.date || item.releaseDate}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="no-content">
            <p>아직 작성한 글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditorProfile;
