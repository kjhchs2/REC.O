import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './AlbumRecommendations.css';

function AlbumRecommendations() {
  const [albumRecommendations, setAlbumRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getAlbumRecommendations();
        setAlbumRecommendations(data);
      } catch (error) {
        console.error('Failed to fetch album recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="album-recommendations page-container">
      <header className="page-header">
        <h1 className="page-title">음반 추천</h1>
        <p className="page-subtitle">
          내맘추가 엄선한 이달의 추천 음반을 만나보세요
        </p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>로딩 중...</div>
      ) : albumRecommendations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>등록된 추천 음반이 없습니다.</div>
      ) : (
      <div className="album-grid">
        {albumRecommendations.map((album, index) => (
          <Link 
            to={`/albums/recommendations/${album.id}`}
            key={album.id} 
            className={`album-card ${index === 0 ? 'featured' : ''}`}
          >
            <div className="album-cover-wrapper">
              <img src={album.cover} alt={album.title} className="album-cover" />
              <div className="album-tags">
                {(album.tags || []).map((tag, tagIndex) => (
                  <span key={tagIndex} className="album-tag">{tag}</span>
                ))}
              </div>
              <div className="album-rating">
                <span className="rating-star">★</span>
                <span className="rating-score">{album.rating}</span>
              </div>
            </div>
            <div className="album-info">
              <span className="album-genre">{album.genre}</span>
              <h2 className="album-title">{album.title}</h2>
              <p className="album-artist">{album.artist}</p>
              <p className="album-description">{album.description}</p>
              <span className="view-detail">자세히 보기 →</span>
            </div>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}

export default AlbumRecommendations;

