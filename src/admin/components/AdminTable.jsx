import { Link } from 'react-router-dom';
import './AdminTable.css';

function AdminTable({ 
  title, 
  columns, 
  data, 
  loading, 
  onDelete, 
  basePath,
  emptyMessage = '데이터가 없습니다.'
}) {
  if (loading) {
    return (
      <div className="admin-table-container">
        <div className="admin-table-loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <div className="admin-table-header">
        <h1>{title}</h1>
        <Link to={`${basePath}/new`} className="admin-btn admin-btn-primary">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          새로 추가
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="admin-table-empty">
          <p>{emptyMessage}</p>
          <Link to={`${basePath}/new`} className="admin-btn admin-btn-secondary">
            첫 번째 항목 추가하기
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} style={{ width: col.width }}>
                    {col.label}
                  </th>
                ))}
                <th style={{ width: '120px' }}>작업</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td>
                    <div className="admin-table-actions">
                      <Link 
                        to={`${basePath}/${item.id}`} 
                        className="admin-table-btn edit"
                        title="수정"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                      </Link>
                      <button 
                        className="admin-table-btn delete"
                        onClick={() => onDelete(item.id)}
                        title="삭제"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
