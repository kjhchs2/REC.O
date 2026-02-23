import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './InterviewDetail.css';

function ArtistInterviewDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [interview, setInterview] = useState(null);
  const [editor, setEditor] = useState(null);
  const [otherInterviews, setOtherInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const data = await dataService.getArtistInterview(id);
        setInterview(data);
        
        if (data?.editorId) {
          const editorData = await dataService.getEditor(data.editorId);
          setEditor(editorData);
        }
        
        const allInterviews = await dataService.getArtistInterviews();
        setOtherInterviews(allInterviews.filter(item => item.id !== data?.id).slice(0, 2));
      } catch (error) {
        console.error('Error fetching interview:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, location.pathname]);

  if (loading) {
    return (
      <div className="interview-detail page-container">
        <div style={{ textAlign: 'center', padding: '60px' }}>로딩 중...</div>
      </div>
    );
  }

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

      {/* More Interviews */}
      {otherInterviews.length > 0 && (
      <section className="more-section">
        <h2 className="section-title">다른 인터뷰</h2>
        <div className="more-grid">
          {otherInterviews.map(item => (
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
      )}
    </div>
  );
}

export default ArtistInterviewDetail;

