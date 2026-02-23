-- REC.O 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요

-- 1. 에디터(작성자) 테이블
CREATE TABLE editors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  display_name VARCHAR(100) NOT NULL, -- 예: '에디터 백'
  email VARCHAR(255),
  profile_image TEXT,
  bio TEXT,
  instagram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 영상 인터뷰 테이블
CREATE TABLE video_interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  youtube_id VARCHAR(50),
  thumbnail TEXT,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  description TEXT,
  editor_id UUID REFERENCES editors(id),
  is_featured BOOLEAN DEFAULT FALSE, -- 메인 캐러셀용
  featured_order INTEGER, -- 캐러셀 순서
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 아티스트 서면 인터뷰 테이블
CREATE TABLE artist_interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  artist_image TEXT,
  cover_image TEXT,
  date DATE NOT NULL,
  category VARCHAR(100),
  excerpt TEXT,
  questions JSONB NOT NULL, -- [{q: "질문", a: "답변"}, ...]
  editor_id UUID REFERENCES editors(id),
  is_featured BOOLEAN DEFAULT FALSE,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 저점 매수 아티스트 인터뷰 테이블
CREATE TABLE emerging_artist_interviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  artist_image TEXT,
  cover_image TEXT,
  date DATE NOT NULL,
  category VARCHAR(100),
  followers INTEGER DEFAULT 0,
  excerpt TEXT,
  questions JSONB NOT NULL,
  editor_id UUID REFERENCES editors(id),
  is_featured BOOLEAN DEFAULT FALSE,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 음반 추천 테이블
CREATE TABLE album_recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  cover TEXT,
  release_date DATE,
  genre VARCHAR(100),
  rating DECIMAL(3,1) DEFAULT 0,
  tags TEXT[], -- 배열로 저장
  description TEXT,
  track_list TEXT[], -- 배열로 저장
  review TEXT,
  editor_id UUID REFERENCES editors(id),
  is_featured BOOLEAN DEFAULT FALSE,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 음반 리뷰 테이블
CREATE TABLE album_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID REFERENCES album_recommendations(id),
  title VARCHAR(500) NOT NULL,
  author VARCHAR(200),
  date DATE NOT NULL,
  cover_image TEXT,
  content TEXT NOT NULL,
  rating DECIMAL(3,1) DEFAULT 0,
  editor_id UUID REFERENCES editors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 오늘, 이 문장 테이블
CREATE TABLE today_quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  song VARCHAR(300) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  album_cover TEXT,
  date DATE NOT NULL,
  commentary TEXT,
  editor_id UUID REFERENCES editors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. 이주의 신곡 소식 테이블
CREATE TABLE weekly_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  artist VARCHAR(200),
  image TEXT,
  date DATE NOT NULL,
  release_date DATE,
  genre VARCHAR(100),
  content TEXT NOT NULL,
  tags TEXT[],
  editor_id UUID REFERENCES editors(id),
  is_featured BOOLEAN DEFAULT FALSE,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. 공연 후기 테이블
CREATE TABLE concert_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  artist VARCHAR(200) NOT NULL,
  venue VARCHAR(300),
  date DATE NOT NULL,
  author VARCHAR(200),
  author_image TEXT,
  cover_image TEXT,
  rating DECIMAL(3,1) DEFAULT 0,
  content TEXT NOT NULL,
  setlist TEXT[],
  photos TEXT[],
  editor_id UUID REFERENCES editors(id),
  is_featured BOOLEAN DEFAULT FALSE,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. 페스티벌 뉴스 테이블
CREATE TABLE festival_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  image TEXT,
  date DATE NOT NULL,
  event_date VARCHAR(100),
  venue VARCHAR(300),
  content TEXT NOT NULL,
  tags TEXT[],
  editor_id UUID REFERENCES editors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. 메인 캐러셀 설정 테이블 (어드민에서 직접 선택)
