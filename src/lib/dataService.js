import { supabase, isSupabaseConfigured } from './supabase';
import * as mockData from '../data/mockData';

const USE_MOCK = !isSupabaseConfigured();

const transformFromSupabase = {
  videoInterview: (item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist,
    youtubeId: item.youtube_id,
    thumbnail: item.thumbnail,
    date: item.date,
    views: item.views,
    description: item.description,
    editorId: item.editor_id,
  }),
  artistInterview: (item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist,
    artistImage: item.artist_image,
    coverImage: item.cover_image,
    date: item.date,
    category: item.category,
    excerpt: item.excerpt,
    questions: item.questions,
    editorId: item.editor_id,
  }),
  emergingArtistInterview: (item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist,
    artistImage: item.artist_image,
    coverImage: item.cover_image,
    date: item.date,
    category: item.category,
    followers: item.followers,
    excerpt: item.excerpt,
    questions: item.questions,
    editorId: item.editor_id,
  }),
  albumRecommendation: (item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist,
    cover: item.cover,
    releaseDate: item.release_date,
    genre: item.genre,
    rating: item.rating,
    tags: item.tags || [],
    description: item.description,
    trackList: item.track_list || [],
    review: item.review,
    editorId: item.editor_id,
  }),
  albumReview: (item) => ({
    id: item.id,
    albumId: item.album_id,
    title: item.title,
    author: item.author,
    date: item.date,
    coverImage: item.cover_image,
    content: item.content,
    rating: item.rating,
    editorId: item.editor_id,
  }),
  todayQuote: (item) => ({
    id: item.id,
    quote: item.quote,
    song: item.song,
    artist: item.artist,
    albumCover: item.album_cover,
    date: item.date,
    commentary: item.commentary,
    editorId: item.editor_id,
  }),
  weeklyNews: (item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist,
    image: item.image,
    date: item.date,
    releaseDate: item.release_date,
    genre: item.genre,
    content: item.content,
    tags: item.tags || [],
    editorId: item.editor_id,
  }),
  concertReview: (item) => ({
    id: item.id,
    title: item.title,
    artist: item.artist,
    venue: item.venue,
    date: item.date,
    author: item.author,
    authorImage: item.author_image,
    coverImage: item.cover_image,
    rating: item.rating,
    content: item.content,
    setlist: item.setlist || [],
    photos: item.photos || [],
    editorId: item.editor_id,
  }),
  editor: (item) => ({
    id: item.id,
    name: item.name,
    displayName: item.display_name,
    email: item.email,
    profileImage: item.profile_image,
    bio: item.bio,
    instagramUrl: item.instagram_url,
  }),
  featuredCarousel: (item) => ({
    id: item.id,
    contentType: item.content_type,
    contentId: item.content_id,
    displayOrder: item.display_order,
    title: item.title,
    subtitle: item.subtitle,
    imageUrl: item.image_url,
    linkUrl: item.link_url,
    isActive: item.is_active,
  }),
};

