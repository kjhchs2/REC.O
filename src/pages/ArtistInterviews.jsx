import { Link } from 'react-router-dom';
import { artistInterviews } from '../data/mockData';
import './ArtistInterviews.css';

function ArtistInterviews() {
  return (
    <div className="artist-interviews page-container">
      <header className="page-header">
        <h1 className="page-title">아티스트 서면 인터뷰</h1>
        <p className="page-subtitle">
          아티스트들의 음악과 삶에 대한 깊은 이야기
        </p>
      </header>

      <div className="interview-list">
        {artistInterviews.map((interview, index) => (
          <Link 
            to={`/interview/artist/${interview.id}`} 
            key={interview.id}
            className={`interview-card ${index === 0 ? 'featured' : ''}`}
          >
            <div className="interview-cover">
              <img src={interview.coverImage} alt={interview.title} />
              <div className="interview-cover-overlay" />
            </div>
            <div className="interview-content">
              <div className="interview-header">
                <span className="interview-category">{interview.category}</span>
                <span className="interview-date">{interview.date}</span>
              </div>
              <h2 className="interview-title">"{interview.title}"</h2>
              <p className="interview-excerpt">{interview.excerpt}</p>
              <div className="interview-artist">
                <img 
                  src={interview.artistImage} 
                  alt={interview.artist} 
                  className="artist-photo"
                />
                <div className="artist-details">
                  <span className="artist-label">인터뷰이</span>
                  <span className="artist-name">{interview.artist}</span>
                </div>
              </div>
              <span className="read-more">인터뷰 읽기 →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ArtistInterviews;

