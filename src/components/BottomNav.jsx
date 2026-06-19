import { Map, Bot, BookOpen, User } from 'lucide-react'

const ITEMS = [
  { key: 'map', label: '지도', Icon: Map },
  { key: 'ai', label: 'AI 요리박사', Icon: Bot },
  { key: 'diary', label: '요리일지', Icon: BookOpen },
  { key: 'profile', label: '마이페이지', Icon: User },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {ITEMS.map(({ key, label, Icon }) => {
        const isMap = key === 'map'
        if (isMap) {
          return (
            <button
              key={key}
              className={`nav-item ${active === key ? 'active' : ''}`}
              onClick={() => onChange(key)}
              style={{ position: 'relative', overflow: 'visible', zIndex: 10 }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: '50%',
                background: active === key ? 'var(--c-green)' : '#fff',
                color: active === key ? '#fff' : 'var(--c-text-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                transition: 'all 0.2s',
                marginTop: -18,
                border: active === key ? 'none' : '1px solid var(--c-border)'
              }}>
                <Icon size={22} />
              </div>
              <span style={{ fontSize: 10, marginTop: 4, fontWeight: active === key ? 700 : 500 }}>{label}</span>
            </button>
          )
        }
        return (
          <button
            key={key}
            className={`nav-item ${active === key ? 'active' : ''}`}
            onClick={() => onChange(key)}
          >
            <div className={`nav-icon-wrap ${active === key ? 'active' : ''}`}>
              <Icon size={20} />
            </div>
            <span>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
