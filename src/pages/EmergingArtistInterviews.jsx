import { Link } from 'react-router-dom';
import { emergingArtistInterviews } from '../data/mockData';
import './EmergingArtistInterviews.css';

function EmergingArtistInterviews() {
  return (
    <div className="emerging-interviews page-container">
      <header className="page-header">
        <h1 className="page-title">저점 매수 아티스트</h1>
        <p className="page-subtitle">
          지금은 작지만, 언젠가 큰 무대에 설 신예 아티스트들을 미리 만나보세요
        </p>
      </header>

      <div className="emerging-intro">
        <div className="intro-card">
          <div className="intro-icon">📈</div>
          <h2>저점 매수란?</h2>
          <p>
            아직 대중에게 널리 알려지지 않았지만, 독특한 음악 세계와 잠재력을 가진 
            아티스트들을 소개합니다. 지금 발견하면 나중에 "나 이 아티스트 초창기 때부터 
            알았어"라고 자랑할 수 있는 뮤지션들이죠.
          </p>
        </div>
      </div>

      <div className="emerging-list">
        {emergingArtistInterviews.map((interview) => (
          <Link 
            to={`/interview/emerging/${interview.id}`} 
            key={interview.id}
            className="emerging-card"
          >
            <div className="emerging-image">
              <img src={interview.coverImage} alt={interview.title} />
              <div className="emerging-overlay" />
              <div className="follower-badge">
                <span className="follower-number">{interview.followers.toLocaleString()}</span>
                <span className="follower-text">팔로워</span>
              </div>
            </div>
            <div className="emerging-content">
              <div className="emerging-header">
                <span className="emerging-category">{interview.category}</span>
                <span className="emerging-date">{interview.date}</span>
              </div>
              <h2 className="emerging-title">"{interview.title}"</h2>
              <p className="emerging-excerpt">{interview.excerpt}</p>
              <div className="emerging-artist">
                <img src={interview.artistImage} alt={interview.artist} />
                <div className="emerging-artist-info">
                  <span className="emerging-artist-name">{interview.artist}</span>
                  <span className="emerging-artist-label">신예 아티스트</span>
                </div>
              </div>
              <span className="emerging-cta">인터뷰 읽기 →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EmergingArtistInterviews;

