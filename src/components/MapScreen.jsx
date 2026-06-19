import { useState } from 'react'
import { BookOpen, Leaf, X } from 'lucide-react'

const SEASONS = ['봄', '여름', '가을', '겨울']

const REGION_DATA = {
  봄: [
    { region: '경기도', emoji: '🍇', ingredients: ['딸기', '봄나물', '쑥'], season: '3월~5월', desc: '신선한 봄 채소와 과일의 본고장' },
    { region: '강원도', emoji: '🥕', ingredients: ['당근', '더덕', '고사리'], season: '4월~6월', desc: '청정 자연에서 자란 신선한 봄 식재료' },
    { region: '충청남도', emoji: '🍓', ingredients: ['딸기', '양파', '마늘'], season: '3월~5월', desc: '논산 딸기로 유명한 충남의 봄' },
    { region: '충청북도', emoji: '🥬', ingredients: ['상추', '시금치', '취나물'], season: '4월~6월', desc: '산지 직송 신선 채소의 고장' },
    { region: '경상북도', emoji: '🌿', ingredients: ['봄나물', '두릅', '참나물'], season: '3월~5월', desc: '경북 산지의 향긋한 봄나물' },
    { region: '경상남도', emoji: '🧄', ingredients: ['마늘', '양파', '봄배추'], season: '4월~6월', desc: '남부 특유의 풍성한 봄 채소' },
    { region: '전라북도', emoji: '🌾', ingredients: ['봄나물', '쑥', '두릅'], season: '3월~5월', desc: '전주 한식 문화의 중심지' },
    { region: '전라남도', emoji: '🥦', ingredients: ['죽순', '미나리', '참나물'], season: '4월~6월', desc: '담양 죽순과 신선한 봄 식재료' },
    { region: '제주도', emoji: '🥝', ingredients: ['한라봉', '브로콜리', '당근'], season: '3월~5월', desc: '제주 청정 환경의 봄 식재료' },
  ],
  여름: [
    { region: '경기도', emoji: '🍅', ingredients: ['토마토', '오이', '가지'], season: '6월~8월', desc: '여름 채소가 풍성한 경기 평야' },
    { region: '강원도', emoji: '🌽', ingredients: ['옥수수', '감자', '토마토'], season: '7월~9월', desc: '강원도 고랭지 여름 채소의 명산지' },
    { region: '충청남도', emoji: '🍑', ingredients: ['복숭아', '수박', '참외'], season: '7월~8월', desc: '달콤한 여름 과일의 고장' },
    { region: '충청북도', emoji: '🍉', ingredients: ['수박', '참외', '포도'], season: '6월~8월', desc: '청주 수박으로 유명한 충북' },
    { region: '경상북도', emoji: '🍑', ingredients: ['복숭아', '자두', '포도'], season: '7월~9월', desc: '경북의 달콤한 여름 과일' },
    { region: '경상남도', emoji: '🐟', ingredients: ['갈치', '고등어', '오징어'], season: '6월~8월', desc: '남해의 신선한 여름 해산물' },
    { region: '전라북도', emoji: '🥒', ingredients: ['오이', '호박', '가지'], season: '6월~8월', desc: '서해안의 싱싱한 여름 채소' },
    { region: '전라남도', emoji: '🦑', ingredients: ['낙지', '꼬막', '전복'], season: '6월~9월', desc: '남해 청정 해역의 해산물' },
    { region: '제주도', emoji: '🥭', ingredients: ['망고', '파파야', '패션후르츠'], season: '7월~9월', desc: '제주 아열대 여름 과일' },
  ],
  가을: [
    { region: '경기도', emoji: '🍠', ingredients: ['고구마', '밤', '배'], season: '9월~11월', desc: '경기도 가을 수확의 풍성함' },
    { region: '강원도', emoji: '🍄', ingredients: ['송이버섯', '표고버섯', '더덕'], season: '9월~11월', desc: '강원 산지의 가을 버섯' },
    { region: '충청남도', emoji: '🌰', ingredients: ['밤', '대추', '배'], season: '9월~10월', desc: '충남 가을 견과류와 과일' },
    { region: '충청북도', emoji: '🍎', ingredients: ['사과', '배', '포도'], season: '9월~11월', desc: '충북 가을 과일의 명산지' },
    { region: '경상북도', emoji: '🍎', ingredients: ['사과', '대추', '고추'], season: '9월~11월', desc: '경주 대추와 안동 사과' },
    { region: '경상남도', emoji: '🦀', ingredients: ['대게', '전어', '꽃게'], season: '9월~11월', desc: '가을 제철 해산물의 보고' },
    { region: '전라북도', emoji: '🍇', ingredients: ['포도', '배', '대추'], season: '9월~11월', desc: '나주 배와 전북의 가을 과일' },
    { region: '전라남도', emoji: '🐚', ingredients: ['굴', '낙지', '꼬막'], season: '10월~12월', desc: '여수 굴과 남해 가을 해산물' },
    { region: '제주도', emoji: '🍊', ingredients: ['감귤', '한라봉', '천혜향'], season: '10월~12월', desc: '제주 감귤의 수확 시즌' },
  ],
  겨울: [
    { region: '경기도', emoji: '🥬', ingredients: ['김장배추', '무', '파'], season: '11월~1월', desc: '겨울 김장의 메인 재료 산지' },
    { region: '강원도', emoji: '❄️', ingredients: ['황태', '명태', '도루묵'], season: '12월~2월', desc: '강원 겨울 명태와 황태의 고장' },
    { region: '충청남도', emoji: '🌊', ingredients: ['김', '굴', '바지락'], season: '11월~2월', desc: '서해안 겨울 해산물의 명산지' },
    { region: '충청북도', emoji: '🥕', ingredients: ['당근', '무', '우엉'], season: '11월~2월', desc: '겨울 뿌리채소의 산지' },
    { region: '경상북도', emoji: '🐡', ingredients: ['대구', '청어', '과메기'], season: '12월~2월', desc: '포항 과메기와 겨울 생선' },
    { region: '경상남도', emoji: '🦪', ingredients: ['굴', '홍합', '미더덕'], season: '11월~2월', desc: '통영 굴과 남해 겨울 해산물' },
    { region: '전라북도', emoji: '🧅', ingredients: ['양파', '마늘', '고추'], season: '11월~1월', desc: '전북의 겨울 양념 채소' },
    { region: '전라남도', emoji: '🥬', ingredients: ['김', '미역', '다시마'], season: '12월~2월', desc: '완도 김과 남해 해조류' },
    { region: '제주도', emoji: '🍊', ingredients: ['감귤', '브로콜리', '당근'], season: '11월~1월', desc: '제주 겨울 감귤의 절정 시즌' },
  ],
}

