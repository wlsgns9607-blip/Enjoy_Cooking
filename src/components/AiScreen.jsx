import { useState, useEffect, useRef } from 'react'
import { BookOpen, ArrowRight, Send, Heart, MessageCircle, Plus, MoreVertical, ArrowLeft, Camera } from 'lucide-react'

const INITIAL_POSTS = [
  {
    name: '김지우', rank: '방구석 셰프', rankClass: 'r1', avatar: '👨‍💼',
    imgEmoji: '🥗', imgBg: 'linear-gradient(160deg,#c8ddb8,#8fba6a)',
    caption: '오늘 아침은 신선한 샐러드로 가볍게 시작했어요! 🌿', likes: 24, comments: 5, time: '2시간 전'
  },
  {
    name: '이지연', rank: '프로 집밥러', rankClass: 'r2', avatar: '👩',
    imgEmoji: '🍣', imgBg: 'linear-gradient(160deg,#e8d5b0,#c49a5a)',
    caption: '제철 아스파라거스가 정말 달고 맛있네요. 남편도 대만족 👍', likes: 48, comments: 12, time: '5시간 전'
  },
  {
    name: '박헌우', rank: '요리 새싹', rankClass: 'r3', avatar: '👨',
    imgEmoji: '🍲', imgBg: 'linear-gradient(160deg,#6b3a2a,#3d1f14)',
    caption: '처음으로 끓여본 된장찌개! AI 요리박사님 덕분에 성공 🎉', likes: 15, comments: 2, time: '어제'
  },
]

