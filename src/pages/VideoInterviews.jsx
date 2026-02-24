import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './VideoInterviews.css';

function VideoInterviews() {
  const [videoInterviews, setVideoInterviews] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getVideoInterviews();
        setVideoInterviews(data);
      } catch (error) {
        console.error('Failed to fetch video interviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="video-interviews page-container">
      <header className="page-header">
        <h1 className="page-title">영상 인터뷰</h1>
        <p className="page-subtitle">
          아티스트들의 생생한 이야기를 영상으로 만나보세요
        </p>
      </header>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>로딩 중...</div>
      ) : videoInterviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>등록된 영상 인터뷰가 없습니다.</div>
      ) : (
      <div className="video-grid">
        {videoInterviews.map((video) => (
          <article 
            key={video.id} 
            className="video-item"
            onClick={() => openVideo(video)}
          >
            <div className="video-thumbnail-wrapper">
              {(video.thumbnail || video.youtubeId) ? (
                <img 
                  src={video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                  alt={video.title} 
                  className="video-thumbnail-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />
              ) : (
                <div className="video-thumbnail-placeholder">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="#666">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
              )}
              <div className="video-play-overlay">
                <div className="play-icon">
                  <svg viewBox="0 0 24 24" width="64" height="64">
                    <circle cx="12" cy="12" r="12" fill="rgba(255, 107, 53, 0.9)" />
                    <path fill="#fff" d="M10 8l6 4-6 4V8z" />
                  </svg>
                </div>
              </div>
              <div className="video-duration">12:34</div>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">{video.description}</p>
              <div className="video-meta">
                <span className="video-artist">{video.artist}</span>
                <span className="video-stats">
                  <span className="views">{(video.views ?? 0).toLocaleString()} 조회</span>
                  <span className="date">{video.date}</span>
                  {video.editorDisplayName && (
                    <span className="video-editor">작성: {video.editorDisplayName}</span>
                  )}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideo}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <div className="video-player">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="video-modal-info">
              <h2>{selectedVideo.title}</h2>
              <p className="modal-artist">{selectedVideo.artist}</p>
              <div className="modal-description">{selectedVideo.description}</div>
              <div className="modal-meta">
                <span>{(selectedVideo.views ?? 0).toLocaleString()} 조회</span>
                <span>•</span>
                <span>{selectedVideo.date}</span>
                {selectedVideo.editorDisplayName && (
                  <>
                    <span>•</span>
                    <Link to={`/editor/${selectedVideo.editorId}`} className="modal-editor">작성: {selectedVideo.editorDisplayName}</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoInterviews;

