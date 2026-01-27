import { useParams, Link } from 'react-router-dom';
import { artistInterviews } from '../data/mockData';
import './InterviewDetail.css';

function ArtistInterviewDetail() {
  const { id } = useParams();
  const interview = artistInterviews.find(item => item.id === parseInt(id));

  if (!interview) {
    return (
      <div className="not-found page-container">
        <h1>인터뷰를 찾을 수 없습니다</h1>
        <Link to="/interview/artist" className="btn btn-primary">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="interview-detail page-container">
      {/* Hero */}
      <div className="interview-hero">
        <img src={interview.coverImage} alt={interview.title} className="interview-hero-bg" />
        <div className="interview-hero-overlay" />
        <div className="interview-hero-content">
          <div className="breadcrumb">
            <Link to="/interview/artist">아티스트 인터뷰</Link>
            <span>/</span>
            <span>{interview.artist}</span>
          </div>
          <span className="interview-badge">{interview.category}</span>
          <h1 className="interview-headline">"{interview.title}"</h1>
          <div className="interview-meta-row">
            <div className="interview-artist-info">
              <img src={interview.artistImage} alt={interview.artist} />
              <span>{interview.artist}</span>
            </div>
            <span className="interview-date-info">{interview.date}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="interview-article">
        <div className="interview-intro">
          <p>{interview.excerpt}</p>
        </div>

        <div className="qa-section">
          {interview.questions.map((qa, index) => (
            <div key={index} className="qa-item">
              <div className="question">
                <span className="q-label">Q</span>
                <p>{qa.q}</p>
              </div>
              <div className="answer">
                <span className="a-label">A</span>
                <p>{qa.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="interview-footer">
          <div className="artist-card-large">
            <img src={interview.artistImage} alt={interview.artist} />
            <div className="artist-card-info">
              <span className="artist-card-label">인터뷰이</span>
              <h3>{interview.artist}</h3>
              <span className="artist-card-category">{interview.category}</span>
            </div>
          </div>
        </div>
      </article>

      {/* More Interviews */}
      <section className="more-section">
        <h2 className="section-title">다른 인터뷰</h2>
        <div className="more-grid">
          {artistInterviews
            .filter(item => item.id !== interview.id)
            .slice(0, 2)
            .map(item => (
              <Link 
                to={`/interview/artist/${item.id}`} 
                key={item.id}
                className="more-card"
              >
                <img src={item.coverImage} alt={item.title} />
                <div className="more-card-content">
                  <span className="tag">{item.category}</span>
                  <h3>"{item.title}"</h3>
                  <p>{item.artist}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}

export default ArtistInterviewDetail;

