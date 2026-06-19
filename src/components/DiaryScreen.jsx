import { useState, useRef } from 'react'
import { BookOpen, Calendar, Camera, Send, Plus, ArrowLeft, X } from 'lucide-react'
import tteokbokkiImg from '../tteokbokki.png'

const TILE_COLORS = ['#c8a882','#8fba6a','#e8d0a0','#d4956a','#b8c8a0','#e8b878','#9abf82','#d4a870','#c4b898']
const SAMPLE_EMOJIS = ['🥗','🍲','🥩','🍝','🍱','🍞','🍤','🍜','🍣','🥘','🍳','🥪']

const INITIAL_ENTRIES = [
  { emoji: '🥗', starred: true, title: '봄 채소 샐러드', photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', story: '신선한 봄 채소와 방울토마토, 병아리콩을 가득 담아 발사믹 드레싱을 곁들였어요. 칼로리도 낮고 상큼해서 아침 식사 대용으로 최고예요!' }, 
  { emoji: '🍲', starred: true, title: '달래 된장찌개', photo: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80', story: '봄 향기 가득한 달래를 한 움큼 썰어 넣은 된장찌개예요. 두부와 애호박을 듬뿍 넣어 구수하게 끓였더니 밥 한 공기 뚝딱 비워내게 만드네요.' }, 
  { emoji: '🥘', starred: true, title: '돼지고기 김치찌개', photo: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', story: '잘 익은 묵은지와 큼직하게 썬 돼지고기를 푹 끓여 깊은 맛을 냈습니다. 얼큰하고 시원해서 다른 반찬이 필요 없어요.' },
  { emoji: '🍛', starred: false, title: '김치볶음밥', photo: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=300&q=80', story: '남은 신김치와 스팸을 잘게 썰어 볶은 후 참기름 한 방울로 마감한 실패 없는 김치볶음밥! 반숙 후라이 톡 터트려 먹으면 최고입니다.' }, 
  { emoji: '🍳', starred: true, title: '백종원 계란말이', photo: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80', story: '달걀 5개에 대파와 당근을 잘게 다져 넣고 약불에서 돌돌 말아 만든 부드러운 계란말이. 속은 촉촉하고 겉은 단단해서 정말 밥도둑입니다.' }, 
  { emoji: '🍞', starred: true, title: '촉촉한 프렌치 토스트', photo: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=300&q=80', story: '우유와 달걀을 섞은 즙에 식빵을 푹 적셔서 버터향 솔솔 풍기며 구워냈어요. 메이플 시럽과 바나나 슬라이스를 곁들이니 홈 브런치가 따로 없네요.' },
  { emoji: '🍱', starred: false, title: '고소한 참치김밥', photo: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=300&q=80', story: '마요네즈와 버무린 참치, 깻잎, 단무지, 당근 등을 가득 넣고 돌돌 만 든든한 참치김밥. 참기름 슥슥 발라 썰어놓으니 한 끼 식사로 정말 든든해요.' }, 
  { emoji: '🍲', starred: true, title: '노릇노릇 두부부침', photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80', story: '두부를 큼직하게 썰어 들기름에 노릇하게 지져냈어요. 송송 썬 대파를 넣은 진간장 양념장에 콕 찍어 먹으면 고소하고 건강한 반찬이 됩니다.' }, 
  { emoji: '🥘', starred: false, title: '매콤달콤 떡볶이', photo: tteokbokkiImg, story: 'AI 셰프가 추천해 준 레시피대로 만든 매콤달콤 떡볶이! 쌀떡의 쫀득함 and 매콤한 양념이 어우러져 시장 떡볶이 맛이 납니다. 대성공!' },
  { emoji: '🍝', starred: false, title: '토마토 파스타', photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80', story: '마늘과 양파, 베이컨을 가득 볶다 토마토 소스를 붓고 졸인 초간단 스파게티. 치즈 가루를 잔뜩 뿌려 먹으니 이탈리아 레스토랑이 부럽지 않네요.' }, 
  { emoji: '🥩', starred: false, title: '소고기 등심 구이', photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80', story: '두툼한 소고기 등심에 허브 솔트를 솔솔 뿌려 미디엄으로 구웠어요. 육즙이 꽉 차 있어서 씹을 때마다 고소하고 촉촉합니다.' }, 
  { emoji: '🥪', starred: true, title: '햄치즈 샌드위치', photo: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=300&q=80', story: '바삭하게 토스트한 식빵에 홀그레인 머스타드, 햄, 치즈, 양상추를 푸짐하게 끼워 완성한 샌드위치. 간단하고 든든해서 주말 아침으로 딱이에요.' },
]

export default function DiaryScreen() {
  const [entries, setEntries] = useState(INITIAL_ENTRIES)
  const [isWriting, setIsWriting] = useState(false)
  const [inputText, setInputText] = useState('')
  const [photo, setPhoto] = useState(null)
  const [selectedEntry, setSelectedEntry] = useState(null)
  
  const fileInputRef = useRef(null)

  const handlePhotoClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(URL.createObjectURL(file))
    }
  }

  const handleSubmitEntry = () => {
    if (!inputText.trim()) return
    
    const emoji = SAMPLE_EMOJIS[Math.floor(Math.random() * SAMPLE_EMOJIS.length)]
    
    const newEntry = {
      emoji: emoji,
      title: inputText,
      photo: photo,
      starred: false,
      story: `오늘 직접 만든 ${inputText} 레시피 기록!\n간단하지만 맛은 최고였어요. 가족들이 다 맛있다고 칭찬해줬네요. 🥰`
    }

    setEntries(prev => [newEntry, ...prev])
    setInputText('')
    setPhoto(null)
    setIsWriting(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmitEntry()
    }
  }

  return (
    <section style={{ position: 'relative', minHeight: '100%' }}>
      {/* 헤더 */}
      <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 16px 12px' }}>
        {isWriting ? (
          <ArrowLeft className="icon-btn" size={18} onClick={() => { setIsWriting(false); setPhoto(null); setInputText(''); }} style={{ cursor: 'pointer' }} />
        ) : (
          <BookOpen className="icon-btn" size={18} style={{ opacity: 0, pointerEvents: 'none' }} />
        )}
        <h1 style={{ margin: 0, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <BookOpen size={18} style={{ color: 'var(--c-main)' }} /> 나의 요리일지
        </h1>
        <Calendar className="icon-btn" size={18} />
      </div>

      {isWriting ? (
        <>
          {/* 사진 업로드 영역 */}
          <div 
            className="empty-box" 
            onClick={handlePhotoClick}
            style={{ 
              cursor: 'pointer', 
              padding: photo ? '10px' : '46px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 240,
              overflow: 'hidden',
              margin: '24px 16px'
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
                alt="Selected dish" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--r-md)' }} 
              />
            ) : (
              <>
                <Camera size={40} style={{ color: '#a68269', marginBottom: 12 }} />
                <p style={{ margin: 0, fontSize: 13, color: 'var(--c-text-soft)', lineHeight: 1.6 }}>
                  오늘의 요리를 사진으로 남기고<br />소중한 기록을 완성해보세요
                </p>
              </>
            )}
          </div>

          {/* 한줄 평 기록 */}
          <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, margin: '0 0 12px', color: 'var(--c-text)' }}>
            나의 요리 기록하기
          </p>
          <div className="mini-composer">
            <input 
              type="text" 
              placeholder="오늘 만든 요리, 한줄평" 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-btn" onClick={handleSubmitEntry} style={{ background: '#d4b29a' }}>
              <Send size={16} />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* 통계 요약 카드 */}
          <div className="stat-row">
            <div className="stat-card">
              <div className="label">이번 달 요리</div>
              <div className="num">{entries.length}<span style={{ fontSize: 11 }}>개</span></div>
            </div>
            <div className="stat-card">
              <div className="label">획득한 칭호</div>
              <div className="num" style={{ fontSize: 14 }}>장인</div>
            </div>
            <div className="stat-card">
              <div className="label">획득 뱃지</div>
              <div className="num" style={{ fontSize: 14 }}>🎖️ 5개</div>
            </div>
          </div>

          {/* 메인 요리 일지 그리드 */}
          <div className="diary-grid">
            {entries.map((e, i) => (
              <div 
                key={i} 
                className="diary-tile" 
                onClick={() => setSelectedEntry(e)}
                style={{ 
                  background: e.photo ? 'none' : TILE_COLORS[i % TILE_COLORS.length],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}
              >
                {e.photo ? (
                  <img 
                    src={e.photo} 
                    alt={e.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <span style={{ fontSize: 30 }}>{e.emoji}</span>
                )}
                {/* 제목 오버레이 */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '8px',
                  opacity: 1
                }}>
                  <span style={{ color: '#fff', fontSize: '10px', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                    {e.title}
                  </span>
                </div>
                {e.starred && <div className="star-badge" style={{ zIndex: 10 }}>★</div>}
              </div>
            ))}
          </div>

          {/* 새 글 작성 플로팅 버튼 */}
          <button 
            className="fab" 
            style={{ right: 16, bottom: 16, position: 'absolute' }} 
            onClick={() => setIsWriting(true)}
          >
            <Plus size={20} />
          </button>

          {/* 일지 상세 모달 */}
          {selectedEntry && (
            <div className="modal-overlay" onClick={() => setSelectedEntry(null)} style={{ zIndex: 1000 }}>
              <div className="modal-card" onClick={e => e.stopPropagation()} style={{ padding: '24px 20px', position: 'relative' }}>
                <button 
                  onClick={() => setSelectedEntry(null)} 
                  style={{ 
                    position: 'absolute', top: 16, right: 16, border: 'none', 
                    background: 'none', cursor: 'pointer', color: 'var(--c-text-soft)' 
                  }}
                >
                  <X size={20} />
                </button>
                
                {/* 요리 사진 */}
                <div style={{
                  height: 180, borderRadius: 'var(--r-md)', overflow: 'hidden',
                  marginBottom: 16, background: '#f5f0e8', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  {selectedEntry.photo ? (
                    <img 
                      src={selectedEntry.photo} 
                      alt={selectedEntry.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <span style={{ fontSize: 60 }}>{selectedEntry.emoji}</span>
                  )}
                </div>

                {/* 헤더 및 날짜 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ 
                    fontSize: 11, background: 'rgba(122,46,26,0.08)', color: 'var(--c-main)', 
                    padding: '3px 10px', borderRadius: '999px', fontWeight: 600 
                  }}>
                    6월 19일
                  </span>
                  <div style={{ display: 'flex', gap: 2, color: 'var(--c-gold)', fontSize: 14 }}>
                    {'★'.repeat(selectedEntry.starred ? 5 : 4)}
                    {'☆'.repeat(selectedEntry.starred ? 0 : 1)}
                  </div>
                </div>

                {/* 요리명 */}
                <h2 style={{ margin: '0 0 10px', fontSize: 18, fontWeight: 700, color: 'var(--c-text)', textAlign: 'left' }}>
                  {selectedEntry.title}
                </h2>

                {/* 일지 내용 */}
                <div style={{ 
                  background: '#f8f5f0', borderRadius: 'var(--r-md)', 
                  padding: '14px', marginBottom: 20, minHeight: 80, textAlign: 'left'
                }}>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--c-text)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {selectedEntry.story}
                  </p>
                </div>

                {/* 확인 버튼 */}
                <button
                  onClick={() => setSelectedEntry(null)}
                  style={{
                    width: '100%', padding: '13px 0', background: 'var(--c-main)',
                    color: '#fff', border: 'none', borderRadius: '999px',
                    fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}
