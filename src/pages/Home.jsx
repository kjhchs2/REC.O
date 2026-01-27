import { Link } from 'react-router-dom';
import { 
  videoInterviews, 
  artistInterviews, 
  albumRecommendations, 
  weeklyNewReleases,
  todayQuotes,
  concertReviews 
} from '../data/mockData';
import './Home.css';

function Home() {
  const featuredInterview = videoInterviews[0];
  const latestAlbum = albumRecommendations[0];
  const todayQuote = todayQuotes[0];

  return (
    <div className="home page-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">내 마음대로</span>
            <span className="hero-title-line accent">추천하는</span>
            <span className="hero-title-line">인디음악</span>
          </h1>
          <p className="hero-description">
            숨겨진 보석 같은 인디 아티스트와 음악을 발견하세요.
            <br />
            우리만의 시선으로 엄선한 음악 이야기를 전합니다.
          </p>
          <div className="hero-cta">
            <Link to="/interview/video" className="btn btn-primary">인터뷰 보기</Link>
            <Link to="/albums/recommendations" className="btn btn-secondary">음반 추천</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <img src={featuredInterview.thumbnail} alt={featuredInterview.title} />
            <div className="hero-card-overlay">
              <span className="hero-card-tag">최신 인터뷰</span>
              <h3>{featuredInterview.title}</h3>
              <p>{featuredInterview.artist}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Quote Section */}
      <section className="quote-section">
        <div className="quote-card">
          <div className="quote-album">
            <img src={todayQuote.albumCover} alt={todayQuote.song} />
          </div>
          <div className="quote-content">
            <span className="quote-label">오늘, 이 문장</span>
            <blockquote className="quote-text">"{todayQuote.quote}"</blockquote>
            <p className="quote-source">— {todayQuote.artist}, '{todayQuote.song}'</p>
            <Link to="/albums/quotes" className="quote-link">더 많은 문장 보기 →</Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">이주의 신곡 소식</h2>
          <Link to="/news/weekly" className="section-link">
            전체 보기 →
          </Link>
        </div>
        <div className="news-grid">
          {weeklyNewReleases.slice(0, 3).map((news) => (
            <Link to={`/news/${news.id}`} key={news.id} className="news-card card">
              <img src={news.image} alt={news.title} className="card-image" />
              <div className="card-content">
                <div className="news-meta">
                  <span className="tag tag-accent">{news.genre}</span>
                  <span className="news-date">{news.date}</span>
                </div>
                <h3 className="card-title">{news.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Album */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">추천 음반</h2>
          <Link to="/albums/recommendations" className="section-link">
            전체 보기 →
          </Link>
        </div>
        <div className="featured-album">
          <div className="featured-album-cover">
            <img src={latestAlbum.cover} alt={latestAlbum.title} />
            <div className="album-tags">
              {latestAlbum.tags.map((tag, index) => (
                <span key={index} className="tag tag-accent">{tag}</span>
              ))}
            </div>
          </div>
          <div className="featured-album-info">
            <div className="album-header">
              <span className="album-genre">{latestAlbum.genre}</span>
              <div className="rating">
                <span>★</span>
                <span>{latestAlbum.rating}</span>
              </div>
            </div>
            <h3 className="album-title">{latestAlbum.title}</h3>
            <p className="album-artist">{latestAlbum.artist}</p>
            <p className="album-description">{latestAlbum.description}</p>
            <div className="album-tracklist">
              <h4>수록곡</h4>
              <ol>
                {latestAlbum.trackList.map((track, index) => (
                  <li key={index}>{track}</li>
                ))}
              </ol>
            </div>
            <Link to="/albums/recommendations" className="btn btn-secondary">자세히 보기</Link>
          </div>
        </div>
      </section>

      {/* Video Interviews */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">영상 인터뷰</h2>
          <Link to="/interview/video" className="section-link">
            전체 보기 →
          </Link>
        </div>
        <div className="grid-3">
          {videoInterviews.slice(0, 3).map((video) => (
            <Link to="/interview/video" key={video.id} className="video-card card">
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} className="card-image" />
                <div className="play-button">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.7)" />
                    <path fill="#fff" d="M10 8l6 4-6 4V8z" />
                  </svg>
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title">{video.title}</h3>
                <div className="card-meta">
                  <span>{video.artist}</span>
                  <span>•</span>
                  <span>{video.views.toLocaleString()} views</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Artist Interviews */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">아티스트 인터뷰</h2>
          <Link to="/interview/artist" className="section-link">
            전체 보기 →
          </Link>
        </div>
        <div className="artist-grid">
          {artistInterviews.slice(0, 2).map((interview) => (
            <Link 
              to={`/interview/artist/${interview.id}`} 
              key={interview.id} 
              className="artist-card"
            >
              <img src={interview.coverImage} alt={interview.title} className="artist-card-bg" />
              <div className="artist-card-overlay">
                <span className="tag">{interview.category}</span>
                <h3 className="artist-card-title">"{interview.title}"</h3>
                <div className="artist-info">
                  <img src={interview.artistImage} alt={interview.artist} className="artist-avatar" />
                  <span className="artist-name">{interview.artist}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Concert Reviews */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">공연 후기</h2>
          <Link to="/reviews/concert" className="section-link">
            전체 보기 →
          </Link>
        </div>
        <div className="concert-list">
          {concertReviews.slice(0, 3).map((review) => (
            <Link 
              to={`/reviews/concert/${review.id}`} 
              key={review.id} 
              className="concert-item"
            >
              <img src={review.coverImage} alt={review.title} className="concert-thumb" />
              <div className="concert-info">
                <h3 className="concert-title">{review.title}</h3>
                <p className="concert-meta">
                  {review.venue} · {review.date}
                </p>
              </div>
              <div className="concert-rating">
                <span className="rating">★ {review.rating}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

