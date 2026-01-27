import { albumRecommendations } from '../data/mockData';
import './AlbumRecommendations.css';

function AlbumRecommendations() {
  return (
    <div className="album-recommendations page-container">
      <header className="page-header">
        <h1 className="page-title">음반 추천</h1>
        <p className="page-subtitle">
          내맘추가 엄선한 이달의 추천 음반을 만나보세요
        </p>
      </header>

      <div className="album-grid">
        {albumRecommendations.map((album, index) => (
          <article 
            key={album.id} 
            className={`album-card ${index === 0 ? 'featured' : ''}`}
          >
            <div className="album-cover-wrapper">
              <img src={album.cover} alt={album.title} className="album-cover" />
              <div className="album-tags">
                {album.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="album-tag">{tag}</span>
                ))}
              </div>
              <div className="album-rating">
                <span className="rating-star">★</span>
                <span className="rating-score">{album.rating}</span>
              </div>
            </div>
            <div className="album-info">
              <span className="album-genre">{album.genre}</span>
              <h2 className="album-title">{album.title}</h2>
              <p className="album-artist">{album.artist}</p>
              <p className="album-description">{album.description}</p>
              <div className="album-tracklist">
                <h4>수록곡</h4>
                <ol>
                  {album.trackList.map((track, trackIndex) => (
                    <li key={trackIndex}>{track}</li>
                  ))}
                </ol>
              </div>
              <p className="album-review">{album.review}</p>
              <div className="album-meta">
                <span className="release-date">발매일: {album.releaseDate}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AlbumRecommendations;

