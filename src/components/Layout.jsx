import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { dataService } from '../lib/dataService';
import './Layout.css';

const menuItems = [
  {
    title: '내맘추 인터뷰',
    items: [
      { name: '아티스트 영상 인터뷰', path: '/interview/video' },
      { name: '아티스트 서면 인터뷰', path: '/interview/artist' },
      { name: '저점 매수 아티스트 인터뷰', path: '/interview/emerging' },
    ],
  },
  {
    title: '내맘추 추천 음반',
    items: [
      { name: '음반 추천', path: '/albums/recommendations' },
      { name: '음반 소개를 소개합니다.', path: '/albums/reviews' },
      { name: '오늘, 이 문장', path: '/albums/quotes' },
    ],
  },
  {
    title: '내맘추 뉴스',
    items: [
      { name: '이주의 신곡 소식', path: '/news/weekly' },
    ],
  },
  {
    title: '내맘추 후기',
    items: [
      { name: '공연 후기', path: '/reviews/concert' },
    ],
  },
  {
    title: '내맘추 에디터',
    items: [
      { name: '에디터 백', path: '/editor/1' },
      { name: '에디터 이은영', path: '/editor/2' },
      { name: '에디터 성진', path: '/editor/3' },
    ],
  },
];

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      
      setIsSearching(true);
      try {
        const results = await dataService.search(searchQuery);
        setSearchResults(results.slice(0, 10));
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const getResultLink = (result) => {
    switch (result.type) {
      case 'video_interview': return '/interview/video';
      case 'artist_interview': return `/interview/artist/${result.data.id}`;
      case 'emerging_artist_interview': return `/interview/emerging/${result.data.id}`;
      case 'album_recommendation': return `/albums/recommendations/${result.data.id}`;
      case 'news': return `/news/${result.data.id}`;
      case 'concert_review': return `/reviews/concert/${result.data.id}`;
      default: return '/';
    }
  };

  const getResultType = (type) => {
    switch (type) {
      case 'video_interview': return '영상 인터뷰';
      case 'artist_interview': return '아티스트 서면 인터뷰';
      case 'emerging_artist_interview': return '저점 매수 인터뷰';
      case 'album_recommendation': return '음반 추천';
      case 'news': return '뉴스';
      case 'concert_review': return '공연 후기';
      default: return '';
    }
  };

  const handleResultClick = (link) => {
    navigate(link);
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo" onClick={closeMenu}>
              <img src="/logo.svg" alt="REC.O WEEKLY" className="logo-image" />
            </Link>
            <div className="header-social">
              <a href="https://www.instagram.com/rec.o_mag" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@recommend.weekly_music" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="mailto:bds0129@naver.com" aria-label="Email">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            {menuItems.map((menu, index) => (
              <div
                key={index}
                className={`nav-item ${activeDropdown === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="nav-title"
                  onClick={() => toggleDropdown(index)}
                >
                  {menu.title}
                  <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M7 10l5 5 5-5z" />
                  </svg>
                </button>
                <div className="dropdown">
                  {menu.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className={`dropdown-item ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <button className="search-btn" onClick={toggleSearch} aria-label="검색">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <button
              className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="메뉴 열기"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="search-overlay">
            <div className="search-container">
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-close" onClick={toggleSearch}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            {isSearching && <div className="search-loading">검색 중...</div>}
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    className="search-result-item"
                    onClick={() => handleResultClick(getResultLink(result))}
                  >
                    <span className="search-result-type">{getResultType(result.type)}</span>
                    <span className="search-result-title">{result.data.title}</span>
                    {result.data.artist && (
                      <span className="search-result-artist">{result.data.artist}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
            {searchQuery.length >= 2 && !isSearching && searchResults.length === 0 && (
              <div className="search-no-results">검색 결과가 없습니다.</div>
            )}
          </div>
        )}
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/logo.svg" alt="REC.O WEEKLY" className="footer-logo-image" />
            <p className="footer-tagline">내맘추(내맘대로 추천하는 이주의 음반)</p>
          </div>
          <div className="footer-links">
            <a href="https://www.instagram.com/rec.o_mag" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@recommend.weekly_music" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="mailto:bds0129@naver.com">Contact</a>
          </div>
          <p className="footer-copyright">© 2025 내맘추. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

