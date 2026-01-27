import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import VideoInterviews from './pages/VideoInterviews';
import ArtistInterviews from './pages/ArtistInterviews';
import ArtistInterviewDetail from './pages/ArtistInterviewDetail';
import EmergingArtistInterviews from './pages/EmergingArtistInterviews';
import EmergingArtistInterviewDetail from './pages/EmergingArtistInterviewDetail';
import AlbumRecommendations from './pages/AlbumRecommendations';
import AlbumReviews from './pages/AlbumReviews';
import AlbumReviewDetail from './pages/AlbumReviewDetail';
import TodayQuotes from './pages/TodayQuotes';
import WeeklyNews from './pages/WeeklyNews';
import NewsDetail from './pages/NewsDetail';
import ConcertReviews from './pages/ConcertReviews';
import ConcertReviewDetail from './pages/ConcertReviewDetail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* 인터뷰 */}
          <Route path="interview/video" element={<VideoInterviews />} />
          <Route path="interview/artist" element={<ArtistInterviews />} />
          <Route path="interview/artist/:id" element={<ArtistInterviewDetail />} />
          <Route path="interview/emerging" element={<EmergingArtistInterviews />} />
          <Route path="interview/emerging/:id" element={<EmergingArtistInterviewDetail />} />
          {/* 음반 */}
          <Route path="albums/recommendations" element={<AlbumRecommendations />} />
          <Route path="albums/reviews" element={<AlbumReviews />} />
          <Route path="albums/reviews/:id" element={<AlbumReviewDetail />} />
          <Route path="albums/quotes" element={<TodayQuotes />} />
          {/* 뉴스 */}
          <Route path="news/weekly" element={<WeeklyNews />} />
          <Route path="news/:id" element={<NewsDetail />} />
          {/* 후기 */}
          <Route path="reviews/concert" element={<ConcertReviews />} />
          <Route path="reviews/concert/:id" element={<ConcertReviewDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
