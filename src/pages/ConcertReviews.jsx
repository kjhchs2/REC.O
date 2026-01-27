import { Link } from 'react-router-dom';
import { concertReviews } from '../data/mockData';
import './ConcertReviews.css';

function ConcertReviews() {
  return (
    <div className="concert-reviews page-container">
      <header className="page-header">
        <h1 className="page-title">공연 후기</h1>
        <p className="page-subtitle">
          직접 다녀온 공연의 생생한 후기를 공유합니다
        </p>
      </header>

      <div className="concert-grid">
        {concertReviews.map((review, index) => (
          <Link 
            to={`/reviews/concert/${review.id}`}
            key={review.id}
            className={`concert-card ${index === 0 ? 'featured' : ''}`}
          >
            <div className="concert-image">
              <img src={review.coverImage} alt={review.title} />
              <div className="concert-overlay" />
              <div className="concert-rating-badge">
                <span className="rating-star">★</span>
                <span className="rating-score">{review.rating}</span>
              </div>
            </div>
            <div className="concert-content">
              <div className="concert-meta">
                <span className="concert-artist">{review.artist}</span>
                <span className="concert-date">{review.date}</span>
              </div>
              <h2 className="concert-title">{review.title}</h2>
              <div className="concert-venue">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{review.venue}</span>
              </div>
              <p className="concert-excerpt">
                {review.content.substring(0, 120)}...
              </p>
              <div className="concert-author">
                <img src={review.authorImage} alt={review.author} />
                <span>{review.author}</span>
              </div>
              <span className="read-more">후기 읽기 →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ConcertReviews;

