import { useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import MapScreen from './components/MapScreen.jsx'
import AiScreen from './components/AiScreen.jsx'
import DiaryScreen from './components/DiaryScreen.jsx'
import ProfileScreen from './components/ProfileScreen.jsx'
import ConnectModal from './components/ConnectModal.jsx'

const DEFAULT_MESSAGES = [
  { from: 'ai', text: '안녕하세요! 오늘 어떤 요리를 고민 중이신가요? 제철 재료 추천부터 구체적인 요리 레시피까지 상세하게 도와드릴게요! 🧑‍🍳' },
  { from: 'user', text: '라구파스타 어떻게 만들어?' },
  { from: 'ai', text: `집에서 깊은 풍미를 낼 수 있는 볼로네제 스타일 **라구 파스타 레시피**입니다! 🍝

[기본 재료]
- 다진 소고기 200g, 다진 돼지고기 100g
- 양파 1개, 당근 1/2개, 셀러리 1대 (다짐)
- 토마토 홀 1캔(400g), 토마토 페이스트 2T
- 레드 와인 1/2컵, 월계수잎 2장, 올리브유

[조리 순서]
1. 달군 냄비에 올리브유를 두르고 다진 채소(양파, 당근, 셀러리)를 충분히 볶아 단맛을 냅니다.
2. 다진 고기를 넣고 수분이 다 날아가고 기름이 투명해질 때까지 바짝 볶아 고소함을 살립니다.
3. 토마토 페이스트를 넣고 볶은 뒤 레드 와인을 부어 알코올을 날려줍니다.
4. 토마토 홀캔과 물 1컵, 월계수잎을 넣고 뚜껑을 덮어 약불에서 1시간 동안 뭉근히 끓여 소스를 완성합니다.
5. 삶아둔 파스타 면에 소스를 넣고 비벼 치즈를 올려 드세요!` },
]

export default function App() {
  const [screen, setScreen] = useState('map') // 'map' | 'ai' | 'diary' | 'profile'
  const [modalOpen, setModalOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState(DEFAULT_MESSAGES)

  const handleAskAi = (ingredient, region, season) => {
    const userMsg = `${region}의 ${season} 제철 식재료인 '${ingredient}'로 할 수 있는 맛있는 요리를 추천해줘!`
    
    // Generate simulated AI response based on the ingredient
    let aiResponse = `'${ingredient}'은(는) 정말 훌륭한 제철 식재료네요! 다음과 같은 요리를 추천해 드립니다:\n\n`
    
    if (ingredient === '딸기') {
      aiResponse += `1. **딸기 샐러드**: 신선한 봄 채소에 생딸기를 얹고, 발사믹 글레이즈나 요거트 드레싱을 곁들이면 아주 상큼합니다.\n2. **딸기 샌드위치**: 생크림과 달콤한 딸기를 식빵 사이에 샌드하여 간단하고 기분 좋은 디저트를 만들어보세요.`
    } else if (['봄나물', '참나물', '취나물', '봄배추', '상추', '시금치', '미나리'].includes(ingredient)) {
      aiResponse += `1. **${ingredient} 비빔밥**: 고추장과 참기름, 달걀 프라이를 곁들여 향긋한 봄 비빔밥을 완성해보세요.\n2. **${ingredient} 겉절이**: 액젓과 고춧가루, 매실청으로 가볍게 버무려 고기 요리와 함께 즐기면 아주 맛있습니다.`
    } else if (ingredient === '쑥') {
      aiResponse += `1. **쑥국**: 들깨가루를 푼 구수한 멸치 육수에 바지락과 쑥을 넣어 끓이면 깊고 진한 맛을 느낄 수 있습니다.\n2. **쑥전**: 밀가루 반죽에 쑥을 듬뿍 넣어 노릇하게 부쳐내면 바삭하고 향긋한 간식이 됩니다.`
    } else if (ingredient === '당근') {
      aiResponse += `1. **당근 라페**: 채 썬 당근에 올리브유, 레몬즙, 홀그레인 머스타드를 섞어 절여두면 샌드위치나 샐러드 부재료로 최고입니다.\n2. **당근전**: 당근을 채 썰어 전으로 부치면 당근 고유의 단맛이 극대화되어 아이들도 잘 먹습니다.`
    } else if (ingredient === '더덕') {
      aiResponse += `1. **더덕구이**: 두드려 부드럽게 만든 더덕에 고추장 양념을 발라 구우면 쌉싸름하면서도 매콤한 최고의 밥도둑이 됩니다.\n2. **더덕 생채**: 얇게 찢어 새콤달콤하게 무쳐내면 입맛을 돋우는 반찬이 됩니다.`
    } else if (ingredient === '고사리') {
      aiResponse += `1. **고사리나물볶음**: 삶은 고사리를 들기름과 국간장, 다진 마늘로 조물조물 무쳐 팬에 볶아내면 고소하고 부드러운 나물이 됩니다.\n2. **고사리 육개장**: 잘게 찢은 고사리를 푹 끓여 걸쭉하게 만든 제주식 육개장에 도전해보세요.`
    } else if (['마늘', '양파'].includes(ingredient)) {
      aiResponse += `1. **장아찌**: 간장 배합초를 끓여 부어두면 사계절 내내 든든한 밑반찬이 됩니다.\n2. **갈릭/어니언 버터구이**: 육류나 생선 구이에 가니쉬로 함께 구워 드시면 풍미를 더해줍니다.`
    } else if (ingredient === '두릅') {
      aiResponse += `1. **두릅 숙회**: 끓는 물에 살짝 데쳐 초고추장에 찍어 먹으면 두릅 본연의 쌉쌀하고 향긋한 맛을 가장 잘 느낄 수 있습니다.\n2. **두릅 베이컨 말이**: 데친 두릅을 베이컨으로 말아 팬에 구워내면 손님 접대용으로도 훌륭합니다.`
    } else if (ingredient === '죽순') {
      aiResponse += `1. **죽순 초무침**: 아삭한 죽순을 데쳐 초고추장에 미나리, 오이와 함께 새콤하게 무쳐보세요.\n2. **죽순 들깨볶음**: 고소한 들깨가루와 함께 볶아내면 담백하고 부드러운 맛이 일품입니다.`
    } else if (['한라봉', '감귤'].includes(ingredient)) {
      aiResponse += `1. **한라봉/감귤 드레싱 샐러드**: 과즙에 올리브유와 식초를 섞어 상큼한 드레싱을 만들어 샐러드에 곁들여보세요.\n2. **수제 과일 에이드**: 탄산수와 꿀을 넣어 시원하고 건강한 음료로 만들어 보세요.`
    } else if (ingredient === '브로콜리') {
      aiResponse += `1. **브로콜리 두부무침**: 데친 브로콜리와 으깬 두부를 소금, 참기름으로 무치면 단백하고 고소합니다.\n2. **브로콜리 스프**: 부드럽게 끓여 감자와 함께 갈아내면 영양 만점 아침 식사가 완성됩니다.`
    } else {
      aiResponse += `1. **${ingredient} 볶음**: 식재료 본연의 맛과 식감을 살려 가볍게 볶아 조리해 보세요.\n2. **${ingredient} 샐러드**: 신선한 제철 채소들과 함께 샐러드로 즐겨보세요.`
    }

    setChatMessages(prev => [
      ...prev,
      { from: 'user', text: userMsg },
      { from: 'ai', text: aiResponse }
    ])
    setScreen('ai')
  }

  return (
    <div className="app-shell">
      <div 
        key={screen}
        className="screen-content" 
        style={{
          display: screen === 'ai' ? 'flex' : 'block',
          flexDirection: screen === 'ai' ? 'column' : 'unset',
          overflowY: screen === 'ai' ? 'hidden' : 'auto',
          height: '100%'
        }}
      >
        {screen === 'map' && <MapScreen onAskAi={handleAskAi} />}
        {screen === 'ai' && <AiScreen messages={chatMessages} setMessages={setChatMessages} />}
        {screen === 'diary' && <DiaryScreen />}
        {screen === 'profile' && <ProfileScreen onConnect={() => setModalOpen(true)} />}
      </div>

      <BottomNav active={screen} onChange={setScreen} />

      <ConnectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
