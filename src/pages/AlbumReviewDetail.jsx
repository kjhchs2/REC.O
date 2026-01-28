import { useParams, Link } from 'react-router-dom';
import { albumReviews, albumRecommendations } from '../data/mockData';
import './AlbumReviewDetail.css';

function AlbumReviewDetail() {
  const { id } = useParams();
  const review = albumReviews.find(item => item.id === parseInt(id));

  if (!review) {
    return (
      <div className="not-found page-container">
        <h1>리뷰를 찾을 수 없습니다</h1>
        <Link to="/albums/reviews" className="btn btn-primary">목록으로 돌아가기</Link>
      </div>
    );
  }

  const album = albumRecommendations.find(a => a.id === review.albumId);

  return (
    <div className="album-review-detail page-container">
      {/* Hero */}
      <div className="review-hero">
        <img src={review.coverImage} alt={review.title} className="review-hero-bg" />
        <div className="review-hero-overlay" />
        <div className="review-hero-content">
          <div className="breadcrumb">
            <Link to="/albums/reviews">음반 소개를 소개합니다.</Link>
            <span>/</span>
            <span>리뷰</span>
          </div>
          <div className="review-rating-badge">
            <span className="rating-star">★</span>
            <span className="rating-score">{review.rating}</span>
            <span className="rating-max">/ 10</span>
          </div>
          <h1 className="review-headline">{review.title}</h1>
          <div className="review-meta-row">
            <span className="review-author-name">by {review.author}</span>
            <span className="review-date-info">{review.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="review-article">
        {album && (
          <div className="album-info-card">
            <img src={album.cover} alt={album.title} className="album-info-cover" />
            <div className="album-info-details">
              <h3>{album.title}</h3>
              <p className="album-info-artist">{album.artist}</p>
              <p className="album-info-meta">{album.genre} · {album.releaseDate}</p>
              <div className="album-info-tracks">
                {album.trackList.map((track, index) => (
                  <span key={index}>{track}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="review-body">
          {review.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>

        <div className="review-footer">
          <div className="reviewer-card">
            <div className="reviewer-info">
              <span className="reviewer-label">리뷰어</span>
              <h4>{review.author}</h4>
            </div>
          </div>
        </div>
      </article>

      {/* More Reviews */}
      <section className="more-section">
        <h2 className="section-title">다른 리뷰</h2>
        <div className="more-grid">
          {albumReviews
            .filter(item => item.id !== review.id)
            .slice(0, 2)
            .map(item => (
              <Link 
                to={`/albums/reviews/${item.id}`} 
                key={item.id}
                className="more-card"
              >
                <img src={item.coverImage} alt={item.title} />
                <div className="more-card-content">
                  <div className="more-rating">★ {item.rating}</div>
                  <h3>{item.title}</h3>
                  <p>by {item.author}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

export default AlbumReviewDetail;

