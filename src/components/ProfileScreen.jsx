import { BookOpen, Cloud, Star, Compass, Leaf, Lock, Bookmark, Flame } from 'lucide-react'

const BADGES = [
  { label: '첫 요리', Icon: Star, unlocked: true },
  { label: '탐구자', Icon: Compass, unlocked: true },
  { label: '계절 요정', Icon: Leaf, unlocked: true },
  { label: '???', Icon: Lock, unlocked: false },
  { label: '???', Icon: Lock, unlocked: false },
  { label: '???', Icon: Lock, unlocked: false },
  { label: '???', Icon: Lock, unlocked: false },
  { label: '???', Icon: Lock, unlocked: false },
]

const STATS = [
  { label: '총 기록 수', value: '12', unit: '개', icon: '📋', color: '#3B6D11' },
  { label: '받은 좋아요', value: '45', unit: '개', icon: '❤️', color: '#E85C5C' },
  { label: '연속 기록일', value: '3', unit: '일', icon: '🔥', color: '#E8882A' },
]

export default function ProfileScreen({ onConnect }) {
  return (
    <section style={{ paddingBottom: 24 }}>
      <div className="header">
        <h1><BookOpen size={18} /> 마이페이지</h1>
      </div>

      <div className="profile-block">
        <div className="avatar-lg">🧑‍🍳</div>
        <p className="nickname">익명요리사 #4821</p>
        <span className="level-pill">초보 요리사 Lv.1</span>
      </div>

      <div className="progress-card card">
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
          <span style={{ color: 'var(--c-text-soft)' }}>다음 레벨까지 150P 남음</span>
          <strong>70%</strong>
        </div>
        <div className="progress-track"><div className="progress-fill" style={{ width: '70%' }} /></div>
        <div className="level-labels"><span>Lv.1</span><span>Lv.2</span></div>
      </div>

      <div className="connect-row card">
        <Cloud size={20} style={{ color: 'var(--c-text-soft)' }} />
        <p>기기를 바꿔도 기록을<br />지키고 싶다면</p>
        <button onClick={onConnect} style={{
          background: 'var(--c-blue)', color: '#fff', border: 'none',
          padding: '8px 16px', borderRadius: '999px', fontSize: 13, fontWeight: 600, cursor: 'pointer'
        }}>연동하기</button>
      </div>

      <div className="stat-row">
        {STATS.map(({ label, value, unit, icon, color }, i) => (
          <div key={i} className="stat-card">
            <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
            <div className="label" style={{ color: 'var(--c-text-soft)', fontSize: 11 }}>{label}</div>
            <div className="num" style={{ color }}>{value}<span style={{ fontSize: 11 }}>{unit}</span></div>
          </div>
        ))}
      </div>

      <div className="badge-section card">
        <div className="title-row">
          <strong style={{ fontSize: 14 }}>배지 컬렉션</strong>
          <span style={{ fontSize: 12, color: 'var(--c-main)', fontWeight: 600 }}>모두 보기</span>
        </div>
        <div className="badge-grid">
          {BADGES.map(({ label, Icon, unlocked }, i) => (
            <div key={i} className="badge-item">
              <div className={`badge-circle ${unlocked ? 'unlocked' : 'locked'}`}>
                <Icon size={18} />
              </div>
              <div className="label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
