import { useState, useEffect } from 'react';
import { dataService } from '../../lib/dataService';
import './CarouselManagement.css';

function CarouselManagement() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        carousel,
        videoInterviews,
        artistInterviews,
        emergingInterviews,
        albums,
        news,
      ] = await Promise.all([
        dataService.getFeaturedCarousel(),
        dataService.getVideoInterviews(),
        dataService.getArtistInterviews(),
        dataService.getEmergingArtistInterviews(),
        dataService.getAlbumRecommendations(),
        dataService.getWeeklyNews(),
      ]);

      setCarouselItems(carousel);

      const content = [
        ...videoInterviews.map(item => ({
          ...item,
          type: 'video_interview',
          typeLabel: '영상 인터뷰',
          image: item.thumbnail,
        })),
        ...artistInterviews.map(item => ({
          ...item,
          type: 'artist_interview',
          typeLabel: '아티스트 서면 인터뷰',
          image: item.coverImage,
        })),
        ...emergingInterviews.map(item => ({
          ...item,
          type: 'emerging_interview',
          typeLabel: '저점 매수 인터뷰',
          image: item.coverImage,
        })),
        ...albums.map(item => ({
          ...item,
          type: 'album',
          typeLabel: '음반 추천',
          image: item.cover,
        })),
        ...news.map(item => ({
          ...item,
          type: 'news',
          typeLabel: '뉴스',
          image: item.image,
        })),
      ];

      setAllContent(content);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCarousel = () => {
    if (!selectedContent) return;

    const content = allContent.find(c => `${c.type}-${c.id}` === selectedContent);
    if (!content) return;

    const newItem = {
      id: Date.now(),
      contentType: content.type,
      contentId: content.id,
      displayOrder: carouselItems.length,
      title: content.title,
      subtitle: content.artist,
      imageUrl: content.image,
      linkUrl: getContentLink(content),
      isActive: true,
    };

    setCarouselItems([...carouselItems, newItem]);
    setSelectedContent(null);
    alert('Supabase가 설정되면 저장됩니다. 현재는 Mock 데이터 모드입니다.');
  };

  const handleRemove = (id) => {
    setCarouselItems(carouselItems.filter(item => item.id !== id));
    alert('Supabase가 설정되면 저장됩니다. 현재는 Mock 데이터 모드입니다.');
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newItems = [...carouselItems];
    [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
    setCarouselItems(newItems);
  };

  const handleMoveDown = (index) => {
    if (index === carouselItems.length - 1) return;
    const newItems = [...carouselItems];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setCarouselItems(newItems);
  };

  const getContentLink = (content) => {
    switch (content.type) {
      case 'video_interview': return '/interview/video';
      case 'artist_interview': return `/interview/artist/${content.id}`;
      case 'emerging_interview': return `/interview/emerging/${content.id}`;
      case 'album': return `/albums/recommendations/${content.id}`;
      case 'news': return `/news/${content.id}`;
      default: return '/';
    }
  };

  if (loading) {
    return (
      <div className="carousel-management">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="carousel-management">
      <header className="page-header">
        <h1>메인 캐러셀 관리</h1>
        <p>메인 페이지에 표시될 캐러셀 콘텐츠를 선택하고 순서를 조정하세요. (최대 5개)</p>
      </header>

      <div className="carousel-content">
        <div className="carousel-preview">
          <h2>현재 캐러셀 ({carouselItems.length}/5)</h2>
          {carouselItems.length === 0 ? (
            <div className="empty-message">
              캐러셀에 추가된 콘텐츠가 없습니다.
            </div>
          ) : (
            <div className="carousel-list">
              {carouselItems.map((item, index) => (
                <div key={item.id} className="carousel-item">
                  <span className="item-order">{index + 1}</span>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="item-image" />
                  )}
                  <div className="item-info">
                    <h4>{item.title}</h4>
                    <p>{item.subtitle}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      title="위로"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                      </svg>
                    </button>
                    <button 
                      className="action-btn"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === carouselItems.length - 1}
                      title="아래로"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
                      </svg>
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleRemove(item.id)}
                      title="삭제"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="carousel-selector">
          <h2>콘텐츠 추가</h2>
          <div className="selector-form">
            <select 
              value={selectedContent || ''} 
              onChange={(e) => setSelectedContent(e.target.value)}
              disabled={carouselItems.length >= 5}
            >
              <option value="">콘텐츠를 선택하세요</option>
              {allContent
                .filter(c => !carouselItems.find(item => 
                  item.contentType === c.type && item.contentId === c.id
                ))
                .map(content => (
                  <option key={`${content.type}-${content.id}`} value={`${content.type}-${content.id}`}>
                    [{content.typeLabel}] {content.title}
                  </option>
                ))
              }
            </select>
            <button 
              className="add-btn"
              onClick={handleAddToCarousel}
              disabled={!selectedContent || carouselItems.length >= 5}
            >
              추가
            </button>
          </div>
          {carouselItems.length >= 5 && (
            <p className="limit-message">최대 5개까지 추가할 수 있습니다.</p>
          )}
        </div>
      </div>

      <div className="info-notice">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <p>
          캐러셀은 메인 페이지 상단 오른쪽에 표시됩니다. 5초마다 자동으로 다음 콘텐츠로 넘어갑니다.
        </p>
      </div>
    </div>
  );
}

export default CarouselManagement;
