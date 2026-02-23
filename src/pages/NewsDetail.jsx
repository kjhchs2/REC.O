import { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { weeklyNewReleases, festivalNews } from '../data/mockData';
import './NewsDetail.css';

function NewsDetail() {
  const { id } = useParams();
  const location = useLocation();
  const allNews = [...weeklyNewReleases, ...festivalNews];
  const news = allNews.find(item => item.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, location.pathname]);

  if (!news) {
    return (
      <div className="not-found page-container">
        <h1>뉴스를 찾을 수 없습니다</h1>
        <Link to="/news/weekly" className="btn btn-primary">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="news-detail page-container">
      {/* Hero */}
      <div className="news-hero">
        <img src={news.image} alt={news.title} className="news-hero-bg" />
        <div className="news-hero-overlay" />
        <div className="news-hero-content">
          <div className="breadcrumb">
            <Link to="/news/weekly">이주의 신곡 소식</Link>
            <span>/</span>
            <span>{news.genre || '뉴스'}</span>
          </div>
          <div className="news-tags-row">
            {news.tags?.map((tag, index) => (
              <span key={index} className="news-tag">{tag}</span>
            ))}
          </div>
          <h1 className="news-headline">{news.title}</h1>
          <div className="news-meta-row">
            <span className="news-date-info">{news.date}</span>
            {news.releaseDate && (
              <span className="news-release-info">발매일: {news.releaseDate}</span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="news-article">
        {news.artist && (
          <div className="artist-badge">
            <span className="artist-label">아티스트</span>
            <span className="artist-name">{news.artist}</span>
          </div>
        )}

        {news.venue && (
          <div className="event-info">
            <div className="event-detail">
              <span className="event-label">장소</span>
              <span className="event-value">{news.venue}</span>
            </div>
            {news.eventDate && (
              <div className="event-detail">
                <span className="event-label">일정</span>
                <span className="event-value">{news.eventDate}</span>
              </div>
            )}
          </div>
        )}

        <div className="news-body">
          {news.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>

        <div className="news-footer">
          <Link to="/news/weekly" className="back-link">← 목록으로 돌아가기</Link>
        </div>
      </article>

      {/* Related News */}
      <section className="related-section">
        <h2 className="section-title">다른 소식</h2>
        <div className="related-grid">
          {allNews
            .filter(item => item.id !== news.id)
            .slice(0, 3)
            .map(item => (
              <Link 
                to={`/news/${item.id}`} 
                key={item.id}
                className="related-card"
              >
                <img src={item.image} alt={item.title} />
                <div className="related-content">
                  <span className="related-genre">{item.genre}</span>
                  <h3>{item.title}</h3>
                  <span className="related-date">{item.date}</span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

export default NewsDetail;

