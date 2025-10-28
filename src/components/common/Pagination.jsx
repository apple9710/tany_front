import { useState } from 'react'
import styles from './Pagination.module.css'

const Pagination = ({ totalItems = 120, itemsPerPage = 10, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // 현재 페이지 그룹 (1-10, 11-20, ...)
  const currentGroup = Math.ceil(currentPage / 10)
  const startPage = (currentGroup - 1) * 10 + 1
  const endPage = Math.min(currentGroup * 10, totalPages)

  const handlePageClick = (page) => {
    if (page === currentPage) return
    setCurrentPage(page)
    if (onPageChange) onPageChange(page)
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1)
    }
  }

  const handlePrevGroup = () => {
    if (currentGroup > 1) {
      handlePageClick(startPage - 10)
    }
  }

  const handleNextGroup = () => {
    if (currentGroup < Math.ceil(totalPages / 10)) {
      handlePageClick(endPage + 1)
    }
  }

  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagination}>
        {/* << 버튼 (10개씩 이전) */}
        <button
          className={`${styles.navButton} ${currentGroup === 1 ? styles.disabled : ''}`}
          onClick={handlePrevGroup}
          disabled={currentGroup === 1}
          aria-label="이전 10페이지"
        >
          &lt;&lt;
        </button>

        {/* < 버튼 (1개씩 이전) */}
        <button
          className={`${styles.navButton} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="이전 페이지"
        >
          &lt;
        </button>

        {/* 페이지 번호들 */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.active : ''
            }`}
            onClick={() => handlePageClick(page)}
            disabled={page === currentPage}
            aria-label={`${page}페이지`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* > 버튼 (1개씩 다음) */}
        <button
          className={`${styles.navButton} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="다음 페이지"
        >
          &gt;
        </button>

        {/* >> 버튼 (10개씩 다음) */}
        <button
          className={`${styles.navButton} ${
            currentGroup === Math.ceil(totalPages / 10) ? styles.disabled : ''
          }`}
          onClick={handleNextGroup}
          disabled={currentGroup === Math.ceil(totalPages / 10)}
          aria-label="다음 10페이지"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}

export default Pagination
