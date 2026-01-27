import { useParams, Link } from 'react-router-dom';
import { concertReviews } from '../data/mockData';
import './ConcertReviewDetail.css';

function ConcertReviewDetail() {
  const { id } = useParams();
  const review = concertReviews.find(item => item.id === parseInt(id));

  if (!review) {
    return (
      <div className="not-found page-container">
        <h1>후기를 찾을 수 없습니다</h1>
        <Link to="/reviews/concert" className="btn btn-primary">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="concert-detail page-container">
      {/* Hero */}
      <div className="concert-hero">
        <img src={review.coverImage} alt={review.title} className="concert-hero-bg" />
        <div className="concert-hero-overlay" />
        <div className="concert-hero-content">
          <div className="breadcrumb">
            <Link to="/reviews/concert">공연 후기</Link>
            <span>/</span>
            <span>{review.artist}</span>
          </div>
          <div className="concert-rating-large">
            <span className="rating-star">★</span>
            <span className="rating-score">{review.rating}</span>
            <span className="rating-max">/ 10</span>
          </div>
          <h1 className="concert-headline">{review.title}</h1>
          <div className="concert-info-row">
            <div className="concert-venue-info">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>{review.venue}</span>
            </div>
            <span className="concert-date-info">{review.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="concert-article">
        {/* Author */}
        <div className="author-card">
          <img src={review.authorImage} alt={review.author} className="author-avatar" />
          <div className="author-info">
            <span className="author-label">작성자</span>
            <span className="author-name">{review.author}</span>
          </div>
        </div>

        {/* Setlist */}
        <div className="setlist-section">
          <h3>세트리스트</h3>
          <ol className="setlist">
            {review.setlist.map((song, index) => (
              <li key={index}>{song}</li>
            ))}
          </ol>
        </div>

        {/* Review Body */}
        <div className="concert-body">
          {review.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>

        {/* Photos */}
        {review.photos && review.photos.length > 0 && (
          <div className="photos-section">
            <h3>공연 사진</h3>
            <div className="photos-grid">
              {review.photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`공연 사진 ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="concert-footer">
          <Link to="/reviews/concert" className="back-link">← 목록으로 돌아가기</Link>
        </div>
      </article>

      {/* Related Reviews */}
      <section className="related-section">
        <h2 className="section-title">다른 공연 후기</h2>
        <div className="related-grid">
          {concertReviews
            .filter(item => item.id !== review.id)
            .slice(0, 2)
            .map(item => (
              <Link 
                to={`/reviews/concert/${item.id}`} 
                key={item.id}
                className="related-concert-card"
              >
                <img src={item.coverImage} alt={item.title} />
                <div className="related-concert-content">
                  <div className="related-concert-rating">★ {item.rating}</div>
                  <h3>{item.title}</h3>
                  <p>{item.venue} · {item.date}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

export default ConcertReviewDetail;

