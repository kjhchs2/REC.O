import { useState } from 'react';
import { videoInterviews } from '../data/mockData';
import './VideoInterviews.css';

function VideoInterviews() {
  const [selectedVideo, setSelectedVideo] = useState(null);

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

      <div className="video-grid">
        {videoInterviews.map((video) => (
          <article 
            key={video.id} 
            className="video-item"
            onClick={() => openVideo(video)}
          >
            <div className="video-thumbnail-wrapper">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="video-thumbnail-img"
              />
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
                  <span className="views">{video.views.toLocaleString()} 조회</span>
                  <span className="date">{video.date}</span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

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
              <p className="modal-description">{selectedVideo.description}</p>
              <div className="modal-meta">
                <span>{selectedVideo.views.toLocaleString()} 조회</span>
                <span>•</span>
                <span>{selectedVideo.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoInterviews;

