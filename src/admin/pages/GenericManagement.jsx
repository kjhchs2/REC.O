import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AdminTable from '../components/AdminTable';
import AdminForm from '../components/AdminForm';
import './ContentManagement.css';

const contentConfigs = {
  'video-interviews': {
    title: '영상 인터뷰',
    table: 'video_interviews',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'artist', label: '아티스트' },
      { key: 'date', label: '날짜' },
      { key: 'views', label: '조회수' },
    ],
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'artist', label: '아티스트', type: 'text', required: true },
      { name: 'youtube_id', label: 'YouTube URL 또는 ID', type: 'youtube', placeholder: 'https://www.youtube.com/watch?v=... 또는 ID만 입력' },
      { name: 'thumbnail', label: '썸네일 URL', type: 'text' },
      { name: 'date', label: '날짜', type: 'date', required: true },
      { name: 'views', label: '조회수', type: 'number', defaultValue: 0 },
      { name: 'description', label: '설명', type: 'textarea', fullWidth: true },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'date', ascending: false },
  },
  'artist-interviews': {
    title: '아티스트 서면 인터뷰',
    table: 'artist_interviews',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'artist', label: '아티스트' },
      { key: 'category', label: '카테고리' },
      { key: 'date', label: '날짜' },
    ],
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'artist', label: '아티스트', type: 'text', required: true },
      { name: 'artist_image', label: '아티스트 이미지 URL', type: 'text' },
      { name: 'cover_image', label: '커버 이미지 URL', type: 'text' },
      { name: 'date', label: '날짜', type: 'date', required: true },
      { name: 'category', label: '카테고리', type: 'text' },
      { name: 'excerpt', label: '요약', type: 'textarea' },
      { name: 'questions', label: '인터뷰 Q&A (JSON)', type: 'json', fullWidth: true, placeholder: '[{"q": "질문", "a": "답변"}]' },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'date', ascending: false },
  },
  'emerging-interviews': {
    title: '저점 매수 인터뷰',
    table: 'emerging_artist_interviews',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'artist', label: '아티스트' },
      { key: 'followers', label: '팔로워' },
      { key: 'date', label: '날짜' },
    ],
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'artist', label: '아티스트', type: 'text', required: true },
      { name: 'artist_image', label: '아티스트 이미지 URL', type: 'text' },
      { name: 'cover_image', label: '커버 이미지 URL', type: 'text' },
      { name: 'date', label: '날짜', type: 'date', required: true },
      { name: 'category', label: '카테고리', type: 'text' },
      { name: 'followers', label: '팔로워 수', type: 'number', defaultValue: 0 },
      { name: 'excerpt', label: '요약', type: 'textarea' },
      { name: 'questions', label: '인터뷰 Q&A (JSON)', type: 'json', fullWidth: true, placeholder: '[{"q": "질문", "a": "답변"}]' },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'date', ascending: false },
  },
  'album-recommendations': {
    title: '음반 추천',
    table: 'album_recommendations',
    columns: [
      { key: 'title', label: '앨범명' },
      { key: 'artist', label: '아티스트' },
      { key: 'genre', label: '장르' },
      { key: 'rating', label: '평점' },
    ],
    fields: [
      { name: 'title', label: '앨범명', type: 'text', required: true },
      { name: 'artist', label: '아티스트', type: 'text', required: true },
      { name: 'cover', label: '커버 이미지 URL', type: 'text' },
      { name: 'release_date', label: '발매일', type: 'date' },
      { name: 'genre', label: '장르', type: 'text' },
      { name: 'rating', label: '평점', type: 'number', min: 0, max: 10, step: 0.1 },
      { name: 'tags', label: '태그 (한 줄에 하나씩)', type: 'array' },
      { name: 'description', label: '설명', type: 'textarea', fullWidth: true },
      { name: 'track_list', label: '트랙리스트 (한 줄에 하나씩)', type: 'array' },
      { name: 'review', label: '리뷰', type: 'textarea', fullWidth: true },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'release_date', ascending: false },
  },
  'album-reviews': {
    title: '음반 리뷰',
    table: 'album_reviews',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'author', label: '작성자' },
      { key: 'rating', label: '평점' },
      { key: 'date', label: '날짜' },
    ],
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'author', label: '작성자', type: 'text' },
      { name: 'date', label: '날짜', type: 'date', required: true },
      { name: 'cover_image', label: '커버 이미지 URL', type: 'text' },
      { name: 'content', label: '내용', type: 'textarea', fullWidth: true, required: true },
      { name: 'rating', label: '평점', type: 'number', min: 0, max: 10, step: 0.1 },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'date', ascending: false },
  },
  'quotes': {
    title: '오늘의 문장',
    table: 'today_quotes',
    columns: [
      { key: 'quote', label: '문장', render: (v) => v?.substring(0, 50) + '...' },
      { key: 'song', label: '곡' },
      { key: 'artist', label: '아티스트' },
      { key: 'date', label: '날짜' },
    ],
    fields: [
      { name: 'quote', label: '문장', type: 'textarea', required: true },
      { name: 'song', label: '곡명', type: 'text', required: true },
      { name: 'artist', label: '아티스트', type: 'text', required: true },
      { name: 'album_cover', label: '앨범 커버 URL', type: 'text' },
      { name: 'date', label: '날짜', type: 'date', required: true },
      { name: 'commentary', label: '코멘터리', type: 'textarea', fullWidth: true },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'date', ascending: false },
  },
  'news': {
    title: '뉴스',
    table: 'weekly_news',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'artist', label: '아티스트' },
      { key: 'genre', label: '장르' },
      { key: 'date', label: '날짜' },
    ],
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'artist', label: '아티스트', type: 'text' },
      { name: 'image', label: '이미지 URL', type: 'text' },
      { name: 'date', label: '날짜', type: 'date', required: true },
      { name: 'release_date', label: '발매일', type: 'date' },
      { name: 'genre', label: '장르', type: 'text' },
      { name: 'content', label: '내용', type: 'textarea', fullWidth: true, required: true },
      { name: 'tags', label: '태그 (한 줄에 하나씩)', type: 'array' },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'date', ascending: false },
  },
  'concert-reviews': {
    title: '공연 후기',
    table: 'concert_reviews',
    columns: [
      { key: 'title', label: '제목' },
      { key: 'artist', label: '아티스트' },
      { key: 'venue', label: '공연장' },
      { key: 'date', label: '날짜' },
    ],
    fields: [
      { name: 'title', label: '제목', type: 'text', required: true },
      { name: 'artist', label: '아티스트', type: 'text', required: true },
      { name: 'venue', label: '공연장', type: 'text' },
      { name: 'date', label: '날짜', type: 'date', required: true },
      { name: 'author', label: '작성자', type: 'text' },
      { name: 'author_image', label: '작성자 이미지 URL', type: 'text' },
      { name: 'cover_image', label: '커버 이미지 URL', type: 'text' },
      { name: 'rating', label: '평점', type: 'number', min: 0, max: 10, step: 0.1 },
      { name: 'content', label: '내용', type: 'textarea', fullWidth: true, required: true },
      { name: 'setlist', label: '셋리스트 (한 줄에 하나씩)', type: 'array' },
      { name: 'photos', label: '사진 URL (한 줄에 하나씩)', type: 'array' },
      { name: 'editor_id', label: '에디터', type: 'select', options: [] },
    ],
    orderBy: { column: 'date', ascending: false },
  },
  'settings': {
    title: '사이트 설정',
    table: 'site_settings',
    columns: [
      { key: 'setting_key', label: '설정 키' },
      { key: 'setting_value', label: '값' },
    ],
    fields: [
      { name: 'setting_key', label: '설정 키', type: 'text', required: true },
      { name: 'setting_value', label: '값', type: 'textarea', required: true },
    ],
    orderBy: { column: 'setting_key', ascending: true },
  },
};

