import { useState, useEffect } from 'react'
import { get, put, del } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import styles from './Inquiries.module.css'

const Inquiries = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all') // all, pending, completed
  const [selectedItem, setSelectedItem] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [filterStatus])

  const loadData = async () => {
    try {
      const params = filterStatus !== 'all' ? { status: filterStatus } : {}
      const response = await get(API_ENDPOINTS.INQUIRIES, params)
      if (response.success) {
        setItems(response.data.items || [])
      }
    } catch (error) {
      alert('데이터 로드 실패: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    try {
      await put(`${API_ENDPOINTS.INQUIRIES}?id=${id}`, { status: newStatus })
      alert('상태가 변경되었습니다')
      loadData()
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status: newStatus })
      }
    } catch (error) {
      alert('상태 변경 실패: ' + error.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await del(`${API_ENDPOINTS.INQUIRIES}?id=${id}`)
      alert('삭제되었습니다')
      loadData()
      setShowDetailModal(false)
    } catch (error) {
      alert('삭제 실패: ' + error.message)
    }
  }

  const handleShowDetail = (item) => {
    setSelectedItem(item)
    setShowDetailModal(true)
  }

  const handleCloseModal = () => {
    setShowDetailModal(false)
    setSelectedItem(null)
  }

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>문의 관리</h1>
      </div>

      {/* 필터 */}
      <div className={styles.filterGroup}>
        <button
          onClick={() => setFilterStatus('all')}
          className={`${styles.filterBtn} ${filterStatus === 'all' ? styles.active : ''}`}
        >
          전체
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`${styles.filterBtn} ${filterStatus === 'pending' ? styles.active : ''}`}
        >
          미처리
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`${styles.filterBtn} ${filterStatus === 'completed' ? styles.active : ''}`}
        >
          완료
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>이름</th>
              <th>회사</th>
              <th>연락처</th>
              <th>이메일</th>
              <th>문의일</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.company || '-'}</td>
                <td>{item.phone}</td>
                <td>{item.email || '-'}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      item.status === 'pending' ? styles.badgePending : styles.badgeCompleted
                    }`}
                  >
                    {item.status === 'pending' ? '미처리' : '완료'}
                  </span>
                </td>
                <td>
                  <button className={styles.viewBtn} onClick={() => handleShowDetail(item)}>
                    상세
                  </button>
                  {item.status === 'pending' ? (
                    <button
                      className={styles.completeBtn}
                      onClick={() => handleStatusChange(item.id, 'completed')}
                    >
                      완료
                    </button>
                  ) : (
                    <button
                      className={styles.pendingBtn}
                      onClick={() => handleStatusChange(item.id, 'pending')}
                    >
                      재오픈
                    </button>
                  )}
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="7" className={styles.empty}>
                  문의가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 상세 모달 */}
      {showDetailModal && selectedItem && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>문의 상세</h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>이름</label>
                <p className={styles.detailValue}>{selectedItem.name}</p>
              </div>

              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>회사</label>
                <p className={styles.detailValue}>{selectedItem.company || '-'}</p>
              </div>

              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>연락처</label>
                <p className={styles.detailValue}>{selectedItem.phone}</p>
              </div>

              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>이메일</label>
                <p className={styles.detailValue}>{selectedItem.email || '-'}</p>
              </div>

              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>문의 내용</label>
                <p className={styles.detailMessage}>{selectedItem.message}</p>
              </div>

              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>문의일시</label>
                <p className={styles.detailValue}>
                  {new Date(selectedItem.created_at).toLocaleString()}
                </p>
              </div>

              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>상태</label>
                <span
                  className={`${styles.badge} ${
                    selectedItem.status === 'pending' ? styles.badgePending : styles.badgeCompleted
                  }`}
                >
                  {selectedItem.status === 'pending' ? '미처리' : '완료'}
                </span>
              </div>

              <div className={styles.modalActions}>
                {selectedItem.status === 'pending' ? (
                  <button
                    className={styles.completeBtn}
                    onClick={() => handleStatusChange(selectedItem.id, 'completed')}
                  >
                    완료 처리
                  </button>
                ) : (
                  <button
                    className={styles.pendingBtn}
                    onClick={() => handleStatusChange(selectedItem.id, 'pending')}
                  >
                    재오픈
                  </button>
                )}
                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(selectedItem.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inquiries
