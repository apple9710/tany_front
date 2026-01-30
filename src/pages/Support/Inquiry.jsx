import { useState } from 'react'
import { post } from '../../utils/api/client'
import { API_ENDPOINTS } from '../../utils/api/config'
import SubPageBanner from '../../components/layout/SubPageBanner'
import PageTitle from '../../components/common/PageTitle'
import styles from './Inquiry.module.css'

const Inquiry = () => {
  const subMenuItems = [
    { path: '/support/inquiry', label: '온라인 문의' },
    { path: '/support/resources', label: '자료실' },
    { path: '/support/blog', label: '블로그' },
    { path: '/support/instagram', label: '인스타그램' }
  ]

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
    agreePrivacy: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 필수 항목 체크
    if (!formData.name || !formData.phone || !formData.message) {
      alert('필수 항목을 입력해주세요.')
      return
    }

    if (!formData.agreePrivacy) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    setSubmitting(true)
    try {
      const response = await post(API_ENDPOINTS.INQUIRIES, {
        name: formData.name,
        company: formData.company || null,
        phone: formData.phone,
        email: formData.email || null,
        message: formData.message
      })

      if (response.success) {
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.')
        // 폼 초기화
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          message: '',
          agreePrivacy: false
        })
      }
    } catch (error) {
      alert('문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.')
      console.error('문의 접수 실패:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.page}>
      <SubPageBanner
        backgroundImage="/images/sub_customer_banner_img.png"
        titleEn="SUPPORT"
        titleKo="고객지원"
        subMenuItems={subMenuItems}
      />

      <main className={styles.content}>
        <div className={styles.container}>
          <PageTitle titleEn="ONLINE INQUIRY" titleKo="온라인 문의" />

          {/* 문의 폼 */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* 개인정보 수집 및 이용동의 */}
            <div className={styles.privacySection} data-aos="fade-up">
              <h4 className={styles.privacyTitle}>개인정보수집 및 이용동의</h4>
              <div className={styles.privacyContent}>
                <p>당사는 귀하의 개인정보보호를 매우 중요시하며,『개인정보보호법』상의 개인정보보호 규정을 준수하고 있습니다.</p>

                <p><strong>1. 개인정보의 수집•이용 목적</strong></p>
                <p>- 온라인 문의에 대한 상담서비스 제공을 위한 수집</p>
                <p>- 홈페이지 내 온라인 문의 메뉴를 통한 수집</p>

                <p><strong>2. 수집•이용하는 개인정보 항목</strong></p>
                <p>- 필수항목 : 이름, 휴대전화, 문의유형, 문의내용</p>
                <p>- 선택항목 : 이메일, 집전화, 파일첨부</p>

                <p><strong>3. 개인정보의 보유 및 이용기간</strong></p>
                <p>회사는 고객이 개인정보의 수집 및 이용에 대한 동의를 철회하는 때까지 고객이 제공한 모든 개인 정보를 보유 및 이용하게 되며 고객이 이용동의를 철회하는 경우에는 고객의 개인 정보를 재생 불가능한 방법으로 지체 없이 저장 장치에서 삭제하여 어떠한 방법으로도 열람 또는 이용할 수 없도록 만듭니다.</p>

                <p>다만, 관계법령에서 일정한 보관기간을 정한 경우는 예외로 합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.</p>

                <p>- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</p>
                <p>- 방문에 관한 기록 : 3개월</p>
              </div>

              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="agreePrivacy"
                  name="agreePrivacy"
                  checked={formData.agreePrivacy}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <label htmlFor="agreePrivacy" className={styles.checkboxLabel}>
                  개인정보수집 및 이용에 동의합니다.
                </label>
              </div>
            </div>

            {/* 폼 필드들 */}
            {/* 성명 */}
            <div className={styles.formGroup} data-aos="fade-up" data-aos-delay="100">
              <label htmlFor="name" className={styles.labelRequired}>
                성명<span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력해주세요"
                className={styles.input}
              />
            </div>

            {/* 회사명 */}
            <div className={styles.formGroup} data-aos="fade-up" data-aos-delay="150">
              <label htmlFor="company" className={styles.label}>
                회사명
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="회사명을 입력해주세요"
                className={styles.input}
              />
            </div>

            {/* 연락처 */}
            <div className={styles.formGroup} data-aos="fade-up" data-aos-delay="200">
              <label htmlFor="phone" className={styles.labelRequired}>
                연락처<span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="연락처를 입력해주세요"
                className={styles.input}
              />
            </div>

            {/* 이메일 */}
            <div className={styles.formGroup} data-aos="fade-up" data-aos-delay="250">
              <label htmlFor="email" className={styles.label}>
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력해주세요"
                className={styles.input}
              />
            </div>

            {/* 문의내용 */}
            <div className={`${styles.formGroup} ${styles.formGroupVertical}`} data-aos="fade-up" data-aos-delay="300">
              <label htmlFor="message" className={styles.labelRequired}>
                문의내용<span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="문의내용을 입력해주세요"
                className={styles.textarea}
                rows="6"
              />
            </div>

            {/* 제출 버튼 */}
            <div className={styles.submitWrapper} data-aos="fade-up" data-aos-delay="350">
              <button type="submit" className={styles.submitButton} disabled={submitting}>
                {submitting ? '접수 중...' : '문의하기'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Inquiry
