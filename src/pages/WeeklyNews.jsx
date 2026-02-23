import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './WeeklyNews.css';

function WeeklyNews() {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getWeeklyNews();
        setAllNews(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
      } catch (error) {
        console.error('Failed to fetch weekly news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="weekly-news page-container">
        <div style={{ textAlign: 'center', padding: '60px' }}>로딩 중...</div>
      </div>
    );
  }

  if (allNews.length === 0) {
    return (
      <div className="weekly-news page-container">
        <header className="page-header">
          <h1 className="page-title">이주의 신곡 소식</h1>
          <p className="page-subtitle">놓치면 안 될 이주의 음악 소식을 확인하세요</p>
        </header>
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>등록된 뉴스가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="weekly-news page-container">
      <header className="page-header">
        <h1 className="page-title">이주의 신곡 소식</h1>
        <p className="page-subtitle">
          놓치면 안 될 이주의 음악 소식을 확인하세요
        </p>
      </header>

      <div className="news-layout">
        {/* Featured News */}
        <Link to={`/news/${allNews[0].id}`} className="featured-news">
          <img src={allNews[0].image} alt={allNews[0].title} className="featured-news-image" />
          <div className="featured-news-overlay" />
          <div className="featured-news-content">
            <div className="news-tags">
              {allNews[0].tags?.map((tag, index) => (
                <span key={index} className="news-tag">{tag}</span>
              ))}
            </div>
            <h2>{allNews[0].title}</h2>
            <p className="featured-news-excerpt">
              {allNews[0].content.substring(0, 150)}...
            </p>
            <div className="featured-news-meta">
              <span className="news-date">{allNews[0].date}</span>
              {allNews[0].releaseDate && (
                <span className="release-date">발매일: {allNews[0].releaseDate}</span>
              )}
            </div>
          </div>
        </Link>

        {/* News List */}
        <div className="news-list">
          {allNews.slice(1).map((news) => (
            <Link 
              to={`/news/${news.id}`}
              key={news.id} 
              className="news-item"
            >
              <div className="news-item-image">
                <img src={news.image} alt={news.title} />
              </div>
              <div className="news-item-content">
                <div className="news-item-header">
                  <span className="news-genre">{news.genre}</span>
                  <span className="news-date">{news.date}</span>
                </div>
                <h3 className="news-item-title">{news.title}</h3>
                <p className="news-item-excerpt">
                  {news.content.substring(0, 80)}...
                </p>
                {news.releaseDate && (
                  <span className="news-release">발매일: {news.releaseDate}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyNews;

