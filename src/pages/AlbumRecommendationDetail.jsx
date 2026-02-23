import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './AlbumRecommendationDetail.css';

function AlbumRecommendationDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [album, setAlbum] = useState(null);
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = await dataService.getAlbumRecommendation(id);
        setAlbum(data);
        
        if (data?.editorId) {
          const editorData = await dataService.getEditor(data.editorId);
          setEditor(editorData);
        }
      } catch (error) {
        console.error('Error fetching album:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, location.pathname]);

  if (loading) {
    return (
      <div className="album-detail page-container">
        <div style={{ textAlign: 'center', padding: '60px' }}>로딩 중...</div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="not-found">
        <h2>앨범을 찾을 수 없습니다</h2>
        <Link to="/albums/recommendations" className="back-link">← 목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="album-detail page-container">
      <Link to="/albums/recommendations" className="back-link">← 목록으로 돌아가기</Link>
      
      <div className="album-detail-content">
        <div className="album-detail-cover">
          <img src={album.cover} alt={album.title} />
          <div className="album-rating-badge">
            <span className="rating-star">★</span>
            <span className="rating-score">{album.rating}</span>
          </div>
        </div>
        
        <div className="album-detail-info">
          <div className="album-tags">
            {(album.tags || []).map((tag, index) => (
              <span key={index} className="album-tag">{tag}</span>
            ))}
          </div>
          
          <span className="album-genre-label">{album.genre}</span>
          <h1 className="album-detail-title">{album.title}</h1>
          <p className="album-detail-artist">{album.artist}</p>
          
          <div className="album-meta-info">
            <span className="release-date">
              <strong>발매일:</strong> {album.releaseDate}
            </span>
          </div>
          
          <p className="album-detail-description">{album.description}</p>
          
          {editor && (
            <Link to={`/editor/${editor.id}`} className="editor-card">
              <div className="editor-card-avatar">
                {editor.profileImage ? (
                  <img src={editor.profileImage} alt={editor.displayName} />
                ) : (
                  <span>{editor.name?.charAt(0)}</span>
                )}
              </div>
              <div className="editor-card-info">
                <span className="editor-card-label">추천자</span>
                <span className="editor-card-name">{editor.displayName}</span>
              </div>
            </Link>
          )}
        </div>
      </div>
      
      <div className="album-sections">
        {(album.trackList || []).length > 0 && (
        <section className="album-section">
          <h2 className="section-title">수록곡</h2>
          <ol className="tracklist">
            {album.trackList.map((track, index) => (
              <li key={index} className="track-item">
                <span className="track-number">{index + 1}</span>
                <span className="track-name">{track}</span>
              </li>
            ))}
          </ol>
        </section>
        )}
        
        {album.review && (
        <section className="album-section">
          <h2 className="section-title">내맘추 리뷰</h2>
          <p className="album-review-text">{album.review}</p>
        </section>
        )}
      </div>
    </div>
  );
}

export default AlbumRecommendationDetail;
