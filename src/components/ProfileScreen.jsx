import { BookOpen, Cloud, Star, Compass, Leaf, Lock, ChevronRight, Settings, Award, Heart, Flame, TrendingUp, Shield, Zap } from 'lucide-react'

const BADGES = [
  { label: '첫 요리', Icon: Star, unlocked: true },
  { label: '탐구자', Icon: Compass, unlocked: true },
  { label: '계절 요정', Icon: Leaf, unlocked: true },
  { label: '열정가', Icon: Flame, unlocked: true },
  { label: '???', Icon: Lock, unlocked: false },
  { label: '???', Icon: Lock, unlocked: false },
  { label: '???', Icon: Lock, unlocked: false },
  { label: '???', Icon: Lock, unlocked: false },
]

const STATS = [
  { label: '총 기록 수', value: '12', unit: '개', icon: '📋', color: '#3B6D11', bgColor: 'rgba(59,109,17,0.08)' },
  { label: '받은 좋아요', value: '45', unit: '개', icon: '❤️', color: '#E85C5C', bgColor: 'rgba(232,92,92,0.08)' },
  { label: '연속 기록일', value: '3', unit: '일', icon: '🔥', color: '#E8882A', bgColor: 'rgba(232,136,42,0.08)' },
]

const MENU_ITEMS = [
  { icon: <Heart size={18} />, label: '좋아요한 레시피', count: 23 },
  { icon: <Award size={18} />, label: '내가 쓴 글', count: 8 },
  { icon: <Shield size={18} />, label: '개인정보 설정', count: null },
  { icon: <Settings size={18} />, label: '앱 설정', count: null },
]

export default function ProfileScreen({ onConnect }) {
  return (
    <section className="profile-screen">
      {/* 상단 헤더 */}
      <div className="profile-header-bar">
        <h1><BookOpen size={18} /> 마이페이지</h1>
        <button className="settings-icon-btn" aria-label="설정">
          <Settings size={20} />
        </button>
      </div>

      {/* 프로필 히어로 영역 */}
      <div className="profile-hero">
        <div className="profile-hero-bg" />
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar-lg">🧑‍🍳</div>
          <div className="profile-avatar-ring" />
          <div className="profile-level-badge-float">Lv.1</div>
        </div>
        <p className="profile-nickname">익명요리사 #4821</p>
        <span className="profile-title-pill">
          <TrendingUp size={12} />
          초보 요리사
        </span>
      </div>

      {/* 레벨 프로그레스 */}
      <div className="profile-progress-card">
        <div className="progress-info-row">
          <span className="progress-label">다음 레벨까지</span>
          <span className="progress-points">150P 남음</span>
        </div>
        <div className="progress-bar-wrapper">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: '70%' }}>
              <div className="progress-bar-glow" />
            </div>
          </div>
          <span className="progress-percent">70%</span>
        </div>
        <div className="progress-level-labels">
          <span>Lv.1</span>
          <span>Lv.2</span>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="profile-stat-row">
        {STATS.map(({ label, value, unit, icon, color, bgColor }, i) => (
          <div key={i} className="profile-stat-card" style={{ '--stat-color': color, '--stat-bg': bgColor }}>
            <div className="stat-icon-circle">{icon}</div>
            <div className="stat-value" style={{ color }}>{value}<span className="stat-unit">{unit}</span></div>
            <div className="stat-label-text">{label}</div>
          </div>
        ))}
      </div>

      {/* 연동 배너 */}
      <div className="profile-connect-banner" onClick={onConnect}>
        <div className="connect-icon-wrap">
          <Cloud size={20} />
        </div>
        <div className="connect-text">
          <p className="connect-title">데이터 안전하게 보관하기</p>
          <p className="connect-desc">기기를 바꿔도 기록을 지킬 수 있어요</p>
        </div>
        <button className="connect-btn">연동하기</button>
      </div>

      {/* 배지 컬렉션 */}
      <div className="profile-badge-section">
        <div className="badge-header-row">
          <div className="badge-title-group">
            <Award size={16} />
            <strong>배지 컬렉션</strong>
            <span className="badge-count-pill">4/8</span>
          </div>
          <button className="badge-view-all">
            모두 보기 <ChevronRight size={14} />
          </button>
        </div>
        <div className="profile-badge-grid">
          {BADGES.map(({ label, Icon, unlocked }, i) => (
            <div key={i} className={`profile-badge-item ${unlocked ? 'unlocked' : 'locked'}`}>
              <div className={`profile-badge-circle ${unlocked ? 'unlocked' : 'locked'}`}>
                <Icon size={20} />
                {unlocked && <div className="badge-shine" />}
              </div>
              <div className="profile-badge-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div className="profile-menu-list">
        {MENU_ITEMS.map(({ icon, label, count }, i) => (
          <button key={i} className="profile-menu-item">
            <div className="menu-item-left">
              <div className="menu-item-icon">{icon}</div>
              <span>{label}</span>
            </div>
            <div className="menu-item-right">
              {count !== null && <span className="menu-item-count">{count}</span>}
              <ChevronRight size={16} />
            </div>
          </button>
        ))}
      </div>

      <div style={{ height: 32 }} />
    </section>
  )
}