export default function AiScreen({ messages = [], setMessages }) {
  const [segment, setSegment] = useState('coach')
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [isWritingPost, setIsWritingPost] = useState(false)
  const [postText, setPostText] = useState('')
  const [photo, setPhoto] = useState(null)

  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const userText = input
    setInput('')

    setMessages(prev => [...prev, { from: 'user', text: userText }])

    setTimeout(() => {
      let reply = `입력하신 '${userText}'에 대해 고민해 보았어요. `
      if (userText.includes('레시피') || userText.includes('요리') || userText.includes('추천') || userText.includes('방법')) {
        reply += `제철 식재료를 사용한 건강하고 간편한 요리는 어떠신가요? 원하시는 구체적인 식재료가 있다면 언제든 말씀해 주세요!`
      } else {
        reply += `관련해서 더 자세한 레시피나 조리 팁이 필요하시면 언제든지 말씀해 주세요! 🧑‍🍳`
      }
      setMessages(prev => [...prev, { from: 'ai', text: reply }])
    }, 600)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  const handlePhotoClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
    }
  }

  const handleSubmitPost = () => {
    if (!postText.trim()) return

    const newPost = {
      name: '나 (요리 꿈나무)',
      rank: '요리 새싹',
      rankClass: 'r3',
      avatar: '👨‍🍳',
      photo: photo,
      imgEmoji: photo ? null : '🍛',
      imgBg: 'linear-gradient(160deg,#e8d0a0,#d4956a)',
      caption: postText,
      likes: 0,
      comments: 0,
      time: '방금 전'
    }

    setPosts(prev => [newPost, ...prev])
    setPostText('')
    setPhoto(null)
    setIsWritingPost(false)
  }

  return (
    <section style={{ position: 'relative' }}>
      {/* 헤더 */}
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isWritingPost ? (
          <ArrowLeft className="icon-btn" size={18} onClick={() => { setIsWritingPost(false); setPhoto(null); setPostText(''); }} style={{ cursor: 'pointer' }} />
        ) : (
          <BookOpen className="icon-btn" size={18} style={{ opacity: 0, pointerEvents: 'none' }} />
        )}
        <h1 style={{ flex: 1, margin: 0, fontSize: 16, fontWeight: 700, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {!isWritingPost && <BookOpen size={18} />}
          {isWritingPost ? '커뮤니티 글쓰기' : '요리가 즐거워!'}
        </h1>
        <div style={{ width: 18 }} />
      </div>

      {/* 세그먼트 (글쓰기 중에는 숨김) */}
      {!isWritingPost && (
        <div className="segment">
          <button className={segment === 'coach' ? 'active' : ''} onClick={() => setSegment('coach')}>AI 코칭</button>
          <button className={segment === 'community' ? 'active' : ''} onClick={() => setSegment('community')}>커뮤니티</button>
        </div>
      )}

      {isWritingPost ? (
        /* 글쓰기 작성 페이지 */
        <div style={{ padding: '16px' }}>
          {/* 사진 업로드 영역 */}
          <div 
            className="empty-box" 
            onClick={handlePhotoClick}
            style={{ 
              cursor: 'pointer', 
              padding: photo ? '10px' : '40px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 200,
              overflow: 'hidden',
              margin: '0 0 20px',
              border: '2px dashed #d9c8b4',
              borderRadius: 'var(--r-lg)',
              background: 'rgba(255,255,255,0.5)'
            }}
          >
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            {photo ? (
              <img 
                src={photo} 
                alt="Post preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--r-md)' }} 
              />
            ) : (
              <>
                <Camera size={36} style={{ color: 'var(--c-text-soft)', marginBottom: 8 }} />
                <p style={{ margin: 0, fontSize: 13, color: 'var(--c-text-soft)', textAlign: 'center', lineHeight: 1.5 }}>
                  요리 사진을 등록해 보세요 (선택)
                </p>
              </>
            )}
          </div>

          {/* 피드 내용 */}
          <textarea
            placeholder="오늘 만든 요리에 대한 후기나 팁을 자랑해 보세요... 🍳"
            value={postText}
            onChange={e => setPostText(e.target.value)}
            style={{
              width: '100%', height: 120, borderRadius: 'var(--r-md)',
              border: '1px solid var(--c-border)', padding: 12,
              fontSize: 13, outline: 'none', resize: 'none',
              fontFamily: 'inherit', marginBottom: 20, boxSizing: 'border-box',
              background: '#fff'
            }}
          />

          {/* 등록 버튼 */}
          <button
            onClick={handleSubmitPost}
            style={{
              width: '100%', padding: '14px 0', background: 'var(--c-main)',
              color: '#fff', border: 'none', borderRadius: '999px',
              fontWeight: 700, fontSize: 14, cursor: 'pointer'
            }}
          >
            등록하기
          </button>
        </div>
      ) : segment === 'coach' ? (
        /* AI 코칭 탭 */
        <>
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <span className="tag-pill">오늘의 제철 요리 추천</span>
          </div>

          <div className="chat" style={{ maxHeight: '380px', overflowY: 'auto', paddingBottom: '10px' }}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.from}`} style={{ maxWidth: '85%', alignSelf: m.from === 'ai' ? 'flex-start' : 'flex-end', marginBottom: '8px' }}>
                {m.from === 'ai' && (
                  <div className="avatar-mini" style={{ background: 'var(--c-green)', flexShrink: 0 }}>🤖</div>
                )}
                <div className="bubble" style={{
                  background: m.from === 'ai' ? '#fff' : 'var(--c-main)',
                  color: m.from === 'ai' ? 'var(--c-text)' : '#fff',
                  border: m.from === 'ai' ? '1px solid var(--c-border)' : 'none',
                  borderRadius: m.from === 'ai' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                  whiteSpace: 'pre-line'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div 
            className="recipe-card card" 
            style={{ margin: '12px 16px', cursor: 'pointer' }}
            onClick={() => { setInput('라구 소스 활용 요리 추천해줘'); setTimeout(handleSend, 50); }}
          >
            <div style={{
              height: 120, borderRadius: 'var(--r-md)', marginBottom: 10, overflow: 'hidden',
              background: 'linear-gradient(160deg,#ffb285,#a33115)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40
            }}>🍝</div>
            <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: 'var(--c-main)', display: 'flex', alignItems: 'center', gap: 4 }}>
              풍미 가득한 오리지널 라구 파스타 <ArrowRight size={14} />
            </p>
          </div>

          <div className="quick-replies">
            <button onClick={() => { setInput('라구 소스 보관 방법 알려줘'); setTimeout(handleSend, 50); }}>보관 방법 보기</button>
            <button onClick={() => { setInput('다른 파스타 메뉴 추천해줘'); setTimeout(handleSend, 50); }}>다른 파스타 추천</button>
          </div>

          <div className="chat-input">
            <input 
              type="text" 
              placeholder="AI 셰프에게 물어보세요..." 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-btn" onClick={handleSend}><Send size={16} /></button>
          </div>
        </>
      ) : (
        /* 커뮤니티 탭 */
        <div style={{ position: 'relative', paddingBottom: 80, paddingLeft: 16, paddingRight: 16 }}>
          {/* 상단 퀵 글쓰기 링크 박스 */}
          <div 
            onClick={() => setIsWritingPost(true)}
            style={{
              background: '#fff', borderRadius: 'var(--r-md)', padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
              border: '1px solid var(--c-border)', cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
              marginTop: 4
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: '#f5f0e8',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
            }}>👨‍🍳</div>
            <div style={{ flex: 1, fontSize: 13, color: 'var(--c-text-soft)', textAlign: 'left' }}>
              오늘 만든 요리를 커뮤니티에 자랑해 보세요...
            </div>
            <Plus size={18} style={{ color: 'var(--c-main)' }} />
          </div>

          {posts.map((p, i) => (
            <div key={i} className="post-card card" style={{ borderRadius: 'var(--r-lg)', marginBottom: 12 }}>
              <div className="post-head">
                <div className="avatar-sm" style={{ fontSize: 18 }}>{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{p.name}</p>
                  <span className={`rank-pill ${p.rankClass}`}>{p.rank}</span>
                </div>
                <MoreVertical size={16} style={{ color: 'var(--c-text-soft)' }} />
              </div>
              <div style={{
                height: 200, borderRadius: 'var(--r-md)', marginBottom: 10,
                background: p.photo ? 'none' : p.imgBg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', overflow: 'hidden'
              }}>
                {p.photo ? (
                  <img src={p.photo} alt={p.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: 60 }}>{p.imgEmoji}</span>
                )}
              </div>
              <p style={{ fontSize: 13, margin: '0 0 10px', lineHeight: 1.5, textAlign: 'left' }}>{p.caption}</p>
              <div className="post-foot">
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Heart size={14} /> {p.likes}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={14} /> {p.comments}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11 }}>{p.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
