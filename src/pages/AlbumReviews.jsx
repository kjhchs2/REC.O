import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './AlbumReviews.css';

function AlbumReviews() {
  const [albumReviews, setAlbumReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getAlbumReviews();
        setAlbumReviews(data);
      } catch (error) {
        console.error('Failed to fetch album reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="album-reviews page-container">
      <header className="page-header">
        <h1 className="page-title">음반 소개를 소개합니다.</h1>
        <p className="page-subtitle">
          앨범에 대한 깊이 있는 리뷰와 분석을 읽어보세요
        </p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>로딩 중...</div>
      ) : albumReviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>등록된 음반 리뷰가 없습니다.</div>
      ) : (
      <div className="reviews-list">
        {albumReviews.map((review, index) => (
          <Link 
            to={`/albums/reviews/${review.id}`}
            key={review.id}
            className={`review-card ${index === 0 ? 'featured' : ''}`}
          >
            <div className="review-cover">
              <img src={review.coverImage} alt={review.title} />
              <div className="review-rating">
                <span className="rating-star">★</span>
                <span className="rating-score">{review.rating}</span>
              </div>
            </div>
            <div className="review-content">
              <div className="review-meta">
                <span className="review-label">리뷰</span>
                <span className="review-date">{review.date}</span>
              </div>
              <h2 className="review-title">{review.title}</h2>
              <p className="review-excerpt">
                {review.content.substring(0, 200)}...
              </p>
              <div className="review-author">
                <span className="author-label">by</span>
                <span className="author-name">{review.author}</span>
              </div>
              <span className="read-more">리뷰 전문 읽기 →</span>
            </div>
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}

export default AlbumReviews;

