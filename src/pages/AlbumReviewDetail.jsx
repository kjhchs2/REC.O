import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './AlbumReviewDetail.css';

function AlbumReviewDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [review, setReview] = useState(null);
  const [editor, setEditor] = useState(null);
  const [otherReviews, setOtherReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = await dataService.getAlbumReview(id);
        setReview(data);
        
        if (data?.editorId) {
          const editorData = await dataService.getEditor(data.editorId);
          setEditor(editorData);
        }
        
        const allReviews = await dataService.getAlbumReviews();
        setOtherReviews(allReviews.filter(item => item.id !== data?.id).slice(0, 2));
      } catch (error) {
        console.error('Error fetching review:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, location.pathname]);

  if (loading) {
    return (
      <div className="album-review-detail page-container">
        <div style={{ textAlign: 'center', padding: '60px' }}>로딩 중...</div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="not-found page-container">
        <h1>리뷰를 찾을 수 없습니다</h1>
        <Link to="/albums/reviews" className="btn btn-primary">목록으로 돌아가기</Link>
      </div>
    );
  }

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
        <div className="review-body">
          {(review.content || '').split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>

        <div className="review-footer">
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
                <span className="editor-card-label">작성자</span>
                <span className="editor-card-name">{editor.displayName}</span>
              </div>
            </Link>
          )}
        </div>
      </article>

      {/* More Reviews */}
      {otherReviews.length > 0 && (
      <section className="more-section">
        <h2 className="section-title">다른 리뷰</h2>
        <div className="more-grid">
          {otherReviews.map(item => (
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
      )}
    </div>
  );
}

export default AlbumReviewDetail;
