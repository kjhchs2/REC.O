import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../../lib/dataService';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    videoInterviews: 0,
    artistInterviews: 0,
    emergingInterviews: 0,
    albums: 0,
    reviews: 0,
    concerts: 0,
    news: 0,
    quotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          videoInterviews,
          artistInterviews,
          emergingInterviews,
          albums,
          reviews,
          concerts,
          news,
          quotes,
        ] = await Promise.all([
          dataService.getVideoInterviews(),
          dataService.getArtistInterviews(),
          dataService.getEmergingArtistInterviews(),
          dataService.getAlbumRecommendations(),
          dataService.getAlbumReviews(),
          dataService.getConcertReviews(),
          dataService.getWeeklyNews(),
          dataService.getTodayQuotes(),
        ]);

        setStats({
          videoInterviews: videoInterviews.length,
          artistInterviews: artistInterviews.length,
          emergingInterviews: emergingInterviews.length,
          albums: albums.length,
          reviews: reviews.length,
          concerts: concerts.length,
          news: news.length,
          quotes: quotes.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: '영상 인터뷰', value: stats.videoInterviews, link: '/admin/video-interviews', color: '#8b5cf6' },
    { label: '아티스트 서면 인터뷰', value: stats.artistInterviews, link: '/admin/artist-interviews', color: '#06b6d4' },
    { label: '저점 매수 인터뷰', value: stats.emergingInterviews, link: '/admin/emerging-interviews', color: '#f59e0b' },
    { label: '음반 추천', value: stats.albums, link: '/admin/album-recommendations', color: '#10b981' },
    { label: '음반 리뷰', value: stats.reviews, link: '/admin/album-reviews', color: '#ec4899' },
    { label: '공연 후기', value: stats.concerts, link: '/admin/concert-reviews', color: '#f97316' },
    { label: '뉴스', value: stats.news, link: '/admin/news', color: '#3b82f6' },
    { label: '오늘의 문장', value: stats.quotes, link: '/admin/quotes', color: '#6366f1' },
  ];

  const quickActions = [
    { label: '영상 인터뷰 추가', link: '/admin/video-interviews/new', icon: 'add' },
    { label: '음반 추천 추가', link: '/admin/album-recommendations/new', icon: 'add' },
    { label: '뉴스 추가', link: '/admin/news/new', icon: 'add' },
    { label: '에디터 관리', link: '/admin/editors', icon: 'users' },
    { label: '캐러셀 설정', link: '/admin/carousel', icon: 'settings' },
    { label: '사이트 보기', link: '/', icon: 'view' },
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>대시보드</h1>
        <p>내맘추 관리자 페이지에 오신 것을 환영합니다.</p>
      </header>

      <section className="stats-section">
        <h2>콘텐츠 현황</h2>
        {loading ? (
          <div className="stats-loading">로딩 중...</div>
        ) : (
          <div className="stats-grid">
            {statCards.map((stat) => (
              <Link 
                to={stat.link} 
                key={stat.label} 
                className="stat-card"
                style={{ '--accent-color': stat.color }}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="quick-actions-section">
        <h2>빠른 작업</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <Link 
              to={action.link} 
              key={action.label} 
              className="quick-action-card"
            >
              {action.icon === 'add' && (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              )}
              {action.icon === 'users' && (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              )}
              {action.icon === 'settings' && (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                </svg>
              )}
              {action.icon === 'view' && (
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              )}
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2>Supabase 설정 안내</h2>
        <div className="info-card">
          <p>
            현재 Mock 데이터 모드로 작동 중입니다. 실제 데이터베이스를 사용하려면:
          </p>
          <ol>
            <li><a href="https://supabase.com" target="_blank" rel="noopener noreferrer">Supabase</a>에서 새 프로젝트를 생성합니다.</li>
            <li>프로젝트의 SQL Editor에서 <code>supabase-schema.sql</code> 파일을 실행합니다.</li>
            <li><code>.env.example</code>을 <code>.env</code>로 복사하고 Supabase URL과 키를 입력합니다.</li>
            <li>개발 서버를 재시작합니다.</li>
          </ol>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