export const dataService = {
  async getVideoInterviews() {
    if (USE_MOCK) return mockData.videoInterviews;
    
    const { data, error } = await supabase
      .from('video_interviews')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.videoInterview);
  },

  async getVideoInterview(id) {
    if (USE_MOCK) return mockData.videoInterviews.find(v => v.id === parseInt(id));
    
    const { data, error } = await supabase
      .from('video_interviews')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.videoInterview(data);
  },

  async getArtistInterviews() {
    if (USE_MOCK) return mockData.artistInterviews;
    
    const { data, error } = await supabase
      .from('artist_interviews')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.artistInterview);
  },

  async getArtistInterview(id) {
    if (USE_MOCK) return mockData.artistInterviews.find(v => v.id === parseInt(id));
    
    const { data, error } = await supabase
      .from('artist_interviews')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.artistInterview(data);
  },

  async getEmergingArtistInterviews() {
    if (USE_MOCK) return mockData.emergingArtistInterviews;
    
    const { data, error } = await supabase
      .from('emerging_artist_interviews')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.emergingArtistInterview);
  },

  async getEmergingArtistInterview(id) {
    if (USE_MOCK) return mockData.emergingArtistInterviews.find(v => v.id === parseInt(id));
    
    const { data, error } = await supabase
      .from('emerging_artist_interviews')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.emergingArtistInterview(data);
  },

  async getAlbumRecommendations() {
    if (USE_MOCK) return mockData.albumRecommendations;
    
    const { data, error } = await supabase
      .from('album_recommendations')
      .select('*')
      .order('release_date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.albumRecommendation);
  },

  async getAlbumRecommendation(id) {
    if (USE_MOCK) return mockData.albumRecommendations.find(v => v.id === parseInt(id));
    
    const { data, error } = await supabase
      .from('album_recommendations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.albumRecommendation(data);
  },

  async getAlbumReviews() {
    if (USE_MOCK) return mockData.albumReviews;
    
    const { data, error } = await supabase
      .from('album_reviews')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.albumReview);
  },

  async getAlbumReview(id) {
    if (USE_MOCK) return mockData.albumReviews.find(v => v.id === parseInt(id));
    
    const { data, error } = await supabase
      .from('album_reviews')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.albumReview(data);
  },

  async getTodayQuotes() {
    if (USE_MOCK) return mockData.todayQuotes;
    
    const { data, error } = await supabase
      .from('today_quotes')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.todayQuote);
  },

  async getWeeklyNews() {
    if (USE_MOCK) return mockData.weeklyNewReleases;
    
    const { data, error } = await supabase
      .from('weekly_news')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.weeklyNews);
  },

  async getNewsItem(id) {
    if (USE_MOCK) return mockData.weeklyNewReleases.find(v => v.id === parseInt(id));
    
    const { data, error } = await supabase
      .from('weekly_news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.weeklyNews(data);
  },

  async getConcertReviews() {
    if (USE_MOCK) return mockData.concertReviews;
    
    const { data, error } = await supabase
      .from('concert_reviews')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data.map(transformFromSupabase.concertReview);
  },

  async getConcertReview(id) {
    if (USE_MOCK) return mockData.concertReviews.find(v => v.id === parseInt(id));
    
    const { data, error } = await supabase
      .from('concert_reviews')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.concertReview(data);
  },

  async getEditors() {
    if (USE_MOCK) {
      return [
        { id: 1, name: '백', displayName: '에디터 백', bio: '', profileImage: null },
        { id: 2, name: '이은영', displayName: '에디터 이은영', bio: '', profileImage: null },
        { id: 3, name: '성진', displayName: '에디터 성진', bio: '', profileImage: null },
      ];
    }
    
    const { data, error } = await supabase
      .from('editors')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data.map(transformFromSupabase.editor);
  },

  async getEditor(id) {
    if (USE_MOCK) {
      const editors = [
        { id: 1, name: '백', displayName: '에디터 백', bio: '', profileImage: null },
        { id: 2, name: '이은영', displayName: '에디터 이은영', bio: '', profileImage: null },
        { id: 3, name: '성진', displayName: '에디터 성진', bio: '', profileImage: null },
      ];
      return editors.find(e => e.id === parseInt(id));
    }
    
    const { data, error } = await supabase
      .from('editors')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return transformFromSupabase.editor(data);
  },

  async getEditorContent(editorId) {
    if (USE_MOCK) {
      return {
        videoInterviews: [],
        artistInterviews: [],
        emergingArtistInterviews: [],
        albumRecommendations: [],
        albumReviews: [],
        concertReviews: [],
      };
    }

    const [
      videoInterviews,
      artistInterviews,
      emergingArtistInterviews,
      albumRecommendations,
      albumReviews,
      concertReviews,
    ] = await Promise.all([
      supabase.from('video_interviews').select('*').eq('editor_id', editorId),
      supabase.from('artist_interviews').select('*').eq('editor_id', editorId),
      supabase.from('emerging_artist_interviews').select('*').eq('editor_id', editorId),
      supabase.from('album_recommendations').select('*').eq('editor_id', editorId),
      supabase.from('album_reviews').select('*').eq('editor_id', editorId),
      supabase.from('concert_reviews').select('*').eq('editor_id', editorId),
    ]);

    return {
      videoInterviews: (videoInterviews.data || []).map(transformFromSupabase.videoInterview),
      artistInterviews: (artistInterviews.data || []).map(transformFromSupabase.artistInterview),
      emergingArtistInterviews: (emergingArtistInterviews.data || []).map(transformFromSupabase.emergingArtistInterview),
      albumRecommendations: (albumRecommendations.data || []).map(transformFromSupabase.albumRecommendation),
      albumReviews: (albumReviews.data || []).map(transformFromSupabase.albumReview),
      concertReviews: (concertReviews.data || []).map(transformFromSupabase.concertReview),
    };
  },

  async getFeaturedCarousel() {
    if (USE_MOCK) {
      return mockData.videoInterviews.slice(0, 5).map((item, index) => ({
        id: item.id,
        contentType: 'video_interview',
        contentId: item.id,
        displayOrder: index,
        title: item.title,
        subtitle: item.artist,
        imageUrl: item.thumbnail,
        linkUrl: '/interview/video',
        isActive: true,
      }));
    }
    
    const { data, error } = await supabase
      .from('featured_carousel')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    if (error) throw error;
    return data.map(transformFromSupabase.featuredCarousel);
  },

  async getSiteSettings() {
    if (USE_MOCK) {
      return {
        siteTitle: '내맘추(내맘대로 추천하는 이주의 음반)',
        siteTagline: '내 마음대로 추천하는 인디음악 매거진',
        instagramUrl: 'https://www.instagram.com/rec.o_mag',
        youtubeUrl: 'https://www.youtube.com/@recommend.weekly_music',
        contactEmail: 'bds0129@naver.com',
      };
    }
    
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');
    
    if (error) throw error;
    
    const settings = {};
    data.forEach(item => {
      const key = item.setting_key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      settings[key] = item.setting_value;
    });
    return settings;
  },

  async search(query) {
    if (!query || query.trim().length < 2) return [];
    
    const searchTerm = query.toLowerCase().trim();
    
    if (USE_MOCK) {
      const results = [];
      
      mockData.videoInterviews.forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm) || 
            item.artist.toLowerCase().includes(searchTerm) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))) {
          results.push({ type: 'video_interview', data: item });
        }
      });
      
      mockData.artistInterviews.forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm) || 
            item.artist.toLowerCase().includes(searchTerm) ||
            (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm))) {
          results.push({ type: 'artist_interview', data: item });
        }
      });
      
      mockData.emergingArtistInterviews.forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm) || 
            item.artist.toLowerCase().includes(searchTerm) ||
            (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm))) {
          results.push({ type: 'emerging_artist_interview', data: item });
        }
      });
      
      mockData.albumRecommendations.forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm) || 
            item.artist.toLowerCase().includes(searchTerm) ||
            (item.description && item.description.toLowerCase().includes(searchTerm))) {
          results.push({ type: 'album_recommendation', data: item });
        }
      });
      
      mockData.weeklyNewReleases.forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm) || 
            (item.artist && item.artist.toLowerCase().includes(searchTerm)) ||
            (item.content && item.content.toLowerCase().includes(searchTerm))) {
          results.push({ type: 'news', data: item });
        }
      });
      
      mockData.concertReviews.forEach(item => {
        if (item.title.toLowerCase().includes(searchTerm) || 
            item.artist.toLowerCase().includes(searchTerm) ||
            (item.content && item.content.toLowerCase().includes(searchTerm))) {
          results.push({ type: 'concert_review', data: item });
        }
      });
      
      return results;
    }

    const searchPattern = `%${searchTerm}%`;
    
    const [
      videoInterviews,
      artistInterviews,
      emergingArtistInterviews,
      albumRecommendations,
      weeklyNews,
      concertReviews,
    ] = await Promise.all([
      supabase.from('video_interviews').select('*').or(`title.ilike.${searchPattern},artist.ilike.${searchPattern},description.ilike.${searchPattern}`),
      supabase.from('artist_interviews').select('*').or(`title.ilike.${searchPattern},artist.ilike.${searchPattern},excerpt.ilike.${searchPattern}`),
      supabase.from('emerging_artist_interviews').select('*').or(`title.ilike.${searchPattern},artist.ilike.${searchPattern},excerpt.ilike.${searchPattern}`),
      supabase.from('album_recommendations').select('*').or(`title.ilike.${searchPattern},artist.ilike.${searchPattern},description.ilike.${searchPattern}`),
      supabase.from('weekly_news').select('*').or(`title.ilike.${searchPattern},artist.ilike.${searchPattern},content.ilike.${searchPattern}`),
      supabase.from('concert_reviews').select('*').or(`title.ilike.${searchPattern},artist.ilike.${searchPattern},content.ilike.${searchPattern}`),
    ]);

    const results = [];
    
    (videoInterviews.data || []).forEach(item => {
      results.push({ type: 'video_interview', data: transformFromSupabase.videoInterview(item) });
    });
    
    (artistInterviews.data || []).forEach(item => {
      results.push({ type: 'artist_interview', data: transformFromSupabase.artistInterview(item) });
    });
    
    (emergingArtistInterviews.data || []).forEach(item => {
      results.push({ type: 'emerging_artist_interview', data: transformFromSupabase.emergingArtistInterview(item) });
    });
    
    (albumRecommendations.data || []).forEach(item => {
      results.push({ type: 'album_recommendation', data: transformFromSupabase.albumRecommendation(item) });
    });
    
    (weeklyNews.data || []).forEach(item => {
      results.push({ type: 'news', data: transformFromSupabase.weeklyNews(item) });
    });
    
    (concertReviews.data || []).forEach(item => {
      results.push({ type: 'concert_review', data: transformFromSupabase.concertReview(item) });
    });

    return results;
  },
};

export default dataService;