CREATE TABLE featured_carousel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type VARCHAR(50) NOT NULL, -- 'video_interview', 'artist_interview', 'album', etc.
  content_id UUID NOT NULL,
  display_order INTEGER NOT NULL,
  title VARCHAR(500), -- 커스텀 제목 (선택적)
  subtitle VARCHAR(500), -- 커스텀 부제목 (선택적)
  image_url TEXT, -- 커스텀 이미지 (선택적)
  link_url VARCHAR(500), -- 이동할 URL
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 12. 사이트 설정 테이블
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 기본 설정값 삽입
INSERT INTO site_settings (setting_key, setting_value) VALUES
  ('site_title', '내맘추(내맘대로 추천하는 이주의 음반)'),
  ('site_tagline', '내 마음대로 추천하는 인디음악 매거진'),
  ('instagram_url', 'https://www.instagram.com/rec.o_mag'),
  ('youtube_url', 'https://www.youtube.com/@recommend.weekly_music'),
  ('contact_email', 'bds0129@naver.com');

-- 인덱스 생성 (검색 성능 향상)
CREATE INDEX idx_video_interviews_date ON video_interviews(date DESC);
CREATE INDEX idx_video_interviews_artist ON video_interviews(artist);
CREATE INDEX idx_artist_interviews_date ON artist_interviews(date DESC);
CREATE INDEX idx_artist_interviews_artist ON artist_interviews(artist);
CREATE INDEX idx_album_recommendations_date ON album_recommendations(release_date DESC);
CREATE INDEX idx_weekly_news_date ON weekly_news(date DESC);
CREATE INDEX idx_concert_reviews_date ON concert_reviews(date DESC);
CREATE INDEX idx_featured_carousel_order ON featured_carousel(display_order) WHERE is_active = TRUE;

-- 전체 텍스트 검색을 위한 인덱스
CREATE INDEX idx_video_interviews_search ON video_interviews 
  USING GIN (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(artist, '') || ' ' || coalesce(description, '')));
  
CREATE INDEX idx_artist_interviews_search ON artist_interviews 
  USING GIN (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(artist, '') || ' ' || coalesce(excerpt, '')));

CREATE INDEX idx_album_recommendations_search ON album_recommendations 
  USING GIN (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(artist, '') || ' ' || coalesce(description, '')));

-- Row Level Security (RLS) 활성화
ALTER TABLE editors ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE emerging_artist_interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE album_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE today_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE concert_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE festival_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_carousel ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 읽기 정책 (모든 사용자 허용)
CREATE POLICY "Public read access" ON editors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON video_interviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON artist_interviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON emerging_artist_interviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON album_recommendations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON album_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON today_quotes FOR SELECT USING (true);
CREATE POLICY "Public read access" ON weekly_news FOR SELECT USING (true);
CREATE POLICY "Public read access" ON concert_reviews FOR SELECT USING (true);
CREATE POLICY "Public read access" ON festival_news FOR SELECT USING (true);
CREATE POLICY "Public read access" ON featured_carousel FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_settings FOR SELECT USING (true);

-- 쓰기 정책 (인증된 사용자만)
CREATE POLICY "Authenticated write access" ON editors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON video_interviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON artist_interviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON emerging_artist_interviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON album_recommendations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON album_reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON today_quotes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON weekly_news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON concert_reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON festival_news FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON featured_carousel FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated write access" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- updated_at 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 모든 테이블에 트리거 적용
CREATE TRIGGER update_editors_updated_at BEFORE UPDATE ON editors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_video_interviews_updated_at BEFORE UPDATE ON video_interviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_artist_interviews_updated_at BEFORE UPDATE ON artist_interviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_emerging_artist_interviews_updated_at BEFORE UPDATE ON emerging_artist_interviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_album_recommendations_updated_at BEFORE UPDATE ON album_recommendations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_album_reviews_updated_at BEFORE UPDATE ON album_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_today_quotes_updated_at BEFORE UPDATE ON today_quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_weekly_news_updated_at BEFORE UPDATE ON weekly_news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_concert_reviews_updated_at BEFORE UPDATE ON concert_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_festival_news_updated_at BEFORE UPDATE ON festival_news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_featured_carousel_updated_at BEFORE UPDATE ON featured_carousel FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 기본 에디터 3명 추가 (프로필은 나중에 업데이트)
INSERT INTO editors (name, display_name, bio) VALUES
  ('백', '에디터 백', ''),
  ('이은영', '에디터 이은영', ''),
  ('성진', '에디터 성진', '');