function GenericList({ config, basePath }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [config]);

  const fetchData = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from(config.table)
      .select('*')
      .order(config.orderBy.column, { ascending: config.orderBy.ascending });

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setData(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    if (!supabase) return;

    const { error } = await supabase
      .from(config.table)
      .delete()
      .eq('id', id);

    if (error) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(error);
    } else {
      fetchData();
    }
  };

  return (
    <div className="content-management">
      <AdminTable
        title={config.title + ' 관리'}
        columns={config.columns}
        data={data}
        loading={loading}
        onDelete={handleDelete}
        basePath={basePath}
        emptyMessage={`등록된 ${config.title}이(가) 없습니다.`}
      />
    </div>
  );
}

function GenericForm({ config, basePath }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({});
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(!!id);
  const isEdit = id && id !== 'new';

  useEffect(() => {
    fetchEditors();
    if (isEdit) {
      fetchItem();
    }
  }, [id]);

  const fetchEditors = async () => {
    if (!supabase) return;

    const { data } = await supabase
      .from('editors')
      .select('id, display_name')
      .order('name');

    if (data) {
      setEditors(data);
    }
  };

  const fetchItem = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from(config.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching item:', error);
      navigate(basePath);
    } else {
      setInitialData(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (formData) => {
    if (!supabase) {
      throw new Error('Supabase가 설정되지 않았습니다.');
    }

    if (isEdit) {
      const { error } = await supabase
        .from(config.table)
        .update(formData)
        .eq('id', id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from(config.table)
        .insert([formData]);

      if (error) throw error;
    }
  };

  const fieldsWithEditors = config.fields.map(field => {
    if (field.name === 'editor_id') {
      return {
        ...field,
        options: [
          { value: '', label: '선택 안함' },
          ...editors.map(e => ({ value: e.id, label: e.display_name }))
        ]
      };
    }
    return field;
  });

  if (loading) {
    return <div className="content-management"><p>로딩 중...</p></div>;
  }

  return (
    <div className="content-management">
      <AdminForm
        title={config.title}
        fields={fieldsWithEditors}
        initialData={initialData}
        onSubmit={handleSubmit}
        backPath={basePath}
        isEdit={isEdit}
      />
    </div>
  );
}

export function ContentList() {
  const { contentType } = useParams();
  const config = contentConfigs[contentType];

  if (!config) {
    return <div className="content-management"><p>잘못된 콘텐츠 타입입니다.</p></div>;
  }

  return <GenericList config={config} basePath={`/admin/${contentType}`} />;
}

export function ContentForm() {
  const { contentType } = useParams();
  const config = contentConfigs[contentType];

  if (!config) {
    return <div className="content-management"><p>잘못된 콘텐츠 타입입니다.</p></div>;
  }

  return <GenericForm config={config} basePath={`/admin/${contentType}`} />;
}

export default { ContentList, ContentForm };
