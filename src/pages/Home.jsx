import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './Home.css';

function Home() {
  const [videoInterviews, setVideoInterviews] = useState([]);
  const [artistInterviews, setArtistInterviews] = useState([]);
  const [emergingArtistInterviews, setEmergingArtistInterviews] = useState([]);
  const [albumRecommendations, setAlbumRecommendations] = useState([]);
  const [weeklyNewReleases, setWeeklyNewReleases] = useState([]);
  const [todayQuotes, setTodayQuotes] = useState([]);
  const [concertReviews, setConcertReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          videos,
          artists,
          emerging,
          albums,
          news,
          quotes,
          concerts
        ] = await Promise.all([
          dataService.getVideoInterviews(),
          dataService.getArtistInterviews(),
          dataService.getEmergingArtistInterviews(),
          dataService.getAlbumRecommendations(),
          dataService.getWeeklyNews(),
          dataService.getTodayQuotes(),
          dataService.getConcertReviews()
        ]);
        
        setVideoInterviews(videos);
        setArtistInterviews(artists);
        setEmergingArtistInterviews(emerging);
        setAlbumRecommendations(albums);
        setWeeklyNewReleases(news);
        setTodayQuotes(quotes);
        setConcertReviews(concerts);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const latestAlbum = albumRecommendations[0];
  const todayQuote = todayQuotes[0];

  const carouselItems = [
    ...videoInterviews.slice(0, 3).map(item => ({
      ...item,
      type: 'video_interview',
      link: '/interview/video',
      image: item.thumbnail,
      subtitle: item.artist,
      tag: '영상 인터뷰'
    })),
    ...artistInterviews.slice(0, 2).map(item => ({
      ...item,
      type: 'artist_interview',
      link: `/interview/artist/${item.id}`,
      image: item.coverImage,
      subtitle: item.artist,
      tag: '서면 인터뷰'
    }))
  ].slice(0, 5);

  const nextSlide = useCallback(() => {
    if (carouselItems.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }
  }, [carouselItems.length]);

  const prevSlide = () => {
    if (carouselItems.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    }
  };

  useEffect(() => {
    if (carouselItems.length > 0) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, carouselItems.length]);

  if (loading) {
    return (
      <div className="home page-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <p>로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home page-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line">내맘추</span>
            <span className="hero-title-line accent">(내맘대로 추천하는</span>
            <span className="hero-title-line">이주의 음반)</span>
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
          <div className="hero-carousel">
            {carouselItems.map((item, index) => (
              <Link
                key={item.id}
                to={item.link}
                className={`hero-card ${index === currentSlide ? 'active' : ''}`}
              >
                <img src={item.image} alt={item.title} />
                <div className="hero-card-overlay">
                  <span className="hero-card-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </Link>
            ))}
            <div className="carousel-controls">
              <button className="carousel-btn prev" onClick={(e) => { e.preventDefault(); prevSlide(); }} aria-label="이전">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button className="carousel-btn next" onClick={(e) => { e.preventDefault(); nextSlide(); }} aria-label="다음">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
            <div className="carousel-dots">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`슬라이드 ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Today's Quote Section */}
      {todayQuote && (
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
      )}

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
      {latestAlbum && (
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
                {(latestAlbum.tags || []).map((tag, index) => (
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
                  {(latestAlbum.trackList || []).map((track, index) => (
                    <li key={index}>{track}</li>
                  ))}
                </ol>
              </div>
              <Link to="/albums/recommendations" className="btn btn-secondary">자세히 보기</Link>
            </div>
          </div>
        </section>
      )}

      {/* Video Interviews */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">아티스트 영상 인터뷰</h2>
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
          <h2 className="section-title">아티스트 서면 인터뷰</h2>
          <Link to="/interview/artist" className="section-link">
            전체 보기 →
          </Link>
        </div>
        <div className="artist-grid">
          {artistInterviews.slice(0, 1).map((interview) => (
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
          {emergingArtistInterviews.slice(0, 1).map((interview) => (
            <Link 
              to={`/interview/emerging/${interview.id}`} 
              key={`emerging-${interview.id}`} 
              className="artist-card emerging"
            >
              <img src={interview.coverImage} alt={interview.title} className="artist-card-bg" />
              <div className="artist-card-overlay">
                <span className="tag tag-emerging">저점 매수</span>
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