export default function MapScreen({ onAskAi }) {
  const [selected, setSelected] = useState('봄')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const regions = REGION_DATA[selected] || []

  return (
    <section style={{ position: 'relative', minHeight: '100%' }}>
      <div className="header">
        <h1><BookOpen size={18} /> 요리가 즐거워!</h1>
      </div>

      <div className="filter-row">
        {SEASONS.map((s) => (
          <button
            key={s}
            className={`chip ${selected === s ? 'selected' : ''}`}
            onClick={() => setSelected(s)}
          >
            {s === '봄' && <Leaf size={12} />}{s}
          </button>
        ))}
      </div>

      {/* 3열 지역 그리드 */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10, padding: '0 16px 96px'
      }}>
        {regions.map((r, i) => (
          <button
            key={i}
            onClick={() => { setSelectedRegion(r); setModalOpen(true) }}
            style={{
              background: '#fff', border: '1px solid var(--c-border)',
              borderRadius: 'var(--r-md)', padding: '14px 8px',
              textAlign: 'center', cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 6,
            }}
          >
            <div style={{ fontSize: 28 }}>{r.emoji}</div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: 'var(--c-text)' }}>{r.region}</p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--c-text)', lineHeight: 1.4, fontWeight: 500 }}>
              {r.ingredients.join(' · ')}
            </p>
          </button>
        ))}
      </div>

      {/* 상세 모달 */}
      {modalOpen && selectedRegion && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="close-x" onClick={() => setModalOpen(false)}><X size={18} /></button>

            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 44, marginBottom: 8 }}>{selectedRegion.emoji}</div>
              <h2 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700 }}>{selectedRegion.region}</h2>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--c-text-soft)' }}>{selectedRegion.desc}</p>
            </div>

            <div style={{
              background: 'rgba(59,109,17,0.06)', borderRadius: 'var(--r-md)',
              padding: '10px 14px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <Leaf size={14} style={{ color: 'var(--c-green)', flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--c-green)', fontWeight: 600 }}>
                제철 시기: {selectedRegion.season}
              </span>
            </div>

            <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 700, color: 'var(--c-text-soft)' }}>
              이 지역의 제철 식재료 (클릭 시 AI 추천 질문)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {selectedRegion.ingredients.map((ing, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (onAskAi) {
                      onAskAi(ing, selectedRegion.region, selectedRegion.season)
                    }
                    setModalOpen(false)
                  }}
                  style={{
                    width: '100%', border: 'none', textAlign: 'left',
                    padding: '10px 14px', background: '#f8f5f0',
                    borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 600,
                    color: 'var(--c-text)', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', cursor: 'pointer',
                  }}
                  className="modal-ing-btn"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{ing}</span>
                    <span style={{ fontSize: 10, background: 'rgba(59,109,17,0.1)', color: 'var(--c-green)', padding: '2px 6px', borderRadius: 4 }}>
                      AI 추천 ➜
                    </span>
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--c-text-soft)' }}>{selectedRegion.season}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setModalOpen(false)}
              style={{
                width: '100%', padding: '13px 0', background: 'var(--c-main)',
                color: '#fff', border: 'none', borderRadius: '999px',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
