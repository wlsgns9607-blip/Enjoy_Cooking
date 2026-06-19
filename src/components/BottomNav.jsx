import { Map, Bot, BookOpen, User } from 'lucide-react'

const ITEMS = [
  { key: 'map', label: '지도', Icon: Map },
  { key: 'ai', label: 'AI 요리박사', Icon: Bot },
  { key: 'diary', label: '요리일지', Icon: BookOpen },
  { key: 'profile', label: '마이페이지', Icon: User },
]

export default function BottomNav({ active, onChange }) {
  const isMapScreen = active === 'map'

  if (isMapScreen) {
    return (
      <nav
        className="bottom-nav-floating"
        style={{
          position: 'absolute',
          bottom: 20,
          left: 16,
          right: 16,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          zIndex: 100,
          pointerEvents: 'none'
        }}
      >
        {ITEMS.map(({ key, label, Icon }) => {
          const isActive = active === key
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                pointerEvents: 'auto',
                padding: 0
              }}
            >
              <div style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: isActive ? 'var(--c-green)' : '#fff',
                color: isActive ? '#fff' : 'var(--c-text-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.2s',
                border: isActive ? 'none' : '1px solid var(--c-border)'
              }}>
                <Icon size={22} />
              </div>
              <span style={{
                fontSize: 10,
                marginTop: 6,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--c-green)' : 'var(--c-text-soft)',
                background: 'rgba(255,255,255,0.9)',
                padding: '2px 6px',
                borderRadius: 4,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>{label}</span>
            </button>
          )
        })}
      </nav>
    )
  }

  // Standard bottom nav for other screens
  return (
    <nav className="bottom-nav">
      {ITEMS.map(({ key, label, Icon }) => {
        const isActive = active === key
        return (
          <button
            key={key}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onChange(key)}
          >
            <div className={`nav-icon-wrap ${isActive ? 'active' : ''}`}>
              <Icon size={20} />
            </div>
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
