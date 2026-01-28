import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

const menuItems = [
  {
    title: '내맘추 인터뷰',
    items: [
      { name: '영상 인터뷰', path: '/interview/video' },
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
];

function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/logo.svg" alt="REC.O WEEKLY" className="logo-image" />
          </Link>

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
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/logo.svg" alt="REC.O WEEKLY" className="footer-logo-image" />
            <p className="footer-tagline">내 마음대로 추천하는 인디음악 매거진</p>
          </div>
          <div className="footer-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="mailto:contact@naemamchu.com">Contact</a>
          </div>
          <p className="footer-copyright">© 2025 내맘추. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;

