import { todayQuotes } from '../data/mockData';
import './TodayQuotes.css';

function TodayQuotes() {
  return (
    <div className="today-quotes page-container">
      <header className="page-header">
        <h1 className="page-title">오늘, 이 문장</h1>
        <p className="page-subtitle">
          마음에 남는 가사와 문장들을 모았습니다
        </p>
      </header>

      <div className="quotes-list">
        {todayQuotes.map((quote, index) => (
          <article 
            key={quote.id} 
            className={`quote-item ${index === 0 ? 'featured' : ''}`}
          >
            <div className="quote-album-art">
              <img src={quote.albumCover} alt={quote.song} />
            </div>
            <div className="quote-content">
              <span className="quote-date">{quote.date}</span>
              <blockquote className="quote-text">
                "{quote.quote}"
              </blockquote>
              <div className="quote-source">
                <span className="quote-song">{quote.song}</span>
                <span className="quote-divider">—</span>
                <span className="quote-artist">{quote.artist}</span>
              </div>
              <p className="quote-commentary">{quote.commentary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TodayQuotes;

