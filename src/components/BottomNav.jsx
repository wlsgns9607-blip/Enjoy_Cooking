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
      {ITEMS.map(({ key, label, Icon }) => (
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
      ))}
    </nav>
  )
}
