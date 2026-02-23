import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import AdminTable from '../components/AdminTable';
import AdminForm from '../components/AdminForm';
import './ContentManagement.css';

const columns = [
  { key: 'title', label: '제목' },
  { key: 'artist', label: '아티스트' },
  { key: 'date', label: '날짜' },
  { key: 'views', label: '조회수' },
];

const formFields = [
  { name: 'title', label: '제목', type: 'text', required: true },
  { name: 'artist', label: '아티스트', type: 'text', required: true },
  { name: 'youtube_id', label: 'YouTube ID', type: 'text', required: true, placeholder: 'dQw4w9WgXcQ' },
  { name: 'thumbnail', label: '썸네일 URL', type: 'text' },
  { name: 'date', label: '날짜', type: 'date', required: true },
  { name: 'views', label: '조회수', type: 'number', defaultValue: 0 },
  { name: 'description', label: '설명', type: 'textarea' },
  { name: 'editor_id', label: '에디터', type: 'select', options: [] },
];

function VideoInterviewManagement() {
  const [data, setData] = useState([]);
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchData();
    fetchEditors();
  }, []);

  const fetchData = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('video_interviews')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setData(data || []);
    }
    setLoading(false);
  };

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

  const handleAdd = () => {
    setEditItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleDelete = async (item) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    if (!supabase) return;

    const { error } = await supabase
      .from('video_interviews')
      .delete()
      .eq('id', item.id);

    if (error) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(error);
    } else {
      fetchData();
    }
  };

  const handleSubmit = async (formData) => {
    if (!supabase) return;

    if (editItem) {
      const { error } = await supabase
        .from('video_interviews')
        .update(formData)
        .eq('id', editItem.id);

      if (error) {
        alert('수정 중 오류가 발생했습니다.');
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('video_interviews')
        .insert([formData]);

      if (error) {
        alert('추가 중 오류가 발생했습니다.');
        console.error(error);
        return;
      }
    }

    setShowForm(false);
    setEditItem(null);
    fetchData();
  };

  const fieldsWithEditors = formFields.map(field => {
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

  return (
    <div className="content-management">
      <div className="content-header">
        <h1>영상 인터뷰 관리</h1>
        <button className="btn btn-primary" onClick={handleAdd}>
          + 새 영상 인터뷰
        </button>
      </div>

      {showForm && (
        <AdminForm
          title={editItem ? '영상 인터뷰 수정' : '새 영상 인터뷰'}
          fields={fieldsWithEditors}
          initialData={editItem}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setEditItem(null); }}
        />
      )}

      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <AdminTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default VideoInterviewManagement;
