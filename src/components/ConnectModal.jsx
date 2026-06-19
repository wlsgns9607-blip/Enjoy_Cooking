import { X } from 'lucide-react'

export default function ConnectModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button className="close-x" onClick={onClose}><X size={18} /></button>
        <div className="modal-icon">
          <span style={{ fontSize: 28 }}>☁️</span>
        </div>
        <h2>요리가 즐거워!</h2>
        <p>AI 요리 박사가 추천해준 레시피와<br />정성껏 작성한 요리 일기를 안전하게 보관하세요.</p>
        <button className="kakao">
          <span>💬</span> 카카오로 3초 만에 시작하기
        </button>
        <button className="google">
          <span>✉️</span> 구글 계정으로 연결하기
        </button>
        <button className="later" onClick={onClose}>나중에 할게요</button>
      </div>
    </div>
  )
}
