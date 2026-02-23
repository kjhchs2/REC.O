import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    if (!supabase) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate('/admin');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!supabase) {
        if (email === 'demo@admin.com' && password === 'demo1234') {
          navigate('/admin');
          return;
        }
        throw new Error('Supabase가 설정되지 않았습니다. 데모 계정(demo@admin.com / demo1234)을 사용하세요.');
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate('/admin');
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src="/logo.svg" alt="REC.O" className="admin-login-logo" />
          <h1>관리자 로그인</h1>
          <p>내맘추 어드민 패널에 로그인하세요</p>
        </div>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Supabase 미설정 시 데모 계정:</p>
          <code>demo@admin.com / demo1234</code>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
