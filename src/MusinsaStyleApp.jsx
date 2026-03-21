import { useState, useRef, useEffect } from "react";

/* ══════════════════════════════════════════════════════════════
   아하철 × MUSINSA 다크 — 무신사 레이아웃 + 아하철 다크 컬러
   파일: musinsa-style.jsx  (아하철앱.jsx 를 전혀 변경하지 않음)
   · 색상: 기존 다크 테마 그대로
   · 콘텐츠 & 흐름: 기존 아하철 순서 그대로
   · 디자인만: 무신사 레이아웃/타이포/카드/탭/하단바 적용
   ══════════════════════════════════════════════════════════════ */

// ── 컬러 시스템 (원본 아하철 다크 테마) ─────────────────────────
const C = {
  primary:  '#00BAF6',
  keyColor: '#2ACF6C',
  brand:    '#2EE477',
  red:      '#EB4D3D',
  white:    '#FFFFFF',
  bg:       '#0E0F14',
  card:     '#14151B',   // 무신사 카드 표면 (조금 밝은 다크)
  border:   'rgba(255,255,255,0.08)',
  borderMd: 'rgba(255,255,255,0.12)',
  g: { 50:'#D1D2D9', 60:'#B7B9C3', 70:'#95979F', 80:'#74757C' },
  line: {
    s1:'#2A3E91', s2:'#60B157', s3:'#FE8A39', s4:'#509DD8', s5:'#7F41D8',
    s6:'#A95523', s7:'#727719', s8:'#D2386E', s9:'#D1A946', sin:'#BC2A38',
    1:'#2A3E91', 2:'#60B157', 3:'#FE8A39', 4:'#509DD8', 5:'#7F41D8',
    6:'#A95523', 7:'#727719', 8:'#D2386E', 9:'#D1A946',
  },
  risk: { SAFE:'rgba(16,185,129,0.75)', WARN:'rgba(245,158,11,0.75)', HIGH:'rgba(239,68,68,0.75)' },
  /* 테마 적용 전 기본값 (dark 기준) */
  navBg:    '#0A0B0F',  navText: '#B7B9C3', navActive: '#FFFFFF',
  inputBg:  '#1C1D25',  headerBg: '#0A0B0F',
  stickyBg: '#0A0B0F',  modalBg: '#18191F',
  glass1:   'rgba(255,255,255,0.05)',
  glass2:   'rgba(255,255,255,0.07)',
  glass3:   'rgba(255,255,255,0.10)',
  textSub:  '#FFFFFF',
};

/* ══════════════════════════════════════════════════════════
   라이트 테마 컬러 팔레트
   ══════════════════════════════════════════════════════════ */
const DARK_C = {
  primary:  '#00BAF6', keyColor: '#2ACF6C', brand: '#2EE477', red: '#EB4D3D',
  white:    '#FFFFFF',
  bg:       '#0E0F14',
  card:     '#14151B',
  border:   'rgba(255,255,255,0.08)',
  borderMd: 'rgba(255,255,255,0.12)',
  g: { 50:'#D1D2D9', 60:'#B7B9C3', 70:'#95979F', 80:'#74757C' },
  line: C.line, risk: C.risk,
  navBg:    '#0A0B0F',  navText: '#B7B9C3', navActive: '#FFFFFF',
  inputBg:  '#1C1D25',  headerBg: '#0A0B0F',
  stickyBg: '#0A0B0F',  modalBg: '#18191F',
  glass1:   'rgba(255,255,255,0.05)',
  glass2:   'rgba(255,255,255,0.07)',
  glass3:   'rgba(255,255,255,0.10)',
  textSub:  '#FFFFFF',
};

const LIGHT_C = {
  primary:  '#007AB8', keyColor: '#1A9E52', brand: '#1A9E52', red: '#D93025',
  white:    '#0D0E14',
  bg:       '#F2F2F7',
  card:     '#FFFFFF',
  border:   'rgba(0,0,0,0.08)',
  borderMd: 'rgba(0,0,0,0.14)',
  g: { 50:'#4A4B55', 60:'#6B6C75', 70:'#8A8B94', 80:'#ADADB5' },
  line: C.line, risk: C.risk,
  navBg:    '#FFFFFF',  navText: '#6B6C75', navActive: '#007AB8',
  inputBg:  '#F2F2F7',  headerBg: '#F9F9FB',
  stickyBg: '#F9F9FB',  modalBg: '#FFFFFF',
  glass1:   'rgba(0,0,0,0.04)',
  glass2:   'rgba(0,0,0,0.06)',
  glass3:   'rgba(0,0,0,0.09)',
  textSub:  '#0D0E14',
};

// 전역 테마 상태 (Object.assign 뮤테이션 방식)
let __isDark = true;
function applyTheme(dark) {
  __isDark = dark;
  const src = dark ? DARK_C : LIGHT_C;
  Object.assign(C, src);
  Object.assign(C.g, src.g);
  // 초기 C.line/risk는 보존 (양 테마 동일)
  C.line = DARK_C.line;
  C.risk = DARK_C.risk;
}

const FF = "'Apple SD Gothic Neo','Noto Sans KR','Malgun Gothic',sans-serif";
const cColor = v => v >= 80 ? C.red : v >= 60 ? '#F0A500' : C.keyColor;
const cLabel = v => v >= 80 ? '매우혼잡' : v >= 60 ? '혼잡' : v >= 40 ? '보통' : '원활';

// 8px 섹션 구분 divider
const Div8 = ({h=8}) => <div style={{ height:h, background:C.bg }} />;

// 무신사 스타일 섹션 헤더 (다크)
const SecHead = ({title, action, onAction}) => (
  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
    <b style={{ fontSize:16, fontWeight:800, color:C.white, letterSpacing:'-0.03em', fontFamily:FF,
      transition:'color 0.3s ease' }}>
      {title}
    </b>
    {action && (
      <span onClick={onAction} style={{ fontSize:12, color:C.g[70], cursor:'pointer' }}>
        {action}
      </span>
    )}
  </div>
);

// 태그 배지
const Tag = ({t, bg, col='#fff', fw=700}) => (
  <span style={{ display:'inline-flex', alignItems:'center', fontSize:10, fontWeight:fw,
    padding:'2px 7px', borderRadius:3, background:bg, color:col,
    letterSpacing:'0.02em', lineHeight:'16px' }}>
    {t}
  </span>
);

// 무신사 다크 카드 래퍼
const DCard = ({children, style:extra}) => (
  <div style={{ background:C.card, border:`1px solid ${C.border}`,
    borderRadius:8, padding:'14px 16px', ...extra }}>
    {children}
  </div>
);

// ── 기본 데이터 (원본 아하철앱.jsx 와 동일) ───────────────────────
const GREETING_PHRASES = [
  '멋진 오늘을 응원해요', '정말 잘하고 있어요', '언제나 늘 응원할게요',
  '매일매일 반가워요!', '힘차게 시작해볼까요?', '활짝 웃는 하루되세요',
  '하나씩 이뤄가볼까요?', '목표에 한 걸음 다가가요!',
];

const NAV = [
  { s:'홈'      },
  { s:'지하철'  },
  { s:'커뮤니티' },
  { s:'유실물'  },
  { s:'마이'    },
];

// ── 호선 데이터 (short: 배지 표시용, status: 운행현황) ─────────────
const SUBWAY_LINES_DATA = [
  { id:'1',   name:'1호선',   short:'1', color:C.line[1],   status:'normal',
    stations:['소요산','의정부','창동','청량리','동대문','종각','시청','서울역','남영','용산'] },
  { id:'2',   name:'2호선',   short:'2', color:C.line[2],   status:'delay',
    stations:['홍대입구','신촌','이대','아현','충정로','시청','을지로3가','왕십리','성수','건대입구','잠실','선릉','강남','역삼','교대','서초'] },
  { id:'3',   name:'3호선',   short:'3', color:C.line[3],   status:'normal',
    stations:['불광','연신내','홍제','경복궁','안국','종로3가','을지로3가','충무로','동대입구','약수','압구정','신사','고속터미널','교대','남부터미널','양재','도곡','대치','수서'] },
  { id:'4',   name:'4호선',   short:'4', color:C.line[4],   status:'normal',
    stations:['당고개','상계','노원','창동','미아','길음','성신여대입구','혜화','동대문','충무로','명동','서울역','삼각지','이촌','동작','사당','남태령'] },
  { id:'5',   name:'5호선',   short:'5', color:C.line[5],   status:'crowded',
    stations:['방화','김포공항','발산','화곡','까치산','목동','오목교','양평','영등포구청','여의도','여의나루','마포','공덕','애오개','광화문','종로3가','왕십리','군자','천호','강동'] },
  { id:'sin', name:'신분당선', short:'신', color:C.line.sin, status:'normal',
    stations:['강남','양재','양재시민의숲','청계산입구','판교','정자','미금','동천','수지구청','상현','광교중앙','광교'] },
];

// ── 커뮤니티 게시글 (station·likes 필드 추가, 12건으로 확장) ─────────
const COMMUNITY_POSTS = [
  { id:1,  title:'강남역 2호선 승강장 혼잡도 오늘 진짜 심각합니다',       writer:'강남러버',    createdAt:'3분 전',    commentCnt:24, likes:47,  subwayLineId:'2',   station:'강남',     category:'ISSUE',   urgent:true  },
  { id:2,  title:'선릉역 근처 점심 맛집 추천 받습니다',                    writer:'점심고민러',  createdAt:'15분 전',   commentCnt:18, likes:32,  subwayLineId:'2',   station:'선릉',     category:'FREE',    urgent:false },
  { id:3,  title:'5호선 오늘도 연착... 왜 항상 이러는건지',                writer:'직장인A',     createdAt:'32분 전',   commentCnt:7,  likes:14,  subwayLineId:'5',   station:'여의도',   category:'ISSUE',   urgent:false },
  { id:4,  title:'강남역 환기 시스템 교체 완료 - 체감하시나요?',            writer:'지하철덕후',  createdAt:'1시간 전',  commentCnt:33, likes:61,  subwayLineId:'2',   station:'강남',     category:'INSIGHT', urgent:false },
  { id:5,  title:'신분당선 판교역 스타벅스 아침마다 20분 대기',             writer:'판교개발자',  createdAt:'2시간 전',  commentCnt:12, likes:19,  subwayLineId:'sin', station:'판교',     category:'FREE',    urgent:false },
  { id:6,  title:'교대역 에스컬레이터 5일째 고장 - 빠른 수리 요청합니다',  writer:'불편한시민',  createdAt:'3시간 전',  commentCnt:45, likes:88,  subwayLineId:'3',   station:'교대',     category:'ISSUE',   urgent:false },
  { id:7,  title:'2호선 성수행 빠른 하차 위치 총정리 (문 옆 기준)',         writer:'통근마스터',  createdAt:'4시간 전',  commentCnt:56, likes:120, subwayLineId:'2',   station:'성수',     category:'INSIGHT', urgent:false },
  { id:8,  title:'홍대입구역 신규 편의점 위치 아시는 분?',                  writer:'홍대러',      createdAt:'5시간 전',  commentCnt:9,  likes:11,  subwayLineId:'2',   station:'홍대입구', category:'FREE',    urgent:false },
  { id:9,  title:'1호선 청량리 방면 오늘 30분 지연 공지 떴어요',            writer:'청량리인',    createdAt:'6시간 전',  commentCnt:15, likes:28,  subwayLineId:'1',   station:'청량리',   category:'ISSUE',   urgent:true  },
  { id:10, title:'신분당선 강남역 4번 출구 공사 종료 시점 아시나요',        writer:'강남출근',    createdAt:'7시간 전',  commentCnt:6,  likes:9,   subwayLineId:'sin', station:'강남',     category:'FREE',    urgent:false },
  { id:11, title:'4호선 이촌역 열차 이격 너무 심해 민원 넣었습니다',        writer:'안전제일',    createdAt:'8시간 전',  commentCnt:22, likes:44,  subwayLineId:'4',   station:'이촌',     category:'ISSUE',   urgent:false },
  { id:12, title:'왕십리역 2↔5호선 환승 최단 경로 업데이트 공유',           writer:'환승달인',    createdAt:'9시간 전',  commentCnt:38, likes:77,  subwayLineId:'2',   station:'왕십리',   category:'INSIGHT', urgent:false },
];

// ── 유실물 데이터 ─────────────────────────────────────────────────
const LOST_DATA = [
  { id:1, title:'검정 우산 (접이식)',  line:'2',   station:'강남역',    date:'오늘',   status:'보관중',   emoji:'☂️',
    desc:'검정색 3단 접이식 우산, 손잡이에 흰색 리본 장식', color:'검정', keepAt:'강남역 역무실 1층', foundBy:'역무원 김○○', phone:'02-1234-5678', foundTime:'오전 8시 30분' },
  { id:2, title:'파란 에코백',         line:'sin', station:'판교역',    date:'어제',   status:'보관중',   emoji:'👜',
    desc:'연파랑 캔버스 에코백, 내부에 립스틱·지갑 없음, 브랜드 로고 없음', color:'파랑', keepAt:'판교역 역무실', foundBy:'승객 신고', phone:'031-8000-0000', foundTime:'오후 6시 15분' },
  { id:3, title:'갤럭시워치 (실버)',   line:'9',   station:'신논현역',  date:'3일 전', status:'보관중',   emoji:'⌚',
    desc:'삼성 갤럭시워치4 실버 컬러, 검정 밴드, 화면 잠김 상태', color:'실버', keepAt:'신논현역 역무실', foundBy:'역무원 박○○', phone:'02-2222-3333', foundTime:'오전 7시 52분' },
  { id:4, title:'검정 장갑 한 짝',    line:'5',   station:'여의도역',  date:'4일 전', status:'인계완료', emoji:'🧤',
    desc:'검정 가죽 장갑 오른쪽 한 짝, 남성용 L사이즈', color:'검정', keepAt:'여의도역 역무실 (인계 완료)', foundBy:'승객 신고', phone:'02-3333-4444', foundTime:'오후 5시 20분' },
  { id:5, title:'노란 텀블러',        line:'2',   station:'홍대입구역',date:'5일 전', status:'보관중',   emoji:'🥤',
    desc:'스타벅스 노란 텀블러 350ml, 뚜껑 있음, 내용물 없음', color:'노랑', keepAt:'홍대입구역 역무실 2층', foundBy:'역무원 최○○', phone:'02-4444-5555', foundTime:'오전 9시 40분' },
  { id:6, title:'에어팟 프로 케이스', line:'3',   station:'교대역',    date:'6일 전', status:'인계완료', emoji:'🎧',
    desc:'애플 에어팟 프로 2세대 충전 케이스, 배터리 잔량 40%', color:'화이트', keepAt:'교대역 역무실 (인계 완료)', foundBy:'승객 신고', phone:'02-5555-6666', foundTime:'오후 7시 10분' },
];

/* ═══════════════════════════════════════════════════════
   공통 레이아웃 컴포넌트
   ═══════════════════════════════════════════════════════ */

// 차량 혼잡도 바 (원본 동일)
function CongBar({ cars }) {
  const max = Math.max(...cars);
  return (
    <div style={{ display:'flex', gap:1.5, marginTop:5, marginBottom:3 }}>
      {cars.map((v, i) => {
        const lvl = v <= 3 ? 0 : v <= 6 ? 1 : 2;
        const colors = [C.keyColor, '#F59E0B', C.red];
        return (
          <div key={i} style={{ flex:1, height:3, borderRadius:1.5,
            background:colors[lvl], opacity:0.6+0.4*(v/max) }} />
        );
      })}
    </div>
  );
}

// 무신사 스타일 상단 헤더 (다크)
function AppHeader({ onSearch, onNotif, onChat, notifCount, chatCount, isDark }) {
  return (
    <div style={{ background: isDark ? C.stickyBg : '#F9F9FB',
      paddingTop:'env(safe-area-inset-top,44px)',
      position:'sticky', top:0, zIndex:200,
      borderBottom: `1px solid ${C.border}`,
      transition:'background 0.3s ease' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        height:52, padding:'0 16px' }}>
        {/* 로고 + 역명 드롭다운 */}
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <span style={{ fontSize:19, fontWeight:900, color:C.white,
            letterSpacing:'-0.05em', fontFamily:FF }}>아하철</span>
          <div style={{ display:'flex', alignItems:'center', gap:2,
            background:C.glass2, borderRadius:6,
            border:`1px solid ${C.border}`,
            padding:'3px 8px', cursor:'pointer',
            transition:'background 0.3s ease' }}>
            <span style={{ fontSize:11, color:C.g[50], fontWeight:700 }}>강남역</span>
            <span style={{ fontSize:9, color:C.g[70] }}>▾</span>
          </div>
        </div>
        {/* 우측 아이콘 */}
        <div style={{ display:'flex', gap:2, alignItems:'center' }}>
          {/* 알림 아이콘 */}
          <div onClick={onNotif}
            style={{ width:36, height:36, display:'flex', alignItems:'center',
              justifyContent:'center', position:'relative', cursor:'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke={notifCount > 0 ? C.white : C.g[50]} strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {notifCount > 0 && (
              <div style={{ position:'absolute', top:4, right:4,
                minWidth:16, height:16, borderRadius:8,
                background:'#EF4444', border:`2px solid ${C.stickyBg}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                padding:'0 3px' }}>
                <span style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF }}>
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              </div>
            )}
          </div>
          {/* 채팅 아이콘 */}
          <div onClick={onChat}
            style={{ width:36, height:36, display:'flex', alignItems:'center',
              justifyContent:'center', position:'relative', cursor:'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke={chatCount > 0 ? C.white : C.g[50]} strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {chatCount > 0 && (
              <div style={{ position:'absolute', top:4, right:4,
                minWidth:16, height:16, borderRadius:8,
                background:C.primary, border:`2px solid ${C.stickyBg}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                padding:'0 3px' }}>
                <span style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF }}>
                  {chatCount > 9 ? '9+' : chatCount}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
      {/* 검색바 (무신사 스타일) */}
      <div onClick={onSearch}
        style={{ height:40,
          background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
          borderRadius:20, margin:'0 16px 12px',
          display:'flex', alignItems:'center', padding:'0 14px', gap:8, cursor:'text',
          border:`1px solid ${C.border}`,
          transition:'background 0.3s ease' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke={C.g[70]} strokeWidth="2" style={{ flexShrink:0 }}>
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <span style={{ fontSize:13, color:C.g[80], flex:1, fontFamily:FF }}>
          오늘 강남역 혼잡 예측 확인하기
        </span>
      </div>
    </div>
  );
}

// 무신사 스타일 탭 내비 (다크)
function TabNav({ tabs, active, onTab }) {
  return (
    <div style={{ background:C.stickyBg, display:'flex',
      borderBottom:`1px solid ${C.border}`,
      overflowX:'auto', scrollbarWidth:'none', flexShrink:0,
      transition:'background 0.3s ease' }}>
      {tabs.map(t => {
        const isAct = t === active;
        return (
          <div key={t} onClick={() => onTab(t)}
            style={{ flexShrink:0, padding:'11px 14px', fontSize:13,
              fontWeight: isAct ? 800 : 500,
              color: isAct ? C.navActive : C.g[70],
              borderBottom: isAct ? `2px solid ${C.navActive}` : '2px solid transparent',
              cursor:'pointer', whiteSpace:'nowrap', fontFamily:FF,
              transition:'color 0.2s ease' }}>
            {t}
          </div>
        );
      })}
    </div>
  );
}

// 하단 내비게이션 (무신사 5탭 구조, 다크)
function BottomNav({ screen, setScreen }) {
  return (
    <div style={{ position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
      width:'100%', maxWidth:390, background: C.navBg,
      borderTop:`1px solid ${C.border}`,
      display:'flex', paddingBottom:'env(safe-area-inset-bottom,6px)', zIndex:300,
      transition:'background 0.3s ease' }}>
      {NAV.map(it => {
        const active = it.s === screen;
        return (
          <div key={it.s} onClick={() => setScreen(it.s)}
            style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', padding:'8px 0 4px', cursor:'pointer' }}>
            <span style={{ fontSize:10, fontFamily:FF,
              color: active ? (C.navActive ?? C.white) : C.g[70],
              fontWeight: active ? 800 : 400, marginTop:2 }}>
              {it.s}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   홈 화면 서브 컴포넌트 (원본 콘텐츠 + 무신사 레이아웃)
   ═══════════════════════════════════════════════════════ */

// 1. 날씨 + 이동 안내 통합 카드 (실시간 열차 섹션 바로 아래)
function WeatherCommuteCard() {
  return (
    <div style={{ margin:'10px 16px 0' }}>
      <DCard style={{ padding:'14px 16px' }}>
        {/* 상단: 날씨 */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.white,
              letterSpacing:'-0.02em', fontFamily:FF, marginBottom:6 }}>
              강남 일대 맑고 쾌청, 낮 최고 23도
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
              <span style={{ fontSize:11, color:C.g[70] }}>자외선 지수 높음 · 외출 시 선크림 권장</span>
              <span style={{ fontSize:11, color:C.g[70] }}>오늘 오후 퇴근길 노을이 예쁠 것 같아요</span>
            </div>
          </div>
          <span style={{ fontSize:11, color:C.primary, cursor:'pointer', flexShrink:0, marginTop:2 }}>
            날씨 더보기 ›
          </span>
        </div>

        {/* 구분선 */}
        <div style={{ height:1, background:C.border, margin:'12px 0' }} />

        {/* 하단: 이동 안내 */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:4, background:C.keyColor, flexShrink:0 }} />
            <span style={{ fontSize:12, color:C.white, fontFamily:FF, fontWeight:600 }}>
              강남 → 광화문 08:12(21분 후) 출발 권장
            </span>
          </div>
          <span style={{ fontSize:11, color:C.primary, cursor:'pointer', flexShrink:0 }}>설정 ›</span>
        </div>
      </DCard>
    </div>
  );
}

// 2-A. 첫차/막차 바텀시트 내용
function LastrainSheet() {
  const [dayTab, setDayTab] = React.useState('주중');
  const DAYS = ['주중', '토요일', '일·공휴일'];
  const LR = {
    '주중':      { dirs:['성수방향','신도림방향'], first:['05:32','05:29'], last:['01:01','01:02'] },
    '토요일':    { dirs:['성수방향','신도림방향'], first:['06:05','05:58'], last:['01:01','01:02'] },
    '일·공휴일': { dirs:['성수방향','신도림방향'], first:['06:05','06:00'], last:['24:00','24:00'] },
  };
  const data = LR[dayTab];
  const getNowMin = () => { const n=new Date(); return n.getHours()*60+n.getMinutes(); };
  const parseT = t => { const[h,m]=t.split(':').map(Number); return h*60+m; };
  const remaining = t => { const d=parseT(t)-getNowMin(); if(d<=0)return null; return d<60?`${d}분 후`:`${Math.floor(d/60)}시간 ${d%60}분 후`; };

  return (
    <div style={{ overflowY:'auto', maxHeight:420, paddingBottom:20 }}>
      {/* 역 레이블 */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 20px 10px' }}>
        <div style={{ width:22, height:22, borderRadius:11, background:C.line['2'],
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>2</div>
        <span style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF }}>강남역 · 2호선</span>
        <span style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginLeft:'auto' }}>서울교통공사 기준</span>
      </div>

      {/* 요일 탭 */}
      <div style={{ display:'flex', gap:6, padding:'0 20px', marginBottom:14 }}>
        {DAYS.map(d => (
          <button key={d} onClick={() => setDayTab(d)}
            style={{ flex:1, padding:'8px 0', borderRadius:10, border:'none', cursor:'pointer',
              fontSize:12, fontWeight:700, fontFamily:FF,
              background: dayTab===d ? C.primary : 'rgba(255,255,255,0.07)',
              color: dayTab===d ? '#fff' : C.g[60], transition:'all 0.18s' }}>
            {d}
          </button>
        ))}
      </div>

      {/* 방향별 카드 */}
      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap:10 }}>
        {data.dirs.map((dir, i) => {
          const rem = remaining(data.last[i]);
          return (
            <div key={dir} style={{ background:C.card, border:`1px solid ${C.border}`,
              borderRadius:14, overflow:'hidden' }}>
              {/* 방향 헤더 */}
              <div style={{ padding:'11px 16px 9px', borderBottom:`1px solid ${C.border}`,
                display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                  <span style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF }}>{dir}</span>
                </div>
                {rem && (
                  <span style={{ fontSize:10, color:'#FBBF24', fontWeight:700, fontFamily:FF,
                    background:'rgba(251,191,36,0.12)', padding:'2px 8px', borderRadius:6 }}>
                    막차 {rem}
                  </span>
                )}
              </div>
              {/* 첫차/막차 row */}
              <div style={{ display:'flex' }}>
                <div style={{ flex:1, padding:'14px 18px', borderRight:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:10, letterSpacing:'0.07em', color:C.g[70],
                    fontFamily:FF, marginBottom:7 }}>첫  차</div>
                  <div style={{ fontSize:24, fontWeight:900, color:'#34D399',
                    fontFamily:FF, letterSpacing:'-0.04em', lineHeight:1 }}>
                    {data.first[i]}
                  </div>
                </div>
                <div style={{ flex:1, padding:'14px 18px' }}>
                  <div style={{ fontSize:10, letterSpacing:'0.07em', color:C.g[70],
                    fontFamily:FF, marginBottom:7 }}>막  차</div>
                  <div style={{ fontSize:24, fontWeight:900,
                    color: rem ? '#F87171' : C.g[60],
                    fontFamily:FF, letterSpacing:'-0.04em', lineHeight:1 }}>
                    {data.last[i]}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 안내 문구 */}
      <div style={{ margin:'12px 20px 0', padding:'10px 14px',
        background:'rgba(0,186,246,0.06)', border:`1px solid rgba(0,186,246,0.16)`,
        borderRadius:10 }}>
        <div style={{ fontSize:11, color:C.g[60], fontFamily:FF, lineHeight:1.65 }}>
          ⚠️ 열차 상황에 따라 변동될 수 있습니다. 출발 전 코레일·서울교통공사 앱에서 재확인하세요.
        </div>
      </div>
    </div>
  );
}

// 2-B. 편의시설 바텀시트 내용
function FacilitySheet() {
  const [catTab, setCatTab] = React.useState('전체');
  const CATS = ['전체','편의점','화장실','엘리베이터','ATM','수유실'];
  const FACS = [
    { cat:'편의점',    icon:'🏪', name:'GS25 강남역점',   loc:'지하 1층 · 1번 출구 방향', hours:'24시간',        ok:true  },
    { cat:'편의점',    icon:'🏪', name:'CU 강남역사점',   loc:'지하 2층 · 4번 출구 방향', hours:'05:30~01:00', ok:true  },
    { cat:'화장실',    icon:'🚻', name:'남·녀 화장실 A',  loc:'1·2호 승강장 중간',        hours:'상시',         ok:true  },
    { cat:'화장실',    icon:'🚻', name:'남·녀 화장실 B',  loc:'5·6번 출구 근처',          hours:'상시',         ok:true  },
    { cat:'엘리베이터',icon:'🛗', name:'엘리베이터 1번',  loc:'1번 출구 지상~지하2층',    hours:'05:30~01:00', ok:true  },
    { cat:'엘리베이터',icon:'🛗', name:'엘리베이터 10번', loc:'10번 출구 지상~지하2층',   hours:'05:30~01:00', ok:false },
    { cat:'ATM',       icon:'🏧', name:'우리은행 ATM',    loc:'지하 1층 대합실',          hours:'24시간',        ok:true  },
    { cat:'ATM',       icon:'🏧', name:'신한은행 ATM',    loc:'지하 2층 승강장 입구',     hours:'07:00~22:00', ok:true  },
    { cat:'수유실',    icon:'🍼', name:'수유실',          loc:'지하 1층 고객안내실 인근', hours:'09:00~18:00', ok:true  },
  ];
  const list = catTab === '전체' ? FACS : FACS.filter(f => f.cat === catTab);

  return (
    <div style={{ overflowY:'auto', maxHeight:420, paddingBottom:20 }}>
      {/* 역 레이블 */}
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'14px 20px 10px' }}>
        <div style={{ width:22, height:22, borderRadius:11, background:C.line['2'],
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:11, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>2</div>
        <span style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF }}>강남역 편의시설</span>
        <span style={{ fontSize:10, color:'#22C55E', fontFamily:FF, marginLeft:'auto' }}>● 실시간 현황</span>
      </div>

      {/* 카테고리 칩 */}
      <div style={{ display:'flex', gap:6, padding:'0 20px', marginBottom:14,
        overflowX:'auto', scrollbarWidth:'none' }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCatTab(c)}
            style={{ flexShrink:0, padding:'6px 12px', borderRadius:20, cursor:'pointer',
              fontSize:12, fontWeight:700, fontFamily:FF,
              border: catTab===c ? 'none' : `1px solid ${C.border}`,
              background: catTab===c ? C.primary : 'rgba(255,255,255,0.05)',
              color: catTab===c ? '#fff' : C.g[60], transition:'all 0.18s' }}>
            {c}
          </button>
        ))}
      </div>

      {/* 시설 리스트 */}
      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap:8 }}>
        {list.map((f, i) => (
          <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`,
            borderRadius:12, padding:'12px 14px',
            display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ fontSize:24, flexShrink:0 }}>{f.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                <span style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {f.name}
                </span>
                <span style={{ flexShrink:0, fontSize:9, fontWeight:700, fontFamily:FF,
                  color: f.ok ? '#22C55E' : '#F87171',
                  background: f.ok ? 'rgba(34,197,94,0.12)' : 'rgba(248,113,113,0.12)',
                  padding:'1px 6px', borderRadius:4 }}>
                  {f.ok ? '이용가능' : '점검중'}
                </span>
              </div>
              <div style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>{f.loc}</div>
            </div>
            <div style={{ flexShrink:0, textAlign:'right' }}>
              <div style={{ fontSize:10, color:C.g[60], fontFamily:FF }}>{f.hours}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 2. 실시간 열차 섹션 (무신사 2열 카드 그리드 스타일)
function RealtimeTrainSection({ onSubwayMap, selectedLine, setSelectedLine }) {
  const [trainSheet,    setTrainSheet]    = useState(null);
  const [stationSheet,  setStationSheet]  = useState(null);
  const [exitDir,       setExitDir]       = useState('성수');
  const [exitFocusCar,  setExitFocusCar]  = useState(null);
  const [ttDir,         setTtDir]         = useState('성수');
  const [ttPeriod,      setTtPeriod]      = useState('전체');

  const LINE_TRAIN_DATA = {
    s2:  { name:'2호선',   color:C.line.s2,  dirs:[
      { dir:'외선', dest:'성수',   min:2, next:6,  cars:[3,4,3,5,7,8,6,5,4,3] },
      { dir:'내선', dest:'신도림', min:0, next:4,  cars:[5,6,8,7,6,5,4,5,6,4] },
    ]},
    sin: { name:'신분당선', color:C.line.sin, dirs:[
      { dir:'상행', dest:'신사',   min:3, next:9,  cars:[4,5,6,5,4,3,4,5,6,5] },
      { dir:'하행', dest:'광교',   min:1, next:6,  cars:[6,7,8,7,6,5,4,5,6,7] },
    ]},
  };
  const TRAIN_SCHEDULES = {
    외선: { dest:'성수', trains:[
      { seq:1, min:2,  label:'2분',    cars:[3,4,3,5,7,8,6,5,4,3] },
      { seq:2, min:6,  label:'6분',    cars:[4,5,6,7,6,5,4,3,4,5] },
      { seq:3, min:14, label:'14분',   cars:[6,7,8,7,6,5,6,7,8,6] },
      { seq:4, min:22, label:'22분',   cars:[3,3,4,4,5,6,5,4,3,3] },
      { seq:5, min:30, label:'30분',   cars:[2,3,3,4,5,5,4,3,2,2] },
    ]},
    내선: { dest:'신도림', trains:[
      { seq:1, min:0,  label:'곧도착', cars:[5,6,8,7,6,5,4,5,6,4] },
      { seq:2, min:4,  label:'4분',    cars:[4,5,6,7,7,6,5,4,5,6] },
      { seq:3, min:12, label:'12분',   cars:[3,4,5,6,6,5,4,3,4,5] },
      { seq:4, min:20, label:'20분',   cars:[2,3,4,5,5,4,3,2,3,4] },
      { seq:5, min:28, label:'28분',   cars:[3,4,4,5,6,5,4,3,3,4] },
    ]},
    상행: { dest:'신사', trains:[
      { seq:1, min:3,  label:'3분',    cars:[4,5,6,5,4,3,4,5,6,5] },
      { seq:2, min:9,  label:'9분',    cars:[3,4,5,6,5,4,3,4,5,6] },
      { seq:3, min:17, label:'17분',   cars:[5,6,7,6,5,4,5,6,7,5] },
      { seq:4, min:25, label:'25분',   cars:[2,3,4,5,4,3,2,3,4,3] },
    ]},
    하행: { dest:'광교', trains:[
      { seq:1, min:1,  label:'곧도착', cars:[6,7,8,7,6,5,4,5,6,7] },
      { seq:2, min:6,  label:'6분',    cars:[4,5,6,7,6,5,4,5,6,5] },
      { seq:3, min:14, label:'14분',   cars:[3,4,5,6,5,4,3,4,5,4] },
      { seq:4, min:22, label:'22분',   cars:[2,3,4,5,4,3,2,3,4,3] },
    ]},
  };

  const curLine = LINE_TRAIN_DATA[selectedLine];

  return (
    <>
      <div style={{ margin:'16px 16px 0' }}>
        <SecHead title="실시간 열차" />
        <DCard style={{ padding:'14px' }}>
          {/* ① 호선 선택 탭 */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <div style={{ display:'flex', gap:6 }}>
              {Object.entries(LINE_TRAIN_DATA).map(([key, l]) => {
                const active = selectedLine === key;
                return (
                  <button key={key} onClick={() => setSelectedLine(key)}
                    style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 12px',
                      borderRadius:20, border:`1px solid ${active ? l.color : C.border}`,
                      cursor:'pointer', fontFamily:FF,
                      background: active ? l.color : 'transparent' }}>
                    <div style={{ width:6, height:6, borderRadius:3,
                      background: active ? 'rgba(255,255,255,0.9)' : l.color }} />
                    <span style={{ fontSize:12, fontWeight:700,
                      color: active ? '#fff' : C.g[60] }}>{l.name}</span>
                  </button>
                );
              })}
            </div>
            <span style={{ fontSize:11, color:C.g[70] }}>강남역</span>
          </div>
          {/* ② 방향별 2열 카드 */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {curLine.dirs.map((t, i) => (
              <div key={i} onClick={() => setTrainSheet({ dir:t.dir, ...TRAIN_SCHEDULES[t.dir] })}
                style={{ background:'rgba(255,255,255,0.04)', borderRadius:10, padding:'12px',
                  border:`1px solid ${C.border}`, cursor:'pointer' }}>
                <div style={{ marginBottom:6 }}>
                  <Tag t={t.dir} bg={`${curLine.color}33`} col={curLine.color} fw={800} />
                </div>
                <div style={{ display:'flex', alignItems:'baseline', gap:3, marginBottom:4 }}>
                  <span style={{ fontSize:28, fontWeight:800, letterSpacing:-1, fontFamily:FF,
                    color: t.min === 0 ? C.keyColor : C.white }}>
                    {t.min === 0 ? '곧' : t.min}
                  </span>
                  <span style={{ fontSize:12, color:C.g[70] }}>
                    {t.min === 0 ? '도착' : '분'}
                  </span>
                </div>
                <CongBar cars={t.cars} />
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:10, color:C.g[70] }}>{t.dest}행</span>
                  <span style={{ fontSize:10, color:C.g[80] }}>다음 {t.next}분</span>
                </div>
              </div>
            ))}
          </div>
          {/* ③ 역 퀵 액세스 */}
          <div style={{ borderTop:`1px solid ${C.border}`, marginTop:12, paddingTop:12 }}>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              {[
                { id:'quickexit', label:'빠른 하차', isMap:false },
                { id:'timetable', label:'시간표',   isMap:false },
                { id:'lastrain',  label:'첫차/막차', isMap:false },
                { id:'facility',  label:'편의시설',  isMap:false },
                { id:'map',       label:'노선도',    isMap:true  },
              ].map(q => (
                <div key={q.id}
                  onClick={() => q.isMap ? onSubwayMap?.() : setStationSheet(q.id)}
                  style={{ flex:1, display:'flex', flexDirection:'column',
                    alignItems:'center', gap:5, cursor:'pointer' }}>
                  <div style={{ width:40, height:40, borderRadius:12,
                    background: q.isMap ? `${C.primary}14` : 'rgba(255,255,255,0.05)',
                    border:`1px solid ${q.isMap ? C.primary+'40' : C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {q.isMap && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                        <line x1="8" y1="2" x2="8" y2="18"/>
                        <line x1="16" y1="6" x2="16" y2="22"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize:9, fontFamily:FF, textAlign:'center',
                    lineHeight:1.3,
                    color: q.isMap ? C.primary : C.g[70],
                    fontWeight: q.isMap ? 700 : 400 }}>
                    {q.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DCard>
      </div>

      {/* 열차 바텀시트 (원본 동일, 무신사 스타일 시트) */}
      {trainSheet && (
        <div onClick={() => setTrainSheet(null)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.65)', zIndex:300,
            display:'flex', alignItems:'flex-end' }}>
          <div onClick={e => e.stopPropagation()}
            style={{ width:'100%', maxWidth:390, margin:'0 auto',
              background:'#1A1B22', borderRadius:'20px 20px 0 0',
              padding:'0 0 34px', animation:'slideUp 0.28s ease' }}>
            <div style={{ display:'flex', justifyContent:'center', padding:'12px 0 4px' }}>
              <div style={{ width:36, height:4, borderRadius:2, background:'rgba(255,255,255,0.15)' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center',
              justifyContent:'space-between', padding:'10px 20px 14px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:10, height:10, borderRadius:5, background:curLine.color }} />
                <span style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF }}>
                  {curLine.name} 강남역
                </span>
                <span style={{ fontSize:13, color:C.g[60] }}>
                  {trainSheet.dir} · {trainSheet.dest}행
                </span>
              </div>
              <button onClick={() => setTrainSheet(null)}
                style={{ background:'none', border:'none', color:C.g[60],
                  fontSize:20, cursor:'pointer' }}>✕</button>
            </div>
            <div style={{ padding:'0 20px' }}>
              {trainSheet.trains.map((t, i) => {
                const avgCong = Math.round(t.cars.reduce((a,b)=>a+b,0)/t.cars.length);
                const congCol  = avgCong <= 3 ? C.risk.SAFE : avgCong <= 6 ? C.risk.WARN : C.risk.HIGH;
                return (
                  <div key={i}
                    style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 0',
                      borderBottom: i < trainSheet.trains.length-1
                        ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ width:28, height:28, borderRadius:14, flexShrink:0,
                      background: i===0 ? C.keyColor : 'rgba(255,255,255,0.07)',
                      display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:11, fontWeight:800,
                        color: i===0 ? '#0E0F14' : C.g[60] }}>{i+1}</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:4 }}>
                        <span style={{ fontSize:20, fontWeight:800, fontFamily:FF,
                          color: i===0 ? C.keyColor : C.white }}>{t.label}</span>
                        {i===0 && <span style={{ fontSize:10, color:C.keyColor }}>현재 열차</span>}
                      </div>
                      <CongBar cars={t.cars} />
                    </div>
                    <Tag t={avgCong<=3?'여유':avgCong<=6?'보통':'혼잡'}
                      bg={congCol} col='#fff' fw={700} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════
          역 퀵액션 바텀시트
          ════════════════════════════════════════════════════ */}

      {/* 백드롭 */}
      <div
        onClick={() => setStationSheet(null)}
        style={{
          position:'fixed', inset:0,
          background:'rgba(0,0,0,0.68)',
          backdropFilter:'blur(3px)',
          zIndex:400,
          opacity: stationSheet ? 1 : 0,
          pointerEvents: stationSheet ? 'auto' : 'none',
          transition:'opacity 0.25s ease',
        }}
      />

      {/* 시트 본체 */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed', left:0, right:0, bottom:0,
          zIndex:401,
          background:C.card,
          borderRadius:'22px 22px 0 0',
          border:`1px solid ${C.border}`,
          borderBottom:'none',
          boxShadow:'0 -8px 40px rgba(0,0,0,0.6)',
          maxHeight:'88vh',
          overflowY:'auto',
          scrollbarWidth:'none',
          transform: stationSheet ? 'translateY(0)' : 'translateY(100%)',
          transition:'transform 0.32s cubic-bezier(0.32,0.72,0,1)',
          paddingBottom:'env(safe-area-inset-bottom, 28px)',
        }}>

        {/* ── 빠른 하차 콘텐츠 ─────────────────────────── */}
        {stationSheet === 'quickexit' && (() => {

          /* 방향별 데이터 — 강남역 2호선 (10량 편성 기준) */
          const EXIT_DATA = {
            '성수': [
              { type:'transfer', icon:'🔄', dest:'신분당선 환승',       car:10, door:'뒤', tip:'계단 바로 연결, 30초 환승' },
              { type:'exit',     icon:'🚪', dest:'3번 출구',             car:9,  door:'앞', tip:'신분당선 방면 지하통로' },
              { type:'exit',     icon:'🚪', dest:'1번 출구',             car:6,  door:'뒤', tip:'강남대로 북측, 교대역 방향' },
              { type:'place',    icon:'📚', dest:'4번 출구 (교보문고)',   car:5,  door:'앞', tip:'버스 환승센터 연결' },
              { type:'place',    icon:'🏬', dest:'11번 출구 (현대백화점)', car:3, door:'앞', tip:'현대백화점·메가박스 방면' },
              { type:'exit',     icon:'🚪', dest:'12번 출구',            car:1,  door:'앞', tip:'GS타워·뱅뱅사거리 방면' },
            ],
            '신도림': [
              { type:'transfer', icon:'🔄', dest:'신분당선 환승',       car:1,  door:'앞', tip:'계단 바로 연결, 30초 환승' },
              { type:'exit',     icon:'🚪', dest:'3번 출구',             car:2,  door:'뒤', tip:'신분당선 방면 지하통로' },
              { type:'exit',     icon:'🚪', dest:'1번 출구',             car:5,  door:'뒤', tip:'강남대로 북측, 교대역 방향' },
              { type:'place',    icon:'📚', dest:'4번 출구 (교보문고)',   car:6,  door:'앞', tip:'버스 환승센터 연결' },
              { type:'place',    icon:'🏬', dest:'11번 출구 (현대백화점)', car:8, door:'뒤', tip:'현대백화점·메가박스 방면' },
              { type:'exit',     icon:'🚪', dest:'12번 출구',            car:10, door:'뒤', tip:'GS타워·뱅뱅사거리 방면' },
            ],
          };

          const items     = EXIT_DATA[exitDir];
          const focusCars = exitFocusCar ? [exitFocusCar] : items.map(i => i.car);

          const typeColor = { transfer:'#F39C12', exit:C.primary, place:'#60B157' };

          return (
            <>
              {/* 드래그 핸들 */}
              <div style={{ display:'flex', justifyContent:'center', padding:'14px 0 2px' }}>
                <div style={{ width:38, height:4, borderRadius:2, background:'rgba(255,255,255,0.18)' }} />
              </div>

              {/* 헤더 */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'10px 20px 14px', borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:18 }}>⚡</span>
                  <div>
                    <div style={{ fontSize:15, fontWeight:900, color:C.white,
                      fontFamily:FF, letterSpacing:'-0.03em' }}>빠른 하차</div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:curLine.color,
                        background:`${curLine.color}20`, padding:'1px 7px', borderRadius:3,
                        fontFamily:FF }}>
                        {curLine.name}
                      </span>
                      <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>강남역</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => { setStationSheet(null); setExitFocusCar(null); }}
                  style={{ background:'rgba(255,255,255,0.08)', border:'none',
                    borderRadius:8, width:32, height:32, cursor:'pointer',
                    color:C.g[60], fontSize:17, display:'flex', alignItems:'center',
                    justifyContent:'center' }}>✕</button>
              </div>

              {/* 방향 토글 */}
              <div style={{ display:'flex', margin:'16px 20px 0',
                background:C.glass1, borderRadius:10, padding:3, gap:3 }}>
                {['성수', '신도림'].map(dir => (
                  <div key={dir} onClick={() => { setExitDir(dir); setExitFocusCar(null); }}
                    style={{ flex:1, padding:'8px 0', borderRadius:8, textAlign:'center',
                      cursor:'pointer', transition:'all 0.15s',
                      background: exitDir === dir ? curLine.color : 'transparent' }}>
                    <span style={{ fontSize:12, fontWeight:800, fontFamily:FF,
                      color: exitDir === dir ? '#fff' : C.g[60] }}>
                      {dir}행
                    </span>
                  </div>
                ))}
              </div>

              {/* 열차 10칸 시각화 */}
              <div style={{ margin:'16px 20px 0' }}>
                <div style={{ fontSize:10, color:C.g[70], fontFamily:FF,
                  marginBottom:8, fontWeight:600 }}>
                  {exitDir === '성수' ? '← 진행 방향 (성수 →)' : '← 진행 방향 (신도림 →)'}
                </div>
                <div style={{ display:'flex', gap:3, alignItems:'stretch' }}>
                  {/* 기관사칸 */}
                  <div style={{ width:14, borderRadius:'6px 0 0 6px',
                    background:'rgba(255,255,255,0.08)',
                    border:`1px solid ${C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:7, color:C.g[80], writingMode:'vertical-rl' }}>기관</span>
                  </div>
                  {/* 1~10호차 */}
                  {Array.from({ length:10 }, (_, i) => {
                    const carNum   = i + 1;
                    const isActive = focusCars.includes(carNum);
                    const isFocus  = exitFocusCar === carNum;
                    return (
                      <div key={carNum}
                        onMouseEnter={() => setExitFocusCar(carNum)}
                        onMouseLeave={() => setExitFocusCar(null)}
                        style={{ flex:1, height:36, borderRadius:4, cursor:'default',
                          background: isFocus  ? curLine.color
                                    : isActive ? `${curLine.color}40`
                                    : 'rgba(255,255,255,0.05)',
                          border:`1px solid ${isActive ? curLine.color+'80' : C.border}`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          transition:'all 0.12s' }}>
                        <span style={{ fontSize:9, fontWeight:700, fontFamily:FF,
                          color: isFocus ? '#fff' : isActive ? curLine.color : C.g[80] }}>
                          {carNum}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/* 호차 범례 */}
                <div style={{ display:'flex', justifyContent:'space-between',
                  marginTop:5, padding:'0 2px' }}>
                  <span style={{ fontSize:9, color:C.g[80], fontFamily:FF }}>앞 (1호차)</span>
                  <span style={{ fontSize:9, color:C.g[80], fontFamily:FF }}>뒤 (10호차)</span>
                </div>
              </div>

              {/* 범례 */}
              <div style={{ display:'flex', gap:12, padding:'12px 20px 0' }}>
                {[['🔄','환승',typeColor.transfer],['🚪','출구',typeColor.exit],['📍','시설',typeColor.place]].map(([ic,lb,cl]) => (
                  <div key={lb} style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ fontSize:11 }}>{ic}</span>
                    <span style={{ fontSize:10, color:cl, fontFamily:FF, fontWeight:700 }}>{lb}</span>
                  </div>
                ))}
              </div>

              {/* 목적지 카드 리스트 */}
              <div style={{ padding:'12px 20px 8px', display:'flex', flexDirection:'column', gap:8 }}>
                {items.map((item, idx) => {
                  const col     = typeColor[item.type];
                  const focused = exitFocusCar === item.car;
                  return (
                    <div key={idx}
                      onMouseEnter={() => setExitFocusCar(item.car)}
                      onMouseLeave={() => setExitFocusCar(null)}
                      style={{ display:'flex', alignItems:'center', gap:12,
                        padding:'13px 16px', borderRadius:14,
                        background: focused ? `${col}12` : 'rgba(255,255,255,0.04)',
                        border:`1.5px solid ${focused ? col+'60' : C.border}`,
                        cursor:'default', transition:'all 0.15s' }}>

                      {/* 아이콘 */}
                      <div style={{ width:38, height:38, borderRadius:10, flexShrink:0,
                        background:`${col}18`,
                        border:`1px solid ${col}30`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:17 }}>
                        {item.icon}
                      </div>

                      {/* 목적지 + 팁 */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:800, color:C.white,
                          fontFamily:FF, marginBottom:3 }}>
                          {item.dest}
                        </div>
                        <div style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
                          {item.tip}
                        </div>
                      </div>

                      {/* 호차 + 문 위치 */}
                      <div style={{ textAlign:'center', flexShrink:0 }}>
                        <div style={{ fontSize:22, fontWeight:900, color: col,
                          fontFamily:FF, lineHeight:1 }}>
                          {item.car}
                        </div>
                        <div style={{ fontSize:9, color:C.g[70], fontFamily:FF,
                          marginTop:2 }}>호차</div>
                        <div style={{ fontSize:10, fontWeight:700, fontFamily:FF,
                          color: col, background:`${col}18`,
                          padding:'1px 8px', borderRadius:3, marginTop:4 }}>
                          {item.door}문
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 하단 안내 */}
              <div style={{ margin:'8px 20px 16px', padding:'12px 14px',
                background:'rgba(255,255,255,0.04)', borderRadius:10,
                border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, lineHeight:1.7 }}>
                  💡 실제 열차 혼잡도에 따라 다를 수 있습니다. 카드에 마우스를 올리면 해당 칸이 강조됩니다.
                </div>
              </div>
            </>
          );
        })()}

        {/* ── 시간표 ──────────────────────────────────── */}
        {stationSheet === 'timetable' && (() => {

          /* 시간 배열 생성 헬퍼 */
          const gen = (sH, sM, eH, eM, gap, period) => {
            const arr = []; let h = sH, m = sM;
            while (h < eH || (h === eH && m <= eM)) {
              arr.push({ time:`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`, period, gap:`${gap}분` });
              m += gap; while (m >= 60) { m -= 60; h++; }
            }
            return arr;
          };

          /* 강남역 2호선 방향별 시간표 */
          const TT = {
            성수:   [
              ...gen(5,28, 6,58, 12,'첫차'),
              ...gen(7, 0, 9,27,  3,'출근'),
              ...gen(9,30,17,56,  4,'평시'),
              ...gen(18,0,20,27,  3,'퇴근'),
              ...gen(20,30,21,55, 5,'평시'),
              ...gen(22,0,23,58,  7,'심야'),
            ],
            신도림: [
              ...gen(5,30, 6,58, 12,'첫차'),
              ...gen(7, 0, 9,27,  3,'출근'),
              ...gen(9,30,17,56,  4,'평시'),
              ...gen(18,0,20,27,  3,'퇴근'),
              ...gen(20,30,21,55, 5,'평시'),
              ...gen(22,0,23,55,  7,'심야'),
            ],
          };

          /* 시간대 색상 */
          const PERIOD_COLOR = {
            첫차:'#8E44AD', 출근:'#E74C3C', 평시:C.primary, 퇴근:'#E67E22', 심야:C.g[60],
          };
          /* 시간대별 운행 간격 요약 */
          const PERIOD_INFO = [
            { period:'출근', range:'07:00~09:30', gap:'약 3분', color:'#E74C3C' },
            { period:'평시', range:'09:30~18:00', gap:'약 4분', color:C.primary },
            { period:'퇴근', range:'18:00~20:30', gap:'약 3분', color:'#E67E22' },
            { period:'심야', range:'22:00~막차',  gap:'약 7분', color:C.g[60]   },
          ];

          const allData = TT[ttDir] ?? [];

          /* 현재 시각 계산 */
          const now     = new Date();
          const nowMins = now.getHours() * 60 + now.getMinutes();
          const toMins  = t => { const [h,m] = t.split(':').map(Number); return h*60+m; };

          /* 다음 열차 5편 */
          const upcomingAll  = allData.filter(t => toMins(t.time) >= nowMins);
          const upcoming5    = upcomingAll.slice(0, 5);
          const nextIdx      = allData.findIndex(t => toMins(t.time) >= nowMins);

          /* 시간대 탭 필터 */
          const PERIOD_TABS = ['전체','출근','평시','퇴근','심야'];
          const filtered = ttPeriod === '전체' ? allData : allData.filter(t => t.period === ttPeriod);

          return (
            <>
              {/* 드래그 핸들 */}
              <div style={{ display:'flex', justifyContent:'center', padding:'14px 0 2px' }}>
                <div style={{ width:38, height:4, borderRadius:2, background:'rgba(255,255,255,0.18)' }} />
              </div>

              {/* 헤더 */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'10px 20px 14px', borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ fontSize:18 }}>📋</span>
                  <div>
                    <div style={{ fontSize:15, fontWeight:900, color:C.white,
                      fontFamily:FF, letterSpacing:'-0.03em' }}>시간표</div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
                      <span style={{ fontSize:10, fontWeight:700, color:curLine.color,
                        background:`${curLine.color}20`, padding:'1px 7px', borderRadius:3, fontFamily:FF }}>
                        {curLine.name}
                      </span>
                      <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>강남역</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setStationSheet(null)}
                  style={{ background:'rgba(255,255,255,0.08)', border:'none',
                    borderRadius:8, width:32, height:32, cursor:'pointer',
                    color:C.g[60], fontSize:17, display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
              </div>

              {/* 방향 토글 */}
              <div style={{ display:'flex', margin:'16px 20px 0',
                background:C.glass1, borderRadius:10, padding:3, gap:3 }}>
                {['성수','신도림'].map(dir => (
                  <div key={dir} onClick={() => setTtDir(dir)}
                    style={{ flex:1, padding:'8px 0', borderRadius:8, textAlign:'center',
                      cursor:'pointer', transition:'all 0.15s',
                      background: ttDir === dir ? curLine.color : 'transparent' }}>
                    <span style={{ fontSize:12, fontWeight:800, fontFamily:FF,
                      color: ttDir === dir ? '#fff' : C.g[60] }}>{dir}행</span>
                  </div>
                ))}
              </div>

              {/* ① 다음 열차 5편 */}
              <div style={{ margin:'16px 20px 0' }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.g[60],
                  fontFamily:FF, letterSpacing:'0.04em', marginBottom:10 }}>
                  다음 열차
                </div>
                {upcoming5.length === 0 ? (
                  <div style={{ textAlign:'center', padding:'16px 0', fontSize:12,
                    color:C.g[70], fontFamily:FF }}>오늘 운행이 종료됐어요 🌙</div>
                ) : (
                  <div style={{ display:'flex', gap:7 }}>
                    {upcoming5.map((t, i) => {
                      const mins = toMins(t.time) - nowMins;
                      const col  = PERIOD_COLOR[t.period] ?? C.primary;
                      return (
                        <div key={i} style={{ flex:1, padding:'10px 6px',
                          borderRadius:12, textAlign:'center',
                          background: i === 0 ? `${col}22` : 'rgba(255,255,255,0.05)',
                          border:`1.5px solid ${i === 0 ? col+'70' : C.border}` }}>
                          <div style={{ fontSize:13, fontWeight:900, color: i===0 ? col : C.white,
                            fontFamily:FF, marginBottom:3 }}>{t.time}</div>
                          <div style={{ fontSize:9, color: i===0 ? col : C.g[70],
                            fontFamily:FF, fontWeight:700 }}>
                            {i === 0 ? (mins <= 0 ? '곧 도착' : `${mins}분 후`) : `+${mins}분`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ② 운행 간격 요약 */}
              <div style={{ margin:'16px 20px 0' }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.g[60],
                  fontFamily:FF, letterSpacing:'0.04em', marginBottom:10 }}>운행 간격</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:7 }}>
                  {PERIOD_INFO.map(p => (
                    <div key={p.period} style={{ padding:'10px 12px', borderRadius:10,
                      background:`${p.color}0E`, border:`1px solid ${p.color}30`,
                      display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div>
                        <div style={{ fontSize:11, fontWeight:800, color:p.color,
                          fontFamily:FF }}>{p.period}</div>
                        <div style={{ fontSize:9, color:C.g[70], fontFamily:FF,
                          marginTop:2 }}>{p.range}</div>
                      </div>
                      <div style={{ fontSize:14, fontWeight:900, color:p.color,
                        fontFamily:FF }}>{p.gap}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ③ 시간대별 전체 시간표 */}
              <div style={{ margin:'16px 20px 0' }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.g[60],
                  fontFamily:FF, letterSpacing:'0.04em', marginBottom:10 }}>전체 시간표</div>

                {/* 시간대 탭 */}
                <div style={{ display:'flex', gap:5, marginBottom:12, overflowX:'auto',
                  scrollbarWidth:'none', paddingBottom:2 }}>
                  {PERIOD_TABS.map(p => {
                    const col = PERIOD_COLOR[p] ?? C.primary;
                    const act = ttPeriod === p;
                    return (
                      <div key={p} onClick={() => setTtPeriod(p)}
                        style={{ flexShrink:0, padding:'5px 14px', borderRadius:16, cursor:'pointer',
                          background: act ? (p === '전체' ? C.primary : col) : 'rgba(255,255,255,0.06)',
                          border:`1px solid ${act ? (p==='전체'?C.primary:col)+'99' : C.border}`,
                          transition:'all 0.15s' }}>
                        <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                          color: act ? '#fff' : C.g[60] }}>{p}</span>
                      </div>
                    );
                  })}
                </div>

                {/* 시간표 리스트 — 시간 그룹핑 */}
                <div style={{ borderRadius:12, border:`1px solid ${C.border}`,
                  overflow:'hidden', marginBottom:20 }}>
                  {(() => {
                    /* 시간(hour) 단위로 그룹핑 */
                    const groups = {};
                    filtered.forEach(t => {
                      const hr = t.time.split(':')[0];
                      if (!groups[hr]) groups[hr] = [];
                      groups[hr].push(t);
                    });
                    return Object.entries(groups).map(([hr, trains], gi) => (
                      <div key={hr}>
                        {/* 시간 헤더 */}
                        <div style={{ display:'flex', alignItems:'center', gap:8,
                          padding:'8px 14px',
                          background:'rgba(255,255,255,0.04)',
                          borderTop: gi > 0 ? `1px solid ${C.border}` : 'none' }}>
                          <span style={{ fontSize:16, fontWeight:900, color:C.white,
                            fontFamily:FF, minWidth:28 }}>{hr}</span>
                          <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>시</span>
                          <span style={{ fontSize:9, color:PERIOD_COLOR[trains[0].period]??C.primary,
                            background:`${PERIOD_COLOR[trains[0].period]??C.primary}18`,
                            padding:'1px 7px', borderRadius:3, fontFamily:FF, fontWeight:700 }}>
                            {trains[0].period}
                          </span>
                        </div>
                        {/* 분 단위 열차 행 — 가로 나열 */}
                        <div style={{ display:'flex', flexWrap:'wrap', gap:6, padding:'10px 14px 12px' }}>
                          {trains.map((t, ti) => {
                            const isPast   = toMins(t.time) < nowMins;
                            const isNext   = allData.indexOf(t) === nextIdx;
                            const col      = PERIOD_COLOR[t.period] ?? C.primary;
                            return (
                              <div key={ti} style={{ position:'relative' }}>
                                {isNext && (
                                  <div style={{ position:'absolute', top:-6, left:'50%',
                                    transform:'translateX(-50%)',
                                    fontSize:7, color:col, fontFamily:FF, fontWeight:800,
                                    whiteSpace:'nowrap' }}>▼다음</div>
                                )}
                                <div style={{ padding:'5px 10px', borderRadius:7,
                                  background: isNext  ? `${col}28`
                                            : isPast  ? 'rgba(255,255,255,0.03)'
                                            : 'rgba(255,255,255,0.07)',
                                  border:`1px solid ${isNext ? col+'70' : isPast ? 'transparent' : C.border}` }}>
                                  <span style={{ fontSize:12, fontWeight: isNext ? 900 : 600,
                                    fontFamily:FF,
                                    color: isNext ? col : isPast ? C.g[80] : C.white }}>
                                    {t.time.split(':')[1]}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* 하단 안내 */}
              <div style={{ margin:'0 20px 16px', padding:'11px 14px',
                background:'rgba(255,255,255,0.04)', borderRadius:10,
                border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, lineHeight:1.7 }}>
                  💡 시간표는 평일 기준이며 공휴일·임시 변경 시 다를 수 있습니다. 분 단위 숫자를 보면 해당 시의 몇 분에 출발하는지 확인할 수 있어요.
                </div>
              </div>
            </>
          );
        })()}

        {/* ── 기타 퀵액션 (첫차막차·편의시설) — 추후 확장 ── */}
        {stationSheet && !['quickexit','timetable'].includes(stationSheet) && (
          <>
            <div style={{ display:'flex', justifyContent:'center', padding:'14px 0 2px' }}>
              <div style={{ width:38, height:4, borderRadius:2, background:'rgba(255,255,255,0.18)' }} />
            </div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'10px 20px 14px', borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:15, fontWeight:900, color:C.white, fontFamily:FF }}>
                {{ lastrain:'첫차/막차', facility:'편의시설' }[stationSheet]}
              </span>
              <button onClick={() => setStationSheet(null)}
                style={{ background:'rgba(255,255,255,0.08)', border:'none',
                  borderRadius:8, width:32, height:32, cursor:'pointer',
                  color:C.g[60], fontSize:17, display:'flex', alignItems:'center',
                  justifyContent:'center' }}>✕</button>
            </div>
            {stationSheet === 'lastrain' && <LastrainSheet />}
            {stationSheet === 'facility' && <FacilitySheet />}
          </>
        )}
      </div>
    </>
  );
}

// 3. (CommuteCoach → WeatherCommuteCard 로 통합됨)

// 4. 오늘의 투표 (무신사 폴 카드 스타일)
function DailyVoteCard({ voted, setVoted, onDetail }) {
  const opts = [
    { text:'매우 혼잡했어요', pct:55, color:C.red },
    { text:'보통이었어요',    pct:28, color:C.primary },
    { text:'쾌적했어요',      pct:17, color:'#60B157' },
  ];
  return (
    <div style={{ margin:'12px 16px 0' }}>
      <DCard>
        {/* 헤더 */}
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:11, color:C.primary, fontWeight:700 }}>오늘의 투표</span>
            <Tag t="NEW" bg={C.red} col='#fff' fw={800} />
          </div>
          <span onClick={voted !== null ? onDetail : undefined}
            style={{ fontSize:11, color: voted !== null ? C.primary : C.g[70],
              cursor: voted !== null ? 'pointer' : 'default',
              fontWeight: voted !== null ? 700 : 400 }}>
            {voted !== null ? `댓글 ${MOCK_COMMENTS.length}개 ›` : '결과 보기 ›'}
          </span>
        </div>
        {/* 질문 */}
        <div style={{ fontSize:15, fontWeight:800, color:C.white, marginBottom:14,
          lineHeight:1.4, letterSpacing:'-0.02em', fontFamily:FF }}>
          오늘 출근길, 강남역 어떠셨나요?
        </div>
        {/* 선택지 */}
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {opts.map((o, i) => {
            const isVoted = voted === i;
            return (
              <div key={i} onClick={() => setVoted(i)}
                style={{ position:'relative', borderRadius:8,
                  border:`1px solid ${voted !== null ? (isVoted ? o.color : C.border) : C.border}`,
                  padding:'10px 14px', cursor:'pointer', overflow:'hidden',
                  background: isVoted ? `${o.color}22` : 'transparent' }}>
                {voted !== null && (
                  <div style={{ position:'absolute', left:0, top:0, bottom:0,
                    width:`${o.pct}%`, background:`${o.color}18`, zIndex:0 }} />
                )}
                <div style={{ position:'relative', zIndex:1, display:'flex',
                  justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:13, fontFamily:FF,
                    color: voted !== null ? (isVoted ? C.white : C.g[70]) : C.white,
                    fontWeight: isVoted ? 700 : 400 }}>
                    {o.text}
                  </span>
                  {voted !== null
                    ? <span style={{ fontSize:12, fontWeight:700,
                        color: isVoted ? o.color : C.g[50] }}>{o.pct}%</span>
                    : <span style={{ fontSize:11, color:C.g[50] }}>투표하기</span>}
                </div>
              </div>
            );
          })}
        </div>
      </DCard>
    </div>
  );
}

// ── 투표 댓글 데이터 ────────────────────────────────────────
const MOCK_COMMENTS = [
  { id:1, nick:'강남러버',   avatar:'강', time:'3분 전',  text:'오늘 출근길 강남역 8시대 진짜 사람 너무 많았어요. 승강장 대기만 두 번 했네요.', likes:24, img:null,
    replies:[
      { id:11, nick:'지하철덕후', avatar:'지', time:'2분 전', text:'맞아요 저도 오늘 외선 진짜 꽉 찼던데', likes:5 },
      { id:12, nick:'출퇴근러',   avatar:'출', time:'1분 전', text:'저는 내선 탔는데 그쪽은 좀 여유로웠어요', likes:3 },
    ]},
  { id:2, nick:'명동푸디',   avatar:'명', time:'15분 전', text:'환기가 너무 안 돼서 답답했어요. 에어컨 좀 더 세게 틀어줬으면...', likes:18, img:null, replies:[] },
  { id:3, nick:'신촌학생',   avatar:'신', time:'31분 전', text:'오늘은 의외로 빠르게 탔어요. 운 좋게 문 앞에 딱 서 있었던 것 같아요.', likes:12, img:null,
    replies:[
      { id:31, nick:'여의도man', avatar:'여', time:'25분 전', text:'저도 오늘 강남 생각보다 쾌적했어요', likes:8 },
    ]},
  { id:4, nick:'홍대러버',   avatar:'홍', time:'1시간 전', text:'그냥 평범한 하루였어요. 특이사항 없음.', likes:4, img:null, replies:[] },
  { id:5, nick:'을지로감성', avatar:'을', time:'2시간 전', text:'강남역 환승 통로가 너무 길어서 힘들었음. 신분당선 환승 거리 진짜 ㅠ', likes:9, img:null,
    replies:[
      { id:51, nick:'지하철덕후', avatar:'지', time:'1시간 전', text:'강남역 환승 동선은 진짜 개선이 필요해요', likes:6 },
    ]},
];

// 4-1. 투표 상세 페이지 (무신사 다크 스타일)
function VoteDetailScreen({ onBack }) {
  const [voted,      setVoted]      = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [sort, setSort]           = useState('인기순');
  const [openReplies, setOpenReplies] = useState({});
  const [replyInput, setReplyInput]   = useState({});
  const OPTS = [
    { text:'매우 혼잡했어요', pct:55, color:C.red },
    { text:'보통이었어요',    pct:28, color:C.primary },
    { text:'쾌적했어요',      pct:17, color:'#60B157' },
  ];
  const TOTAL = 312;

  const sorted = sort === '인기순'
    ? [...MOCK_COMMENTS].sort((a, b) => b.likes - a.likes)
    : [...MOCK_COMMENTS].sort((a, b) => a.id < b.id ? 1 : -1);

  const toggleReplies = id => setOpenReplies(p => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:140, background:C.bg }}>

      {/* 스티키 헤더 */}
      <div style={{ display:'flex', alignItems:'center', gap:12,
        padding:'env(safe-area-inset-top,44px) 16px 0',
        position:'sticky', top:0, zIndex:100,
        background:'rgba(14,15,20,0.95)', backdropFilter:'blur(12px)',
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ height:52, display:'flex', alignItems:'center', gap:12, width:'100%' }}>
          <button onClick={onBack}
            style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:10,
              width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', fontSize:16, color:C.white, flexShrink:0 }}>←</button>
          <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>오늘의 투표</span>
        </div>
      </div>

      {/* 투표 카드 */}
      <div style={{ margin:'16px 16px 0',
        background:C.card,
        border:`1px solid ${C.border}`, borderRadius:8, padding:'18px 16px' }}>
        <span style={{ fontSize:11, color:C.primary, fontWeight:700 }}>오늘의 투표 · 강남역</span>
        <div style={{ fontSize:16, fontWeight:800, color:C.white, margin:'8px 0 14px',
          lineHeight:1.4, letterSpacing:'-0.02em', fontFamily:FF }}>
          오늘 출근길, 강남역 어떠셨나요?
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
          {OPTS.map((o, i) => (
            <div key={i} onClick={() => { setVoted(i); setTimeout(() => setShowResult(true), 500); }}
              style={{ position:'relative', borderRadius:8, padding:'12px 14px',
                cursor:'pointer', overflow:'hidden',
                border:`1px solid ${voted===i ? o.color : C.border}`,
                background: voted===i ? `${o.color}22` : 'rgba(255,255,255,0.04)' }}>
              {voted !== null && (
                <div style={{ position:'absolute', left:0, top:0, bottom:0,
                  width:`${o.pct}%`, background:`${o.color}18`, zIndex:0 }} />
              )}
              <div style={{ position:'relative', zIndex:1,
                display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:14, fontWeight: voted===i ? 700 : 500,
                  color: voted===i ? C.white : C.g[70], fontFamily:FF }}>{o.text}</span>
                {voted !== null
                  ? <span style={{ fontSize:13, fontWeight:700, color: voted===i ? o.color : C.g[50] }}>{o.pct}%</span>
                  : <span style={{ fontSize:11, color:C.g[50] }}>투표하기</span>}
              </div>
            </div>
          ))}
        </div>
        {voted !== null && (
          <>
            <div style={{ display:'flex', height:4, borderRadius:2, overflow:'hidden', marginBottom:6, gap:1 }}>
              {OPTS.map((o, i) => (
                <div key={i} style={{ width:`${o.pct}%`, background:o.color }} />
              ))}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:11, color:C.g[70] }}>총 {TOTAL}명 참여</span>
            </div>
          </>
        )}
      </div>

      {/* 댓글 헤더 + 정렬 */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'20px 16px 10px' }}>
        <span style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF }}>
          댓글 {MOCK_COMMENTS.length}
        </span>
        <div style={{ display:'flex', gap:6 }}>
          {['인기순','최신순'].map(s => (
            <div key={s} onClick={() => setSort(s)}
              style={{ padding:'5px 12px', borderRadius:14, cursor:'pointer',
                background: sort===s ? C.primary : 'rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize:11, fontWeight:700,
                color: sort===s ? '#fff' : C.g[70], fontFamily:FF }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 댓글 목록 */}
      <div style={{ padding:'0 16px' }}>
        {sorted.map(c => (
          <div key={c.id} style={{ marginBottom:20 }}>
            <div style={{ display:'flex', gap:10 }}>
              {/* 아바타 */}
              <div style={{ width:36, height:36, borderRadius:18, flexShrink:0,
                background:'rgba(255,255,255,0.08)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                {c.avatar}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF }}>{c.nick}</span>
                  <span style={{ fontSize:10, color:C.g[70] }}>{c.time}</span>
                </div>
                <div style={{ fontSize:13, color:C.white, lineHeight:1.55, marginBottom:6 }}>{c.text}</div>
                {c.img && (
                  <div style={{ width:100, height:76, borderRadius:10,
                    background:C.glass1, border:`1px solid ${C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:32, marginBottom:8 }}>{c.img}</div>
                )}
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <button style={{ background:'none', border:'none', display:'flex',
                    alignItems:'center', gap:4, cursor:'pointer', padding:0 }}>
                    <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>공감 {c.likes}</span>
                  </button>
                  {c.replies.length > 0 && (
                    <button onClick={() => toggleReplies(c.id)}
                      style={{ background:'none', border:'none', cursor:'pointer',
                        padding:0, fontSize:12, color:C.primary, fontFamily:FF }}>
                      답글 {c.replies.length}개 {openReplies[c.id] ? '▲' : '▼'}
                    </button>
                  )}
                  <button onClick={() => setReplyInput(p => ({ ...p, [c.id]: !p[c.id] }))}
                    style={{ background:'none', border:'none', cursor:'pointer',
                      padding:0, fontSize:12, color:C.g[70], fontFamily:FF }}>
                    답글 달기
                  </button>
                </div>
              </div>
            </div>

            {/* 대댓글 */}
            {openReplies[c.id] && c.replies.map(r => (
              <div key={r.id} style={{ display:'flex', gap:10, marginTop:12, marginLeft:46 }}>
                <div style={{ width:28, height:28, borderRadius:14, flexShrink:0,
                  background:C.glass2,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>
                  {r.avatar}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:6, marginBottom:3 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF }}>{r.nick}</span>
                    <span style={{ fontSize:10, color:C.g[70] }}>{r.time}</span>
                  </div>
                  <div style={{ fontSize:12, color:C.white, lineHeight:1.5, marginBottom:4 }}>{r.text}</div>
                  <button style={{ background:'none', border:'none', display:'flex',
                    alignItems:'center', gap:4, cursor:'pointer', padding:0 }}>
                    <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>공감 {r.likes}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* 답글 입력 */}
            {replyInput[c.id] && (
              <div style={{ display:'flex', gap:8, marginTop:10, marginLeft:46 }}>
                <input placeholder="답글을 입력하세요..."
                  style={{ flex:1, background:C.glass2,
                    border:`1px solid ${C.border}`, borderRadius:10,
                    padding:'8px 12px', fontSize:12, color:C.white, outline:'none' }} />
                <button style={{ background:C.primary, border:'none', borderRadius:10,
                  padding:'8px 14px', color:'#fff', fontSize:12, fontWeight:700,
                  cursor:'pointer', flexShrink:0, fontFamily:FF }}>등록</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 댓글 입력창 (하단 고정 — 네브바 위에 배치) */}
      <div style={{ position:'fixed', bottom:'calc(56px + env(safe-area-inset-bottom, 0px))',
        left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:390, background:'rgba(14,15,20,0.97)',
        borderTop:`1px solid ${C.border}`,
        padding:'10px 16px 12px', display:'flex', gap:8, zIndex:200 }}>
        <input placeholder="오늘 강남역 어땠나요? 이미지도 첨부 가능해요"
          style={{ flex:1, background:C.glass2,
            border:`1px solid ${C.border}`, borderRadius:12,
            padding:'10px 14px', fontSize:12, color:C.white, outline:'none' }} />
        <button style={{ background:'rgba(255,255,255,0.08)', border:`1px solid ${C.border}`,
          borderRadius:12, width:42, height:42, display:'flex',
          alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0,
          fontSize:11, fontWeight:700, color:C.g[60], fontFamily:FF }}>
          사진
        </button>
        <button style={{ background:C.primary, border:'none', borderRadius:12,
          width:42, height:42, display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer', fontSize:16, flexShrink:0 }}>↑</button>
      </div>
      {/* ── 결과 상세 오버레이 ────────────────────── */}
      {showResult && voted !== null && (
        <>
          {/* 백드롭 */}
          <div onClick={() => setShowResult(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:500 }} />

          {/* 결과 시트 */}
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:501,
            background:C.card, borderRadius:'22px 22px 0 0',
            maxHeight:'80vh', overflowY:'auto',
            padding:'0 0 env(safe-area-inset-bottom,24px)',
            boxShadow:'0 -8px 40px rgba(0,0,0,0.5)' }}>

            {/* 핸들 */}
            <div style={{ width:36, height:4, background:C.border,
              borderRadius:2, margin:'14px auto 0' }} />

            {/* 헤더 */}
            <div style={{ padding:'18px 20px 12px',
              borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.primary,
                fontFamily:FF, letterSpacing:'0.1em', marginBottom:4 }}>VOTE RESULT</div>
              <div style={{ fontSize:17, fontWeight:900, color:C.white,
                fontFamily:FF, letterSpacing:'-0.03em' }}>
                오늘 출근길, 강남역 어떠셨나요?
              </div>
              <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:4 }}>
                총 {TOTAL + 1}명 참여 · 방금 투표 완료
              </div>
            </div>

            {/* 결과 바 차트 */}
            <div style={{ padding:'18px 20px 0' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[60],
                fontFamily:FF, marginBottom:12,
                letterSpacing:'0.05em', textTransform:'uppercase' }}>전체 결과</div>
              {OPTS.map((o, i) => {
                const isMyVote = voted === i;
                const displayPct = isMyVote ? Math.round(o.pct * (TOTAL/(TOTAL+1)) + 100/(TOTAL+1)) : Math.round(o.pct * (TOTAL/(TOTAL+1)));
                return (
                  <div key={i} style={{ marginBottom:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between',
                      alignItems:'center', marginBottom:6 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <span style={{ fontSize:13, fontWeight: isMyVote ? 800 : 500,
                          color: isMyVote ? o.color : C.white, fontFamily:FF }}>
                          {o.text}
                        </span>
                        {isMyVote && (
                          <span style={{ fontSize:10, fontWeight:700, color:o.color,
                            background:`${o.color}18`, padding:'1px 7px',
                            borderRadius:6, fontFamily:FF }}>내 선택</span>
                        )}
                      </div>
                      <span style={{ fontSize:13, fontWeight:800,
                        color: isMyVote ? o.color : C.g[60], fontFamily:FF }}>
                        {displayPct}%
                      </span>
                    </div>
                    {/* 게이지 바 */}
                    <div style={{ height:8, background:C.glass1,
                      borderRadius:4, overflow:'hidden' }}>
                      <div style={{ height:'100%', borderRadius:4,
                        background: isMyVote ? o.color : `${o.color}66`,
                        width:`${displayPct}%`,
                        transition:'width 0.8s cubic-bezier(0.34,1.56,0.64,1)' }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 시간대별 통계 */}
            <div style={{ padding:'16px 20px 0',
              borderTop:`1px solid ${C.border}`, marginTop:8 }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[60],
                fontFamily:FF, marginBottom:12, letterSpacing:'0.05em', textTransform:'uppercase' }}>
                시간대별 혼잡도
              </div>
              <div style={{ display:'flex', gap:6, alignItems:'flex-end', height:60 }}>
                {[
                  { time:'7시', val:40, color:C.primary },
                  { time:'8시', val:95, color:C.red },
                  { time:'9시', val:78, color:'#F59E0B' },
                  { time:'10시', val:45, color:C.primary },
                  { time:'11시', val:25, color:'#34D399' },
                  { time:'12시', val:35, color:C.primary },
                ].map(({ time, val, color }) => (
                  <div key={time} style={{ flex:1, display:'flex',
                    flexDirection:'column', alignItems:'center', gap:4 }}>
                    <div style={{ width:'100%', borderRadius:'3px 3px 0 0',
                      background: color, opacity: val > 70 ? 1 : 0.5,
                      height:`${val * 0.55}px`,
                      transition:'height 0.6s ease' }} />
                    <span style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 인사이트 카드 */}
            <div style={{ margin:'16px 20px 0', display:'flex', gap:10 }}>
              {[
                { icon:'🏆', label:'가장 많은 선택', value:'매우 혼잡', sub:'55%' },
                { icon:'⏰', label:'가장 혼잡한 시간', value:'오전 8시', sub:'95점' },
                { icon:'👥', label:'오늘 참여자', value:`${TOTAL + 1}명`, sub:'+1 (나)' },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} style={{ flex:1, background:C.bg,
                  border:`1px solid ${C.border}`, borderRadius:12, padding:'11px 10px' }}>
                  <div style={{ fontSize:20, marginBottom:6 }}>{icon}</div>
                  <div style={{ fontSize:9, color:C.g[70], fontFamily:FF, marginBottom:3 }}>{label}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF }}>{value}</div>
                  <div style={{ fontSize:10, color:C.primary, fontFamily:FF }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* 공유 버튼 */}
            <div style={{ padding:'18px 20px 0', display:'flex', gap:10 }}>
              <button
                onClick={() => setShowResult(false)}
                style={{ flex:1, height:46, borderRadius:12,
                  background:'transparent', border:`1px solid ${C.border}`,
                  fontSize:14, fontWeight:700, color:C.g[60], fontFamily:FF,
                  cursor:'pointer' }}>
                닫기
              </button>
              <button
                style={{ flex:2, height:46, borderRadius:12,
                  background:C.primary, border:'none',
                  fontSize:14, fontWeight:800, color:'#fff', fontFamily:FF,
                  cursor:'pointer', display:'flex', alignItems:'center',
                  justifyContent:'center', gap:6 }}>
                <span>📤</span> 결과 공유하기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════
   StoryViewer — 인스타그램 스타일 전체화면 스토리 뷰어
══════════════════════════════════════════════════════════════ */
function StoryViewer({ stories, startIndex, onClose, onUser }) {
  var [idx,        setIdx]        = React.useState(startIndex || 0);
  var [progress,   setProgress]   = React.useState(0);
  var [paused,     setPaused]     = React.useState(false);
  var [liked,      setLiked]      = React.useState({});
  var [showReply,  setShowReply]  = React.useState(false);
  var [replyText,  setReplyText]  = React.useState('');
  var timerRef = React.useRef(null);

  var DURATION = 5000; // 스토리 1개당 표시 시간 (ms)
  var story = stories[idx];

  /* ── 타이머: progress 0→100 ── */
  React.useEffect(function() {
    if (paused || showReply) return;
    setProgress(0);
    var start = Date.now();
    timerRef.current = setInterval(function() {
      var elapsed = Date.now() - start;
      var pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timerRef.current);
        if (idx < stories.length - 1) {
          setIdx(function(i) { return i + 1; });
        } else {
          onClose();
        }
      }
    }, 30);
    return function() { clearInterval(timerRef.current); };
  }, [idx, paused, showReply]);

  /* ── 터치: 왼쪽=이전 / 오른쪽=다음 / 길게=일시정지 ── */
  var touchStartX = React.useRef(0);
  var longPressTimer = React.useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    longPressTimer.current = setTimeout(function() { setPaused(true); }, 150);
  }
  function handleTouchEnd(e) {
    clearTimeout(longPressTimer.current);
    if (paused) { setPaused(false); return; }
    var dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 10) return; // 탭
    if (dx < 0) {
      if (idx < stories.length - 1) setIdx(function(i) { return i + 1; });
      else onClose();
    } else {
      if (idx > 0) setIdx(function(i) { return i - 1; });
    }
  }
  function handleTap(e) {
    if (showReply) return;
    var x = e.clientX || (e.touches && e.touches[0].clientX);
    var w = e.currentTarget.offsetWidth;
    if (x < w * 0.35) {
      if (idx > 0) setIdx(function(i) { return i - 1; });
    } else if (x > w * 0.65) {
      if (idx < stories.length - 1) setIdx(function(i) { return i + 1; });
      else onClose();
    }
  }

  /* ── 배경 컬러 팔레트 (스토리별 그라디언트) ── */
  var BG_PALETTES = [
    'linear-gradient(160deg,#0d1b2a 0%,#1a3a5c 50%,#0a2540 100%)',
    'linear-gradient(160deg,#1a0a2e 0%,#3a1060 50%,#1a0a35 100%)',
    'linear-gradient(160deg,#0a1f0a 0%,#1a4020 50%,#0a2010 100%)',
    'linear-gradient(160deg,#2a0a0a 0%,#501010 50%,#300808 100%)',
    'linear-gradient(160deg,#1a1205 0%,#3a2a0a 50%,#201500 100%)',
    'linear-gradient(160deg,#051a1a 0%,#0a3535 50%,#042020 100%)',
  ];
  var bg = BG_PALETTES[idx % BG_PALETTES.length];
  var lineColor = (story && story.lineId && C.line[story.lineId]) ? C.line[story.lineId] : C.primary;

  /* ── 스토리 콘텐츠 비주얼 ── */
  var VISUALS = [
    { emoji:'🌸', label:'벚꽃 시즌' },
    { emoji:'🚇', label:'지하철 라이프' },
    { emoji:'🌇', label:'도시 뷰' },
    { emoji:'☕', label:'카페 추천' },
    { emoji:'🍜', label:'맛집 탐방' },
    { emoji:'🌙', label:'야경 스팟' },
  ];
  var visual = VISUALS[idx % VISUALS.length];

  if (!story) return null;

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:2000,
      background:'#000',
      display:'flex', flexDirection:'column',
    }}>
      {/* ── 상단 진행 바 + 헤더 ── */}
      <div style={{
        position:'absolute', top:0, left:0, right:0, zIndex:10,
        padding:'env(safe-area-inset-top,44px) 12px 0',
      }}>
        {/* 프로그레스 바 목록 */}
        <div style={{ display:'flex', gap:3, marginBottom:10 }}>
          {stories.map(function(_, i) {
            return (
              <div key={i} style={{
                flex:1, height:2.5, borderRadius:2,
                background:'rgba(255,255,255,0.25)',
                overflow:'hidden',
              }}>
                <div style={{
                  height:'100%', borderRadius:2,
                  background:'#fff',
                  width: i < idx ? '100%' : i === idx ? progress + '%' : '0%',
                  transition: i === idx ? 'none' : 'none',
                }} />
              </div>
            );
          })}
        </div>

        {/* 헤더: 아바타 + 닉네임 + 시간 + 닫기 */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {/* 아바타 */}
          <div
            onClick={function() { onUser && onUser(story.nick); }}
            style={{
            width:36, height:36, borderRadius:18, flexShrink:0,
            background: lineColor,
            border:'2px solid rgba(255,255,255,0.8)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer',
          }}>
            <span style={{ fontSize:13, fontWeight:900, color:'#fff', fontFamily:FF }}>
              {story.lineId === 'sin' ? '신' : story.lineId === 'gyeong' ? '경' : story.lineId}
            </span>
          </div>
          <div style={{ flex:1, cursor:'pointer' }}
            onClick={function() { onUser && onUser(story.nick); }}>
            <div style={{ fontSize:13, fontWeight:800, color:'#fff', fontFamily:FF }}>
              {story.nick}
            </div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontFamily:FF }}>
              {story.station} · 방금 전
            </div>
          </div>
          {/* 일시정지 표시 */}
          {paused && (
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontFamily:FF, marginRight:4 }}>
              ⏸
            </div>
          )}
          {/* 닫기 버튼 */}
          <div onClick={onClose}
            style={{ width:32, height:32, borderRadius:16,
              background:'rgba(0,0,0,0.3)',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', fontSize:18, color:'rgba(255,255,255,0.9)' }}>
            ✕
          </div>
        </div>
      </div>

      {/* ── 메인 콘텐츠 (탭 영역) ── */}
      <div
        style={{ flex:1, position:'relative', overflow:'hidden', background:bg }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleTap}
      >
        {/* 배경 글로우 */}
        <div style={{
          position:'absolute', top:'30%', left:'50%',
          transform:'translateX(-50%)',
          width:320, height:320, borderRadius:160,
          background:'radial-gradient(circle,' + lineColor + '30 0%,transparent 70%)',
          pointerEvents:'none',
        }} />

        {/* 중앙 비주얼 */}
        <div style={{
          position:'absolute', top:'50%', left:'50%',
          transform:'translate(-50%,-52%)',
          display:'flex', flexDirection:'column',
          alignItems:'center', gap:16,
          pointerEvents:'none',
        }}>
          {/* 호선 배지 (크게) */}
          <div style={{
            width:80, height:80, borderRadius:40,
            background: lineColor,
            border:'3px solid rgba(255,255,255,0.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 0 40px ' + lineColor + '60',
          }}>
            <span style={{ fontSize:30, fontWeight:900, color:'#fff', fontFamily:FF }}>
              {story.lineId === 'sin' ? '신' : story.lineId === 'gyeong' ? '경' : story.lineId}
            </span>
          </div>
          {/* 이모지 비주얼 */}
          <div style={{ fontSize:52 }}>{visual.emoji}</div>
          <div style={{
            fontSize:11, fontWeight:700, color: lineColor,
            fontFamily:FF, letterSpacing:'0.1em',
            background: lineColor + '18',
            border:'1px solid ' + lineColor + '40',
            padding:'4px 12px', borderRadius:20,
          }}>
            {story.station} · {visual.label}
          </div>
        </div>

        {/* 캡션 (하단) */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0,
          padding:'60px 20px 20px',
          background:'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 100%)',
          pointerEvents:'none',
        }}>
          <div style={{
            fontSize:18, fontWeight:800, color:'#fff',
            fontFamily:FF, lineHeight:1.4,
            textShadow:'0 2px 8px rgba(0,0,0,0.8)',
            marginBottom:6,
          }}>
            {story.caption}
          </div>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.55)', fontFamily:FF }}>
            {story.station}
          </div>
        </div>

        {/* 좌우 탭 힌트 (처음 한 번) */}
        <div style={{
          position:'absolute', top:'50%', left:12,
          transform:'translateY(-50%)',
          fontSize:22, color:'rgba(255,255,255,0.2)',
          pointerEvents:'none',
          display: idx > 0 ? 'block' : 'none',
        }}>‹</div>
        <div style={{
          position:'absolute', top:'50%', right:12,
          transform:'translateY(-50%)',
          fontSize:22, color:'rgba(255,255,255,0.2)',
          pointerEvents:'none',
          display: idx < stories.length - 1 ? 'block' : 'none',
        }}>›</div>
      </div>

      {/* ── 하단 액션바 ── */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:10,
        paddingBottom:'calc(20px + env(safe-area-inset-bottom,0px))',
        padding:'0 16px',
        paddingBottom:'calc(20px + env(safe-area-inset-bottom,0px))',
      }}>
        {showReply ? (
          /* 답장 입력창 */
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <div style={{
              flex:1, display:'flex', alignItems:'center',
              background:'rgba(255,255,255,0.12)',
              border:'1.5px solid rgba(255,255,255,0.3)',
              borderRadius:24, padding:'10px 16px',
            }}>
              <input
                autoFocus
                value={replyText}
                onChange={function(e) { setReplyText(e.target.value); }}
                onKeyDown={function(e) {
                  if (e.key === 'Enter' && replyText.trim()) {
                    setReplyText('');
                    setShowReply(false);
                  }
                  if (e.key === 'Escape') { setShowReply(false); setReplyText(''); }
                }}
                placeholder={story.nick + '에게 답장...'}
                style={{
                  flex:1, background:'none', border:'none', outline:'none',
                  color:'#fff', fontSize:14, fontFamily:FF,
                }}
              />
            </div>
            <div onClick={function() { setReplyText(''); setShowReply(false); }}
              style={{
                width:36, height:36, borderRadius:18,
                background:'rgba(255,255,255,0.12)',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', fontSize:16, color:'rgba(255,255,255,0.7)',
              }}>✕</div>
          </div>
        ) : (
          /* 기본 액션 버튼 */
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div onClick={function() { setShowReply(true); setPaused(true); }}
              style={{
                flex:1, display:'flex', alignItems:'center',
                background:'rgba(255,255,255,0.10)',
                border:'1px solid rgba(255,255,255,0.2)',
                borderRadius:24, padding:'11px 16px', cursor:'pointer', gap:8,
              }}>
              <span style={{ fontSize:14 }}>💬</span>
              <span style={{ fontSize:13, color:'rgba(255,255,255,0.6)', fontFamily:FF }}>
                {story.nick}에게 답장...
              </span>
            </div>
            {/* 좋아요 */}
            <div onClick={function(e) {
                e.stopPropagation();
                setLiked(function(p) {
                  var n = Object.assign({}, p);
                  n[idx] = !p[idx];
                  return n;
                });
              }}
              style={{
                width:44, height:44, borderRadius:22,
                background: liked[idx] ? 'rgba(235,77,61,0.25)' : 'rgba(255,255,255,0.10)',
                border:'1px solid ' + (liked[idx] ? 'rgba(235,77,61,0.5)' : 'rgba(255,255,255,0.2)'),
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', fontSize:20,
                transition:'all 0.2s',
              }}>
              {liked[idx] ? '❤️' : '🤍'}
            </div>
            {/* 공유 */}
            <div style={{
                width:44, height:44, borderRadius:22,
                background:'rgba(255,255,255,0.10)',
                border:'1px solid rgba(255,255,255,0.2)',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', fontSize:18,
              }}>
              ↗️
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 5. 스토리 피드 (무신사 SNAP 스토리 원형 스크롤)
function StoryFeed({ onStory }) {
  /* ── 필터 상태: 'all' = 전체 역 | 'nearby' = 강남역·2호선 ── */
  const [storyFilter,     setStoryFilter]     = useState('all');
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const stories = [
    { id:1, nick:'지하철덕후', station:'강남역',     caption:'오늘 강남역 벚꽃 엄청 예쁨',      lineId:'2',   bg:'#1A1B22' },
    { id:2, nick:'홍대러버',   station:'홍대입구역', caption:'홍대 주말 인파 진짜 장난 아님',    lineId:'2',   bg:'#1E2028' },
    { id:3, nick:'여의도man',  station:'여의도역',   caption:'퇴근길 노을 뷰 진짜 맛집임',       lineId:'5',   bg:'#1C1810' },
    { id:4, nick:'신촌학생',   station:'신촌역',     caption:'연대 앞 신상 카페 강추해요',        lineId:'2',   bg:'#151C17' },
    { id:5, nick:'명동푸디',   station:'명동역',     caption:'명동 떡볶이 줄 50m... 먹을까말까',  lineId:'4',   bg:'#1C1515' },
  ];

  /* 필터 적용 */
  const visibleStories = storyFilter === 'nearby'
    ? stories.filter(st => st.lineId === '2')   // 강남역 · 2호선
    : stories;

  /* 필터 옵션 정의 */
  const FILTER_OPTIONS = [
    {
      id: 'all',
      label: '전체 역/호선 스토리 보기',
      sub: '모든 역, 모든 호선의 스토리를 봅니다',
      icon: '🗺️',
    },
    {
      id: 'nearby',
      label: '강남역 · 2호선 스토리 보기',
      sub: '강남역과 2호선 스토리만 모아봅니다',
      icon: '📍',
    },
  ];

  const isFiltered = storyFilter === 'nearby';

  return (
    <div style={{ margin:'16px 0 0' }}>

      {/* ── 헤더 ─────────────────────────────── */}
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'flex-start', margin:'0 16px 10px' }}>
        <div>
          <b style={{ fontSize:16, fontWeight:800, color:C.white,
            letterSpacing:'-0.03em', fontFamily:FF }}>스토리 ›</b>
          <div style={{ fontSize:11, color: isFiltered ? C.primary : C.g[70], marginTop:3, fontFamily:FF }}>
            {isFiltered ? '강남역 · 2호선 스토리' : '전체 역 스토리'}
          </div>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center' }}>

          {/* 필터 버튼 — 활성이면 파란 테두리 + 뱃지 */}
          <div
            onClick={() => setShowFilterSheet(true)}
            style={{ display:'flex', alignItems:'center', gap:5,
              padding:'5px 11px',
              border:`1px solid ${isFiltered ? C.primary+'70' : C.border}`,
              borderRadius:20, cursor:'pointer',
              background: isFiltered ? `${C.primary}18` : 'rgba(255,255,255,0.04)',
              transition:'all 0.15s' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke={isFiltered ? C.primary : C.g[60]} strokeWidth="2.8">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span style={{ fontSize:11, fontFamily:FF, fontWeight:700,
              color: isFiltered ? C.primary : C.g[60] }}>필터</span>
            {isFiltered && (
              <div style={{ width:6, height:6, borderRadius:3,
                background:C.primary, flexShrink:0 }} />
            )}
          </div>

          {/* 만들기 버튼 */}
          <div style={{ display:'flex', alignItems:'center', gap:4,
            padding:'5px 12px', background:C.primary,
            borderRadius:20, cursor:'pointer' }}>
            <span style={{ fontSize:12, color:'#0E0F14', fontWeight:700 }}>＋</span>
            <span style={{ fontSize:11, color:'#0E0F14', fontFamily:FF, fontWeight:800 }}>만들기</span>
          </div>
        </div>
      </div>

      {/* ── 스토리 카드 가로 스크롤 ─────────────── */}
      <div style={{ display:'flex', gap:8, padding:'0 16px',
        overflowX:'auto', scrollbarWidth:'none' }}>

        {visibleStories.map(st => (
          <div key={st.id} onClick={() => onStory?.(st, visibleStories)}
            style={{ flexShrink:0, width:128, height:192,
              borderRadius:14, overflow:'hidden',
              position:'relative', cursor:'pointer',
              background:st.bg,
              border:`1px solid rgba(255,255,255,0.07)` }}>

            {/* 상단 그라디언트 */}
            <div style={{ position:'absolute', top:0, left:0, right:0,
              height:64, zIndex:2,
              background:'linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)',
              pointerEvents:'none' }} />

            {/* 하단 그라디언트 */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0,
              height:72, zIndex:2,
              background:'linear-gradient(to top,rgba(0,0,0,0.72),transparent)',
              pointerEvents:'none' }} />

            {/* 좌상단: 아바타 + 닉네임 */}
            <div style={{ position:'absolute', top:9, left:9,
              display:'flex', alignItems:'center', gap:5, zIndex:3 }}>
              <div style={{ width:24, height:24, borderRadius:12, flexShrink:0,
                background: C.line[st.lineId] ?? C.primary,
                border:'1.5px solid rgba(255,255,255,0.45)',
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF }}>
                  {SUBWAY_LINES_DATA.find(l => l.id === st.lineId)?.short ?? st.lineId}
                </span>
              </div>
              <span style={{ fontSize:10, color:'rgba(255,255,255,0.92)',
                fontFamily:FF, fontWeight:700,
                textShadow:'0 1px 4px rgba(0,0,0,0.7)',
                maxWidth:78, overflow:'hidden',
                textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {st.nick}
              </span>
            </div>

            {/* 호선 배지 — 카드 중앙 */}
            <div style={{ position:'absolute', top:'50%', left:'50%',
              transform:'translate(-50%,-58%)',
              zIndex:1, width:52, height:52, borderRadius:26,
              background: C.line[st.lineId] ?? C.primary,
              display:'flex', alignItems:'center', justifyContent:'center',
              border:'2px solid rgba(255,255,255,0.2)' }}>
              <span style={{ fontSize:17, fontWeight:900, color:'#fff', fontFamily:FF }}>
                {SUBWAY_LINES_DATA.find(l => l.id === st.lineId)?.short ?? st.lineId}
              </span>
            </div>

            {/* 하단: 캡션 + 역명 */}
            <div style={{ position:'absolute', bottom:9, left:9, right:9, zIndex:3 }}>
              <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.9)',
                fontFamily:FF, lineHeight:1.4,
                textShadow:'0 1px 4px rgba(0,0,0,0.8)',
                overflow:'hidden', display:'-webkit-box',
                WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                {st.caption}
              </div>
              <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)',
                marginTop:3, fontFamily:FF }}>
                {st.station}
              </div>
            </div>
          </div>
        ))}

        {/* 새 스토리 추가 카드 */}
        <div style={{ flexShrink:0, width:128, height:192, borderRadius:14,
          border:`1.5px dashed rgba(255,255,255,0.13)`,
          background:'rgba(255,255,255,0.03)',
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          gap:8, cursor:'pointer' }}>
          <div style={{ width:38, height:38, borderRadius:19,
            background:`${C.primary}18`,
            border:`1.5px solid ${C.primary}44`,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:20, color:C.primary, lineHeight:1 }}>＋</span>
          </div>
          <span style={{ fontSize:11, color:C.g[70], fontFamily:FF,
            fontWeight:600, textAlign:'center', lineHeight:1.5 }}>
            내 스토리{'\n'}추가하기
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          스토리 필터 바텀시트
          ══════════════════════════════════════════ */}

      {/* 백드롭 */}
      <div
        onClick={() => setShowFilterSheet(false)}
        style={{
          position:'fixed', inset:0,
          background:'rgba(0,0,0,0.65)',
          backdropFilter:'blur(3px)',
          zIndex:1000,
          opacity: showFilterSheet ? 1 : 0,
          pointerEvents: showFilterSheet ? 'auto' : 'none',
          transition:'opacity 0.25s ease',
        }}
      />

      {/* 시트 본체 */}
      <div style={{
        position:'fixed', left:0, right:0, bottom:0,
        zIndex:1001,
        background:C.card,
        borderRadius:'22px 22px 0 0',
        border:`1px solid ${C.border}`,
        borderBottom:'none',
        boxShadow:'0 -8px 40px rgba(0,0,0,0.6)',
        transform: showFilterSheet ? 'translateY(0)' : 'translateY(100%)',
        transition:'transform 0.32s cubic-bezier(0.32,0.72,0,1)',
        paddingBottom:'env(safe-area-inset-bottom, 28px)',
      }}>

        {/* 드래그 핸들 */}
        <div style={{ display:'flex', justifyContent:'center', padding:'14px 0 2px' }}>
          <div style={{ width:38, height:4, borderRadius:2,
            background:'rgba(255,255,255,0.18)' }} />
        </div>

        {/* 시트 헤더 */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'10px 20px 16px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={C.primary} strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span style={{ fontSize:16, fontWeight:900, color:C.white,
              fontFamily:FF, letterSpacing:'-0.03em' }}>스토리 필터</span>
          </div>
          <button onClick={() => setShowFilterSheet(false)}
            style={{ background:'rgba(255,255,255,0.08)', border:'none',
              borderRadius:8, width:32, height:32, cursor:'pointer',
              color:C.g[60], fontSize:17, display:'flex', alignItems:'center',
              justifyContent:'center', fontFamily:FF }}>✕</button>
        </div>

        {/* 옵션 목록 */}
        <div style={{ padding:'16px 16px 20px', display:'flex', flexDirection:'column', gap:10 }}>
          {FILTER_OPTIONS.map(opt => {
            const selected = storyFilter === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => { setStoryFilter(opt.id); setShowFilterSheet(false); }}
                style={{
                  display:'flex', alignItems:'center', gap:14,
                  padding:'16px 18px',
                  borderRadius:14, cursor:'pointer',
                  background: selected ? `${C.primary}14` : 'rgba(255,255,255,0.04)',
                  border:`1.5px solid ${selected ? C.primary+'60' : C.border}`,
                  transition:'all 0.15s',
                }}>

                {/* 아이콘 */}
                <div style={{ width:42, height:42, borderRadius:12, flexShrink:0,
                  background: selected ? `${C.primary}22` : 'rgba(255,255,255,0.07)',
                  border:`1px solid ${selected ? C.primary+'40' : C.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:20 }}>
                  {opt.icon}
                </div>

                {/* 텍스트 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:800, fontFamily:FF,
                    color: selected ? C.white : C.g[50], marginBottom:3 }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, lineHeight:1.4 }}>
                    {opt.sub}
                  </div>
                </div>

                {/* 라디오 인디케이터 */}
                <div style={{ width:20, height:20, borderRadius:10, flexShrink:0,
                  border:`2px solid ${selected ? C.primary : 'rgba(255,255,255,0.2)'}`,
                  background: selected ? C.primary : 'transparent',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all 0.15s' }}>
                  {selected && (
                    <div style={{ width:7, height:7, borderRadius:4,
                      background:'#fff' }} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 6. 인기 검색어 (무신사 트렌딩 리스트, 다크)
function TrendingSection({ onSearch }) {
  const hashtags = [
    { id:0, title:'일호선 빌런' },
    { id:1, title:'이호선 연착' },
    { id:2, title:'짠테크' },
    { id:3, title:'데일리뉴스' },
    { id:4, title:'다이소' },
  ];
  return (
    <div style={{ margin:'16px 16px 0' }}>
      <SecHead title="인기 검색어" action="전체 ›" onAction={onSearch ? () => onSearch('') : undefined} />
      <DCard style={{ padding:'4px 16px' }}>
        {hashtags.map((h, i) => (
          <div key={h.id}
            onClick={() => onSearch && onSearch(h.title)}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'11px 0',
              borderBottom: i < hashtags.length-1 ? `1px solid ${C.border}` : 'none',
              cursor:'pointer',
              transition:'opacity 0.12s' }}
            onMouseDown={e => e.currentTarget.style.opacity = '0.6'}
            onMouseUp={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              {/* 무신사 트렌딩: 1~3위 포인트 색상 */}
              <span style={{ fontSize:14, fontWeight:800, minWidth:18,
                color: i < 3 ? C.primary : C.g[70],
                fontFamily:FF }}>
                {i+1}
              </span>
              <span style={{ fontSize:13, color:C.white, fontFamily:FF }}>
                {h.title}
              </span>
              {i === 0 && <Tag t="NEW" bg={C.red} col='#fff' fw={800} />}
            </div>
            {/* 검색 아이콘 */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={C.g[50]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        ))}
      </DCard>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   게시글 상세 — 데이터 & 컴포넌트
═══════════════════════════════════════════════════════ */

const POST_DB = {
  1: {
    body: `오늘 아침 8시 20분쯤 강남역 2호선 내선 승강장이 너무 혼잡해서 열차를 2대나 그냥 보냈어요…

보통 이 시간대에도 어느 정도 혼잡하긴 하지만 오늘은 유독 심한 것 같았어요. 신호 장애가 있었던 건지, 아니면 다른 이유가 있는 건지 혹시 아시는 분 계신가요?

참고로 8번 칸 쪽이 특히 더 심했고, 1~3번 칸 쪽은 그나마 좀 나았습니다. 빠른 하차 자리는 미리 파악해두는 게 정말 중요한 것 같아요.`,
    station: '강남역', views: 1842, time: '11분 전',
    images: ['linear-gradient(145deg,#7F1D1D 0%,#450A0A 100%)'],
    relTags: ['강남역', '2호선', '혼잡', '출근'],
  },
  2: {
    body: `홍대입구역 5번 출구 쪽 공사가 벌써 몇 달째 계속되고 있는데 끝날 기미가 안 보여요 ㅠㅠ

매일 이쪽으로 출퇴근하는데 돌아가는 게 너무 불편하고 시간도 오래 걸립니다. 혹시 공사 예정 완료 시기가 언제인지 아시는 분 있나요?

서울시 지하철 앱에서 공사 정보를 찾아봤는데 정확한 날짜가 안 나와 있더라고요. 공지 알림 신청해둔 분 계신가요?`,
    station: '홍대입구역', views: 763, time: '2시간 전',
    images: ['linear-gradient(145deg,#374151 0%,#111827 100%)'],
    relTags: ['홍대입구역', '2호선', '공사', '출구'],
  },
  3: {
    body: `판교역 근처에서 진짜 맛있는 집 하나 발견했어요!

이름은 "판교 순대국밥" 인데 순대 국밥이 8,000원에 푸짐하게 나와요. 위치는 판교역 3번 출구 나와서 직진하면 왼쪽에 있는 흰색 건물 1층이에요.

점심 시간대에 많이 붐비긴 하는데 회전이 빨라서 줄 서도 10분 안에 들어갈 수 있었어요. 직장인들한테 특히 추천! 가성비 최강입니다 🍜`,
    station: '판교역', views: 2341, time: '3시간 전',
    images: ['linear-gradient(145deg,#78350F 0%,#3C1407 100%)'],
    relTags: ['판교역', '신분당선', '맛집', '점심'],
  },
  4: {
    body: `출퇴근 혼잡 피하는 팁 공유합니다! 2호선 기준으로 정리했어요.

📌 오전 혼잡 최고조: 07:50~08:40 (강남·홍대·신도림)
📌 오후 혼잡 최고조: 18:10~19:20 (전 구간)

꿀팁:
- 8시 이전 or 9시 이후 출근 → 체감 혼잡도 40% 감소
- 성수역~건대입구역 구간은 오전에 외선 이용 추천
- 강남역 내선은 1~4호 칸이 6~10호 칸보다 여유로운 경우 많음
- 퇴근 시엔 강남→신도림 방향 외선 첫차 타면 거의 앉아서 감

주변에도 공유해주세요 👍`,
    station: '강남역', views: 3129, time: '5시간 전',
    images: ['linear-gradient(145deg,#0C4A6E 0%,#082F49 100%)'],
    relTags: ['2호선', '혼잡', '꿀팁', '출퇴근'],
  },
  5: {
    body: `신분당선 판교→강남 소요시간 실측했어요!

앱에 나온 시간이랑 실제 타보면서 직접 측정한 시간이 달라서 정리해봤습니다.

🚇 판교 → 강남 (급행 기준)
- 앱 표시: 18분
- 실제 측정: 21분 (정차 시간 포함)

🚇 판교 → 강남 (일반)
- 앱 표시: 25분
- 실제 측정: 28~30분

아침 출근시 광교→강남 완주는 약 55~60분 실측됩니다. 급행 타도 출발지에서 판교까지 오는 시간 포함하면 꽤 걸려요. 출근 계획 짜실 때 참고하세요!`,
    station: '판교역', views: 1544, time: '어제',
    images: ['linear-gradient(145deg,#4C1D95 0%,#2E1065 100%)'],
    relTags: ['신분당선', '판교역', '소요시간', '정보'],
  },
  6: {
    body: `강남역 편의시설 완벽 가이드 2026년판 업데이트입니다!

🏪 편의점
- GS25: 지하 1층, 24시간
- CU: 지하 2층 4번출구 방향, 05:30~01:00

🚻 화장실
- 1/2호 승강장 중간 (남/여 분리, 리모델링 완료)
- 5/6번 출구 근처 (장애인 화장실 포함)

🛗 엘리베이터
- 1번 출구 (지상↔지하2층): 정상 운행
- 10번 출구: 현재 점검 중 ⚠️

🏧 ATM
- 우리은행 지하 1층: 24시간
- 신한은행 지하 2층: 07:00~22:00

주기적으로 업데이트할게요!`,
    station: '강남역', views: 4210, time: '어제',
    images: ['linear-gradient(145deg,#064E3B 0%,#022C22 100%)'],
    relTags: ['강남역', '편의시설', '가이드', '정보'],
  },
};

const POST_COMMENTS_DB = {
  1: [
    { id:1,  nick:'통근마스터', lineId:'2',   time:'7분 전',   text:'저도 오늘 엄청 밀리던데요! 선로 점검 때문인지 내선이 3분 늦게 들어왔어요 ㅠ', likes:12,
      replies:[
        { id:11, nick:'강남러버', time:'5분 전',  text:'아 선로 점검 때문이었군요. 알려주셔서 감사해요!', likes:3 },
      ]
    },
    { id:2,  nick:'판교직장인', lineId:'sin', time:'8분 전',   text:'8번 칸 지옥인 거 완전 공감이에요 ㅋㅋㅋ 저는 항상 3번 칸 타는데 훨씬 나아요', likes:8,
      replies:[]
    },
    { id:3,  nick:'지하철덕후', lineId:'2',   time:'9분 전',   text:'오전 강남 혼잡 관련해서 서울교통공사 계정에 민원 넣었더니 특이 상황은 없다고 답변 왔어요. 그냥 일상적인 혼잡인 것 같습니다', likes:6,
      replies:[
        { id:31, nick:'통근마스터', time:'6분 전', text:'일상적인 수준이 이 정도면 정말 뭔가 개선이 필요한 것 같은데…', likes:5 },
        { id:32, nick:'강남러버',   time:'4분 전', text:'동감이에요 ㅠ 플랫폼 확장이라도 해줬으면', likes:4 },
      ]
    },
    { id:4,  nick:'홍대거주민', lineId:'2',   time:'15분 전',  text:'출근 시간대 2호선 내선은 진짜 매일 지옥임. 빠른 하차 잘 골라서 타는 것 말고는 답이 없어요ㅠ', likes:21, replies:[] },
    { id:5,  nick:'강남러버',   lineId:'2',   time:'20분 전',  text:'다들 댓글 감사해요! 내일부터는 일찍 출발해서 8시 전 열차 타야겠어요 ㅎ', likes:4, replies:[] },
    { id:6,  nick:'역사탐험가', lineId:'2',   time:'22분 전',  text:'1~4호 칸이 6~10호 칸보다 여유로운 경우가 많아요. 반대쪽 계단에서 타면 됩니다', likes:33, replies:[] },
    { id:7,  nick:'점심고민러', lineId:'2',   time:'30분 전',  text:'이거 정말 공감… 내일도 지옥 예상', likes:7, replies:[] },
  ],
  3: [
    { id:1,  nick:'지하철덕후', lineId:'sin', time:'1시간 전',  text:'오오 정보 감사해요! 판교역 3번 출구 근처 맛집이 많은데 이 집은 처음 들어보네요. 꼭 가봐야겠다!', likes:19,
      replies:[
        { id:11, nick:'판교직장인', time:'55분 전', text:'저도 처음 알았어요! 내일 점심에 바로 가볼 예정이에요', likes:6 },
      ]
    },
    { id:2,  nick:'IT개발자K',  lineId:'sin', time:'2시간 전',  text:'근처 직장인인데 이 집 자주 가요! 순대 국밥 특(곱창 추가)이 제일 맛있어요 ㅎㅎ', likes:28, replies:[] },
    { id:3,  nick:'환승왕',     lineId:'1',   time:'2시간 전',  text:'가격 대비 진짜 최고. 반찬도 셀프로 리필 돼요', likes:14, replies:[] },
  ],
  4: [
    { id:1,  nick:'출퇴근기록자', lineId:'sin', time:'4시간 전', text:'이 정보 진짜 유용하다!! 저장했어요 감사합니다', likes:47, replies:[] },
    { id:2,  nick:'GTX박사',      lineId:'1',   time:'4시간 전', text:'성수역 꿀팁은 몰랐는데 내일부터 적용해봐야겠어요!', likes:22,
      replies:[
        { id:21, nick:'출퇴근기록자', time:'3시간 전', text:'성수역 외선은 8시 이후엔 진짜 차이가 확실히 나요!', likes:8 }
      ]
    },
    { id:3,  nick:'홍대거주민', lineId:'2',   time:'5시간 전', text:'퇴근 시 강남→신도림 외선 앉아서 간다는 게 실화예요? 한번 해봐야겠다', likes:15, replies:[] },
    { id:4,  nick:'야간열차',   lineId:'9',   time:'6시간 전', text:'이런 팁들이 모여서 앱이 됐으면 좋겠어요. 공식 앱은 너무 부실해서', likes:31, replies:[] },
  ],
};


// 7. 지금 뜨는 글 (무신사 콘텐츠 피드 카드 스타일)
/* ═══════════════════════════════════════════════════════
   ⑧ 지금 뜨는 글 — 3-in-1 탭 슬라이더
   전체 / 강남역 / [선택 호선] 을 하나의 슬라이딩 섹션으로 통합
   ═══════════════════════════════════════════════════════ */
function HotPostsTabs({ selectedLine, onPostDetail }) {
  const [activeTab, setActiveTab] = useState(0); // 0=전체  1=강남역  2=호선

  /* 호선 메타 */
  const LINE_META = {
    s2:  { name:'2호선',   color:C.line.s2  },
    sin: { name:'신분당선', color:C.line.sin },
  };
  const meta = LINE_META[selectedLine] ?? LINE_META.s2;

  /* 탭 정의 */
  const TABS = [
    { label:'전체',      action:'전체 ›',       color:C.primary    },
    { label:'강남역',    action:'강남역 전체 ›', color:C.line.s2    },
    { label:meta.name,  action:'전체 ›',        color:meta.color   },
  ];

  /* ── 슬라이드별 데이터 ───────────────────────────────── */
  const SLIDES = [
    /* slide 0 — 전체 */
    [
      { id:1, tag:'2호선',  title:'강남역 승강장 공사로 혼잡도 심각합니다',                   likes:24, comments:8,  time:'3분 전',  urgent:true  },
      { id:2, tag:'분실물', title:'신분당선 판교→강남 우산 두고 내렸어요 회색 접이식',         likes:3,  comments:5,  time:'12분 전', urgent:false },
      { id:3, tag:'시청역', title:'오늘 5호선 지연 정보 공유해요 약 15분 지연 중',             likes:18, comments:12, time:'21분 전', urgent:false },
    ],
    /* slide 1 — 강남역 */
    [
      { id:1, tag:'11번출구', title:'강남역 11번 출구 공사 언제 끝나요? 매일 돌아가는 중…',    likes:31, comments:14, time:'1분 전',  urgent:false },
      { id:2, tag:'편의시설', title:'강남역 승강장 화장실 리모델링 드디어 완공! 진짜 깔끔해짐', likes:47, comments:9,  time:'9분 전',  urgent:false },
      { id:3, tag:'혼잡',    title:'강남역 2호선 내선 승강장 지금 엄청 밀려요 ㅠㅠ',           likes:19, comments:22, time:'17분 전', urgent:true  },
      { id:4, tag:'꿀팁',    title:'강남역 1번 칸에 타면 3호선 환승 50초 단축 가능한 거 알아요?', likes:88, comments:33, time:'38분 전', urgent:false },
    ],
    /* slide 2 — 호선 (s2 / sin) */
    {
      s2: [
        { id:1, tag:'외선', title:'2호선 외선 지금 5분 지연 중. 홍대~신도림 구간 주의',        likes:52, comments:17, time:'2분 전',  urgent:true  },
        { id:2, tag:'혼잡', title:'종합운동장역 퇴근 시간대 극한 혼잡… 버틸 수 없는 수준',    likes:29, comments:8,  time:'11분 전', urgent:false },
        { id:3, tag:'꿀팁', title:'2호선 성수 지선 사당까지 가는 거 맞죠? 헷갈리는 사람들',   likes:14, comments:21, time:'23분 전', urgent:false },
        { id:4, tag:'시설', title:'건대입구역 엘리베이터 고장 — 휠체어/유모차 1번 출구 우회',  likes:33, comments:6,  time:'41분 전', urgent:true  },
      ],
      sin: [
        { id:1, tag:'하행', title:'신분당선 판교역 에스컬레이터 점검 중 — 계단 이용 안내',    likes:41, comments:11, time:'4분 전',  urgent:false },
        { id:2, tag:'혼잡', title:'출근 신분당선 강남행 4~6칸 사람 너무 많아요',               likes:26, comments:7,  time:'15분 전', urgent:false },
        { id:3, tag:'환승', title:'강남역 2호선↔신분당선 환승 최단 루트 이게 맞나요?',         likes:77, comments:44, time:'29분 전', urgent:false },
        { id:4, tag:'연착', title:'신분당선 정자역 선로 점검으로 8분 지연 — 현재 정상화',     likes:18, comments:5,  time:'52분 전', urgent:false },
      ],
    },
  ];

  /* 현재 슬라이드 포스트 배열 */
  const slidePosts = (idx) => {
    if (idx < 2) return SLIDES[idx];
    return SLIDES[2][selectedLine] ?? SLIDES[2].s2;
  };

  /* 공통 포스트 행 렌더러 */
  const renderRow = (p, i, arr, tagColor, tagBg) => (
    <div key={p.id}
      onClick={() => onPostDetail && onPostDetail({
        lineId: '2', tagColor, writer: '이용자', thumb: null, station: null,
        ...p,
      })}
      style={{ padding:'12px 0',
        borderBottom: i < arr.length-1 ? `1px solid ${C.border}` : 'none',
        cursor:'pointer' }}>
      {p.urgent && (
        <div style={{ fontSize:10, color:C.red, fontWeight:800,
          marginBottom:4, letterSpacing:'0.02em' }}>
          긴급
        </div>
      )}
      <div style={{ fontSize:13, color:C.white, lineHeight:1.5, marginBottom:6, fontFamily:FF }}>
        {p.title}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
        <span style={{ fontSize:10, color:tagColor, fontWeight:700,
          background:tagBg, borderRadius:4, padding:'2px 7px', flexShrink:0 }}>
          {p.tag}
        </span>
        <span style={{ fontSize:11, color:C.g[70] }}>공감 {p.likes}</span>
        <span style={{ fontSize:11, color:C.g[70] }}>댓글 {p.comments}</span>
        <span style={{ fontSize:11, color:C.g[80], marginLeft:'auto' }}>{p.time}</span>
      </div>
    </div>
  );

  return (
    <div style={{ margin:'16px 16px 0' }}>

      {/* 섹션 헤더 */}
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'center', marginBottom:10 }}>
        <b style={{ fontSize:16, fontWeight:800, color:C.white,
          letterSpacing:'-0.03em', fontFamily:FF }}>
          지금 뜨는 글
        </b>
        <span style={{ fontSize:12, color:C.g[70], cursor:'pointer' }}>
          {TABS[activeTab].action}
        </span>
      </div>

      {/* ── 카드 래퍼 ─────────────────────────────────────── */}
      <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:8,
        overflow:'hidden' }}>

        {/* 탭 인디케이터 바 */}
        <div style={{ display:'flex',
          borderBottom:`1px solid ${C.border}` }}>
          {TABS.map((tab, i) => {
            const act = i === activeTab;
            return (
              <div key={i} onClick={() => setActiveTab(i)}
                style={{ flex:1, display:'flex', alignItems:'center',
                  justifyContent:'center', gap:5,
                  padding:'11px 6px',
                  fontSize:12, fontWeight: act ? 800 : 500,
                  color:        act ? tab.color : C.g[70],
                  borderBottom: act ? `2px solid ${tab.color}` : '2px solid transparent',
                  cursor:'pointer', fontFamily:FF,
                  transition:'color 0.15s, border-color 0.15s',
                  whiteSpace:'nowrap', background:'transparent' }}>
                {/* 호선 탭 컬러 dot */}
                {i === 2 && (
                  <div style={{ width:7, height:7, borderRadius:4,
                    background:meta.color, flexShrink:0,
                    opacity: act ? 1 : 0.5, transition:'opacity 0.15s' }} />
                )}
                {tab.label}
              </div>
            );
          })}
        </div>

        {/* 슬라이딩 패널 — CSS transform으로 좌우 전환 */}
        <div style={{ overflow:'hidden' }}>
          <div style={{
            display:'flex',
            transform:`translateX(-${activeTab * 100}%)`,
            transition:'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {/* 슬라이드 0: 전체 */}
            <div style={{ minWidth:'100%', padding:'0 16px' }}>
              {slidePosts(0).map((p, i, arr) =>
                renderRow(p, i, arr, C.primary, 'rgba(0,186,246,0.12)')
              )}
            </div>
            {/* 슬라이드 1: 강남역 */}
            <div style={{ minWidth:'100%', padding:'0 16px' }}>
              {slidePosts(1).map((p, i, arr) =>
                renderRow(p, i, arr, C.line.s2, `${C.line.s2}18`)
              )}
            </div>
            {/* 슬라이드 2: 선택 호선 */}
            <div style={{ minWidth:'100%', padding:'0 16px' }}>
              {slidePosts(2).map((p, i, arr) =>
                renderRow(p, i, arr, meta.color, `${meta.color}18`)
              )}
            </div>
          </div>
        </div>

        {/* 하단 "더보기" 버튼 */}
        <div style={{ borderTop:`1px solid ${C.border}`,
          padding:'10px 16px', display:'flex', alignItems:'center',
          justifyContent:'center', gap:6, cursor:'pointer',
          background:'rgba(255,255,255,0.02)' }}>
          <span style={{ fontSize:12, color:C.g[70], fontFamily:FF, fontWeight:600 }}>
            {TABS[activeTab].label} 글 전체 보기
          </span>
          <span style={{ fontSize:11, color:C.g[70] }}>›</span>
        </div>
      </div>
    </div>
  );
}

// 9. 실시간 지하철 뉴스 (무신사 아티클 리스트)
/* ── 이 역 안에서 — 유저 업로드 역사 내 맛집 피드 ────────── */
const INSIDE_STATION_POSTS = [
  { id:1, nick:'강남러버',   avatar:'강', lineId:'2',   station:'강남역',
    place:'GS25 강남역점 핫도그', category:'편의점 먹거리',
    text:'출근 전에 항상 여기서 핫도그 하나 집어요. 계란 토스트도 맛있음.',
    likes:34, comments:8,  time:'12분 전', color:'#1A2E1A' },
  { id:2, nick:'판교개발자', avatar:'판', lineId:'sin', station:'판교역',
    place:'투썸플레이스 신분당선판교역점', category:'카페·디저트',
    text:'신분당선 개찰구 안쪽에 있어서 환승 대기할 때 진짜 유용함. 자리도 꽤 있어요.',
    likes:51, comments:14, time:'38분 전', color:'#1A1A2E' },
  { id:3, nick:'여의도man',  avatar:'여', lineId:'5',   station:'여의도역',
    place:'이삭토스트 여의도역점', category:'토스트·샌드위치',
    text:'지하 2층 환승 통로에 있는데 아침에 줄 서도 빠르게 나와요. 가성비 최고.',
    likes:29, comments:6,  time:'1시간 전', color:'#2E1A1A' },
  { id:4, nick:'홍대러버',   avatar:'홍', lineId:'2',   station:'홍대입구역',
    place:'파리바게뜨 홍대입구역점', category:'베이커리',
    text:'2호선 내부에 있어서 비 와도 젖을 걱정 없이 빵 사갈 수 있음 ㅋㅋ',
    likes:18, comments:4,  time:'2시간 전', color:'#2E2A1A' },
  { id:5, nick:'을지로감성', avatar:'을', lineId:'2',   station:'을지로3가역',
    place:'요거트 아이스크림 을지로점', category:'디저트·간식',
    text:'퇴근길에 딱 한 컵. 역사 안인데 생각보다 맛집이에요. 줄 설 각오는 하세요.',
    likes:42, comments:11, time:'3시간 전', color:'#1A2A2E' },
];

/* ── 이 역 안에서 상세 화면 ───────────────────────────────── */
function InsideStationDetailScreen({ onBack }) {
  const [selectedStore, setSelectedStore] = React.useState(null);
  const lineColor = id => SUBWAY_LINES_DATA.find(x => x.id === id)?.color ?? C.primary;
  const lineShort = id => SUBWAY_LINES_DATA.find(x => x.id === id)?.short ?? id;

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80, background:C.bg }}>
      {/* 헤더 */}
      <div style={{ position:'sticky', top:0, zIndex:100,
        background:'rgba(14,15,20,0.97)', backdropFilter:'blur(12px)',
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center',
            justifyContent:'space-between', padding:'0 16px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <button onClick={onBack}
                style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:10,
                  width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', fontSize:16, color:C.white, flexShrink:0 }}>←</button>
              <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>
                이 역 안에서
              </span>
            </div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:5,
              padding:'6px 14px', background:`${C.primary}15`,
              border:`1px solid ${C.primary}40`, borderRadius:20, cursor:'pointer' }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.primary, fontFamily:FF }}>+ 올리기</span>
            </div>
          </div>
        </div>
      </div>

      {/* 전체 피드 */}
      {INSIDE_STATION_POSTS.map((p, idx) => {
        const lc = lineColor(p.lineId);
        return (
          <div key={p.id}
            onClick={() => setSelectedStore(p)}
            style={{ padding:'16px 16px',
            borderBottom:`1px solid ${C.border}`, cursor:'pointer' }}>
            {/* 유저 정보 + 역 배지 */}
            <div style={{ display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:30, height:30, borderRadius:15,
                  background:`${lc}28`, border:`1px solid ${lc}44`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:800, color:lc, fontFamily:FF }}>
                  {p.avatar}
                </div>
                <div>
                  <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                    {p.nick}
                  </span>
                  <span style={{ fontSize:11, color:C.g[70], marginLeft:6 }}>{p.time}</span>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                <div style={{ width:16, height:16, borderRadius:8, background:lc,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:8, fontWeight:900, color:'#fff', fontFamily:FF }}>
                  {lineShort(p.lineId)}
                </div>
                <span style={{ fontSize:11, color:lc, fontWeight:700, fontFamily:FF }}>
                  {p.station}
                </span>
              </div>
            </div>

            {/* 썸네일 + 텍스트 */}
            <div style={{ display:'flex', gap:12 }}>
              <div style={{ width:80, height:80, borderRadius:8, flexShrink:0,
                background:p.color, border:`1px solid rgba(255,255,255,0.07)`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:9, fontWeight:700,
                  color:'rgba(255,255,255,0.45)', fontFamily:FF,
                  textAlign:'center', padding:'0 6px', lineHeight:1.5 }}>
                  {p.category}
                </span>
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:700, color:C.white,
                  fontFamily:FF, marginBottom:5,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {p.place}
                </div>
                <div style={{ fontSize:12, color:C.g[60], lineHeight:1.6, fontFamily:FF }}>
                  {p.text}
                </div>
              </div>
            </div>

            {/* 반응 */}
            <div style={{ display:'flex', gap:14, marginTop:10 }}>
              <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>공감 {p.likes}</span>
              <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>댓글 {p.comments}</span>
            </div>
          </div>
        );
      })}

      {/* ── 매장 상세 바텀시트 ────────────────────────── */}
      {selectedStore && (() => {
        const st = selectedStore;
        const lc = lineColor(st.lineId);
        const STORE_HOURS = { '편의점 먹거리':'24시간', '카페·디저트':'07:00–22:00', '토스트·샌드위치':'06:30–21:00', '베이커리':'07:00–21:30', '디저트·간식':'11:00–22:00' };
        const STORE_LOCS  = { '편의점 먹거리':'2호선 승강장 B2', '카페·디저트':'신분당선 개찰구 내부', '토스트·샌드위치':'5호선 환승 통로', '베이커리':'2호선 지하 1층', '디저트·간식':'2호선 지하 2층' };
        const STORE_REVIEWS = [
          { nick:'지하철마스터', text:'진짜 출근길 필수 코스', rating:5, time:'2일 전' },
          { nick:'강남러버',    text:'가성비 최고, 줄은 좀 서야 함',   rating:4, time:'3일 전' },
          { nick:'판교직장인',  text:'맛은 있는데 가끔 재료 소진됨',   rating:4, time:'1주 전' },
        ];
        return (
          <>
            <div onClick={() => setSelectedStore(null)}
              style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:500 }} />
            <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:501,
              background:C.card, borderRadius:'22px 22px 0 0',
              maxHeight:'82vh', overflowY:'auto',
              padding:'0 0 env(safe-area-inset-bottom,20px)',
              boxShadow:'0 -8px 40px rgba(0,0,0,0.5)' }}>

              {/* 핸들 */}
              <div style={{ width:36, height:4, background:C.border,
                borderRadius:2, margin:'14px auto 0' }} />

              {/* 히어로 섹션 */}
              <div style={{ margin:'16px 20px 0', padding:'18px',
                background:st.color ?? C.bg,
                borderRadius:16, border:`1px solid ${lc}22`,
                display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ width:56, height:56, borderRadius:14,
                  background:`${lc}28`, border:`1.5px solid ${lc}44`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:24, flexShrink:0 }}>
                  {st.category === '편의점 먹거리' ? '🏪' :
                   st.category === '카페·디저트' ? '☕' :
                   st.category === '토스트·샌드위치' ? '🥪' :
                   st.category === '베이커리' ? '🥐' : '🍦'}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:17, fontWeight:900, color:'#fff',
                    fontFamily:FF, letterSpacing:'-0.02em', marginBottom:4 }}>
                    {st.place}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:lc,
                      background:`${lc}22`, padding:'2px 8px', borderRadius:6,
                      fontFamily:FF }}>
                      {st.category}
                    </span>
                    <span style={{ fontSize:11, color:'rgba(255,255,255,0.5)',
                      fontFamily:FF }}>{st.station}</span>
                  </div>
                </div>
              </div>

              {/* 정보 그리드 */}
              <div style={{ margin:'16px 20px 0', display:'grid',
                gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  { icon:'📍', label:'위치', value: STORE_LOCS[st.category] ?? '역 내부' },
                  { icon:'🕐', label:'영업시간', value: STORE_HOURS[st.category] ?? '정보 없음' },
                  { icon:'❤️', label:'공감',  value: `${st.likes}명` },
                  { icon:'💬', label:'후기',  value: `${st.comments}개` },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ background:C.bg,
                    border:`1px solid ${C.border}`, borderRadius:12, padding:'12px 14px' }}>
                    <div style={{ fontSize:16, marginBottom:5 }}>{icon}</div>
                    <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginBottom:3 }}>{label}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* 소개 텍스트 */}
              <div style={{ margin:'14px 20px 0', padding:'14px',
                background:C.bg, borderRadius:12,
                border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:12, color:C.g[60], fontFamily:FF,
                  lineHeight:1.7 }}>{st.text}</div>
              </div>

              {/* 이용 후기 */}
              <div style={{ margin:'16px 20px 0' }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.g[60],
                  fontFamily:FF, letterSpacing:'0.06em', marginBottom:10,
                  textTransform:'uppercase' }}>이용 후기</div>
                {STORE_REVIEWS.map((r, i) => (
                  <div key={i} style={{ padding:'12px 0',
                    borderBottom: i < STORE_REVIEWS.length-1 ? `1px solid ${C.border}` : 'none',
                    display:'flex', gap:10, alignItems:'flex-start' }}>
                    <div style={{ width:32, height:32, borderRadius:16, flexShrink:0,
                      background:`${lc}22`, border:`1px solid ${lc}33`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:12, fontWeight:800, color:lc, fontFamily:FF }}>
                      {r.nick.slice(0,1)}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center',
                        justifyContent:'space-between', marginBottom:4 }}>
                        <span style={{ fontSize:12, fontWeight:700,
                          color:C.white, fontFamily:FF }}>{r.nick}</span>
                        <div style={{ display:'flex', gap:1 }}>
                          {'★'.repeat(r.rating).split('').map((s, si) => (
                            <span key={si} style={{ fontSize:10, color:'#FBBF24' }}>★</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize:12, color:C.g[60], fontFamily:FF,
                        lineHeight:1.6 }}>{r.text}</div>
                      <div style={{ fontSize:10, color:C.g[70],
                        fontFamily:FF, marginTop:3 }}>{r.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 액션 버튼 */}
              <div style={{ padding:'16px 20px 0', display:'flex', gap:10 }}>
                <button onClick={() => setSelectedStore(null)}
                  style={{ flex:1, height:46, borderRadius:12,
                    background:'transparent', border:`1px solid ${C.border}`,
                    fontSize:14, fontWeight:700, color:C.g[60],
                    fontFamily:FF, cursor:'pointer' }}>
                  닫기
                </button>
                <button style={{ flex:1, height:46, borderRadius:12,
                  background:`${lc}20`, border:`1px solid ${lc}50`,
                  fontSize:13, fontWeight:700, color:lc,
                  fontFamily:FF, cursor:'pointer' }}>
                  🗺️ 지도 보기
                </button>
                <button style={{ flex:1, height:46, borderRadius:12,
                  background:C.primary, border:'none',
                  fontSize:13, fontWeight:700, color:'#fff',
                  fontFamily:FF, cursor:'pointer' }}>
                  ❤️ 저장
                </button>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}

/* ── 이 역 안에서 홈 요약 컴포넌트 ───────────────────────── */
function InsideStationSection({ onMore }) {
  const lineColor = id => SUBWAY_LINES_DATA.find(x => x.id === id)?.color ?? C.primary;
  const lineShort = id => SUBWAY_LINES_DATA.find(x => x.id === id)?.short ?? id;
  const preview = INSIDE_STATION_POSTS.slice(0, 3);

  return (
    <div>
      {/* 헤더 */}
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'center', padding:'0 16px', marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:18, fontWeight:900, color:C.white,
            fontFamily:FF, letterSpacing:'-0.03em' }}>이 역 안에서</span>
          <span style={{ fontSize:10, fontWeight:800, color:C.primary,
            background:`${C.primary}18`, border:`1px solid ${C.primary}33`,
            padding:'2px 7px', borderRadius:4, fontFamily:FF }}>유저 픽</span>
        </div>
        <span onClick={onMore}
          style={{ fontSize:12, color:C.g[60], fontFamily:FF, cursor:'pointer' }}>
          더보기 ›
        </span>
      </div>

      {/* 컴팩트 리스트 3개 */}
      {preview.map((p, idx) => {
        const lc = lineColor(p.lineId);
        return (
          <div key={p.id} onClick={onMore}
            style={{ display:'flex', alignItems:'center', gap:12,
              padding:'10px 16px', cursor:'pointer',
              borderBottom: idx < preview.length - 1 ? `1px solid ${C.border}` : 'none' }}>
            {/* 썸네일 */}
            <div style={{ width:44, height:44, borderRadius:8, flexShrink:0,
              background:p.color, border:`1px solid rgba(255,255,255,0.07)`,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:16, height:16, borderRadius:8, background:lc,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:7, fontWeight:900, color:'#fff', fontFamily:FF }}>
                {lineShort(p.lineId)}
              </div>
            </div>
            {/* 텍스트 */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.white,
                fontFamily:FF, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {p.place}
              </div>
              <div style={{ fontSize:11, color:C.g[70], marginTop:2, fontFamily:FF,
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {p.station} · {p.nick} · {p.time}
              </div>
            </div>
            {/* 공감 */}
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, flexShrink:0 }}>
              공감 {p.likes}
            </span>
          </div>
        );
      })}

      {/* 더보기 버튼 */}
      <div onClick={onMore}
        style={{ margin:'10px 16px 0', padding:'11px 0', borderRadius:8, textAlign:'center',
          background:C.glass1, border:`1px solid ${C.border}`, cursor:'pointer' }}>
        <span style={{ fontSize:13, fontWeight:700, color:C.g[60], fontFamily:FF }}>
          후기 {INSIDE_STATION_POSTS.length}개 전체보기
        </span>
      </div>
    </div>
  );
}

/* ── 이 역 내리면 — 역사 주변 맛집 피드 ──────────────────── */
const STATION_FOOD = [
  { id:1, name:'교동 칼국수',       station:'강남',   exit:'10번 출구', category:'칼국수·만두', dist:'도보 2분', color:'#2A3E6A', tag:'줄 서는 집' },
  { id:2, name:'을지면옥',          station:'을지로3가', exit:'6번 출구', category:'냉면·설렁탕', dist:'도보 1분', color:'#1E3A2F', tag:'점심 추천' },
  { id:3, name:'홍대 마포갈매기',   station:'홍대입구', exit:'9번 출구', category:'고기·구이',  dist:'도보 4분', color:'#3A1E1E', tag:'저녁 맛집' },
  { id:4, name:'판교 현대백화점 푸드코트', station:'판교', exit:'1번 출구', category:'다양한 음식', dist:'도보 3분', color:'#1A2A3A', tag:'빠른 식사' },
  { id:5, name:'여의도 더현대 맛집가',  station:'여의도', exit:'3번 출구', category:'복합 다이닝', dist:'도보 5분', color:'#2A1A3A', tag:'데이트 코스' },
  { id:6, name:'광화문 미진',        station:'광화문',  exit:'5번 출구', category:'냉면·비빔밥', dist:'도보 3분', color:'#1A3A2A', tag:'오래된 맛집' },
];

function StationFoodSection() {
  return (
    <div style={{ margin:'24px 0 0' }}>
      {/* 헤더 */}
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'flex-end', padding:'0 16px', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:18, fontWeight:900, color:C.white,
            fontFamily:FF, letterSpacing:'-0.03em', lineHeight:1.2 }}>
            이 역 내리면
          </div>
          <div style={{ fontSize:12, color:C.g[70], marginTop:3, fontFamily:FF }}>
            역 주변 로컬 맛집 픽
          </div>
        </div>
        <span style={{ fontSize:12, color:C.g[60], fontFamily:FF, cursor:'pointer' }}>
          전체 보기 ›
        </span>
      </div>

      {/* 가로 스크롤 카드 */}
      <div style={{ display:'flex', gap:10, overflowX:'auto',
        scrollbarWidth:'none', padding:'0 16px 4px' }}>
        {STATION_FOOD.map(f => (
          <div key={f.id} style={{ flexShrink:0, width:150, cursor:'pointer' }}>
            {/* 썸네일 */}
            <div style={{ width:150, height:110, borderRadius:8, overflow:'hidden',
              background:f.color, position:'relative',
              border:`1px solid rgba(255,255,255,0.06)` }}>
              {/* 컬러 플레이스홀더 — 대각선 패턴 */}
              <div style={{ position:'absolute', inset:0,
                background:`linear-gradient(135deg, ${f.color} 0%, rgba(255,255,255,0.04) 100%)` }} />
              {/* 카테고리 배지 */}
              <div style={{ position:'absolute', top:8, left:8 }}>
                <span style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.9)',
                  background:'rgba(0,0,0,0.45)', padding:'3px 7px',
                  borderRadius:4, fontFamily:FF }}>
                  {f.category}
                </span>
              </div>
              {/* 태그 배지 */}
              <div style={{ position:'absolute', bottom:8, right:8 }}>
                <span style={{ fontSize:10, fontWeight:800, color:C.primary,
                  background:`${C.primary}18`, padding:'3px 8px',
                  borderRadius:4, border:`1px solid ${C.primary}33`, fontFamily:FF }}>
                  {f.tag}
                </span>
              </div>
              {/* 역명 + 출구 */}
              <div style={{ position:'absolute', bottom:8, left:8 }}>
                <span style={{ fontSize:9, color:'rgba(255,255,255,0.55)',
                  fontFamily:FF }}>
                  {f.station}역 {f.exit}
                </span>
              </div>
            </div>
            {/* 텍스트 */}
            <div style={{ marginTop:8 }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.white,
                fontFamily:FF, letterSpacing:'-0.01em',
                overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                {f.name}
              </div>
              <div style={{ fontSize:11, color:C.g[70], marginTop:3, fontFamily:FF }}>
                {f.dist}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsSection() {
  const news = [
    { id:1, title:'한밤 내복차림 지하철역 헤매던 90대…이것 때문에 무사 귀가', line:'s2', time:'2분 전',  hasImg:true  },
    { id:2, title:'尹선고일 빌딩 옥상 출입통제…지하철 물품보관함 폐쇄 검토',  line:'s5', time:'5분 전',  hasImg:false },
    { id:3, title:'"지하철에서 몰래 촬영 처벌...여자 만날 때 과거 알려야 하니"', line:'s9', time:'8분 전', hasImg:true  },
    { id:4, title:'구리도시공사, 8호선 구리구간 역사 안전점검 실시',           line:'s8', time:'15분 전', hasImg:true  },
  ];
  return (
    <div style={{ margin:'16px 16px 0' }}>
      <SecHead title="실시간 지하철 뉴스" action="더보기 ›" />
      <DCard style={{ padding:'4px 16px' }}>
        {news.map((n, i) => (
          <div key={n.id}
            style={{ display:'flex', gap:10, padding:'11px 0',
              borderBottom: i < news.length-1 ? `1px solid ${C.border}` : 'none',
              cursor:'pointer' }}>
            <div style={{ flex:1, minWidth:0 }}>
              {/* 타이틀 */}
              <div style={{ fontSize:12, color:C.white, lineHeight:1.45, marginBottom:5,
                fontFamily:FF }}>
                {n.title}
              </div>
              {/* 라인 도트 + 시간 */}
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:8, height:8, borderRadius:4,
                  background:C.line[n.line], flexShrink:0 }} />
                <span style={{ fontSize:10, color:C.g[70] }}>{n.time}</span>
              </div>
            </div>
            {/* 썸네일 (무신사 뉴스 카드 썸네일) */}
            {n.hasImg && (
              <div style={{ width:58, height:50, borderRadius:8, flexShrink:0,
                background:C.glass2,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:20, height:2, borderRadius:1, background:C.glass3 }} />
              </div>
            )}
          </div>
        ))}
      </DCard>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   언어 교환 데이터
   ══════════════════════════════════════════════════════════ */
const LANG_EXCHANGE_USERS = [
  { id:1,  nick:'Mei Lin',    flag:'🇨🇳', country:'중국',    native:'중국어',   learning:'한국어',
    level:'중급', station:'명동역', lineId:'4', stationEmoji:'🛍️',
    tags:['카페에서 만나요','어학 목적','주말 가능'],
    bio:'한국 드라마로 한국어 공부 중이에요! 중국어도 같이 배워요 😊 명동 근처 카페에서 만나면 좋겠어요.',
    likes:24, online:true },
  { id:2,  nick:'Tanaka K.', flag:'🇯🇵', country:'일본',    native:'일본어',   learning:'한국어',
    level:'고급', station:'홍대입구역', lineId:'2', stationEmoji:'🎵',
    tags:['온라인/오프라인','K-POP 팬','평일 가능'],
    bio:'도쿄 출신이에요. K-POP과 한국 문화를 너무 좋아해서 유창하게 말하고 싶어요! 일본어 원어민입니다.',
    likes:41, online:true },
  { id:3,  nick:'Sophie D.', flag:'🇫🇷', country:'프랑스',  native:'프랑스어', learning:'한국어',
    level:'초급', station:'이태원역', lineId:'6', stationEmoji:'🌍',
    tags:['오프라인 선호','프랑스 문화 교류','저녁 가능'],
    bio:'Bonjour! 한국어를 막 시작했어요. 프랑스어 가르쳐드릴게요 😄 이태원 근처 살아요.',
    likes:18, online:false },
  { id:4,  nick:'Carlos M.', flag:'🇲🇽', country:'멕시코', native:'스페인어', learning:'한국어',
    level:'초급', station:'강남역', lineId:'2', stationEmoji:'🌆',
    tags:['주말 가능','음식 이야기 좋아요','카페'],
    bio:'¡Hola! 멕시코 출신이에요. 한국 음식을 너무 좋아해서 한국어 배우는 중! 스페인어 원어민이에요.',
    likes:15, online:true },
  { id:5,  nick:'Emma L.',   flag:'🇬🇧', country:'영국',    native:'영어',     learning:'한국어',
    level:'중급', station:'성수역', lineId:'2', stationEmoji:'☕',
    tags:['온라인 가능','드라마 팬','어학 목적'],
    bio:'영국에서 온 영어 선생님이에요. 한국어 중급 수준이고 영어 과외도 가능해요! 성수 카페 즐겨가요.',
    likes:33, online:false },
  { id:6,  nick:'Aom T.',    flag:'🇹🇭', country:'태국',    native:'태국어',   learning:'한국어',
    level:'중급', station:'홍대입구역', lineId:'2', stationEmoji:'🎵',
    tags:['K-POP 팬','주말 가능','카페에서 만나요'],
    bio:'태국에서 온 K-POP 팬이에요 💕 방탄소년단 때문에 한국어 배우기 시작했어요. 태국어 함께 배워요!',
    likes:29, online:true },
  { id:7,  nick:'James P.',  flag:'🇦🇺', country:'호주',    native:'영어',     learning:'한국어',
    level:'고급', station:'선릉역', lineId:'2', stationEmoji:'🏢',
    tags:['온라인 선호','비즈니스 한국어','평일 저녁'],
    bio:'호주 출신 직장인이에요. 비즈니스 한국어를 배우고 있어요. 영어 회화 파트너 찾습니다!',
    likes:22, online:false },
  { id:8,  nick:'Linh N.',   flag:'🇻🇳', country:'베트남', native:'베트남어',  learning:'한국어',
    level:'중급', station:'이태원역', lineId:'6', stationEmoji:'🌍',
    tags:['오프라인 가능','음식 이야기','저녁 가능'],
    bio:'베트남에서 왔어요! 한국 음식이 너무 좋아서 한국어 공부 중이에요. 베트남어 원어민입니다 😊',
    likes:17, online:true },
];

/* 언어 교환 미리보기 섹션 (홈 화면) */
/* ── 언어 교환 공유 헬퍼 ── */
function LangBadgeShared(props) {
  var lang = props.lang; var type = props.type;
  var isNative = type === 'native';
  var col = isNative ? C.primary : '#F59E0B';
  return (
    <div style={{ display:'flex', alignItems:'center', gap:3,
      padding:'2px 7px', borderRadius:8,
      background:col + '18', border:'1px solid ' + col + '35' }}>
      <span style={{ fontSize:9, color:col, fontFamily:FF, fontWeight:700 }}>
        {isNative ? '모국어' : '학습 중'}
      </span>
      <span style={{ fontSize:11, color:col, fontFamily:FF, fontWeight:700 }}>{lang}</span>
    </div>
  );
}

/* ── ① 홈 미리보기 섹션: 가로 스크롤 카드 ── */
function LanguageExchangeSection({ onMore }) {
  var onlineCount = LANG_EXCHANGE_USERS.filter(function(u){ return u.online; }).length;

  return (
    <div style={{ margin:'8px 0 0' }}>
      {/* 섹션 헤더 */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between',
        padding:'0 16px', marginBottom:12 }}>
        <div>
          <div style={{ fontSize:10, fontWeight:700, color:C.primary,
            letterSpacing:'0.12em', fontFamily:FF, textTransform:'uppercase', marginBottom:3 }}>
            LANGUAGE EXCHANGE
          </div>
          <b style={{ fontSize:18, fontWeight:900, color:C.white,
            fontFamily:FF, letterSpacing:'-0.04em', lineHeight:1.1 }}>언어 교환</b>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:6, paddingBottom:3 }}>
          <div style={{ display:'flex', alignItems:'center', gap:4,
            padding:'3px 8px', borderRadius:10,
            background:'#10B98120', border:'1px solid #10B98140' }}>
            <div style={{ width:6, height:6, borderRadius:'50%',
              background:'#10B981', boxShadow:'0 0 6px #10B981' }}/>
            <span style={{ fontSize:10, fontWeight:700, color:'#10B981', fontFamily:FF }}>
              {onlineCount}명 온라인
            </span>
          </div>
          <span onClick={onMore}
            style={{ fontSize:11, color:C.g[70], fontFamily:FF, cursor:'pointer' }}>
            전체 보기 ›
          </span>
        </div>
      </div>

      {/* ── 가로 스크롤 카드 ── */}
      <div style={{ display:'flex', gap:10, padding:'0 16px',
        overflowX:'auto', scrollbarWidth:'none', paddingBottom:4 }}>
        {LANG_EXCHANGE_USERS.map(function(u) {
          var lc = C.line[u.lineId] || C.primary;
          return (
            <div key={u.id} onClick={onMore}
              style={{ flexShrink:0, width:178, background:C.card,
                borderRadius:16, border:'1px solid ' + C.border,
                overflow:'hidden', cursor:'pointer' }}>
              {/* 상단 컬러 밴드 */}
              <div style={{ height:4, background:'linear-gradient(90deg,' + lc + ',' + lc + '55)' }}/>
              <div style={{ padding:'14px 14px 12px' }}>
                {/* 아바타 + 온라인 */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{ width:42, height:42, borderRadius:'50%',
                    background:lc + '25', border:'2px solid ' + lc + '55',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:22, flexShrink:0, position:'relative' }}>
                    {u.flag}
                    {u.online && (
                      <div style={{ position:'absolute', bottom:1, right:1,
                        width:10, height:10, borderRadius:'50%',
                        background:'#10B981', border:'2px solid ' + C.card }}/>
                    )}
                  </div>
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white,
                      fontFamily:FF, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {u.nick}
                    </div>
                    <div style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>
                      {u.flag} {u.country}
                    </div>
                  </div>
                </div>

                {/* 언어 배지 */}
                <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:9 }}>
                  <LangBadgeShared lang={u.native}   type="native"   />
                  <LangBadgeShared lang={u.learning} type="learning" />
                </div>

                {/* 소개글 2줄 */}
                <div style={{ fontSize:11, color:C.g[70], fontFamily:FF,
                  lineHeight:1.5, marginBottom:10,
                  display:'-webkit-box', WebkitLineClamp:2,
                  WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {u.bio}
                </div>

                {/* 역 + 레벨 */}
                <div style={{ display:'flex', alignItems:'center',
                  justifyContent:'space-between' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:3,
                    padding:'2px 7px', borderRadius:7,
                    background:lc + '15', border:'1px solid ' + lc + '30' }}>
                    <span style={{ fontSize:9 }}>{u.stationEmoji}</span>
                    <span style={{ fontSize:9, color:lc, fontWeight:600, fontFamily:FF }}>
                      {u.station}
                    </span>
                  </div>
                  <span style={{ fontSize:10, color:C.g[50], fontFamily:FF,
                    padding:'2px 6px', borderRadius:6,
                    background:C.bg, border:'1px solid ' + C.border }}>
                    {u.level}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* 더 보기 카드 */}
        <div onClick={onMore}
          style={{ flexShrink:0, width:130,
            background:C.primary + '0A', border:'1.5px dashed ' + C.primary + '40',
            borderRadius:16, display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', gap:8,
            cursor:'pointer', padding:'20px 12px' }}>
          <div style={{ width:38, height:38, borderRadius:'50%',
            background:C.primary + '20', border:'1px solid ' + C.primary + '40',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
            🌐
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:C.primary,
            fontFamily:FF, textAlign:'center', lineHeight:1.4 }}>
            전체 보기
          </div>
        </div>
      </div>

      {/* 더 보기 버튼 */}
      <div style={{ padding:'14px 16px 24px' }}>
        <button onClick={onMore}
          style={{ width:'100%', padding:'13px', borderRadius:14,
            background:'linear-gradient(135deg,' + C.primary + '20,' + C.card + ')',
            border:'1px solid ' + C.primary + '40', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <span style={{ fontSize:13, fontWeight:700, color:C.primary, fontFamily:FF }}>
            언어 교환 파트너 더 보기
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ② 언어 교환 전용 페이지 (역 필터 + 채팅 연결 + 3-step 위저드)
   ══════════════════════════════════════════════════════════ */
function LanguageExchangeScreen({ onBack, onChatStart }) {
  /* ── 필터 / 정렬 state ── */
  var [selLang,    setSelLang]    = React.useState('전체');
  var [selStation, setSelStation] = React.useState('전체');
  var [sortBy,     setSortBy]     = React.useState('recent');
  var [likedIds,   setLikedIds]   = React.useState(new Set());
  /* ── 파트너 등록 위저드 state ── */
  var [showWizard,   setShowWizard]   = React.useState(false);
  var [wizStep,      setWizStep]      = React.useState(1);   // 1 · 2 · 3 · done
  var [wNative,      setWNative]      = React.useState('');
  var [wLearn,       setWLearn]       = React.useState('');
  var [wLevel,       setWLevel]       = React.useState('');
  var [wMeetType,    setWMeetType]    = React.useState('');
  var [wStation,     setWStation]     = React.useState('');
  var [wBio,         setWBio]         = React.useState('');
  var [wTags,        setWTags]        = React.useState([]);

  var LANG_FILTERS    = ['전체','한국어','영어','일본어','중국어','프랑스어','스페인어','태국어','베트남어'];
  var STATION_FILTERS = ['전체','명동역','홍대입구역','성수역','이태원역','강남역','선릉역'];
  var SORT_TABS       = [
    { id:'recent',  label:'최신순' },
    { id:'popular', label:'인기순' },
    { id:'online',  label:'온라인' },
  ];
  var ALL_LANGS  = ['한국어','영어','일본어','중국어','프랑스어','스페인어','태국어','베트남어','독일어','이탈리아어'];
  var LEVEL_OPTS = ['초급','중급','고급','원어민'];
  var MEET_OPTS  = ['카페에서 만나요','온라인 가능','오프라인 선호','주말 가능','평일 가능','저녁 가능'];
  var TAG_OPTS   = ['K-POP 팬','드라마 팬','음식 이야기','어학 목적','문화 교류','여행 좋아요','게임 함께','비즈니스','대학생','직장인'];

  /* 필터 */
  var filtered = LANG_EXCHANGE_USERS.filter(function(u) {
    var langOk    = selLang    === '전체' || u.native === selLang    || u.learning === selLang;
    var stationOk = selStation === '전체' || u.station === selStation;
    return langOk && stationOk;
  });
  if (sortBy === 'popular') filtered = filtered.slice().sort(function(a,b){ return b.likes - a.likes; });
  else if (sortBy === 'online') filtered = filtered.slice().sort(function(a,b){ return (b.online?1:0)-(a.online?1:0); });
  else filtered = filtered.slice().sort(function(a,b){ return b.id - a.id; });

  var onlineCount = LANG_EXCHANGE_USERS.filter(function(u){ return u.online; }).length;

  function toggleLike(id) {
    setLikedIds(function(prev) {
      var next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  /* ── 대화 시작 → ChatRoom 생성 ── */
  function startChat(u) {
    if (!onChatStart) return;
    var lc = C.line[u.lineId] || C.primary;
    var mockRoom = {
      id: 9000 + u.id,
      name: u.nick + ' ' + u.flag,
      sub: '언어 교환 · ' + u.native + ' ↔ ' + u.learning,
      last: '대화를 시작해보세요! 👋',
      time: '방금',
      unread: 0,
      lineId: u.lineId,
      isGroup: false,
      online: u.online,
    };
    onChatStart(mockRoom);
  }

  /* ── 위저드 닫기 / 리셋 ── */
  function closeWizard() {
    setShowWizard(false);
    setWizStep(1);
    setWNative(''); setWLearn(''); setWLevel('');
    setWMeetType(''); setWStation(''); setWBio(''); setWTags([]);
  }

  /* ── 위저드 단계별 유효성 ── */
  var canStep1 = wNative !== '' && wLearn !== '' && wNative !== wLearn;
  var canStep2 = wLevel !== '' && wMeetType !== '' && wStation !== '';
  var canStep3 = wBio.trim().length >= 15;

  /* ── Chip 버튼 컴포넌트 ── */
  function Chip(props) {
    var label = props.label; var active = props.active;
    var onClick = props.onClick; var col = props.col || C.primary;
    return (
      <button onClick={onClick}
        style={{ flexShrink:0, padding:'7px 14px', borderRadius:20,
          border: active ? '1.5px solid ' + col : '1px solid ' + C.border,
          background: active ? col + '22' : C.bg,
          cursor:'pointer' }}>
        <span style={{ fontSize:12, fontWeight: active ? 700 : 400,
          color: active ? col : C.g[60], fontFamily:FF }}>
          {label}
        </span>
      </button>
    );
  }

  return (
    <div style={{ background:C.bg, minHeight:'100%', display:'flex', flexDirection:'column' }}>

      {/* ── 헤더 ── */}
      <div style={{ position:'sticky', top:0, zIndex:50,
        background:C.bg, borderBottom:'1px solid ' + C.border }}>
        <div style={{ display:'flex', alignItems:'center', padding:'0 4px', height:56 }}>
          <button onClick={onBack} style={{ background:'none', border:'none',
            cursor:'pointer', padding:'8px 12px', color:C.white }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.primary,
              letterSpacing:'0.12em', fontFamily:FF, textTransform:'uppercase' }}>
              LANGUAGE EXCHANGE
            </div>
            <div style={{ fontSize:16, fontWeight:900, color:C.white,
              fontFamily:FF, letterSpacing:'-0.03em', lineHeight:1.1 }}>
              언어 교환 파트너
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:5,
            margin:'0 12px', padding:'5px 10px', borderRadius:12,
            background:'#10B98118', border:'1px solid #10B98140' }}>
            <div style={{ width:7, height:7, borderRadius:'50%',
              background:'#10B981', boxShadow:'0 0 6px #10B981' }}/>
            <span style={{ fontSize:11, fontWeight:700, color:'#10B981', fontFamily:FF }}>
              {onlineCount}명 온라인
            </span>
          </div>
        </div>

        {/* ── ② 언어 필터 칩 ── */}
        <div style={{ display:'flex', gap:7, padding:'0 16px 8px',
          overflowX:'auto', scrollbarWidth:'none' }}>
          {LANG_FILTERS.map(function(lf) {
            var isAct = selLang === lf;
            return (
              <button key={lf} onClick={function(){ setSelLang(lf); }}
                style={{ flexShrink:0, padding:'5px 13px', borderRadius:20,
                  border: isAct ? '1.5px solid ' + C.primary : '1px solid ' + C.border,
                  background: isAct ? C.primary + '20' : C.card, cursor:'pointer' }}>
                <span style={{ fontSize:12, fontWeight: isAct ? 700 : 500,
                  color: isAct ? C.primary : C.g[60], fontFamily:FF }}>{lf}</span>
              </button>
            );
          })}
        </div>

        {/* ── ③ 역 필터 칩 ── */}
        <div style={{ display:'flex', gap:6, padding:'0 16px 10px',
          overflowX:'auto', scrollbarWidth:'none' }}>
          <span style={{ fontSize:10, color:C.g[50], fontFamily:FF,
            alignSelf:'center', flexShrink:0 }}>📍 근처 역</span>
          {STATION_FILTERS.map(function(sf) {
            var isAct = selStation === sf;
            var stMeta = { '명동역':'4','홍대입구역':'2','성수역':'2','이태원역':'6','강남역':'2','선릉역':'2' };
            var lc2 = C.line[stMeta[sf]] || C.g[50];
            return (
              <button key={sf} onClick={function(){ setSelStation(sf); }}
                style={{ flexShrink:0, padding:'4px 11px', borderRadius:16,
                  border: isAct ? '1.5px solid ' + lc2 : '1px solid ' + C.border,
                  background: isAct ? lc2 + '18' : C.card, cursor:'pointer' }}>
                <span style={{ fontSize:11, fontWeight: isAct ? 700 : 400,
                  color: isAct ? lc2 : C.g[60], fontFamily:FF }}>{sf}</span>
              </button>
            );
          })}
        </div>

        {/* 정렬 탭 + 카운트 */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 16px 10px' }}>
          <div style={{ display:'flex', gap:0, background:C.card,
            borderRadius:10, padding:'3px', border:'1px solid ' + C.border }}>
            {SORT_TABS.map(function(st) {
              var isAct = sortBy === st.id;
              return (
                <button key={st.id} onClick={function(){ setSortBy(st.id); }}
                  style={{ padding:'5px 12px', borderRadius:8,
                    background: isAct ? C.white : 'transparent',
                    border:'none', cursor:'pointer' }}>
                  <span style={{ fontSize:11, fontWeight: isAct ? 700 : 500,
                    color: isAct ? '#0E0F14' : C.g[60], fontFamily:FF }}>
                    {st.label}
                  </span>
                </button>
              );
            })}
          </div>
          <span style={{ fontSize:12, color:C.g[60], fontFamily:FF }}>총 {filtered.length}명</span>
        </div>
      </div>

      {/* ── 카드 목록 ── */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 16px 120px',
        scrollbarWidth:'none' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🌐</div>
            <div style={{ fontSize:16, fontWeight:700, color:C.white, fontFamily:FF, marginBottom:8 }}>
              조건에 맞는 파트너가 없어요
            </div>
            <div style={{ fontSize:13, color:C.g[60], fontFamily:FF }}>
              필터를 바꿔보세요!
            </div>
          </div>
        ) : (
          filtered.map(function(u) {
            var lc      = C.line[u.lineId] || C.primary;
            var isLiked = likedIds.has(u.id);
            return (
              <div key={u.id} style={{ background:C.card, borderRadius:18,
                border:'1px solid ' + C.border, marginBottom:12, overflow:'hidden' }}>
                <div style={{ height:4, background:'linear-gradient(90deg,' + lc + ',' + lc + '50)' }}/>
                <div style={{ padding:'16px 16px 0' }}>
                  {/* 아바타 + 정보 */}
                  <div style={{ display:'flex', gap:12, marginBottom:12 }}>
                    <div style={{ width:52, height:52, borderRadius:'50%', flexShrink:0,
                      background:lc + '25', border:'2px solid ' + lc + '50',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:26, position:'relative' }}>
                      {u.flag}
                      {u.online && (
                        <div style={{ position:'absolute', bottom:2, right:2,
                          width:13, height:13, borderRadius:'50%',
                          background:'#10B981', border:'2px solid ' + C.card }}/>
                      )}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                        <span style={{ fontSize:15, fontWeight:800, color:C.white, fontFamily:FF }}>
                          {u.nick}
                        </span>
                        {u.online ? (
                          <span style={{ fontSize:10, color:'#10B981', fontFamily:FF,
                            fontWeight:700, padding:'1px 6px', borderRadius:6,
                            background:'#10B98118', border:'1px solid #10B98130' }}>온라인</span>
                        ) : (
                          <span style={{ fontSize:10, color:C.g[50], fontFamily:FF }}>오프라인</span>
                        )}
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                        <span style={{ fontSize:12, color:C.g[70], fontFamily:FF }}>
                          {u.flag} {u.country}
                        </span>
                        <div style={{ width:1, height:10, background:C.border }}/>
                        <div style={{ display:'flex', alignItems:'center', gap:3,
                          padding:'2px 7px', borderRadius:8,
                          background:lc + '15', border:'1px solid ' + lc + '30' }}>
                          <span style={{ fontSize:10 }}>{u.stationEmoji}</span>
                          <span style={{ fontSize:10, color:lc, fontWeight:600, fontFamily:FF }}>
                            {u.station}
                          </span>
                        </div>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:5, flexWrap:'wrap' }}>
                        <LangBadgeShared lang={u.native}   type="native"   />
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                          stroke={C.g[50]} strokeWidth="2" strokeLinecap="round">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                        <LangBadgeShared lang={u.learning} type="learning" />
                        <span style={{ fontSize:10, color:C.g[50], fontFamily:FF,
                          padding:'2px 7px', borderRadius:6,
                          background:C.bg, border:'1px solid ' + C.border }}>{u.level}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:C.g[80], fontFamily:FF,
                    lineHeight:1.65, marginBottom:12 }}>{u.bio}</div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
                    {u.tags.map(function(t, ti) {
                      return (
                        <span key={ti} style={{ fontSize:11, color:C.g[70], fontFamily:FF,
                          padding:'4px 10px', borderRadius:10,
                          background:C.bg, border:'1px solid ' + C.border }}>{t}</span>
                      );
                    })}
                  </div>
                </div>
                {/* 하단 액션 바 */}
                <div style={{ display:'flex', gap:8, padding:'12px 16px 16px',
                  borderTop:'1px solid ' + C.border }}>
                  <button onClick={function(){ toggleLike(u.id); }}
                    style={{ display:'flex', alignItems:'center', gap:5,
                      padding:'9px 14px', borderRadius:10,
                      background: isLiked ? lc + '18' : 'transparent',
                      border: isLiked ? '1px solid ' + lc + '50' : '1px solid ' + C.border,
                      cursor:'pointer' }}>
                    <span style={{ fontSize:14 }}>{isLiked ? '♥' : '♡'}</span>
                    <span style={{ fontSize:12, fontWeight:600,
                      color: isLiked ? lc : C.g[60], fontFamily:FF }}>
                      {u.likes + (isLiked ? 1 : 0)}
                    </span>
                  </button>
                  {/* ③ 대화 시작 → ChatRoomScreen */}
                  <button onClick={function(){ startChat(u); }}
                    style={{ flex:1, padding:'9px', borderRadius:10,
                      background:'linear-gradient(135deg,' + lc + ',' + lc + 'cc)',
                      border:'none', cursor:'pointer',
                      display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                    <span style={{ fontSize:14 }}>💬</span>
                    <span style={{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:FF }}>
                      대화 시작
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── 플로팅 파트너 등록 버튼 ── */}
      <div style={{ position:'fixed', bottom:80, right:20, zIndex:60 }}>
        <button onClick={function(){ setShowWizard(true); setWizStep(1); }}
          style={{ width:52, height:52, borderRadius:'50%',
            background:'linear-gradient(135deg,' + C.primary + ',' + C.primary + 'cc)',
            border:'none', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 4px 20px ' + C.primary + '60', fontSize:22 }}>
          ✏️
        </button>
      </div>

      {/* ── ④ 파트너 등록 3-step 위저드 ── */}
      {showWizard && (
        <div style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.72)',
          display:'flex', alignItems:'flex-end' }}
          onClick={closeWizard}>
          <div onClick={function(e){ e.stopPropagation(); }}
            style={{ width:'100%', background:C.card,
              borderRadius:'24px 24px 0 0', padding:'0 0 40px',
              border:'1px solid ' + C.border, maxHeight:'88vh', overflowY:'auto' }}>

            {/* 핸들 + 헤더 */}
            <div style={{ padding:'16px 20px 0' }}>
              <div style={{ width:36, height:4, borderRadius:2,
                background:C.border, margin:'0 auto 18px' }}/>

              {/* 스텝 프로그레스 바 */}
              {wizStep !== 'done' && (
                <div style={{ display:'flex', gap:6, marginBottom:18 }}>
                  {[1,2,3].map(function(s) {
                    var isDone = (typeof wizStep === 'number' && wizStep > s);
                    var isAct  = wizStep === s;
                    return (
                      <div key={s} style={{ flex:1, height:4, borderRadius:2,
                        background: isDone ? C.primary : isAct ? C.primary + '70' : C.border }}>
                        {isAct && (
                          <div style={{ height:'100%', width:'60%',
                            background:C.primary, borderRadius:2 }}/>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {wizStep !== 'done' && (
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontSize:10, color:C.primary, fontFamily:FF,
                    fontWeight:700, letterSpacing:'0.1em', marginBottom:4 }}>
                    STEP {wizStep} / 3
                  </div>
                  <div style={{ fontSize:18, fontWeight:900, color:C.white,
                    fontFamily:FF, letterSpacing:'-0.03em' }}>
                    {wizStep === 1 && '어떤 언어를 교환할까요?'}
                    {wizStep === 2 && '언제, 어디서 만날까요?'}
                    {wizStep === 3 && '나를 소개해주세요 😊'}
                  </div>
                </div>
              )}
            </div>

            {/* ── STEP 1: 언어 선택 ── */}
            {wizStep === 1 && (
              <div style={{ padding:'0 20px' }}>
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.primary,
                    fontFamily:FF, marginBottom:10 }}>🗣️ 내 모국어</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {ALL_LANGS.map(function(l) {
                      return (
                        <Chip key={l} label={l} active={wNative === l}
                          col={C.primary} onClick={function(){ setWNative(l); }} />
                      );
                    })}
                  </div>
                </div>
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'#F59E0B',
                    fontFamily:FF, marginBottom:10 }}>📚 배우고 싶은 언어</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {ALL_LANGS.map(function(l) {
                      return (
                        <Chip key={l} label={l} active={wLearn === l}
                          col="#F59E0B" onClick={function(){ setWLearn(l); }} />
                      );
                    })}
                  </div>
                </div>
                {!canStep1 && wNative !== '' && wLearn !== '' && wNative === wLearn && (
                  <div style={{ fontSize:12, color:'#EF4444', fontFamily:FF, marginBottom:12 }}>
                    모국어와 배울 언어는 달라야 해요!
                  </div>
                )}
                <button onClick={function(){ if(canStep1) setWizStep(2); }}
                  style={{ width:'100%', padding:'14px', borderRadius:14,
                    background: canStep1
                      ? 'linear-gradient(135deg,' + C.primary + ',' + C.primary + 'cc)'
                      : C.border,
                    border:'none', cursor: canStep1 ? 'pointer' : 'default' }}>
                  <span style={{ fontSize:14, fontWeight:700,
                    color: canStep1 ? '#fff' : C.g[50], fontFamily:FF }}>
                    다음 →
                  </span>
                </button>
              </div>
            )}

            {/* ── STEP 2: 레벨 + 만남 방식 + 역 ── */}
            {wizStep === 2 && (
              <div style={{ padding:'0 20px' }}>
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.primary,
                    fontFamily:FF, marginBottom:10 }}>📊 언어 레벨</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {LEVEL_OPTS.map(function(l) {
                      return (
                        <Chip key={l} label={l} active={wLevel === l}
                          col={C.primary} onClick={function(){ setWLevel(l); }} />
                      );
                    })}
                  </div>
                </div>
                <div style={{ marginBottom:18 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'#10B981',
                    fontFamily:FF, marginBottom:10 }}>📅 만남 방식</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {MEET_OPTS.map(function(m) {
                      return (
                        <Chip key={m} label={m} active={wMeetType === m}
                          col="#10B981" onClick={function(){ setWMeetType(m); }} />
                      );
                    })}
                  </div>
                </div>
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'#8B5CF6',
                    fontFamily:FF, marginBottom:10 }}>📍 주로 이용하는 역</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {['명동역','홍대입구역','성수역','이태원역','강남역','선릉역','판교역','건대입구역'].map(function(st) {
                      return (
                        <Chip key={st} label={st} active={wStation === st}
                          col="#8B5CF6" onClick={function(){ setWStation(st); }} />
                      );
                    })}
                  </div>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={function(){ setWizStep(1); }}
                    style={{ padding:'14px 20px', borderRadius:14,
                      background:'transparent', border:'1px solid ' + C.border,
                      cursor:'pointer' }}>
                    <span style={{ fontSize:13, color:C.g[60], fontFamily:FF }}>← 이전</span>
                  </button>
                  <button onClick={function(){ if(canStep2) setWizStep(3); }}
                    style={{ flex:1, padding:'14px', borderRadius:14,
                      background: canStep2
                        ? 'linear-gradient(135deg,' + C.primary + ',' + C.primary + 'cc)'
                        : C.border,
                      border:'none', cursor: canStep2 ? 'pointer' : 'default' }}>
                    <span style={{ fontSize:14, fontWeight:700,
                      color: canStep2 ? '#fff' : C.g[50], fontFamily:FF }}>
                      다음 →
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: 소개글 + 태그 ── */}
            {wizStep === 3 && (
              <div style={{ padding:'0 20px' }}>
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.primary,
                    fontFamily:FF, marginBottom:10 }}>✏️ 자기소개 (15자 이상)</div>
                  <textarea
                    value={wBio}
                    onChange={function(e){ setWBio(e.target.value); }}
                    placeholder="언어 교환 파트너에게 나를 소개해주세요. 취미, 언어 학습 이유, 선호 장소 등을 써보세요!"
                    style={{ width:'100%', minHeight:100, padding:'12px',
                      borderRadius:12, background:C.bg,
                      border:'1px solid ' + (wBio.length >= 15 ? C.primary : C.border),
                      color:C.white, fontSize:13, fontFamily:FF,
                      resize:'none', outline:'none', boxSizing:'border-box' }}
                  />
                  <div style={{ fontSize:11, color: wBio.length >= 15 ? C.primary : C.g[50],
                    fontFamily:FF, textAlign:'right', marginTop:4 }}>
                    {wBio.length}자 {wBio.length < 15 ? '(' + (15 - wBio.length) + '자 더 필요)' : '✓'}
                  </div>
                </div>
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:'#F59E0B',
                    fontFamily:FF, marginBottom:10 }}>🏷️ 태그 선택 (최대 3개)</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {TAG_OPTS.map(function(t) {
                      var isAct = wTags.indexOf(t) !== -1;
                      return (
                        <Chip key={t} label={t} active={isAct} col="#F59E0B"
                          onClick={function(){
                            setWTags(function(prev) {
                              if (prev.indexOf(t) !== -1) return prev.filter(function(x){ return x !== t; });
                              if (prev.length >= 3) return prev;
                              return prev.concat([t]);
                            });
                          }} />
                      );
                    })}
                  </div>
                </div>
                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={function(){ setWizStep(2); }}
                    style={{ padding:'14px 20px', borderRadius:14,
                      background:'transparent', border:'1px solid ' + C.border,
                      cursor:'pointer' }}>
                    <span style={{ fontSize:13, color:C.g[60], fontFamily:FF }}>← 이전</span>
                  </button>
                  <button onClick={function(){ if(canStep3) setWizStep('done'); }}
                    style={{ flex:1, padding:'14px', borderRadius:14,
                      background: canStep3
                        ? 'linear-gradient(135deg,' + C.primary + ',' + C.primary + 'cc)'
                        : C.border,
                      border:'none', cursor: canStep3 ? 'pointer' : 'default' }}>
                    <span style={{ fontSize:14, fontWeight:700,
                      color: canStep3 ? '#fff' : C.g[50], fontFamily:FF }}>
                      등록 완료 🎉
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* ── 완료 화면 ── */}
            {wizStep === 'done' && (
              <div style={{ padding:'20px 20px 0', textAlign:'center' }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🌐</div>
                <div style={{ fontSize:20, fontWeight:900, color:C.white,
                  fontFamily:FF, letterSpacing:'-0.03em', marginBottom:8 }}>
                  파트너 등록 완료!
                </div>
                <div style={{ fontSize:13, color:C.g[60], fontFamily:FF,
                  lineHeight:1.6, marginBottom:24 }}>
                  <b style={{ color:C.white }}>{wNative}</b> 원어민으로 등록됐어요.<br/>
                  <b style={{ color:'#F59E0B' }}>{wLearn}</b> 파트너를 찾으면 알려드릴게요! 🎉
                </div>
                {/* 등록 정보 요약 */}
                <div style={{ background:C.bg, borderRadius:14,
                  border:'1px solid ' + C.border, padding:'14px', marginBottom:20,
                  textAlign:'left' }}>
                  {[
                    ['모국어', wNative, C.primary],
                    ['학습 언어', wLearn, '#F59E0B'],
                    ['레벨', wLevel, C.primary],
                    ['만남 방식', wMeetType, '#10B981'],
                    ['선호 역', wStation, '#8B5CF6'],
                  ].map(function(row) {
                    return (
                      <div key={row[0]} style={{ display:'flex', justifyContent:'space-between',
                        alignItems:'center', padding:'5px 0',
                        borderBottom:'1px solid ' + C.border }}>
                        <span style={{ fontSize:12, color:C.g[60], fontFamily:FF }}>{row[0]}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:row[2], fontFamily:FF }}>
                          {row[1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <button onClick={closeWizard}
                  style={{ width:'100%', padding:'14px', borderRadius:14,
                    background:'linear-gradient(135deg,' + C.primary + ',' + C.primary + 'cc)',
                    border:'none', cursor:'pointer' }}>
                  <span style={{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:FF }}>
                    파트너 찾으러 가기 →
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   아하철 크루 섹션 (홈 미리보기 + 전체 목록 화면)
   ═══════════════════════════════════════════════════════ */

/* 홈 화면 크루 미리보기 섹션 */
function CrewSection({ onMore, onCrewDetail }) {
  return (
    <div style={{ margin:'24px 0 0' }}>
      {/* 섹션 헤더 — SecHead 패턴 통일 */}
      <div style={{ padding:'0 16px', marginBottom:12 }}>
        <SecHead title="아하철 크루" action="전체 보기 ›" onAction={onMore} />
      </div>

      {/* 가로 스크롤 카드 — 슬림 카드 */}
      <div style={{ display:'flex', gap:10, overflowX:'auto', padding:'0 16px 4px', scrollbarWidth:'none' }}>
        {CREW_LIST.map(function(crew) {
          var lc = C.line[crew.lineId] || C.primary;
          return (
            <div key={crew.id}
              onClick={function() { onCrewDetail && onCrewDetail(crew); }}
              style={{ flexShrink:0, width:156, background:C.card,
                border:'1px solid '+C.border, borderRadius:12,
                borderLeft:'3px solid '+lc, padding:'12px 12px 10px',
                cursor:'pointer' }}>

              {/* 이모지 + 이름 */}
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
                <span style={{ fontSize:20, lineHeight:1 }}>{crew.emoji}</span>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:12, fontFamily:FF, fontWeight:800, color:C.white,
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {crew.name}
                  </div>
                  <div style={{ fontSize:10, fontFamily:FF, color:C.g[600], marginTop:1 }}>
                    {crew.station}
                  </div>
                </div>
              </div>

              {/* 카테고리 칩 */}
              <div style={{ display:'inline-block', background:lc+'1A', borderRadius:5,
                padding:'2px 7px', fontSize:10, fontFamily:FF, fontWeight:700, color:lc, marginBottom:7 }}>
                {crew.category}
              </div>

              {/* 멤버 수 + 가입 상태 */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:10, fontFamily:FF, color:C.g[500] }}>
                  멤버 {crew.members}
                </span>
                <span style={{ fontSize:9, fontFamily:FF, fontWeight:700,
                  color: crew.openToJoin ? '#34D399' : C.g[600] }}>
                  {crew.openToJoin ? '가입 가능' : '승인 필요'}
                </span>
              </div>
            </div>
          );
        })}

        {/* 더보기 카드 */}
        <div onClick={onMore}
          style={{ flexShrink:0, width:80, background:'transparent',
            border:'1px dashed '+C.border, borderRadius:12,
            display:'flex', flexDirection:'column', alignItems:'center',
            justifyContent:'center', gap:6, cursor:'pointer', padding:'12px 8px' }}>
          <span style={{ fontSize:18, color:C.g[500] }}>›</span>
          <span style={{ fontSize:10, fontFamily:FF, color:C.g[500],
            textAlign:'center', lineHeight:1.3 }}>전체<br/>보기</span>
        </div>
      </div>
    </div>
  );
}

/* 크루 전체 목록 화면 */
function CrewListScreen({ onBack, onCrewDetail }) {
  var [selCat,     setSelCat]     = React.useState('전체');
  var [selLine,    setSelLine]    = React.useState('전체');
  var [selStation, setSelStation] = React.useState('전체');

  /* ── 크루 만들기 위저드 상태 ── */
  var [showCreate,  setShowCreate]  = React.useState(false);
  var [cStep,       setCStep]       = React.useState(1); // 1|2|3|'done'
  var [cName,       setCName]       = React.useState('');
  var [cEmoji,      setCEmoji]      = React.useState('');
  var [cCat,        setCCat]        = React.useState('');
  var [cLine,       setCLine]       = React.useState('');
  var [cStation,    setCStation]    = React.useState('');
  var [cDesc,       setCDesc]       = React.useState('');
  var [cTags,       setCTags]       = React.useState([]);
  var [cOpenJoin,   setCOpenJoin]   = React.useState(null);
  var [cRules,      setCRules]      = React.useState([]);

  var EMOJI_OPTS   = ['🚇','💚','💙','💜','⭐','🎯','🌙','🎨','💎','🔄','🏃','☕','🌆','🎵'];
  var CTAG_OPTS    = ['출퇴근','혼잡도','빠른하차','꿀팁','맛집','카페','문화','버스킹','팝업','심야','막차','안전','환승','광역철도'];
  var RULE_OPTS    = ['비방·욕설 금지','크루 활동 정보 공유','오프라인 모임 참여 권장','가입 후 첫 게시글 작성','월 1회 이상 활동','크루 내 홍보 금지'];
  var C_LINE_LIST  = ['1호선','2호선','신분당선','9호선','3호선','4호선','5호선','6호선','7호선','8호선'];
  var C_LINE_ID    = {'1호선':'1','2호선':'2','신분당선':'sin','9호선':'9','3호선':'3','4호선':'4','5호선':'5','6호선':'6','7호선':'7','8호선':'8'};
  var C_STATION_MAP = {
    '1호선':['서울역','청량리역','신도림역','수원역','인천역'],
    '2호선':['강남역','홍대입구역','성수역','선릉역','왕십리역','잠실역'],
    '신분당선':['판교역','강남역','정자역','미금역'],
    '9호선':['신논현역','여의도역','김포공항역','노량진역'],
    '3호선':['교대역','충무로역','종로3가역'],
    '4호선':['명동역','혜화역','이촌역'],
    '5호선':['여의도역','강동역','광화문역'],
    '6호선':['이태원역','합정역'],
    '7호선':['건대입구역','노원역'],
    '8호선':['잠실역','모란역'],
  };

  function toggleCTag(t) {
    setCTags(function(prev) {
      if (prev.includes(t)) return prev.filter(function(x) { return x !== t; });
      if (prev.length >= 4) return prev;
      return [...prev, t];
    });
  }
  function toggleCRule(r) {
    setCRules(function(prev) {
      if (prev.includes(r)) return prev.filter(function(x) { return x !== r; });
      if (prev.length >= 3) return prev;
      return [...prev, r];
    });
  }
  function openCreate() { setShowCreate(true); setCStep(1); setCName(''); setCEmoji(''); setCCat(''); setCLine(''); setCStation(''); setCDesc(''); setCTags([]); setCOpenJoin(null); setCRules([]); }
  function closeCreate() { setShowCreate(false); }

  var cLineId = C_LINE_ID[cLine] || '';
  var cLineColor = cLineId ? (C.line[cLineId] || C.primary) : C.primary;
  var cStationList = C_STATION_MAP[cLine] || [];

  var canCStep1 = cName.trim().length >= 2 && cEmoji !== '' && cCat !== '';
  var canCStep2 = cLine !== '' && cStation !== '' && cDesc.trim().length >= 20 && cTags.length >= 1;
  var canCStep3 = cOpenJoin !== null;

  var CAT_FILTERS  = ['전체','출퇴근','직장인','문화','심야','환승'];
  var LINE_FILTERS = ['전체','1호선','2호선','신분당선','9호선'];
  var LINE_ID_MAP  = { '1호선':'1', '2호선':'2', '신분당선':'sin', '9호선':'9' };
  var STATION_MAP  = {
    '1호선':   ['서울역','청량리역','신도림역'],
    '2호선':   ['강남역','홍대입구역','성수역','선릉역','왕십리역'],
    '신분당선': ['판교역','강남역','정자역'],
    '9호선':   ['신논현역','여의도역','김포공항역'],
  };

  var stationList = selLine === '전체' ? [] : (STATION_MAP[selLine] || []);

  var filtered = CREW_LIST.filter(function(c) {
    var catOk  = selCat     === '전체' || c.category === selCat;
    var lineOk = selLine    === '전체' || c.lineId   === LINE_ID_MAP[selLine];
    var stOk   = selStation === '전체' || c.station  === selStation;
    return catOk && lineOk && stOk;
  });

  var totalMembers = filtered.reduce(function(sum, c) { return sum + c.members; }, 0);

  function chipStyle(active, accent) {
    var col = accent || C.primary;
    return {
      flexShrink:0, padding:'6px 14px', borderRadius:20,
      background: active ? col : C.card,
      border: '1px solid ' + (active ? col : C.border),
      fontSize:12, fontFamily:FF, fontWeight:700,
      color: active ? '#000' : C.g[400],
      cursor:'pointer', whiteSpace:'nowrap',
    };
  }
  function wizChip(active, accent) {
    var col = accent || C.primary;
    return {
      padding:'7px 14px', borderRadius:20, cursor:'pointer',
      background: active ? col+'22' : C.bg,
      border: '1px solid ' + (active ? col : C.border),
      fontSize:12, fontFamily:FF, fontWeight:700,
      color: active ? col : C.g[400],
      whiteSpace:'nowrap',
    };
  }

  return (
    <div style={{ background:C.bg, minHeight:'100vh', display:'flex', flexDirection:'column', fontFamily:FF }}>
      {/* 헤더 */}
      <div style={{ background:C.card, borderBottom:'1px solid '+C.border, padding:'14px 16px', display:'flex', alignItems:'center', gap:12, position:'sticky', top:0, zIndex:20 }}>
        <div onClick={onBack} style={{ width:32, height:32, borderRadius:8, background:C.bg, border:'1px solid '+C.border, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:16, color:C.white }}>←</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, fontFamily:FF, fontWeight:800, color:C.white }}>아하철 크루</div>
          <div style={{ fontSize:11, fontFamily:FF, color:C.g[500], marginTop:1 }}>지하철 기반 커뮤니티 크루</div>
        </div>
        <div onClick={openCreate}
          style={{ background:C.primary, borderRadius:20, padding:'6px 14px',
            fontSize:12, fontFamily:FF, fontWeight:800, color:'#000', cursor:'pointer',
            display:'flex', alignItems:'center', gap:4 }}>
          <span style={{ fontSize:14 }}>✚</span> 크루 만들기
        </div>
      </div>

      {/* 필터 영역 */}
      <div style={{ background:C.card, borderBottom:'1px solid '+C.border, padding:'12px 0 10px' }}>
        {/* 카테고리 필터 */}
        <div style={{ marginBottom:10 }}>
          <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:C.g[500], padding:'0 16px', marginBottom:6, letterSpacing:'0.08em' }}>카테고리</div>
          <div style={{ display:'flex', gap:8, overflowX:'auto', padding:'0 16px', scrollbarWidth:'none' }}>
            {CAT_FILTERS.map(function(cat) {
              return (
                <div key={cat} style={chipStyle(selCat===cat)}
                  onClick={function() { setSelCat(cat); setSelStation('전체'); }}>
                  {cat}
                </div>
              );
            })}
          </div>
        </div>
        {/* 호선 필터 */}
        <div style={{ marginBottom: stationList.length > 0 ? 10 : 0 }}>
          <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:C.g[500], padding:'0 16px', marginBottom:6, letterSpacing:'0.08em' }}>호선</div>
          <div style={{ display:'flex', gap:8, overflowX:'auto', padding:'0 16px', scrollbarWidth:'none' }}>
            {LINE_FILTERS.map(function(ln) {
              var lnId = LINE_ID_MAP[ln];
              var lc   = lnId ? (C.line[lnId] || C.primary) : C.primary;
              return (
                <div key={ln}
                  onClick={function() { setSelLine(ln); setSelStation('전체'); }}
                  style={chipStyle(selLine===ln, lc)}>
                  {ln}
                </div>
              );
            })}
          </div>
        </div>
        {/* 역 필터 (호선 선택 시에만) */}
        {stationList.length > 0 && (
          <div>
            <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:C.g[500], padding:'0 16px', marginBottom:6, letterSpacing:'0.08em' }}>역</div>
            <div style={{ display:'flex', gap:8, overflowX:'auto', padding:'0 16px', scrollbarWidth:'none' }}>
              <div style={chipStyle(selStation==='전체')} onClick={function() { setSelStation('전체'); }}>전체</div>
              {stationList.map(function(st) {
                return <div key={st} style={chipStyle(selStation===st)} onClick={function() { setSelStation(st); }}>{st}</div>;
              })}
            </div>
          </div>
        )}
      </div>

      {/* 결과 요약 */}
      <div style={{ padding:'10px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ fontSize:12, fontFamily:FF, color:C.g[500] }}>
          크루 <span style={{ color:C.white, fontWeight:700 }}>{filtered.length}개</span>
          <span style={{ margin:'0 6px', color:C.border }}>·</span>
          총 <span style={{ color:C.primary, fontWeight:700 }}>{totalMembers}명</span> 활동 중
        </div>
      </div>

      {/* 크루 카드 목록 */}
      <div style={{ flex:1, overflowY:'auto', padding:'0 16px 80px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 0' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:14, fontFamily:FF, fontWeight:700, color:C.g[500] }}>해당 조건의 크루가 없어요</div>
            <div style={{ fontSize:12, fontFamily:FF, color:C.g[600], marginTop:6 }}>다른 필터를 선택해 보세요</div>
          </div>
        ) : filtered.map(function(crew) {
          var lc = C.line[crew.lineId] || C.primary;
          return (
            <div key={crew.id}
              onClick={function() { onCrewDetail && onCrewDetail(crew); }}
              style={{ background:C.card, border:'1px solid '+C.border, borderRadius:16, overflow:'hidden', marginBottom:12, cursor:'pointer' }}>
              <div style={{ height:5, background:'linear-gradient(90deg,'+lc+','+lc+'66)' }} />
              <div style={{ padding:'14px 16px' }}>
                {/* 이모지 + 이름 + 뱃지 */}
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:lc+'22', border:'1px solid '+lc+'44', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                    {crew.emoji}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:15, fontFamily:FF, fontWeight:800, color:C.white, marginBottom:4 }}>{crew.name}</div>
                    <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                      <div style={{ background:lc+'22', border:'1px solid '+lc+'44', borderRadius:20, padding:'2px 8px', fontSize:10, fontFamily:FF, fontWeight:700, color:lc }}>{crew.category}</div>
                      <div style={{ background:C.bg, border:'1px solid '+C.border, borderRadius:20, padding:'2px 8px', fontSize:10, fontFamily:FF, color:C.g[500] }}>{crew.station}</div>
                      {crew.openToJoin
                        ? <div style={{ background:'#34D39922', border:'1px solid #34D39944', borderRadius:20, padding:'2px 8px', fontSize:10, fontFamily:FF, fontWeight:700, color:'#34D399' }}>가입 가능</div>
                        : <div style={{ background:'#EF444422', border:'1px solid #EF444444', borderRadius:20, padding:'2px 8px', fontSize:10, fontFamily:FF, fontWeight:700, color:'#EF4444' }}>승인 필요</div>
                      }
                    </div>
                  </div>
                </div>
                {/* 설명 */}
                <div style={{ fontSize:12, fontFamily:FF, color:C.g[500], lineHeight:1.6, marginBottom:12, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {crew.desc}
                </div>
                {/* 태그 */}
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:12 }}>
                  {crew.tags.map(function(tag) {
                    return <div key={tag} style={{ background:C.bg, border:'1px solid '+C.border, borderRadius:6, padding:'3px 8px', fontSize:10, fontFamily:FF, color:C.g[500] }}>#{tag}</div>;
                  })}
                </div>
                {/* 통계 */}
                <div style={{ display:'flex', gap:16, borderTop:'1px solid '+C.border, paddingTop:10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ fontSize:13 }}>👥</span>
                    <div>
                      <div style={{ fontSize:13, fontFamily:FF, fontWeight:800, color:C.white }}>{crew.members}명</div>
                      <div style={{ fontSize:9, fontFamily:FF, color:C.g[600] }}>멤버</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ fontSize:13 }}>📝</span>
                    <div>
                      <div style={{ fontSize:13, fontFamily:FF, fontWeight:800, color:C.white }}>{crew.posts}개</div>
                      <div style={{ fontSize:9, fontFamily:FF, color:C.g[600] }}>게시글</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ fontSize:13 }}>📅</span>
                    <div>
                      <div style={{ fontSize:13, fontFamily:FF, fontWeight:800, color:C.white }}>{crew.since}</div>
                      <div style={{ fontSize:9, fontFamily:FF, color:C.g[600] }}>개설</div>
                    </div>
                  </div>
                  {crew.milestones && crew.milestones.length > 0 && (
                    <div style={{ marginLeft:'auto', display:'flex', alignItems:'center' }}>
                      <div style={{ background:C.primary+'22', border:'1px solid '+C.primary+'44', borderRadius:8, padding:'3px 8px', fontSize:10, fontFamily:FF, color:C.primary }}>
                        🏆 {crew.milestones.length}개 달성
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 크루 만들기 FAB ── */}
      {!showCreate && (
        <div onClick={openCreate}
          style={{ position:'fixed', bottom:88, right:20, zIndex:30,
            background:C.primary, borderRadius:28, padding:'12px 20px',
            display:'flex', alignItems:'center', gap:8, cursor:'pointer',
            boxShadow:'0 4px 20px rgba(0,186,246,0.35)', fontFamily:FF }}>
          <span style={{ fontSize:18 }}>✚</span>
          <span style={{ fontSize:13, fontWeight:800, color:'#000' }}>크루 만들기</span>
        </div>
      )}

      {/* ── 크루 만들기 위저드 모달 ── */}
      {showCreate && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.75)', zIndex:50,
          display:'flex', alignItems:'flex-end' }}
          onClick={function(e) { if (e.target === e.currentTarget) closeCreate(); }}>
          <div style={{ width:'100%', background:C.card, borderRadius:'20px 20px 0 0',
            maxHeight:'90vh', display:'flex', flexDirection:'column',
            paddingBottom:'calc(16px + env(safe-area-inset-bottom,16px))' }}>

            {/* 위저드 헤더 */}
            <div style={{ padding:'16px 20px 12px', borderBottom:'1px solid '+C.border,
              display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
              <div>
                <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:C.primary,
                  letterSpacing:'0.1em', marginBottom:2 }}>CREATE CREW</div>
                <div style={{ fontSize:16, fontFamily:FF, fontWeight:800, color:C.white }}>
                  {cStep === 'done' ? '크루 개설 완료!' :
                   cStep === 1 ? '크루 만들기 · 1단계' :
                   cStep === 2 ? '크루 만들기 · 2단계' : '크루 만들기 · 3단계'}
                </div>
              </div>
              <div onClick={closeCreate}
                style={{ width:32, height:32, borderRadius:8, background:C.bg,
                  border:'1px solid '+C.border, display:'flex', alignItems:'center',
                  justifyContent:'center', cursor:'pointer', fontSize:16, color:C.g[400] }}>✕</div>
            </div>

            {/* 진행 바 */}
            {cStep !== 'done' && (
              <div style={{ height:3, background:C.border, flexShrink:0 }}>
                <div style={{ height:3, background:cLineId ? cLineColor : C.primary,
                  width: cStep === 1 ? '33%' : cStep === 2 ? '66%' : '100%',
                  transition:'width 0.3s' }} />
              </div>
            )}

            {/* 바디 */}
            <div style={{ flex:1, overflowY:'auto', padding:'20px' }}>

              {/* ── STEP 1: 크루명 + 이모지 + 카테고리 ── */}
              {cStep === 1 && (
                <div>
                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:6 }}>
                    크루 이름 <span style={{ fontSize:10, color:C.g[500], fontWeight:400 }}>2~20자</span>
                  </div>
                  <input
                    value={cName}
                    onChange={function(e) { if (e.target.value.length <= 20) setCName(e.target.value); }}
                    placeholder="예) 강남 2호선 출퇴근 크루"
                    style={{ width:'100%', background:C.bg, border:'1px solid '+C.border, borderRadius:12,
                      padding:'12px 14px', fontSize:13, fontFamily:FF, color:C.white,
                      outline:'none', boxSizing:'border-box', marginBottom:4 }}
                  />
                  <div style={{ textAlign:'right', fontSize:10, fontFamily:FF,
                    color: cName.length >= 2 ? '#34D399' : C.g[500], marginBottom:16 }}>
                    {cName.length}/20자
                  </div>

                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:8 }}>
                    크루 이모지 선택
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
                    {EMOJI_OPTS.map(function(em) {
                      var act = cEmoji === em;
                      return (
                        <div key={em} onClick={function() { setCEmoji(em); }}
                          style={{ width:44, height:44, borderRadius:12, cursor:'pointer',
                            background: act ? C.primary+'22' : C.bg,
                            border: '2px solid ' + (act ? C.primary : C.border),
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:22, transition:'all 0.15s' }}>
                          {em}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:8 }}>
                    카테고리
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {['출퇴근','직장인','문화','심야','환승','취미','운동','스터디'].map(function(cat) {
                      return (
                        <div key={cat} style={wizChip(cCat===cat)}
                          onClick={function() { setCCat(cat); }}>
                          {cCat === cat ? '✓ ' : ''}{cat}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 2: 호선 + 역 + 설명 + 태그 ── */}
              {cStep === 2 && (
                <div>
                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:8 }}>
                    주요 활동 호선
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
                    {C_LINE_LIST.map(function(ln) {
                      var lnId = C_LINE_ID[ln];
                      var lc   = C.line[lnId] || C.primary;
                      return (
                        <div key={ln} style={wizChip(cLine===ln, lc)}
                          onClick={function() { setCLine(ln); setCStation(''); }}>
                          {cLine === ln ? '✓ ' : ''}{ln}
                        </div>
                      );
                    })}
                  </div>

                  {cLine !== '' && (
                    <div>
                      <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:8 }}>
                        주요 활동 역
                      </div>
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
                        {cStationList.map(function(st) {
                          return (
                            <div key={st} style={wizChip(cStation===st, cLineColor)}
                              onClick={function() { setCStation(st); }}>
                              {cStation === st ? '✓ ' : ''}{st}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:6 }}>
                    크루 소개 <span style={{ fontSize:10, color:C.g[500], fontWeight:400 }}>최소 20자</span>
                  </div>
                  <textarea
                    value={cDesc}
                    onChange={function(e) { setCDesc(e.target.value); }}
                    placeholder="이 크루는 어떤 크루인지, 어떤 활동을 하는지 알려주세요!"
                    style={{ width:'100%', minHeight:90, background:C.bg, border:'1px solid '+C.border,
                      borderRadius:12, padding:'12px 14px', fontSize:12, fontFamily:FF, color:C.white,
                      resize:'none', outline:'none', boxSizing:'border-box', lineHeight:1.6, marginBottom:4 }}
                  />
                  <div style={{ textAlign:'right', fontSize:10, fontFamily:FF,
                    color: cDesc.length >= 20 ? '#34D399' : C.g[500], marginBottom:16 }}>
                    {cDesc.length}자 {cDesc.length >= 20 ? '✓' : '(최소 20자)'}
                  </div>

                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:4 }}>
                    태그 선택 <span style={{ fontSize:10, color:C.g[500], fontWeight:400 }}>최대 4개</span>
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {CTAG_OPTS.map(function(tag) {
                      var act = cTags.includes(tag);
                      return (
                        <div key={tag} style={wizChip(act)}
                          onClick={function() { toggleCTag(tag); }}>
                          #{act ? '✓ ' : ''}{tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── STEP 3: 가입방식 + 규칙 ── */}
              {cStep === 3 && (
                <div>
                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:8 }}>
                    가입 방식
                  </div>
                  <div style={{ display:'flex', gap:12, marginBottom:24 }}>
                    {[
                      { val:true,  icon:'🔓', title:'자유 가입', desc:'누구나 바로 가입 가능' },
                      { val:false, icon:'🔒', title:'승인 필요', desc:'크루장 심사 후 가입' },
                    ].map(function(opt) {
                      var act = cOpenJoin === opt.val;
                      return (
                        <div key={opt.title} onClick={function() { setCOpenJoin(opt.val); }}
                          style={{ flex:1, background: act ? C.primary+'18' : C.bg,
                            border: '2px solid ' + (act ? C.primary : C.border),
                            borderRadius:14, padding:'16px 12px', textAlign:'center', cursor:'pointer',
                            transition:'all 0.2s' }}>
                          <div style={{ fontSize:28, marginBottom:6 }}>{opt.icon}</div>
                          <div style={{ fontSize:13, fontFamily:FF, fontWeight:800,
                            color: act ? C.primary : C.white, marginBottom:3 }}>{opt.title}</div>
                          <div style={{ fontSize:10, fontFamily:FF, color:C.g[500] }}>{opt.desc}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:4 }}>
                    크루 규칙 <span style={{ fontSize:10, color:C.g[500], fontWeight:400 }}>최대 3개 선택</span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {RULE_OPTS.map(function(rule) {
                      var act = cRules.includes(rule);
                      return (
                        <div key={rule} onClick={function() { toggleCRule(rule); }}
                          style={{ display:'flex', alignItems:'center', gap:12,
                            background: act ? C.primary+'14' : C.bg,
                            border: '1px solid ' + (act ? C.primary : C.border),
                            borderRadius:12, padding:'11px 14px', cursor:'pointer' }}>
                          <div style={{ width:20, height:20, borderRadius:6,
                            background: act ? C.primary : C.card,
                            border: '1.5px solid ' + (act ? C.primary : C.border),
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:11, color:'#000', flexShrink:0 }}>
                            {act ? '✓' : ''}
                          </div>
                          <span style={{ fontSize:12, fontFamily:FF, fontWeight:700,
                            color: act ? C.primary : C.g[400] }}>{rule}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── DONE ── */}
              {cStep === 'done' && (
                <div style={{ textAlign:'center', padding:'16px 0 20px' }}>
                  <div style={{ fontSize:56, marginBottom:14 }}>🎊</div>
                  <div style={{ fontSize:18, fontFamily:FF, fontWeight:800, color:C.white, marginBottom:8 }}>
                    크루가 개설됐어요!
                  </div>
                  <div style={{ fontSize:13, fontFamily:FF, color:C.g[400], lineHeight:1.6, marginBottom:24 }}>
                    <strong style={{ color:cLineColor }}>{cEmoji} {cName}</strong> 크루가 생성됐습니다.<br/>
                    멤버를 모집해보세요 🚇
                  </div>
                  <div style={{ background:C.bg, border:'1px solid '+C.border, borderRadius:14,
                    padding:'16px', textAlign:'left', marginBottom:20 }}>
                    <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:C.g[500],
                      letterSpacing:'0.08em', marginBottom:10 }}>크루 정보</div>
                    {[
                      { label:'크루명',   value: cEmoji + ' ' + cName },
                      { label:'카테고리', value: cCat },
                      { label:'활동 구간', value: cLine + ' ' + cStation },
                      { label:'가입 방식', value: cOpenJoin ? '자유 가입 🔓' : '승인 필요 🔒' },
                      { label:'태그',     value: cTags.map(function(t) { return '#'+t; }).join(' ') },
                    ].map(function(row) {
                      return (
                        <div key={row.label} style={{ display:'flex', gap:8, marginBottom:6 }}>
                          <span style={{ fontSize:11, fontFamily:FF, color:C.g[500], width:64, flexShrink:0 }}>{row.label}</span>
                          <span style={{ fontSize:11, fontFamily:FF, color:C.white, flex:1 }}>{row.value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div onClick={closeCreate}
                    style={{ background:cLineId ? cLineColor : C.primary, borderRadius:12,
                      padding:'13px 0', fontSize:14, fontFamily:FF, fontWeight:800,
                      color:'#000', cursor:'pointer', textAlign:'center' }}>
                    크루 홈으로 가기 →
                  </div>
                </div>
              )}
            </div>

            {/* 하단 버튼 */}
            {cStep !== 'done' && (
              <div style={{ padding:'14px 20px 0', flexShrink:0,
                borderTop:'1px solid '+C.border, display:'flex', gap:10 }}>
                {(cStep === 2 || cStep === 3) && (
                  <div onClick={function() { setCStep(function(s) { return s - 1; }); }}
                    style={{ flex:1, padding:'13px 0', borderRadius:12,
                      background:C.bg, border:'1px solid '+C.border,
                      fontSize:14, fontFamily:FF, fontWeight:700, color:C.g[400],
                      cursor:'pointer', textAlign:'center' }}>
                    이전
                  </div>
                )}
                <div
                  onClick={function() {
                    if (cStep === 1 && canCStep1) setCStep(2);
                    else if (cStep === 2 && canCStep2) setCStep(3);
                    else if (cStep === 3 && canCStep3) setCStep('done');
                  }}
                  style={{
                    flex: (cStep === 2 || cStep === 3) ? 2 : 1,
                    padding:'13px 0', borderRadius:12,
                    background: (cStep===1 ? canCStep1 : cStep===2 ? canCStep2 : canCStep3)
                      ? (cLineId ? cLineColor : C.primary) : C.g[700],
                    fontSize:14, fontFamily:FF, fontWeight:800,
                    color: (cStep===1 ? canCStep1 : cStep===2 ? canCStep2 : canCStep3) ? '#000' : C.g[500],
                    cursor: (cStep===1 ? canCStep1 : cStep===2 ? canCStep2 : canCStep3) ? 'pointer' : 'default',
                    textAlign:'center', transition:'all 0.2s',
                  }}>
                  {cStep === 3 ? '크루 개설하기 🎊' : '다음 →'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   홈 화면 (원본 순서 그대로 + 무신사 디자인)
   ═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   공지 탭 — 공지사항 목록
   ═══════════════════════════════════════════════════════ */

const NOTICES = [
  {
    id: 1,
    tag: '긴급',
    pinned: true,
    lineId: '2',
    title: '[긴급] 2호선 강남~홍대입구 구간 신호장애로 현재 운행 지연 중 (약 15분)',
    date: '2026-03-08',
    category: '운행장애',
    preview: '2호선 강남역~홍대입구역 구간에서 신호장애가 발생하여 현재 열차 운행이 약 15분 지연되고 있습니다. 복구 작업이 진행 중이며, 정상 운행 재개 시 즉시 공지할 예정입니다.',
  },
  {
    id: 2,
    tag: '공지',
    pinned: true,
    lineId: null,
    title: 'BTS 광화문 공연 관련 열차 무정차 통과 및 증회 안내 (3/21)',
    date: '2026-03-06',
    category: '특별운행',
    preview: '안녕하세요. 도플소프트입니다. 오는 3월 21일(토) BTS 광화문 공연으로 인해 주변 역사에 대규모 인파가 예상됩니다. 서울교통공사에서 안전하고 원활한 이용을 위해 열차 증회 및 일부 역 무정차 통과를 시행할 예정입니다.',
  },
  {
    id: 3,
    tag: '공지',
    pinned: true,
    lineId: '1',
    title: '📌 특정장애인단체 시위로 인한 열차지연 및 무정차 통과 안내 (3/3)',
    date: '2026-03-03',
    category: '운행지연',
    preview: '안녕하세요. 도플소프트입니다. 2026년 3월 3일(화) 14시부터 1호선에서 「특정장애인단체」의 시위가 예정되어 있습니다. 이로 인해 시위가 발생한 역에서 일부 열차가 무정차 통과할 수 있습니다.',
  },
  {
    id: 4,
    tag: '안내',
    pinned: false,
    lineId: '9',
    title: '9호선 급행 정차역 임시 변경 안내 (3/1 ~ 3/31)',
    date: '2026-03-01',
    category: '운행변경',
    preview: '9호선 급행 열차 운행 노선 조정으로 인해 3월 한 달간 일부 급행 정차역이 임시 변경됩니다. 변경되는 역: 염창역, 등촌역. 자세한 시간표는 서울교통공사 공식 앱에서 확인하세요.',
  },
  {
    id: 5,
    tag: '안내',
    pinned: false,
    lineId: '2',
    title: '2호선 성수~왕십리 구간 선로 보수 작업으로 인한 단축운행 안내',
    date: '2026-02-27',
    category: '시설공사',
    preview: '2호선 성수~왕십리 구간 선로 정기 보수 작업을 2월 27일(금) 심야부터 실시합니다. 작업 시간 동안 해당 구간 열차 운행이 단축되오니 이용에 참고해 주시기 바랍니다.',
  },
  {
    id: 6,
    tag: '긴급',
    pinned: false,
    lineId: '5',
    title: '[긴급] 5호선 여의도역 에스컬레이터 고장으로 이용 불가',
    date: '2026-02-25',
    category: '시설장애',
    preview: '5호선 여의도역 2번 출구 방면 에스컬레이터가 갑작스러운 고장으로 현재 이용이 불가합니다. 수리 업체가 출동하였으며, 복구까지 약 2~3시간 소요 예정입니다. 해당 구간 계단 이용 바랍니다.',
  },
  {
    id: 7,
    tag: '공지',
    pinned: false,
    lineId: null,
    title: '2026년 3월 서울 지하철 요금 정기권 개편 안내',
    date: '2026-02-20',
    category: '요금안내',
    preview: '2026년 3월 1일부터 서울 지하철 정기권 요금 체계가 개편됩니다. 기존 44회 정기권이 60일 무제한권으로 변경되며, 가격은 기존 대비 약 10% 인상됩니다. 자세한 내용은 공지사항 본문을 확인해 주세요.',
  },
  {
    id: 8,
    tag: '안내',
    pinned: false,
    lineId: '4',
    title: '4호선 이촌역 승강장 안전문(PSD) 교체 공사 일정 안내',
    date: '2026-02-18',
    category: '시설공사',
    preview: '4호선 이촌역 승강장 안전문(PSD) 노후 교체 공사를 2월 18일(수)부터 약 2주간 진행합니다. 공사 기간 중 이촌역에서는 일부 열차 출입문 위치가 변경될 수 있으니 주의하여 이용해 주시기 바랍니다.',
  },
];

/* 태그별 스타일 */
const NOTICE_TAG_STYLE = {
  긴급: { bg:'#C0392B',          color:'#fff'    },
  공지: { bg:`${C.primary}22`,   color:C.primary },
  안내: { bg:'rgba(255,255,255,0.1)', color:C.g[50] },
};

function NoticeTab() {
  const [expanded, setExpanded] = useState(null); // 펼쳐진 공지 id

  return (
    <div style={{ paddingBottom:24 }}>

      {/* 헤더 */}
      <div style={{ padding:'20px 16px 14px', borderBottom:`1px solid ${C.border}` }}>
        <div style={{ fontSize:18, fontWeight:900, color:C.white,
          fontFamily:FF, letterSpacing:'-0.03em', marginBottom:4 }}>
          공지사항
        </div>
        <div style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
          서울 지하철 운행정보 · 시설 · 요금 관련 공지
        </div>
      </div>

      {/* 공지 목록 */}
      <div style={{ display:'flex', flexDirection:'column' }}>
        {NOTICES.map((n, idx) => {
          const isOpen    = expanded === n.id;
          const tagStyle  = NOTICE_TAG_STYLE[n.tag] ?? NOTICE_TAG_STYLE['안내'];
          const lineColor = n.lineId ? (C.line[n.lineId] ?? C.primary) : C.g[70];
          const isUrgent  = n.tag === '긴급';

          return (
            <div key={n.id}
              onClick={() => setExpanded(isOpen ? null : n.id)}
              style={{
                padding:'16px 16px',
                borderBottom:`1px solid ${C.border}`,
                background: isUrgent
                  ? (isOpen ? 'rgba(192,57,43,0.10)' : 'rgba(192,57,43,0.06)')
                  : (isOpen ? 'rgba(255,255,255,0.04)' : 'transparent'),
                cursor:'pointer',
                transition:'background 0.15s',
              }}>

              {/* 상단 행: 태그 + 날짜 */}
              <div style={{ display:'flex', alignItems:'center',
                justifyContent:'space-between', marginBottom:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  {/* 태그 뱃지 */}
                  <span style={{ fontSize:10, fontWeight:800, fontFamily:FF,
                    color: tagStyle.color, background: tagStyle.bg,
                    padding:'2px 7px', borderRadius:4 }}>
                    {n.tag}
                  </span>
                  {/* 호선 뱃지 */}
                  {n.lineId && (
                    <span style={{ fontSize:10, fontWeight:700, fontFamily:FF,
                      color: lineColor, background:`${lineColor}18`,
                      padding:'2px 7px', borderRadius:4 }}>
                      {SUBWAY_LINES_DATA.find(l => l.id === n.lineId)?.name ?? `${n.lineId}호선`}
                    </span>
                  )}
                  {/* 카테고리 */}
                  <span style={{ fontSize:10, color:C.g[80], fontFamily:FF }}>
                    {n.category}
                  </span>
                </div>
                <span style={{ fontSize:10, color:C.g[80], fontFamily:FF, flexShrink:0 }}>
                  {n.date}
                </span>
              </div>

              {/* 제목 */}
              <div style={{ fontSize:13, fontWeight: isUrgent ? 800 : 700,
                color: isUrgent ? '#FF6B6B' : C.white,
                fontFamily:FF, lineHeight:1.45, marginBottom: isOpen ? 12 : 0 }}>
                {n.title}
              </div>

              {/* 펼침 내용 */}
              {isOpen && (
                <div style={{ fontSize:12, color:C.g[50], fontFamily:FF,
                  lineHeight:1.7, paddingTop:4,
                  borderTop:`1px solid ${C.border}`, marginTop:4 }}>
                  {n.preview}
                  <div style={{ marginTop:12 }}>
                    <span style={{ fontSize:11, color:C.primary, fontFamily:FF,
                      fontWeight:700, cursor:'pointer' }}>
                      전체 공지 보기 ›
                    </span>
                  </div>
                </div>
              )}

              {/* 접힘 상태 토글 화살표 */}
              <div style={{ display:'flex', justifyContent:'flex-end', marginTop: isOpen ? 8 : 4 }}>
                <span style={{ fontSize:10, color:C.g[80],
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition:'transform 0.2s', display:'block' }}>▼</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   콘텐츠 탭 — 역 주변 로컬 큐레이션
   ① 이번 주 역 주변 이벤트  ② 에디터 픽 아티클
   ③ 역별 생활 혜택  ④ 이달의 버스킹
   ═══════════════════════════════════════════════════════ */

/* ── 이벤트 포스터 데이터 ─────────────────────────────── */
const CONTENT_EVENTS = [
  { id:1, station:'강남역',     lineId:'2',   emoji:'🌸', title:'강남구 봄꽃 축제',
    date:'3/15 ~ 3/22', location:'강남 대로변 일대', distance:'도보 3분',
    desc:'강남대로 1km 구간 봄꽃 포토존 & 먹거리 부스 60개 운영',
    bg:'linear-gradient(145deg,#FF6B9D 0%,#C44B9C 100%)', tag:'무료' },
  { id:2, station:'홍대입구역', lineId:'2',   emoji:'🎪', title:'마포 청년 벼룩시장',
    date:'매주 토요일', location:'홍대 걷고싶은거리', distance:'도보 5분',
    desc:'핸드메이드 & 빈티지 아이템 200개 부스, 푸드트럭 동시 운영',
    bg:'linear-gradient(145deg,#F39C12 0%,#E05C00 100%)', tag:'무료 입장' },
  { id:3, station:'여의도역',   lineId:'5',   emoji:'🌷', title:'여의도 봄꽃 축제',
    date:'3/28 ~ 4/5',  location:'여의도 윤중로', distance:'도보 7분',
    desc:'벚꽃 터널 1.2km & 한강 뷰 포토존, 야간 조명 라이트업',
    bg:'linear-gradient(145deg,#FF8CA1 0%,#7C6EF5 100%)', tag:'무료' },
  { id:4, station:'성수역',     lineId:'2',   emoji:'🏙️', title:'성수 팝업 위크',
    date:'3/14 ~ 3/16', location:'성수 팝업거리 일대', distance:'도보 2분',
    desc:'무신사·마뗑킴 팝업 포함 20개 브랜드, 한정 굿즈 증정',
    bg:'linear-gradient(145deg,#2C3E50 0%,#3498DB 100%)', tag:'일부 유료' },
  { id:5, station:'광화문역',   lineId:'5',   emoji:'🎭', title:'세종문화회관 봄 시즌',
    date:'3/20 ~ 4/30', location:'세종문화회관', distance:'도보 1분',
    desc:'클래식·뮤지컬 봄 특별 공연, 조기 예매 30% 할인 혜택',
    bg:'linear-gradient(145deg,#8E44AD 0%,#2980B9 100%)', tag:'할인' },
];

/* ── 에디터 픽 아티클 ────────────────────────────────── */
const CONTENT_ARTICLES = [
  { id:1, emoji:'🚇', tag:'에디터 픽',
    title:'2호선 타고 떠나는 봄 나들이 코스 5선',
    sub:'한강·선유도·여의도까지, 지하철 하나로 완성하는 봄 데이트',
    lineId:'2', reads:'2.4만', saves:380, featured:true },
  { id:2, emoji:'🛍️', tag:'팝업 투어',
    title:'이번 주말 역 근처 팝업스토어 총정리',
    sub:'성수·홍대·강남 일대 지금 당장 가야 할 팝업 8곳',
    lineId:null, reads:'1.8만', saves:255, featured:false },
  { id:3, emoji:'🎵', tag:'문화',
    title:'5월까지 이어지는 지하철 역사 버스킹 일정',
    sub:'신촌·홍대·합정역 주말 버스킹 전체 스케줄 공개',
    lineId:'2', reads:'9.2천', saves:142, featured:false },
  { id:4, emoji:'🍜', tag:'맛집',
    title:'강남역 지하 연결, 비 와도 OK 점심 맛집 10곳',
    sub:'지하 통로로 이동 가능한 숨겨진 맛집 완벽 가이드',
    lineId:'2', reads:'3.1만', saves:512, featured:false },
];

/* ── 역별 생활 혜택 ─────────────────────────────────── */
const CONTENT_BENEFITS = [
  { station:'강남역',     lineId:'2',   emoji:'🎟️',
    title:'청년 문화 패스',      desc:'강남구 거주 만 19~34세, 공연·전시 연 10만원 지원',   tag:'신청 중', tagColor:'#27AE60' },
  { station:'홍대입구역', lineId:'2',   emoji:'🅿️',
    title:'공영주차장 50% 할인', desc:'홍대 공영주차장, 아하철 앱 제시 시 50% 할인 적용', tag:'상시',   tagColor:C.primary },
  { station:'여의도역',   lineId:'5',   emoji:'🌿',
    title:'한강공원 무료 대관',  desc:'피크닉·바비큐 구역 무료 대관, 선착순 신청 가능',    tag:'선착순', tagColor:'#E67E22' },
  { station:'성수역',     lineId:'2',   emoji:'☕',
    title:'로컬 카페 스탬프',    desc:'성수 독립 카페 5곳 스탬프 완성 시 한정 굿즈 증정',  tag:'이벤트', tagColor:'#8E44AD' },
];

/* ── 이달의 버스킹 ─────────────────────────────────── */
const CONTENT_BUSKING = [
  { station:'홍대입구역', lineId:'2', day:'토·일', time:'14:00~18:00', artist:'Acoustic Wave',  genre:'어쿠스틱', emoji:'🎸' },
  { station:'신촌역',     lineId:'2', day:'토',    time:'15:00~17:00', artist:'Café Jazz Trio', genre:'재즈',     emoji:'🎷' },
  { station:'합정역',     lineId:'2', day:'일',    time:'13:00~16:00', artist:'인디씬 콜렉티브', genre:'인디',     emoji:'🎤' },
  { station:'이태원역',   lineId:'6', day:'금·토', time:'19:00~21:00', artist:'월드비트 앙상블', genre:'월드뮤직', emoji:'🥁' },
  { station:'강남역',     lineId:'2', day:'금',    time:'18:30~20:00', artist:'클래식 스트링',  genre:'클래식',   emoji:'🎻' },
];

function ContentTab() {
  const [savedArticles, setSavedArticles] = useState(new Set());
  const [likedEvents,   setLikedEvents]   = useState(new Set());

  return (
    <div style={{ paddingBottom:24 }}>

      {/* ══════════════════════════════════════════
          ① 이번 주 역 주변 이벤트
          ══════════════════════════════════════════ */}
      <div style={{ padding:'20px 0 0' }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
          padding:'0 16px', marginBottom:14 }}>
          <div>
            <div style={{ fontSize:17, fontWeight:900, color:C.white,
              fontFamily:FF, letterSpacing:'-0.03em' }}>이번 주 역 주변 이벤트</div>
            <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:2 }}>
              지하철 타고 바로 가는 동네 행사 모음
            </div>
          </div>
          <span style={{ fontSize:11, color:C.primary, fontFamily:FF, fontWeight:700,
            cursor:'pointer' }}>전체보기 ›</span>
        </div>

        {/* 포스터 카드 가로 스크롤 */}
        <div style={{ display:'flex', gap:10, padding:'0 16px',
          overflowX:'auto', scrollbarWidth:'none' }}>
          {CONTENT_EVENTS.map(ev => {
            const lc      = C.line[ev.lineId] ?? C.primary;
            const isLiked = likedEvents.has(ev.id);
            return (
              <div key={ev.id}
                style={{ flexShrink:0, width:175, height:260, borderRadius:18,
                  background:ev.bg, position:'relative', overflow:'hidden',
                  cursor:'pointer', boxShadow:'0 6px 24px rgba(0,0,0,0.4)' }}>

                {/* 상단 노이즈 텍스처 느낌 */}
                <div style={{ position:'absolute', inset:0,
                  background:'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
                  zIndex:1 }} />

                {/* 역 배지 */}
                <div style={{ position:'absolute', top:12, left:12, zIndex:2,
                  display:'flex', alignItems:'center', gap:5 }}>
                  <div style={{ width:18, height:18, borderRadius:9, background:lc,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:8, fontWeight:900, color:'#fff', fontFamily:FF }}>
                      {SUBWAY_LINES_DATA.find(l=>l.id===ev.lineId)?.short ?? ev.lineId}
                    </span>
                  </div>
                  <span style={{ fontSize:10, color:'rgba(255,255,255,0.9)',
                    fontFamily:FF, fontWeight:700,
                    textShadow:'0 1px 3px rgba(0,0,0,0.6)' }}>{ev.station}</span>
                </div>

                {/* 좋아요 버튼 */}
                <div onClick={e => { e.stopPropagation();
                    setLikedEvents(prev => { const n=new Set(prev); n.has(ev.id)?n.delete(ev.id):n.add(ev.id); return n; }); }}
                  style={{ position:'absolute', top:10, right:10, zIndex:3,
                    width:28, height:28, borderRadius:14,
                    background:'rgba(0,0,0,0.3)', backdropFilter:'blur(4px)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer' }}>
                  <span style={{ fontSize:13, color: isLiked ? '#FF6B9D' : 'rgba(255,255,255,0.7)' }}>
                    {isLiked ? '♥' : '♡'}
                  </span>
                </div>

                {/* 중앙 이모지 */}
                <div style={{ position:'absolute', top:'50%', left:'50%',
                  transform:'translate(-50%,-62%)', zIndex:1, fontSize:48,
                  filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                  {ev.emoji}
                </div>

                {/* 무료/유료 태그 */}
                <div style={{ position:'absolute', top:12, right:46, zIndex:2 }}>
                  <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.95)',
                    background:'rgba(0,0,0,0.35)', backdropFilter:'blur(4px)',
                    padding:'2px 7px', borderRadius:4, fontFamily:FF }}>{ev.tag}</span>
                </div>

                {/* 하단 텍스트 */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:2,
                  padding:'12px 13px' }}>
                  <div style={{ fontSize:7, fontWeight:700, color:'rgba(255,255,255,0.65)',
                    fontFamily:FF, letterSpacing:'0.08em', marginBottom:4 }}>
                    📍 {ev.distance} · {ev.date}
                  </div>
                  <div style={{ fontSize:13, fontWeight:900, color:'#fff',
                    fontFamily:FF, lineHeight:1.3, marginBottom:5,
                    textShadow:'0 2px 6px rgba(0,0,0,0.5)' }}>
                    {ev.title}
                  </div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,0.75)',
                    fontFamily:FF, lineHeight:1.4,
                    overflow:'hidden', display:'-webkit-box',
                    WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                    {ev.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ② 에디터 픽 아티클
          ══════════════════════════════════════════ */}
      <div style={{ padding:'28px 16px 0' }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
          marginBottom:14 }}>
          <div>
            <div style={{ fontSize:17, fontWeight:900, color:C.white,
              fontFamily:FF, letterSpacing:'-0.03em' }}>에디터 픽</div>
            <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:2 }}>
              지하철 라이프 큐레이션
            </div>
          </div>
          <span style={{ fontSize:11, color:C.primary, fontFamily:FF, fontWeight:700,
            cursor:'pointer' }}>전체보기 ›</span>
        </div>

        {/* 피처드 카드 (첫 번째 아티클) */}
        {(() => {
          const a = CONTENT_ARTICLES[0];
          const saved = savedArticles.has(a.id);
          const lc = a.lineId ? (C.line[a.lineId]??C.primary) : C.primary;
          return (
            <div style={{ borderRadius:16, overflow:'hidden', marginBottom:10,
              background:C.card, border:`1px solid ${C.border}`, cursor:'pointer' }}>
              {/* 커버 이미지 영역 */}
              <div style={{ height:140,
                background:`linear-gradient(135deg, ${lc}30 0%, rgba(20,21,27,0.8) 100%)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative' }}>
                <span style={{ fontSize:52, filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>
                  {a.emoji}
                </span>
                {/* 피처드 뱃지 */}
                <div style={{ position:'absolute', top:12, left:12,
                  background:lc, padding:'3px 10px', borderRadius:5 }}>
                  <span style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF }}>
                    ✦ {a.tag}
                  </span>
                </div>
                {/* 호선 배지 */}
                {a.lineId && (
                  <div style={{ position:'absolute', bottom:12, left:12,
                    width:22, height:22, borderRadius:11, background:lc,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF }}>
                      {SUBWAY_LINES_DATA.find(l=>l.id===a.lineId)?.short}
                    </span>
                  </div>
                )}
              </div>
              {/* 텍스트 영역 */}
              <div style={{ padding:'14px 14px 12px',
                display:'flex', justifyContent:'space-between', gap:12 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:900, color:C.white,
                    fontFamily:FF, lineHeight:1.4, marginBottom:5 }}>{a.title}</div>
                  <div style={{ fontSize:11, color:C.g[60], fontFamily:FF, lineHeight:1.5 }}>{a.sub}</div>
                  <div style={{ display:'flex', gap:10, marginTop:10 }}>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>👁 {a.reads}</span>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>🔖 {a.saves}</span>
                  </div>
                </div>
                <div onClick={e => { e.stopPropagation();
                    setSavedArticles(prev => { const n=new Set(prev); n.has(a.id)?n.delete(a.id):n.add(a.id); return n; }); }}
                  style={{ flexShrink:0, width:32, height:32, borderRadius:8, cursor:'pointer',
                    background: saved ? `${C.primary}22` : 'rgba(255,255,255,0.07)',
                    border:`1px solid ${saved ? C.primary+'50' : C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:14, color: saved ? C.primary : C.g[60] }}>🔖</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 나머지 아티클 리스트 */}
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {CONTENT_ARTICLES.slice(1).map(a => {
            const saved = savedArticles.has(a.id);
            const lc = a.lineId ? (C.line[a.lineId]??C.primary) : C.g[70];
            return (
              <div key={a.id}
                style={{ display:'flex', alignItems:'center', gap:12,
                  padding:'12px 14px', borderRadius:12, cursor:'pointer',
                  background:C.card, border:`1px solid ${C.border}` }}>
                {/* 이모지 아이콘 */}
                <div style={{ width:44, height:44, borderRadius:10, flexShrink:0,
                  background:`${lc}18`, border:`1px solid ${lc}30`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                  {a.emoji}
                </div>
                {/* 텍스트 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:4 }}>
                    <span style={{ fontSize:9, fontWeight:800, color:lc,
                      background:`${lc}18`, padding:'1px 6px', borderRadius:3, fontFamily:FF }}>
                      {a.tag}
                    </span>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                      👁 {a.reads} · 🔖 {a.saves}
                    </span>
                  </div>
                  <div style={{ fontSize:12, fontWeight:800, color:C.white,
                    fontFamily:FF, lineHeight:1.35,
                    overflow:'hidden', display:'-webkit-box',
                    WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                    {a.title}
                  </div>
                </div>
                {/* 저장 버튼 */}
                <div onClick={e => { e.stopPropagation();
                    setSavedArticles(prev => { const n=new Set(prev); n.has(a.id)?n.delete(a.id):n.add(a.id); return n; }); }}
                  style={{ flexShrink:0, width:28, height:28, borderRadius:7, cursor:'pointer',
                    background: saved ? `${C.primary}22` : 'rgba(255,255,255,0.07)',
                    border:`1px solid ${saved ? C.primary+'50' : C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:12, color: saved ? C.primary : C.g[70] }}>🔖</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ③ 역별 생활 혜택
          ══════════════════════════════════════════ */}
      <div style={{ padding:'28px 16px 0' }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
          marginBottom:14 }}>
          <div>
            <div style={{ fontSize:17, fontWeight:900, color:C.white,
              fontFamily:FF, letterSpacing:'-0.03em' }}>역별 생활 혜택</div>
            <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:2 }}>
              내 역 근처 숨겨진 혜택을 찾아보세요
            </div>
          </div>
          <span style={{ fontSize:11, color:C.primary, fontFamily:FF, fontWeight:700,
            cursor:'pointer' }}>전체보기 ›</span>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {CONTENT_BENEFITS.map((b, i) => {
            const lc = C.line[b.lineId] ?? C.primary;
            return (
              <div key={i}
                style={{ display:'flex', alignItems:'center', gap:12,
                  padding:'14px 14px', borderRadius:14, cursor:'pointer',
                  background:C.card, border:`1px solid ${C.border}` }}>
                {/* 이모지 아이콘 */}
                <div style={{ width:46, height:46, borderRadius:12, flexShrink:0,
                  background:`${lc}18`, border:`1px solid ${lc}28`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>
                  {b.emoji}
                </div>
                {/* 내용 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                    <span style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF }}>
                      {b.title}
                    </span>
                  </div>
                  <div style={{ fontSize:11, color:C.g[60], fontFamily:FF,
                    lineHeight:1.45, marginBottom:6 }}>{b.desc}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ width:14, height:14, borderRadius:7, background:lc,
                      display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:6, fontWeight:900, color:'#fff', fontFamily:FF }}>
                        {SUBWAY_LINES_DATA.find(l=>l.id===b.lineId)?.short}
                      </span>
                    </div>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{b.station}</span>
                  </div>
                </div>
                {/* 상태 태그 */}
                <div style={{ flexShrink:0 }}>
                  <span style={{ fontSize:10, fontWeight:800, fontFamily:FF,
                    color:b.tagColor, background:`${b.tagColor}18`,
                    padding:'4px 10px', borderRadius:6, whiteSpace:'nowrap' }}>
                    {b.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          ④ 이달의 버스킹
          ══════════════════════════════════════════ */}
      <div style={{ padding:'28px 16px 24px' }}>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between',
          marginBottom:14 }}>
          <div>
            <div style={{ fontSize:17, fontWeight:900, color:C.white,
              fontFamily:FF, letterSpacing:'-0.03em' }}>이달의 버스킹</div>
            <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:2 }}>
              3월 지하철역 & 주변 공연 일정
            </div>
          </div>
        </div>

        <div style={{ borderRadius:14, border:`1px solid ${C.border}`, overflow:'hidden' }}>
          {CONTENT_BUSKING.map((b, i) => {
            const lc = C.line[b.lineId] ?? C.primary;
            return (
              <div key={i}
                style={{ display:'flex', alignItems:'center', gap:12,
                  padding:'13px 16px',
                  borderBottom: i < CONTENT_BUSKING.length-1 ? `1px solid ${C.border}` : 'none',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>

                {/* 이모지 */}
                <div style={{ width:38, height:38, borderRadius:10, flexShrink:0,
                  background:`${lc}18`, border:`1px solid ${lc}28`,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                  {b.emoji}
                </div>

                {/* 아티스트 & 역 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:800, color:C.white,
                    fontFamily:FF, marginBottom:3 }}>{b.artist}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:14, height:14, borderRadius:7, background:lc,
                      display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:6, fontWeight:900, color:'#fff', fontFamily:FF }}>
                        {SUBWAY_LINES_DATA.find(l=>l.id===b.lineId)?.short}
                      </span>
                    </div>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{b.station}</span>
                    <span style={{ fontSize:10, color:C.g[80], fontFamily:FF }}>·</span>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF,
                      background:`${lc}14`, padding:'1px 6px', borderRadius:3 }}>{b.genre}</span>
                  </div>
                </div>

                {/* 일정 */}
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:C.white,
                    fontFamily:FF, marginBottom:2 }}>{b.day}</div>
                  <div style={{ fontSize:10, color:C.g[60], fontFamily:FF }}>{b.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   인기 탭 — 무신사 스타일 전면 리디자인
   ① 히어로 배너  ② 탐색 칩  ③ 2열 인기 게시글 그리드
   ④ 지금 뜨는 역  ⑤ 실시간 검색어  ⑥ 혼잡도 랭킹
   ⑦ 이주의 크루 TOP 5
   ═══════════════════════════════════════════════════════ */

const TODAY_BANNERS = [
  { id:1, label:'LIVE', tag:'실시간 급상승', title:'강남역 2호선\n지금 극혼잡', sub:'오전 8:32 기준 · 혼잡도 94%', bg:'linear-gradient(135deg,#C0392B 0%,#7B0F0F 100%)', emoji:'🚨', badge:'혼잡', badgeColor:'#FFB3B3' },
  { id:2, label:'HOT', tag:'이번 주 화제글', title:'판교역 숨은 맛집\n완벽 가이드 2026', sub:'공감 187개 · 댓글 43개', bg:'linear-gradient(135deg,#0A3A5C 0%,#071E33 100%)', emoji:'🍜', badge:'맛집', badgeColor:'#7DD3FC' },
  { id:3, label:'NEW', tag:'봄 이벤트', title:'여의도 벚꽃 축제\n3/22 ~ 4/5', sub:'5호선 여의도역 도보 2분', bg:'linear-gradient(135deg,#7C2D6E 0%,#3D1540 100%)', emoji:'🌸', badge:'무료', badgeColor:'#F9A8D4' },
];

const POPULAR_CHIPS = ['전체','2호선','신분당선','강남역','홍대입구','판교역','잠실역','5호선'];

const HOT_KEYWORDS = [
  { rank:1,  word:'강남역 신호장애', change:'new',  delta:null },
  { rank:2,  word:'2호선 지연',      change:'up',   delta:3   },
  { rank:3,  word:'홍대입구 혼잡',   change:'up',   delta:1   },
  { rank:4,  word:'판교역 맛집',     change:'down', delta:2   },
  { rank:5,  word:'출근길 꿀팁',     change:'up',   delta:5   },
  { rank:6,  word:'신분당선 환승',   change:'same', delta:0   },
  { rank:7,  word:'잠실역 5분 지연', change:'new',  delta:null},
  { rank:8,  word:'여의도 벚꽃',     change:'down', delta:1   },
  { rank:9,  word:'지하철 에티켓',   change:'up',   delta:2   },
  { rank:10, word:'강남 퇴근 혼잡',  change:'down', delta:3   },
];

/* CONGESTION_RANK 제거됨 — 인기 역 리뷰 섹션으로 대체 */

const HOT_POSTS = [
  { rank:1,  id:1,  title:'강남역 2호선 오늘 왜 이렇게 밀려요?',  likes:248, comments:67, writer:'강남러버',    lineId:'2',   tag:'혼잡',  tagColor:'#EF4444', thumb:'linear-gradient(145deg,#7F1D1D 0%,#450A0A 100%)' },
  { rank:2,  id:3,  title:'판교역 근처 숨은 맛집 공유해요',        likes:187, comments:43, writer:'판교직장인',  lineId:'sin', tag:'맛집',  tagColor:'#F59E0B', thumb:'linear-gradient(145deg,#78350F 0%,#3C1407 100%)' },
  { rank:3,  id:2,  title:'홍대입구역 5번 출구 공사 언제 끝나요',  likes:134, comments:38, writer:'홍대거주민',  lineId:'2',   tag:'공사',  tagColor:'#9CA3AF', thumb:'linear-gradient(145deg,#374151 0%,#111827 100%)' },
  { rank:4,  id:4,  title:'출퇴근 혼잡 피하는 시간대 공유',        likes:121, comments:29, writer:'지하철매니아', lineId:'5',   tag:'꿀팁',  tagColor:'#00BAF6', thumb:'linear-gradient(145deg,#0C4A6E 0%,#082F49 100%)' },
  { rank:5,  id:5,  title:'신분당선 판교→강남 소요시간 실측',      likes:98,  comments:22, writer:'출퇴근기록자', lineId:'sin', tag:'정보',  tagColor:'#A78BFA', thumb:'linear-gradient(145deg,#4C1D95 0%,#2E1065 100%)' },
  { rank:6,  id:6,  title:'강남역 편의시설 완벽 가이드 2026',      likes:87,  comments:18, writer:'역사탐험가',  lineId:'2',   tag:'가이드', tagColor:'#34D399', thumb:'linear-gradient(145deg,#064E3B 0%,#022C22 100%)' },
];

const HOT_STATIONS = [
  { station:'강남역',     lineId:'2',   posts:142, heat:98, badge:'불꽃'  },
  { station:'홍대입구역', lineId:'2',   posts:118, heat:91, badge:'화제'  },
  { station:'판교역',     lineId:'sin', posts:89,  heat:83, badge:'급상승'},
  { station:'여의도역',   lineId:'5',   posts:74,  heat:76, badge:'주목'  },
  { station:'잠실역',     lineId:'2',   posts:67,  heat:70, badge:'인기'  },
  { station:'신촌역',     lineId:'2',   posts:55,  heat:62, badge:'핫스팟'},
];

const TOP_USERS = [
  { rank:1, nick:'지하철박사',   lineId:'2',   station:'강남역',     posts:89, followers:1240, badge:'명예 크루' },
  { rank:2, nick:'판교직장인',   lineId:'sin', station:'판교역',     posts:74, followers:987,  badge:'파워 유저' },
  { rank:3, nick:'강남러버',     lineId:'2',   station:'강남역',     posts:61, followers:832,  badge:'핫 라이저' },
  { rank:4, nick:'홍대거주민',   lineId:'2',   station:'홍대입구역', posts:58, followers:721,  badge:'파워 유저' },
  { rank:5, nick:'출퇴근기록자', lineId:'sin', station:'신사역',     posts:47, followers:614,  badge:'핫 라이저' },
];


/* ═══════════════════════════════════════════════════════
   크루 데이터 & 크루 상세 화면
═══════════════════════════════════════════════════════ */

const CREW_LIST = [
  {
    id:1, name:'강남 2호선 크루', emoji:'💚', lineId:'2', station:'강남역',
    members:47, posts:283, since:'2024.03', category:'출퇴근',
    tags:['출퇴근','혼잡도','빠른하차','꿀팁'],
    desc:'강남·선릉 구간 2호선 상습 이용자 모임. 혼잡도 실시간 공유, 빠른 하차 꿀팁, 지연 알림을 함께 나눠요. 매주 화요일 오프라인 모임 진행 중!',
    openToJoin: true,
    topMembers: [
      { nick:'지하철박사',   flag:'🇰🇷', badge:'크루장',    lineId:'2'   },
      { nick:'강남러버',     flag:'🇰🇷', badge:'부크루장',  lineId:'2'   },
      { nick:'통근마스터',   flag:'🇰🇷', badge:'활동왕',    lineId:'2'   },
      { nick:'판교직장인',   flag:'🇰🇷', badge:'꿀팁러',    lineId:'sin' },
      { nick:'홍대거주민',   flag:'🇰🇷', badge:'뉴비',      lineId:'2'   },
    ],
    recentPosts: [
      { title:'오늘 강남역 8시 30분 상황 공유',        likes:48,  comments:14, time:'11분 전',  tag:'혼잡',  tagColor:'#EF4444' },
      { title:'빠른 하차 꿀팁 총정리 v3 (2025년 업)',  likes:134, comments:31, time:'2시간 전', tag:'꿀팁',  tagColor:'#00BAF6' },
      { title:'강남역 → 선릉역 혼잡 피하는 법',        likes:77,  comments:18, time:'어제',     tag:'꿀팁',  tagColor:'#00BAF6' },
      { title:'이번 주 2호선 지연 총정리',              likes:55,  comments:9,  time:'어제',     tag:'지연',  tagColor:'#F97316' },
    ],
    milestones: ['멤버 10명 달성 🎉', '게시글 100개 돌파 🎯', '오프모임 3회 완료 🤝'],
  },
  {
    id:2, name:'판교 신분당선 직장인', emoji:'💎', lineId:'sin', station:'판교역',
    members:31, posts:156, since:'2024.06', category:'직장인',
    tags:['판교','테크기업','랩','점심'],
    desc:'판교·정자 구간 IT 직장인들의 커뮤니티. 신분당선 혼잡도 공유 및 판교 점심 맛집 추천이 주요 활동입니다.',
    openToJoin: true,
    topMembers: [
      { nick:'판교직장인',   flag:'🇰🇷', badge:'크루장',    lineId:'sin' },
      { nick:'IT개발자K',    flag:'🇰🇷', badge:'부크루장',  lineId:'sin' },
      { nick:'스타트업A',    flag:'🇰🇷', badge:'활동왕',    lineId:'sin' },
      { nick:'판교런치',     flag:'🇰🇷', badge:'맛집러',    lineId:'sin' },
    ],
    recentPosts: [
      { title:'오늘 판교역 9시 혼잡도 어떤가요?',  likes:22, comments:8,  time:'20분 전', tag:'혼잡', tagColor:'#EF4444' },
      { title:'판교 점심 새로 오픈한 파스타집 후기', likes:89, comments:27, time:'3시간 전',tag:'맛집', tagColor:'#F59E0B' },
      { title:'신분당선 급행 시간표 정리',           likes:61, comments:15, time:'어제',    tag:'꿀팁', tagColor:'#00BAF6' },
    ],
    milestones: ['멤버 30명 달성 🎉', '게시글 150개 돌파 🎯'],
  },
  {
    id:3, name:'홍대 힙스터 크루', emoji:'🎨', lineId:'2', station:'홍대입구역',
    members:62, posts:412, since:'2023.11', category:'문화',
    tags:['카페','버스킹','팝업','전시'],
    desc:'홍대·합정 구간의 힙한 문화를 탐방하는 크루. 팝업스토어 정보, 카페 신상, 버스킹 스케줄을 공유합니다.',
    openToJoin: true,
    topMembers: [
      { nick:'홍대거주민',   flag:'🇰🇷', badge:'크루장',    lineId:'2' },
      { nick:'카페탐방러',   flag:'🇰🇷', badge:'활동왕',    lineId:'2' },
      { nick:'팝업헌터',     flag:'🇰🇷', badge:'정보통',    lineId:'2' },
      { nick:'버스킹팬',     flag:'🇰🇷', badge:'뉴비',      lineId:'2' },
      { nick:'합정러버',     flag:'🇰🇷', badge:'뉴비',      lineId:'2' },
    ],
    recentPosts: [
      { title:'이번 주말 홍대 버스킹 라인업 공유!', likes:148, comments:42, time:'1시간 전', tag:'버스킹', tagColor:'#A78BFA' },
      { title:'합정 신상 카페 "무드" 솔직 후기',    likes:93,  comments:23, time:'4시간 전', tag:'카페',   tagColor:'#F59E0B' },
      { title:'홍대 팝업스토어 이번 주 일정',        likes:77,  comments:19, time:'어제',     tag:'팝업',   tagColor:'#EC4899' },
    ],
    milestones: ['멤버 50명 달성 🎉', '게시글 400개 돌파 🎯', '오프모임 6회 완료 🤝', '크루 1주년 🎂'],
  },
  {
    id:4, name:'야간열차 크루', emoji:'🌙', lineId:'9', station:'신논현역',
    members:18, posts:97, since:'2024.09', category:'심야',
    tags:['심야','야간','막차','안전'],
    desc:'심야·막차 이용자들을 위한 안전 정보 공유 모임. 야간 혼잡 정보, 막차 시간, 안전한 귀가 경로를 함께 나눕니다.',
    openToJoin: true,
    topMembers: [
      { nick:'야간열차',     flag:'🇰🇷', badge:'크루장',    lineId:'9' },
      { nick:'심야출근자',   flag:'🇰🇷', badge:'부크루장',  lineId:'9' },
      { nick:'막차매니아',   flag:'🇰🇷', badge:'활동왕',    lineId:'9' },
    ],
    recentPosts: [
      { title:'오늘 9호선 막차 혼잡 상황',     likes:31, comments:7,  time:'어제', tag:'막차', tagColor:'#60A5FA' },
      { title:'심야 안전 귀가 경로 총정리',    likes:55, comments:12, time:'3일 전',tag:'안전', tagColor:'#34D399' },
    ],
    milestones: ['멤버 15명 달성 🎉'],
  },
  {
    id:5, name:'수도권 환승왕 크루', emoji:'🔄', lineId:'1', station:'서울역',
    members:89, posts:634, since:'2023.07', category:'환승',
    tags:['환승','경기도','광역철도','시간단축'],
    desc:'수도권 광역 환승 구간 이용자 최대 규모 커뮤니티. GTX·경강선·경의중앙선 등 광역철도 실시간 정보와 최적 환승 경로를 공유합니다.',
    openToJoin: false,
    topMembers: [
      { nick:'환승왕',       flag:'🇰🇷', badge:'크루장',    lineId:'1'   },
      { nick:'GTX박사',      flag:'🇰🇷', badge:'부크루장',  lineId:'sin' },
      { nick:'경기도민A',    flag:'🇰🇷', badge:'활동왕',    lineId:'1'   },
      { nick:'출퇴근기록자', flag:'🇰🇷', badge:'기록왕',    lineId:'sin' },
      { nick:'수도권마스터', flag:'🇰🇷', badge:'정보통',    lineId:'1'   },
    ],
    recentPosts: [
      { title:'GTX-A 개통 후 이용 후기 총정리',  likes:312, comments:87, time:'3시간 전', tag:'GTX',   tagColor:'#00BAF6' },
      { title:'수도권 환승 최단 경로 총정리 2025', likes:228, comments:64, time:'어제',    tag:'꿀팁',  tagColor:'#00BAF6' },
      { title:'경의중앙선 혼잡도 시간대별 분석',  likes:144, comments:39, time:'2일 전',  tag:'분석',  tagColor:'#A78BFA' },
    ],
    milestones: ['멤버 50명 달성 🎉', '멤버 80명 달성 🚀', '게시글 500개 돌파 🎯', '크루 1주년 🎂', '크루 인증 획득 ✅'],
  },
];

function CrewDetailScreen({ crew, onBack, onPostDetail, onUser }) {
  const [joined,        setJoined]        = React.useState(false);
  const [postLikes,     setPostLikes]     = React.useState({});
  /* 가입 신청 위저드 상태 */
  const [showWiz,       setShowWiz]       = React.useState(false);
  const [wizStep,       setWizStep]       = React.useState(1); // 1 | 2 | 'done'
  const [joinReasons,   setJoinReasons]   = React.useState([]);
  const [joinIntro,     setJoinIntro]     = React.useState('');
  const [joinTimes,     setJoinTimes]     = React.useState([]);
  const [joinMeetType,  setJoinMeetType]  = React.useState('');

  const JOIN_REASONS  = ['정보 공유', '오프라인 모임', '출퇴근 동행', '매일 이 호선 이용', '모르는 사람과 소통', '크루 활동 경험'];
  const JOIN_TIMES    = ['평일 아침', '평일 저녁', '주말 오전', '주말 오후', '심야', '상시 가능'];
  const MEET_TYPES    = ['온라인 전용', '오프라인 가능', '어디든 상관없음'];

  function toggleReason(r) {
    setJoinReasons(function(prev) {
      return prev.includes(r) ? prev.filter(function(x) { return x !== r; }) : [...prev, r];
    });
  }
  function toggleTime(t) {
    setJoinTimes(function(prev) {
      return prev.includes(t) ? prev.filter(function(x) { return x !== t; }) : [...prev, t];
    });
  }
  function openWiz() { setShowWiz(true); setWizStep(1); setJoinReasons([]); setJoinIntro(''); setJoinTimes([]); setJoinMeetType(''); }
  function closeWiz() { setShowWiz(false); }

  var canStep1 = joinReasons.length > 0 && joinIntro.trim().length >= 10;
  var canStep2 = joinTimes.length > 0 && joinMeetType !== '';
  const lc = C.line[crew.lineId] ?? C.primary;

  const toggleLike = (idx) => setPostLikes(prev => ({
    ...prev, [idx]: !prev[idx]
  }));

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden' }}>

      {/* ── 헤더 ──────────────────────────────────── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px' }}>
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:14, background:`${lc}22`,
              border:`1.5px solid ${lc}55`, display:'flex', alignItems:'center',
              justifyContent:'center', fontSize:14 }}>{crew.emoji}</div>
            <div>
              <div style={{ fontSize:14, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.02em' }}>{crew.name}</div>
              <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                {crew.station} · {crew.since} 개설
              </div>
            </div>
          </div>
          {/* 공유 버튼 */}
          <button style={{ width:40, height:40, display:'flex', alignItems:'center',
            justifyContent:'center', background:'none', border:'none', cursor:'pointer',
            marginRight:4 }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke={C.g[50]} strokeWidth="2" strokeLinecap="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── 스크롤 본문 ──────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none' }}>

        {/* ── 히어로 배너 ─────────────────────────── */}
        <div style={{ background:`linear-gradient(160deg,${lc}22 0%,${C.card} 100%)`,
          borderBottom:`1px solid ${C.border}`, padding:'20px 20px 16px' }}>
          {/* 호선 배지 + 크루 이름 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ width:36, height:36, borderRadius:18, background:lc,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:16, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>
              {crew.lineId === 'sin' ? '신' : crew.lineId}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:20, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.04em', lineHeight:1.1 }}>{crew.name}</div>
            </div>
            <div style={{ fontSize:28 }}>{crew.emoji}</div>
          </div>

          {/* 설명 */}
          <p style={{ fontSize:12, color:C.g[50], fontFamily:FF, lineHeight:1.7,
            margin:'0 0 14px 0' }}>{crew.desc}</p>

          {/* 태그 칩 */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:14 }}>
            {crew.tags.map((t, i) => (
              <span key={i} style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                color:lc, background:`${lc}18`, padding:'3px 10px', borderRadius:20,
                border:`1px solid ${lc}40` }}>#{t}</span>
            ))}
          </div>

          {/* 통계 3종 */}
          <div style={{ display:'flex', gap:0, background:C.glass1,
            borderRadius:12, overflow:'hidden', border:`1px solid ${C.border}` }}>
            {[
              { label:'멤버', value:`${crew.members}명`, icon:'👥' },
              { label:'게시글', value:`${crew.posts}개`, icon:'📝' },
              { label:'활동 시작', value:crew.since, icon:'📅' },
            ].map((s, i) => (
              <div key={i} style={{ flex:1, padding:'12px 0', textAlign:'center',
                borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ fontSize:16, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontSize:14, fontWeight:900, color:C.white,
                  fontFamily:FF, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:9, color:C.g[70], fontFamily:FF,
                  marginTop:3, letterSpacing:'0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 마일스톤 ──────────────────────────────── */}
        <div style={{ padding:'16px 20px',
          borderBottom:`1px solid ${C.border}` }}>
          <div style={{ fontSize:11, fontWeight:800, color:C.g[50], fontFamily:FF,
            letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:10 }}>
            MILESTONE
          </div>
          <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none' }}>
            {crew.milestones.map((m, i) => (
              <div key={i} style={{ flexShrink:0, padding:'7px 12px',
                background:`${lc}12`, border:`1px solid ${lc}35`,
                borderRadius:20, fontSize:11, fontWeight:700, color:C.g[40],
                fontFamily:FF, whiteSpace:'nowrap' }}>{m}</div>
            ))}
          </div>
        </div>

        {/* ── 멤버 ─────────────────────────────────── */}
        <div style={{ padding:'16px 20px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            marginBottom:12 }}>
            <span style={{ fontSize:11, fontWeight:800, color:C.g[50], fontFamily:FF,
              letterSpacing:'0.07em', textTransform:'uppercase' }}>
              멤버 {crew.members}명
            </span>
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, cursor:'pointer' }}>
              전체 보기 ›
            </span>
          </div>
          <div style={{ display:'flex', gap:12, overflowX:'auto', scrollbarWidth:'none' }}>
            {crew.topMembers.map((m, i) => {
              const mlc = C.line[m.lineId] ?? C.primary;
              return (
                <div key={i} style={{ flexShrink:0, textAlign:'center', width:60 }}>
                  <div style={{ position:'relative', margin:'0 auto 6px',
                    width:44, height:44 }}>
                    <div
                      onClick={function() { onUser && onUser(m.nick); }}
                      style={{ width:44, height:44, borderRadius:22,
                      background:`${mlc}22`, border:`2px solid ${mlc}55`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:15, fontWeight:900, color:mlc, fontFamily:FF,
                      cursor:'pointer' }}>
                      {m.nick.slice(0,1)}
                    </div>
                    {i === 0 && (
                      <div style={{ position:'absolute', top:-4, right:-4,
                        fontSize:12 }}>👑</div>
                    )}
                  </div>
                  <div
                    onClick={function() { onUser && onUser(m.nick); }}
                    style={{ fontSize:10, fontWeight:700, color:C.g[40],
                    fontFamily:FF, marginBottom:2, whiteSpace:'nowrap',
                    overflow:'hidden', textOverflow:'ellipsis', maxWidth:60,
                    cursor:'pointer' }}>
                    {m.nick}
                  </div>
                  <div style={{ fontSize:8, color:mlc, fontFamily:FF,
                    background:`${mlc}18`, padding:'1px 4px', borderRadius:4,
                    display:'inline-block' }}>
                    {m.badge}
                  </div>
                </div>
              );
            })}
            {/* +N 더 */}
            {crew.members > crew.topMembers.length && (
              <div style={{ flexShrink:0, textAlign:'center', width:60, paddingTop:10 }}>
                <div style={{ width:44, height:44, borderRadius:22, margin:'0 auto 6px',
                  background:C.glass1, border:`1px solid ${C.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:12, fontWeight:700, color:C.g[60],
                    fontFamily:FF }}>+{crew.members - crew.topMembers.length}</span>
                </div>
                <div style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>더보기</div>
              </div>
            )}
          </div>
        </div>

        {/* ── 최신 게시글 ───────────────────────────── */}
        <div style={{ padding:'16px 20px' }}>
          <div style={{ display:'flex', alignItems:'flex-end',
            justifyContent:'space-between', marginBottom:12 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:lc,
                letterSpacing:'0.1em', fontFamily:FF, marginBottom:3 }}>CREW FEED</div>
              <div style={{ fontSize:17, fontWeight:900, color:C.white,
                fontFamily:FF, letterSpacing:'-0.03em' }}>최신 게시글</div>
            </div>
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, cursor:'pointer' }}>
              전체 보기 ›
            </span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {crew.recentPosts.map((post, i) => (
              <div key={i}
                onClick={() => onPostDetail && onPostDetail(post)}
                style={{ background:C.card, border:`1px solid ${C.border}`,
                borderRadius:14, padding:'13px 14px', cursor:'pointer' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
                  <span style={{ fontSize:10, fontWeight:700, fontFamily:FF,
                    color:post.tagColor, background:`${post.tagColor}15`,
                    padding:'1px 7px', borderRadius:5,
                    border:`1px solid ${post.tagColor}33` }}>
                    {post.tag}
                  </span>
                  <span style={{ fontSize:10, color:C.g[70], fontFamily:FF,
                    marginLeft:'auto' }}>{post.time}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:C.white,
                  fontFamily:FF, lineHeight:1.4, marginBottom:9 }}>
                  {post.title}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <button onClick={() => toggleLike(i)}
                    style={{ display:'flex', alignItems:'center', gap:4,
                      background:'none', border:'none', cursor:'pointer',
                      fontSize:11, fontFamily:FF,
                      color: postLikes[i] ? '#F43F5E' : C.g[70] }}>
                    {postLikes[i] ? '❤️' : '♡'} {post.likes + (postLikes[i] ? 1 : 0)}
                  </button>
                  <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
                    💬 {post.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 하단 패딩 ────────────────────────────── */}
        <div style={{ height:100 }} />
      </div>

      {/* ── 하단 가입 CTA (sticky) ────────────────── */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        padding:'12px 20px calc(12px + env(safe-area-inset-bottom,16px))',
        background:'linear-gradient(to top, #0E0F14 60%, transparent)',
        pointerEvents:'none' }}>
        <button
          onClick={joined ? undefined : openWiz}
          style={{ width:'100%', padding:'14px 0', borderRadius:14,
            cursor: joined ? 'default' : 'pointer', fontSize:14, fontWeight:900, fontFamily:FF,
            background: joined ? 'rgba(255,255,255,0.08)' : lc,
            color: joined ? C.g[50] : '#fff',
            border: joined ? `1px solid ${C.border}` : 'none',
            transition:'all 0.2s', pointerEvents:'all' }}>
          {joined ? '✓ 가입 신청 완료' :
           crew.openToJoin ? '크루 가입 신청하기 →' : '가입 신청하기 (심사 필요) →'}
        </button>
      </div>

      {/* ── 가입 신청 위저드 모달 ─────────────────── */}
      {showWiz && (
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.72)', zIndex:50,
          display:'flex', alignItems:'flex-end' }}
          onClick={function(e) { if (e.target === e.currentTarget) closeWiz(); }}>
          <div style={{ width:'100%', background:C.card, borderRadius:'20px 20px 0 0',
            padding:'0 0 calc(20px + env(safe-area-inset-bottom,20px))',
            maxHeight:'85vh', display:'flex', flexDirection:'column' }}>

            {/* 모달 헤더 */}
            <div style={{ padding:'16px 20px 12px', borderBottom:'1px solid '+C.border,
              display:'flex', alignItems:'center', justifyContent:'space-between', flexShrink:0 }}>
              <div>
                <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:lc,
                  letterSpacing:'0.1em', marginBottom:2 }}>CREW JOIN</div>
                <div style={{ fontSize:16, fontFamily:FF, fontWeight:800, color:C.white }}>
                  {wizStep === 'done' ? '신청 완료!' :
                   wizStep === 1 ? '가입 신청 · 1단계' : '가입 신청 · 2단계'}
                </div>
              </div>
              <div onClick={closeWiz}
                style={{ width:32, height:32, borderRadius:8, background:C.bg,
                  border:'1px solid '+C.border, display:'flex', alignItems:'center',
                  justifyContent:'center', cursor:'pointer', fontSize:16, color:C.g[400] }}>✕</div>
            </div>

            {/* 진행 바 */}
            {wizStep !== 'done' && (
              <div style={{ height:3, background:C.border, flexShrink:0 }}>
                <div style={{ height:3, background:lc, width: wizStep === 1 ? '50%' : '100%',
                  transition:'width 0.3s' }} />
              </div>
            )}

            {/* 모달 바디 */}
            <div style={{ flex:1, overflowY:'auto', padding:'20px 20px 0' }}>

              {/* ── STEP 1 ── */}
              {wizStep === 1 && (
                <div>
                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:4 }}>
                    이 크루에 가입하려는 이유를 선택해주세요
                    <span style={{ fontSize:10, color:C.g[500], fontWeight:400, marginLeft:6 }}>복수 선택 가능</span>
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
                    {JOIN_REASONS.map(function(r) {
                      var act = joinReasons.includes(r);
                      return (
                        <div key={r} onClick={function() { toggleReason(r); }}
                          style={{ padding:'7px 14px', borderRadius:20, cursor:'pointer',
                            background: act ? lc+'22' : C.bg,
                            border: '1px solid ' + (act ? lc : C.border),
                            fontSize:12, fontFamily:FF, fontWeight:700,
                            color: act ? lc : C.g[400] }}>
                          {act ? '✓ ' : ''}{r}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:6 }}>
                    자기소개
                    <span style={{ fontSize:10, color:C.g[500], fontWeight:400, marginLeft:6 }}>최소 10자</span>
                  </div>
                  <textarea
                    value={joinIntro}
                    onChange={function(e) { setJoinIntro(e.target.value); }}
                    placeholder={'크루장에게 나를 소개해주세요!\n어떤 구간을 자주 이용하는지, 크루에서 뭘 하고 싶은지 적어보세요 😊'}
                    style={{ width:'100%', minHeight:100, background:C.bg, border:'1px solid '+C.border,
                      borderRadius:12, padding:'12px 14px', fontSize:12, fontFamily:FF, color:C.white,
                      resize:'none', outline:'none', boxSizing:'border-box', lineHeight:1.6 }}
                  />
                  <div style={{ textAlign:'right', fontSize:10, fontFamily:FF,
                    color: joinIntro.length >= 10 ? '#34D399' : C.g[500], marginTop:4 }}>
                    {joinIntro.length}자 {joinIntro.length >= 10 ? '✓' : '(최소 10자)'}
                  </div>

                  {!crew.openToJoin && (
                    <div style={{ marginTop:14, background:'#F5960322', border:'1px solid #F5960355',
                      borderRadius:12, padding:'10px 14px', display:'flex', gap:8, alignItems:'center' }}>
                      <span style={{ fontSize:14 }}>⏳</span>
                      <div style={{ fontSize:11, fontFamily:FF, color:'#F59603' }}>
                        이 크루는 <strong>승인 필요</strong> 크루입니다. 크루장 심사 후 최대 3일 이내 결과를 알려드려요.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── STEP 2 ── */}
              {wizStep === 2 && (
                <div>
                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:4 }}>
                    주로 활동 가능한 시간대
                    <span style={{ fontSize:10, color:C.g[500], fontWeight:400, marginLeft:6 }}>복수 선택 가능</span>
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
                    {JOIN_TIMES.map(function(t) {
                      var act = joinTimes.includes(t);
                      return (
                        <div key={t} onClick={function() { toggleTime(t); }}
                          style={{ padding:'7px 14px', borderRadius:20, cursor:'pointer',
                            background: act ? lc+'22' : C.bg,
                            border: '1px solid ' + (act ? lc : C.border),
                            fontSize:12, fontFamily:FF, fontWeight:700,
                            color: act ? lc : C.g[400] }}>
                          {act ? '✓ ' : ''}{t}
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ fontSize:13, fontFamily:FF, fontWeight:700, color:C.white, marginBottom:6 }}>
                    선호하는 모임 방식
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
                    {MEET_TYPES.map(function(m) {
                      var act = joinMeetType === m;
                      return (
                        <div key={m} onClick={function() { setJoinMeetType(m); }}
                          style={{ padding:'7px 14px', borderRadius:20, cursor:'pointer',
                            background: act ? lc+'22' : C.bg,
                            border: '1px solid ' + (act ? lc : C.border),
                            fontSize:12, fontFamily:FF, fontWeight:700,
                            color: act ? lc : C.g[400] }}>
                          {act ? '✓ ' : ''}{m}
                        </div>
                      );
                    })}
                  </div>

                  {/* 신청 내용 미리보기 */}
                  <div style={{ background:C.bg, border:'1px solid '+C.border, borderRadius:12, padding:'12px 14px', marginBottom:8 }}>
                    <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:C.g[500],
                      letterSpacing:'0.08em', marginBottom:8 }}>신청 내용 미리보기</div>
                    <div style={{ fontSize:11, fontFamily:FF, color:C.g[400], lineHeight:1.6 }}>
                      <span style={{ color:C.g[500] }}>가입 이유: </span>
                      {joinReasons.join(', ')}<br/>
                      <span style={{ color:C.g[500] }}>자기소개: </span>
                      {joinIntro.slice(0,40)}{joinIntro.length > 40 ? '...' : ''}
                    </div>
                  </div>
                </div>
              )}

              {/* ── DONE ── */}
              {wizStep === 'done' && (
                <div style={{ textAlign:'center', padding:'20px 0 30px' }}>
                  <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
                  <div style={{ fontSize:18, fontFamily:FF, fontWeight:800, color:C.white, marginBottom:8 }}>
                    가입 신청 완료!
                  </div>
                  <div style={{ fontSize:13, fontFamily:FF, color:C.g[400], lineHeight:1.6, marginBottom:24 }}>
                    <strong style={{ color:lc }}>{crew.name}</strong>에 가입 신청했어요.
                    {crew.openToJoin
                      ? '\n크루장이 확인 후 수락하면 알림이 와요 😊'
                      : '\n심사 후 최대 3일 이내 결과를 알려드릴게요 ⏳'}
                  </div>
                  <div style={{ background:C.bg, border:'1px solid '+C.border, borderRadius:12,
                    padding:'14px 16px', textAlign:'left', marginBottom:20 }}>
                    <div style={{ fontSize:10, fontFamily:FF, fontWeight:700, color:C.g[500],
                      letterSpacing:'0.08em', marginBottom:8 }}>신청 요약</div>
                    {[
                      { label:'크루', value:crew.name },
                      { label:'가입 이유', value:joinReasons.join(', ') },
                      { label:'활동 시간', value:joinTimes.join(', ') },
                      { label:'모임 방식', value:joinMeetType },
                    ].map(function(row) {
                      return (
                        <div key={row.label} style={{ display:'flex', gap:8, marginBottom:6 }}>
                          <span style={{ fontSize:11, fontFamily:FF, color:C.g[500], width:70, flexShrink:0 }}>{row.label}</span>
                          <span style={{ fontSize:11, fontFamily:FF, color:C.white, flex:1 }}>{row.value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div onClick={function() { setJoined(true); closeWiz(); }}
                    style={{ background:lc, borderRadius:12, padding:'13px 0',
                      fontSize:14, fontFamily:FF, fontWeight:800, color:'#fff', cursor:'pointer' }}>
                    확인
                  </div>
                </div>
              )}

            </div>

            {/* 모달 하단 버튼 */}
            {wizStep !== 'done' && (
              <div style={{ padding:'16px 20px 0', flexShrink:0,
                borderTop:'1px solid '+C.border, display:'flex', gap:10 }}>
                {wizStep === 2 && (
                  <div onClick={function() { setWizStep(1); }}
                    style={{ flex:1, padding:'13px 0', borderRadius:12,
                      background:C.bg, border:'1px solid '+C.border,
                      fontSize:14, fontFamily:FF, fontWeight:700, color:C.g[400],
                      cursor:'pointer', textAlign:'center' }}>
                    이전
                  </div>
                )}
                <div
                  onClick={function() {
                    if (wizStep === 1 && canStep1) setWizStep(2);
                    else if (wizStep === 2 && canStep2) setWizStep('done');
                  }}
                  style={{ flex: wizStep === 2 ? 2 : 1, padding:'13px 0', borderRadius:12,
                    background: (wizStep === 1 ? canStep1 : canStep2) ? lc : C.g[700],
                    fontSize:14, fontFamily:FF, fontWeight:800,
                    color: (wizStep === 1 ? canStep1 : canStep2) ? '#fff' : C.g[500],
                    cursor: (wizStep === 1 ? canStep1 : canStep2) ? 'pointer' : 'default',
                    textAlign:'center', transition:'all 0.2s' }}>
                  {wizStep === 1 ? '다음 →' : '신청 완료 ✓'}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   이슈 탭
═══════════════════════════════════════════════════════ */
const ISSUE_DATA = [
  { id:1,  type:'지연',  status:'진행중',   urgent:true,
    title:'2호선 순환선 전체 5~15분 지연 운행',
    detail:'성수역 선로 점검으로 인해 외선·내선 순환 전 구간 지연 중. 우회 권장.',
    line:'2', stations:['성수','건대입구','잠실'],
    startTime:'07:43', duration:'약 40분째',
    affected:3241, likes:128, comments:34,
    tagColor:'#EF4444', statusColor:'#EF4444' },
  { id:2,  type:'혼잡',  status:'진행중',   urgent:true,
    title:'강남역 2호선 극혼잡 — 탑승 불가 수준',
    detail:'오전 출근 피크 겹침. 혼잡도 96%. 다음 열차 이용 또는 신분당선 환승 권장.',
    line:'2', stations:['강남'],
    startTime:'08:21', duration:'약 18분째',
    affected:1870, likes:89, comments:22,
    tagColor:'#F97316', statusColor:'#F97316' },
  { id:3,  type:'사고',  status:'모니터링', urgent:false,
    title:'4호선 동대문역사문화공원역 승강장 낙하물',
    detail:'낙하물 수거 완료, 운행 재개. 현재 모니터링 중.',
    line:'4', stations:['동대문역사문화공원'],
    startTime:'06:55', duration:'해결됨 (58분)',
    affected:622, likes:43, comments:17,
    tagColor:'#A78BFA', statusColor:'#22C55E' },
  { id:4,  type:'공사',  status:'예정',     urgent:false,
    title:'신분당선 판교~광교 선로 작업 (3/12 00:00~05:00)',
    detail:'심야 시간대 전 구간 임시 중단. 해당 시간 이용 불가.',
    line:'sin', stations:['판교','정자','미금','동천','수지구청','성복','광교중앙','광교'],
    startTime:'03-12', duration:'5시간',
    affected:0, likes:61, comments:28,
    tagColor:'#FCD34D', statusColor:'#FCD34D' },
  { id:5,  type:'민원',  status:'접수됨',   urgent:false,
    title:'5호선 여의도역 에스컬레이터 3번 고장 신고',
    detail:'여의도역 2번 출구 방향 에스컬레이터 점검 요청. 처리 예정.',
    line:'5', stations:['여의도'],
    startTime:'09:10', duration:'3시간째',
    affected:0, likes:12, comments:5,
    tagColor:'#60A5FA', statusColor:'#60A5FA' },
  { id:6,  type:'분실물', status:'진행중',  urgent:false,
    title:'2호선 홍대입구역 우산 습득 — 주인 찾습니다',
    detail:'홍대입구역 3번 출구 근처 유실물 보관함. 검정 접이식 우산.',
    line:'2', stations:['홍대입구'],
    startTime:'10:05', duration:'방금',
    affected:0, likes:7, comments:3,
    tagColor:'#6EE7B7', statusColor:'#6EE7B7' },
  { id:7,  type:'지연',  status:'해결됨',   urgent:false,
    title:'3호선 경복궁역 신호 장애 — 해결',
    detail:'10:22 복구 완료. 현재 정상 운행 중.',
    line:'3', stations:['경복궁'],
    startTime:'09:50', duration:'해결 (32분)',
    affected:840, likes:31, comments:9,
    tagColor:'#EF4444', statusColor:'#6B7280' },
];
const ISSUE_FILTER_CHIPS = ['전체','진행중','지연','혼잡','사고','공사','민원','분실물'];

function IssueTab() {
  const [chip, setChip] = React.useState('전체');
  const [expanded, setExpanded] = React.useState(null);

  const active   = ISSUE_DATA.filter(d => d.status === '진행중' || d.status === '모니터링' || d.status === '예정' || d.status === '접수됨');
  const resolved = ISSUE_DATA.filter(d => d.status === '해결됨');

  const filtered = (() => {
    if (chip === '전체')    return active;
    if (chip === '진행중')  return ISSUE_DATA.filter(d => d.status === '진행중');
    return active.filter(d => d.type === chip);
  })();

  const lineColor = id => C.line[id] ?? C.primary;

  const StatusBadge = ({ status, color }) => (
    <span style={{ fontSize:9, fontWeight:800, fontFamily:FF,
      color: color, background:`${color}18`,
      padding:'2px 7px', borderRadius:5, letterSpacing:'0.04em',
      border:`1px solid ${color}40` }}>
      {status === '진행중' ? '● 진행중' :
       status === '모니터링' ? '◉ 모니터링' :
       status === '해결됨' ? '✓ 해결됨' :
       status === '예정' ? '⏰ 예정' : status}
    </span>
  );

  const IssueCard = ({ item }) => {
    const lc = lineColor(item.line);
    const isOpen = expanded === item.id;
    return (
      <div onClick={() => setExpanded(isOpen ? null : item.id)}
        style={{ background:C.card, border:`1px solid ${item.urgent ? item.tagColor+'44' : C.border}`,
          borderRadius:16, overflow:'hidden', cursor:'pointer',
          boxShadow: item.urgent ? `0 0 0 1px ${item.tagColor}22` : 'none',
          transition:'all 0.2s' }}>

        {/* 상단 긴급 스트라이프 */}
        {item.urgent && (
          <div style={{ height:3,
            background:`linear-gradient(90deg, ${item.tagColor}, ${item.tagColor}88)` }} />
        )}

        <div style={{ padding:'14px 16px' }}>
          {/* 첫 줄: 호선 + 타입 + 상태 배지 */}
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:9 }}>
            <div style={{ width:20, height:20, borderRadius:10, background:lc,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:10, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>
              {item.line === 'sin' ? '신' : item.line}
            </div>
            <span style={{ fontSize:10, fontWeight:700, fontFamily:FF,
              color:item.tagColor, background:`${item.tagColor}15`,
              padding:'1px 7px', borderRadius:5, border:`1px solid ${item.tagColor}33` }}>
              {item.type}
            </span>
            <StatusBadge status={item.status} color={item.statusColor} />
            <span style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginLeft:'auto' }}>
              {item.startTime} · {item.duration}
            </span>
          </div>

          {/* 제목 */}
          <div style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF,
            lineHeight:1.4, letterSpacing:'-0.02em', marginBottom:7 }}>
            {item.title}
          </div>

          {/* 영향 구간 칩 */}
          {item.stations.length > 0 && (
            <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:9 }}>
              {item.stations.slice(0,4).map((s, i) => (
                <span key={i} style={{ fontSize:10, color:C.g[60], fontFamily:FF,
                  background:C.glass1, border:`1px solid ${C.border}`,
                  padding:'2px 8px', borderRadius:5 }}>
                  {s}
                </span>
              ))}
              {item.stations.length > 4 && (
                <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                  +{item.stations.length - 4}개 역
                </span>
              )}
            </div>
          )}

          {/* 펼쳐진 상세 내용 */}
          {isOpen && (
            <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${C.border}`,
              borderRadius:10, padding:'10px 12px', marginBottom:10 }}>
              <p style={{ fontSize:12, color:C.g[50], fontFamily:FF, lineHeight:1.65, margin:0 }}>
                {item.detail}
              </p>
            </div>
          )}

          {/* 하단: 영향 인원 + 좋아요/댓글 */}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            {item.affected > 0 && (
              <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                👤 {item.affected.toLocaleString()}명 영향
              </span>
            )}
            <div style={{ marginLeft:'auto', display:'flex', gap:12 }}>
              <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, display:'flex', alignItems:'center', gap:3 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.g[70]} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {item.likes}
              </span>
              <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, display:'flex', alignItems:'center', gap:3 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.g[70]} strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                {item.comments}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingBottom:80 }}>
      {/* ── 긴급 이슈 히어로 배너 ────────────────────── */}
      {active.filter(d => d.urgent).length > 0 && (
        <div style={{ margin:'0 0 20px',
          background:'linear-gradient(135deg,#7F1D1D 0%,#1a0a0a 100%)',
          borderBottom:`1px solid #EF444433` }}>
          <div style={{ padding:'16px 16px 6px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
              <span style={{ fontSize:11, fontWeight:800, color:'#FCA5A5', fontFamily:FF,
                letterSpacing:'0.1em' }}>⚡ LIVE ISSUE</span>
              <div style={{ flex:1, height:1, background:'rgba(239,68,68,0.3)' }} />
              <span style={{ fontSize:10, color:'#FCA5A5', fontFamily:FF }}>
                {active.filter(d=>d.urgent).length}건 진행 중
              </span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8, paddingBottom:14 }}>
              {active.filter(d => d.urgent).map(item => (
                <div key={item.id} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                  <div style={{ width:22, height:22, borderRadius:11, background:lineColor(item.line),
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0, marginTop:2 }}>
                    {item.line === 'sin' ? '신' : item.line}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:800, color:'#FEE2E2', fontFamily:FF,
                      lineHeight:1.35, marginBottom:3 }}>{item.title}</div>
                    <div style={{ fontSize:11, color:'rgba(254,226,226,0.6)', fontFamily:FF }}>
                      {item.startTime} 시작 · {item.duration}
                    </div>
                  </div>
                  <span style={{ fontSize:9, fontWeight:800, color:'#EF4444', fontFamily:FF,
                    background:'rgba(239,68,68,0.2)', padding:'3px 7px', borderRadius:5,
                    border:'1px solid rgba(239,68,68,0.4)', flexShrink:0 }}>진행중</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 필터 칩 ──────────────────────────────────── */}
      <div style={{ display:'flex', gap:7, padding:'0 16px', marginBottom:16,
        overflowX:'auto', scrollbarWidth:'none' }}>
        {ISSUE_FILTER_CHIPS.map(c => (
          <button key={c} onClick={() => setChip(c)}
            style={{ flexShrink:0, padding:'7px 14px', borderRadius:20, cursor:'pointer',
              fontSize:12, fontWeight:700, fontFamily:FF,
              border: chip===c ? 'none' : `1px solid ${C.border}`,
              background: chip===c ? C.primary : 'rgba(255,255,255,0.05)',
              color: chip===c ? '#fff' : C.g[60], transition:'all 0.15s' }}>
            {c}
          </button>
        ))}
      </div>

      {/* ── 이슈 카드 리스트 ─────────────────────────── */}
      <div style={{ padding:'0 16px', display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.length === 0 ? (
          <div style={{ padding:'40px 0', textAlign:'center' }}>
            <div style={{ fontSize:32, marginBottom:10 }}>🎉</div>
            <div style={{ fontSize:13, color:C.g[60], fontFamily:FF }}>현재 해당 이슈가 없어요</div>
          </div>
        ) : filtered.map(item => <IssueCard key={item.id} item={item} />)}
      </div>

      {/* ── 오늘 해결된 이슈 ─────────────────────────── */}
      {resolved.length > 0 && chip === '전체' && (
        <div style={{ margin:'24px 16px 0' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <span style={{ fontSize:10, fontWeight:700, color:'#22C55E', fontFamily:FF,
              letterSpacing:'0.08em' }}>✓ RESOLVED TODAY</span>
            <div style={{ flex:1, height:1, background:C.border }} />
            <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{resolved.length}건</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {resolved.map(item => (
              <div key={item.id} style={{ background:`${C.card}99`,
                border:`1px solid ${C.border}`, borderRadius:12,
                padding:'12px 14px', opacity:0.7,
                display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:20, height:20, borderRadius:10, background:lineColor(item.line),
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:10, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>
                  {item.line === 'sin' ? '신' : item.line}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                    whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginTop:2 }}>
                    {item.startTime} · {item.duration}
                  </div>
                </div>
                <span style={{ fontSize:9, fontWeight:700, color:'#22C55E', fontFamily:FF,
                  background:'rgba(34,197,94,0.12)', padding:'2px 7px', borderRadius:5,
                  border:'1px solid rgba(34,197,94,0.3)', flexShrink:0 }}>✓ 해결됨</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 이슈 제보하기 CTA ───────────────────────── */}
      <div style={{ margin:'20px 16px 0', padding:'14px 16px',
        background:'rgba(0,186,246,0.07)', border:`1px solid rgba(0,186,246,0.2)`,
        borderRadius:14, display:'flex', alignItems:'center', gap:12 }}>
        <span style={{ fontSize:24 }}>📢</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF,
            marginBottom:3 }}>이슈를 발견하셨나요?</div>
          <div style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>
            직접 제보하면 다른 이용자에게 빠르게 전달됩니다
          </div>
        </div>
        <button style={{ background:C.primary, border:'none', borderRadius:10,
          padding:'8px 14px', fontSize:12, fontWeight:800, color:'#fff',
          fontFamily:FF, cursor:'pointer', flexShrink:0 }}>
          제보하기
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   역 리뷰 전체 목록 화면  StationReviewListScreen
   ══════════════════════════════════════════════════════════ */
function StationReviewListScreen({ onBack, onWrite }) {
  var [selStation, setSelStation] = React.useState('전체');
  var [sortBy,     setSortBy]     = React.useState('popular');
  var [likedIds,   setLikedIds]   = React.useState(new Set());

  var STATION_FILTERS = [
    { id:'전체',       name:'전체',       lineId:'2', emoji:'🗺️' },
    { id:'myeongdong', name:'명동역',     lineId:'4', emoji:'🛍️' },
    { id:'hongdae',    name:'홍대입구역',  lineId:'2', emoji:'🎵' },
    { id:'seongsu',    name:'성수역',     lineId:'2', emoji:'☕' },
    { id:'itaewon',    name:'이태원역',   lineId:'6', emoji:'🌍' },
  ];
  var SORT_TABS = [
    { id:'popular', label:'인기순' },
    { id:'recent',  label:'최신순' },
    { id:'rating',  label:'별점순' },
  ];
  var stationMeta = {
    myeongdong: { name:'명동역',    lineId:'4', emoji:'🛍️' },
    hongdae:    { name:'홍대입구역', lineId:'2', emoji:'🎵' },
    seongsu:    { name:'성수역',     lineId:'2', emoji:'☕' },
    itaewon:    { name:'이태원역',   lineId:'6', emoji:'🌍' },
  };
  var kwMap = {
    myeongdong: ['인스타감성 🤳','현지인 맛집 🏠','힐링됨 🌿'],
    hongdae:    ['트렌디해 🔥','힐링됨 🌿','포포포 📸'],
    seongsu:    ['인스타감성 🤳','가성비 최고 💰','접근성 굿 👍'],
    itaewon:    ['트렌디해 🔥','뷰 맛집 🌃','현지인 맛집 🏠'],
  };
  var catLabels = ['교통','맛집','분위기','안전'];
  function getCatScoreRL(r, i) {
    var base = r.rating;
    var mod  = [0, (r.id % 2 === 0 ? -0.5 : 0.5), (r.id % 3 === 0 ? -1 : 0), (r.id % 2 === 0 ? 0.5 : -0.5)];
    return Math.max(1, Math.min(5, base + mod[i]));
  }
  function renderStarsRL(n) {
    return [1,2,3,4,5].map(function(i) {
      return <span key={i} style={{ fontSize:13, color: i <= n ? '#FFD700' : C.g[30] }}>★</span>;
    });
  }

  var allRevs = typeof STATION_REVIEWS !== 'undefined' ? STATION_REVIEWS : [];
  var filtered = allRevs.filter(function(r) {
    return selStation === '전체' || r.stationId === selStation;
  });
  if (sortBy === 'popular') filtered = filtered.slice().sort(function(a,b){ return b.likes - a.likes; });
  else if (sortBy === 'recent') filtered = filtered.slice().sort(function(a,b){ return b.id - a.id; });
  else if (sortBy === 'rating') filtered = filtered.slice().sort(function(a,b){ return b.rating - a.rating; });

  var baseSet  = selStation === '전체' ? allRevs : allRevs.filter(function(r){ return r.stationId === selStation; });
  var avgScore = baseSet.length > 0
    ? (baseSet.reduce(function(s,r){ return s + r.rating; }, 0) / baseSet.length).toFixed(1)
    : '0.0';

  function toggleLikeRL(id) {
    setLikedIds(function(prev) {
      var next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  var activeMeta = selStation === '전체' ? { lineId:'2' } : (stationMeta[selStation] || { lineId:'2' });
  var headerLc   = C.line[activeMeta.lineId] || C.primary;

  return (
    <div style={{ background:C.bg, minHeight:'100%', display:'flex', flexDirection:'column' }}>

      {/* ── 헤더 ── */}
      <div style={{ position:'sticky', top:0, zIndex:50,
        background:C.bg, borderBottom:'1px solid ' + C.border }}>
        <div style={{ display:'flex', alignItems:'center', padding:'0 4px', height:56 }}>
          <button onClick={onBack} style={{ background:'none', border:'none',
            cursor:'pointer', padding:'8px 12px', color:C.white }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.primary,
              letterSpacing:'0.1em', fontFamily:FF, textTransform:'uppercase' }}>
              STATION REVIEW
            </div>
            <div style={{ fontSize:16, fontWeight:900, color:C.white,
              fontFamily:FF, letterSpacing:'-0.03em', lineHeight:1.1 }}>
              역 리뷰 전체 보기
            </div>
          </div>
          {onWrite && (
            <button onClick={onWrite} style={{ margin:'0 12px', padding:'7px 14px',
              borderRadius:9, cursor:'pointer', background:headerLc + '20',
              border:'1px solid ' + headerLc + '50' }}>
              <span style={{ fontSize:11, fontWeight:700, color:headerLc, fontFamily:FF }}>
                ✏️ 후기 쓰기
              </span>
            </button>
          )}
        </div>

        {/* ── 역 필터 칩 ── */}
        <div style={{ display:'flex', gap:8, padding:'0 16px 12px',
          overflowX:'auto', scrollbarWidth:'none' }}>
          {STATION_FILTERS.map(function(sf) {
            var isActive = selStation === sf.id;
            var lc2 = C.line[sf.lineId] || C.primary;
            return (
              <button key={sf.id} onClick={function(){ setSelStation(sf.id); }}
                style={{ flexShrink:0, padding:'6px 14px', borderRadius:20,
                  border: isActive ? '1.5px solid ' + lc2 : '1px solid ' + C.border,
                  background: isActive ? lc2 + '20' : C.card, cursor:'pointer' }}>
                <span style={{ fontSize:12, fontWeight: isActive ? 700 : 500,
                  color: isActive ? lc2 : C.g[60], fontFamily:FF }}>
                  {sf.id !== '전체' && sf.emoji + ' '}{sf.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── 정렬 탭 + 통계 ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'0 16px 10px' }}>
          <div style={{ display:'flex', gap:0, background:C.card,
            borderRadius:10, padding:'3px', border:'1px solid ' + C.border }}>
            {SORT_TABS.map(function(st) {
              var isAct = sortBy === st.id;
              return (
                <button key={st.id} onClick={function(){ setSortBy(st.id); }}
                  style={{ padding:'5px 12px', borderRadius:8,
                    background: isAct ? C.white : 'transparent',
                    border:'none', cursor:'pointer' }}>
                  <span style={{ fontSize:11, fontWeight: isAct ? 700 : 500,
                    color: isAct ? '#0E0F14' : C.g[60], fontFamily:FF }}>
                    {st.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <span style={{ fontSize:12, color:C.g[60], fontFamily:FF }}>총 {filtered.length}건</span>
            <div style={{ width:1, height:10, background:C.border }}/>
            <span style={{ fontSize:12, fontWeight:700, color:'#FFD700', fontFamily:FF }}>★ {avgScore}</span>
          </div>
        </div>
      </div>

      {/* ── 리뷰 카드 목록 ── */}
      <div style={{ flex:1, overflowY:'auto', padding:'12px 16px 120px',
        scrollbarWidth:'none' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📝</div>
            <div style={{ fontSize:16, fontWeight:700, color:C.white, fontFamily:FF, marginBottom:8 }}>
              아직 후기가 없어요
            </div>
            <div style={{ fontSize:13, color:C.g[60], fontFamily:FF, marginBottom:24 }}>
              첫 후기를 남겨보세요!
            </div>
            {onWrite && (
              <button onClick={onWrite} style={{ padding:'12px 28px', borderRadius:12,
                background:headerLc, border:'none', cursor:'pointer' }}>
                <span style={{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:FF }}>
                  후기 쓰기
                </span>
              </button>
            )}
          </div>
        ) : (
          filtered.map(function(r, ridx) {
            var meta    = stationMeta[r.stationId] || { name:r.stationId, lineId:'2', emoji:'🚇' };
            var lc2     = C.line[meta.lineId] || C.primary;
            var kws     = kwMap[r.stationId] || [];
            var isLiked = likedIds.has(r.id);
            var photoEmojis = ['🍜','🏪','☕','🍺','🛍️','🌃'];
            var photoCount  = ridx % 3 === 0 ? 2 : ridx % 2 === 0 ? 1 : 0;
            return (
              <div key={r.id} style={{ background:C.card, borderRadius:18,
                border:'1px solid ' + C.border, marginBottom:14, overflow:'hidden' }}>

                {/* 컬러 밴드 */}
                <div style={{ height:5, background:'linear-gradient(90deg, ' + lc2 + ', ' + lc2 + '60)' }}/>

                <div style={{ padding:'14px 16px 0' }}>
                  {/* 역 배지 + 날짜 + 별점 */}
                  <div style={{ display:'flex', alignItems:'center',
                    justifyContent:'space-between', marginBottom:10 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:4,
                        padding:'3px 8px', borderRadius:8,
                        background:lc2 + '18', border:'1px solid ' + lc2 + '30' }}>
                        <span style={{ fontSize:11 }}>{meta.emoji}</span>
                        <span style={{ fontSize:10, fontWeight:700, color:lc2, fontFamily:FF }}>
                          {meta.name}
                        </span>
                      </div>
                      <span style={{ fontSize:10, color:C.g[50], fontFamily:FF }}>{r.date}</span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:2 }}>
                      {renderStarsRL(r.rating)}
                      <span style={{ fontSize:11, fontWeight:700, color:C.white,
                        marginLeft:4, fontFamily:FF }}>{r.rating}.0</span>
                    </div>
                  </div>

                  {/* 사용자 정보 */}
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                    <div style={{ width:34, height:34, borderRadius:'50%',
                      background:lc2 + '30', border:'1.5px solid ' + lc2 + '50',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:18, flexShrink:0 }}>
                      {r.flag}
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                        {r.nick}
                      </div>
                      <div style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>
                        {r.flag} {r.country}
                      </div>
                    </div>
                  </div>

                  {/* 본문 */}
                  <div style={{ fontSize:13, color:C.g[80], fontFamily:FF,
                    lineHeight:1.65, marginBottom:12,
                    display:'-webkit-box', WebkitLineClamp:4,
                    WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {r.content}
                  </div>

                  {/* 카테고리 미니 점수 */}
                  <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
                    {catLabels.map(function(cat, ci) {
                      var score = getCatScoreRL(r, ci);
                      return (
                        <div key={cat} style={{ display:'flex', alignItems:'center',
                          gap:5, flex:'0 0 calc(50% - 4px)' }}>
                          <span style={{ fontSize:10, color:C.g[60], fontFamily:FF,
                            width:28, flexShrink:0 }}>{cat}</span>
                          <div style={{ flex:1, height:4, background:C.border,
                            borderRadius:2, overflow:'hidden' }}>
                            <div style={{ height:'100%', width: (score/5*100) + '%',
                              background:'linear-gradient(90deg, ' + lc2 + ', ' + lc2 + '80)',
                              borderRadius:2 }}/>
                          </div>
                          <span style={{ fontSize:10, fontWeight:700, color:lc2,
                            fontFamily:FF, width:18, textAlign:'right', flexShrink:0 }}>
                            {score.toFixed(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* 키워드 태그 */}
                  {kws.length > 0 && (
                    <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:12 }}>
                      {kws.map(function(kw, ki) {
                        return (
                          <span key={ki} style={{ fontSize:11, color:lc2, fontFamily:FF,
                            padding:'3px 9px', borderRadius:12,
                            background:lc2 + '14', border:'1px solid ' + lc2 + '30' }}>
                            {kw}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* 장소 태그 */}
                  {r.spots && r.spots.length > 0 && (
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:12 }}>
                      {r.spots.map(function(sp, si) {
                        return (
                          <span key={si} style={{ fontSize:11, color:C.g[60], fontFamily:FF,
                            padding:'3px 8px', borderRadius:8,
                            background:C.bg, border:'1px solid ' + C.border }}>
                            📍 {sp}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 하단 바 */}
                <div style={{ display:'flex', alignItems:'center',
                  justifyContent:'space-between', padding:'10px 16px 14px',
                  borderTop:'1px solid ' + C.border, marginTop:4 }}>
                  {/* 사진 썸네일 mock */}
                  <div style={{ display:'flex', gap:5 }}>
                    {Array.from({ length: photoCount }).map(function(_,pi) {
                      return (
                        <div key={pi} style={{ width:40, height:40, borderRadius:8,
                          background:C.bg, border:'1px solid ' + C.border,
                          display:'flex', alignItems:'center',
                          justifyContent:'center', fontSize:20 }}>
                          {photoEmojis[(r.id + pi) % photoEmojis.length]}
                        </div>
                      );
                    })}
                  </div>
                  {/* 좋아요 버튼 */}
                  <button onClick={function(){ toggleLikeRL(r.id); }}
                    style={{ display:'flex', alignItems:'center', gap:5,
                      background: isLiked ? lc2 + '18' : 'transparent',
                      border: isLiked ? '1px solid ' + lc2 + '40' : '1px solid ' + C.border,
                      borderRadius:20, padding:'6px 12px', cursor:'pointer' }}>
                    <span style={{ fontSize:14 }}>{isLiked ? '♥' : '♡'}</span>
                    <span style={{ fontSize:11, fontWeight:700,
                      color: isLiked ? lc2 : C.g[60], fontFamily:FF }}>
                      도움이 됐어요 {r.likes + (isLiked ? 1 : 0)}
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── 하단 플로팅 후기 쓰기 버튼 ── */}
      {onWrite && (
        <div style={{ position:'fixed', bottom:80, left:'50%',
          transform:'translateX(-50%)', zIndex:60 }}>
          <button onClick={onWrite}
            style={{ padding:'13px 32px', borderRadius:30,
              background:'linear-gradient(135deg, ' + headerLc + ', ' + headerLc + 'cc)',
              border:'none', cursor:'pointer',
              boxShadow:'0 4px 20px ' + headerLc + '60' }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#fff', fontFamily:FF }}>
              ✏️ 역 후기 쓰기
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function PopularTab({ onCrewDetail, onPostDetail, onReviewList }) {
  const [activeChip,    setActiveChip]    = useState('전체');
  const [bannerIdx,     setBannerIdx]     = useState(0);
  const [showAllPosts,  setShowAllPosts]  = useState(false);

  const lineColor = id => C.line[id] ?? C.primary;
  const shortName = id => {
    const m = {'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','sin':'신'};
    return m[id] ?? id;
  };
  const congColor = pct => pct >= 90 ? '#EF4444' : pct >= 75 ? '#F59E0B' : pct >= 60 ? '#F0A500' : C.primary;

  /* 섹션 헤더 공용 컴포넌트 */
  const SecHead2 = ({ label, title, action, onAction }) => (
    <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between',
      padding:'0 16px', marginBottom:14 }}>
      <div>
        {label && (
          <div style={{ fontSize:10, fontWeight:700, color:C.primary,
            letterSpacing:'0.1em', fontFamily:FF, textTransform:'uppercase', marginBottom:4 }}>
            {label}
          </div>
        )}
        <b style={{ fontSize:18, fontWeight:900, color:C.white, fontFamily:FF,
          letterSpacing:'-0.04em', lineHeight:1.1 }}>{title}</b>
      </div>
      {action && (
        <span onClick={onAction || undefined}
          style={{ fontSize:11, color:C.g[70], fontFamily:FF, cursor:'pointer',
          display:'flex', alignItems:'center', gap:1, paddingBottom:3 }}>
          {action}<span style={{ fontSize:12, marginLeft:2 }}>›</span>
        </span>
      )}
    </div>
  );

  const visiblePosts = showAllPosts ? HOT_POSTS : HOT_POSTS.slice(0,4);

  return (
    <div style={{ paddingBottom:40 }}>

      {/* ══ ① TODAY PICK 히어로 배너 캐러셀 ═══════════════════ */}
      <div style={{ padding:'16px 16px 4px' }}>
        {/* 배너 본체 */}
        <div style={{ borderRadius:18, overflow:'hidden', position:'relative',
          background: TODAY_BANNERS[bannerIdx].bg, minHeight:158,
          cursor:'pointer' }}>
          {/* 배경 이모지 워터마크 */}
          <div style={{ position:'absolute', right:-8, bottom:-12,
            fontSize:110, opacity:0.12, pointerEvents:'none',
            userSelect:'none', lineHeight:1 }}>
            {TODAY_BANNERS[bannerIdx].emoji}
          </div>
          {/* 우상단 뱃지 */}
          <div style={{ position:'absolute', top:16, right:16,
            background:'rgba(255,255,255,0.18)', backdropFilter:'blur(8px)',
            padding:'4px 10px', borderRadius:20,
            fontSize:10, fontWeight:800, color:'#fff', fontFamily:FF }}>
            {TODAY_BANNERS[bannerIdx].badge}
          </div>
          {/* 텍스트 블록 */}
          <div style={{ padding:'22px 20px 22px', position:'relative', zIndex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
              <span style={{ fontSize:9, fontWeight:900, color:'#fff',
                letterSpacing:'0.15em', background:'rgba(255,255,255,0.22)',
                padding:'3px 9px', borderRadius:4, fontFamily:FF }}>
                {TODAY_BANNERS[bannerIdx].label}
              </span>
              <span style={{ fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:FF }}>
                {TODAY_BANNERS[bannerIdx].tag}
              </span>
            </div>
            <div style={{ fontSize:24, fontWeight:900, color:'#fff', fontFamily:FF,
              letterSpacing:'-0.045em', lineHeight:1.2, marginBottom:10,
              whiteSpace:'pre-line' }}>
              {TODAY_BANNERS[bannerIdx].title}
            </div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.6)', fontFamily:FF }}>
              {TODAY_BANNERS[bannerIdx].sub}
            </div>
          </div>
        </div>
        {/* 배너 탭 도트 */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center',
          gap:6, marginTop:10 }}>
          {TODAY_BANNERS.map((_, i) => (
            <div key={i} onClick={() => setBannerIdx(i)}
              style={{ height:4, borderRadius:2, cursor:'pointer', transition:'all 0.3s ease',
                width: i===bannerIdx ? 20 : 4,
                background: i===bannerIdx ? C.primary : 'rgba(255,255,255,0.18)' }} />
          ))}
        </div>
      </div>

      {/* ══ ② 탐색 필터 칩 ═══════════════════════════════════ */}
      <div style={{ display:'flex', gap:7, padding:'12px 16px 0',
        overflowX:'auto', scrollbarWidth:'none' }}>
        {POPULAR_CHIPS.map(chip => {
          const on = chip === activeChip;
          return (
            <button key={chip} onClick={() => setActiveChip(chip)}
              style={{ flexShrink:0, padding:'7px 14px', borderRadius:22,
                fontSize:12, fontWeight: on ? 800 : 500, fontFamily:FF,
                background: on ? C.primary : 'rgba(255,255,255,0.05)',
                color: on ? '#fff' : C.g[60],
                border: on ? 'none' : `1px solid ${C.border}`,
                cursor:'pointer', transition:'all 0.2s', letterSpacing:'-0.01em' }}>
              {chip}
            </button>
          );
        })}
      </div>

      {/* ── 섹션 구분선 ────────────────────────────────────── */}
      <div style={{ height:28 }} />

      {/* ══ ③ 지금 인기 게시글 — 2열 카드 그리드 ═══════════ */}
      <SecHead2 label="TRENDING NOW" title="지금 인기 게시글" action="전체보기" />

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:'10px', padding:'0 16px' }}>
        {visiblePosts.map(p => {
          const lc = lineColor(p.lineId);
          return (
            <div key={p.id}
              onClick={() => onPostDetail && onPostDetail(p)}
              style={{ background:C.card, borderRadius:14, overflow:'hidden',
                cursor:'pointer', border:`1px solid ${C.border}`,
                transition:'transform 0.15s' }}>

              {/* ── 썸네일 이미지 영역 (무신사 상품 이미지 대응) ── */}
              <div style={{ height:96, background:p.thumb, position:'relative',
                display:'flex', alignItems:'flex-start', justifyContent:'space-between',
                padding:'8px 8px 0' }}>
                {/* 호선 원형 뱃지 */}
                <div style={{ width:22, height:22, borderRadius:11, background:lc,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:9, fontWeight:900, color:'#fff', flexShrink:0 }}>
                  {shortName(p.lineId)}
                </div>
                {/* 공감 수 (우상단) */}
                <div style={{ display:'flex', alignItems:'center', gap:2,
                  background:'rgba(0,0,0,0.35)', borderRadius:10, padding:'2px 7px' }}>
                  <span style={{ fontSize:9, color:'#fff' }}>♥</span>
                  <span style={{ fontSize:9, fontWeight:700, color:'#fff', fontFamily:FF }}>
                    {p.likes}
                  </span>
                </div>
                {/* 순위 워터마크 */}
                <div style={{ position:'absolute', left:7, bottom:6,
                  fontSize:28, fontWeight:900, color:'rgba(255,255,255,0.2)',
                  fontFamily:FF, letterSpacing:'-0.06em', lineHeight:1,
                  userSelect:'none' }}>
                  {String(p.rank).padStart(2,'0')}
                </div>
              </div>

              {/* ── 텍스트 정보 (무신사 상품 정보 대응) ── */}
              <div style={{ padding:'10px 10px 12px' }}>
                {/* 태그 (브랜드명 대응) */}
                <span style={{ fontSize:9, fontWeight:800, color:p.tagColor,
                  fontFamily:FF, display:'block', marginBottom:4,
                  letterSpacing:'0.02em' }}>
                  # {p.tag}
                </span>
                {/* 제목 (상품명 대응) */}
                <div style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF,
                  lineHeight:1.45, letterSpacing:'-0.02em', marginBottom:8,
                  display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical',
                  overflow:'hidden' }}>
                  {p.title}
                </div>
                {/* 작성자 + 댓글 수 (가격 영역 대응) */}
                <div style={{ display:'flex', alignItems:'center',
                  justifyContent:'space-between' }}>
                  <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                    @{p.writer}
                  </span>
                  <span style={{ fontSize:10, color:C.g[80], fontFamily:FF }}>
                    💬 {p.comments}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 더보기 버튼 (무신사 "더보기" 버튼 대응) */}
      <div onClick={() => setShowAllPosts(v => !v)}
        style={{ margin:'10px 16px 0', padding:'13px 0', textAlign:'center',
          background:'rgba(255,255,255,0.04)', border:`1px solid ${C.border}`,
          borderRadius:10, cursor:'pointer' }}>
        <span style={{ fontSize:12, fontWeight:700, color:C.g[60], fontFamily:FF }}>
          {showAllPosts ? '접기 ▲' : '게시글 더보기 +'}
        </span>
      </div>

      {/* ── 무신사 추천 배너 스트립 (컬러 풀위드 배너) ────── */}
      <div style={{ margin:'28px 16px 0', borderRadius:14, overflow:'hidden',
        background:`linear-gradient(100deg, ${C.primary}20 0%, rgba(0,186,246,0.08) 100%)`,
        border:`1px solid ${C.primary}30`, padding:'16px 18px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        cursor:'pointer' }}>
        <div>
          <div style={{ fontSize:10, fontWeight:800, color:C.primary,
            letterSpacing:'0.1em', fontFamily:FF, marginBottom:4 }}>
            WEEKLY PICK
          </div>
          <div style={{ fontSize:14, fontWeight:900, color:C.white, fontFamily:FF,
            letterSpacing:'-0.03em' }}>
            이번 주 가장 화제인 역은?
          </div>
          <div style={{ fontSize:11, color:C.g[60], fontFamily:FF, marginTop:3 }}>
            강남역 · 2호선 · 게시글 142개
          </div>
        </div>
        <div style={{ width:48, height:48, borderRadius:24,
          background:C.line['2'],
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:20, fontWeight:900, color:'#fff', fontFamily:FF,
          boxShadow:`0 4px 16px ${C.line['2']}50` }}>
          2
        </div>
      </div>

      {/* ── 섹션 구분선 ────────────────────────────────────── */}
      <div style={{ height:32 }} />

      {/* ══ ④ 지금 뜨는 역 — 가로 스크롤 카드 ═════════════ */}
      <SecHead2 label="HOT STATION" title="지금 뜨는 역" />
      <div style={{ display:'flex', gap:10, padding:'0 16px',
        overflowX:'auto', scrollbarWidth:'none' }}>
        {HOT_STATIONS.map((st, i) => {
          const lc = lineColor(st.lineId);
          const hc = st.heat >= 90 ? '#EF4444' : st.heat >= 75 ? '#F59E0B' : C.primary;
          const isFst = i === 0;
          return (
            <div key={i}
              style={{ flexShrink:0, width:115,
                background: isFst
                  ? `linear-gradient(160deg,${hc}22 0%,${C.card} 100%)`
                  : C.card,
                border:`1px solid ${isFst ? `${hc}50` : C.border}`,
                borderRadius:16, padding:'14px 13px 16px', cursor:'pointer',
                position:'relative', overflow:'hidden' }}>
              {/* 히트 바 (하단 게이지) */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3,
                background:C.glass1 }}>
                <div style={{ height:'100%', width:`${st.heat}%`,
                  background:`linear-gradient(90deg,${hc},${hc}70)` }} />
              </div>
              {/* 배지 */}
              <span style={{ fontSize:9, fontWeight:800, color:hc,
                background:`${hc}1E`, padding:'2px 7px', borderRadius:3,
                fontFamily:FF, display:'inline-block', marginBottom:12 }}>
                {st.badge}
              </span>
              {/* 호선 원 */}
              <div style={{ width:34, height:34, borderRadius:17,
                background:lc, marginBottom:8,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontSize:13, fontWeight:900, fontFamily:FF,
                boxShadow: isFst ? `0 3px 10px ${lc}50` : 'none' }}>
                {shortName(st.lineId)}
              </div>
              <div style={{ fontSize:13, fontWeight:800, color:C.white,
                fontFamily:FF, letterSpacing:'-0.025em', marginBottom:2 }}>
                {st.station}
              </div>
              <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                게시글 {st.posts}개
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 섹션 구분선 ────────────────────────────────────── */}
      <div style={{ height:32 }} />

      {/* ══ ⑤ 실시간 검색어 — 5+5 두 컬럼 ═════════════════ */}
      <div style={{ padding:'0 16px' }}>
        <SecHead2 label="REALTIME" title="실시간 검색어"
          action={`${new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})} 기준`} />
        <div style={{ background:C.card, border:`1px solid ${C.border}`,
          borderRadius:14, overflow:'hidden' }}>
          {/* 헤더 바 */}
          <div style={{ background:'rgba(255,255,255,0.03)', padding:'8px 14px',
            borderBottom:`1px solid ${C.border}`,
            display:'flex', gap:2 }}>
            <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
              아하철 실시간 인기 검색어
            </span>
          </div>
          {/* 두 컬럼 그리드 */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
            {[HOT_KEYWORDS.slice(0,5), HOT_KEYWORDS.slice(5,10)].map((col, ci) => (
              <div key={ci}
                style={{ borderRight: ci === 0 ? `1px solid ${C.border}` : 'none' }}>
                {col.map((kw, ri) => (
                  <div key={kw.rank}
                    style={{ display:'flex', alignItems:'center', gap:9,
                      padding:'11px 14px',
                      borderBottom: ri < 4 ? `1px solid ${C.border}` : 'none',
                      cursor:'pointer',
                      background: kw.rank <= 3 ? `${C.primary}05` : 'transparent' }}>
                    {/* 순위 번호 */}
                    <span style={{ fontSize:13, fontWeight:900, fontFamily:FF,
                      minWidth:18, letterSpacing:'-0.02em',
                      color: kw.rank <= 3 ? C.primary : C.g[70] }}>
                      {kw.rank}
                    </span>
                    {/* 키워드 */}
                    <span style={{ flex:1, fontSize:11,
                      fontWeight: kw.rank <= 3 ? 700 : 400,
                      color: kw.rank <= 3 ? C.white : C.g[50],
                      fontFamily:FF, overflow:'hidden',
                      textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {kw.word}
                    </span>
                    {/* 변동 인디케이터 */}
                    {kw.change === 'new'  && (
                      <span style={{ fontSize:8, fontWeight:900, color:'#EF4444',
                        background:'rgba(239,68,68,0.15)', padding:'1px 4px',
                        borderRadius:2, fontFamily:FF, flexShrink:0 }}>N</span>
                    )}
                    {kw.change === 'up'   && (
                      <span style={{ fontSize:9, color:'#22C55E', fontWeight:700,
                        flexShrink:0 }}>▲</span>
                    )}
                    {kw.change === 'down' && (
                      <span style={{ fontSize:9, color:'#EF4444', fontWeight:700,
                        flexShrink:0 }}>▼</span>
                    )}
                    {kw.change === 'same' && (
                      <span style={{ fontSize:9, color:C.g[80], flexShrink:0 }}>─</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 섹션 구분선 ────────────────────────────────────── */}
      <div style={{ height:32 }} />

      {/* ══ ⑥ 인기 역 리뷰 ════════════════════════════════ */}
      {(function() {
        /* STATION_REVIEWS 정렬: 좋아요 내림차순 */
        var sorted = typeof STATION_REVIEWS !== 'undefined'
          ? STATION_REVIEWS.slice().sort(function(a,b){ return b.likes - a.likes; })
          : [];
        var featured  = sorted[0];
        var restCards = sorted.slice(1, 7);

        /* 역별 메타 (호선 색·이름) */
        var stationMeta = {
          myeongdong: { name:'명동역',    lineId:'4', emoji:'🛍️' },
          hongdae:    { name:'홍대입구역', lineId:'2', emoji:'🎵' },
          seongsu:    { name:'성수역',     lineId:'2', emoji:'☕' },
          itaewon:    { name:'이태원역',   lineId:'6', emoji:'🌍' },
        };

        /* 역 키워드 뱃지 목록 */
        var kwMap = {
          myeongdong: ['인스타감성 🤳','현지인 맛집 🏠','힐링됨 🌿'],
          hongdae:    ['트렌디해 🔥','힐링됨 🌿','포포포 📸'],
          seongsu:    ['인스타감성 🤳','가성비 최고 💰','접근성 굿 👍'],
          itaewon:    ['트렌디해 🔥','뷰 맛집 🌃','현지인 맛집 🏠'],
        };

        if (!featured) return null;

        var featMeta = stationMeta[featured.stationId] ?? { name:featured.stationId, lineId:'2', emoji:'🚇' };
        var featLc   = lineColor(featMeta.lineId);
        var featKws  = kwMap[featured.stationId] ?? [];

        return (
          <div>
            <SecHead2 label="POPULAR REVIEW" title="인기 역 리뷰" action="전체 보기 ›" onAction={onReviewList} />

            {/* ── 피처드 리뷰 카드 (1위) ── */}
            <div style={{ margin:'0 16px 16px',
              background:`linear-gradient(145deg, ${featLc}20 0%, ${C.card} 55%)`,
              border:`1px solid ${featLc}40`, borderRadius:18, overflow:'hidden',
              position:'relative' }}>

              {/* 상단 스테이션 배너 */}
              <div style={{ background:`linear-gradient(90deg, ${featLc}55 0%, ${featLc}22 100%)`,
                padding:'12px 16px', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:30, height:30, borderRadius:15, background:featLc,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0,
                  boxShadow:`0 0 10px ${featLc}80` }}>
                  {shortName(featMeta.lineId)}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:900, color:C.white, fontFamily:FF,
                    letterSpacing:'-0.03em' }}>{featMeta.name}</div>
                  <div style={{ fontSize:10, color:featLc, fontFamily:FF, fontWeight:600 }}>
                    {featMeta.emoji} 이번 주 베스트 리뷰
                  </div>
                </div>
                {/* 1위 왕관 */}
                <span style={{ marginLeft:'auto', fontSize:22, opacity:0.85 }}>👑</span>
              </div>

              <div style={{ padding:'14px 16px' }}>
                {/* 작성자 + 별점 */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                  <div style={{ width:40, height:40, borderRadius:20,
                    background:`${featLc}25`, border:`1.5px solid ${featLc}50`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:20, flexShrink:0 }}>
                    {featured.flag}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                        {featured.nick}
                      </span>
                      <span style={{ fontSize:10, color:featLc, fontWeight:600,
                        background:`${featLc}18`, padding:'1px 7px', borderRadius:4, fontFamily:FF }}>
                        {featured.country}
                      </span>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
                      {[1,2,3,4,5].map(function(i) {
                        return <span key={i} style={{ fontSize:13,
                          color: i <= featured.rating ? '#F59E0B' : 'rgba(255,255,255,0.1)' }}>★</span>;
                      })}
                      <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{featured.date}</span>
                    </div>
                  </div>
                  <div style={{ textAlign:'center', background:'rgba(245,158,11,0.12)',
                    border:'1px solid rgba(245,158,11,0.3)', borderRadius:10, padding:'6px 10px' }}>
                    <div style={{ fontSize:20, fontWeight:900, color:'#F59E0B',
                      fontFamily:FF, lineHeight:1 }}>{featured.rating}.0</div>
                    <div style={{ fontSize:8, color:'rgba(245,158,11,0.6)', fontFamily:FF }}>/ 5.0</div>
                  </div>
                </div>

                {/* 키워드 */}
                <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                  {featKws.map(function(k) {
                    return (
                      <span key={k} style={{ fontSize:10, color:featLc,
                        background:`${featLc}15`, padding:'3px 10px', borderRadius:20,
                        fontFamily:FF, fontWeight:600, border:`1px solid ${featLc}30` }}>
                        {k}
                      </span>
                    );
                  })}
                </div>

                {/* 리뷰 본문 */}
                <div style={{ fontSize:13, color:C.g[50], lineHeight:1.7,
                  fontFamily:FF, marginBottom:12,
                  display:'-webkit-box', WebkitLineClamp:3,
                  WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  "{featured.content}"
                </div>

                {/* 추천 장소 */}
                {featured.spots && featured.spots.length > 0 && (
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:12 }}>
                    {featured.spots.map(function(s) {
                      return (
                        <span key={s} style={{ fontSize:10, color:C.g[60],
                          background:'rgba(255,255,255,0.05)',
                          padding:'3px 9px', borderRadius:4, fontFamily:FF,
                          border:`1px solid ${C.border}` }}>📍 {s}</span>
                      );
                    })}
                  </div>
                )}

                {/* 좋아요 */}
                <div style={{ display:'flex', alignItems:'center', gap:6,
                  paddingTop:10, borderTop:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:11, color:C.primary, fontFamily:FF, fontWeight:700,
                    display:'flex', alignItems:'center', gap:4 }}>
                    <span style={{ fontSize:14 }}>♥</span> {featured.likes}
                  </span>
                  <span style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginLeft:8 }}>
                    {featured.likes}명이 도움받았어요
                  </span>
                </div>
              </div>
            </div>

            {/* ── 나머지 리뷰 가로 스크롤 카드 ── */}
            <div style={{ display:'flex', gap:10, padding:'0 16px',
              overflowX:'auto', scrollbarWidth:'none' }}>
              {restCards.map(function(r) {
                var meta = stationMeta[r.stationId] ?? { name:r.stationId, lineId:'2', emoji:'🚇' };
                var lc2  = lineColor(meta.lineId);
                var kws  = (kwMap[r.stationId] ?? []).slice(0,2);
                return (
                  <div key={r.id} style={{ flexShrink:0, width:165,
                    background:C.card, border:`1px solid ${C.border}`,
                    borderRadius:14, overflow:'hidden', cursor:'pointer' }}>

                    {/* 역 컬러 헤더 */}
                    <div style={{ background:`linear-gradient(90deg, ${lc2}45, ${lc2}18)`,
                      padding:'9px 12px', display:'flex', alignItems:'center', gap:7 }}>
                      <div style={{ width:20, height:20, borderRadius:10, background:lc2,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>
                        {shortName(meta.lineId)}
                      </div>
                      <span style={{ fontSize:11, fontWeight:700, color:C.white,
                        fontFamily:FF, overflow:'hidden', textOverflow:'ellipsis',
                        whiteSpace:'nowrap', flex:1 }}>{meta.name}</span>
                    </div>

                    <div style={{ padding:'10px 12px' }}>
                      {/* 유저 + 별점 한 줄 */}
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
                        <span style={{ fontSize:16 }}>{r.flag}</span>
                        <span style={{ fontSize:11, fontWeight:700, color:C.white,
                          fontFamily:FF, overflow:'hidden', textOverflow:'ellipsis',
                          whiteSpace:'nowrap', flex:1 }}>{r.nick}</span>
                      </div>

                      {/* 별점 */}
                      <div style={{ display:'flex', alignItems:'center', gap:3, marginBottom:7 }}>
                        {[1,2,3,4,5].map(function(i) {
                          return <span key={i} style={{ fontSize:10,
                            color: i <= r.rating ? '#F59E0B' : 'rgba(255,255,255,0.1)' }}>★</span>;
                        })}
                        <span style={{ fontSize:10, fontWeight:700, color:'#F59E0B',
                          fontFamily:FF, marginLeft:2 }}>{r.rating}.0</span>
                      </div>

                      {/* 키워드 태그 */}
                      <div style={{ display:'flex', gap:4, flexWrap:'wrap', marginBottom:8 }}>
                        {kws.map(function(k) {
                          return (
                            <span key={k} style={{ fontSize:9, color:lc2,
                              background:`${lc2}15`, padding:'2px 7px', borderRadius:20,
                              fontFamily:FF, fontWeight:600,
                              border:`1px solid ${lc2}30`,
                              whiteSpace:'nowrap', overflow:'hidden',
                              textOverflow:'ellipsis', maxWidth:100 }}>{k}</span>
                          );
                        })}
                      </div>

                      {/* 본문 2줄 클램프 */}
                      <div style={{ fontSize:11, color:C.g[60], lineHeight:1.6,
                        fontFamily:FF, marginBottom:8,
                        display:'-webkit-box', WebkitLineClamp:2,
                        WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                        {r.content}
                      </div>

                      {/* 좋아요 */}
                      <div style={{ display:'flex', alignItems:'center', gap:4,
                        paddingTop:8, borderTop:`1px solid ${C.border}` }}>
                        <span style={{ fontSize:11, color:C.primary }}>♥</span>
                        <span style={{ fontSize:10, fontWeight:700, color:C.g[60],
                          fontFamily:FF }}>{r.likes}</span>
                        <span style={{ fontSize:9, color:C.g[80], fontFamily:FF,
                          marginLeft:'auto' }}>{r.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 더 보기 카드 */}
              <div onClick={onReviewList} style={{ flexShrink:0, width:130,
                background:`${C.primary}0A`, border:`1.5px dashed ${C.primary}40`,
                borderRadius:14, display:'flex', flexDirection:'column',
                alignItems:'center', justifyContent:'center', gap:8,
                cursor:'pointer', padding:'20px 12px' }}>
                <div style={{ width:36, height:36, borderRadius:18,
                  background:`${C.primary}20`, border:`1px solid ${C.primary}40`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:18 }}>📝</div>
                <div style={{ fontSize:11, fontWeight:700, color:C.primary, fontFamily:FF,
                  textAlign:'center', lineHeight:1.4 }}>역 후기<br/>더 보기</div>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 5h8M5 1l4 4-4 4" stroke={C.primary} strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── 섹션 구분선 ────────────────────────────────────── */}
      <div style={{ height:32 }} />

      {/* ══ ⑦ 이주의 크루 TOP 5 ════════════════════════════ */}
      <div style={{ padding:'0 16px' }}>
        <SecHead2 label="THIS WEEK" title="이주의 크루 TOP 5" />

        {/* 1위 피처드 카드 (무신사 featured 상품 대응) */}
        {(() => {
          const u  = TOP_USERS[0];
          const lc = lineColor(u.lineId);
          return (
            <div onClick={() => onCrewDetail && onCrewDetail(CREW_LIST[0])}
              style={{ background:`linear-gradient(135deg,${C.primary}1A 0%,${C.card} 65%)`,
              border:`1px solid ${C.primary}35`, borderRadius:16,
              padding:'18px 16px', marginBottom:8,
              cursor:'pointer', position:'relative', overflow:'hidden' }}>
              {/* 왕관 워터마크 */}
              <span style={{ position:'absolute', right:12, top:8,
                fontSize:48, opacity:0.09, pointerEvents:'none' }}>👑</span>
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                {/* 아바타 + 왕관 */}
                <div style={{ position:'relative', flexShrink:0 }}>
                  <div style={{ width:50, height:50, borderRadius:25,
                    background:`${lc}30`, border:`2px solid ${C.primary}`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:18, fontWeight:900, color:lc, fontFamily:FF }}>
                    {u.nick[0]}
                  </div>
                  <div style={{ position:'absolute', top:-9, left:'50%',
                    transform:'translateX(-50%)', fontSize:14 }}>👑</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  {/* 닉네임 + 뱃지 */}
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                    <span style={{ fontSize:15, fontWeight:900,
                      color:C.white, fontFamily:FF }}>{u.nick}</span>
                    <span style={{ fontSize:9, fontWeight:700, color:C.primary,
                      background:`${C.primary}18`, padding:'2px 6px',
                      borderRadius:3, fontFamily:FF }}>{u.badge}</span>
                  </div>
                  {/* 역 정보 */}
                  <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:10 }}>
                    <div style={{ width:13, height:13, borderRadius:7, background:lc,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:6, fontWeight:900, color:'#fff' }}>
                      {shortName(u.lineId)}
                    </div>
                    <span style={{ fontSize:10, color:C.g[60], fontFamily:FF }}>
                      {u.station}
                    </span>
                  </div>
                  {/* 통계 */}
                  <div style={{ display:'flex', gap:18 }}>
                    <div>
                      <span style={{ fontSize:15, fontWeight:900,
                        color:C.white, fontFamily:FF }}>{u.posts}</span>
                      <span style={{ fontSize:10, color:C.g[70],
                        fontFamily:FF, marginLeft:3 }}>게시글</span>
                    </div>
                    <div>
                      <span style={{ fontSize:15, fontWeight:900,
                        color:C.white, fontFamily:FF }}>{u.followers.toLocaleString()}</span>
                      <span style={{ fontSize:10, color:C.g[70],
                        fontFamily:FF, marginLeft:3 }}>팔로워</span>
                    </div>
                  </div>
                </div>
                {/* 1위 원형 뱃지 */}
                <div style={{ width:32, height:32, borderRadius:16,
                  background:C.primary, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:14, fontWeight:900,
                    color:'#fff', fontFamily:FF }}>1</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* 2~5위 리스트 */}
        <div style={{ background:C.card, border:`1px solid ${C.border}`,
          borderRadius:12, overflow:'hidden' }}>
          {TOP_USERS.slice(1).map((u, i) => {
            const lc = lineColor(u.lineId);
            const rankColors = ['#C0C0C0','#CD7F32','#74757C','#74757C'];
            return (
              <div key={u.rank}
                onClick={() => onCrewDetail && onCrewDetail(CREW_LIST[(u.rank-1) % CREW_LIST.length])}
                style={{ display:'flex', alignItems:'center', gap:11,
                  padding:'12px 14px',
                  borderBottom: i < 3 ? `1px solid ${C.border}` : 'none',
                  cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:900, fontFamily:FF,
                  color:rankColors[i], minWidth:18 }}>
                  {u.rank}
                </span>
                <div style={{ width:34, height:34, borderRadius:17,
                  background:`${lc}22`, border:`1.5px solid ${lc}45`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:800, color:lc, fontFamily:FF,
                  flexShrink:0 }}>
                  {u.nick[0]}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.white,
                    fontFamily:FF, marginBottom:2 }}>{u.nick}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:3 }}>
                    <div style={{ width:11, height:11, borderRadius:6, background:lc,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:6, fontWeight:900, color:'#fff' }}>
                      {shortName(u.lineId)}
                    </div>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                      {u.station}
                    </span>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize:9, fontWeight:700, color:C.g[60],
                    background:C.glass2, padding:'2px 7px',
                    borderRadius:3, fontFamily:FF }}>{u.badge}</span>
                </div>
                <div style={{ textAlign:'right', minWidth:40 }}>
                  <div style={{ fontSize:12, fontWeight:700,
                    color:C.g[50], fontFamily:FF }}>
                    {u.followers.toLocaleString()}
                  </div>
                  <div style={{ fontSize:9, color:C.g[80], fontFamily:FF }}>팔로워</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   매칭 상세 화면 컴포넌트
═══════════════════════════════════════════════════════ */

function MatchDetailScreen({ user, onBack, onChat, onMatch, isMatched }) {
  const [matched,    setMatched]    = React.useState(isMatched ?? false);
  const [msgSent,    setMsgSent]    = React.useState(false);
  const [reportOpen, setReportOpen] = React.useState(false);

  const lineColor = id => C.line[id] ?? C.primary;
  const station   = MEETUP_STATIONS?.find(s => s.id === user.stationId);
  const lc        = lineColor(station?.lineId ?? '2');

  /* 이 유저가 작성한 후기 필터 */
  const userReviews = (typeof STATION_REVIEWS !== 'undefined')
    ? STATION_REVIEWS.filter(r => r.nick === user.nick).slice(0, 2)
    : [];

  const INTEREST_COLORS = {
    '쇼핑':'#F472B6','한식':'#F59E0B','카페':'#A78BFA','코스메틱':'#EC4899',
    '사진':'#60A5FA','길거리음식':'#F97316','야경':'#818CF8','버스킹':'#34D399',
    '클럽':'#F43F5E','빈티지샵':'#D97706','팝업스토어':'#06B6D4','브런치':'#84CC16',
    '글로벌푸드':'#6366F1','바':'#8B5CF6','음악':'#EC4899','롯데월드':'#EF4444',
    '한강':'#06B6D4','치킨':'#F59E0B','삼겹살':'#EF4444','노래방':'#A78BFA',
    '커피':'#D97706','아트':'#8B5CF6','K-POP':'#F472B6','칵테일바':'#818CF8',
    '떡볶이':'#F97316','뷰티':'#EC4899','타코':'#F59E0B','맥주':'#FBBF24',
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden' }}>

      {/* ── 헤더 ──────────────────────────────── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px' }}>
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex:1, fontSize:14, fontWeight:800, color:C.white,
            fontFamily:FF, letterSpacing:'-0.02em' }}>매칭 프로필</div>
          {/* 신고 버튼 */}
          <button onClick={() => setReportOpen(v => !v)}
            style={{ width:40, height:40, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer',
              marginRight:4, position:'relative' }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke={C.g[50]} strokeWidth="2">
              <circle cx="12" cy="5" r="1" fill={C.g[50]}/>
              <circle cx="12" cy="12" r="1" fill={C.g[50]}/>
              <circle cx="12" cy="19" r="1" fill={C.g[50]}/>
            </svg>
            {reportOpen && (
              <div style={{ position:'absolute', top:44, right:0,
                background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:'4px 0', minWidth:120,
                boxShadow:'0 8px 24px rgba(0,0,0,0.4)', zIndex:300 }}>
                {['프로필 공유','차단하기','신고하기'].map((item, i) => (
                  <div key={i} onClick={() => setReportOpen(false)}
                    style={{ padding:'11px 16px', fontSize:13, fontFamily:FF,
                      color: item==='신고하기' ? '#EF4444' : C.g[50],
                      cursor:'pointer',
                      borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* ── 스크롤 본문 ────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none' }}
        onClick={() => setReportOpen(false)}>

        {/* ── 프로필 히어로 ────────────────────── */}
        <div style={{ background:`linear-gradient(160deg,${lc}18 0%,${C.bg} 100%)`,
          padding:'24px 20px 20px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            {/* 아바타 */}
            <div style={{ position:'relative' }}>
              <div style={{ width:72, height:72, borderRadius:36,
                background:`${lc}28`, border:`2.5px solid ${lc}66`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:32, flexShrink:0 }}>
                {user.flag}
              </div>
              {/* 성별 배지 */}
              <div style={{ position:'absolute', bottom:-2, right:-2,
                width:22, height:22, borderRadius:11,
                background: user.gender==='F' ? '#F472B6' : '#60A5FA',
                border:`2px solid ${C.bg}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11 }}>
                {user.gender==='F' ? '♀' : '♂'}
              </div>
            </div>
            {/* 기본 정보 */}
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                <span style={{ fontSize:20, fontWeight:900, color:C.white,
                  fontFamily:FF, letterSpacing:'-0.03em' }}>{user.nick}</span>
                {matched && (
                  <span style={{ fontSize:10, fontWeight:800, color:C.primary,
                    background:`${C.primary}1A`, padding:'2px 8px', borderRadius:6,
                    border:`1px solid ${C.primary}44`, fontFamily:FF }}>
                    ✓ 매칭됨
                  </span>
                )}
              </div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:12, color:C.g[50], fontFamily:FF }}>
                  {user.country} · {user.age}세
                </span>
              </div>
            </div>
          </div>

          {/* 자기 소개 */}
          <div style={{ background:C.glass1,
            border:`1px solid ${C.border}`, borderRadius:12,
            padding:'12px 14px', marginBottom:14 }}>
            <p style={{ fontSize:13, color:C.g[40], fontFamily:FF, lineHeight:1.7,
              margin:0 }}>
              "{user.bio}"
            </p>
          </div>

          {/* 관심사 태그 */}
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {user.interests.map((int, i) => {
              const ic = INTEREST_COLORS[int] ?? C.primary;
              return (
                <span key={i} style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                  color:ic, background:`${ic}18`,
                  padding:'4px 10px', borderRadius:20,
                  border:`1px solid ${ic}40` }}>
                  {int}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── 방문 예정 정보 ───────────────────── */}
        <div style={{ margin:'16px 20px 0', background:C.card,
          border:`1px solid ${C.border}`, borderRadius:14,
          padding:'16px', overflow:'hidden', position:'relative' }}>
          {/* 배경 데코 */}
          <div style={{ position:'absolute', right:-10, top:-10,
            fontSize:64, opacity:0.06 }}>{station?.emoji ?? '🚇'}</div>
          <div style={{ fontSize:11, fontWeight:800, color:C.g[60], fontFamily:FF,
            letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:10 }}>
            방문 예정 일정
          </div>
          <div style={{ display:'flex', gap:10 }}>
            {/* 역 */}
            <div style={{ flex:1, background:'rgba(255,255,255,0.04)',
              border:`1px solid ${C.border}`, borderRadius:10,
              padding:'10px 12px', textAlign:'center' }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{station?.emoji ?? '🚇'}</div>
              <div style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF,
                marginBottom:2 }}>{station?.name ?? user.stationId}</div>
              <div style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>방문 역</div>
            </div>
            {/* 날짜 */}
            <div style={{ flex:1, background:'rgba(255,255,255,0.04)',
              border:`1px solid ${C.border}`, borderRadius:10,
              padding:'10px 12px', textAlign:'center' }}>
              <div style={{ fontSize:18, marginBottom:4 }}>📅</div>
              <div style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF,
                marginBottom:2 }}>{user.date}</div>
              <div style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>날짜</div>
            </div>
            {/* 시간 */}
            <div style={{ flex:1, background:'rgba(255,255,255,0.04)',
              border:`1px solid ${C.border}`, borderRadius:10,
              padding:'10px 12px', textAlign:'center' }}>
              <div style={{ fontSize:18, marginBottom:4 }}>🕐</div>
              <div style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF,
                marginBottom:2 }}>{user.time}</div>
              <div style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>시간</div>
            </div>
          </div>
        </div>

        {/* ── 이 사람의 역 후기 ─────────────────── */}
        {userReviews.length > 0 && (
          <div style={{ margin:'18px 20px 0' }}>
            <div style={{ fontSize:11, fontWeight:800, color:C.g[50], fontFamily:FF,
              letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:10 }}>
              {user.nick}님의 역 후기
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {userReviews.map((rv, i) => (
                <div key={i} style={{ background:C.card,
                  border:`1px solid ${C.border}`, borderRadius:12, padding:'12px 14px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                    <span style={{ fontSize:11, color:'#FBBF24', fontFamily:FF }}>
                      {'★'.repeat(rv.rating)}{'☆'.repeat(5-rv.rating)}
                    </span>
                    <span style={{ fontSize:10, color:C.g[70], fontFamily:FF,
                      marginLeft:'auto' }}>{rv.date}</span>
                  </div>
                  <p style={{ fontSize:12, color:C.g[50], fontFamily:FF,
                    lineHeight:1.65, margin:'0 0 8px 0' }}>
                    {rv.content.slice(0,100)}{rv.content.length > 100 ? '...' : ''}
                  </p>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    {rv.spots?.slice(0,3).map((sp, j) => (
                      <span key={j} style={{ fontSize:9, color:C.g[70], fontFamily:FF,
                        background:C.glass1,
                        border:`1px solid ${C.border}`,
                        padding:'2px 7px', borderRadius:5 }}>📍{sp}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 안전 안내 ─────────────────────────── */}
        <div style={{ margin:'16px 20px 0', padding:'10px 14px',
          background:'rgba(251,191,36,0.07)', border:`1px solid rgba(251,191,36,0.2)`,
          borderRadius:10 }}>
          <div style={{ fontSize:11, color:'#FBBF24', fontFamily:FF, lineHeight:1.65,
            fontWeight:600 }}>
            🛡️ 안전 팁 — 첫 만남은 공공장소에서, 개인 정보 공유에 주의하세요.
          </div>
        </div>

        <div style={{ height:100 }} />
      </div>

      {/* ── 하단 CTA ─────────────────────────────── */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        padding:'12px 20px calc(12px + env(safe-area-inset-bottom,16px))',
        background:'linear-gradient(to top, #0E0F14 65%, transparent)' }}>
        <div style={{ display:'flex', gap:10 }}>
          {/* 채팅 버튼 */}
          <button
            onClick={() => { setMsgSent(true); onChat && onChat(user); }}
            style={{ flex:1, padding:'13px 0', borderRadius:13, cursor:'pointer',
              fontSize:13, fontWeight:800, fontFamily:FF,
              background: msgSent ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.1)',
              color: msgSent ? C.g[60] : C.white,
              border:`1px solid ${msgSent ? C.border : 'rgba(255,255,255,0.2)'}`,
              transition:'all 0.2s' }}>
            {msgSent ? '✓ 메시지 전송됨' : '💬 채팅 보내기'}
          </button>
          {/* 매칭 신청 버튼 */}
          <button
            onClick={() => { setMatched(v => !v); onMatch && onMatch(user); }}
            style={{ flex:1.4, padding:'13px 0', borderRadius:13, cursor:'pointer',
              fontSize:13, fontWeight:900, fontFamily:FF,
              background: matched ? 'rgba(255,255,255,0.06)' : C.primary,
              color: matched ? C.g[50] : '#fff',
              border: matched ? `1px solid ${C.border}` : 'none',
              transition:'all 0.2s' }}>
            {matched ? '✓ 매칭 신청 완료' : '🤝 매칭 신청하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   역 인연 매칭 — 데이터
   ═══════════════════════════════════════════════════════ */

const MEETUP_STATIONS = [
  { id:'myeongdong', name:'명동역',    lineId:'4',   emoji:'🛍️',  desc:'쇼핑·길거리 음식 성지',    foreigners:892, vibe:['쇼핑','먹거리','야경'] },
  { id:'hongdae',    name:'홍대입구역',lineId:'2',   emoji:'🎨',  desc:'카페·클럽·버스킹 허브',     foreigners:724, vibe:['카페','나이트','아트'] },
  { id:'seongsu',    name:'성수역',    lineId:'2',   emoji:'✨',  desc:'힙한 팝업·브런치 카페',     foreigners:531, vibe:['팝업','브런치','포토'] },
  { id:'itaewon',    name:'이태원역',  lineId:'6',   emoji:'🌍',  desc:'다문화·글로벌 레스토랑',    foreigners:678, vibe:['글로벌푸드','바','문화'] },
  { id:'gangnam',    name:'강남역',    lineId:'2',   emoji:'💎',  desc:'트렌드 쇼핑·루프탑 카페',  foreigners:489, vibe:['쇼핑','카페','트렌드'] },
  { id:'jamsil',     name:'잠실역',    lineId:'2',   emoji:'🎡',  desc:'롯데월드·한강 피크닉',     foreigners:412, vibe:['놀이공원','한강','쇼핑'] },
  { id:'sinchon',    name:'신촌역',    lineId:'2',   emoji:'🍻',  desc:'대학가·저렴한 술자리',     foreigners:298, vibe:['술','먹거리','대학가'] },
];

const MEETUP_USERS = [
  // 명동
  { id:1,  nick:'Mei Lin',    flag:'🇨🇳', country:'중국',    age:24, stationId:'myeongdong', date:'3/10',  time:'오후 2시', interests:['쇼핑','한식','카페'], bio:'명동에서 같이 쇼핑하고 삼겹살 먹을 친구 구해요! 한국어 조금 해요 😊', gender:'F', matched:false },
  { id:2,  nick:'Hina',       flag:'🇯🇵', country:'일본',    age:22, stationId:'myeongdong', date:'3/10',  time:'오전 11시',interests:['코스메틱','떡볶이','사진'], bio:'코스메틱 쇼핑 같이 갈 친구! 인생샷 찍어줄게요📸', gender:'F', matched:false },
  { id:3,  nick:'Lucas W.',   flag:'🇺🇸', country:'미국',    age:27, stationId:'myeongdong', date:'3/11',  time:'오후 4시', interests:['길거리음식','야경','바'], bio:'Street food tour in Myeongdong! Anyone want to join?', gender:'M', matched:false },
  { id:4,  nick:'Sophie',     flag:'🇫🇷', country:'프랑스',  age:25, stationId:'hongdae',    date:'3/10',  time:'오후 6시', interests:['카페','빈티지샵','버스킹'], bio:'홍대 카페 투어 같이 할 사람~ 프랑스어도 가르쳐줄게요', gender:'F', matched:false },
  { id:5,  nick:'Tanaka K.',  flag:'🇯🇵', country:'일본',    age:29, stationId:'hongdae',    date:'3/11',  time:'오후 8시', interests:['클럽','칵테일바','K-POP'], bio:'홍대 클럽 같이 갈 분 구합니다! 일본어·한국어 가능', gender:'M', matched:false },
  { id:6,  nick:'Aom',        flag:'🇹🇭', country:'태국',    age:23, stationId:'seongsu',    date:'3/12',  time:'오전 10시',interests:['팝업스토어','브런치','포토'], bio:'성수 팝업 투어 같이 해요! 인스타 맞팔해요🌸', gender:'F', matched:false },
  { id:7,  nick:'James P.',   flag:'🇦🇺', country:'호주',    age:31, stationId:'seongsu',    date:'3/12',  time:'오후 1시', interests:['커피','아트','빈티지'], bio:'Looking for a local guide around Seongsu! Coffee lover ☕', gender:'M', matched:false },
  { id:8,  nick:'Linh N.',    flag:'🇻🇳', country:'베트남',  age:21, stationId:'itaewon',    date:'3/10',  time:'오후 7시', interests:['글로벌푸드','바','클럽'], bio:'이태원에서 저녁 같이 먹을 친구요! 무조건 맛있는 곳 감', gender:'F', matched:false },
  { id:9,  nick:'Carlos M.',  flag:'🇲🇽', country:'멕시코',  age:26, stationId:'itaewon',    date:'3/13',  time:'오후 5시', interests:['타코','맥주','음악'], bio:'Let\'s explore Itaewon bars together! Vamos 🎉', gender:'M', matched:false },
  { id:10, nick:'Wei Chen',   flag:'🇨🇳', country:'중국',    age:28, stationId:'gangnam',    date:'3/11',  time:'오후 3시', interests:['쇼핑','카페','뷰티'], bio:'강남에서 쇼핑+카페 투어! 한국 뷰티 꿀팁 알려드림', gender:'M', matched:false },
  { id:11, nick:'Emma L.',    flag:'🇬🇧', country:'영국',    age:24, stationId:'jamsil',     date:'3/14',  time:'오후 12시',interests:['롯데월드','한강','치킨'], bio:'Lotte World + Han River picnic! Who\'s in? 🎡', gender:'F', matched:false },
  { id:12, nick:'Yuki S.',    flag:'🇯🇵', country:'일본',    age:20, stationId:'sinchon',    date:'3/10',  time:'오후 6시', interests:['삼겹살','술','노래방'], bio:'신촌에서 삼겹살+소맥+노래방 세트 같이 할 분!🎤', gender:'F', matched:false },
];

const STATION_REVIEWS = [
  // 명동
  { id:1, stationId:'myeongdong', nick:'Mei Lin',   flag:'🇨🇳', country:'중국',   rating:5, date:'3월 1주', content:'명동 완전 좋아요! 길거리 음식이 너무 맛있고 화장품도 싸게 살 수 있어요. 특히 버터맥주 강추! 저녁 야경도 너무 예뻐서 시간 가는 줄 몰랐어요 😍', spots:['명동교자','올리브영 명동 플래그십','명동 야시장'], likes:47, liked:false },
  { id:2, stationId:'myeongdong', nick:'Sophie',    flag:'🇫🇷', country:'프랑스', rating:4, date:'2월 4주', content:'Paris와 느낌이 비슷해요! 거리가 활기차고 음식이 다양해요. 근데 주말엔 정말 많이 붐벼요. 평일 오전 추천합니다. 탕후루 꼭 드세요!', spots:['탕후루 명동점','눈스퀘어','밀리오레'], likes:32, liked:false },
  { id:3, stationId:'myeongdong', nick:'Lucas W.',  flag:'🇺🇸', country:'미국',   rating:5, date:'3월 1주', content:'Best street food experience ever! The dumplings and egg bread were amazing. Bought tons of skincare products too. Will definitely come back!', spots:['명동 왕만두','계란빵 노점','이니스프리 명동'], likes:28, liked:false },
  // 홍대
  { id:4, stationId:'hongdae',    nick:'Tanaka K.', flag:'🇯🇵', country:'일본',   rating:5, date:'3월 1주', content:'홍대는 도쿄 시모키타자와 느낌이에요. 버스킹 문화가 너무 좋고 카페들이 개성 넘쳐요. 클럽 거리는 밤 11시 이후가 진짜 핫합니다 🔥', spots:['버스킹 광장','프라이데이 클럽','앤트러사이트 홍대'], likes:61, liked:false },
  { id:5, stationId:'hongdae',    nick:'Aom',       flag:'🇹🇭', country:'태국',   rating:4, date:'2월 3주', content:'홍대 카페 투어 했는데 너무 힐링됐어요! 각 카페마다 컨셉이 달라서 하루종일 돌아다녔어요. 카페 크라쉬 강력 추천합니다 ☕', spots:['카페 크라쉬','베이커리 inthebox','무신사 스탠다드 홍대'], likes:39, liked:false },
  // 성수
  { id:6, stationId:'seongsu',    nick:'Emma L.',   flag:'🇬🇧', country:'영국',   rating:5, date:'3월 1주', content:'Seongsu is Seoul\'s Brooklyn! The industrial-chic cafes are gorgeous. Went to 3 popup stores in one day. So many photo spots, my camera roll is full 📸', spots:['성수연방','대림창고','카페 언더스탠드애비뉴'], likes:54, liked:false },
  { id:7, stationId:'seongsu',    nick:'James P.',  flag:'🇦🇺', country:'호주',   rating:4, date:'2월 4주', content:'Perfect spot for coffee lovers and art enthusiasts. The converted warehouse cafes are unique. A bit pricey but totally worth it for the experience.', spots:['어니언 성수','블루보틀 성수','팝업 라운드어바웃'], likes:41, liked:false },
  // 이태원
  { id:8, stationId:'itaewon',    nick:'Carlos M.', flag:'🇲🇽', country:'멕시코', rating:5, date:'3월 2주', content:'이태원은 서울 속 세계 여행! 정통 타코부터 중동 음식까지 다 있어요. 해밀턴 호텔 옆 바 거리는 꼭 가보세요. 밤 분위기 최고 🌙', spots:['이태원 타코벨','녹사평 카페 거리','해밀턴 바 거리'], likes:38, liked:false },
  { id:9, stationId:'itaewon',    nick:'Linh N.',   flag:'🇻🇳', country:'베트남', rating:4, date:'3월 1주', content:'이태원 세계 음식 투어 완료! 베트남 쌀국수도 있어서 향수 달랬어요 ㅎㅎ 클럽 문화도 체험했는데 서울 최고 느낌이에요', spots:['이태원 포 베트남','녹사평역 카페','펍 크롤'], likes:29, liked:false },
];

/* ── 국적 목록 (필터용) ─────────────────────────── */
const ALL_COUNTRIES = [...new Set(MEETUP_USERS.map(u => u.country))];

/* ══════════════════════════════════════════════════════════
   역 인연 매칭 — 모집 글 작성 화면
   ══════════════════════════════════════════════════════════ */

const INTEREST_OPTIONS = [
  '쇼핑','한식','카페','길거리음식','술/바','클럽','나이트',
  '야경','사진/포토','K-POP','팝업스토어','브런치','빈티지샵',
  '노래방','치킨','맛집탐방','한강','문화/전시','뷰티','스포츠',
];

const DATE_OPTIONS = (() => {
  const opts = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    const label = i === 0 ? '오늘' : i === 1 ? '내일'
      : `${d.getMonth()+1}/${d.getDate()}`;
    const dayNames = ['일','월','화','수','목','금','토'];
    opts.push({ label, day: dayNames[d.getDay()], value: `${d.getMonth()+1}/${d.getDate()}` });
  }
  return opts;
})();

const TIME_OPTIONS = [
  '오전 9시','오전 10시','오전 11시',
  '오후 12시','오후 1시','오후 2시','오후 3시',
  '오후 4시','오후 5시','오후 6시','오후 7시',
  '오후 8시','오후 9시','오후 10시',
];

function MeetupWriteScreen({ onBack, defaultStation, onSubmit }) {
  /* ── 폼 상태 ─── */
  const [selStation,    setSelStation]    = useState(defaultStation ?? 'myeongdong');
  const [selDate,       setSelDate]       = useState(DATE_OPTIONS[0].value);
  const [selTime,       setSelTime]       = useState('오후 2시');
  const [selInterests,  setSelInterests]  = useState([]);
  const [bio,           setBio]           = useState('');
  const [gender,        setGender]        = useState('선택 안 함');
  const [showNation,    setShowNation]    = useState(true);
  const [submitted,     setSubmitted]     = useState(false);
  const [step,          setStep]          = useState(1); // 1~3 단계

  const station = MEETUP_STATIONS.find(s => s.id === selStation);
  const lc      = C.line[station.lineId] ?? C.primary;
  const shortLine = id => ({'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','sin':'신'})[id] ?? id;

  const toggleInterest = v => setSelInterests(prev =>
    prev.includes(v) ? prev.filter(x => x !== v) : prev.length < 5 ? [...prev, v] : prev
  );

  const canNext1 = selStation && selDate && selTime;
  const canNext2 = selInterests.length >= 1;
  const canSubmit = bio.trim().length >= 10;

  /* ── 완료 화면 ─── */
  if (submitted) {
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center',
        background:C.bg, padding:'0 32px', textAlign:'center' }}>
        <div style={{ fontSize:64, marginBottom:24 }}>🎉</div>
        <div style={{ fontSize:22, fontWeight:900, color:C.white, fontFamily:FF,
          letterSpacing:'-0.03em', marginBottom:10 }}>
          모집 글이 올라갔어요!
        </div>
        <div style={{ fontSize:13, color:C.g[60], fontFamily:FF, lineHeight:1.6, marginBottom:8 }}>
          {station.name}에서 같이 놀 친구를 구하고 있어요.
        </div>
        <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:32 }}>
          <span style={{ fontSize:12, color:lc, fontWeight:700, fontFamily:FF,
            background:`${lc}18`, padding:'4px 12px', borderRadius:6 }}>
            {selDate} {selTime}
          </span>
          {selInterests.slice(0,3).map(t => (
            <span key={t} style={{ fontSize:11, color:C.g[60], fontFamily:FF,
              background:C.glass2, padding:'3px 9px', borderRadius:4 }}>
              #{t}
            </span>
          ))}
        </div>
        <button onClick={onBack}
          style={{ width:'100%', maxWidth:280, padding:'14px 0', borderRadius:12,
            background:C.primary, border:'none', cursor:'pointer',
            fontSize:14, fontWeight:800, color:'#fff', fontFamily:FF, marginBottom:12 }}>
          목록으로 돌아가기
        </button>
        <button onClick={() => { setSubmitted(false); setStep(1); setBio(''); setSelInterests([]); }}
          style={{ background:'transparent', border:'none', cursor:'pointer',
            fontSize:12, color:C.g[70], fontFamily:FF }}>
          다시 작성하기
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.bg, overflow:'hidden' }}>

      {/* ── 헤더 ─────────────────────────────────── */}
      <div style={{ position:'sticky', top:0, zIndex:200,
        background:'rgba(14,15,20,0.97)', backdropFilter:'blur(12px)',
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', gap:12, padding:'0 16px' }}>
            <button onClick={onBack}
              style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:10,
                width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', fontSize:16, color:C.white, flexShrink:0 }}>←</button>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em' }}>친구 모집 글 작성</div>
            </div>
            {/* 단계 표시 */}
            <div style={{ display:'flex', gap:5, alignItems:'center' }}>
              {[1,2,3].map(s => (
                <div key={s} style={{ width: s === step ? 18 : 6, height:6, borderRadius:3,
                  background: s < step ? C.keyColor : s === step ? C.primary : 'rgba(255,255,255,0.15)',
                  transition:'all 0.2s' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none' }}>

        {/* ══════ STEP 1 — 역 · 일정 ══════════════ */}
        {step === 1 && (
          <div style={{ padding:'24px 16px' }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.primary, fontFamily:FF,
                letterSpacing:'0.05em', marginBottom:6 }}>STEP 1 / 3</div>
              <div style={{ fontSize:20, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em', lineHeight:1.3 }}>
                어디서 만날까요?
              </div>
              <div style={{ fontSize:12, color:C.g[60], fontFamily:FF, marginTop:6 }}>
                역과 만날 일정을 선택해주세요
              </div>
            </div>

            {/* 역 선택 */}
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
                marginBottom:12, letterSpacing:'0.02em' }}>📍 역 선택</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                {MEETUP_STATIONS.map(s => {
                  const act = s.id === selStation;
                  const slc = C.line[s.lineId] ?? C.primary;
                  return (
                    <div key={s.id} onClick={() => setSelStation(s.id)}
                      style={{ padding:'12px 14px', borderRadius:12, cursor:'pointer',
                        background: act ? `${slc}18` : C.card,
                        border:`1.5px solid ${act ? slc : C.border}`,
                        display:'flex', alignItems:'center', gap:10,
                        transition:'all 0.15s' }}>
                      <div style={{ width:32, height:32, borderRadius:16,
                        background: act ? slc : `${slc}25`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:14, flexShrink:0 }}>
                        {s.emoji}
                      </div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight: act ? 800 : 600,
                          color: act ? C.white : C.g[50], fontFamily:FF,
                          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                          {s.name}
                        </div>
                        <div style={{ fontSize:9, color: act ? slc : C.g[80], fontFamily:FF }}>
                          {MEETUP_USERS.filter(u=>u.stationId===s.id).length}명 모집 중
                        </div>
                      </div>
                      {act && (
                        <div style={{ marginLeft:'auto', width:18, height:18, borderRadius:9,
                          background:slc, flexShrink:0,
                          display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ fontSize:10, color:'#fff' }}>✓</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 날짜 선택 */}
            <div style={{ marginBottom:24 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
                marginBottom:12, letterSpacing:'0.02em' }}>📅 날짜</div>
              <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none',
                paddingBottom:4 }}>
                {DATE_OPTIONS.map(d => {
                  const act = selDate === d.value;
                  return (
                    <div key={d.value} onClick={() => setSelDate(d.value)}
                      style={{ flexShrink:0, padding:'10px 14px', borderRadius:10,
                        cursor:'pointer', textAlign:'center', minWidth:56,
                        background: act ? C.primary : C.card,
                        border:`1.5px solid ${act ? C.primary : C.border}`,
                        transition:'all 0.15s' }}>
                      <div style={{ fontSize:9, color: act ? 'rgba(255,255,255,0.7)' : C.g[70],
                        fontFamily:FF, marginBottom:2 }}>{d.day}</div>
                      <div style={{ fontSize:12, fontWeight:800,
                        color: act ? '#fff' : C.g[50], fontFamily:FF }}>{d.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 시간 선택 */}
            <div style={{ marginBottom:32 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
                marginBottom:12, letterSpacing:'0.02em' }}>🕐 시간</div>
              <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                {TIME_OPTIONS.map(t => {
                  const act = selTime === t;
                  return (
                    <div key={t} onClick={() => setSelTime(t)}
                      style={{ padding:'7px 13px', borderRadius:8, cursor:'pointer',
                        background: act ? C.primary : C.card,
                        border:`1.5px solid ${act ? C.primary : C.border}`,
                        transition:'all 0.15s' }}>
                      <span style={{ fontSize:11, fontWeight: act ? 700 : 500,
                        color: act ? '#fff' : C.g[60], fontFamily:FF }}>{t}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════ STEP 2 — 관심사 ══════════════════ */}
        {step === 2 && (
          <div style={{ padding:'24px 16px' }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.primary, fontFamily:FF,
                letterSpacing:'0.05em', marginBottom:6 }}>STEP 2 / 3</div>
              <div style={{ fontSize:20, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em', lineHeight:1.3 }}>
                뭘 하고 싶으세요?
              </div>
              <div style={{ fontSize:12, color:C.g[60], fontFamily:FF, marginTop:6 }}>
                같이 하고 싶은 활동을 선택하세요 (최대 5개)
              </div>
            </div>

            {/* 선택된 일정 요약 */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24,
              padding:'12px 14px', background:`${lc}12`,
              border:`1px solid ${lc}30`, borderRadius:10 }}>
              <div style={{ width:28, height:28, borderRadius:14, background:lc,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:900, color:'#fff' }}>{shortLine(station.lineId)}</div>
              <span style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF }}>
                {station.name}
              </span>
              <span style={{ fontSize:11, color:lc, fontFamily:FF, fontWeight:600 }}>
                {selDate} {selTime}
              </span>
            </div>

            {/* 관심사 태그 */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              {INTEREST_OPTIONS.map(v => {
                const act = selInterests.includes(v);
                const disabled = !act && selInterests.length >= 5;
                return (
                  <div key={v}
                    onClick={() => !disabled && toggleInterest(v)}
                    style={{ padding:'9px 16px', borderRadius:20, cursor: disabled ? 'default' : 'pointer',
                      background: act ? C.primary : disabled ? 'rgba(255,255,255,0.03)' : C.card,
                      border:`1.5px solid ${act ? C.primary : disabled ? 'rgba(255,255,255,0.05)' : C.border}`,
                      transition:'all 0.15s', opacity: disabled ? 0.4 : 1 }}>
                    <span style={{ fontSize:12, fontWeight: act ? 700 : 500, fontFamily:FF,
                      color: act ? '#fff' : disabled ? C.g[80] : C.g[50] }}>
                      {v}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 선택 카운터 */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'10px 14px', background:C.card, borderRadius:8,
              border:`1px solid ${C.border}` }}>
              <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>선택된 활동</span>
              <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                {selInterests.map(v => (
                  <span key={v} style={{ fontSize:10, color:C.primary, fontWeight:700, fontFamily:FF,
                    background:`${C.primary}15`, padding:'2px 8px', borderRadius:4 }}>
                    {v}
                  </span>
                ))}
                {selInterests.length === 0 && (
                  <span style={{ fontSize:11, color:C.g[80], fontFamily:FF }}>아직 없음</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════ STEP 3 — 자기소개 ════════════════ */}
        {step === 3 && (
          <div style={{ padding:'24px 16px' }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.primary, fontFamily:FF,
                letterSpacing:'0.05em', marginBottom:6 }}>STEP 3 / 3</div>
              <div style={{ fontSize:20, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em', lineHeight:1.3 }}>
                나를 소개해볼게요
              </div>
              <div style={{ fontSize:12, color:C.g[60], fontFamily:FF, marginTop:6 }}>
                친구가 될 사람에게 한마디를 남겨보세요 (10자 이상)
              </div>
            </div>

            {/* 일정 + 활동 요약 */}
            <div style={{ marginBottom:20, padding:'14px 16px',
              background:C.card, border:`1px solid ${C.border}`, borderRadius:12 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <div style={{ width:24, height:24, borderRadius:12, background:lc,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:9, fontWeight:900, color:'#fff' }}>{shortLine(station.lineId)}</div>
                <span style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF }}>
                  {station.name} · {selDate} {selTime}
                </span>
              </div>
              <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                {selInterests.map(v => (
                  <span key={v} style={{ fontSize:10, color:C.g[60], fontFamily:FF,
                    background:C.glass2, padding:'2px 8px', borderRadius:3 }}>
                    #{v}
                  </span>
                ))}
              </div>
            </div>

            {/* 자기소개 textarea */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
                marginBottom:10, letterSpacing:'0.02em' }}>✍️ 자기소개</div>
              <div style={{ position:'relative' }}>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value.slice(0, 150))}
                  placeholder={`예시) 중국에서 온 24살이에요! ${station.name}에서 같이 쇼핑하고 한식 먹을 친구 구해요 😊 한국어 조금 할 수 있어요~`}
                  style={{ width:'100%', minHeight:120, background:C.glass1,
                    border:`1.5px solid ${bio.length >= 10 ? `${C.keyColor}60` : C.border}`,
                    borderRadius:12, padding:'14px 14px 32px', fontSize:13,
                    color:C.white, fontFamily:FF, lineHeight:1.65, outline:'none', resize:'none',
                    boxSizing:'border-box',
                    transition:'border-color 0.2s',
                    caretColor:C.primary }} />
                {/* 글자 수 카운터 */}
                <div style={{ position:'absolute', bottom:10, right:12,
                  fontSize:10, color: bio.length >= 10 ? C.keyColor : C.g[80], fontFamily:FF }}>
                  {bio.length} / 150
                </div>
              </div>
              {bio.length > 0 && bio.length < 10 && (
                <div style={{ fontSize:11, color:'#F59E0B', fontFamily:FF, marginTop:6 }}>
                  ⚠ 10자 이상 입력해주세요 ({10 - bio.length}자 더 필요)
                </div>
              )}
              {bio.length >= 10 && (
                <div style={{ fontSize:11, color:C.keyColor, fontFamily:FF, marginTop:6 }}>
                  ✓ 좋아요!
                </div>
              )}
            </div>

            {/* 성별 선택 */}
            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
                marginBottom:10, letterSpacing:'0.02em' }}>👤 성별 (선택)</div>
              <div style={{ display:'flex', gap:8 }}>
                {['여성','남성','선택 안 함'].map(g => {
                  const act = gender === g;
                  return (
                    <div key={g} onClick={() => setGender(g)}
                      style={{ flex:1, padding:'10px 0', borderRadius:10, textAlign:'center',
                        cursor:'pointer',
                        background: act ? `${C.primary}18` : C.card,
                        border:`1.5px solid ${act ? C.primary : C.border}` }}>
                      <span style={{ fontSize:12, fontWeight: act ? 700 : 500, fontFamily:FF,
                        color: act ? C.primary : C.g[60] }}>
                        {g === '여성' ? '👩 여성' : g === '남성' ? '👨 남성' : '🙂 비공개'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 국적 공개 토글 */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'14px 16px', background:C.card,
              border:`1px solid ${C.border}`, borderRadius:12, marginBottom:28 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                  🌏 국적 공개
                </div>
                <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:2 }}>
                  내 국적을 다른 사람에게 보여줍니다
                </div>
              </div>
              <div onClick={() => setShowNation(v => !v)}
                style={{ width:44, height:24, borderRadius:12, cursor:'pointer',
                  background: showNation ? C.primary : 'rgba(255,255,255,0.12)',
                  position:'relative', transition:'background 0.2s', flexShrink:0 }}>
                <div style={{ position:'absolute', top:3,
                  left: showNation ? 22 : 2, width:18, height:18, borderRadius:9,
                  background:'#fff', transition:'left 0.2s',
                  boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }} />
              </div>
            </div>

            {/* 미리보기 카드 */}
            {bio.length >= 10 && (
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
                  marginBottom:10, letterSpacing:'0.02em' }}>👁 미리보기</div>
                <div style={{ background:`${lc}0C`, border:`1px solid ${lc}30`,
                  borderRadius:14, padding:'16px' }}>
                  <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                    <div style={{ width:46, height:46, borderRadius:23,
                      background:`${lc}25`, border:`1.5px solid ${lc}50`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:20, flexShrink:0 }}>🇰🇷</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:3 }}>
                        <span style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF }}>
                          이효범
                        </span>
                        {showNation && (
                          <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>한국</span>
                        )}
                        <span style={{ fontSize:11, color:lc, fontWeight:700,
                          background:`${lc}15`, padding:'2px 8px', borderRadius:3,
                          fontFamily:FF, marginLeft:'auto' }}>
                          {selDate} {selTime}
                        </span>
                      </div>
                      <div style={{ fontSize:12, color:C.g[50], lineHeight:1.55, fontFamily:FF,
                        marginBottom:8 }}>
                        {bio}
                      </div>
                      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                        {selInterests.map(t => (
                          <span key={t} style={{ fontSize:10, color:C.g[60], fontFamily:FF,
                            background:C.glass2, padding:'2px 8px', borderRadius:3 }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div style={{ width:'100%', padding:'8px 0', borderRadius:8,
                        background:C.primary, textAlign:'center' }}>
                        <span style={{ fontSize:11, fontWeight:700, color:'#fff', fontFamily:FF }}>
                          🤝 매칭 신청하기
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── 하단 고정 버튼 ────────────────────────── */}
      <div style={{ padding:'12px 16px', paddingBottom:'calc(12px + env(safe-area-inset-bottom,0px))',
        background:'rgba(14,15,20,0.97)', borderTop:`1px solid ${C.border}` }}>

        {/* 진행 바 */}
        <div style={{ height:3, background:C.glass2, borderRadius:2,
          marginBottom:12, overflow:'hidden' }}>
          <div style={{ height:'100%', borderRadius:2, background:C.primary,
            width:`${(step/3)*100}%`, transition:'width 0.3s ease' }} />
        </div>

        <div style={{ display:'flex', gap:10 }}>
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              style={{ flex:1, padding:'13px 0', borderRadius:12, cursor:'pointer',
                background:C.glass2,
                border:`1px solid ${C.border}`, fontSize:13, fontWeight:700,
                color:C.g[50], fontFamily:FF }}>
              이전
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => (step===1 ? canNext1 : canNext2) && setStep(s => s + 1)}
              style={{ flex: step > 1 ? 2 : 1, padding:'13px 0', borderRadius:12,
                cursor: (step===1 ? canNext1 : canNext2) ? 'pointer' : 'default',
                background: (step===1 ? canNext1 : canNext2)
                  ? `linear-gradient(90deg, ${C.primary}, ${C.primary}CC)`
                  : 'rgba(255,255,255,0.07)',
                border:'none', fontSize:13, fontWeight:800,
                color: (step===1 ? canNext1 : canNext2) ? '#fff' : C.g[70],
                fontFamily:FF, transition:'all 0.2s' }}>
              다음 →
            </button>
          ) : (
            <button
              onClick={() => { if (canSubmit) { onSubmit?.({ selStation, selDate, selTime, selInterests, bio, gender, showNation }); setSubmitted(true); }}}
              style={{ flex:2, padding:'13px 0', borderRadius:12,
                cursor: canSubmit ? 'pointer' : 'default',
                background: canSubmit
                  ? `linear-gradient(90deg, ${C.primary}, #00D4FF)`
                  : 'rgba(255,255,255,0.07)',
                border:'none', fontSize:13, fontWeight:800,
                color: canSubmit ? '#fff' : C.g[70],
                fontFamily:FF, transition:'all 0.2s' }}>
              🚀 모집 글 올리기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   역 리뷰 — 후기 쓰기 화면
   ══════════════════════════════════════════════════════════ */
const REVIEW_CATEGORIES = [
  { id:'transit',  icon:'🚇', label:'교통 편의',  desc:'환승·출구·엘리베이터' },
  { id:'food',     icon:'🍜', label:'주변 맛집',  desc:'식당·카페·길거리음식' },
  { id:'vibe',     icon:'✨', label:'분위기',     desc:'활기·조용함·트렌드' },
  { id:'safety',   icon:'🛡️', label:'안전도',     desc:'야간·혼잡·치안' },
  { id:'clean',    icon:'🧹', label:'청결도',     desc:'승강장·화장실·시설' },
];

const VISIT_TYPES = [
  { id:'alone',   icon:'🚶', label:'혼자' },
  { id:'friend',  icon:'👥', label:'친구와' },
  { id:'couple',  icon:'💑', label:'연인과' },
  { id:'family',  icon:'👨‍👩‍👧', label:'가족과' },
  { id:'commute', icon:'💼', label:'출퇴근' },
];

const VISIT_TIMES = [
  { id:'morning', icon:'🌅', label:'오전' },
  { id:'noon',    icon:'☀️', label:'낮' },
  { id:'evening', icon:'🌆', label:'저녁' },
  { id:'night',   icon:'🌙', label:'심야' },
];

const KEYWORD_TAGS = [
  '인스타감성 🤳','포포포 📸','혼밥 가능 🍱','줄 서도 OK ⏳',
  '현지인 맛집 🏠','뷰 맛집 🌃','가성비 최고 💰','힐링됨 🌿',
  '트렌디해 🔥','길치도 OK 🗺️','주차 편해 🚗','접근성 굿 👍',
];

const SPOT_SUGGESTIONS = ['명동교자','올리브영','스타벅스','버거킹','CGV','이마트','편의점','노래방','당구장','헬스장'];

function StationReviewWriteScreen({ station, onBack, onSubmit }) {
  /* ── 폼 상태 ─── */
  const [rating,        setRating]        = useState(0);
  const [hoverRating,   setHoverRating]   = useState(0);
  const [visitType,     setVisitType]     = useState(null);
  const [visitTime,     setVisitTime]     = useState(null);
  const [catRatings,    setCatRatings]    = useState({});
  const [catHover,      setCatHover]      = useState({});
  const [body,          setBody]          = useState('');
  const [spotInput,     setSpotInput]     = useState('');
  const [spots,         setSpots]         = useState([]);
  const [keywords,      setKeywords]      = useState([]);
  const [photoCount,    setPhotoCount]    = useState(0);
  const [step,          setStep]          = useState(1);  /* 1·2·3 */
  const [submitted,     setSubmitted]     = useState(false);
  const [submitAnim,    setSubmitAnim]    = useState(false);
  const scrollRef = useRef(null);
  const lc = C.line[station?.lineId ?? '2'] ?? C.primary;

  /* ── 완료 애니메이션 ─── */
  function handleSubmit() {
    if (!canSubmit) return;
    setSubmitAnim(true);
    setTimeout(function() {
      setSubmitted(true);
    }, 1400);
  }

  /* ── 유효성 ─── */
  var canNext1 = rating > 0 && visitType && visitTime;
  var canNext2 = Object.keys(catRatings).length >= 3;
  var canSubmit = canNext1 && canNext2 && body.trim().length >= 20;

  /* ── 장소 추가 ─── */
  function addSpot(s) {
    var v = (s || spotInput).trim();
    if (!v || spots.includes(v) || spots.length >= 5) return;
    setSpots(function(p) { return [...p, v]; });
    setSpotInput('');
  }
  function removeSpot(s) {
    setSpots(function(p) { return p.filter(function(x) { return x !== s; }); });
  }

  /* ── 키워드 토글 ─── */
  function toggleKeyword(k) {
    setKeywords(function(prev) {
      return prev.includes(k)
        ? prev.filter(function(x) { return x !== k; })
        : prev.length < 5 ? [...prev, k] : prev;
    });
  }

  /* ── 카테고리 별점 ─── */
  function setCat(id, n) {
    setCatRatings(function(p) { return Object.assign({}, p, { [id]: n }); });
  }

  var stationName = station?.name ?? '선택 역';

  /* ══ 제출 완료 화면 ══ */
  if (submitted) {
    return (
      <div style={{ display:'flex', flexDirection:'column', height:'100%',
        background:C.bg, alignItems:'center', justifyContent:'center',
        padding:'0 32px', textAlign:'center' }}>
        <div style={{ fontSize:72, marginBottom:24,
          animation:'bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>🎉</div>
        <div style={{ fontSize:22, fontWeight:900, color:C.white, fontFamily:FF,
          letterSpacing:'-0.04em', marginBottom:10 }}>후기가 등록됐어요!</div>
        <div style={{ fontSize:13, color:C.g[60], fontFamily:FF, lineHeight:1.65,
          marginBottom:8 }}>
          <span style={{ color:lc, fontWeight:700 }}>{stationName}</span>에 대한<br/>
          소중한 후기를 남겨주셔서 감사해요 ✨
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:36 }}>
          {[1,2,3,4,5].map(function(i) {
            return <span key={i} style={{ fontSize:22,
              color: i <= rating ? '#F59E0B' : 'rgba(255,255,255,0.15)' }}>★</span>;
          })}
        </div>
        <div style={{ display:'flex', gap:4, flexWrap:'wrap', justifyContent:'center',
          marginBottom:40, maxWidth:280 }}>
          {keywords.map(function(k) {
            return (
              <span key={k} style={{ fontSize:11, color:lc, background:`${lc}18`,
                padding:'4px 10px', borderRadius:20, fontFamily:FF, fontWeight:600 }}>{k}</span>
            );
          })}
        </div>
        <button onClick={onBack}
          style={{ padding:'13px 48px', borderRadius:14, border:'none', cursor:'pointer',
            background:`linear-gradient(90deg, ${lc}, ${C.primary})`,
            fontSize:14, fontWeight:800, color:'#fff', fontFamily:FF,
            letterSpacing:'-0.02em', boxShadow:`0 4px 20px ${lc}50` }}>
          후기 목록으로 돌아가기
        </button>
      </div>
    );
  }

  /* ══ 진행 표시 헤더 ══ */
  var steps = ['별점 & 방문', '카테고리', '상세 내용'];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden' }}>

      {/* ── 헤더 ── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px' }}>
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:15, fontWeight:900, color:C.white, fontFamily:FF,
              letterSpacing:'-0.03em' }}>후기 쓰기</div>
            <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
              {stationName}에 대한 솔직한 후기를 남겨주세요
            </div>
          </div>
          {/* 스텝 뱃지 */}
          <div style={{ marginRight:12, display:'flex', alignItems:'center', gap:4 }}>
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>{step}</span>
            <span style={{ fontSize:11, color:C.g[80], fontFamily:FF }}>/</span>
            <span style={{ fontSize:11, color:C.g[80], fontFamily:FF }}>3</span>
          </div>
        </div>

        {/* 스텝 프로그레스 바 */}
        <div style={{ display:'flex', gap:4, padding:'0 16px 12px' }}>
          {steps.map(function(s, i) {
            var idx = i + 1;
            var done = idx < step;
            var act  = idx === step;
            return (
              <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
                <div style={{ height:3, borderRadius:2, overflow:'hidden',
                  background:'rgba(255,255,255,0.08)' }}>
                  <div style={{ height:'100%', borderRadius:2,
                    width: done ? '100%' : act ? '100%' : '0%',
                    background: done ? lc : act ? `linear-gradient(90deg,${lc},${C.primary})` : 'transparent',
                    transition:'width 0.4s ease' }} />
                </div>
                <div style={{ fontSize:9, fontFamily:FF, fontWeight: act ? 700 : 400,
                  color: done ? lc : act ? C.white : C.g[80] }}>{s}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 스크롤 영역 ── */}
      <div ref={scrollRef}
        style={{ flex:1, overflowY:'auto', scrollbarWidth:'none',
          paddingBottom:100 }}>

        {/* ══════════ STEP 1: 별점 & 방문 정보 ══════════ */}
        {step === 1 && (
          <div>
            {/* 역 정보 카드 */}
            <div style={{ margin:'16px 16px 0',
              background:`linear-gradient(135deg, ${lc}18 0%, ${C.card} 60%)`,
              border:`1px solid ${lc}30`, borderRadius:16, padding:'16px',
              display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:24, background:lc,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:20, flexShrink:0, boxShadow:`0 0 16px ${lc}60` }}>
                🚇
              </div>
              <div>
                <div style={{ fontSize:17, fontWeight:900, color:C.white, fontFamily:FF,
                  letterSpacing:'-0.04em', marginBottom:2 }}>{stationName}</div>
                <div style={{ fontSize:11, color:lc, fontFamily:FF, fontWeight:600 }}>
                  {station?.lines ?? '2호선'} · 방문 후기 작성 중
                </div>
              </div>
            </div>

            {/* ── 별점 ── */}
            <div style={{ margin:'20px 16px 0',
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:16, padding:'20px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                OVERALL RATING
              </div>
              <div style={{ fontSize:13, color:C.g[70], fontFamily:FF, marginBottom:16 }}>
                이 역을 전반적으로 평가해주세요
              </div>
              {/* 별점 큰 UI */}
              <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:12 }}>
                {[1,2,3,4,5].map(function(i) {
                  var filled = i <= (hoverRating || rating);
                  return (
                    <div key={i}
                      onMouseEnter={function() { setHoverRating(i); }}
                      onMouseLeave={function() { setHoverRating(0); }}
                      onClick={function() { setRating(i); }}
                      style={{ cursor:'pointer', fontSize:44, lineHeight:1,
                        filter: filled ? 'drop-shadow(0 0 8px #F59E0B80)' : 'none',
                        transition:'all 0.15s', transform: filled ? 'scale(1.1)' : 'scale(1)',
                        color: filled ? '#F59E0B' : 'rgba(255,255,255,0.1)' }}>
                      ★
                    </div>
                  );
                })}
              </div>
              {/* 별점 라벨 */}
              <div style={{ textAlign:'center', fontSize:13, fontWeight:700,
                fontFamily:FF, color: rating > 0 ? C.white : C.g[80],
                minHeight:20, transition:'all 0.2s' }}>
                {rating === 0 ? '별점을 선택해주세요'
                 : rating === 1 ? '😞 별로였어요'
                 : rating === 2 ? '😕 아쉬웠어요'
                 : rating === 3 ? '😐 보통이에요'
                 : rating === 4 ? '😊 좋았어요!'
                 : '🤩 최고였어요!!'}
              </div>
            </div>

            {/* ── 방문 유형 ── */}
            <div style={{ margin:'12px 16px 0',
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:16, padding:'18px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                VISIT TYPE
              </div>
              <div style={{ fontSize:13, color:C.g[70], fontFamily:FF, marginBottom:14 }}>
                누구와 방문했나요?
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {VISIT_TYPES.map(function(t) {
                  var act = visitType === t.id;
                  return (
                    <div key={t.id} onClick={function() { setVisitType(t.id); }}
                      style={{ display:'flex', alignItems:'center', gap:6,
                        padding:'8px 14px', borderRadius:10, cursor:'pointer',
                        background: act ? `${lc}22` : 'rgba(255,255,255,0.05)',
                        border:`1.5px solid ${act ? lc : C.border}`,
                        transition:'all 0.15s' }}>
                      <span style={{ fontSize:16 }}>{t.icon}</span>
                      <span style={{ fontSize:12, fontWeight: act ? 700 : 500,
                        color: act ? lc : C.g[60], fontFamily:FF }}>{t.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 방문 시간대 ── */}
            <div style={{ margin:'12px 16px 0',
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:16, padding:'18px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                VISIT TIME
              </div>
              <div style={{ fontSize:13, color:C.g[70], fontFamily:FF, marginBottom:14 }}>
                언제 방문했나요?
              </div>
              <div style={{ display:'flex', gap:8 }}>
                {VISIT_TIMES.map(function(t) {
                  var act = visitTime === t.id;
                  return (
                    <div key={t.id} onClick={function() { setVisitTime(t.id); }}
                      style={{ flex:1, display:'flex', flexDirection:'column',
                        alignItems:'center', gap:6, padding:'12px 8px',
                        borderRadius:12, cursor:'pointer',
                        background: act ? `${lc}22` : 'rgba(255,255,255,0.05)',
                        border:`1.5px solid ${act ? lc : C.border}`,
                        transition:'all 0.15s' }}>
                      <span style={{ fontSize:20 }}>{t.icon}</span>
                      <span style={{ fontSize:11, fontWeight: act ? 700 : 500,
                        color: act ? lc : C.g[60], fontFamily:FF }}>{t.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════ STEP 2: 카테고리별 평가 ══════════ */}
        {step === 2 && (
          <div>
            <div style={{ padding:'20px 16px 8px' }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em', marginBottom:4 }}>카테고리별 평가</div>
              <div style={{ fontSize:12, color:C.g[70], fontFamily:FF }}>
                각 항목에 별점을 남겨주세요 (최소 3개 필수)
              </div>
            </div>

            {REVIEW_CATEGORIES.map(function(cat, ci) {
              var cRating = catRatings[cat.id] || 0;
              var cHover  = catHover[cat.id]   || 0;
              var filled  = cRating > 0;
              return (
                <div key={cat.id} style={{ margin:'0 16px 10px',
                  background: filled ? `${lc}0A` : C.card,
                  border:`1px solid ${filled ? lc+'30' : C.border}`,
                  borderRadius:14, padding:'16px',
                  transition:'all 0.2s' }}>
                  <div style={{ display:'flex', alignItems:'center',
                    justifyContent:'space-between', marginBottom:12 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:38, height:38, borderRadius:10,
                        background: filled ? `${lc}20` : 'rgba(255,255,255,0.06)',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:18, border:`1px solid ${filled ? lc+'40' : C.border}` }}>
                        {cat.icon}
                      </div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                          {cat.label}
                        </div>
                        <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginTop:1 }}>
                          {cat.desc}
                        </div>
                      </div>
                    </div>
                    {/* 현재 별점 라벨 */}
                    {cRating > 0 && (
                      <span style={{ fontSize:12, color:lc, fontWeight:700, fontFamily:FF,
                        background:`${lc}18`, padding:'3px 10px', borderRadius:6 }}>
                        {['','★','★★','★★★','★★★★','★★★★★'][cRating]}
                      </span>
                    )}
                  </div>
                  {/* 별점 클릭 */}
                  <div style={{ display:'flex', gap:6 }}>
                    {[1,2,3,4,5].map(function(i) {
                      var f = i <= (cHover || cRating);
                      return (
                        <div key={i}
                          onMouseEnter={function() {
                            setCatHover(function(p) { return Object.assign({},p,{[cat.id]:i}); });
                          }}
                          onMouseLeave={function() {
                            setCatHover(function(p) { return Object.assign({},p,{[cat.id]:0}); });
                          }}
                          onClick={function() { setCat(cat.id, i); }}
                          style={{ flex:1, height:36, borderRadius:8, cursor:'pointer',
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:20, background: f ? `${lc}15` : 'rgba(255,255,255,0.04)',
                            border:`1px solid ${f ? lc+'40' : 'rgba(255,255,255,0.06)'}`,
                            color: f ? '#F59E0B' : 'rgba(255,255,255,0.12)',
                            transition:'all 0.1s', transform: f ? 'scale(1.05)' : 'scale(1)' }}>
                          ★
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* 진행 힌트 */}
            <div style={{ margin:'8px 16px 0', padding:'12px 14px',
              background:'rgba(255,255,255,0.03)', borderRadius:10,
              display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:14 }}>💡</span>
              <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, lineHeight:1.5 }}>
                평가한 항목: <span style={{ color:lc, fontWeight:700 }}>
                  {Object.keys(catRatings).length}개
                </span> / 최소 3개 이상 필요해요
              </span>
            </div>
          </div>
        )}

        {/* ══════════ STEP 3: 텍스트 후기 + 추천 장소 + 키워드 + 사진 ══════════ */}
        {step === 3 && (
          <div>
            {/* ── 후기 텍스트 ── */}
            <div style={{ margin:'16px 16px 0',
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:16, padding:'18px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                REVIEW
              </div>
              <div style={{ display:'flex', justifyContent:'space-between',
                alignItems:'center', marginBottom:12 }}>
                <div style={{ fontSize:13, color:C.g[70], fontFamily:FF }}>
                  솔직한 방문 후기를 남겨주세요
                </div>
                <span style={{ fontSize:11, fontFamily:FF,
                  color: body.length < 20 ? C.g[80] : lc }}>
                  {body.length}<span style={{ color:C.g[80] }}>/500</span>
                </span>
              </div>
              <textarea
                value={body}
                onChange={function(e) { setBody(e.target.value.slice(0,500)); }}
                placeholder={`이 역에서의 경험을 자유롭게 적어주세요 😊\n\n예시:\n- 환승이 편리하고 주변에 맛있는 음식점이 많아요\n- 주말 저녁엔 많이 붐비지만 분위기가 좋아요`}
                style={{ width:'100%', minHeight:160, background:'rgba(255,255,255,0.04)',
                  border:`1px solid ${body.length >= 20 ? lc+'40' : C.border}`,
                  borderRadius:12, padding:'14px', resize:'none', outline:'none',
                  fontSize:13, color:C.white, fontFamily:FF, lineHeight:1.7,
                  boxSizing:'border-box', transition:'border-color 0.2s',
                  caretColor:lc }}
              />
              {body.length < 20 && body.length > 0 && (
                <div style={{ fontSize:10, color:C.red, fontFamily:FF, marginTop:6 }}>
                  최소 20자 이상 작성해주세요 ({20 - body.length}자 더 필요)
                </div>
              )}
            </div>

            {/* ── 추천 장소 ── */}
            <div style={{ margin:'12px 16px 0',
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:16, padding:'18px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                RECOMMENDED SPOTS
              </div>
              <div style={{ fontSize:13, color:C.g[70], fontFamily:FF, marginBottom:14 }}>
                주변 추천 장소를 태그해주세요 (최대 5개)
              </div>
              {/* 입력창 */}
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <input
                  value={spotInput}
                  onChange={function(e) { setSpotInput(e.target.value); }}
                  onKeyDown={function(e) { if (e.key === 'Enter') addSpot(); }}
                  placeholder="장소 이름 입력 후 Enter"
                  style={{ flex:1, background:'rgba(255,255,255,0.05)',
                    border:`1px solid ${C.border}`, borderRadius:10, padding:'10px 14px',
                    outline:'none', fontSize:12, color:C.white, fontFamily:FF,
                    caretColor:lc }}
                />
                <button onClick={function() { addSpot(); }}
                  disabled={spots.length >= 5}
                  style={{ padding:'10px 14px', borderRadius:10, border:'none',
                    cursor: spots.length < 5 ? 'pointer' : 'not-allowed',
                    background: spots.length < 5 ? lc : 'rgba(255,255,255,0.06)',
                    fontSize:12, fontWeight:700, color:'#fff', fontFamily:FF,
                    flexShrink:0 }}>
                  추가
                </button>
              </div>
              {/* 빠른 추가 */}
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:12 }}>
                {SPOT_SUGGESTIONS.slice(0,6).map(function(s) {
                  var already = spots.includes(s);
                  return (
                    <div key={s} onClick={function() { if (!already) addSpot(s); }}
                      style={{ fontSize:11, padding:'5px 11px', borderRadius:20,
                        cursor: already ? 'default' : 'pointer', fontFamily:FF,
                        background: already ? `${lc}20` : 'rgba(255,255,255,0.05)',
                        color: already ? lc : C.g[70],
                        border:`1px solid ${already ? lc+'40' : C.border}`,
                        fontWeight: already ? 700 : 400 }}>
                      {already ? '✓ ' : '+ '}{s}
                    </div>
                  );
                })}
              </div>
              {/* 추가된 장소 태그 */}
              {spots.length > 0 && (
                <div style={{ display:'flex', gap:6, flexWrap:'wrap', paddingTop:10,
                  borderTop:`1px solid ${C.border}` }}>
                  {spots.map(function(s) {
                    return (
                      <div key={s} style={{ display:'flex', alignItems:'center', gap:5,
                        background:`${lc}18`, border:`1px solid ${lc}40`,
                        borderRadius:20, padding:'5px 12px' }}>
                        <span style={{ fontSize:12, color:lc, fontFamily:FF, fontWeight:600 }}>
                          📍 {s}
                        </span>
                        <span onClick={function() { removeSpot(s); }}
                          style={{ fontSize:12, color:C.g[70], cursor:'pointer', lineHeight:1 }}>
                          ×
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── 키워드 태그 ── */}
            <div style={{ margin:'12px 16px 0',
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:16, padding:'18px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                KEYWORDS
              </div>
              <div style={{ display:'flex', justifyContent:'space-between',
                alignItems:'center', marginBottom:14 }}>
                <span style={{ fontSize:13, color:C.g[70], fontFamily:FF }}>
                  이 역과 어울리는 태그를 골라주세요
                </span>
                <span style={{ fontSize:11, color: keywords.length === 5 ? C.red : C.g[70],
                  fontFamily:FF }}>{keywords.length}/5</span>
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {KEYWORD_TAGS.map(function(k) {
                  var act = keywords.includes(k);
                  return (
                    <div key={k} onClick={function() { toggleKeyword(k); }}
                      style={{ fontSize:12, padding:'7px 13px', borderRadius:20, cursor:'pointer',
                        background: act ? `${lc}20` : 'rgba(255,255,255,0.05)',
                        color: act ? lc : C.g[60], fontFamily:FF, fontWeight: act ? 700 : 400,
                        border:`1.5px solid ${act ? lc : C.border}`,
                        transition:'all 0.15s', boxShadow: act ? `0 0 8px ${lc}30` : 'none' }}>
                      {k}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── 사진 첨부 (모의) ── */}
            <div style={{ margin:'12px 16px 0',
              background:C.card, border:`1px solid ${C.border}`,
              borderRadius:16, padding:'18px' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.g[50], fontFamily:FF,
                letterSpacing:'0.06em', textTransform:'uppercase', marginBottom:4 }}>
                PHOTOS (선택)
              </div>
              <div style={{ fontSize:13, color:C.g[70], fontFamily:FF, marginBottom:14 }}>
                방문 사진을 첨부하면 후기가 더 풍부해져요
              </div>
              <div style={{ display:'flex', gap:8 }}>
                {/* 사진 추가 버튼 */}
                <div onClick={function() { if (photoCount < 4) setPhotoCount(function(n) { return n+1; }); }}
                  style={{ width:72, height:72, borderRadius:12, cursor:'pointer',
                    border:`1.5px dashed ${lc}60`,
                    display:'flex', flexDirection:'column', alignItems:'center',
                    justifyContent:'center', gap:4, flexShrink:0,
                    background:`${lc}08`, transition:'all 0.15s' }}>
                  <span style={{ fontSize:22, color:lc }}>+</span>
                  <span style={{ fontSize:9, color:lc, fontFamily:FF, fontWeight:600 }}>사진 추가</span>
                </div>
                {/* 추가된 사진 목 */}
                {Array.from({ length: photoCount }).map(function(_, i) {
                  var imgs = ['🏙️','🚉','☕','🍜'];
                  return (
                    <div key={i} style={{ width:72, height:72, borderRadius:12,
                      background:`${lc}15`, border:`1px solid ${lc}30`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:28, flexShrink:0, position:'relative' }}>
                      {imgs[i % imgs.length]}
                      <div onClick={function() { setPhotoCount(function(n) { return Math.max(0,n-1); }); }}
                        style={{ position:'absolute', top:-5, right:-5,
                          width:18, height:18, borderRadius:9,
                          background:'rgba(0,0,0,0.8)', border:`1px solid ${C.border}`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          cursor:'pointer', fontSize:10, color:C.white, fontWeight:700 }}>
                        ×
                      </div>
                    </div>
                  );
                })}
                {/* 남은 슬롯 */}
                {Array.from({ length: 4 - photoCount }).map(function(_, i) {
                  return (
                    <div key={'e'+i} style={{ width:72, height:72, borderRadius:12,
                      background:'rgba(255,255,255,0.03)',
                      border:`1px solid rgba(255,255,255,0.05)`, flexShrink:0 }} />
                  );
                })}
              </div>
              <div style={{ fontSize:10, color:C.g[80], fontFamily:FF, marginTop:10 }}>
                최대 4장 · JPG, PNG · 각 10MB 이하
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 하단 고정 버튼 ── */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        background:`linear-gradient(to top, ${C.bg} 60%, transparent)`,
        padding:'16px 16px calc(env(safe-area-inset-bottom,16px) + 16px)',
        display:'flex', gap:10 }}>
        {step > 1 && (
          <button onClick={function() { setStep(function(s) { return s-1; }); }}
            style={{ flex:1, padding:'13px 0', borderRadius:12, cursor:'pointer',
              background:'rgba(255,255,255,0.06)',
              border:`1px solid ${C.border}`, fontSize:13, fontWeight:700,
              color:C.g[50], fontFamily:FF }}>
            ← 이전
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={function() {
              if ((step === 1 && canNext1) || (step === 2 && canNext2)) {
                setStep(function(s) { return s+1; });
                setTimeout(function() {
                  if (scrollRef.current) scrollRef.current.scrollTop = 0;
                }, 50);
              }
            }}
            style={{ flex: step === 1 ? 1 : 2, padding:'13px 0', borderRadius:12,
              cursor: (step===1 ? canNext1 : canNext2) ? 'pointer' : 'not-allowed',
              background: (step===1 ? canNext1 : canNext2)
                ? `linear-gradient(90deg, ${lc}, ${C.primary})`
                : 'rgba(255,255,255,0.07)',
              border:'none', fontSize:13, fontWeight:800,
              color: (step===1 ? canNext1 : canNext2) ? '#fff' : C.g[70],
              fontFamily:FF, transition:'all 0.2s',
              boxShadow: (step===1 ? canNext1 : canNext2) ? `0 4px 16px ${lc}40` : 'none' }}>
            다음 단계 →
          </button>
        ) : (
          <button onClick={handleSubmit}
            disabled={!canSubmit || submitAnim}
            style={{ flex:2, padding:'13px 0', borderRadius:12,
              cursor: canSubmit && !submitAnim ? 'pointer' : 'not-allowed',
              background: canSubmit
                ? submitAnim
                  ? `linear-gradient(90deg, ${lc}, #22C55E)`
                  : `linear-gradient(90deg, ${lc}, ${C.primary})`
                : 'rgba(255,255,255,0.07)',
              border:'none', fontSize:13, fontWeight:800,
              color: canSubmit ? '#fff' : C.g[70],
              fontFamily:FF, transition:'all 0.3s',
              boxShadow: canSubmit ? `0 4px 20px ${lc}50` : 'none',
              transform: submitAnim ? 'scale(0.97)' : 'scale(1)' }}>
            {submitAnim ? '✨ 등록 중...' : '🚀 후기 등록하기'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   역 인연 매칭 — 역별 전체 목록 화면
   ══════════════════════════════════════════════════════════ */
function MeetupFullListScreen({ station, allUsers, myPosts, setMyPosts, matchedIds, setMatchedIds, onBack, onWrite, onUserDetail }) {
  const lc = C.line[station.lineId] ?? C.primary;
  const [filterCountry, setFilterCountry] = React.useState('전체');
  const [sameOnly,      setSameOnly]      = React.useState(false);
  const [showFilter,    setShowFilter]    = React.useState(false);
  const [draftSameOnly, setDraftSameOnly] = React.useState(false);
  const [draftCountry,  setDraftCountry]  = React.useState('전체');
  const [sortBy,        setSortBy]        = React.useState('recent'); /* recent | matching */
  const myCountry = '한국';

  /* 필터 적용 */
  var combined = [...(myPosts || []), ...allUsers];
  var filtered = combined.filter(function(u) {
    if (u.stationId && u.stationId !== station.id) return false;
    if (sameOnly && u.country !== myCountry) return false;
    if (filterCountry !== '전체' && u.country !== filterCountry) return false;
    return true;
  });

  /* 정렬 */
  if (sortBy === 'matching') {
    filtered = filtered.slice().sort(function(a, b) {
      return (matchedIds.has(b.id) ? 1 : 0) - (matchedIds.has(a.id) ? 1 : 0);
    });
  }

  var filterCount = (sameOnly ? 1 : 0) + (filterCountry !== '전체' ? 1 : 0);
  var countries = [...new Set(allUsers.map(function(u) { return u.country; }))];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden', position:'relative' }}>

      {/* ── 헤더 ── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px' }}>
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              {/* 호선 뱃지 */}
              <div style={{ width:22, height:22, borderRadius:11, background:lc,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:10, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>
                {station.lineId === 'sin' ? '신' : station.lineId}
              </div>
              <div style={{ fontSize:15, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em' }}>{station.name}</div>
              {/* 실시간 라이브 뱃지 */}
              <div style={{ display:'flex', alignItems:'center', gap:4,
                background:`${C.keyColor}18`, border:`1px solid ${C.keyColor}40`,
                borderRadius:6, padding:'2px 7px' }}>
                <div style={{ width:5, height:5, borderRadius:3, background:C.keyColor,
                  animation:'pulse 1.5s infinite' }} />
                <span style={{ fontSize:9, color:C.keyColor, fontWeight:700, fontFamily:FF }}>LIVE</span>
              </div>
            </div>
            <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginTop:1 }}>
              인연 찾기 · {filtered.length}명 모집 중
            </div>
          </div>

          {/* 필터 버튼 */}
          <button
            onClick={function() {
              setDraftSameOnly(sameOnly);
              setDraftCountry(filterCountry);
              setShowFilter(true);
            }}
            style={{ marginRight:8, background: filterCount > 0 ? `${C.primary}20` : 'rgba(255,255,255,0.07)',
              border:`1px solid ${filterCount > 0 ? C.primary+'60' : C.border}`,
              borderRadius:8, padding:'6px 11px', cursor:'pointer',
              display:'flex', alignItems:'center', gap:5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke={filterCount > 0 ? C.primary : C.g[60]} strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
              color: filterCount > 0 ? C.primary : C.g[60] }}>필터</span>
            {filterCount > 0 && (
              <div style={{ minWidth:16, height:16, borderRadius:8, background:C.primary,
                display:'flex', alignItems:'center', justifyContent:'center', padding:'0 4px' }}>
                <span style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF }}>{filterCount}</span>
              </div>
            )}
          </button>
        </div>

        {/* 정렬 탭 */}
        <div style={{ display:'flex', gap:0, padding:'0 16px 10px' }}>
          {[['recent','최신순'],['matching','매칭순']].map(function(item) {
            var act = sortBy === item[0];
            return (
              <button key={item[0]} onClick={function() { setSortBy(item[0]); }}
                style={{ flex:1, padding:'7px 0', borderRadius:0, border:'none',
                  cursor:'pointer', fontFamily:FF, fontSize:12, fontWeight: act ? 800 : 500,
                  color: act ? C.white : C.g[70],
                  background:'none',
                  borderBottom:`2px solid ${act ? lc : 'transparent'}`,
                  transition:'all 0.15s' }}>
                {item[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 스크롤 본문 ── */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none', paddingBottom:100 }}>

        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'64px 0', color:C.g[70] }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:13, fontFamily:FF }}>해당 조건의 친구가 없어요</div>
            <div style={{ fontSize:11, color:C.g[80], marginTop:6, fontFamily:FF }}>필터를 조정해 보세요</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:12, padding:'16px' }}>
            {filtered.map(function(u) {
              var matched = matchedIds.has(u.id);
              var cardBg     = u.isMe ? 'rgba(255,200,60,0.05)' : matched ? `${C.primary}0C` : C.card;
              var cardBorder = u.isMe ? 'rgba(255,200,60,0.35)' : matched ? `${C.primary}40` : C.border;
              return (
                <div key={u.id}
                  onClick={function() { !u.isMe && onUserDetail && onUserDetail(u); }}
                  style={{ background:cardBg, border:`1px solid ${cardBorder}`,
                    borderRadius:14, padding:'16px', cursor: u.isMe ? 'default' : 'pointer',
                    transition:'border-color 0.2s', position:'relative' }}>

                  {/* 내 글 뱃지 */}
                  {u.isMe && (
                    <div style={{ position:'absolute', top:10, right:10,
                      fontSize:9, fontWeight:800, color:'#FFC83C',
                      background:'rgba(255,200,60,0.18)', padding:'2px 8px',
                      borderRadius:4, fontFamily:FF }}>✦ 내 글</div>
                  )}

                  <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                    {/* 아바타 */}
                    <div style={{ width:48, height:48, borderRadius:24, flexShrink:0,
                      background: u.isMe ? 'rgba(255,200,60,0.2)' : `${lc}25`,
                      border:`2px solid ${u.isMe ? 'rgba(255,200,60,0.5)' : `${lc}50`}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:20 }}>{u.flag}</div>

                    <div style={{ flex:1, minWidth:0 }}>
                      {/* 이름·국적·나이 */}
                      <div style={{ display:'flex', alignItems:'center', gap:6,
                        marginBottom:4, paddingRight: u.isMe ? 52 : 0 }}>
                        <span style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF }}>
                          {u.nick}
                        </span>
                        <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                          {u.country} · {u.age}세
                        </span>
                        {!u.isMe && matched && (
                          <span style={{ fontSize:9, fontWeight:700, color:C.primary,
                            background:`${C.primary}18`, padding:'1px 6px',
                            borderRadius:3, fontFamily:FF, marginLeft:'auto' }}>매칭됨 ✓</span>
                        )}
                      </div>

                      {/* 일정 뱃지 */}
                      <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
                        <span style={{ fontSize:10,
                          color: u.isMe ? '#FFC83C' : lc, fontWeight:700,
                          background: u.isMe ? 'rgba(255,200,60,0.15)' : `${lc}15`,
                          padding:'2px 8px', borderRadius:3, fontFamily:FF }}>
                          📅 {u.date} {u.time}
                        </span>
                      </div>

                      {/* 소개글 */}
                      <div style={{ fontSize:12, color:C.g[50], lineHeight:1.55,
                        fontFamily:FF, marginBottom:10 }}>{u.bio}</div>

                      {/* 관심사 태그 */}
                      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:12 }}>
                        {u.interests.map(function(t) {
                          return (
                            <span key={t} style={{ fontSize:10, color:C.g[60], fontFamily:FF,
                              background:C.glass2, padding:'2px 8px', borderRadius:3 }}>#{t}</span>
                          );
                        })}
                      </div>

                      {/* 버튼 */}
                      {u.isMe ? (
                        <button onClick={function(e) {
                          e.stopPropagation();
                          setMyPosts && setMyPosts(function(prev) {
                            return prev.filter(function(p) { return p.id !== u.id; });
                          });
                        }}
                          style={{ width:'100%', padding:'10px 0', borderRadius:10,
                            border:`1px solid rgba(255,255,255,0.12)`, cursor:'pointer',
                            fontFamily:FF, fontSize:12, fontWeight:700,
                            background:C.glass1, color:C.g[60] }}>
                          🗑 내 글 삭제
                        </button>
                      ) : (
                        <button onClick={function(e) {
                          e.stopPropagation();
                          setMatchedIds && setMatchedIds(function(prev) {
                            var next = new Set(prev);
                            next.has(u.id) ? next.delete(u.id) : next.add(u.id);
                            return next;
                          });
                        }}
                          style={{ width:'100%', padding:'10px 0', borderRadius:10,
                            border:'none', cursor:'pointer', fontFamily:FF,
                            fontSize:12, fontWeight:800, transition:'all 0.15s',
                            background: matched
                              ? 'rgba(255,255,255,0.08)'
                              : `linear-gradient(90deg, ${C.primary}, ${C.primary}CC)`,
                            color: matched ? C.g[60] : '#fff' }}>
                          {matched ? '매칭 취소' : '🤝 매칭 신청하기'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 하단 고정 모집 글 올리기 버튼 ── */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        background:`linear-gradient(to top, ${C.bg} 55%, transparent)`,
        padding:'16px 16px calc(env(safe-area-inset-bottom,16px) + 16px)',
        display:'flex', gap:10 }}>
        <div style={{ flex:1, padding:'13px 16px', borderRadius:12,
          background:`linear-gradient(135deg, ${lc}20, ${C.card})`,
          border:`1px solid ${lc}35`, display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF,
              marginBottom:2 }}>나도 친구 구하기</div>
            <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
              {station.name}에서 같이 놀 친구를 모집해보세요
            </div>
          </div>
          <button onClick={function() { onWrite && onWrite(); }}
            style={{ padding:'9px 18px', borderRadius:10, border:'none', cursor:'pointer',
              background:`linear-gradient(90deg, ${lc}, ${C.primary})`,
              fontSize:12, fontWeight:800, color:'#fff', fontFamily:FF,
              flexShrink:0, boxShadow:`0 2px 12px ${lc}40` }}>
            ✏️ 올리기
          </button>
        </div>
      </div>

      {/* ── 필터 바텀시트 ── */}
      <div onClick={function() { setShowFilter(false); }}
        style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.65)',
          backdropFilter:'blur(3px)', zIndex:900,
          opacity: showFilter ? 1 : 0, pointerEvents: showFilter ? 'auto' : 'none',
          transition:'opacity 0.25s' }} />

      <div style={{ position:'fixed', left:0, right:0, bottom:0, zIndex:901,
        background:C.card, borderRadius:'22px 22px 0 0',
        border:`1px solid ${C.border}`, borderBottom:'none',
        boxShadow:'0 -8px 40px rgba(0,0,0,0.55)',
        transform: showFilter ? 'translateY(0)' : 'translateY(100%)',
        transition:'transform 0.32s cubic-bezier(0.32,0.72,0,1)',
        paddingBottom:'env(safe-area-inset-bottom,24px)' }}>

        <div style={{ display:'flex', justifyContent:'center', padding:'14px 0 2px' }}>
          <div style={{ width:38, height:4, borderRadius:2, background:'rgba(255,255,255,0.18)' }} />
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'10px 20px 14px', borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:16, fontWeight:900, color:C.white, fontFamily:FF }}>필터</span>
          <button onClick={function() { setShowFilter(false); }}
            style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:8,
              width:32, height:32, cursor:'pointer', color:C.g[60], fontSize:17,
              display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        <div style={{ padding:'22px 20px 8px' }}>
          {/* 같은 국적 토글 */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            marginBottom:22, paddingBottom:22, borderBottom:`1px solid ${C.border}` }}>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF }}>같은 국적만 보기</div>
              <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:3 }}>나와 같은 나라 사람만 필터링</div>
            </div>
            <div onClick={function() { setDraftSameOnly(function(v) { return !v; }); }}
              style={{ width:46, height:26, borderRadius:13, cursor:'pointer',
                background: draftSameOnly ? C.primary : 'rgba(255,255,255,0.14)',
                position:'relative', transition:'background 0.2s', flexShrink:0 }}>
              <div style={{ position:'absolute', top:4,
                left: draftSameOnly ? 23 : 3, width:18, height:18, borderRadius:9,
                background:'#fff', transition:'left 0.2s',
                boxShadow:'0 1px 4px rgba(0,0,0,0.35)' }} />
            </div>
          </div>
          {/* 국적 필터 */}
          <div style={{ fontSize:11, fontWeight:700, color:C.g[60], fontFamily:FF,
            letterSpacing:'0.05em', marginBottom:12 }}>특정 국적 필터</div>
          <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:28 }}>
            {['전체', ...countries].map(function(ctry) {
              var act = draftCountry === ctry;
              return (
                <div key={ctry} onClick={function() { setDraftCountry(ctry); }}
                  style={{ padding:'7px 15px', borderRadius:20, cursor:'pointer',
                    background: act ? C.primary : 'rgba(255,255,255,0.06)',
                    border:`1px solid ${act ? C.primary : C.border}` }}>
                  <span style={{ fontSize:12, fontWeight:700, fontFamily:FF,
                    color: act ? '#fff' : C.g[60] }}>{ctry}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display:'flex', gap:10, padding:'0 20px 16px' }}>
          <button onClick={function() {
              setDraftSameOnly(false); setDraftCountry('전체');
            }}
            style={{ flex:1, padding:'13px 0', borderRadius:12, cursor:'pointer',
              background:'rgba(255,255,255,0.06)',
              border:`1px solid ${C.border}`, fontSize:13, fontWeight:700,
              color:C.g[60], fontFamily:FF }}>초기화</button>
          <button onClick={function() {
              setSameOnly(draftSameOnly); setFilterCountry(draftCountry);
              setShowFilter(false);
            }}
            style={{ flex:2, padding:'13px 0', borderRadius:12, cursor:'pointer',
              background:`linear-gradient(90deg,${C.primary},${C.primary}CC)`,
              border:'none', fontSize:13, fontWeight:800, color:'#fff', fontFamily:FF }}>
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   역 인연 매칭 — 메인 화면
   ══════════════════════════════════════════════════════════ */
function MeetupScreen({ onBack }) {
  const [selStation,    setSelStation]    = useState('myeongdong');
  const [activeTab,     setActiveTab]     = useState('meetup');
  const [filterCountry, setFilterCountry] = useState('전체');
  const [myCountry]                       = useState('한국');
  const [sameOnly,      setSameOnly]      = useState(false);
  const [matchedIds,    setMatchedIds]    = useState(new Set());
  const [likedReviews,  setLikedReviews]  = useState(new Set());
  const [showFilter,    setShowFilter]    = useState(false);
  /* 바텀시트 전용 임시 상태 — 적용하기를 눌러야만 실제 필터에 반영 */
  const [draftSameOnly,      setDraftSameOnly]      = useState(false);
  const [draftFilterCountry, setDraftFilterCountry] = useState('전체');
  const [showWrite,       setShowWrite]       = useState(false);
  const [showReviewWrite, setShowReviewWrite] = useState(false);
  const [showMeetupList,  setShowMeetupList]  = useState(false);
  const [selectedUser,    setSelectedUser]    = useState(null);
  /* 사용자가 작성한 모집 글 목록 */
  const [myPosts,         setMyPosts]         = useState([]);

  /* ── 전체 목록 화면 ── */
  if (showMeetupList) {
    return (
      <MeetupFullListScreen
        station={MEETUP_STATIONS.find(function(s) { return s.id === selStation; })}
        allUsers={MEETUP_USERS.filter(function(u) { return u.stationId === selStation; })}
        myPosts={myPosts.filter(function(p) { return p.stationId === selStation; })}
        setMyPosts={setMyPosts}
        matchedIds={matchedIds}
        setMatchedIds={setMatchedIds}
        onBack={function() { setShowMeetupList(false); }}
        onWrite={function() { setShowMeetupList(false); setShowWrite(true); }}
        onUserDetail={function(u) { setShowMeetupList(false); setSelectedUser(u); }}
      />
    );
  }

  /* 후기 쓰기 화면 */
  if (showReviewWrite) {
    return (
      <StationReviewWriteScreen
        station={MEETUP_STATIONS.find(function(s) { return s.id === selStation; })}
        onBack={function() { setShowReviewWrite(false); }}
        onSubmit={function() { setShowReviewWrite(false); }}
      />
    );
  }

  /* 매칭 상세 화면 */
  if (selectedUser) {
    return (
      <MatchDetailScreen
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
        isMatched={matchedIds.has(selectedUser.id)}
        onMatch={u => setMatchedIds(prev => {
          const s = new Set(prev);
          s.has(u.id) ? s.delete(u.id) : s.add(u.id);
          return s;
        })}
      />
    );
  }

  /* 글쓰기 화면 */
  if (showWrite) {
    return (
      <MeetupWriteScreen
        onBack={() => setShowWrite(false)}
        defaultStation={selStation}
        onSubmit={data => {
          const newPost = {
            id: Date.now(),
            nick: '이효범',
            flag: '🇰🇷',
            country: '한국',
            age: 29,
            stationId: data.selStation,
            date: data.selDate,
            time: data.selTime,
            interests: data.selInterests,
            bio: data.bio,
            gender: data.gender,
            matched: false,
            isMe: true,
          };
          setMyPosts(prev => [newPost, ...prev]);
          setSelStation(data.selStation);
        }}
      />
    );
  }

  const station = MEETUP_STATIONS.find(s => s.id === selStation);
  const lc      = C.line[station.lineId] ?? C.primary;

  /* 필터 적용된 유저 목록 (내 글 포함) */
  const allUsers = [...myPosts, ...MEETUP_USERS];
  const filteredUsers = allUsers.filter(u => {
    if (u.stationId !== selStation) return false;
    if (sameOnly && u.country !== myCountry) return false;
    if (filterCountry !== '전체' && u.country !== filterCountry) return false;
    return true;
  });

  /* 활성 필터 개수 — 헤더 뱃지에 표시 */
  const filterCount = (sameOnly ? 1 : 0) + (filterCountry !== '전체' ? 1 : 0);

  /* 현재 역 리뷰 */
  const stationReviews = STATION_REVIEWS.filter(r => r.stationId === selStation);

  /* 호선 short */
  const shortLine = id => ({ '1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','sin':'신' })[id] ?? id;

  /* 별점 렌더 */
  const Stars = ({ n }) => (
    <span style={{ fontSize:11, letterSpacing:1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i<=n ? '#F59E0B' : 'rgba(255,255,255,0.15)' }}>★</span>
      ))}
    </span>
  );

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', background:C.bg, overflow:'hidden' }}>

      {/* ── 스티키 헤더 ──────────────────────────── */}
      <div style={{ position:'sticky', top:0, zIndex:200,
        background:'rgba(14,15,20,0.97)', backdropFilter:'blur(12px)',
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', gap:12, padding:'0 16px' }}>
            <button onClick={onBack}
              style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:10,
                width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', fontSize:16, color:C.white, flexShrink:0 }}>←</button>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em' }}>아하철 인연 매칭</div>
              <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>역에서 새로운 인연을 만나세요</div>
            </div>
            {/* 필터 버튼 — 클릭 시 현재 적용값을 draft에 복사하고 시트 오픈 */}
            <button
              onClick={() => {
                setDraftSameOnly(sameOnly);
                setDraftFilterCountry(filterCountry);
                setShowFilter(true);
              }}
              style={{ background: filterCount > 0 ? `${C.primary}20` : 'rgba(255,255,255,0.07)',
                border:`1px solid ${filterCount > 0 ? C.primary+'60' : C.border}`,
                borderRadius:8, padding:'6px 12px', cursor:'pointer',
                display:'flex', alignItems:'center', gap:5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke={filterCount > 0 ? C.primary : C.g[60]} strokeWidth="2.5">
                <line x1="4" y1="6" x2="20" y2="6"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
                <line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                color: filterCount > 0 ? C.primary : C.g[60] }}>필터</span>
              {/* 활성 필터 개수 뱃지 */}
              {filterCount > 0 && (
                <div style={{ minWidth:16, height:16, borderRadius:8,
                  background:C.primary, display:'flex', alignItems:'center',
                  justifyContent:'center', padding:'0 4px' }}>
                  <span style={{ fontSize:9, fontWeight:900, color:'#fff',
                    fontFamily:FF, lineHeight:1 }}>{filterCount}</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflowY:'auto', paddingBottom:80, scrollbarWidth:'none' }}>

        {/* ── 역 선택 가로 스크롤 ───────────────── */}
        <div style={{ padding:'14px 0 0', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', gap:8, padding:'0 16px 14px',
            overflowX:'auto', scrollbarWidth:'none' }}>
            {MEETUP_STATIONS.map(s => {
              const act = s.id === selStation;
              const slc = C.line[s.lineId] ?? C.primary;
              return (
                <div key={s.id} onClick={() => setSelStation(s.id)}
                  style={{ flexShrink:0, display:'flex', flexDirection:'column',
                    alignItems:'center', gap:6, cursor:'pointer' }}>
                  {/* 호선 컬러 원 */}
                  <div style={{ width:52, height:52, borderRadius:26,
                    background: act ? slc : `${slc}20`,
                    border:`2px solid ${act ? slc : `${slc}40`}`,
                    display:'flex', flexDirection:'column',
                    alignItems:'center', justifyContent:'center',
                    transition:'all 0.15s' }}>
                    <span style={{ fontSize:16 }}>{s.emoji}</span>
                  </div>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize:11, fontWeight: act ? 800 : 500,
                      color: act ? C.white : C.g[60], fontFamily:FF,
                      whiteSpace:'nowrap' }}>{s.name.replace('역','')}</div>
                    <div style={{ fontSize:9, color: act ? slc : C.g[80], fontFamily:FF,
                      fontWeight:600 }}>
                      {MEETUP_USERS.filter(u=>u.stationId===s.id).length}명 모집중
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 선택된 역 인포 카드 ───────────────── */}
        <div style={{ margin:'16px 16px 0',
          background:`linear-gradient(135deg, ${lc}20 0%, ${C.card} 70%)`,
          border:`1px solid ${lc}40`, borderRadius:16, padding:'16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:44, height:44, borderRadius:22, background:lc,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'#fff', fontSize:16, fontWeight:900, flexShrink:0 }}>
              {shortLine(station.lineId)}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                <span style={{ fontSize:16, fontWeight:900, color:C.white, fontFamily:FF,
                  letterSpacing:'-0.03em' }}>{station.name}</span>
                <span style={{ fontSize:10, color:lc, fontWeight:700, fontFamily:FF,
                  background:`${lc}18`, padding:'2px 7px', borderRadius:3 }}>{station.emoji} 핫스팟</span>
              </div>
              <div style={{ fontSize:11, color:C.g[60], fontFamily:FF, marginBottom:8 }}>
                {station.desc}
              </div>
              <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                {station.vibe.map(v => (
                  <span key={v} style={{ fontSize:10, color:C.g[50], fontFamily:FF,
                    background:C.glass2, padding:'2px 8px', borderRadius:3 }}>
                    #{v}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ textAlign:'center', flexShrink:0 }}>
              <div style={{ fontSize:20, fontWeight:900, color:lc, fontFamily:FF }}>{station.foreigners}</div>
              <div style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>이번 주 방문객</div>
            </div>
          </div>
        </div>

        {/* 필터는 바텀시트로 이동 — 여기서 렌더 제거 */}

        {/* ── 탭 바 ─────────────────────────────── */}
        <div style={{ display:'flex', margin:'16px 16px 0',
          background:C.card, border:`1px solid ${C.border}`, borderRadius:10,
          padding:3, gap:3 }}>
          {[['meetup','🤝 인연 찾기'],['review','📝 역 리뷰']].map(([id, label]) => (
            <div key={id} onClick={() => setActiveTab(id)}
              style={{ flex:1, padding:'8px 0', borderRadius:8, textAlign:'center',
                cursor:'pointer', transition:'all 0.15s',
                background: activeTab===id ? C.white : 'transparent' }}>
              <span style={{ fontSize:12, fontWeight:800, fontFamily:FF,
                color: activeTab===id ? '#0E0F14' : C.g[70] }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ════════ 인연 찾기 탭 ════════════════════ */}
        {activeTab === 'meetup' && (
          <div style={{ padding:'16px' }}>
            {/* 활성 인원 요약 헤더 */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              marginBottom:14 }}>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF,
                  display:'flex', alignItems:'center', gap:7 }}>
                  {station.name}
                  <div style={{ display:'flex', alignItems:'center', gap:3,
                    background:`${C.keyColor}18`, border:`1px solid ${C.keyColor}40`,
                    borderRadius:5, padding:'1px 6px' }}>
                    <div style={{ width:5, height:5, borderRadius:3, background:C.keyColor }} />
                    <span style={{ fontSize:9, color:C.keyColor, fontWeight:700, fontFamily:FF }}>LIVE</span>
                  </div>
                </div>
                <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:2 }}>
                  지금 {filteredUsers.length}명이 친구를 찾고 있어요
                </div>
              </div>
              <button onClick={function() { setShowMeetupList(true); }}
                style={{ display:'flex', alignItems:'center', gap:5,
                  padding:'7px 14px', borderRadius:9,
                  background:`${lc}18`, border:`1px solid ${lc}40`,
                  cursor:'pointer', flexShrink:0 }}>
                <span style={{ fontSize:11, fontWeight:700, color:lc, fontFamily:FF }}>전체 보기</span>
                <svg width="8" height="12" viewBox="0 0 8 14" fill="none">
                  <path d="M1 1l6 6-6 6" stroke={lc} strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {filteredUsers.length === 0 ? (
              <div style={{ textAlign:'center', padding:'48px 0', color:C.g[70] }}>
                <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
                <div style={{ fontSize:13, fontFamily:FF }}>해당 조건의 친구가 없어요</div>
                <div style={{ fontSize:11, color:C.g[80], marginTop:6, fontFamily:FF }}>
                  필터를 조정해 보세요
                </div>
              </div>
            ) : (
              /* ── 미리보기: 최대 3개만 표시 ── */
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {filteredUsers.slice(0, 3).map(u => {
                  const matched = matchedIds.has(u.id);
                  /* ─── 카드 테두리·배경: 내 글이면 노란 계열, 매칭이면 파란 계열 ─── */
                  const cardBg     = u.isMe ? 'rgba(255,200,60,0.05)' : matched ? `${C.primary}0C` : C.card;
                  const cardBorder = u.isMe ? 'rgba(255,200,60,0.35)' : matched ? `${C.primary}40` : C.border;
                  return (
                    <div key={u.id}
                      onClick={() => !u.isMe && setSelectedUser(u)}
                      style={{ background: cardBg,
                        border:`1px solid ${cardBorder}`,
                        borderRadius:14, padding:'16px',
                        transition:'border-color 0.2s',
                        position:'relative' }}>
                      {/* ─── 내 글 리본 뱃지 ─── */}
                      {u.isMe && (
                        <div style={{ position:'absolute', top:10, right:10,
                          fontSize:9, fontWeight:800, color:'#FFC83C',
                          background:'rgba(255,200,60,0.18)', padding:'2px 8px',
                          borderRadius:4, fontFamily:FF, letterSpacing:0.5 }}>
                          ✦ 내 글
                        </div>
                      )}
                      <div style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                        {/* 아바타 */}
                        <div style={{ flexShrink:0 }}>
                          <div style={{ width:46, height:46, borderRadius:23,
                            background: u.isMe ? 'rgba(255,200,60,0.2)' : `${lc}25`,
                            border:`1.5px solid ${u.isMe ? 'rgba(255,200,60,0.5)' : `${lc}50`}`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:18, fontWeight:900, color: u.isMe ? '#FFC83C' : lc,
                            fontFamily:FF }}>
                            {u.flag}
                          </div>
                        </div>
                        {/* 메인 정보 */}
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4,
                            paddingRight: u.isMe ? 52 : 0 }}>
                            <span style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF }}>
                              {u.nick}
                            </span>
                            <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                              {u.country} · {u.age}세
                            </span>
                            {/* 매칭됨 뱃지 — 내 글이 아닐 때만 */}
                            {!u.isMe && matched && (
                              <span style={{ fontSize:9, fontWeight:700, color:C.primary,
                                background:`${C.primary}18`, padding:'1px 6px', borderRadius:3,
                                fontFamily:FF, marginLeft:'auto' }}>매칭됨 ✓</span>
                            )}
                          </div>
                          {/* 방문 일정 */}
                          <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8 }}>
                            <span style={{ fontSize:10,
                              color: u.isMe ? '#FFC83C' : lc, fontWeight:700,
                              background: u.isMe ? 'rgba(255,200,60,0.15)' : `${lc}15`,
                              padding:'2px 8px', borderRadius:3, fontFamily:FF }}>
                              {u.date} {u.time}
                            </span>
                          </div>
                          {/* 소개 */}
                          <div style={{ fontSize:12, color:C.g[50], lineHeight:1.55,
                            fontFamily:FF, marginBottom:10 }}>
                            {u.bio}
                          </div>
                          {/* 관심사 태그 */}
                          <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:12 }}>
                            {u.interests.map(t => (
                              <span key={t} style={{ fontSize:10, color:C.g[60], fontFamily:FF,
                                background:C.glass2, padding:'2px 8px', borderRadius:3 }}>
                                #{t}
                              </span>
                            ))}
                          </div>
                          {/* ─── 버튼 분기: 내 글 → 삭제 / 타인 → 매칭 신청·취소 ─── */}
                          {u.isMe ? (
                            <button
                              onClick={() => setMyPosts(prev => prev.filter(p => p.id !== u.id))}
                              style={{ width:'100%', padding:'10px 0', borderRadius:10,
                                border:`1px solid rgba(255,255,255,0.12)`, cursor:'pointer',
                                fontFamily:FF, fontSize:12, fontWeight:700,
                                background:C.glass1, color:C.g[60],
                                transition:'all 0.15s' }}>
                              🗑 내 글 삭제
                            </button>
                          ) : (
                            <button
                              onClick={() => setMatchedIds(prev => {
                                const next = new Set(prev);
                                next.has(u.id) ? next.delete(u.id) : next.add(u.id);
                                return next;
                              })}
                              style={{ width:'100%', padding:'10px 0', borderRadius:10,
                                border:'none', cursor:'pointer', fontFamily:FF,
                                fontSize:12, fontWeight:800, transition:'all 0.15s',
                                background: matched
                                  ? 'rgba(255,255,255,0.08)'
                                  : `linear-gradient(90deg, ${C.primary}, ${C.primary}CC)`,
                                color: matched ? C.g[60] : '#fff' }}>
                              {matched ? '매칭 취소' : '🤝 매칭 신청하기'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* ── 전체 보기 유도 배너 (3개 초과 시) ── */}
                {filteredUsers.length > 3 && (
                  <div onClick={function() { setShowMeetupList(true); }}
                    style={{ background:`linear-gradient(135deg, ${lc}14, ${C.card})`,
                      border:`1px solid ${lc}35`, borderRadius:14,
                      padding:'16px', cursor:'pointer',
                      display:'flex', alignItems:'center', gap:12 }}>
                    {/* 나머지 인원 아바타 스택 */}
                    <div style={{ display:'flex', marginLeft:4 }}>
                      {filteredUsers.slice(3, 6).map(function(u, i) {
                        return (
                          <div key={u.id} style={{ width:32, height:32, borderRadius:16,
                            background:`${lc}30`, border:`2px solid ${C.bg}`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:16, marginLeft: i > 0 ? -10 : 0,
                            zIndex: 3 - i, position:'relative' }}>
                            {u.flag}
                          </div>
                        );
                      })}
                      {filteredUsers.length > 6 && (
                        <div style={{ width:32, height:32, borderRadius:16,
                          background:'rgba(255,255,255,0.1)',
                          border:`2px solid ${C.bg}`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:10, color:C.g[60], fontWeight:700, fontFamily:FF,
                          marginLeft:-10, position:'relative', zIndex:0 }}>
                          +{filteredUsers.length - 6}
                        </div>
                      )}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF,
                        marginBottom:2 }}>
                        {filteredUsers.length - 3}명이 더 친구를 기다리고 있어요
                      </div>
                      <div style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
                        전체 목록 보기 →
                      </div>
                    </div>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M1 1l6 6-6 6" stroke={lc} strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            )}

            {/* 나도 모집하기 CTA */}
            <div style={{ marginTop:16, padding:'16px',
              background:`linear-gradient(135deg, ${C.primary}15, ${C.card})`,
              border:`1px solid ${C.primary}30`, borderRadius:14, textAlign:'center' }}>
              <div style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF,
                marginBottom:4 }}>나도 친구 구하기</div>
              <div style={{ fontSize:11, color:C.g[60], fontFamily:FF, marginBottom:12 }}>
                {station.name}에서 같이 놀 친구를 모집해보세요
              </div>
              <button onClick={() => setShowWrite(true)}
                style={{ padding:'10px 28px', borderRadius:10,
                  background:C.primary, border:'none', cursor:'pointer',
                  fontSize:12, fontWeight:800, color:'#fff', fontFamily:FF }}>
                ✏️ 모집 글 올리기
              </button>
            </div>
          </div>
        )}

        {/* ════════ 역 리뷰 탭 ═════════════════════ */}
        {activeTab === 'review' && (
          <div style={{ padding:'16px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              marginBottom:14 }}>
              <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                {station.name} 방문 후기 {stationReviews.length}개
              </span>
              <button onClick={function() { setShowReviewWrite(true); }}
                style={{ padding:'6px 14px', borderRadius:8,
                background:C.primary, border:'none', cursor:'pointer',
                fontSize:11, fontWeight:700, color:'#fff', fontFamily:FF,
                display:'flex', alignItems:'center', gap:5 }}>
                ✏️ 후기 쓰기
              </button>
            </div>

            {stationReviews.length === 0 ? (
              <div style={{ textAlign:'center', padding:'48px 0', display:'flex',
                flexDirection:'column', alignItems:'center', gap:12 }}>
                <div style={{ fontSize:40 }}>📝</div>
                <div style={{ fontSize:13, color:C.g[70], fontFamily:FF }}>
                  아직 후기가 없어요. 첫 번째 후기를 남겨보세요!
                </div>
                <button onClick={function() { setShowReviewWrite(true); }}
                  style={{ marginTop:4, padding:'10px 24px', borderRadius:10,
                    background:C.primary, border:'none', cursor:'pointer',
                    fontSize:12, fontWeight:700, color:'#fff', fontFamily:FF }}>
                  ✏️ 첫 후기 작성하기
                </button>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {/* ── 평점 요약 바 ── */}
                {stationReviews.length > 0 && (function() {
                  var avg = (stationReviews.reduce(function(s,r){ return s+r.rating; },0) / stationReviews.length).toFixed(1);
                  return (
                    <div style={{ background:C.card, border:`1px solid ${C.border}`,
                      borderRadius:14, padding:'14px 16px',
                      display:'flex', alignItems:'center', gap:16 }}>
                      <div style={{ textAlign:'center', flexShrink:0 }}>
                        <div style={{ fontSize:36, fontWeight:900, color:C.white, fontFamily:FF,
                          lineHeight:1, letterSpacing:'-0.04em' }}>{avg}</div>
                        <div style={{ display:'flex', gap:2, justifyContent:'center', marginTop:4 }}>
                          {[1,2,3,4,5].map(function(i) {
                            return <span key={i} style={{ fontSize:11,
                              color: i <= Math.round(parseFloat(avg)) ? '#F59E0B' : 'rgba(255,255,255,0.12)' }}>★</span>;
                          })}
                        </div>
                        <div style={{ fontSize:9, color:C.g[70], fontFamily:FF, marginTop:3 }}>
                          {stationReviews.length}개 후기
                        </div>
                      </div>
                      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
                        {[5,4,3,2,1].map(function(n) {
                          var cnt = stationReviews.filter(function(r){ return r.rating === n; }).length;
                          var pct = (cnt / stationReviews.length) * 100;
                          return (
                            <div key={n} style={{ display:'flex', alignItems:'center', gap:6 }}>
                              <span style={{ fontSize:9, color:C.g[70], fontFamily:FF, width:8, textAlign:'right' }}>{n}</span>
                              <span style={{ fontSize:9, color:'#F59E0B' }}>★</span>
                              <div style={{ flex:1, height:5, background:'rgba(255,255,255,0.07)',
                                borderRadius:3, overflow:'hidden' }}>
                                <div style={{ width:`${pct}%`, height:'100%', borderRadius:3,
                                  background: n >= 4 ? '#F59E0B' : n === 3 ? '#F97316' : '#EF4444' }} />
                              </div>
                              <span style={{ fontSize:9, color:C.g[80], fontFamily:FF, width:12 }}>
                                {cnt > 0 ? cnt : ''}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* ── 고도화 후기 카드 목록 ── */}
                {stationReviews.map(function(r) {
                  const liked = likedReviews.has(r.id);
                  /* 카테고리 mock 점수 */
                  var mockCats = [
                    { icon:'🚇', label:'교통', score: Math.min(5, Math.max(3, r.rating - (r.id%2 === 0 ? 1 : 0))) },
                    { icon:'🍜', label:'맛집', score: Math.min(5, Math.max(2, r.rating)) },
                    { icon:'✨', label:'분위기', score: Math.min(5, r.rating) },
                    { icon:'🛡️', label:'안전', score: 4 },
                  ];
                  /* 키워드 tags */
                  var mockKws = r.rating >= 5
                    ? ['인스타감성 🤳', '힐링됨 🌿', '현지인 맛집 🏠']
                    : r.rating >= 4
                    ? ['가성비 최고 💰', '접근성 굿 👍']
                    : ['포포포 📸'];
                  /* 사진 mock */
                  var mockPhotos = r.id % 3 === 0
                    ? ['🏙️','☕','🍜']
                    : r.id % 2 === 0
                    ? ['🚉','🌃']
                    : [];
                  return (
                    <div key={r.id} style={{ background:C.card,
                      border:`1px solid ${C.border}`, borderRadius:16, overflow:'hidden' }}>

                      {/* 사진 썸네일 그리드 */}
                      {mockPhotos.length > 0 && (
                        <div style={{ display:'flex', gap:2, height:80 }}>
                          {mockPhotos.map(function(em, pi) {
                            return (
                              <div key={pi} style={{ flex: pi===0 ? 2 : 1,
                                background:`${lc}${pi===0?'28':'18'}`,
                                display:'flex', alignItems:'center', justifyContent:'center',
                                fontSize: pi===0 ? 30 : 22, position:'relative' }}>
                                {em}
                                {pi === 0 && mockPhotos.length > 1 && (
                                  <div style={{ position:'absolute', bottom:5, right:5,
                                    background:'rgba(0,0,0,0.55)', borderRadius:4,
                                    padding:'2px 5px', fontSize:9, color:'#fff', fontFamily:FF }}>
                                    +{mockPhotos.length}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      <div style={{ padding:'14px 16px' }}>
                        {/* 작성자 헤더 */}
                        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                          <div style={{ width:40, height:40, borderRadius:20,
                            background:`${lc}20`, border:`1.5px solid ${lc}40`,
                            display:'flex', alignItems:'center', justifyContent:'center',
                            fontSize:20, flexShrink:0 }}>
                            {r.flag}
                          </div>
                          <div style={{ flex:1 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                              <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                                {r.nick}
                              </span>
                              <span style={{ fontSize:10, color:lc, background:`${lc}18`,
                                padding:'1px 7px', borderRadius:4, fontFamily:FF, fontWeight:600 }}>
                                {r.country}
                              </span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                              <Stars n={r.rating} />
                              <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{r.date}</span>
                            </div>
                          </div>
                          {/* 총점 뱃지 */}
                          <div style={{ textAlign:'center', background:`rgba(245,158,11,0.12)`,
                            border:'1px solid rgba(245,158,11,0.3)', borderRadius:10,
                            padding:'6px 10px', flexShrink:0 }}>
                            <div style={{ fontSize:18, fontWeight:900, color:'#F59E0B', fontFamily:FF,
                              lineHeight:1 }}>{r.rating}.0</div>
                            <div style={{ fontSize:8, color:'rgba(245,158,11,0.7)', fontFamily:FF }}>/ 5.0</div>
                          </div>
                        </div>

                        {/* 카테고리 미니 점수 */}
                        <div style={{ display:'flex', gap:6, marginBottom:10,
                          padding:'10px 0', borderRadius:10,
                          borderTop:`1px solid ${C.border}`,
                          borderBottom:`1px solid ${C.border}` }}>
                          {mockCats.map(function(cat) {
                            var barW = (cat.score / 5) * 100;
                            return (
                              <div key={cat.label} style={{ flex:1, textAlign:'center' }}>
                                <div style={{ fontSize:14, marginBottom:2 }}>{cat.icon}</div>
                                <div style={{ fontSize:9, color:C.g[70], fontFamily:FF, marginBottom:4 }}>
                                  {cat.label}
                                </div>
                                {/* 미니 바 */}
                                <div style={{ height:3, background:'rgba(255,255,255,0.08)',
                                  borderRadius:2, overflow:'hidden', marginBottom:3 }}>
                                  <div style={{ width:`${barW}%`, height:'100%', borderRadius:2,
                                    background: cat.score >= 4 ? '#F59E0B' : cat.score >= 3 ? '#F97316' : '#EF4444' }} />
                                </div>
                                <div style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                                  color: cat.score >= 4 ? '#F59E0B' : cat.score >= 3 ? '#F97316' : '#EF4444' }}>
                                  {cat.score}.0
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* 키워드 태그 */}
                        <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                          {mockKws.map(function(k) {
                            return (
                              <span key={k} style={{ fontSize:10, color:lc,
                                background:`${lc}15`, padding:'3px 10px', borderRadius:20,
                                fontFamily:FF, fontWeight:600,
                                border:`1px solid ${lc}30` }}>{k}</span>
                            );
                          })}
                        </div>

                        {/* 본문 (3줄 클램프) */}
                        <div style={{ fontSize:13, color:C.g[50], lineHeight:1.65,
                          fontFamily:FF, marginBottom:10,
                          display:'-webkit-box', WebkitLineClamp:3,
                          WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                          {r.content}
                        </div>

                        {/* 추천 장소 */}
                        {r.spots && r.spots.length > 0 && (
                          <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                            {r.spots.map(function(s) {
                              return (
                                <span key={s} style={{ fontSize:10, color:C.g[60],
                                  background:'rgba(255,255,255,0.05)',
                                  padding:'3px 9px', borderRadius:4, fontFamily:FF,
                                  border:`1px solid ${C.border}` }}>📍 {s}</span>
                              );
                            })}
                          </div>
                        )}

                        {/* 좋아요 */}
                        <div style={{ display:'flex', alignItems:'center', gap:6,
                          paddingTop:10, borderTop:`1px solid ${C.border}` }}>
                          <div onClick={() => setLikedReviews(prev => {
                              const next = new Set(prev);
                              next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                              return next;
                            })}
                            style={{ display:'flex', alignItems:'center', gap:5,
                              padding:'5px 12px', borderRadius:8, cursor:'pointer',
                              background: liked ? `${C.primary}18` : 'rgba(255,255,255,0.05)',
                              border:`1px solid ${liked ? C.primary+'50' : C.border}`,
                              transition:'all 0.15s' }}>
                            <span style={{ fontSize:13, color: liked ? C.primary : C.g[70] }}>
                              {liked ? '♥' : '♡'}
                            </span>
                            <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                              color: liked ? C.primary : C.g[60] }}>
                              {liked ? r.likes + 1 : r.likes}
                            </span>
                          </div>
                          <span style={{ fontSize:11, color:C.g[70], fontFamily:FF,
                            cursor:'pointer', marginLeft:4 }}>댓글 달기</span>
                          <span style={{ fontSize:10, color:C.g[80], fontFamily:FF,
                            marginLeft:'auto' }}>도움이 됐어요 👍</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════
          필터 바텀시트 (오버레이)
          ══════════════════════════════════════════════════ */}

      {/* 백드롭 — 시트 열릴 때 뒤를 덮는 반투명 레이어 */}
      <div
        onClick={() => setShowFilter(false)}
        style={{
          position:'fixed', inset:0,
          background:'rgba(0,0,0,0.65)',
          backdropFilter:'blur(3px)',
          zIndex:900,
          opacity: showFilter ? 1 : 0,
          pointerEvents: showFilter ? 'auto' : 'none',
          transition:'opacity 0.25s ease',
        }}
      />

      {/* 시트 본체 */}
      <div style={{
        position:'fixed', left:0, right:0, bottom:0,
        zIndex:901,
        background:C.card,
        borderRadius:'22px 22px 0 0',
        border:`1px solid ${C.border}`,
        borderBottom:'none',
        boxShadow:'0 -8px 40px rgba(0,0,0,0.55)',
        transform: showFilter ? 'translateY(0)' : 'translateY(100%)',
        transition:'transform 0.32s cubic-bezier(0.32,0.72,0,1)',
        paddingBottom:'env(safe-area-inset-bottom, 24px)',
      }}>

        {/* 드래그 핸들 */}
        <div style={{ display:'flex', justifyContent:'center', padding:'14px 0 2px' }}>
          <div style={{ width:38, height:4, borderRadius:2,
            background:'rgba(255,255,255,0.18)' }} />
        </div>

        {/* 시트 헤더 */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'10px 20px 14px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={C.primary} strokeWidth="2.5">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            <span style={{ fontSize:16, fontWeight:900, color:C.white, fontFamily:FF,
              letterSpacing:'-0.03em' }}>필터</span>
          </div>
          <button onClick={() => setShowFilter(false)}
            style={{ background:'rgba(255,255,255,0.08)', border:'none',
              borderRadius:8, width:32, height:32, cursor:'pointer',
              color:C.g[60], fontSize:17, display:'flex', alignItems:'center',
              justifyContent:'center', fontFamily:FF }}>✕</button>
        </div>

        {/* 필터 내용 영역 — draft 상태만 수정, 목록은 아직 변하지 않음 */}
        <div style={{ padding:'22px 20px 8px' }}>

          {/* ① 같은 국적만 보기 토글 — draftSameOnly 기반 */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            marginBottom:22, paddingBottom:22, borderBottom:`1px solid ${C.border}` }}>
            <div>
              <div style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF }}>
                같은 국적만 보기
              </div>
              <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:3 }}>
                나와 같은 나라 사람만 필터링
              </div>
            </div>
            <div onClick={() => setDraftSameOnly(v => !v)}
              style={{ width:46, height:26, borderRadius:13, cursor:'pointer',
                background: draftSameOnly ? C.primary : 'rgba(255,255,255,0.14)',
                position:'relative', transition:'background 0.2s', flexShrink:0 }}>
              <div style={{ position:'absolute', top:4,
                left: draftSameOnly ? 23 : 3, width:18, height:18, borderRadius:9,
                background:'#fff', transition:'left 0.2s',
                boxShadow:'0 1px 4px rgba(0,0,0,0.35)' }} />
            </div>
          </div>

          {/* ② 국적 필터 — draftFilterCountry 기반 */}
          <div style={{ fontSize:11, fontWeight:700, color:C.g[60], fontFamily:FF,
            letterSpacing:'0.05em', marginBottom:12 }}>
            특정 국적 필터
          </div>
          <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:28 }}>
            {['전체', ...ALL_COUNTRIES].map(ctry => {
              const act = draftFilterCountry === ctry;
              return (
                <div key={ctry} onClick={() => setDraftFilterCountry(ctry)}
                  style={{ padding:'7px 15px', borderRadius:20, cursor:'pointer',
                    background: act ? C.primary : 'rgba(255,255,255,0.06)',
                    border:`1px solid ${act ? C.primary : C.border}`,
                    transition:'all 0.15s' }}>
                  <span style={{ fontSize:12, fontWeight:700, fontFamily:FF,
                    color: act ? '#fff' : C.g[60] }}>{ctry}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 하단 버튼 행 */}
        <div style={{ display:'flex', gap:10, padding:'0 20px 20px' }}>
          {/* 초기화 — draft만 리셋 (실제 적용값 건드리지 않음) */}
          <button
            onClick={() => { setDraftSameOnly(false); setDraftFilterCountry('전체'); }}
            style={{ flex:1, padding:'13px 0', borderRadius:12,
              background:C.glass2,
              border:`1px solid ${C.border}`,
              cursor:'pointer', fontSize:13, fontWeight:700,
              color:C.g[60], fontFamily:FF }}>
            초기화
          </button>
          {/* 적용하기 — draft → 실제 상태 반영 후 닫기 */}
          <button
            onClick={() => {
              setSameOnly(draftSameOnly);
              setFilterCountry(draftFilterCountry);
              setShowFilter(false);
            }}
            style={{ flex:2.2, padding:'13px 0', borderRadius:12,
              background:C.primary, border:'none', cursor:'pointer',
              fontSize:13, fontWeight:800, color:'#fff', fontFamily:FF }}>
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   홈 화면 요약 섹션 — 인연 매칭 배너
   ══════════════════════════════════════════════════════════ */
function MeetupSummarySection({ onEnter }) {
  /* 각 역별 모집 중 인원 */
  const topStations = MEETUP_STATIONS.slice(0, 4).map(s => ({
    ...s,
    count: MEETUP_USERS.filter(u => u.stationId === s.id).length,
    lc: C.line[s.lineId] ?? C.primary,
  }));

  /* 지금 온라인 아바타 샘플 */
  const onlineUsers = MEETUP_USERS.slice(0, 5);

  return (
    <div style={{ padding:'0 16px' }}>
      {/* 섹션 헤더 */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <b style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF,
            letterSpacing:'-0.03em' }}>역에서 인연 만들기</b>
          <span style={{ fontSize:9, fontWeight:700, color:C.keyColor,
            background:'rgba(42,207,108,0.12)', padding:'2px 7px', borderRadius:3, fontFamily:FF }}>LIVE</span>
        </div>
        <span onClick={onEnter}
          style={{ fontSize:12, color:C.g[70], cursor:'pointer', fontFamily:FF }}>전체 보기 ›</span>
      </div>

      {/* 메인 배너 카드 */}
      <div onClick={onEnter}
        style={{ background:`linear-gradient(135deg, #0D1F2D 0%, ${C.card} 100%)`,
          border:`1px solid ${C.primary}30`, borderRadius:16,
          padding:'18px 16px', marginBottom:12, cursor:'pointer',
          position:'relative', overflow:'hidden' }}>
        {/* 배경 그라디언트 장식 */}
        <div style={{ position:'absolute', top:-20, right:-20,
          width:120, height:120, borderRadius:60,
          background:`radial-gradient(circle, ${C.primary}15 0%, transparent 70%)`,
          pointerEvents:'none' }} />
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          {/* 온라인 유저 아바타 스택 */}
          <div style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
            {onlineUsers.map((u, i) => (
              <div key={u.id}
                style={{ width:36, height:36, borderRadius:18,
                  background:`${C.line[MEETUP_STATIONS.find(s=>s.id===u.stationId)?.lineId] ?? C.primary}30`,
                  border:`2px solid ${C.bg}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:16, marginLeft: i > 0 ? -10 : 0,
                  zIndex: onlineUsers.length - i }}>
                {u.flag}
              </div>
            ))}
          </div>
          {/* 텍스트 */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF,
              letterSpacing:'-0.02em', marginBottom:3 }}>
              지금 {MEETUP_USERS.length}명이 친구를 찾고 있어요
            </div>
            <div style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>
              명동 · 홍대 · 성수 · 이태원 +더보기
            </div>
          </div>
          {/* 화살표 */}
          <div style={{ width:30, height:30, borderRadius:15,
            background:C.primary, display:'flex', alignItems:'center', justifyContent:'center',
            flexShrink:0 }}>
            <span style={{ fontSize:14, color:'#fff' }}>›</span>
          </div>
        </div>
      </div>

      {/* 역별 미니 카드 가로 스크롤 */}
      <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none' }}>
        {topStations.map(s => (
          <div key={s.id} onClick={onEnter}
            style={{ flexShrink:0, background:C.card,
              border:`1px solid ${C.border}`, borderRadius:12,
              padding:'12px 14px', cursor:'pointer', minWidth:100 }}>
            <div style={{ fontSize:18, marginBottom:6 }}>{s.emoji}</div>
            <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:4 }}>
              <div style={{ width:12, height:12, borderRadius:6, background:s.lc,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:6, color:'#fff', fontWeight:900, flexShrink:0 }}>
                {({ '1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','sin':'신' })[s.lineId]}
              </div>
              <span style={{ fontSize:11, fontWeight:700, color:C.white, fontFamily:FF,
                whiteSpace:'nowrap' }}>{s.name.replace('역','')}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}>
              <div style={{ width:5, height:5, borderRadius:3, background:C.keyColor }} />
              <span style={{ fontSize:10, color:C.keyColor, fontWeight:700, fontFamily:FF }}>
                {s.count}명 모집중
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════
   알림 & 채팅 — 데이터
   ═══════════════════════════════════════════════════════ */

const NOTIF_DATA = [
  { id:1,  type:'match',   icon:'🤝', title:'매칭 성사!',          body:'Mei Lin님이 매칭 신청을 수락했어요. 명동역에서 3/10 오후 2시에 만나요!', time:'방금 전',   read:false, lineId:'4'   },
  { id:2,  type:'reply',   icon:'💬', title:'댓글 알림',            body:'강남러버님이 내 게시글에 댓글을 달았어요 — "저도 오늘 아침 너무 밀렸어요 ㅠㅠ"', time:'5분 전',   read:false, lineId:'2'   },
  { id:3,  type:'train',   icon:'🚨', title:'운행 장애 해제',        body:'2호선 강남~홍대입구 구간 신호장애가 해제됐어요. 현재 정상 운행 중입니다.', time:'23분 전',  read:false, lineId:'2'   },
  { id:4,  type:'match',   icon:'💌', title:'새 매칭 신청',          body:'Hina님이 명동역 코스메틱 쇼핑 동행을 신청했어요. 수락하시겠어요?',    time:'1시간 전', read:false, lineId:'4'   },
  { id:5,  type:'like',    icon:'♥',  title:'공감 알림',            body:'내 게시글 "출퇴근 혼잡 피하는 시간대 공유"가 50번째 공감을 받았어요!', time:'2시간 전', read:true,  lineId:'5'   },
  { id:6,  type:'notice',  icon:'📢', title:'공지사항',              body:'[안내] 3월 운행 시간표 변경 안내 — 신분당선 평일 첫차 시간 5분 조정',   time:'어제',     read:true,  lineId:'sin' },
  { id:7,  type:'crew',    icon:'🏆', title:'크루 랭킹 진입',        body:'이번 주 인기 크루 TOP 5에 진입했어요! 프로필을 확인해보세요.',        time:'어제',     read:true,  lineId:'2'   },
  { id:8,  type:'train',   icon:'🚇', title:'혼잡도 예보',           body:'내일 오전 8-9시 강남역이 극혼잡 예상돼요. 7시 30분 이전 탑승을 추천해요.', time:'어제',  read:true,  lineId:'2'   },
  { id:9,  type:'reply',   icon:'💬', title:'댓글 알림',            body:'홍대거주민님이 답글을 달았어요 — "5번 출구는 아직도 공사 중이에요 😅"', time:'2일 전',  read:true,  lineId:'2'   },
  { id:10, type:'notice',  icon:'📢', title:'이벤트 알림',           body:'[이벤트] 여의도 벚꽃 축제 기간 특별 열차 증편 운행 — 3/22~4/5',     time:'3일 전',   read:true,  lineId:'5'   },
];

const NOTIF_TYPE_COLOR = {
  match:  '#00BAF6',
  reply:  '#A78BFA',
  train:  '#EF4444',
  like:   '#F43F5E',
  notice: '#F59E0B',
  crew:   '#22C55E',
};

const CHAT_ROOMS = [
  { id:1,  name:'Mei Lin 🇨🇳',        sub:'명동역 쇼핑 동행',     last:'네! 내일 오후 2시에 명동역 3번 출구 앞에서 봐요 😊',       time:'방금',   unread:2, lineId:'4',   isGroup:false, online:true  },
  { id:2,  name:'Hina 🇯🇵',           sub:'명동 코스메틱',        last:'오전 11시에 봐요! 저 올리브영 앞에서 기다릴게요',           time:'3분',    unread:1, lineId:'4',   isGroup:false, online:true  },
  { id:3,  name:'강남역 2호선 크루',   sub:'그룹 채팅 · 12명',    last:'지하철박사: 오늘 퇴근길 꽤 빠르네요 5호차 추천!',          time:'15분',   unread:5, lineId:'2',   isGroup:true,  online:false },
  { id:4,  name:'Sophie 🇫🇷',         sub:'홍대입구역 카페 투어', last:'Quelle cafe vous recommandez? 어느 카페 추천해요?',        time:'1시간',  unread:0, lineId:'2',   isGroup:false, online:false },
  { id:5,  name:'성수역 팝업 탐방대',  sub:'그룹 채팅 · 8명',     last:'Aom: 오늘 어니언 성수 대기 2시간이에요ㅠ 다른 곳 가요',    time:'2시간',  unread:0, lineId:'2',   isGroup:true,  online:false },
  { id:6,  name:'Lucas W. 🇺🇸',       sub:'명동 스트리트 푸드',   last:'The dumplings were amazing! Thanks for the tips 🙏',       time:'어제',   unread:0, lineId:'4',   isGroup:false, online:false },
  { id:7,  name:'신분당선 출퇴근 모임', sub:'그룹 채팅 · 21명',   last:'출퇴근기록자: 판교→강남 28분! 신기록입니다',               time:'어제',   unread:0, lineId:'sin', isGroup:true,  online:false },
  { id:8,  name:'James P. 🇦🇺',       sub:'성수역 커피 투어',     last:'Are you free this Saturday for the Seongsu cafe tour?',    time:'2일 전', unread:0, lineId:'2',   isGroup:false, online:false },
];

// 채팅방별 메시지 (id:1 — Mei Lin)
const CHAT_MESSAGES_1 = [
  { id:1,  isMine:false, text:'안녕하세요! 매칭 신청 수락해주셔서 감사해요 😊', time:'오후 1:12', type:'text' },
  { id:2,  isMine:true,  text:'반가워요! 명동 쇼핑 기대돼요 ㅎㅎ', time:'오후 1:14', type:'text' },
  { id:3,  isMine:false, text:'저 한국어 조금 할 수 있어요. 영어도 괜찮아요?', time:'오후 1:15', type:'text' },
  { id:4,  isMine:true,  text:'물론이죠! 편하게 영어나 한국어 섞어서 해요 😄', time:'오후 1:16', type:'text' },
  { id:5,  isMine:false, text:'좋아요! 혹시 내일 어디서 만날까요? 저는 3번 출구 근처가 편해요', time:'오후 1:18', type:'text' },
  { id:6,  isMine:true,  text:'3번 출구 좋아요! 오후 2시 어때요?', time:'오후 1:19', type:'text' },
  { id:7,  isMine:false, text:'완벽해요! 저 먼저 올리브영 들를 건데 같이 가실래요?', time:'오후 1:20', type:'text' },
  { id:8,  isMine:true,  text:'좋아요~ 화장품 같이 골라요 ㅋㅋ 저도 뭐 살 게 있어서', time:'오후 1:22', type:'text' },
  { id:9,  isMine:false, text:'嗯！那明天见！한국 화장품 너무 좋아해요 💄', time:'오후 1:24', type:'text' },
  { id:10, isMine:true,  text:'ㅋㅋㅋ 맞아요 진짜 좋죠! 그럼 내일 봐요~', time:'오후 1:25', type:'text' },
  { id:11, isMine:false, text:'네! 내일 오후 2시에 명동역 3번 출구 앞에서 봐요 😊', time:'오후 1:26', type:'text' },
];

// 채팅방별 메시지 (id:3 — 강남역 2호선 크루 그룹)
const CHAT_MESSAGES_3 = [
  { id:1,  isMine:false, sender:'판교직장인', text:'안녕하세요~ 오늘 강남역 퇴근길 어떤가요?', time:'오후 5:30', type:'text' },
  { id:2,  isMine:false, sender:'강남러버',   text:'헉 5호차 지금 완전 여유로워요! 빠른 하차도 좋고', time:'오후 5:32', type:'text' },
  { id:3,  isMine:true,  text:'오 진짜요? 저 지금 2호차인데 이동해야겠다', time:'오후 5:33', type:'text' },
  { id:4,  isMine:false, sender:'홍대거주민', text:'신도림 방향은 7호차가 제일 낫더라고요', time:'오후 5:35', type:'text' },
  { id:5,  isMine:false, sender:'판교직장인', text:'저는 신분당선 환승이라 10호차 이용하는데 오늘 환승이 엄청 빨랐어요', time:'오후 5:37', type:'text' },
  { id:6,  isMine:true,  text:'꿀팁 감사합니다 🙏 크루 최고예요', time:'오후 5:38', type:'text' },
  { id:7,  isMine:false, sender:'지하철박사', text:'오늘 퇴근길 꽤 빠르네요 5호차 추천!', time:'오후 5:40', type:'text' },
];

/* ═══════════════════════════════════════════════════════
   알림 페이지
   ═══════════════════════════════════════════════════════ */

function NotifScreen({ onBack, onNavigate }) {
  const [msgs, setMsgs] = useState(NOTIF_DATA);
  const [activeFilter, setActiveFilter] = useState('전체');
  const lineColor = id => C.line[id] ?? C.primary;
  const shortName = id => {
    const m = {'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','sin':'신'};
    return m[id] ?? id;
  };

  const FILTERS = ['전체','매칭','운행','커뮤니티','공지'];
  const filterMap = { '전체':null, '매칭':['match'], '운행':['train'], '커뮤니티':['reply','like','crew'], '공지':['notice'] };
  const unreadCount = msgs.filter(n => !n.read).length;

  const filtered = activeFilter === '전체'
    ? msgs
    : msgs.filter(n => filterMap[activeFilter]?.includes(n.type));

  const markAllRead = () => setMsgs(prev => prev.map(n => ({...n, read:true})));
  const markRead    = id => setMsgs(prev => prev.map(n => n.id===id ? {...n,read:true} : n));

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflowY:'hidden' }}>

      {/* ── 헤더 ─────────────────────────────────────────── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        position:'sticky', top:0, zIndex:200 }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px 0 4px' }}>
          {/* 뒤로가기 */}
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{ flex:1, fontSize:17, fontWeight:800, color:C.white,
            fontFamily:FF, letterSpacing:'-0.035em', textAlign:'center',
            marginRight:44 }}>
            알림
            {unreadCount > 0 && (
              <span style={{ marginLeft:6, fontSize:12, fontWeight:800, color:C.primary,
                background:`${C.primary}18`, padding:'1px 6px', borderRadius:10 }}>
                {unreadCount}
              </span>
            )}
          </span>
        </div>

        {/* 필터 칩 */}
        <div style={{ display:'flex', gap:7, padding:'0 16px 12px',
          overflowX:'auto', scrollbarWidth:'none' }}>
          {FILTERS.map(f => {
            const on = f === activeFilter;
            return (
              <button key={f} onClick={() => setActiveFilter(f)}
                style={{ flexShrink:0, padding:'5px 13px', borderRadius:20,
                  fontSize:12, fontWeight: on ? 800 : 500, fontFamily:FF,
                  background: on ? C.primary : 'rgba(255,255,255,0.05)',
                  color: on ? '#fff' : C.g[60],
                  border: on ? 'none' : `1px solid ${C.border}`,
                  cursor:'pointer', transition:'all 0.2s' }}>
                {f}
              </button>
            );
          })}
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              style={{ flexShrink:0, marginLeft:'auto', padding:'5px 13px', borderRadius:20,
                fontSize:12, fontWeight:600, fontFamily:FF,
                background:'none', color:C.g[70],
                border:`1px solid ${C.border}`, cursor:'pointer' }}>
              모두 읽음
            </button>
          )}
        </div>
      </div>

      {/* ── 알림 목록 ────────────────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none' }}>
        {filtered.length === 0 ? (
          <div style={{ padding:'60px 0', textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>🔔</div>
            <div style={{ fontSize:14, color:C.g[60], fontFamily:FF }}>알림이 없어요</div>
          </div>
        ) : (
          filtered.map((n, i) => {
            const tc = NOTIF_TYPE_COLOR[n.type] ?? C.primary;
            const lc = lineColor(n.lineId);
            return (
              <div key={n.id} onClick={() => {
                  markRead(n.id);
                  if (onNavigate) onNavigate(n);
                }}
                style={{ display:'flex', alignItems:'flex-start', gap:13,
                  padding:'15px 16px',
                  background: n.read ? 'transparent' : `${C.primary}06`,
                  borderBottom:`1px solid ${C.border}`,
                  cursor:'pointer', position:'relative' }}>

                {/* 미읽음 도트 */}
                {!n.read && (
                  <div style={{ position:'absolute', left:6, top:'50%',
                    transform:'translateY(-50%)',
                    width:4, height:4, borderRadius:2, background:C.primary }} />
                )}

                {/* 아이콘 원 */}
                <div style={{ width:44, height:44, borderRadius:22, flexShrink:0,
                  background:`${tc}18`, border:`1.5px solid ${tc}30`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:18, position:'relative' }}>
                  {n.icon}
                  {/* 호선 미니 뱃지 */}
                  <div style={{ position:'absolute', bottom:-2, right:-2,
                    width:16, height:16, borderRadius:8, background:lc,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:7, fontWeight:900, color:'#fff', border:`1.5px solid ${C.bg}` }}>
                    {shortName(n.lineId)}
                  </div>
                </div>

                {/* 텍스트 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center',
                    justifyContent:'space-between', marginBottom:3 }}>
                    <span style={{ fontSize:12, fontWeight: n.read ? 600 : 800,
                      color: n.read ? C.g[60] : C.white, fontFamily:FF }}>
                      {n.title}
                    </span>
                    <span style={{ fontSize:10, color:C.g[80], fontFamily:FF,
                      flexShrink:0, marginLeft:8 }}>
                      {n.time}
                    </span>
                  </div>
                  <div style={{ fontSize:12, color: n.read ? C.g[70] : C.g[50],
                    fontFamily:FF, lineHeight:1.5,
                    display:'-webkit-box', WebkitLineClamp:2,
                    WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {n.body}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div style={{ height:32 }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   채팅 목록 페이지
   ═══════════════════════════════════════════════════════ */

function ChatListScreen({ onBack, onRoom }) {
  const [search, setSearch] = useState('');
  const lineColor = id => C.line[id] ?? C.primary;
  const shortName = id => {
    const m = {'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','sin':'신'};
    return m[id] ?? id;
  };

  const totalUnread = CHAT_ROOMS.reduce((s, r) => s + r.unread, 0);
  const filtered = search
    ? CHAT_ROOMS.filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.last.includes(search))
    : CHAT_ROOMS;

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden' }}>

      {/* ── 헤더 ─────────────────────────────────────────── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        position:'sticky', top:0, zIndex:200 }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px' }}>
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{ flex:1, fontSize:17, fontWeight:800, color:C.white,
            fontFamily:FF, letterSpacing:'-0.035em', textAlign:'center' }}>
            채팅
            {totalUnread > 0 && (
              <span style={{ marginLeft:6, fontSize:12, fontWeight:800, color:'#fff',
                background:C.primary, padding:'1px 7px', borderRadius:10 }}>
                {totalUnread}
              </span>
            )}
          </span>
          <div style={{ width:44, height:44, display:'flex', alignItems:'center',
            justifyContent:'center', cursor:'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={C.g[50]} strokeWidth="2">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
        </div>

        {/* 검색바 */}
        <div style={{ margin:'0 16px 12px',
          background:C.glass1, borderRadius:12,
          border:`1px solid ${C.border}`,
          display:'flex', alignItems:'center', padding:'0 12px', gap:8, height:38 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={C.g[70]} strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="채팅방 검색"
            style={{ flex:1, background:'none', border:'none', outline:'none',
              fontSize:13, color:C.white, fontFamily:FF,
              '::placeholder':{color:C.g[70]} }}
          />
        </div>
      </div>

      {/* ── 채팅방 목록 ──────────────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none' }}>

        {/* 매칭 대기 중 배너 */}
        <div style={{ margin:'12px 16px',
          background:`linear-gradient(100deg,${C.primary}18,${C.primary}08)`,
          border:`1px solid ${C.primary}30`, borderRadius:12,
          padding:'12px 14px', display:'flex', alignItems:'center', gap:12,
          cursor:'pointer' }}>
          <span style={{ fontSize:20 }}>💌</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF, marginBottom:2 }}>
              매칭 신청 1건 대기 중
            </div>
            <div style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>
              Hina님의 신청 — 명동 코스메틱 쇼핑
            </div>
          </div>
          <span style={{ fontSize:11, color:C.primary, fontFamily:FF, fontWeight:700 }}>
            확인 ›
          </span>
        </div>

        {/* 채팅방 리스트 */}
        {filtered.map((room) => {
          const lc = lineColor(room.lineId);
          const initials = room.isGroup
            ? room.name.slice(0,1)
            : room.name.replace(/[🇨🇳🇯🇵🇺🇸🇫🇷🇹🇭🇦🇺🇻🇳🇲🇽🇬🇧]/gu, '').trim().slice(0,1);

          return (
            <div key={room.id} onClick={() => onRoom(room)}
              style={{ display:'flex', alignItems:'center', gap:13,
                padding:'13px 16px', cursor:'pointer',
                background: room.unread > 0 ? `${C.primary}04` : 'transparent',
                borderBottom:`1px solid ${C.border}` }}>

              {/* 아바타 */}
              <div style={{ position:'relative', flexShrink:0 }}>
                <div style={{ width:50, height:50, borderRadius: room.isGroup ? 16 : 25,
                  background: room.isGroup ? `${lc}22` : `${lc}28`,
                  border:`1.5px solid ${lc}40`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:18, fontWeight:900, color:lc, fontFamily:FF }}>
                  {room.isGroup ? '👥' : initials}
                </div>
                {/* 온라인 도트 */}
                {room.online && (
                  <div style={{ position:'absolute', bottom:1, right:1,
                    width:11, height:11, borderRadius:6, background:'#22C55E',
                    border:`2px solid ${C.bg}` }} />
                )}
                {/* 호선 미니뱃지 */}
                <div style={{ position:'absolute', top:-3, right:-3,
                  width:17, height:17, borderRadius:9, background:lc,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:7, fontWeight:900, color:'#fff',
                  border:`1.5px solid ${C.bg}` }}>
                  {shortName(room.lineId)}
                </div>
              </div>

              {/* 텍스트 */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center',
                  justifyContent:'space-between', marginBottom:4 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ fontSize:14, fontWeight: room.unread ? 800 : 600,
                      color:C.white, fontFamily:FF }}>
                      {room.name}
                    </span>
                    {room.isGroup && (
                      <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                        그룹
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize:10, color:C.g[80], fontFamily:FF, flexShrink:0 }}>
                    {room.time}
                  </span>
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize:12, color: room.unread ? C.g[50] : C.g[70],
                    fontFamily:FF, overflow:'hidden', textOverflow:'ellipsis',
                    whiteSpace:'nowrap', flex:1, marginRight:8 }}>
                    {room.last}
                  </span>
                  {room.unread > 0 && (
                    <div style={{ flexShrink:0, minWidth:20, height:20, borderRadius:10,
                      background:C.primary,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      padding:'0 5px' }}>
                      <span style={{ fontSize:10, fontWeight:800,
                        color:'#fff', fontFamily:FF }}>
                        {room.unread}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div style={{ height:32 }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   채팅방 상세 페이지
   ═══════════════════════════════════════════════════════ */

/* ═══ 이모지 데이터 ═══ */
const EMOJI_CATS = {
  '😀': ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','🥰','😘','🤩','🥳','🤗','🤔','😐','😑','😶','🙄','😏','😒','😞','😔','😢','😭','😤','😠','😡','🤬','😱','😨','😰','😥','😓','🤯','😬','🤐','🤢','🤮','🤒','🤕','😴','🥺'],
  '❤️': ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💕','💞','💓','💗','💖','💘','💝','💟','❣️','💔','✨','🌟','⭐','🔥','💫','🎉','🎊','🎈','🎁','🎀','🌈'],
  '👋': ['👋','🤚','🖐️','✋','🤙','👌','🤌','🤏','✌️','🤞','🤟','🤘','👈','👉','👆','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','🫶','🤲','🙏'],
  '🐱': ['🐱','🐶','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🦆','🦋','🐝','🐛','🦗','🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦀','🐡','🐠','🐟','🐋','🐳'],
  '🍕': ['🍕','🍔','🌮','🌯','🥗','🍜','🍝','🍛','🍣','🍱','🥟','🍤','🍙','🍘','🍥','🥮','🍡','🧁','🎂','🍰','🍩','🍪','🍫','🍬','🍭','☕','🍵','🧃','🥤','🍺','🍷','🥂','🍸'],
};
const EMOJI_CAT_LABELS = { '😀':'표정', '❤️':'감정', '👋':'손동작', '🐱':'동물', '🍕':'음식' };

function ChatRoomScreen({ room, onBack, onUser }) {
  const [input,       setInput]       = React.useState('');
  const [messages,    setMessages]    = React.useState(
    room.id === 1 ? CHAT_MESSAGES_1 :
    room.id === 3 ? CHAT_MESSAGES_3 : []
  );
  const [showMenu,    setShowMenu]    = React.useState(false);
  const [showEmoji,   setShowEmoji]   = React.useState(false);
  const [emojiCat,    setEmojiCat]    = React.useState('😀');
  const [showImgOpts, setShowImgOpts] = React.useState(false);
  const bottomRef = React.useRef(null);
  const inputRef  = React.useRef(null);
  const lineColor = id => C.line[id] ?? C.primary;
  const lc = lineColor(room.lineId);

  const shortName = id => {
    const m = {'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','sin':'신'};
    return m[id] ?? id;
  };

  const scrollBottom = () => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:'smooth' }), 60);

  const sendMsg = (txt) => {
    const t = (txt ?? input).trim();
    if (!t) return;
    const now = new Date();
    const ts = `${now.getHours()<12?'오전':'오후'} ${now.getHours()%12||12}:${String(now.getMinutes()).padStart(2,'0')}`;
    setMessages(prev => [...prev, { id:Date.now(), isMine:true, text:t, time:ts, type:'text' }]);
    if (!txt) setInput('');
    setShowEmoji(false);
    scrollBottom();
  };

  const sendImage = (label, bg) => {
    const now = new Date();
    const ts = `${now.getHours()<12?'오전':'오후'} ${now.getHours()%12||12}:${String(now.getMinutes()).padStart(2,'0')}`;
    setMessages(prev => [...prev, {
      id:Date.now(), isMine:true, time:ts, type:'image',
      imgLabel:label, imgBg:bg
    }]);
    setShowImgOpts(false);
    scrollBottom();
  };

  const initials = room.isGroup
    ? room.name.slice(0,1)
    : room.name.replace(/[🇨🇳🇯🇵🇺🇸🇫🇷🇹🇭🇦🇺🇻🇳🇲🇽🇬🇧]/gu,'').trim().slice(0,1);

  const QUICK_REPLIES = ['안녕하세요! 😊','넵!','잠깐만요~','오케이!','고마워요!'];

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden' }}>

      {/* ── 헤더 ──────────────────────────────────── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        position:'sticky', top:0, zIndex:200, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px' }}>

          {/* 뒤로가기 */}
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* 아바타 + 이름 */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
            <div style={{ position:'relative' }}>
              <div style={{ width:36, height:36, borderRadius: room.isGroup ? 11 : 18,
                background:`${lc}28`, border:`1.5px solid ${lc}40`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:14, fontWeight:900, color:lc, fontFamily:FF }}>
                {room.isGroup ? '👥' : initials}
              </div>
              {room.online && (
                <div style={{ position:'absolute', bottom:0, right:0, width:9, height:9,
                  borderRadius:5, background:'#22C55E', border:`1.5px solid #0A0B0F` }} />
              )}
            </div>
            <div>
              <div
                onClick={function() { onUser && onUser(room.name); }}
                style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF,
                letterSpacing:'-0.02em', cursor:'pointer' }}>{room.name}</div>
              <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                {room.online ? '온라인' : room.sub}
              </div>
            </div>
          </div>

          {/* 메뉴 */}
          <button onClick={() => setShowMenu(v => !v)}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer',
              position:'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.g[50]} strokeWidth="2">
              <circle cx="12" cy="5" r="1" fill={C.g[50]}/>
              <circle cx="12" cy="12" r="1" fill={C.g[50]}/>
              <circle cx="12" cy="19" r="1" fill={C.g[50]}/>
            </svg>
            {showMenu && (
              <div style={{ position:'absolute', top:46, right:0,
                background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:'4px 0', minWidth:130,
                boxShadow:'0 8px 24px rgba(0,0,0,0.4)', zIndex:300 }}>
                {['프로필 보기','알림 끄기','채팅방 나가기'].map((item, i) => (
                  <div key={i} onClick={() => setShowMenu(false)}
                    style={{ padding:'11px 16px', fontSize:13, fontFamily:FF,
                      color: item==='채팅방 나가기' ? '#EF4444' : C.g[50],
                      cursor:'pointer', borderBottom: i<2 ? `1px solid ${C.border}` : 'none' }}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* ── 메시지 영역 ──────────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none', padding:'16px 0 8px' }}
        onClick={() => { setShowEmoji(false); setShowImgOpts(false); setShowMenu(false); }}>

        {/* 날짜 구분선 */}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'0 16px', marginBottom:16 }}>
          <div style={{ flex:1, height:1, background:C.border }} />
          <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, background:C.bg, padding:'0 8px' }}>오늘</span>
          <div style={{ flex:1, height:1, background:C.border }} />
        </div>

        {messages.length === 0 ? (
          <div style={{ padding:'40px 16px', textAlign:'center' }}>
            <div style={{ fontSize:36, marginBottom:12 }}>💬</div>
            <div style={{ fontSize:13, color:C.g[60], fontFamily:FF, lineHeight:1.6 }}>
              {room.name}님과의 대화를 시작해보세요
            </div>
          </div>
        ) : messages.map((msg, i) => {
          const showSender = !msg.isMine && room.isGroup && msg.sender;
          return (
            <div key={msg.id}
              style={{ display:'flex', flexDirection:'column',
                alignItems: msg.isMine ? 'flex-end' : 'flex-start',
                padding:'2px 16px',
                marginBottom: i < messages.length-1 &&
                  messages[i+1].isMine !== msg.isMine ? 8 : 2 }}>

              {showSender && (
                <span style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginBottom:3, marginLeft:2 }}>
                  {msg.sender}
                </span>
              )}

              <div style={{ display:'flex', alignItems:'flex-end',
                gap:6, flexDirection: msg.isMine ? 'row-reverse' : 'row', maxWidth:'80%' }}>

                {/* 상대방 아바타 */}
                {!msg.isMine && !room.isGroup && i === 0 && (
                  <div
                    onClick={function() { onUser && onUser(room.name); }}
                    style={{ width:28, height:28, borderRadius:14,
                    background:`${lc}28`, border:`1px solid ${lc}40`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:900, color:lc, fontFamily:FF,
                    flexShrink:0, alignSelf:'flex-start', cursor:'pointer' }}>
                    {initials}
                  </div>
                )}
                {!msg.isMine && !room.isGroup && i > 0 && (
                  <div style={{ width:28, flexShrink:0 }} />
                )}

                {/* 말풍선 */}
                {msg.type === 'image' ? (
                  <div style={{ borderRadius: msg.isMine ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    overflow:'hidden', width:160, height:120,
                    background: msg.imgBg ?? 'linear-gradient(135deg,#334155,#0f172a)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    flexDirection:'column', gap:6, border:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:28 }}>🖼️</span>
                    <span style={{ fontSize:10, color:'rgba(255,255,255,0.7)', fontFamily:FF }}>
                      {msg.imgLabel ?? '사진'}
                    </span>
                  </div>
                ) : (
                  <div style={{
                    background: msg.isMine ? C.primary : 'rgba(255,255,255,0.08)',
                    border: msg.isMine ? 'none' : `1px solid ${C.border}`,
                    borderRadius: msg.isMine ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    padding:'10px 13px', maxWidth:'100%' }}>
                    <span style={{ fontSize:14, color: msg.isMine ? '#fff' : C.g[30],
                      fontFamily:FF, lineHeight:1.5, wordBreak:'break-word', display:'block' }}>
                      {msg.text}
                    </span>
                  </div>
                )}

                {/* 시간 + 읽음 */}
                <div style={{ display:'flex', flexDirection:'column',
                  alignItems: msg.isMine ? 'flex-end' : 'flex-start',
                  gap:2, marginBottom:3, flexShrink:0 }}>
                  {msg.isMine && (
                    <span style={{ fontSize:8, color:C.primary, fontFamily:FF, fontWeight:700 }}>읽음</span>
                  )}
                  <span style={{ fontSize:9, color:C.g[80], fontFamily:FF }}>{msg.time}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* ── 빠른 답장 칩 ─────────────────────────────── */}
      {messages.length === 0 && (
        <div style={{ display:'flex', gap:7, padding:'8px 16px',
          overflowX:'auto', scrollbarWidth:'none', flexShrink:0 }}>
          {QUICK_REPLIES.map((qr, i) => (
            <button key={i} onClick={() => sendMsg(qr)}
              style={{ flexShrink:0, padding:'6px 12px', borderRadius:16,
                fontSize:12, fontWeight:600, fontFamily:FF,
                background:C.glass1, color:C.g[50],
                border:`1px solid ${C.border}`, cursor:'pointer' }}>
              {qr}
            </button>
          ))}
        </div>
      )}

      {/* ── 이모지 피커 ──────────────────────────────── */}
      {showEmoji && (
        <div style={{ flexShrink:0, background:C.bg,
          borderTop:`1px solid ${C.border}`, zIndex:100 }}>
          {/* 카테고리 탭 */}
          <div style={{ display:'flex', borderBottom:`1px solid ${C.border}` }}>
            {Object.keys(EMOJI_CATS).map(cat => (
              <button key={cat} onClick={() => setEmojiCat(cat)}
                style={{ flex:1, padding:'8px 0', background:'none', border:'none',
                  cursor:'pointer', fontSize:18,
                  borderBottom: emojiCat===cat ? `2px solid ${C.primary}` : '2px solid transparent',
                  opacity: emojiCat===cat ? 1 : 0.45, transition:'all 0.15s' }}>
                {cat}
              </button>
            ))}
          </div>
          {/* 이모지 그리드 */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(8,1fr)',
            gap:2, padding:'8px 12px', maxHeight:180, overflowY:'auto',
            scrollbarWidth:'none' }}>
            {EMOJI_CATS[emojiCat].map((e, i) => (
              <button key={i} onClick={() => setInput(prev => prev + e)}
                style={{ background:'none', border:'none', cursor:'pointer',
                  fontSize:22, padding:'6px 0', borderRadius:8,
                  transition:'background 0.1s' }}
                onMouseOver={ev => ev.currentTarget.style.background='rgba(255,255,255,0.08)'}
                onMouseOut={ev => ev.currentTarget.style.background='none'}>
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 이미지 전송 옵션 ─────────────────────────── */}
      {showImgOpts && (
        <div style={{ flexShrink:0, background:C.bg,
          borderTop:`1px solid ${C.border}`, padding:'14px 20px' }}>
          <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginBottom:10,
            letterSpacing:'0.05em', textTransform:'uppercase' }}>사진 전송</div>
          <div style={{ display:'flex', gap:10, overflowX:'auto', scrollbarWidth:'none' }}>
            {[
              { label:'여행 사진 📸', bg:'linear-gradient(135deg,#1e3a5f,#0f172a)' },
              { label:'음식 사진 🍜', bg:'linear-gradient(135deg,#3b1f0a,#1c0a04)' },
              { label:'지하철 뷰 🚇', bg:'linear-gradient(135deg,#1a1a2e,#16213e)' },
              { label:'카페 사진 ☕', bg:'linear-gradient(135deg,#2d1810,#150b08)' },
              { label:'셀피 🤳',     bg:'linear-gradient(135deg,#1a0536,#2d1b69)' },
            ].map((opt, i) => (
              <button key={i} onClick={() => sendImage(opt.label, opt.bg)}
                style={{ flexShrink:0, width:72, height:72, borderRadius:14, border:`1px solid ${C.border}`,
                  background:opt.bg, cursor:'pointer', display:'flex',
                  alignItems:'center', justifyContent:'center',
                  flexDirection:'column', gap:4 }}>
                <span style={{ fontSize:20 }}>{opt.label.match(/\S+$/)?.[0]}</span>
                <span style={{ fontSize:9, color:'rgba(255,255,255,0.7)', fontFamily:FF,
                  textAlign:'center', lineHeight:1.3 }}>
                  {opt.label.replace(/\S+$/, '').trim()}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 입력창 ──────────────────────────────────── */}
      <div style={{ flexShrink:0, background:C.stickyBg,
        borderTop:`1px solid ${C.border}`,
        padding:'10px 12px calc(10px + env(safe-area-inset-bottom,16px))' }}>
        <div style={{ display:'flex', alignItems:'flex-end', gap:7 }}>

          {/* 이모지 버튼 */}
          <button onClick={() => { setShowEmoji(v => !v); setShowImgOpts(false); }}
            style={{ width:38, height:38, flexShrink:0, display:'flex',
              alignItems:'center', justifyContent:'center',
              background: showEmoji ? `${C.primary}22` : 'rgba(255,255,255,0.06)',
              border: showEmoji ? `1px solid ${C.primary}66` : `1px solid ${C.border}`,
              borderRadius:12, cursor:'pointer', fontSize:19, transition:'all 0.15s' }}>
            😊
          </button>

          {/* 이미지 버튼 */}
          <button onClick={() => { setShowImgOpts(v => !v); setShowEmoji(false); }}
            style={{ width:38, height:38, flexShrink:0, display:'flex',
              alignItems:'center', justifyContent:'center',
              background: showImgOpts ? `${C.primary}22` : 'rgba(255,255,255,0.06)',
              border: showImgOpts ? `1px solid ${C.primary}66` : `1px solid ${C.border}`,
              borderRadius:12, cursor:'pointer', transition:'all 0.15s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={showImgOpts ? C.primary : C.g[60]} strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </button>

          {/* 텍스트 입력 */}
          <div style={{ flex:1, background:C.glass1,
            border:`1px solid ${C.border}`, borderRadius:20,
            padding:'9px 14px', minHeight:38, display:'flex', alignItems:'center' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }}}
              onFocus={() => { setShowEmoji(false); setShowImgOpts(false); }}
              placeholder="메시지 입력..."
              style={{ flex:1, background:'none', border:'none', outline:'none',
                fontSize:14, color:C.white, fontFamily:FF }}
            />
          </div>

          {/* 전송 버튼 */}
          <button onClick={() => sendMsg()}
            style={{ width:38, height:38, flexShrink:0, display:'flex',
              alignItems:'center', justifyContent:'center',
              background: input.trim() ? C.primary : 'rgba(255,255,255,0.06)',
              border:'none', borderRadius:12, cursor:'pointer', transition:'background 0.2s' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={input.trim() ? '#fff' : C.g[70]} strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   역 상세 페이지 — 데이터 & 컴포넌트
═══════════════════════════════════════════════════════ */

/* 역별 상세 데이터 (강남역 기준, 다른 역은 기본값으로 fallback) */
const STATION_DETAIL_DB = {
  '강남역': {
    lines: [{ id:'2', name:'2호선' }, { id:'sin', name:'신분당선' }],
    exitCount: 11,
    congestion: 87,
    congestionLabel: '매우 혼잡',
    congestionColor: '#EF4444',
    nextTrains: [
      { dir:'성수방향', arrive:'2분 후', cars:10, congestion:'혼잡' },
      { dir:'신도림방향', arrive:'5분 후', cars:10, congestion:'보통' },
    ],
    quickExits: [
      { exit:'2번', desc:'신논현 방향 지상', walk:40 },
      { exit:'5번', desc:'강남대로 북쪽 출구', walk:55 },
      { exit:'8번', desc:'삼성 방향 지하',    walk:35 },
    ],
    nearbyPlaces: [
      { icon:'☕', name:'블루보틀 강남점', cat:'카페', dist:'도보 2분', rating:4.6 },
      { icon:'🍜', name:'봉피양 강남',     cat:'식당', dist:'도보 3분', rating:4.4 },
      { icon:'🏪', name:'GS25 강남역점',   cat:'편의점',dist:'도보 1분', rating:0   },
      { icon:'📚', name:'교보문고 강남점', cat:'서점', dist:'도보 5분', rating:4.7 },
      { icon:'🏋️', name:'피트니스 센터',   cat:'운동', dist:'도보 4분', rating:4.2 },
    ],
    recentPosts: [
      { id:1, title:'강남역 2호선 오늘 왜 이렇게 밀려요?', likes:248, comments:67,  writer:'강남러버',   tag:'혼잡',   tagColor:'#EF4444', time:'11분 전'  },
      { id:2, title:'강남역 11번 출구 공사 영향 있나요?',  likes:45,  comments:12,  writer:'신논현주민', tag:'공사',   tagColor:'#9CA3AF', time:'38분 전'  },
      { id:3, title:'강남역 근처 점심 추천 — 국밥 맛집',  likes:130, comments:31,  writer:'강남직장인', tag:'맛집',   tagColor:'#F59E0B', time:'1시간 전' },
      { id:4, title:'신분당선 급행 이용 꿀팁 공유',        likes:88,  comments:19,  writer:'판교출퇴근', tag:'꿀팁',   tagColor:'#00BAF6', time:'2시간 전' },
    ],
  },
};

const DEFAULT_STATION_DETAIL = {
  lines: [{ id:'2', name:'2호선' }],
  exitCount: 6,
  congestion: 42,
  congestionLabel: '보통',
  congestionColor: '#22C55E',
  nextTrains: [
    { dir:'방향 A', arrive:'3분 후', cars:8, congestion:'여유' },
    { dir:'방향 B', arrive:'7분 후', cars:8, congestion:'보통' },
  ],
  quickExits: [
    { exit:'1번', desc:'지상 출구', walk:30 },
    { exit:'2번', desc:'버스 환승', walk:45 },
  ],
  nearbyPlaces: [
    { icon:'☕', name:'스타벅스',   cat:'카페',  dist:'도보 2분', rating:4.3 },
    { icon:'🍜', name:'근처 식당', cat:'식당',  dist:'도보 5분', rating:4.1 },
    { icon:'🏪', name:'편의점',    cat:'편의점',dist:'도보 1분', rating:0   },
  ],
  recentPosts: [
    { id:1, title:'역 이용 꿀팁 공유합니다',   likes:22, comments:8,  writer:'지하철러버', tag:'꿀팁', tagColor:'#00BAF6', time:'30분 전' },
    { id:2, title:'오늘 이 역 혼잡한가요?',     likes:11, comments:5,  writer:'출퇴근러',   tag:'혼잡', tagColor:'#EF4444', time:'1시간 전' },
  ],
};

function StationDetailScreen({ station, onBack, onPostDetail, onUser }) {
  const detail = STATION_DETAIL_DB[station.name] ?? DEFAULT_STATION_DETAIL;
  const [activeDir,       setActiveDir]       = React.useState(0);
  const [showReviewWrite, setShowReviewWrite] = React.useState(false);
  const [likedDetailRevs, setLikedDetailRevs] = React.useState(new Set());
  const lineColor = id => C.line[id] ?? C.primary;
  const primaryLine = detail.lines[0];
  const lc = lineColor(primaryLine.id);

  /* 혼잡도 색상 */
  const congColor =
    detail.congestion >= 80 ? '#EF4444' :
    detail.congestion >= 60 ? '#F97316' :
    detail.congestion >= 40 ? '#FBBF24' : '#22C55E';

  /* 역 이름으로 meetup 스테이션 찾기 */
  var matchStation = typeof MEETUP_STATIONS !== 'undefined'
    ? MEETUP_STATIONS.find(function(s) { return station.name.includes(s.name.replace('역','')); })
    : null;

  /* 후기 쓰기 화면 */
  if (showReviewWrite) {
    return (
      <StationReviewWriteScreen
        station={matchStation ?? { name: station.name, lineId: primaryLine.id,
          lines: detail.lines.map(function(l) { return l.name; }).join(' · ') }}
        onBack={function() { setShowReviewWrite(false); }}
        onSubmit={function() { setShowReviewWrite(false); }}
      />
    );
  }

  /* 이 역의 리뷰 샘플 — stationId 매칭 없으면 앞 2개 그냥 표시 */
  var stationRevSample = (typeof STATION_REVIEWS !== 'undefined' && matchStation)
    ? STATION_REVIEWS.filter(function(r) { return r.stationId === matchStation.id; }).slice(0,3)
    : (typeof STATION_REVIEWS !== 'undefined' ? STATION_REVIEWS.slice(0,3) : []);

  var avgRating = stationRevSample.length > 0
    ? (stationRevSample.reduce(function(s,r){ return s+r.rating; },0) / stationRevSample.length).toFixed(1)
    : null;

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden' }}>

      {/* ── 헤더 ──────────────────────────────────── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 4px' }}>
          <button onClick={onBack}
            style={{ width:44, height:44, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none', cursor:'pointer' }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div style={{ flex:1, display:'flex', alignItems:'center', gap:10 }}>
            {/* 노선 뱃지들 */}
            <div style={{ display:'flex', gap:5 }}>
              {detail.lines.map(l => (
                <div key={l.id} style={{ width:26, height:26, borderRadius:13,
                  background:lineColor(l.id),
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:900, color:'#fff', fontFamily:FF }}>
                  {l.id === 'sin' ? '신' : l.id}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize:16, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em' }}>{station.name}</div>
              <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                {detail.lines.map(l => l.name).join(' · ')} · 출구 {detail.exitCount}개
              </div>
            </div>
          </div>

          {/* 혼잡도 배지 */}
          <div style={{ marginRight:8, textAlign:'center' }}>
            <div style={{ fontSize:18, fontWeight:900, color:congColor, fontFamily:FF,
              lineHeight:1 }}>{detail.congestion}%</div>
            <div style={{ fontSize:9, color:congColor, fontFamily:FF, marginTop:1 }}>
              {detail.congestionLabel}
            </div>
          </div>
        </div>
      </div>

      {/* ── 스크롤 본문 ──────────────────────────── */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none' }}>

        {/* ── 혼잡도 게이지 ────────────────────────── */}
        <div style={{ margin:'16px 16px 0', background:C.card,
          border:`1px solid ${C.border}`, borderRadius:16, padding:'16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF }}>
              현재 혼잡도
            </span>
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
              실시간 기준
            </span>
          </div>
          {/* 게이지 바 */}
          <div style={{ height:8, background:'rgba(255,255,255,0.08)',
            borderRadius:4, overflow:'hidden', marginBottom:8 }}>
            <div style={{ width:`${detail.congestion}%`, height:'100%',
              background:`linear-gradient(90deg, ${congColor}88, ${congColor})`,
              borderRadius:4, transition:'width 0.8s ease' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>여유</span>
            <span style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>극혼잡</span>
          </div>
        </div>

        {/* ── 다음 열차 ────────────────────────────── */}
        <div style={{ margin:'12px 16px 0' }}>
          <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
            letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:10 }}>
            다음 열차
          </div>
          {/* 방향 탭 */}
          <div style={{ display:'flex', gap:8, marginBottom:10 }}>
            {detail.nextTrains.map((t, i) => (
              <button key={i} onClick={() => setActiveDir(i)}
                style={{ flex:1, padding:'8px 0', borderRadius:10, border:'none',
                  cursor:'pointer', fontSize:12, fontWeight:700, fontFamily:FF,
                  background: activeDir===i ? lc : 'rgba(255,255,255,0.07)',
                  color: activeDir===i ? '#fff' : C.g[60], transition:'all 0.15s' }}>
                {t.dir}
              </button>
            ))}
          </div>
          {/* 열차 카드 */}
          {detail.nextTrains[activeDir] && (() => {
            const t = detail.nextTrains[activeDir];
            const cc = t.congestion === '혼잡' ? '#EF4444' : t.congestion === '보통' ? '#FBBF24' : '#22C55E';
            return (
              <div style={{ background:C.card, border:`1px solid ${C.border}`,
                borderRadius:14, padding:'16px', display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:26, fontWeight:900, color:lc, fontFamily:FF,
                    letterSpacing:'-0.04em', lineHeight:1 }}>{t.arrive}</div>
                  <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginTop:4 }}>
                    {t.cars}량 편성
                  </div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                    <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                      color:cc, background:`${cc}18`, padding:'2px 8px', borderRadius:6 }}>
                      {t.congestion}
                    </span>
                    <span style={{ fontSize:10, color:C.g[60], fontFamily:FF }}>
                      {t.dir}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── 빠른 하차 위치 ───────────────────────── */}
        <div style={{ margin:'18px 16px 0' }}>
          <div style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
            letterSpacing:'0.05em', textTransform:'uppercase', marginBottom:10 }}>
            빠른 하차 출구
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {detail.quickExits.map((ex, i) => (
              <div key={i} style={{ flex:1, background:C.card,
                border:`1px solid ${C.border}`, borderRadius:12, padding:'12px 10px',
                textAlign:'center' }}>
                <div style={{ width:32, height:32, borderRadius:16, background:`${lc}22`,
                  border:`1.5px solid ${lc}44`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:12, fontWeight:900, color:lc, fontFamily:FF,
                  margin:'0 auto 8px' }}>{ex.exit}</div>
                <div style={{ fontSize:10, color:C.g[50], fontFamily:FF,
                  lineHeight:1.4, marginBottom:4 }}>{ex.desc}</div>
                <div style={{ fontSize:10, color:C.primary, fontFamily:FF,
                  fontWeight:700 }}>도보 {ex.walk}초</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 주변 장소 ────────────────────────────── */}
        <div style={{ margin:'18px 0 0' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'0 16px', marginBottom:10 }}>
            <span style={{ fontSize:12, fontWeight:800, color:C.g[50], fontFamily:FF,
              letterSpacing:'0.05em', textTransform:'uppercase' }}>주변 장소</span>
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>더보기 ›</span>
          </div>
          <div style={{ display:'flex', gap:10, padding:'0 16px',
            overflowX:'auto', scrollbarWidth:'none' }}>
            {detail.nearbyPlaces.map((pl, i) => (
              <div key={i} style={{ flexShrink:0, width:88, background:C.card,
                border:`1px solid ${C.border}`, borderRadius:14, padding:'12px 8px',
                textAlign:'center', cursor:'pointer' }}>
                <div style={{ fontSize:26, marginBottom:6 }}>{pl.icon}</div>
                <div style={{ fontSize:11, fontWeight:800, color:C.white, fontFamily:FF,
                  marginBottom:3, whiteSpace:'nowrap', overflow:'hidden',
                  textOverflow:'ellipsis' }}>{pl.name}</div>
                <div style={{ fontSize:9, color:C.g[70], fontFamily:FF,
                  marginBottom:2 }}>{pl.dist}</div>
                {pl.rating > 0 && (
                  <div style={{ fontSize:9, color:'#FBBF24', fontFamily:FF }}>
                    ★ {pl.rating}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 역 관련 최신 게시글 ──────────────────── */}
        <div style={{ margin:'20px 16px 0' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            marginBottom:12 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:lc,
                letterSpacing:'0.1em', fontFamily:FF, marginBottom:3 }}>STATION FEED</div>
              <div style={{ fontSize:17, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em' }}>{station.name} 최신 글</div>
            </div>
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>전체 보기 ›</span>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {detail.recentPosts.map((post, i) => (
              <div key={i}
                onClick={() => onPostDetail && onPostDetail(post)}
                style={{ background:C.card, border:`1px solid ${C.border}`,
                borderRadius:14, padding:'13px 14px', cursor:'pointer' }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:7 }}>
                  <span style={{ fontSize:10, fontWeight:700, fontFamily:FF,
                    color:post.tagColor, background:`${post.tagColor}15`,
                    padding:'1px 7px', borderRadius:5,
                    border:`1px solid ${post.tagColor}33` }}>
                    {post.tag}
                  </span>
                  <span style={{ fontSize:10, color:C.g[70], fontFamily:FF,
                    marginLeft:'auto' }}>{post.time}</span>
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF,
                  lineHeight:1.4, marginBottom:8 }}>{post.title}</div>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span
                    onClick={function(e) { e.stopPropagation(); onUser && onUser(post.writer); }}
                    style={{ fontSize:10, color:C.g[70], fontFamily:FF, cursor:'pointer' }}>
                    {post.writer}
                  </span>
                  <div style={{ marginLeft:'auto', display:'flex', gap:10 }}>
                    <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>♡ {post.likes}</span>
                    <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 역 방문 후기 섹션 ────────────────────── */}
        <div style={{ margin:'20px 16px 0' }}>
          {/* 섹션 헤더 */}
          <div style={{ display:'flex', alignItems:'flex-end',
            justifyContent:'space-between', marginBottom:14 }}>
            <div>
              <div style={{ fontSize:10, fontWeight:700, color:lc,
                letterSpacing:'0.1em', fontFamily:FF, marginBottom:3 }}>STATION REVIEW</div>
              <div style={{ fontSize:17, fontWeight:900, color:C.white, fontFamily:FF,
                letterSpacing:'-0.03em', display:'flex', alignItems:'center', gap:10 }}>
                방문 후기
                {avgRating && (
                  <span style={{ fontSize:13, color:'#F59E0B', fontFamily:FF,
                    fontWeight:700, display:'flex', alignItems:'center', gap:3 }}>
                    ★ {avgRating}
                    <span style={{ fontSize:10, color:C.g[70], fontWeight:500 }}>
                      ({stationRevSample.length}건)
                    </span>
                  </span>
                )}
              </div>
            </div>
            <button onClick={function() { setShowReviewWrite(true); }}
              style={{ padding:'7px 14px', borderRadius:9,
                background:`linear-gradient(90deg, ${lc}, ${C.primary})`,
                border:'none', cursor:'pointer', fontSize:11, fontWeight:700,
                color:'#fff', fontFamily:FF, display:'flex', alignItems:'center', gap:5,
                boxShadow:`0 2px 12px ${lc}40` }}>
              ✏️ 후기 쓰기
            </button>
          </div>

          {/* 평점 요약 바 */}
          {stationRevSample.length > 0 && (
            <div style={{ background:C.card, border:`1px solid ${C.border}`,
              borderRadius:14, padding:'14px 16px', marginBottom:12,
              display:'flex', alignItems:'center', gap:16 }}>
              {/* 큰 평점 숫자 */}
              <div style={{ textAlign:'center', flexShrink:0 }}>
                <div style={{ fontSize:38, fontWeight:900, color:C.white, fontFamily:FF,
                  lineHeight:1, letterSpacing:'-0.04em' }}>{avgRating}</div>
                <div style={{ display:'flex', gap:2, justifyContent:'center', marginTop:4 }}>
                  {[1,2,3,4,5].map(function(i) {
                    return <span key={i} style={{ fontSize:11,
                      color: i <= Math.round(parseFloat(avgRating)) ? '#F59E0B' : 'rgba(255,255,255,0.12)' }}>★</span>;
                  })}
                </div>
                <div style={{ fontSize:9, color:C.g[70], fontFamily:FF, marginTop:3 }}>
                  {stationRevSample.length}개의 후기
                </div>
              </div>
              {/* 별점 분포 바 */}
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:4 }}>
                {[5,4,3,2,1].map(function(n) {
                  var cnt = stationRevSample.filter(function(r){ return r.rating === n; }).length;
                  var pct = stationRevSample.length > 0 ? (cnt / stationRevSample.length) * 100 : 0;
                  return (
                    <div key={n} style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ fontSize:9, color:C.g[70], fontFamily:FF, width:8, textAlign:'right' }}>{n}</span>
                      <span style={{ fontSize:9, color:'#F59E0B' }}>★</span>
                      <div style={{ flex:1, height:5, background:'rgba(255,255,255,0.07)',
                        borderRadius:3, overflow:'hidden' }}>
                        <div style={{ width:`${pct}%`, height:'100%', borderRadius:3,
                          background: n >= 4 ? '#F59E0B' : n === 3 ? '#F97316' : '#EF4444',
                          transition:'width 0.6s ease' }} />
                      </div>
                      <span style={{ fontSize:9, color:C.g[80], fontFamily:FF, width:12 }}>
                        {cnt > 0 ? cnt : ''}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 후기 카드 목록 (고도화 버전) */}
          {stationRevSample.length > 0 ? (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {stationRevSample.map(function(r) {
                var liked = likedDetailRevs.has(r.id);
                /* 카테고리 mock 점수 */
                var mockCats = [
                  { icon:'🚇', label:'교통', score: Math.min(5, Math.max(3, r.rating - (r.id%2))) },
                  { icon:'🍜', label:'맛집', score: Math.min(5, Math.max(2, r.rating)) },
                  { icon:'✨', label:'분위기', score: Math.min(5, Math.max(3, r.rating + (r.id%1))) },
                  { icon:'🛡️', label:'안전', score: 4 },
                ];
                /* 키워드 mock */
                var mockKeywords = r.rating >= 5
                  ? ['인스타감성 🤳','현지인 맛집 🏠','힐링됨 🌿']
                  : r.rating >= 4
                  ? ['가성비 최고 💰','접근성 굿 👍']
                  : ['보통이에요 😐'];
                /* 사진 mock 이모지 */
                var mockPhotos = r.id % 3 === 0
                  ? ['🏙️','☕','🍜']
                  : r.id % 2 === 0
                  ? ['🚉','🌃']
                  : [];
                return (
                  <div key={r.id} style={{ background:C.card,
                    border:`1px solid ${C.border}`, borderRadius:16,
                    overflow:'hidden' }}>
                    {/* 사진 썸네일 그리드 */}
                    {mockPhotos.length > 0 && (
                      <div style={{ display:'flex', gap:2, height:80 }}>
                        {mockPhotos.map(function(em, pi) {
                          return (
                            <div key={pi} style={{ flex:1,
                              background:`${lc}${pi===0?'28':'18'}`,
                              display:'flex', alignItems:'center', justifyContent:'center',
                              fontSize: pi === 0 ? 30 : 22,
                              position:'relative' }}>
                              {em}
                              {pi === 0 && mockPhotos.length > 1 && (
                                <div style={{ position:'absolute', bottom:5, right:5,
                                  background:'rgba(0,0,0,0.55)', borderRadius:4,
                                  padding:'2px 5px', fontSize:9, color:'#fff', fontFamily:FF }}>
                                  +{mockPhotos.length}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div style={{ padding:'14px 16px' }}>
                      {/* 작성자 헤더 */}
                      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                        <div style={{ width:38, height:38, borderRadius:19,
                          background:`${lc}20`, border:`1.5px solid ${lc}40`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          fontSize:18 }}>
                          {r.flag}
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                            <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                              {r.nick}
                            </span>
                            <span style={{ fontSize:10, color:lc, background:`${lc}18`,
                              padding:'1px 7px', borderRadius:4, fontFamily:FF, fontWeight:600 }}>
                              {r.country}
                            </span>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:2 }}>
                            <span style={{ fontSize:12, letterSpacing:1 }}>
                              {[1,2,3,4,5].map(function(i) {
                                return <span key={i} style={{ color: i<=r.rating ? '#F59E0B' : 'rgba(255,255,255,0.1)' }}>★</span>;
                              })}
                            </span>
                            <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{r.date}</span>
                          </div>
                        </div>
                        {/* 전체 별점 뱃지 */}
                        <div style={{ textAlign:'center', flexShrink:0 }}>
                          <div style={{ fontSize:18, fontWeight:900, color:'#F59E0B', fontFamily:FF,
                            lineHeight:1 }}>{r.rating}.0</div>
                          <div style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>/ 5.0</div>
                        </div>
                      </div>

                      {/* 카테고리 미니 점수 */}
                      <div style={{ display:'flex', gap:6, marginBottom:10,
                        padding:'10px 12px', borderRadius:10,
                        background:'rgba(255,255,255,0.03)',
                        border:`1px solid ${C.border}` }}>
                        {mockCats.map(function(cat) {
                          return (
                            <div key={cat.label} style={{ flex:1, textAlign:'center' }}>
                              <div style={{ fontSize:14, marginBottom:2 }}>{cat.icon}</div>
                              <div style={{ fontSize:9, color:C.g[70], fontFamily:FF,
                                marginBottom:2 }}>{cat.label}</div>
                              <div style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                                color: cat.score >= 4 ? '#F59E0B' : cat.score >= 3 ? '#F97316' : '#EF4444' }}>
                                {cat.score}.0
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* 키워드 태그 */}
                      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:10 }}>
                        {mockKeywords.map(function(k) {
                          return (
                            <span key={k} style={{ fontSize:10, color:lc,
                              background:`${lc}15`, padding:'3px 9px', borderRadius:20,
                              fontFamily:FF, fontWeight:600,
                              border:`1px solid ${lc}30` }}>{k}</span>
                          );
                        })}
                      </div>

                      {/* 본문 (접힘 처리) */}
                      <div style={{ fontSize:13, color:C.g[50], lineHeight:1.65,
                        fontFamily:FF, marginBottom:10,
                        display:'-webkit-box', WebkitLineClamp:3,
                        WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                        {r.content}
                      </div>

                      {/* 추천 장소 */}
                      {r.spots && r.spots.length > 0 && (
                        <div style={{ marginBottom:10 }}>
                          <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                            {r.spots.map(function(s) {
                              return (
                                <span key={s} style={{ fontSize:10, color:C.g[60],
                                  background:'rgba(255,255,255,0.05)',
                                  padding:'3px 9px', borderRadius:4,
                                  fontFamily:FF, fontWeight:500,
                                  border:`1px solid ${C.border}` }}>
                                  📍 {s}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 좋아요 */}
                      <div style={{ display:'flex', alignItems:'center', gap:6,
                        paddingTop:10, borderTop:`1px solid ${C.border}` }}>
                        <div onClick={function() {
                            setLikedDetailRevs(function(prev) {
                              var next = new Set(prev);
                              next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                              return next;
                            });
                          }}
                          style={{ display:'flex', alignItems:'center', gap:5,
                            padding:'5px 12px', borderRadius:8, cursor:'pointer',
                            background: liked ? `${C.primary}18` : 'rgba(255,255,255,0.05)',
                            border:`1px solid ${liked ? C.primary+'50' : C.border}`,
                            transition:'all 0.15s' }}>
                          <span style={{ fontSize:13, color: liked ? C.primary : C.g[70] }}>
                            {liked ? '♥' : '♡'}
                          </span>
                          <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                            color: liked ? C.primary : C.g[60] }}>
                            {liked ? r.likes + 1 : r.likes}
                          </span>
                        </div>
                        <span style={{ fontSize:11, color:C.g[70], fontFamily:FF,
                          cursor:'pointer', marginLeft:4 }}>댓글 달기</span>
                        <span style={{ fontSize:11, color:C.g[80], fontFamily:FF,
                          marginLeft:'auto' }}>도움이 됐어요</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* 전체 후기 보기 버튼 */}
              <button style={{ width:'100%', padding:'12px 0', borderRadius:12,
                background:'rgba(255,255,255,0.04)',
                border:`1px solid ${C.border}`, cursor:'pointer',
                fontSize:12, fontWeight:700, color:C.g[60], fontFamily:FF }}>
                후기 전체 보기 ({stationRevSample.length}건) ›
              </button>
            </div>
          ) : (
            <div style={{ background:C.card, border:`1px solid ${C.border}`,
              borderRadius:14, padding:'32px 20px', textAlign:'center' }}>
              <div style={{ fontSize:36, marginBottom:10 }}>📝</div>
              <div style={{ fontSize:13, color:C.g[70], fontFamily:FF, marginBottom:14 }}>
                아직 후기가 없어요.<br/>첫 번째 후기를 남겨주세요!
              </div>
              <button onClick={function() { setShowReviewWrite(true); }}
                style={{ padding:'10px 28px', borderRadius:10, border:'none', cursor:'pointer',
                  background:`linear-gradient(90deg, ${lc}, ${C.primary})`,
                  fontSize:12, fontWeight:800, color:'#fff', fontFamily:FF }}>
                ✏️ 첫 후기 작성하기
              </button>
            </div>
          )}
        </div>

        {/* ── 퀵 바텀 패딩 ─────────────────────────── */}
        <div style={{ height:32 }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   검색 페이지 — 데이터 & 컴포넌트
   ═══════════════════════════════════════════════════════ */

const SEARCH_STATIONS = [
  { name:'강남역',     lineId:'2',   desc:'2호선 · 신분당선 환승',         posts:142 },
  { name:'홍대입구역', lineId:'2',   desc:'2호선 · 경의중앙선 · 공항철도', posts:118 },
  { name:'판교역',     lineId:'sin', desc:'신분당선 · 경강선 환승',         posts:89  },
  { name:'여의도역',   lineId:'5',   desc:'5호선 · 9호선 환승',             posts:74  },
  { name:'잠실역',     lineId:'2',   desc:'2호선 · 8호선 환승',             posts:67  },
  { name:'신촌역',     lineId:'2',   desc:'2호선',                          posts:55  },
  { name:'명동역',     lineId:'4',   desc:'4호선',                          posts:48  },
  { name:'성수역',     lineId:'2',   desc:'2호선',                          posts:43  },
  { name:'이태원역',   lineId:'6',   desc:'6호선',                          posts:38  },
  { name:'사당역',     lineId:'2',   desc:'2호선 · 4호선 환승',             posts:35  },
  { name:'신분당선',   lineId:'sin', desc:'강남–판교–광교 전 구간',         posts:112 },
  { name:'강남구청역', lineId:'7',   desc:'7호선',                          posts:29  },
];

function SearchScreen({ onBack, onStation, onPostDetail, onUser, initialQuery }) {
  const [query, setQuery]             = useState(initialQuery || '');
  const [resultTab, setResultTab]     = useState('전체');
  const [recentList, setRecentList]   = useState([
    '강남역', '판교역 맛집', '2호선 지연', '빠른 하차 꿀팁',
  ]);
  const inputRef = React.useRef(null);

  /* 포커스 — initialQuery 있으면 커서를 끝으로 이동 */
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        var len = (initialQuery || '').length;
        if (len > 0) inputRef.current.setSelectionRange(len, len);
      }
    }, 120);
    return () => clearTimeout(t);
  }, []);

  const lineColor = id => C.line[id] ?? C.primary;
  const shortName = id => {
    const m = {'1':'1','2':'2','3':'3','4':'4','5':'5',
               '6':'6','7':'7','8':'8','9':'9','sin':'신'};
    return m[id] ?? id;
  };

  const q = query.trim().toLowerCase();

  /* ── 검색 결과 ── */
  const allSearchPosts = [
    ...HOT_POSTS,
    ...(typeof COMMUNITY_POSTS !== 'undefined' ? COMMUNITY_POSTS : []).map(p => ({
      id: p.id, title: p.title, writer: p.writer ?? p.nick,
      lineId: p.subwayLineId ?? p.lineId ?? '2',
      tag: p.tag ?? p.category ?? '자유',
      tagColor: p.tagColor ?? C.primary,
      thumb: p.thumb ?? `linear-gradient(145deg,${C.line[p.subwayLineId ?? '2'] ?? C.primary}44,${C.line[p.subwayLineId ?? '2'] ?? C.primary}11)`,
      likes: p.likes ?? 0, comments: p.comments ?? 0, time: p.time ?? '',
    })),
  ];
  const resPosts = q.length < 1 ? [] : allSearchPosts.filter(p =>
    (p.title ?? '').toLowerCase().includes(q) ||
    (p.writer ?? '').toLowerCase().includes(q) ||
    (p.tag ?? '').toLowerCase().includes(q)
  );
  const resStations = SEARCH_STATIONS.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.desc.toLowerCase().includes(q)
  );
  const resUsers    = TOP_USERS.filter(u =>
    u.nick.toLowerCase().includes(q) ||
    u.station.toLowerCase().includes(q)
  );
  const totalCount  = resPosts.length + resStations.length + resUsers.length;

  /* ── 자동완성 ── */
  const suggestions = q.length > 0 ? [
    ...SEARCH_STATIONS
      .filter(s => s.name.toLowerCase().includes(q))
      .slice(0,3)
      .map(s => ({ kind:'역', label:s.name, lineId:s.lineId })),
    ...HOT_KEYWORDS
      .filter(k => k.word.toLowerCase().includes(q))
      .slice(0,2)
      .map(k => ({ kind:'검색어', label:k.word, lineId:null })),
    ...TOP_USERS
      .filter(u => u.nick.toLowerCase().includes(q))
      .slice(0,2)
      .map(u => ({ kind:'사용자', label:u.nick, lineId:u.lineId })),
  ].slice(0,5) : [];

  /* ── 최근 검색어 ── */
  const addRecent    = w => setRecentList(p => [w, ...p.filter(x => x!==w)].slice(0,8));
  const removeRecent = w => setRecentList(p => p.filter(x => x!==w));
  const doSearch     = w => { setQuery(w); addRecent(w); };

  const RESULT_TABS = ['전체','게시글','역','사용자'];
  const TAB_COUNT   = {
    '전체': totalCount,
    '게시글': resPosts.length,
    '역': resStations.length,
    '사용자': resUsers.length,
  };

  /* ── 섹션 레이블 ── */
  const SectionLabel = ({ label, count }) => (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 16px', marginBottom:10 }}>
      <span style={{ fontSize:11, fontWeight:800, color:C.g[60],
        fontFamily:FF, letterSpacing:'0.09em', textTransform:'uppercase' }}>
        {label}
      </span>
      {count != null && (
        <span style={{ fontSize:11, color:C.primary, fontFamily:FF, fontWeight:700 }}>
          {count}건
        </span>
      )}
    </div>
  );

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%',
      background:C.bg, overflow:'hidden' }}>

      {/* ══ 헤더 — 검색창 ══════════════════════════════ */}
      <div style={{ background:C.stickyBg,
        paddingTop:'env(safe-area-inset-top,44px)', flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8,
          height:52, padding:'0 12px 0 4px' }}>

          {/* 뒤로가기 */}
          <button onClick={onBack}
            style={{ width:40, height:40, display:'flex', alignItems:'center',
              justifyContent:'center', background:'none', border:'none',
              cursor:'pointer', flexShrink:0 }}>
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
              <path d="M9 1L1.5 8.5L9 16" stroke={C.g[50]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* 입력창 */}
          <div style={{ flex:1, display:'flex', alignItems:'center', gap:8,
            background:C.glass2, borderRadius:12,
            border:`1.5px solid ${q ? C.primary : C.border}`,
            padding:'0 12px', height:38, transition:'border-color 0.2s' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={q ? C.primary : C.g[60]} strokeWidth="2" style={{ flexShrink:0,
              transition:'stroke 0.2s' }}>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setResultTab('전체'); }}
              onKeyDown={e => {
                if (e.key === 'Enter' && query.trim()) doSearch(query.trim());
              }}
              placeholder="역명, 게시글, 사용자 검색"
              style={{ flex:1, background:'none', border:'none', outline:'none',
                fontSize:14, color:C.white, fontFamily:FF }}
            />
            {query && (
              <button onClick={() => setQuery('')}
                style={{ background:'rgba(255,255,255,0.15)', border:'none',
                  borderRadius:10, width:18, height:18, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer' }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1l6 6M7 1L1 7" stroke={C.g[40]}
                    strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>

          {/* 취소 */}
          <button onClick={onBack}
            style={{ background:'none', border:'none', cursor:'pointer',
              flexShrink:0, fontSize:13, color:C.g[60], fontFamily:FF,
              fontWeight:600, padding:'0 2px' }}>
            취소
          </button>
        </div>
      </div>

      {/* ══ 자동완성 드롭다운 ══════════════════════════ */}
      {suggestions.length > 0 && (
        <div style={{ background:'#0F1016',
          borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          {suggestions.map((s, i) => (
            <div key={i} onClick={() => {
                if (s.kind === '사용자') { onUser && onUser(s.label); }
                else { doSearch(s.label); }
              }}
              style={{ display:'flex', alignItems:'center', gap:12,
                padding:'11px 16px', cursor:'pointer',
                borderBottom: i < suggestions.length-1
                  ? `1px solid rgba(255,255,255,0.04)` : 'none',
                background:'transparent',
                transition:'background 0.15s' }}>

              {/* 아이콘 */}
              {s.lineId ? (
                <div style={{ width:28, height:28, borderRadius:14,
                  background:lineColor(s.lineId), flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:900, color:'#fff' }}>
                  {shortName(s.lineId)}
                </div>
              ) : (
                <div style={{ width:28, height:28, borderRadius:8,
                  background:C.glass2, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke={C.g[60]} strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
              )}

              {/* 텍스트 */}
              <span style={{ flex:1, fontSize:13, color:C.g[40], fontFamily:FF }}>
                {s.label}
              </span>

              {/* 타입 뱃지 */}
              <span style={{ fontSize:10, color:C.g[70], fontFamily:FF,
                background:C.glass1,
                padding:'2px 7px', borderRadius:4, flexShrink:0 }}>
                {s.kind}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ══ 스크롤 본문 ════════════════════════════════ */}
      <div style={{ flex:1, overflowY:'auto', scrollbarWidth:'none' }}>

        {/* ─── Idle 뷰 (검색어 없을 때) ──────────────── */}
        {!q && (
          <>
            {/* 최근 검색어 */}
            {recentList.length > 0 && (
              <div style={{ padding:'20px 16px 0' }}>
                <div style={{ display:'flex', alignItems:'center',
                  justifyContent:'space-between', marginBottom:12 }}>
                  <span style={{ fontSize:13, fontWeight:800,
                    color:C.white, fontFamily:FF }}>
                    최근 검색어
                  </span>
                  <span onClick={() => setRecentList([])}
                    style={{ fontSize:11, color:C.g[70],
                      fontFamily:FF, cursor:'pointer' }}>
                    전체 삭제
                  </span>
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {recentList.map((r, i) => (
                    <div key={i}
                      style={{ display:'flex', alignItems:'center', gap:6,
                        background:C.glass1,
                        border:`1px solid ${C.border}`,
                        borderRadius:20, padding:'6px 10px 6px 13px',
                        cursor:'pointer' }}>
                      <span onClick={() => doSearch(r)}
                        style={{ fontSize:12, fontWeight:600,
                          color:C.g[50], fontFamily:FF }}>
                        {r}
                      </span>
                      <span onClick={e => { e.stopPropagation(); removeRecent(r); }}
                        style={{ fontSize:9, color:C.g[80], cursor:'pointer',
                          background:'rgba(255,255,255,0.1)', borderRadius:8,
                          width:15, height:15, display:'flex',
                          alignItems:'center', justifyContent:'center',
                          flexShrink:0 }}>
                        ✕
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 인기 검색어 TOP 10 */}
            <div style={{ padding:'24px 16px 0' }}>
              <div style={{ display:'flex', alignItems:'center',
                justifyContent:'space-between', marginBottom:12 }}>
                <span style={{ fontSize:13, fontWeight:800,
                  color:C.white, fontFamily:FF }}>
                  인기 검색어
                </span>
                <span style={{ fontSize:10, color:C.g[80], fontFamily:FF }}>
                  {new Date().toLocaleTimeString('ko-KR',
                    {hour:'2-digit', minute:'2-digit'})} 기준
                </span>
              </div>

              <div style={{ background:C.card, border:`1px solid ${C.border}`,
                borderRadius:14, overflow:'hidden' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
                  {[HOT_KEYWORDS.slice(0,5), HOT_KEYWORDS.slice(5,10)].map((col, ci) => (
                    <div key={ci}
                      style={{ borderRight: ci===0
                        ? `1px solid ${C.border}` : 'none' }}>
                      {col.map((kw, ri) => (
                        <div key={kw.rank} onClick={() => doSearch(kw.word)}
                          style={{ display:'flex', alignItems:'center', gap:9,
                            padding:'11px 14px', cursor:'pointer',
                            background: kw.rank <= 3
                              ? `${C.primary}05` : 'transparent',
                            borderBottom: ri < 4
                              ? `1px solid ${C.border}` : 'none' }}>
                          <span style={{ fontSize:13, fontWeight:900,
                            fontFamily:FF, minWidth:18, letterSpacing:'-0.02em',
                            color: kw.rank <= 3 ? C.primary : C.g[70] }}>
                            {kw.rank}
                          </span>
                          <span style={{ flex:1, fontSize:11,
                            fontWeight: kw.rank <= 3 ? 700 : 400,
                            color: kw.rank <= 3 ? C.white : C.g[50],
                            fontFamily:FF, overflow:'hidden',
                            textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                            {kw.word}
                          </span>
                          {kw.change === 'new'  && (
                            <span style={{ fontSize:8, fontWeight:900,
                              color:'#EF4444', background:'rgba(239,68,68,0.15)',
                              padding:'1px 4px', borderRadius:2,
                              fontFamily:FF, flexShrink:0 }}>N</span>
                          )}
                          {kw.change === 'up'   && (
                            <span style={{ fontSize:9, color:'#22C55E',
                              fontWeight:700, flexShrink:0 }}>▲</span>
                          )}
                          {kw.change === 'down' && (
                            <span style={{ fontSize:9, color:'#EF4444',
                              fontWeight:700, flexShrink:0 }}>▼</span>
                          )}
                          {kw.change === 'same' && (
                            <span style={{ fontSize:9, color:C.g[80],
                              flexShrink:0 }}>─</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 추천 역 */}
            <div style={{ padding:'24px 0 0' }}>
              <div style={{ padding:'0 16px', marginBottom:12 }}>
                <span style={{ fontSize:13, fontWeight:800,
                  color:C.white, fontFamily:FF }}>
                  추천 역
                </span>
              </div>
              <div style={{ display:'flex', gap:10, padding:'0 16px',
                overflowX:'auto', scrollbarWidth:'none' }}>
                {SEARCH_STATIONS.slice(0,7).map((st, i) => {
                  const lc = lineColor(st.lineId);
                  return (
                    <div key={i} onClick={() => onStation ? onStation(st) : doSearch(st.name)}
                      style={{ flexShrink:0, width:90, background:C.card,
                        border:`1px solid ${C.border}`, borderRadius:14,
                        padding:'14px 10px', cursor:'pointer',
                        display:'flex', flexDirection:'column',
                        alignItems:'center', gap:7 }}>
                      <div style={{ width:38, height:38, borderRadius:19,
                        background:lc, flexShrink:0,
                        display:'flex', alignItems:'center',
                        justifyContent:'center',
                        fontSize:14, fontWeight:900, color:'#fff',
                        fontFamily:FF,
                        boxShadow:`0 3px 10px ${lc}45` }}>
                        {shortName(st.lineId)}
                      </div>
                      <span style={{ fontSize:11, fontWeight:700,
                        color:C.white, fontFamily:FF, textAlign:'center',
                        letterSpacing:'-0.02em', lineHeight:1.3 }}>
                        {st.name}
                      </span>
                      <span style={{ fontSize:9, color:C.g[70],
                        fontFamily:FF }}>
                        글 {st.posts}개
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 빠른 탐색 */}
            <div style={{ padding:'24px 16px 0' }}>
              <span style={{ fontSize:13, fontWeight:800,
                color:C.white, fontFamily:FF, display:'block',
                marginBottom:12 }}>
                빠른 탐색
              </span>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
                gap:8 }}>
                {[
                  { label:'혼잡 정보',   icon:'🚇', tag:'혼잡',  q:'혼잡' },
                  { label:'역 맛집',     icon:'🍜', tag:'맛집',  q:'맛집' },
                  { label:'꿀팁 모음',   icon:'💡', tag:'꿀팁',  q:'꿀팁' },
                  { label:'출퇴근 정보', icon:'⏰', tag:'출퇴근', q:'출퇴근' },
                ].map((item, i) => (
                  <div key={i} onClick={() => doSearch(item.q)}
                    style={{ background:C.card,
                      border:`1px solid ${C.border}`,
                      borderRadius:12, padding:'14px 14px',
                      cursor:'pointer', display:'flex',
                      alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:20 }}>{item.icon}</span>
                    <span style={{ fontSize:13, fontWeight:700,
                      color:C.white, fontFamily:FF }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height:40 }} />
          </>
        )}

        {/* ─── 결과 뷰 (검색어 있을 때) ──────────────── */}
        {q && (
          <>
            {/* 결과 탭바 */}
            <div style={{ position:'sticky', top:0, background:C.bg, zIndex:10,
              borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', overflowX:'auto',
                scrollbarWidth:'none', padding:'0 16px' }}>
                {RESULT_TABS.map(t => {
                  const on = t === resultTab;
                  return (
                    <button key={t} onClick={() => setResultTab(t)}
                      style={{ flexShrink:0, padding:'12px 14px',
                        background:'none', border:'none', cursor:'pointer',
                        fontSize:13, fontWeight: on ? 800 : 500,
                        color: on ? C.white : C.g[70], fontFamily:FF,
                        borderBottom: on
                          ? `2px solid ${C.primary}` : '2px solid transparent',
                        marginBottom:-1, transition:'all 0.2s' }}>
                      {t}
                      {TAB_COUNT[t] > 0 && (
                        <span style={{ marginLeft:5, fontSize:10,
                          fontWeight:700,
                          color: on ? C.primary : C.g[80] }}>
                          {TAB_COUNT[t]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 결과 없음 */}
            {totalCount === 0 ? (
              <div style={{ padding:'72px 20px', textAlign:'center' }}>
                <div style={{ fontSize:52, marginBottom:18, opacity:0.6 }}>🔍</div>
                <div style={{ fontSize:16, fontWeight:900, color:C.white,
                  fontFamily:FF, letterSpacing:'-0.03em', marginBottom:8 }}>
                  검색 결과가 없어요
                </div>
                <div style={{ fontSize:13, color:C.g[60], fontFamily:FF,
                  lineHeight:1.7 }}>
                  <span style={{ color:C.primary, fontWeight:700 }}>
                    "{query}"
                  </span>에 대한<br/>검색 결과를 찾지 못했어요
                </div>
                {recentList.length > 0 && (
                  <div style={{ marginTop:24, display:'flex',
                    flexWrap:'wrap', gap:8, justifyContent:'center' }}>
                    {recentList.slice(0,4).map((r,i) => (
                      <button key={i} onClick={() => setQuery(r)}
                        style={{ padding:'7px 14px', borderRadius:20,
                          fontSize:12, background:C.glass1,
                          border:`1px solid ${C.border}`, color:C.g[50],
                          fontFamily:FF, cursor:'pointer' }}>
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ paddingTop:16 }}>

                {/* ── 게시글 결과 ── */}
                {(resultTab === '전체' || resultTab === '게시글') &&
                 resPosts.length > 0 && (
                  <div style={{ marginBottom:28 }}>
                    <SectionLabel label="게시글"
                      count={resultTab==='전체' ? resPosts.length : null} />
                    {resPosts.map((p, i) => {
                      const lc = lineColor(p.lineId);
                      return (
                        <div key={p.id}
                          onClick={() => onPostDetail && onPostDetail(p)}
                          style={{ display:'flex', alignItems:'center', gap:13,
                            padding:'13px 16px',
                            borderBottom:`1px solid ${C.border}`,
                            cursor:'pointer' }}>
                          {/* 썸네일 */}
                          <div style={{ width:54, height:54, borderRadius:10,
                            background:p.thumb, flexShrink:0,
                            position:'relative', overflow:'hidden' }}>
                            <div style={{ position:'absolute', bottom:3, right:3,
                              width:18, height:18, borderRadius:9, background:lc,
                              display:'flex', alignItems:'center',
                              justifyContent:'center',
                              fontSize:8, fontWeight:900, color:'#fff' }}>
                              {shortName(p.lineId)}
                            </div>
                          </div>
                          {/* 텍스트 */}
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ marginBottom:4 }}>
                              <span style={{ fontSize:9, fontWeight:800,
                                color:p.tagColor,
                                background:`${p.tagColor}22`,
                                padding:'1px 6px', borderRadius:3,
                                fontFamily:FF }}>#{p.tag}</span>
                            </div>
                            <div style={{ fontSize:13, fontWeight:700,
                              color:C.white, fontFamily:FF,
                              lineHeight:1.4, letterSpacing:'-0.02em',
                              overflow:'hidden', textOverflow:'ellipsis',
                              whiteSpace:'nowrap', marginBottom:5 }}>
                              {p.title}
                            </div>
                            <div style={{ display:'flex',
                              alignItems:'center', gap:10 }}>
                              <span style={{ fontSize:10, color:C.g[70],
                                fontFamily:FF }}>@{p.writer}</span>
                              <span style={{ fontSize:10, color:C.g[80],
                                fontFamily:FF }}>♥ {p.likes}</span>
                              <span style={{ fontSize:10, color:C.g[80],
                                fontFamily:FF }}>💬 {p.comments}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── 역 결과 ── */}
                {(resultTab === '전체' || resultTab === '역') &&
                 resStations.length > 0 && (
                  <div style={{ marginBottom:28 }}>
                    <SectionLabel label="역"
                      count={resultTab==='전체' ? resStations.length : null} />
                    {resStations.map((st, i) => {
                      const lc = lineColor(st.lineId);
                      return (
                        <div key={i}
                          onClick={() => onStation && onStation(st)}
                          style={{ display:'flex', alignItems:'center', gap:14,
                            padding:'13px 16px', cursor:'pointer',
                            borderBottom:`1px solid ${C.border}` }}>
                          <div style={{ width:46, height:46, borderRadius:23,
                            background:lc, flexShrink:0,
                            display:'flex', alignItems:'center',
                            justifyContent:'center',
                            fontSize:17, fontWeight:900, color:'#fff',
                            fontFamily:FF,
                            boxShadow:`0 4px 12px ${lc}45` }}>
                            {shortName(st.lineId)}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:14, fontWeight:800,
                              color:C.white, fontFamily:FF,
                              letterSpacing:'-0.025em', marginBottom:3 }}>
                              {st.name}
                            </div>
                            <div style={{ fontSize:11, color:C.g[60],
                              fontFamily:FF }}>
                              {st.desc}
                            </div>
                          </div>
                          <div style={{ textAlign:'right', flexShrink:0 }}>
                            <div style={{ fontSize:13, fontWeight:700,
                              color:C.g[50], fontFamily:FF }}>
                              {st.posts}
                            </div>
                            <div style={{ fontSize:9, color:C.g[80],
                              fontFamily:FF }}>게시글</div>
                          </div>
                          <svg width="7" height="12" viewBox="0 0 7 12" fill="none"
                            style={{ flexShrink:0 }}>
                            <path d="M1 1l5 5-5 5" stroke={C.g[80]}
                              strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round"/>
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* ── 사용자 결과 ── */}
                {(resultTab === '전체' || resultTab === '사용자') &&
                 resUsers.length > 0 && (
                  <div style={{ marginBottom:28 }}>
                    <SectionLabel label="사용자"
                      count={resultTab==='전체' ? resUsers.length : null} />
                    {resUsers.map((u, i) => {
                      const lc = lineColor(u.lineId);
                      return (
                        <div key={i}
                          style={{ display:'flex', alignItems:'center', gap:13,
                            padding:'13px 16px', cursor:'pointer',
                            borderBottom:`1px solid ${C.border}` }}>
                          <div style={{ width:46, height:46, borderRadius:23,
                            background:`${lc}28`,
                            border:`1.5px solid ${lc}45`, flexShrink:0,
                            display:'flex', alignItems:'center',
                            justifyContent:'center',
                            fontSize:17, fontWeight:900, color:lc,
                            fontFamily:FF }}>
                            {u.nick[0]}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ display:'flex', alignItems:'center',
                              gap:6, marginBottom:3 }}>
                              <span style={{ fontSize:14, fontWeight:800,
                                color:C.white, fontFamily:FF }}>
                                {u.nick}
                              </span>
                              <span style={{ fontSize:9, fontWeight:700,
                                color:C.primary,
                                background:`${C.primary}18`,
                                padding:'1px 6px', borderRadius:3,
                                fontFamily:FF }}>
                                {u.badge}
                              </span>
                            </div>
                            <div style={{ display:'flex',
                              alignItems:'center', gap:4 }}>
                              <div style={{ width:12, height:12,
                                borderRadius:6, background:lc,
                                display:'flex', alignItems:'center',
                                justifyContent:'center',
                                fontSize:6, fontWeight:900, color:'#fff' }}>
                                {shortName(u.lineId)}
                              </div>
                              <span style={{ fontSize:11, color:C.g[60],
                                fontFamily:FF }}>
                                {u.station}
                              </span>
                            </div>
                          </div>
                          <div style={{ textAlign:'right', flexShrink:0 }}>
                            <div style={{ fontSize:12, fontWeight:700,
                              color:C.g[50], fontFamily:FF }}>
                              {u.followers.toLocaleString()}
                            </div>
                            <div style={{ fontSize:9, color:C.g[80],
                              fontFamily:FF }}>팔로워</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function HomeScreen({ isDark = true }) {
  const [voted, setVoted]               = useState(null);
  const [tab, setTab]                   = useState('추천');
  const [storyViewer,   setStoryViewer]   = useState(null);   // { stories, startIndex }
  const [userProfile,   setUserProfile]   = useState(null);   // 유저 프로필 닉네임
  const [showMap, setShowMap]           = useState(false);
  const [showVoteDetail,    setShowVoteDetail]    = useState(false);
  const [showInsideStation, setShowInsideStation] = useState(false);
  const [showMeetup,        setShowMeetup]        = useState(false);
  const [showNotif,         setShowNotif]         = useState(false);
  const [showChat,          setShowChat]          = useState(false);
  const [chatRoom,          setChatRoom]          = useState(null);
  const [showSearch,        setShowSearch]        = useState(false);
  const [searchQuery,       setSearchQuery]       = useState('');
  const [showReviewList,    setShowReviewList]    = useState(false);
  const [showLangExchange,  setShowLangExchange]  = useState(false);
  const [showCrewList,      setShowCrewList]      = useState(false);
  const [stationDetail,     setStationDetail]     = useState(null);
  const [crewDetail,        setCrewDetail]        = useState(null);
  const [postDetail,        setPostDetail]        = useState(null);
  const [selectedLine, setSelectedLine] = useState('s2');
  const [greeting] = useState(() =>
    GREETING_PHRASES[Math.floor(Math.random() * GREETING_PHRASES.length)]
  );
  const TABS = ['콘텐츠', '추천', '인기', '이슈', '공지'];

  const notifCount = NOTIF_DATA.filter(n => !n.read).length;
  const chatCount  = CHAT_ROOMS.reduce((s, r) => s + r.unread, 0);

  if (showVoteDetail)    return <VoteDetailScreen    onBack={() => setShowVoteDetail(false)} />;
  if (showInsideStation) return <InsideStationDetailScreen onBack={() => setShowInsideStation(false)} />;
  if (showMeetup)        return <MeetupScreen        onBack={() => setShowMeetup(false)} />;
  if (showNotif)         return <NotifScreen         onBack={() => setShowNotif(false)}
    onNavigate={n => {
      setShowNotif(false);
      /* 알림 타입별 딥링크 */
      if (n.type === 'reply' || n.type === 'like') {
        /* 본문에서 게시글 ID 매칭 시도 → HOT_POSTS 에서 찾기 */
        const matched = HOT_POSTS.find(p =>
          n.body.includes(p.title.slice(0, 8))
        ) ?? HOT_POSTS[0];
        setPostDetail(matched);
      } else if (n.type === 'train') {
        setTab('이슈');
      } else if (n.type === 'notice') {
        setTab('공지');
      } else if (n.type === 'match') {
        setShowMeetup(true);
      } else if (n.type === 'crew') {
        setCrewDetail(CREW_LIST[0]);
      }
    }} />;
  if (chatRoom)          return <ChatRoomScreen      room={chatRoom} onBack={() => setChatRoom(null)} onUser={nick => { setChatRoom(null); setUserProfile(nick); }} />;
  if (showChat)          return <ChatListScreen      onBack={() => setShowChat(false)} onRoom={r => { setShowChat(false); setChatRoom(r); }} />;
  if (stationDetail)     return <StationDetailScreen station={stationDetail} onBack={() => setStationDetail(null)} onPostDetail={p => { setStationDetail(null); setPostDetail(p); }} onUser={nick => { setStationDetail(null); setUserProfile(nick); }} />;
  if (crewDetail)        return <CrewDetailScreen   crew={crewDetail}     onBack={() => setCrewDetail(null)} onPostDetail={p => { setCrewDetail(null); setPostDetail(p); }} onUser={nick => { setCrewDetail(null); setUserProfile(nick); }} />;
  if (userProfile)       return <UserProfileScreen  nick={userProfile}    onBack={() => setUserProfile(null)} />;
  if (postDetail)        return <PostDetailScreen   post={postDetail}     onBack={() => setPostDetail(null)}
    onUser={nick => { setPostDetail(null); setUserProfile(nick); }} />;
  if (showSearch)        return <SearchScreen        initialQuery={searchQuery} onBack={() => { setShowSearch(false); setSearchQuery(''); }} onStation={s => { setShowSearch(false); setSearchQuery(''); setStationDetail(s); }} onPostDetail={p => { setShowSearch(false); setSearchQuery(''); setPostDetail(p); }} onUser={nick => { setShowSearch(false); setSearchQuery(''); setUserProfile(nick); }} />;
  if (showReviewList)    return <StationReviewListScreen onBack={() => setShowReviewList(false)} onWrite={() => { setShowReviewList(false); }} />;
  if (showLangExchange)  return <LanguageExchangeScreen  onBack={() => setShowLangExchange(false)} onChatStart={r => { setShowLangExchange(false); setChatRoom(r); }} />;
  if (showCrewList)      return <CrewListScreen          onBack={() => setShowCrewList(false)} onCrewDetail={crew => { setShowCrewList(false); setCrewDetail(crew); }} />;

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:68,
      scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>

      {/* ── 스토리 전체화면 뷰어 ── */}
      {storyViewer && (
        <StoryViewer
          stories={storyViewer.stories}
          startIndex={storyViewer.startIndex}
          onClose={function() { setStoryViewer(null); }}
          onUser={function(nick) { setStoryViewer(null); setUserProfile(nick); }}
        />
      )}

      <AppHeader
        onSearch={() => setShowSearch(true)}
        onNotif={() => setShowNotif(true)}
        onChat={() => setShowChat(true)}
        notifCount={notifCount}
        chatCount={chatCount}
        isDark={isDark}
      />
      {/* 무신사 탭 내비 */}
      <TabNav tabs={TABS} active={tab} onTab={setTab} />

      {/* ─── 인기 탭 전용 ─────────────────────────────── */}
      {tab === '인기' && <PopularTab onCrewDetail={c => setCrewDetail(c)} onPostDetail={p => setPostDetail(p)} onReviewList={() => setShowReviewList(true)} />}

      {/* ─── 이슈 탭 전용 ─────────────────────────────── */}
      {tab === '이슈' && <IssueTab />}

      {/* ─── 공지 탭 전용 ─────────────────────────────── */}
      {tab === '공지' && <NoticeTab />}

      {/* ─── 콘텐츠 탭 전용 ─────────────────────────────── */}
      {tab === '콘텐츠' && <ContentTab />}

      {tab !== '인기' && tab !== '공지' && tab !== '콘텐츠' && tab !== '이슈' && <>

      {/* 긴급 공지 배너 — 클릭 시 공지 탭으로 이동 */}
      <div
        onClick={() => setTab('공지')}
        style={{ background:'#C0392B', display:'flex', alignItems:'center',
          gap:8, padding:'9px 16px', cursor:'pointer' }}>
        {/* 경고 아이콘 */}
        <span style={{ fontSize:13, flexShrink:0 }}>🚨</span>
        <div style={{ flex:1, overflow:'hidden' }}>
          <span style={{ fontSize:12, fontWeight:700, color:'#fff', fontFamily:FF,
            overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            display:'block' }}>
            [긴급] 2호선 강남~홍대입구 구간 신호장애로 현재 운행 지연 중 (약 15분)
          </span>
        </div>
        <span style={{ fontSize:11, color:'rgba(255,255,255,0.6)',
          flexShrink:0 }}>›</span>
      </div>

      {/* ①  웰컴 메시지 */}
      <div style={{ padding:'22px 16px 0', background:C.bg }}>
        <b style={{ fontSize:22, lineHeight:'133%', letterSpacing:'-0.04em',
          fontWeight:900, color:C.white, display:'block', fontFamily:FF }}>
          이효범님,
        </b>
        <span style={{ fontSize:20, lineHeight:'133%', letterSpacing:'-0.03em',
          fontWeight:700, color:C.g[50], fontFamily:FF }}>
          {greeting}
        </span>
      </div>

      <Div8 h={12} />

      {/* ② 실시간 열차 */}
      <RealtimeTrainSection
        onSubwayMap={() => setShowMap(true)}
        selectedLine={selectedLine}
        setSelectedLine={setSelectedLine}
      />

      {/* ③ 날씨 + 이동 안내 통합 카드 */}
      <WeatherCommuteCard />

      <Div8 h={16} />

      {/* ⑤ 스토리 피드 */}
      <StoryFeed onStory={function(st, allStories) {
        setStoryViewer({ stories: allStories, startIndex: allStories.findIndex(function(s) { return s.id === st.id; }) });
      }} />

      {/* ⑥ 오늘의 투표 */}
      <DailyVoteCard voted={voted} setVoted={setVoted} onDetail={() => setShowVoteDetail(true)} />

      <Div8 h={24} />

      {/* 🤝 역 인연 매칭 요약 섹션 */}
      <MeetupSummarySection onEnter={() => setShowMeetup(true)} />

      <Div8 h={16} />

      {/* ⑦ 인기 검색어 */}
      <TrendingSection onSearch={kw => { setSearchQuery(kw); setShowSearch(true); }} />

      <Div8 h={16} />

      {/* ⑧ 지금 뜨는 글 — 3-in-1 탭 슬라이더 */}
      <HotPostsTabs selectedLine={selectedLine} onPostDetail={p => setPostDetail(p)} />

      <Div8 h={16} />

      {/* ⑨ 이 역 내리면 */}
      <StationFoodSection />

      <Div8 h={24} />

      {/* ⑩ 이 역 안에서 */}
      <InsideStationSection onMore={() => setShowInsideStation(true)} />

      <Div8 h={16} />

      {/* ⑪ 실시간 지하철 뉴스 */}
      <NewsSection />

      <div style={{ height:16 }}/>

      {/* ⑫ 언어 교환 미리보기 */}
      <LanguageExchangeSection onMore={() => setShowLangExchange(true)} />

      {/* ⑬ 아하철 크루 미리보기 */}
      <CrewSection
        onMore={() => setShowCrewList(true)}
        onCrewDetail={crew => setCrewDetail(crew)}
      />

      </> /* ─── 홈 피드 탭 끝 (콘텐츠·추천·이슈) ─── */}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   노선도 오버레이 — SVG 2D 공간 배치 (네이버 스타일)
   ═══════════════════════════════════════════════════════ */

// 주요 역 좌표 (SVG viewBox 0 0 840 660 기준)
const ST = {
  // 1호선
  '의정부':[398,28],'광운대':[432,62],'회기':[458,88],'청량리':[472,118],
  '동대문':[472,208],'종로3가':[410,238],'종각':[390,235],'시청':[355,238],
  '서울역':[318,262],'남영':[300,280],'용산':[282,295],'노량진':[252,335],
  '대방':[240,350],'신길':[228,362],'영등포':[215,375],'구로':[195,382],
  '부천':[155,382],'부평':[118,382],'인천':[78,385],
  '신도림_1':[175,358],
  // 2호선
  '을지로3가':[422,238],'을지로4가':[445,240],'동대문역사':[472,248],
  '신당':[492,255],'왕십리':[515,255],'건대입구':[555,262],
  '구의':[575,265],'강변':[592,265],'잠실나루':[608,270],'잠실':[630,275],
  '종합운동장':[628,308],'삼성':[598,348],'선릉':[572,358],
  '역삼':[550,362],'강남':[522,368],'교대':[492,372],
  '서초':[468,375],'방배':[448,378],'사당':[422,382],
  '낙성대':[400,380],'신림':[375,376],'신대방':[352,365],
  '구로디지털단지':[322,348],'신도림':[292,325],
  '홍대입구':[210,252],'합정':[188,262],'당산':[188,298],
  '영등포구청':[210,310],'신촌':[245,245],'이대':[268,242],
  '아현':[292,240],'충정로':[315,240],
  // 3호선
  '대화':[38,88],'주엽':[62,88],'정발산':[82,88],'마두':[102,88],
  '백석':[122,88],'대곡':[142,92],'화정':[158,108],'원당':[158,125],
  '삼송':[165,155],'지축':[172,172],'구파발':[178,188],'연신내':[198,202],
  '불광':[215,202],'녹번':[232,205],'홍제':[252,210],'무악재':[270,215],
  '독립문':[288,218],'경복궁':[308,222],'안국':[330,228],
  '충무로':[448,265],'동대입구':[465,278],'약수':[482,292],
  '금호':[500,298],'옥수':[518,298],'압구정':[525,318],
  '신사':[520,335],'잠원':[512,348],'고속터미널':[478,352],
  '남부터미널':[478,372],'양재':[510,405],'매봉':[535,415],
  '도곡':[552,420],'대치':[568,415],'학여울':[585,410],
  '대청':[602,405],'일원':[618,408],'수서':[635,408],
  '가락시장':[638,390],'경찰병원':[645,372],'오금':[658,360],
  // 4호선
  '당고개':[505,25],'상계':[515,45],'노원':[528,65],'창동':[488,80],
  '쌍문':[460,96],'수유':[445,112],'미아':[442,130],'미아사거리':[442,148],
  '길음':[445,162],'성신여대입구':[445,178],'한성대입구':[448,192],
  '혜화':[448,208],
  '명동':[375,270],'회현':[350,270],'숙대입구':[292,282],
  '삼각지':[262,298],'신용산':[248,308],'이촌':[252,322],
  '동작':[288,358],'총신대입구':[348,385],'남태령':[412,400],
  // 5호선
  '방화':[32,298],'개화산':[55,298],'김포공항':[78,298],
  '송정':[100,298],'마곡':[122,298],'발산':[142,298],
  '우장산':[158,298],'화곡':[172,298],'까치산':[185,298],
  '목동':[192,322],'오목교':[192,335],'양평':[205,348],
  '영등포시장':[218,360],
  '여의도':[240,318],'여의나루':[255,308],'마포':[268,300],
  '공덕':[282,292],'애오개':[302,288],'서대문':[322,255],
  '광화문':[345,252],
  '청구':[498,268],'신금호':[515,278],'행당':[515,262],
  '마장':[535,262],'답십리':[552,262],'장한평':[568,262],
  '군자':[585,255],'아차산':[602,252],'광나루':[618,252],
  '천호':[635,252],'강동':[652,255],'길동':[668,265],
  '굽은다리':[680,275],'명일':[692,285],'고덕':[702,295],'상일동':[715,305],
  // 6호선
  '응암':[148,212],'역촌':[165,210],'독바위':[202,205],'구산':[220,208],
  '새절':[240,215],'증산':[255,220],'디지털미디어시티':[185,240],
  '월드컵경기장':[175,258],'마포구청':[190,272],'망원':[180,280],
  '상수':[196,278],'광흥창':[212,280],'대흥':[228,282],
  '효창공원앞':[248,288],'녹사평':[262,310],'이태원':[275,322],
  '한강진':[295,330],'버티고개':[315,332],
  '신당_6':[478,262],'동묘앞':[465,220],'창신':[458,208],
  '보문':[452,196],'안암':[462,182],'고려대':[475,172],
  '월곡':[488,162],'상월곡':[502,152],'돌곶이':[515,146],
  '석계':[528,142],'태릉입구':[542,142],'화랑대':[555,148],'봉화산':[568,158],
  // 7호선
  '장암':[595,25],'도봉산':[562,45],'수락산':[565,62],
  '마들':[558,78],'중계':[548,96],'하계':[548,112],
  '공릉':[555,128],'먹골':[572,165],'중화':[578,180],
  '상봉':[582,195],'면목':[588,210],'사가정':[592,225],
  '용마산':[598,238],'중곡':[600,248],
  '어린이대공원':[572,268],'뚝섬유원지':[560,280],
  '청담':[568,328],'강남구청':[552,352],'학동':[538,360],
  '논현':[522,368],'반포':[505,358],'내방':[490,362],
  '이수':[475,390],'남성':[455,402],'숭실대입구':[435,408],
  '상도':[415,412],'장승배기':[395,415],'신대방삼거리':[372,410],
  '보라매':[352,405],'신풍':[332,400],'대림':[315,390],
  '남구로':[295,385],'가산디지털단지':[275,382],
  '철산':[242,398],'광명사거리':[225,412],'천왕':[208,415],'온수':[190,415],
  // 8호선
  '별내':[718,195],'다산':[705,212],'구리':[692,228],'암사':[668,244],
  '몽촌토성':[645,295],'석촌':[638,358],'송파':[642,372],
  '문정':[645,385],'장지':[645,400],'복정':[642,415],
  '산성':[632,430],'남한산성입구':[618,442],'단대오거리':[605,452],
  '신흥':[592,460],'수진':[575,468],'모란':[558,478],
  // 9호선
  '개화':[38,348],'공항시장':[58,348],'신방화':[78,348],
  '마곡나루':[110,340],'양천향교':[128,340],'가양':[148,338],
  '증미':[165,338],'등촌':[182,338],'염창':[198,338],
  '신목동':[212,338],'선유도':[225,330],'당산_9':[188,298],
  '국회의사당':[242,328],'샛강':[252,332],'노들':[265,342],
  '흑석':[278,352],
  '구반포':[445,368],'신반포':[458,368],'사평':[505,378],
  '신논현':[520,378],'언주':[538,378],'선정릉':[552,375],
  '봉은사':[565,368],'삼전':[632,340],'석촌고분':[636,352],
  '송파나루':[645,362],'한성백제':[652,378],'올림픽공원':[662,388],
  '둔촌오륜':[672,400],'중앙보훈병원':[685,412],
  // 신분당선
  '신사_sin':[518,330],'논현_sin':[518,348],
  '양재시민의숲':[508,415],'청계산입구':[505,435],
  '판교':[502,458],'정자':[498,478],'미금':[492,495],
  '동천':[485,510],'수지구청':[478,525],'성복':[468,540],
  '상현':[458,555],'광교중앙':[445,568],'광교':[432,580],
};

// 노선별 경로 + 역 정의
const SVG_LINES = [
  { id:'1', name:'1호선', color:'#2A3E91', w:8,
    paths:[
      [[398,28],[432,62],[458,88],[472,118],[472,208],[465,225],[410,238],[390,235],[355,238],[318,262],[300,280],[282,295],[252,335],[240,350],[228,362],[215,375],[195,382],[155,382],[118,382],[78,385]],
      [[195,382],[175,358],[175,348]],
    ],
    stations:[
      {n:'의정부',k:'의정부'},{n:'청량리',k:'청량리',t:true},{n:'동대문',k:'동대문',t:true},
      {n:'종로3가',k:'종로3가',t:true},{n:'종각',k:'종각'},{n:'시청',k:'시청',t:true},
      {n:'서울역',k:'서울역',t:true},{n:'용산',k:'용산',t:true},{n:'노량진',k:'노량진'},
      {n:'영등포',k:'영등포'},{n:'구로',k:'구로'},{n:'부평',k:'부평'},{n:'인천',k:'인천'},
    ]},
  { id:'2', name:'2호선', color:'#60B157', w:8,
    paths:[
      [[355,238],[315,240],[292,240],[268,242],[245,245],[210,252],[188,262],[188,298],[210,310],[292,325],[322,348],[352,365],[375,376],[400,380],[422,382],[448,378],[468,375],[492,372],[522,368],[550,362],[572,358],[598,348],[628,308],[630,275],[608,270],[592,265],[575,265],[555,262],[515,255],[492,255],[472,248],[445,240],[422,238],[410,238],[390,235],[355,238]],
    ],
    stations:[
      {n:'시청',k:'시청',t:true},{n:'을지로3가',k:'을지로3가',t:true},
      {n:'동대문역사',k:'동대문역사',t:true},{n:'왕십리',k:'왕십리',t:true},
      {n:'건대입구',k:'건대입구',t:true},{n:'잠실',k:'잠실',t:true},
      {n:'종합운동장',k:'종합운동장'},{n:'삼성',k:'삼성',t:true},
      {n:'선릉',k:'선릉',t:true},{n:'강남',k:'강남',t:true},
      {n:'교대',k:'교대',t:true},{n:'사당',k:'사당',t:true},
      {n:'신림',k:'신림'},{n:'신도림',k:'신도림',t:true},
      {n:'홍대입구',k:'홍대입구',t:true},{n:'합정',k:'합정',t:true},
      {n:'당산',k:'당산',t:true},{n:'신촌',k:'신촌'},{n:'충정로',k:'충정로',t:true},
    ]},
  { id:'3', name:'3호선', color:'#FE8A39', w:7,
    paths:[
      [[38,88],[62,88],[82,88],[102,88],[122,88],[142,92],[158,108],[158,125],[165,155],[172,172],[178,188],[198,202],[215,202],[232,205],[252,210],[270,215],[288,218],[308,222],[330,228],[355,238],[410,238],[422,238],[448,265],[465,278],[482,292],[500,298],[518,298],[525,318],[520,335],[512,348],[478,352],[478,372],[510,405],[535,415],[552,420],[568,415],[585,410],[602,405],[618,408],[635,408],[638,390],[645,372],[658,360]],
    ],
    stations:[
      {n:'대화',k:'대화'},{n:'연신내',k:'연신내',t:true},{n:'불광',k:'불광'},
      {n:'홍제',k:'홍제'},{n:'경복궁',k:'경복궁'},{n:'안국',k:'안국'},
      {n:'종로3가',k:'종로3가',t:true},{n:'을지로3가',k:'을지로3가',t:true},
      {n:'충무로',k:'충무로',t:true},{n:'약수',k:'약수',t:true},
      {n:'옥수',k:'옥수'},{n:'고속터미널',k:'고속터미널',t:true},
      {n:'교대',k:'교대',t:true},{n:'남부터미널',k:'남부터미널'},
      {n:'양재',k:'양재',t:true},{n:'도곡',k:'도곡'},{n:'수서',k:'수서',t:true},
      {n:'가락시장',k:'가락시장',t:true},{n:'오금',k:'오금'},
    ]},
  { id:'4', name:'4호선', color:'#509DD8', w:7,
    paths:[
      [[505,25],[515,45],[528,65],[488,80],[460,96],[445,112],[442,130],[442,148],[445,162],[445,178],[448,192],[448,208],[472,208],[472,248],[448,265],[375,270],[350,270],[318,262],[292,282],[262,298],[248,308],[252,322],[288,358],[348,385],[412,400],[422,382]],
    ],
    stations:[
      {n:'당고개',k:'당고개'},{n:'노원',k:'노원',t:true},{n:'창동',k:'창동',t:true},
      {n:'수유',k:'수유'},{n:'길음',k:'길음'},{n:'혜화',k:'혜화'},
      {n:'동대문',k:'동대문',t:true},{n:'동대문역사',k:'동대문역사',t:true},
      {n:'충무로',k:'충무로',t:true},{n:'명동',k:'명동'},
      {n:'서울역',k:'서울역',t:true},{n:'삼각지',k:'삼각지',t:true},
      {n:'이촌',k:'이촌'},{n:'동작',k:'동작',t:true},{n:'사당',k:'사당',t:true},
    ]},
  { id:'5', name:'5호선', color:'#7F41D8', w:7,
    paths:[
      [[32,298],[55,298],[78,298],[100,298],[122,298],[142,298],[158,298],[172,298],[185,298],[185,322],[192,335],[205,348],[218,360],[228,362],[240,318],[255,308],[268,300],[282,292],[302,288],[322,255],[345,252],[355,238],[410,238],[422,238],[445,240],[472,248],[498,268],[515,262],[535,262],[552,262],[568,262],[585,255],[602,252],[618,252],[635,252],[652,255],[668,265],[680,275],[692,285],[702,295],[715,305]],
    ],
    stations:[
      {n:'방화',k:'방화'},{n:'김포공항',k:'김포공항',t:true},{n:'화곡',k:'화곡'},
      {n:'까치산',k:'까치산',t:true},{n:'목동',k:'목동'},{n:'양평',k:'양평'},
      {n:'여의도',k:'여의도',t:true},{n:'마포',k:'마포'},{n:'공덕',k:'공덕',t:true},
      {n:'광화문',k:'광화문',t:true},{n:'종로3가',k:'종로3가',t:true},
      {n:'동대문역사',k:'동대문역사',t:true},{n:'왕십리',k:'왕십리',t:true},
      {n:'군자',k:'군자',t:true},{n:'천호',k:'천호',t:true},
      {n:'강동',k:'강동',t:true},{n:'상일동',k:'상일동'},
    ]},
  { id:'6', name:'6호선', color:'#A95523', w:6,
    paths:[
      [[148,212],[165,210],[202,205],[220,208],[240,215],[255,220],[185,240],[175,258],[190,272],[180,280],[196,278],[212,280],[228,282],[248,288],[262,310],[275,322],[295,330],[315,332],[332,332],[482,292],[478,262],[465,220],[458,208],[452,196],[462,182],[475,172],[488,162],[502,152],[515,146],[528,142],[542,142],[555,148],[568,158]],
    ],
    stations:[
      {n:'응암',k:'응암'},{n:'연신내',k:'연신내',t:true},{n:'디지털미디어시티',k:'디지털미디어시티',t:true},
      {n:'합정',k:'합정',t:true},{n:'공덕',k:'공덕',t:true},{n:'삼각지',k:'삼각지',t:true},
      {n:'이태원',k:'이태원'},{n:'약수',k:'약수',t:true},{n:'청구',k:'청구',t:true},
      {n:'태릉입구',k:'태릉입구',t:true},{n:'봉화산',k:'봉화산'},
    ]},
  { id:'7', name:'7호선', color:'#727719', w:6,
    paths:[
      [[595,25],[562,45],[565,62],[558,78],[548,96],[548,112],[555,128],[572,165],[578,180],[582,195],[588,210],[592,225],[598,238],[600,248],[572,268],[560,280],[568,328],[552,352],[538,360],[522,368],[505,358],[490,362],[475,390],[455,402],[435,408],[415,412],[395,415],[372,410],[352,405],[332,400],[315,390],[295,385],[275,382],[242,398],[225,412],[208,415],[190,415]],
    ],
    stations:[
      {n:'장암',k:'장암'},{n:'도봉산',k:'도봉산'},{n:'노원',k:'노원',t:true},
      {n:'태릉입구',k:'태릉입구',t:true},{n:'건대입구',k:'건대입구',t:true},
      {n:'뚝섬유원지',k:'뚝섬유원지'},{n:'강남구청',k:'강남구청'},
      {n:'논현',k:'논현'},{n:'고속터미널',k:'고속터미널',t:true},
      {n:'이수',k:'이수',t:true},{n:'대림',k:'대림',t:true},{n:'온수',k:'온수'},
    ]},
  { id:'8', name:'8호선', color:'#D2386E', w:6,
    paths:[
      [[718,195],[705,212],[692,228],[668,244],[645,295],[630,275],[638,358],[642,372],[645,385],[645,400],[642,415],[632,430],[618,442],[605,452],[592,460],[575,468],[558,478]],
    ],
    stations:[
      {n:'별내',k:'별내'},{n:'암사',k:'암사'},{n:'천호',k:'천호',t:true},
      {n:'몽촌토성',k:'몽촌토성'},{n:'잠실',k:'잠실',t:true},
      {n:'석촌',k:'석촌',t:true},{n:'가락시장',k:'가락시장',t:true},
      {n:'문정',k:'문정'},{n:'모란',k:'모란'},
    ]},
  { id:'9', name:'9호선', color:'#D1A946', w:6,
    paths:[
      [[38,348],[58,348],[78,348],[110,340],[128,340],[148,338],[165,338],[182,338],[198,338],[212,338],[225,330],[188,298],[242,328],[252,332],[265,342],[278,352],[288,358],[445,368],[458,368],[505,378],[520,378],[538,378],[552,375],[565,368],[628,308],[632,340],[636,352],[645,362],[652,378],[662,388],[672,400],[685,412]],
    ],
    stations:[
      {n:'개화',k:'개화'},{n:'김포공항',k:'김포공항',t:true},
      {n:'당산',k:'당산',t:true},{n:'여의도',k:'여의도',t:true},
      {n:'노량진',k:'노량진'},{n:'동작',k:'동작',t:true},
      {n:'고속터미널',k:'고속터미널',t:true},{n:'신논현',k:'신논현'},
      {n:'종합운동장',k:'종합운동장'},{n:'석촌',k:'석촌',t:true},
    ]},
  { id:'sin', name:'신분당선', color:'#BC2A38', w:6,
    paths:[
      [[518,330],[518,348],[522,368],[510,405],[508,415],[505,435],[502,458],[498,478],[492,495],[485,510],[478,525],[468,540],[458,555],[445,568],[432,580]],
    ],
    stations:[
      {n:'신사',k:'신사_sin'},{n:'신논현',k:'신논현'},{n:'강남',k:'강남',t:true},
      {n:'양재',k:'양재',t:true},{n:'판교',k:'판교'},{n:'정자',k:'정자'},
      {n:'광교',k:'광교'},
    ]},
];

function SubwayMapOverlay({ onClose }) {
  const containerRef = useRef(null);
  const [transform, setTransform] = useState({ x:-80, y:-20, scale:0.7 });
  const [focusLine, setFocusLine] = useState(null);
  const [tooltip,   setTooltip]   = useState(null);
  const dragRef  = useRef(null);
  const pinchRef = useRef(null);

  // 팬 (마우스 + 터치)
  const onPointerDown = e => {
    if (e.touches && e.touches.length === 2) return;
    const pt = e.touches ? e.touches[0] : e;
    dragRef.current = { sx:pt.clientX, sy:pt.clientY, tx:transform.x, ty:transform.y };
  };
  const onPointerMove = e => {
    if (e.touches && e.touches.length === 2) {
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (pinchRef.current != null) {
        const ratio = d / pinchRef.current;
        setTransform(t => ({ ...t, scale: Math.min(3, Math.max(0.4, t.scale * ratio)) }));
      }
      pinchRef.current = d;
      return;
    }
    if (!dragRef.current) return;
    const pt = e.touches ? e.touches[0] : e;
    setTransform(t => ({
      ...t,
      x: t.x + (pt.clientX - dragRef.current.sx),
      y: t.y + (pt.clientY - dragRef.current.sy),
    }));
    dragRef.current.sx = pt.clientX;
    dragRef.current.sy = pt.clientY;
  };
  const onPointerUp = () => { dragRef.current = null; pinchRef.current = null; };

  // 줌 버튼
  const zoom = d => setTransform(t => ({ ...t, scale: Math.min(3, Math.max(0.4, t.scale + d)) }));

  // 역 클릭 툴팁
  const handleStation = (name, cx, cy) => {
    const lines = SVG_LINES.filter(l => l.stations.some(s => s.n === name)).map(l => l.name);
    setTooltip(t => t && t.name === name ? null : { name, lines, cx, cy });
  };

  const visibleLines = focusLine ? SVG_LINES.filter(l => l.id === focusLine) : SVG_LINES;

  return (
    <div style={{ position:'fixed', inset:0, background:C.bg, zIndex:500,
      display:'flex', flexDirection:'column', userSelect:'none' }}>

      {/* 헤더 */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'14px 18px 10px', paddingTop:'calc(14px + env(safe-area-inset-top,0px))',
        borderBottom:`1px solid ${C.border}`, flexShrink:0,
        background:'rgba(14,15,20,0.97)', backdropFilter:'blur(12px)' }}>
        <span style={{ fontSize:15, fontWeight:800, color:C.white, fontFamily:FF,
          letterSpacing:'-0.02em' }}>서울 지하철 노선도</span>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button onClick={() => zoom(-0.15)}
            style={{ width:30, height:30, borderRadius:8, background:'rgba(255,255,255,0.08)',
              border:`1px solid ${C.border}`, color:C.white, fontSize:16, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
          <span style={{ fontSize:10, color:C.g[80], minWidth:34, textAlign:'center', fontFamily:FF }}>
            {Math.round(transform.scale * 100)}%
          </span>
          <button onClick={() => zoom(+0.15)}
            style={{ width:30, height:30, borderRadius:8, background:'rgba(255,255,255,0.08)',
              border:`1px solid ${C.border}`, color:C.white, fontSize:16, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
          <button onClick={onClose}
            style={{ width:32, height:32, borderRadius:20, background:'rgba(255,255,255,0.08)',
              border:`1px solid ${C.border}`, color:C.g[60], fontSize:14, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>
      </div>

      {/* 호선 필터 pill 바 */}
      <div style={{ display:'flex', gap:5, padding:'8px 14px', overflowX:'auto',
        scrollbarWidth:'none', flexShrink:0,
        borderBottom:`1px solid rgba(255,255,255,0.05)` }}>
        {[null, ...SVG_LINES].map(l => {
          const active = l === null ? focusLine === null : focusLine === l.id;
          return (
            <button key={l ? l.id : 'all'}
              onClick={() => setFocusLine(l === null ? null : (focusLine === l.id ? null : l.id))}
              style={{ flexShrink:0, display:'flex', alignItems:'center', gap:4,
                padding:'4px 10px', borderRadius:20, border:'none', cursor:'pointer',
                fontSize:11, fontWeight:700, fontFamily:FF,
                background: active ? (l ? l.color : 'rgba(255,255,255,0.18)') : 'rgba(255,255,255,0.06)',
                color: active ? '#fff' : 'rgba(255,255,255,0.45)' }}>
              {l && (
                <div style={{ width:6, height:6, borderRadius:3,
                  background: active ? 'rgba(255,255,255,0.9)' : l.color }} />
              )}
              {l ? l.name : '전체'}
            </button>
          );
        })}
      </div>

      {/* SVG 캔버스 */}
      <div ref={containerRef}
        style={{ flex:1, overflow:'hidden', cursor:'grab', position:'relative' }}
        onMouseDown={onPointerDown} onMouseMove={onPointerMove}
        onMouseUp={onPointerUp} onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown} onTouchMove={onPointerMove} onTouchEnd={onPointerUp}>

        <svg width="840" height="660" viewBox="0 0 840 660"
          style={{ transform:`translate(${transform.x}px,${transform.y}px) scale(${transform.scale})`,
            transformOrigin:'0 0', display:'block', overflow:'visible' }}>

          {/* 노선 경로 */}
          {visibleLines.map(line =>
            line.paths.map((pts, pi) => (
              <polyline key={`${line.id}-${pi}`}
                points={pts.map(p => p.join(',')).join(' ')}
                fill="none" stroke={line.color} strokeWidth={line.w}
                strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            ))
          )}

          {/* 역 도트 + 레이블 */}
          {visibleLines.map(line =>
            line.stations.map(s => {
              const pos = ST[s.k];
              if (!pos) return null;
              const isTransfer = s.t;
              const allLines   = SVG_LINES.filter(l => l.stations.some(x => x.n === s.n));
              return (
                <g key={`${line.id}-${s.n}`} style={{ cursor:'pointer' }}
                  onClick={() => handleStation(s.n, pos[0], pos[1])}>
                  {isTransfer ? (
                    <>
                      <circle cx={pos[0]} cy={pos[1]} r={8} fill="#fff" stroke="none" />
                      {allLines.slice(0,3).map((al, ai) => (
                        <circle key={ai} cx={pos[0]} cy={pos[1]} r={8 + ai * 2.5}
                          fill="none" stroke={al.color} strokeWidth={2.5} opacity={0.8} />
                      ))}
                    </>
                  ) : (
                    <circle cx={pos[0]} cy={pos[1]} r={5}
                      fill={line.color} stroke="#0E0F14" strokeWidth={2} />
                  )}
                  <text x={pos[0]} y={pos[1] + (isTransfer ? 22 : 18)}
                    textAnchor="middle"
                    fontSize={isTransfer ? 9 : 8}
                    fontWeight={isTransfer ? 700 : 400}
                    fill={isTransfer ? '#fff' : 'rgba(255,255,255,0.55)'}
                    style={{ pointerEvents:'none' }}>
                    {s.n}
                  </text>
                </g>
              );
            })
          )}
        </svg>

        {/* 역 클릭 툴팁 */}
        {tooltip && (
          <div style={{
            position:'absolute',
            left: Math.min(tooltip.cx * transform.scale + transform.x + 12, 240),
            top:  tooltip.cy * transform.scale + transform.y - 10,
            background:C.card,
            border:`1px solid ${C.borderMd}`,
            borderRadius:12, padding:'10px 14px', zIndex:10,
            pointerEvents:'none', minWidth:130,
            boxShadow:'0 8px 24px rgba(0,0,0,0.5)' }}>
            <div style={{ fontSize:13, fontWeight:800, color:C.white,
              fontFamily:FF, marginBottom:6 }}>{tooltip.name}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {tooltip.lines.map(ln => {
                const l = SVG_LINES.find(x => x.name === ln);
                return (
                  <div key={ln} style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ width:8, height:8, borderRadius:4,
                      background: l?.color ?? '#aaa' }} />
                    <span style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>{ln}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 범례 */}
      <div style={{ display:'flex', alignItems:'center', gap:14,
        padding:'8px 18px', paddingBottom:'calc(8px + env(safe-area-inset-bottom,0px))',
        borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ width:10, height:10, borderRadius:5,
            background:'rgba(255,255,255,0.15)', border:'2px solid rgba(255,255,255,0.5)' }} />
          <span style={{ fontSize:10, color:C.g[80], fontFamily:FF }}>일반역</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          <div style={{ width:14, height:14, borderRadius:7, background:'#fff',
            border:'2.5px solid rgba(96,177,87,0.8)' }} />
          <span style={{ fontSize:10, color:C.g[80], fontFamily:FF }}>환승역 (탭 시 노선 확인)</span>
        </div>
        <span style={{ fontSize:10, color:C.g[80], marginLeft:'auto', fontFamily:FF }}>
          드래그·핀치로 탐색
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   지하철 화면 (무신사 카테고리 + 다크)
   ═══════════════════════════════════════════════════════ */
function SubwayScreen() {
  const [selected,      setSelected]      = useState(null);
  const [showSubwayMap, setShowSubwayMap] = useState(false);

  const LINE_STATUS = {
    normal:  { label:'정상운행', color:C.keyColor },
    delay:   { label:'지연중',   color:'#F59E0B'  },
    crowded: { label:'매우혼잡', color:C.red      },
  };

  const QUICK_ACTIONS = [
    { label:'노선도'   },
    { label:'시간표'   },
    { label:'첫·막차' },
    { label:'경로검색' },
    { label:'혼잡도'  },
    { label:'유실물'  },
    { label:'민원'    },
    { label:'외국어'  },
  ];

  const TIPS = [
    { title:'빠른 하차 위치',  sub:'강남역 2호선 외선' },
    { title:'혼잡 피하는 시간', sub:'출퇴근 골든타임'  },
    { title:'환승 최단 경로',  sub:'왕십리 2↔5호선'   },
    { title:'냉방 강한 칸',    sub:'여름철 쾌적 위치' },
  ];

  /* ── 노선도 오버레이 ────────────────────────────────────────── */
  if (showSubwayMap) {
    return <SubwayMapOverlay onClose={() => setShowSubwayMap(false)} />;
  }

  /* ── 노선 상세 뷰 ─────────────────────────────────────────── */
  if (selected) {
    const line     = SUBWAY_LINES_DATA.find(l => l.id === selected);
    const st       = LINE_STATUS[line.status];
    const relPosts = COMMUNITY_POSTS.filter(p => p.subwayLineId === selected);
    const CAT_MAP  = { ISSUE:'이슈', FREE:'자유', INSIGHT:'정보' };

    return (
      <div style={{ flex:1, overflowY:'auto', paddingBottom:68, background:C.bg }}>
        {/* 헤더 */}
        <div style={{ background:C.stickyBg, borderBottom:`1px solid ${C.border}`,
          paddingTop:'env(safe-area-inset-top,44px)', position:'sticky', top:0, zIndex:100 }}>
          <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
            <span onClick={() => setSelected(null)}
              style={{ fontSize:20, cursor:'pointer', color:C.g[50], lineHeight:1 }}>←</span>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:14, background:line.color, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', fontSize:13, fontWeight:900 }}>
                {line.short}
              </div>
              <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>
                {line.name}
              </span>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:5 }}>
              <div style={{ width:7, height:7, borderRadius:4, background:st.color }} />
              <span style={{ fontSize:11, color:st.color, fontWeight:700, fontFamily:FF }}>
                {st.label}
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding:'16px' }}>
          {/* 기능 버튼 4열 */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8, marginBottom:20 }}>
            {['시간표','노선도','혼잡도','편의시설'].map(btn => {
              const isMap = btn === '노선도';
              return (
                <div key={btn}
                  onClick={isMap ? () => setShowSubwayMap(true) : undefined}
                  style={{ padding:'10px 0', borderRadius:10, textAlign:'center', cursor:'pointer',
                    background: isMap ? `${C.primary}12` : C.card,
                    border:`1px solid ${isMap ? `${C.primary}40` : C.border}` }}>
                  <span style={{ fontSize:11, fontFamily:FF, fontWeight:600,
                    color: isMap ? C.primary : C.g[60] }}>
                    {btn}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 주요 역 chips */}
          <SecHead title="주요 역" />
          <div style={{ display:'flex', gap:6, overflowX:'auto', scrollbarWidth:'none', marginBottom:20, paddingBottom:4 }}>
            {line.stations.map(stn => (
              <div key={stn}
                style={{ flexShrink:0, padding:'6px 14px', background:C.card,
                  border:`1px solid ${line.color}44`, borderRadius:20, cursor:'pointer' }}>
                <span style={{ fontSize:12, fontWeight:600, color:C.white, fontFamily:FF }}>{stn}</span>
              </div>
            ))}
          </div>

          {/* 이 노선 커뮤니티 글 */}
          <SecHead title="이 노선 최신 글" action="전체 ›" />
          {relPosts.length > 0 ? relPosts.slice(0,3).map((p, i) => (
            <div key={p.id}
              style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'12px 0',
                borderBottom: i < Math.min(relPosts.length,3)-1 ? `1px solid ${C.border}` : 'none',
                cursor:'pointer' }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', gap:5, marginBottom:5, flexWrap:'wrap' }}>
                  <Tag t={CAT_MAP[p.category] ?? p.category}
                    bg='rgba(255,255,255,0.07)' col={C.g[60]} fw={600} />
                  <Tag t={p.station} bg={`${line.color}18`} col={line.color} fw={700} />
                  {p.urgent && <Tag t="긴급" bg={C.red} col='#fff' fw={800} />}
                </div>
                <div style={{ fontSize:13, color:C.white, fontFamily:FF, lineHeight:1.4, marginBottom:4 }}>
                  {p.title}
                </div>
                <div style={{ fontSize:11, color:C.g[70] }}>
                  {p.writer} · {p.createdAt} · 댓글 {p.commentCnt} · 공감 {p.likes}
                </div>
              </div>
            </div>
          )) : (
            <div style={{ padding:'28px 0', textAlign:'center' }}>
              <span style={{ fontSize:13, color:C.g[70] }}>등록된 글이 없습니다</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── 노선 목록 메인 뷰 ───────────────────────────────────────── */
  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:68, background:C.bg }}>

      {/* 스티키 헤더 + 검색바 */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg,
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px' }}>
            <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>지하철</span>
            <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
              <span onClick={() => setShowSubwayMap(true)}
                style={{ fontSize:12, color:C.primary, cursor:'pointer', fontFamily:FF, fontWeight:700 }}>노선도</span>
              <span style={{ fontSize:12, color:C.g[60], cursor:'pointer', fontFamily:FF, fontWeight:600 }}>검색</span>
            </div>
          </div>
        </div>
        {/* 검색바 */}
        <div style={{ margin:'0 16px 12px', height:40, background:C.glass2,
          borderRadius:20, display:'flex', alignItems:'center', padding:'0 14px', gap:8,
          border:`1px solid ${C.border}`, cursor:'text' }}>
          <span style={{ fontSize:13, color:C.g[80], fontFamily:FF }}>역 이름, 호선으로 검색</span>
        </div>
      </div>

      {/* 빠른 접근 아이콘 가로 스크롤 */}
      <div style={{ padding:'16px 0 4px' }}>
        <div style={{ display:'flex', gap:10, padding:'0 16px', overflowX:'auto', scrollbarWidth:'none' }}>
          {QUICK_ACTIONS.map(({ label }) => {
            const isMap = label === '노선도';
            return (
              <div key={label}
                onClick={isMap ? () => setShowSubwayMap(true) : undefined}
                style={{ flexShrink:0, display:'flex', flexDirection:'column',
                  alignItems:'center', gap:6, cursor:'pointer' }}>
                <div style={{ width:54, height:54, borderRadius:12,
                  background: isMap ? `${C.primary}14` : C.card,
                  border:`1px solid ${isMap ? `${C.primary}40` : C.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:10, fontWeight:700,
                    color: isMap ? C.primary : C.g[60], fontFamily:FF }}>
                    {label}
                  </span>
                </div>
                <span style={{ fontSize:11, fontFamily:FF, fontWeight:600,
                  color: isMap ? C.primary : C.g[60] }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Div8 h={16} />

      {/* 실시간 노선 현황 */}
      <div style={{ padding:'0 16px' }}>
        <SecHead title="실시간 노선 현황" />
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {SUBWAY_LINES_DATA.map(line => {
            const st = LINE_STATUS[line.status];
            return (
              <div key={line.id} onClick={() => setSelected(line.id)}
                style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 14px',
                  background:C.card, borderRadius:12,
                  border:`1px solid ${line.status === 'delay' ? '#F59E0B33' : line.status === 'crowded' ? `${C.red}33` : C.border}`,
                  cursor:'pointer' }}>
                {/* 호선 뱃지 */}
                <div style={{ width:38, height:38, borderRadius:19, background:line.color, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#fff', fontSize:14, fontWeight:900 }}>
                  {line.short}
                </div>
                {/* 노선명 + 주요역 */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF, marginBottom:3 }}>
                    {line.name}
                  </div>
                  <div style={{ fontSize:10, color:C.g[70],
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {line.stations.slice(0,6).join(' · ')}…
                  </div>
                </div>
                {/* 운행현황 */}
                <div style={{ display:'flex', alignItems:'center', gap:5, flexShrink:0 }}>
                  <div style={{ width:6, height:6, borderRadius:3, background:st.color }} />
                  <span style={{ fontSize:11, color:st.color, fontWeight:700, fontFamily:FF }}>
                    {st.label}
                  </span>
                </div>
                <span style={{ fontSize:14, color:C.g[70] }}>›</span>
              </div>
            );
          })}
        </div>
      </div>

      <Div8 h={16} />

      {/* 지하철 꿀정보 */}
      <div style={{ padding:'0 16px' }}>
        <SecHead title="지하철 꿀정보" action="더보기 ›" />
        <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none' }}>
          {TIPS.map(tip => (
            <DCard key={tip.title}
              style={{ flexShrink:0, width:136, padding:'14px 12px', cursor:'pointer' }}>
              <div style={{ fontSize:12, fontWeight:800, color:C.white, fontFamily:FF,
                marginTop:8, marginBottom:3, lineHeight:1.3 }}>
                {tip.title}
              </div>
              <div style={{ fontSize:10, color:C.g[70] }}>{tip.sub}</div>
            </DCard>
          ))}
        </div>
      </div>

      <Div8 h={24} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   커뮤니티 화면 — 3단계 필터 시스템 (카테고리 → 호선 → 역)
   ═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   커뮤니티 게시글 상세 화면 — 무신사 스타일
   ═══════════════════════════════════════════════════════ */
const POST_BODY_MAP = {
  1:  '오늘 아침 8시 20분쯤 강남역 2호선 외선 승강장이 엄청났어요. 열차 2대 그냥 보내고 겨우 탔는데 몸이 완전 끼어서 가방도 못 들었어요. 출퇴근 시간대만이라도 증차 좀 해줬으면 합니다. 안전요원 분들도 몇 분 계셨는데 역부족이더라고요.',
  2:  '선릉역 1번 출구 나오면 바로 있는 돈까스 가게 강추합니다. 런치 특선 8,500원에 밥이랑 국까지 나오고 줄이 좀 있어도 회전 빠른 편이에요. 아 그리고 4번 출구 쪽 샐러드 가게도 요즘 사람 많더라고요.',
  3:  '5호선 여의도역 방면 오늘 또 연착이었어요. 신호 문제인지 맨날 이 구간에서 지연이 발생하네요. 제가 지난 2주 동안 세어봤는데 6번 연착됐어요. 서울메트로 앱 공지는 항상 늦게 올라오고... 개선이 필요합니다.',
  4:  '강남역 환기 시스템 교체가 완료됐다는 공지 봤는데 실제로 체감하시나요? 개인적으로는 아직 잘 모르겠어요. 예전에 비해 덜 퀴퀴한 것 같기도 하고... 출퇴근 시간대보다 한산할 때 타보면 좀 다른 것 같기도 합니다.',
  5:  '판교역 스타벅스가 아침마다 20분씩 줄을 서야 해요. 앱 주문도 픽업대가 꽉 차서 늦게 나오더라고요. 판교 IT기업 출근 시간이랑 완전 겹치는 게 문제인 것 같아요. 근처 투썸이나 폴바셋 가시는 분들은 어떠세요?',
  6:  '교대역 에스컬레이터 5일째 고장인데 아직도 안 고쳐지고 있어요. 민원 접수했더니 "처리 중"이라는 답변만 왔는데 언제 고쳐지는 건지... 무릎 안 좋은 분들은 정말 힘드실 것 같아요. 같이 민원 넣으면 빨라질 것 같은데 참고해주세요.',
  7:  '2호선 성수행 열차 기준 빠른 하차 위치 정리해봤습니다. 강남역에서 탈 경우 3-4번 문 쪽이 환승 계단과 가장 가까워요. 선릉에서 내릴 분은 앞쪽 1-2번 문, 왕십리는 뒤쪽 8번 문 근처가 편합니다. 자주 타시는 구간 댓글로 남겨주시면 추가할게요.',
  8:  '홍대입구역 2번 출구 나오자마자 오른쪽에 새로 편의점 생겼어요. GS25인데 아직 오픈 초반이라 그런지 계산대가 좀 느린 편이에요. 출근 시간에는 줄이 길 수 있으니 참고하세요. 위치는 이전 스크린골프 자리 있던 곳이에요.',
  9:  '1호선 청량리 방면 오늘 30분 지연 공지 올라왔어요. 서울역 근처 선로 점검 때문이라고 하는데 이미 많은 분들이 플랫폼에 대기 중이에요. 대체 교통 고려하시는 분들은 지하철보다 버스가 빠를 수 있어요.',
  10: '신분당선 강남역 4번 출구 앞 공사가 끝나는 게 언제쯤일지 아시는 분 계신가요? 작년부터 계속 하는 것 같던데 관할 구청에 문의해봤는데 확실한 답변을 못 받았어요. 매일 그 쪽으로 출근하는데 우회로가 너무 불편하네요.',
  11: '이촌역 열차 이격이 심해서 플랫폼 갭 사이로 발이 빠질 뻔했어요. 특히 노인분이나 어린이 동반 가족은 정말 위험해 보이더라고요. 서울시 안전 민원 채널로 공식 접수했습니다. 같은 경험 있으신 분들도 함께 민원 넣어주세요.',
  12: '왕십리역 2호선↔5호선 환승 경로 업데이트예요. 기존 안내 표지 따라가면 돌아가는 경우가 있는데, 2호선에서 내릴 때 맨 앞 칸 탑승 후 계단 올라가서 바로 우회전하면 5호선 플랫폼까지 2분이면 가요. 구체적인 위치 더 궁금하신 분은 댓글로.',
};

const POST_COMMENTS_MAP = {
  1: [
    { id:1, nick:'통근마스터', avatar:'통', time:'5분 전',  text:'맞아요 저도 오늘 그 시간대 탔는데 진짜 심각했어요. 무조건 한 대 보내야 탈 수 있더라고요.', likes:12, replies:[
      { id:11, nick:'강남러버', avatar:'강', time:'3분 전', text:'다음 열차도 똑같이 꽉 차서 그냥 지각 감수했어요 ㅠ', likes:4 },
    ]},
    { id:2, nick:'지하철덕후', avatar:'지', time:'10분 전', text:'증차 청원 링크 있으면 공유해주세요. 같이 서명할게요.', likes:8, replies:[] },
    { id:3, nick:'출퇴근러',   avatar:'출', time:'22분 전', text:'안전요원분들도 사실 어떻게 할 수가 없는 상황이에요. 구조적 문제죠.', likes:5, replies:[] },
  ],
  2: [
    { id:1, nick:'점심고민러', avatar:'점', time:'8분 전',  text:'저도 거기 자주 가요! 런치 특선 진짜 가성비 좋죠. 된장찌개 런치도 맛있어요.', likes:7, replies:[] },
    { id:2, nick:'선릉직장인', avatar:'선', time:'20분 전', text:'4번 출구 샐러드는 웨이팅 장난 아닌데 맛은 진짜예요.', likes:5, replies:[] },
  ],
  default: [
    { id:1, nick:'지하철덕후', avatar:'지', time:'15분 전', text:'좋은 정보 감사해요! 저도 같은 생각이었어요.', likes:6, replies:[] },
    { id:2, nick:'통근마스터', avatar:'통', time:'32분 전', text:'공감합니다. 많은 분들이 알았으면 좋겠네요.', likes:4, replies:[] },
  ],
};

/* ═══════════════════════════════════════════════════════
   유저 프로필 데이터 맵
   ═══════════════════════════════════════════════════════ */
const USER_DATA = {
  '강남러버':   { lineId:'2',   station:'강남역',    bio:'강남역 출퇴근 5년차. 지하철 혼잡 개선을 원합니다.',      posts:47,  followers:312, following:89  },
  '통근마스터': { lineId:'2',   station:'선릉역',    bio:'지하철 최단경로 덕후. 매일 구간별 팁 업데이트 중.',      posts:134, followers:891, following:45  },
  '지하철덕후': { lineId:'2',   station:'왕십리역',  bio:'서울 지하철 전 노선 완주. 스탬프 투어 진행 중.',         posts:88,  followers:547, following:201 },
  '점심고민러': { lineId:'2',   station:'선릉역',    bio:'선릉 주변 점심 맛집 탐방기 연재 중. 먹는 게 낙.',        posts:29,  followers:143, following:72  },
  '직장인A':    { lineId:'5',   station:'여의도역',  bio:'5호선 여의도 라인. 매일 출근합니다.',                    posts:12,  followers:38,  following:29  },
  '판교개발자': { lineId:'sin', station:'판교역',    bio:'신분당선 판교-강남 왕복 5년차. IT 종사자.',              posts:63,  followers:274, following:130 },
  '불편한시민': { lineId:'3',   station:'교대역',    bio:'지하철 시설 개선 민원인. 작은 불편도 그냥 넘기지 않음.', posts:31,  followers:198, following:55  },
  '여의도man':  { lineId:'5',   station:'여의도역',  bio:'여의도 직장인. 퇴근길 노을 사진 올리는 사람.',           posts:22,  followers:189, following:94  },
  '홍대러버':   { lineId:'2',   station:'홍대입구역',bio:'홍대 문화 탐방 좋아하는 2호선 사람.',                    posts:18,  followers:97,  following:143 },
  '출퇴근러':   { lineId:'2',   station:'강남역',    bio:'강남 출퇴근 중. 지하철 안에서 책 읽는 사람.',            posts:9,   followers:41,  following:38  },
  '안전제일':   { lineId:'4',   station:'이촌역',    bio:'지하철 안전 모니터링 자원봉사자.',                       posts:24,  followers:156, following:62  },
  '환승달인':   { lineId:'2',   station:'왕십리역',  bio:'환승 최단경로 연구자. 왕십리 2호선↔5호선 전문.',         posts:41,  followers:320, following:88  },
  '청량리인':   { lineId:'1',   station:'청량리역',  bio:'1호선 청량리 라인. 매일 지각 위기.',                     posts:7,   followers:29,  following:24  },
  '강남출근':   { lineId:'sin', station:'강남역',    bio:'신분당선 강남역 이용자. 공사 언제 끝나는지 궁금함.',      posts:5,   followers:18,  following:31  },
};

/* ═══════════════════════════════════════════════════════
   유저 프로필 화면 — 무신사 스타일
   ═══════════════════════════════════════════════════════ */
function UserProfileScreen({ nick, onBack }) {
  const [followed,  setFollowed]  = useState(false);
  const [tab,       setTab]       = useState('게시글');

  const data     = USER_DATA[nick] ?? { lineId:'2', station:'강남역', bio:'아하철 유저입니다.', posts:0, followers:0, following:0 };
  const lineData = SUBWAY_LINES_DATA.find(l => l.id === data.lineId);
  const lc       = lineData?.color ?? C.primary;
  const userPosts = COMMUNITY_POSTS.filter(p => p.writer === nick);
  const CAT_LABEL = { ISSUE:'이슈', FREE:'자유', INSIGHT:'정보' };

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80, background:C.bg }}>

      {/* ── 헤더 ────────────────────────── */}
      <div style={{ position:'sticky', top:0, zIndex:100,
        background:'rgba(14,15,20,0.97)', backdropFilter:'blur(12px)',
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center',
            gap:12, padding:'0 16px' }}>
            <button onClick={onBack}
              style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:10,
                width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', fontSize:16, color:C.white, flexShrink:0 }}>←</button>
            <span style={{ fontSize:15, fontWeight:800, color:C.white,
              fontFamily:FF, flex:1 }}>{nick}</span>
          </div>
        </div>
      </div>

      {/* ── 프로필 영역 ─────────────────── */}
      <div style={{ padding:'24px 20px 20px',
        borderBottom:`1px solid ${C.border}` }}>

        {/* 아바타 + 팔로우 버튼 */}
        <div style={{ display:'flex', alignItems:'flex-start',
          justifyContent:'space-between', marginBottom:16 }}>
          {/* 아바타 */}
          <div style={{ width:72, height:72, borderRadius:36,
            background:`${lc}22`, border:`2px solid ${lc}55`,
            display:'flex', alignItems:'center', justifyContent:'center',
            flexShrink:0 }}>
            <span style={{ fontSize:26, fontWeight:900, color:lc, fontFamily:FF }}>
              {nick[0]}
            </span>
          </div>

          {/* 팔로우 버튼 */}
          <button onClick={() => setFollowed(v => !v)}
            style={{ border:'none', borderRadius:8, cursor:'pointer',
              padding:'9px 22px', fontFamily:FF, fontWeight:800, fontSize:13,
              transition:'all 0.15s',
              background: followed ? 'rgba(255,255,255,0.08)' : C.primary,
              color:       followed ? C.g[60]                  : '#0E0F14' }}>
            {followed ? '팔로잉 ✓' : '팔로우'}
          </button>
        </div>

        {/* 닉네임 + 역 배지 */}
        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:6 }}>
          <span style={{ fontSize:17, fontWeight:900, color:C.white,
            fontFamily:FF, letterSpacing:'-0.02em' }}>{nick}</span>
          <div style={{ display:'flex', alignItems:'center', gap:4,
            padding:'2px 8px', borderRadius:4,
            background:`${lc}18`, border:`1px solid ${lc}33` }}>
            <div style={{ width:6, height:6, borderRadius:3, background:lc }} />
            <span style={{ fontSize:10, fontWeight:700, color:lc, fontFamily:FF }}>
              {data.station}
            </span>
          </div>
        </div>

        {/* 바이오 */}
        <p style={{ fontSize:13, color:C.g[60], lineHeight:1.6,
          fontFamily:FF, margin:'0 0 16px' }}>
          {data.bio}
        </p>

        {/* 통계 */}
        <div style={{ display:'flex', gap:0 }}>
          {[
            { label:'게시글', val:data.posts + (userPosts.length > data.posts ? 0 : 0) },
            { label:'팔로워',  val: followed ? data.followers + 1 : data.followers },
            { label:'팔로잉', val:data.following },
          ].map((s, i) => (
            <div key={s.label} style={{ flex:1, textAlign:'center',
              borderRight: i < 2 ? `1px solid ${C.border}` : 'none',
              padding:'4px 0' }}>
              <div style={{ fontSize:17, fontWeight:900, color:C.white,
                fontFamily:FF, letterSpacing:'-0.02em' }}>
                {s.val >= 1000 ? `${(s.val/1000).toFixed(1)}k` : s.val}
              </div>
              <div style={{ fontSize:11, color:C.g[70], marginTop:2, fontFamily:FF }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 탭 ──────────────────────────── */}
      <div style={{ display:'flex', borderBottom:`1px solid ${C.border}` }}>
        {['게시글', '공감한 글'].map(t => (
          <div key={t} onClick={() => setTab(t)}
            style={{ flex:1, textAlign:'center', padding:'11px 0',
              fontSize:13, fontWeight: tab===t ? 800 : 500,
              color: tab===t ? C.white : C.g[70],
              borderBottom: tab===t ? `2px solid ${C.white}` : '2px solid transparent',
              cursor:'pointer', fontFamily:FF }}>
            {t}
          </div>
        ))}
      </div>

      {/* ── 게시글 목록 ─────────────────── */}
      {tab === '게시글' ? (
        userPosts.length > 0 ? (
          <div style={{ padding:'0 16px' }}>
            {userPosts.map((p, i) => {
              const ld = SUBWAY_LINES_DATA.find(l => l.id === p.subwayLineId);
              const pc = ld?.color ?? C.primary;
              return (
                <div key={p.id}
                  style={{ padding:'14px 0',
                    borderBottom: i < userPosts.length-1 ? `1px solid ${C.border}` : 'none',
                    cursor:'pointer' }}>
                  <div style={{ display:'flex', gap:5, marginBottom:7, flexWrap:'wrap' }}>
                    {p.urgent && <Tag t="긴급" bg={C.red} col='#fff' fw={800} />}
                    <Tag t={CAT_LABEL[p.category] ?? p.category}
                      bg='rgba(255,255,255,0.07)' col={C.g[60]} fw={600} />
                    <Tag t={`${p.station}역`} bg={`${pc}15`} col={pc} fw={700} />
                  </div>
                  <div style={{ fontSize:14, fontWeight:600, color:C.white,
                    lineHeight:1.45, fontFamily:FF, marginBottom:6 }}>
                    {p.title}
                  </div>
                  <div style={{ display:'flex', gap:8 }}>
                    <span style={{ fontSize:11, color:C.g[70] }}>{p.createdAt}</span>
                    <span style={{ fontSize:11, color:C.g[70] }}>댓글 {p.commentCnt}</span>
                    <span style={{ fontSize:11, color:C.g[70] }}>공감 {p.likes}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding:'56px 0', textAlign:'center' }}>
            <div style={{ fontSize:13, color:C.g[70], fontFamily:FF }}>
              아직 작성한 게시글이 없어요
            </div>
          </div>
        )
      ) : (
        /* 공감한 글 탭 — 간단히 COMMUNITY_POSTS 상위 2개 */
        <div style={{ padding:'0 16px' }}>
          {COMMUNITY_POSTS.slice(0, 3).map((p, i) => {
            const ld = SUBWAY_LINES_DATA.find(l => l.id === p.subwayLineId);
            const pc = ld?.color ?? C.primary;
            return (
              <div key={p.id}
                style={{ padding:'14px 0',
                  borderBottom: i < 2 ? `1px solid ${C.border}` : 'none',
                  cursor:'pointer' }}>
                <div style={{ display:'flex', gap:5, marginBottom:7 }}>
                  <Tag t={CAT_LABEL[p.category] ?? p.category}
                    bg='rgba(255,255,255,0.07)' col={C.g[60]} fw={600} />
                  <Tag t={`${p.station}역`} bg={`${pc}15`} col={pc} fw={700} />
                </div>
                <div style={{ fontSize:14, fontWeight:600, color:C.white,
                  lineHeight:1.45, fontFamily:FF, marginBottom:6 }}>
                  {p.title}
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <span style={{ fontSize:11, color:C.g[70] }}>{p.writer}</span>
                  <span style={{ fontSize:11, color:C.g[70] }}>공감 {p.likes}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PostDetailScreen({ post, onBack, onUser }) {
  const [liked,       setLiked]       = useState(false);
  const [bookmarked,  setBookmarked]  = useState(false);
  const [sort,        setSort]        = useState('인기순');
  const [openReplies, setOpenReplies] = useState({});
  const [commentText, setCommentText] = useState('');

  const lineData = SUBWAY_LINES_DATA.find(l => l.id === post.subwayLineId);
  const lc       = lineData?.color ?? C.primary;
  const body     = POST_BODY_MAP[post.id] ?? '작성된 본문이 없습니다.';
  const rawComments = POST_COMMENTS_MAP[post.id] ?? POST_COMMENTS_MAP.default;
  const comments = sort === '인기순'
    ? [...rawComments].sort((a, b) => b.likes - a.likes)
    : [...rawComments].sort((a, b) => a.id - b.id);
  const CAT_LABEL = { ISSUE:'이슈', FREE:'자유', INSIGHT:'정보' };

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:140, background:C.bg }}>

      {/* ── 스티키 헤더 ────────────────────────────── */}
      <div style={{ position:'sticky', top:0, zIndex:100,
        background:'rgba(14,15,20,0.97)', backdropFilter:'blur(12px)',
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', gap:12, padding:'0 16px' }}>
            <button onClick={onBack}
              style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:10,
                width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', fontSize:16, color:C.white, flexShrink:0 }}>←</button>
            <span style={{ fontSize:15, fontWeight:800, color:C.white, fontFamily:FF,
              overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>
              {CAT_LABEL[post.category] ?? '게시글'}
            </span>
          </div>
        </div>
      </div>

      {/* ── 게시글 본문 ──────────────────────────────── */}
      <div style={{ padding:'16px 16px 0' }}>
        <div style={{ padding:'0 0 20px', borderBottom:`1px solid ${C.border}` }}>

          {/* 태그 행 */}
          <div style={{ display:'flex', gap:5, marginBottom:10, flexWrap:'wrap' }}>
            {post.urgent && <Tag t="긴급" bg={C.red} col='#fff' fw={800} />}
            <Tag t={CAT_LABEL[post.category] ?? post.category}
              bg={post.urgent ? 'rgba(235,77,61,0.12)' : 'rgba(255,255,255,0.07)'}
              col={post.urgent ? C.red : C.g[60]} fw={600} />
            <Tag t={`${post.station}역`} bg={`${lc}18`} col={lc} fw={700} />
            {lineData && <Tag t={lineData.name} bg={`${lc}12`} col={lc} fw={600} />}
          </div>

          {/* 제목 */}
          <div style={{ fontSize:17, fontWeight:800, color:C.white, lineHeight:1.45,
            fontFamily:FF, letterSpacing:'-0.02em', marginBottom:12 }}>
            {post.title}
          </div>

          {/* 작성자 정보 */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16,
            paddingBottom:14, borderBottom:`1px solid ${C.border}` }}>
            <div onClick={() => onUser?.(post.writer)}
              style={{ width:28, height:28, borderRadius:14, background:`${lc}30`,
                border:`1px solid ${lc}50`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:11, fontWeight:800, color:lc, fontFamily:FF, cursor:'pointer' }}>
              {post.writer[0]}
            </div>
            <div onClick={() => onUser?.(post.writer)} style={{ cursor:'pointer' }}>
              <div style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF }}>
                {post.writer}
              </div>
              <div style={{ fontSize:11, color:C.g[60] }}>{post.createdAt}</div>
            </div>
          </div>

          {/* 본문 */}
          <div style={{ fontSize:14, color:C.g[50], lineHeight:1.7,
            fontFamily:FF, letterSpacing:'-0.01em' }}>
            {body}
          </div>

          {/* 반응 바 */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:18,
            paddingTop:14, borderTop:`1px solid ${C.border}` }}>
            <div onClick={() => setLiked(v => !v)}
              style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 14px',
                borderRadius:8, cursor:'pointer',
                background: liked ? `${C.primary}18` : 'rgba(255,255,255,0.06)',
                border:`1px solid ${liked ? C.primary+'55' : C.border}` }}>
              <span style={{ fontSize:13, color: liked ? C.primary : C.g[70] }}>공감</span>
              <span style={{ fontSize:12, fontWeight:700,
                color: liked ? C.primary : C.g[60] }}>
                {liked ? post.likes + 1 : post.likes}
              </span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:5, padding:'7px 14px',
              borderRadius:8, background:C.glass1, border:`1px solid ${C.border}` }}>
              <span style={{ fontSize:13, color:C.g[70] }}>댓글</span>
              <span style={{ fontSize:12, fontWeight:700, color:C.g[60] }}>{post.commentCnt}</span>
            </div>
            {/* 북마크 버튼 (우측 정렬) */}
            <div onClick={() => setBookmarked(v => !v)}
              style={{ marginLeft:'auto', width:38, height:38,
                display:'flex', alignItems:'center', justifyContent:'center',
                borderRadius:8, cursor:'pointer',
                background: bookmarked ? 'rgba(255,186,0,0.12)' : 'rgba(255,255,255,0.06)',
                border:`1px solid ${bookmarked ? 'rgba(255,186,0,0.4)' : C.border}` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? '#FFBA00' : 'none'}
                stroke={bookmarked ? '#FFBA00' : C.g[60]} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── 댓글 헤더 + 정렬 ───────────────────────── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'20px 16px 10px' }}>
        <span style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF }}>
          댓글 {post.commentCnt}
        </span>
        <div style={{ display:'flex', gap:6 }}>
          {['인기순','최신순'].map(s => (
            <div key={s} onClick={() => setSort(s)}
              style={{ padding:'5px 12px', borderRadius:14, cursor:'pointer',
                background: sort===s ? C.white : 'rgba(255,255,255,0.06)',
                border:`1px solid ${sort===s ? C.white : C.border}` }}>
              <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                color: sort===s ? '#0E0F14' : C.g[70] }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 댓글 목록 ──────────────────────────────── */}
      <div style={{ padding:'0 16px' }}>
        {comments.map((c, idx) => (
          <div key={c.id}
            style={{ paddingBottom:16, marginBottom:16,
              borderBottom: idx < comments.length-1 ? `1px solid ${C.border}` : 'none' }}>
            {/* 댓글 헤더 */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
              <div onClick={() => onUser?.(c.nick)}
                style={{ width:28, height:28, borderRadius:14,
                  background:'rgba(255,255,255,0.08)', border:`1px solid ${C.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:11, fontWeight:800, color:C.g[80], fontFamily:FF, cursor:'pointer' }}>
                {c.avatar}
              </div>
              <div onClick={() => onUser?.(c.nick)} style={{ cursor:'pointer' }}>
                <span style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF }}>
                  {c.nick}
                </span>
                <span style={{ fontSize:11, color:C.g[60], marginLeft:6 }}>{c.time}</span>
              </div>
            </div>
            {/* 댓글 본문 */}
            <div style={{ fontSize:13, color:C.g[50], lineHeight:1.6,
              fontFamily:FF, marginLeft:36 }}>
              {c.text}
            </div>
            {/* 공감 + 답글 토글 */}
            <div style={{ display:'flex', gap:12, marginTop:8, marginLeft:36 }}>
              <span style={{ fontSize:11, color:C.g[60], cursor:'pointer' }}>
                공감 {c.likes}
              </span>
              {c.replies?.length > 0 && (
                <span onClick={() => setOpenReplies(p => ({ ...p, [c.id]: !p[c.id] }))}
                  style={{ fontSize:11, color:C.primary, cursor:'pointer', fontWeight:700 }}>
                  답글 {c.replies.length}개 {openReplies[c.id] ? '▲' : '▼'}
                </span>
              )}
              <span style={{ fontSize:11, color:C.g[60], cursor:'pointer' }}>답글 달기</span>
            </div>
            {/* 대댓글 */}
            {openReplies[c.id] && c.replies?.map(r => (
              <div key={r.id}
                style={{ marginTop:10, marginLeft:36, paddingLeft:14,
                  borderLeft:`2px solid ${C.border}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:5 }}>
                  <div onClick={() => onUser?.(r.nick)}
                    style={{ width:22, height:22, borderRadius:11,
                      background:C.glass1, border:`1px solid ${C.border}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:9, fontWeight:800, color:C.g[70], fontFamily:FF, cursor:'pointer' }}>
                    {r.avatar}
                  </div>
                  <span onClick={() => onUser?.(r.nick)}
                    style={{ fontSize:11, fontWeight:700, color:C.g[50], fontFamily:FF, cursor:'pointer' }}>
                    {r.nick}
                  </span>
                  <span style={{ fontSize:10, color:C.g[70] }}>{r.time}</span>
                </div>
                <div style={{ fontSize:12, color:C.g[60], lineHeight:1.55, fontFamily:FF }}>
                  {r.text}
                </div>
                <span style={{ fontSize:10, color:C.g[70], marginTop:4, display:'block' }}>
                  공감 {r.likes}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ── 댓글 입력창 (네브바 위 고정) ──────────── */}
      <div style={{ position:'fixed', bottom:'calc(56px + env(safe-area-inset-bottom, 0px))',
        left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:390, background:'rgba(14,15,20,0.97)',
        borderTop:`1px solid ${C.border}`,
        padding:'10px 16px 12px', display:'flex', gap:8, zIndex:200 }}>
        <input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="댓글을 입력하세요"
          style={{ flex:1, background:C.glass2,
            border:`1px solid ${C.border}`, borderRadius:8,
            padding:'10px 14px', fontSize:13, color:C.white,
            outline:'none', fontFamily:FF }} />
        <button
          style={{ background: commentText ? C.primary : 'rgba(255,255,255,0.08)',
            border:'none', borderRadius:8,
            width:42, height:42, display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', fontSize:16, flexShrink:0,
            color: commentText ? '#fff' : C.g[60],
            transition:'background 0.15s' }}>↑</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   게시글 작성 화면 — PostWriteScreen
   ═══════════════════════════════════════════════════════ */
function PostWriteScreen({ onBack, onPublish }) {
  /* ── 상태 ── */
  const [writeTitle,    setWriteTitle]    = React.useState('');
  const [writeBody,     setWriteBody]     = React.useState('');
  const [writeLine,     setWriteLine]     = React.useState('2');
  const [writeStation,  setWriteStation]  = React.useState('강남역');
  const [writeTag,      setWriteTag]      = React.useState('자유');
  const [showLineSheet, setShowLineSheet] = React.useState(false);
  const [images,        setImages]        = React.useState([]);      /* 첨부 이미지 목록 */
  const [showPoll,      setShowPoll]      = React.useState(false);   /* 투표 블록 */
  const [pollQ,         setPollQ]         = React.useState('');
  const [pollOpts,      setPollOpts]      = React.useState(['','']);
  const [stationQuery,  setStationQuery]  = React.useState('강남역');
  const [stSuggests,    setStSuggests]    = React.useState([]);
  const [showSubmitAnim,setShowSubmitAnim]= React.useState(false);

  /* ── 상수 ── */
  const TAG_OPTIONS  = ['자유','정보','이슈','질문','꿀팁','분실물','민원'];
  const TAG_COLORS   = {
    '자유':'#A78BFA','정보':'#00BAF6','이슈':'#EF4444',
    '질문':'#F59E0B','꿀팁':'#34D399','분실물':'#F472B6','민원':'#FB923C',
  };
  /* 전체 호선 목록 (SUBWAY_LINES_DATA 기반) */
  const LINE_OPTIONS = SUBWAY_LINES_DATA.map(l => ({
    id: l.id, label: l.name, color: l.color,
  }));
  /* 역 자동완성용 전체 역 목록 */
  const ALL_STATIONS = React.useMemo(() =>
    SUBWAY_LINES_DATA.flatMap(l =>
      l.stations.map(s => ({ name: s+'역', lineId: l.id, color: l.color, lineName: l.name }))
    ), []);

  /* ── 파생값 ── */
  const curLine   = LINE_OPTIONS.find(l => l.id === writeLine) ?? LINE_OPTIONS[0];
  const canSubmit = writeTitle.trim().length >= 2 && writeBody.trim().length >= 5;

  /* ── 역 자동완성 ── */
  const handleStInput = (v) => {
    setStationQuery(v);
    setWriteStation(v);
    if (v.length < 1) { setStSuggests([]); return; }
    const kw = v.replace(/역$/, '');
    setStSuggests(
      ALL_STATIONS.filter(s => s.name.includes(kw)).slice(0, 5)
    );
  };

  /* ── 이미지 더미 추가 (실제 업로드 대신 그라디언트 플레이스홀더) ── */
  const MOCK_THUMBS = [
    'linear-gradient(135deg,#1a1a2e,#16213e)',
    'linear-gradient(135deg,#0f3460,#533483)',
    'linear-gradient(135deg,#2d6a4f,#40916c)',
    'linear-gradient(135deg,#7b2d8b,#c77dff)',
    'linear-gradient(135deg,#d62828,#f77f00)',
  ];
  const addImage = () => {
    if (images.length >= 4) return;
    setImages(prev => [...prev, { id: Date.now(), bg: MOCK_THUMBS[prev.length % MOCK_THUMBS.length] }]);
  };
  const removeImage = (id) => setImages(prev => prev.filter(img => img.id !== id));

  /* ── 투표 옵션 관리 ── */
  const updatePollOpt = (i, v) => {
    const next = [...pollOpts]; next[i] = v; setPollOpts(next);
  };
  const addPollOpt = () => { if (pollOpts.length < 4) setPollOpts([...pollOpts,'']); };

  /* ── 게시 ── */
  const handlePublish = () => {
    if (!canSubmit) return;
    setShowSubmitAnim(true);
    setTimeout(() => {
      const newPost = {
        id:       Date.now(),
        title:    writeTitle.trim(),
        body:     writeBody.trim(),
        lineId:   writeLine,
        tag:      writeTag,
        tagColor: TAG_COLORS[writeTag] ?? C.primary,
        writer:   '이효범',
        time:     '방금',
        likes:    0,
        comments: 0,
        station:  writeStation,
        images:   images,
        poll:     showPoll ? { q: pollQ, opts: pollOpts.filter(Boolean), votes: [] } : null,
        thumb:    `linear-gradient(145deg,${curLine.color}44,${curLine.color}11)`,
      };
      onPublish(newPost);
    }, 1200);
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh',
      background:C.bg, overflow:'hidden', position:'relative' }}>

      {/* ── 게시 완료 오버레이 애니메이션 ── */}
      {showSubmitAnim && (
        <div style={{ position:'absolute', inset:0, zIndex:999, display:'flex',
          flexDirection:'column', alignItems:'center', justifyContent:'center',
          background: C.bg }}>
          <div style={{ width:80, height:80, borderRadius:40, background:`${C.keyColor}22`,
            display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16,
            border:`3px solid ${C.keyColor}` }}>
            <span style={{ fontSize:36 }}>✍️</span>
          </div>
          <div style={{ fontSize:20, fontWeight:900, color:C.white, fontFamily:FF, marginBottom:8 }}>게시 중...</div>
          <div style={{ fontSize:13, color:C.g[60], fontFamily:FF }}>커뮤니티에 공유하고 있어요</div>
          <div style={{ marginTop:24, width:120, height:4, borderRadius:2, background:C.border, overflow:'hidden' }}>
            <div style={{ height:'100%', background:C.keyColor, borderRadius:2,
              animation:'progBar 1.1s ease forwards' }} />
          </div>
          <style>{`@keyframes progBar { from{width:0} to{width:100%} }`}</style>
        </div>
      )}

      {/* ── 헤더 ── */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:'flex', alignItems:'center', height:52, padding:'0 12px' }}>
          <button onClick={onBack}
            style={{ padding:'6px 10px', background:'none', border:'none',
              cursor:'pointer', fontSize:14, color:C.g[60], fontFamily:FF }}>
            취소
          </button>
          <span style={{ flex:1, textAlign:'center', fontSize:16, fontWeight:800,
            color:C.white, fontFamily:FF }}>글쓰기</span>
          <button onClick={handlePublish} disabled={!canSubmit}
            style={{ padding:'6px 14px',
              background: canSubmit ? C.primary : C.glass2,
              border:'none', borderRadius:20,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              fontSize:13, fontWeight:800, color: canSubmit ? '#fff' : C.g[70], fontFamily:FF,
              transition:'all 0.2s' }}>
            게시
          </button>
        </div>
      </div>

      {/* ── 메타 칩 행 (호선 / 역 / 태그) ── */}
      <div style={{ flexShrink:0, borderBottom:`1px solid ${C.border}`,
        padding:'10px 14px', background:C.stickyBg }}>

        {/* 호선 + 역 */}
        <div style={{ display:'flex', gap:8, marginBottom:8, alignItems:'center' }}>
          {/* 호선 칩 */}
          <div onClick={() => setShowLineSheet(true)}
            style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 12px',
              background:`${curLine.color}1A`, border:`1.5px solid ${curLine.color}55`,
              borderRadius:20, cursor:'pointer', flexShrink:0 }}>
            <div style={{ width:12, height:12, borderRadius:6, background:curLine.color }} />
            <span style={{ fontSize:12, fontWeight:700, color:curLine.color, fontFamily:FF }}>
              {curLine.label}
            </span>
            <span style={{ fontSize:10, color:curLine.color, opacity:0.7 }}>▾</span>
          </div>

          {/* 역 자동완성 입력 */}
          <div style={{ position:'relative', flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:4, padding:'6px 12px',
              background:C.card, border:`1px solid ${C.border}`, borderRadius:20 }}>
              <span style={{ fontSize:11 }}>📍</span>
              <input
                value={stationQuery}
                onChange={e => handleStInput(e.target.value)}
                placeholder="역 이름"
                style={{ background:'none', border:'none', outline:'none',
                  fontSize:12, fontWeight:600, color:C.white, fontFamily:FF, flex:1 }}
              />
            </div>
            {/* 자동완성 드롭다운 */}
            {stSuggests.length > 0 && (
              <div style={{ position:'absolute', top:'calc(100% + 4px)', left:0, right:0,
                background:C.card, border:`1px solid ${C.border}`, borderRadius:12,
                overflow:'hidden', zIndex:200 }}>
                {stSuggests.map((s,i) => (
                  <div key={i} onClick={() => {
                    setWriteStation(s.name); setStationQuery(s.name); setStSuggests([]);
                  }} style={{ display:'flex', alignItems:'center', gap:8,
                    padding:'10px 14px', cursor:'pointer',
                    borderTop: i>0 ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ width:10, height:10, borderRadius:5, background:s.color, flexShrink:0 }} />
                    <span style={{ fontSize:13, color:C.white, fontFamily:FF }}>{s.name}</span>
                    <span style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginLeft:'auto' }}>{s.lineName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 태그 선택 칩 */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
          {TAG_OPTIONS.map(t => (
            <div key={t} onClick={() => setWriteTag(t)}
              style={{ padding:'4px 12px', borderRadius:20, cursor:'pointer',
                background: writeTag === t ? `${TAG_COLORS[t]}22` : C.glass1,
                border: writeTag === t ? `1.5px solid ${TAG_COLORS[t]}88` : `1px solid ${C.border}`,
                transition:'all 0.15s' }}>
              <span style={{ fontSize:11, fontWeight: writeTag === t ? 800 : 500,
                color: writeTag === t ? TAG_COLORS[t] : C.g[60], fontFamily:FF }}>
                {t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 본문 입력 영역 ── */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>

        {/* 제목 입력 */}
        <input
          value={writeTitle}
          onChange={e => setWriteTitle(e.target.value)}
          placeholder="제목을 입력하세요 (2~50자)"
          maxLength={50}
          style={{ width:'100%', background:'none', border:'none', outline:'none',
            borderBottom:`1px solid ${C.border}`, padding:'10px 0', marginBottom:14,
            fontSize:18, fontWeight:800, color:C.white, fontFamily:FF,
            boxSizing:'border-box' }}
        />

        {/* 본문 입력 */}
        <textarea
          value={writeBody}
          onChange={e => setWriteBody(e.target.value)}
          placeholder={`오늘 ${writeStation || '강남역'}에서 있었던 이야기를 공유해보세요.\n\n• 지연·혼잡 제보  • 역 꿀팁  • 분실물 찾기`}
          rows={8}
          style={{ width:'100%', background:'none', border:'none', outline:'none',
            resize:'none', fontSize:14, color:C.g[50], fontFamily:FF,
            lineHeight:1.75, boxSizing:'border-box' }}
        />

        {/* 글자수 */}
        <div style={{ textAlign:'right', fontSize:11, color: writeBody.length > 900 ? '#EF4444' : C.g[70],
          fontFamily:FF, marginTop:4 }}>
          {writeBody.length} / 1000
        </div>

        {/* ── 이미지 첨부 미리보기 ── */}
        {images.length > 0 && (
          <div style={{ marginTop:14, display:'flex', gap:8, flexWrap:'wrap' }}>
            {images.map(img => (
              <div key={img.id} style={{ position:'relative', width:80, height:80,
                borderRadius:10, overflow:'hidden', flexShrink:0,
                border:`1px solid ${C.border}` }}>
                <div style={{ width:'100%', height:'100%', background:img.bg }} />
                <button onClick={() => removeImage(img.id)}
                  style={{ position:'absolute', top:4, right:4, width:18, height:18,
                    borderRadius:9, background:'rgba(0,0,0,0.7)', border:'none',
                    cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:10, color:'#fff', fontFamily:FF }}>
                  ✕
                </button>
                <div style={{ position:'absolute', bottom:4, left:0, right:0, textAlign:'center',
                  fontSize:9, color:'rgba(255,255,255,0.6)', fontFamily:FF }}>
                  사진 {images.indexOf(img)+1}
                </div>
              </div>
            ))}
            {images.length < 4 && (
              <div onClick={addImage}
                style={{ width:80, height:80, borderRadius:10, border:`1.5px dashed ${C.border}`,
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', gap:4 }}>
                <span style={{ fontSize:20 }}>+</span>
                <span style={{ fontSize:9, color:C.g[70], fontFamily:FF }}>{4-images.length}장 더</span>
              </div>
            )}
          </div>
        )}

        {/* ── 투표 블록 ── */}
        {showPoll && (
          <div style={{ marginTop:16, background:C.card, borderRadius:14,
            padding:14, border:`1px solid ${C.border}` }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              marginBottom:10 }}>
              <span style={{ fontSize:13, fontWeight:700, color:C.primary, fontFamily:FF }}>📊 투표</span>
              <button onClick={() => setShowPoll(false)}
                style={{ background:'none', border:'none', cursor:'pointer',
                  fontSize:12, color:C.g[60], fontFamily:FF }}>삭제</button>
            </div>
            <input
              value={pollQ}
              onChange={e => setPollQ(e.target.value)}
              placeholder="투표 질문을 입력하세요"
              style={{ width:'100%', background:C.glass1, border:`1px solid ${C.border}`,
                borderRadius:8, padding:'8px 12px', fontSize:13, color:C.white,
                fontFamily:FF, outline:'none', boxSizing:'border-box', marginBottom:8 }}
            />
            {pollOpts.map((opt, i) => (
              <div key={i} style={{ display:'flex', gap:8, marginBottom:6 }}>
                <div style={{ width:20, height:20, borderRadius:10, background:C.glass2,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                  fontSize:10, fontWeight:700, color:C.primary, fontFamily:FF, marginTop:6 }}>
                  {i+1}
                </div>
                <input
                  value={opt}
                  onChange={e => updatePollOpt(i, e.target.value)}
                  placeholder={`선택지 ${i+1}`}
                  style={{ flex:1, background:C.glass1, border:`1px solid ${C.border}`,
                    borderRadius:8, padding:'8px 12px', fontSize:13, color:C.white,
                    fontFamily:FF, outline:'none' }}
                />
              </div>
            ))}
            {pollOpts.length < 4 && (
              <div onClick={addPollOpt}
                style={{ textAlign:'center', padding:'8px', cursor:'pointer',
                  fontSize:12, color:C.primary, fontFamily:FF }}>
                + 선택지 추가 ({pollOpts.length}/4)
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 하단 툴바 ── */}
      <div style={{ flexShrink:0, borderTop:`1px solid ${C.border}`,
        background:C.stickyBg,
        padding:'8px 16px', display:'flex', gap:4, alignItems:'center',
        paddingBottom:'calc(8px + env(safe-area-inset-bottom,0px))' }}>
        {/* 사진 추가 */}
        <div onClick={addImage}
          style={{ display:'flex', flexDirection:'column', alignItems:'center',
            padding:'6px 10px', cursor: images.length >= 4 ? 'not-allowed' : 'pointer',
            borderRadius:10, gap:2, opacity: images.length >= 4 ? 0.4 : 1 }}>
          <span style={{ fontSize:20 }}>🖼️</span>
          <span style={{ fontSize:9, color:C.g[60], fontFamily:FF }}>사진{images.length > 0 ? ` (${images.length}/4)` : ''}</span>
        </div>
        {/* 투표 */}
        <div onClick={() => setShowPoll(!showPoll)}
          style={{ display:'flex', flexDirection:'column', alignItems:'center',
            padding:'6px 10px', cursor:'pointer', borderRadius:10, gap:2,
            background: showPoll ? `${C.primary}18` : 'transparent' }}>
          <span style={{ fontSize:20 }}>📊</span>
          <span style={{ fontSize:9, color: showPoll ? C.primary : C.g[60], fontFamily:FF, fontWeight: showPoll ? 700 : 400 }}>투표</span>
        </div>
        {/* 위치 (표시용) */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
          padding:'6px 10px', borderRadius:10, gap:2 }}>
          <span style={{ fontSize:20 }}>📍</span>
          <span style={{ fontSize:9, color:C.g[60], fontFamily:FF }}>위치</span>
        </div>
        {/* 멘션 */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
          padding:'6px 10px', borderRadius:10, gap:2 }}>
          <span style={{ fontSize:20 }}>@</span>
          <span style={{ fontSize:9, color:C.g[60], fontFamily:FF }}>멘션</span>
        </div>
        <div style={{ flex:1 }} />
        {/* 글자수 인디케이터 */}
        <div style={{ fontSize:11, color: writeBody.length > 900 ? '#EF4444' : C.g[70], fontFamily:FF }}>
          {writeBody.length}/1000
        </div>
      </div>

      {/* ── 호선 선택 바텀시트 (전체 호선) ── */}
      {showLineSheet && (
        <>
          <div onClick={() => setShowLineSheet(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.55)', zIndex:400 }} />
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:401,
            background:C.card, borderRadius:'20px 20px 0 0',
            maxHeight:'70vh', overflow:'hidden',
            paddingBottom:'env(safe-area-inset-bottom,20px)' }}>
            <div style={{ width:36, height:4, borderRadius:2,
              background:C.border, margin:'12px auto 14px' }} />
            <div style={{ padding:'0 20px 10px', fontSize:15, fontWeight:800,
              color:C.white, fontFamily:FF }}>호선 선택</div>
            <div style={{ overflowY:'auto', maxHeight:'55vh' }}>
              {LINE_OPTIONS.map(l => (
                <div key={l.id} onClick={() => { setWriteLine(l.id); setShowLineSheet(false); }}
                  style={{ display:'flex', alignItems:'center', gap:14,
                    padding:'13px 20px', cursor:'pointer',
                    borderTop:`1px solid ${C.border}`,
                    background: writeLine === l.id ? `${l.color}12` : 'transparent',
                    transition:'background 0.15s' }}>
                  <div style={{ width:28, height:28, borderRadius:14, background:l.color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>
                    {l.id === 'sin' ? '신' : l.id === 'gyeong' ? '경' : l.id}
                  </div>
                  <span style={{ fontSize:14, fontWeight: writeLine === l.id ? 800 : 500,
                    color: writeLine === l.id ? l.color : C.white, fontFamily:FF }}>
                    {l.label}
                  </span>
                  {writeLine === l.id && (
                    <div style={{ marginLeft:'auto', width:20, height:20, borderRadius:10,
                      background:l.color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:11, color:'#fff' }}>✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CommunityScreen() {
  const [selectedPost,  setSelectedPost]  = useState(null);
  const [selectedUser,  setSelectedUser]  = useState(null);
  const [showWrite,     setShowWrite]     = useState(false);
  const [mode,          setMode]          = useState('posts');
  const [filterCat,     setFilterCat]     = useState('전체');
  const [filterLine,    setFilterLine]    = useState(null);
  const [filterStation, setFilterStation] = useState(null);
  const [sortBy,        setSortBy]        = useState('최신순');

  /* 유저 프로필 → 최상위 우선 렌더 */
  if (selectedUser) {
    return <UserProfileScreen nick={selectedUser} onBack={() => setSelectedUser(null)} />;
  }

  if (selectedPost) {
    return (
      <PostDetailScreen
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onUser={nick => { setSelectedPost(null); setSelectedUser(nick); }}
      />
    );
  }

  if (showWrite) {
    return (
      <PostWriteScreen
        onBack={() => setShowWrite(false)}
        onPublish={newPost => { setShowWrite(false); setSelectedPost(newPost); }}
      />
    );
  }

  const CATS = [
    { id:'전체',    label:'전체' },
    { id:'ISSUE',   label:'이슈' },
    { id:'FREE',    label:'자유' },
    { id:'INSIGHT', label:'정보' },
  ];

  /* 선택된 호선 데이터 */
  const selLineData      = SUBWAY_LINES_DATA.find(l => l.id === filterLine);
  const stationsForLine  = selLineData?.stations ?? [];

  /* 필터 + 정렬 적용 */
  const filteredPosts = COMMUNITY_POSTS
    .filter(p => {
      if (filterCat !== '전체'  && p.category     !== filterCat)     return false;
      if (filterLine            && p.subwayLineId  !== filterLine)    return false;
      if (filterStation         && p.station       !== filterStation) return false;
      return true;
    })
    .sort((a, b) => sortBy === '인기순' ? b.likes - a.likes : 0);

  /* 활성 필터 텍스트 요약 */
  const activeTags = [
    selLineData ? selLineData.name : null,
    filterStation ? `${filterStation}역` : null,
    filterCat !== '전체' ? CATS.find(c => c.id === filterCat)?.label : null,
    sortBy !== '최신순' ? sortBy : null,
  ].filter(Boolean);

  const hasFilter = activeTags.length > 0;

  const clearAll = () => {
    setFilterCat('전체');
    setFilterLine(null);
    setFilterStation(null);
    setSortBy('최신순');
  };

  const handleLineToggle = (lineId) => {
    if (filterLine === lineId) { setFilterLine(null); setFilterStation(null); }
    else                       { setFilterLine(lineId); setFilterStation(null); }
  };

  const CAT_LABEL_CLEAN = { 전체:'전체', ISSUE:'이슈', FREE:'자유', INSIGHT:'정보' };

  /* ── SNAP 스토리 mock ─────────────────────────────────────── */
  const SNAPS = [
    { color:'#60B157', caption:'강남역 · 3분 전',   sub:'출근 지옥' },
    { color:'#BC2A38', caption:'판교역 · 12분 전',  sub:'한산한 아침' },
    { color:'#7F41D8', caption:'여의도역 · 25분 전', sub:'5호선 만원' },
    { color:'#60B157', caption:'홍대입구 · 31분 전', sub:'주말 분위기' },
    { color:'#2A3E91', caption:'광화문 · 45분 전',  sub:'출근길 뷰' },
    { color:'#60B157', caption:'강변역 · 1시간 전', sub:'한강 노을' },
    { color:'#60B157', caption:'왕십리 · 2시간 전', sub:'환승 팁 공유' },
    { color:'#509DD8', caption:'압구정 · 3시간 전', sub:'봄꽃 만발' },
    { color:'#FE8A39', caption:'교대역 · 4시간 전', sub:'퇴근 러시' },
  ];

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:68, background:C.bg }}>

      {/* ── 스티키 헤더 영역 ─────────────────────────────────── */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg }}>

        {/* 타이틀바 */}
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px' }}>
            <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>커뮤니티</span>
            <div style={{ marginLeft:'auto' }}>
              <div onClick={() => setShowWrite(true)}
                style={{ display:'inline-flex', alignItems:'center', gap:5,
                padding:'6px 14px', background:`${C.primary}15`,
                border:`1px solid ${C.primary}40`, borderRadius:20, cursor:'pointer' }}>
                <span style={{ fontSize:12, fontWeight:700, color:C.primary, fontFamily:FF }}>✏️ 글쓰기</span>
              </div>
            </div>
          </div>
        </div>

        {/* 게시판 / 유실물 / 민원 탭 */}
        <div style={{ display:'flex', borderBottom:`1px solid ${C.border}` }}>
          {[['posts','게시판'],['lost','유실물'],['complaint','민원']].map(([id,label]) => {
            const act = mode === id;
            return (
              <div key={id} onClick={() => setMode(id)}
                style={{ flex:1, textAlign:'center', padding:'11px 0', fontSize:13,
                  fontWeight: act ? 800 : 500,
                  color:      act ? C.white : C.g[70],
                  borderBottom: act ? `2px solid ${C.white}` : '2px solid transparent',
                  cursor:'pointer', fontFamily:FF, transition:'color 0.15s' }}>
                {label}
              </div>
            );
          })}
        </div>

        {/* ── 필터 패널 (posts 모드) ─────────────────────────── */}
        {mode === 'posts' && (
          <div style={{ background:C.stickyBg }}>

            {/* [Row 1] 카테고리 탭 (언더라인 스타일) + 정렬 */}
            <div style={{ display:'flex', alignItems:'stretch',
              borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:'flex', flex:1,
                overflowX:'auto', scrollbarWidth:'none' }}>
                {CATS.map(c => {
                  const act = c.id === filterCat;
                  return (
                    <div key={c.id} onClick={() => setFilterCat(c.id)}
                      style={{ flexShrink:0, padding:'10px 16px',
                        fontSize:13, fontWeight: act ? 800 : 500,
                        color: act ? C.white : C.g[70],
                        borderBottom: act ? `2px solid ${C.white}` : '2px solid transparent',
                        cursor:'pointer', fontFamily:FF,
                        transition:'color 0.15s' }}>
                      {c.label}
                    </div>
                  );
                })}
              </div>
              {/* 정렬 — 우측 고정 */}
              <div onClick={() => setSortBy(s => s === '최신순' ? '인기순' : '최신순')}
                style={{ flexShrink:0, display:'flex', alignItems:'center', gap:3,
                  padding:'0 16px', cursor:'pointer',
                  borderLeft:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12, fontFamily:FF, fontWeight:700,
                  color: sortBy !== '최신순' ? C.primary : C.g[60] }}>
                  {sortBy}
                </span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke={sortBy !== '최신순' ? C.primary : C.g[70]} strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            {/* [Row 2] 노선 필터 — 컬러 원형 배지 스타일 */}
            <div style={{ display:'flex', alignItems:'center', gap:8,
              padding:'10px 16px', overflowX:'auto', scrollbarWidth:'none',
              borderBottom: filterLine ? `1px solid ${C.border}` : 'none' }}>
              {/* 전체 노선 */}
              <div onClick={() => { setFilterLine(null); setFilterStation(null); }}
                style={{ flexShrink:0, display:'flex', alignItems:'center', gap:5,
                  padding:'5px 12px', borderRadius:6, cursor:'pointer',
                  background: !filterLine ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: `1px solid ${!filterLine ? 'rgba(255,255,255,0.25)' : C.border}` }}>
                <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                  color: !filterLine ? C.white : C.g[60] }}>전체</span>
              </div>
              {SUBWAY_LINES_DATA.map(line => {
                const act = filterLine === line.id;
                return (
                  <div key={line.id} onClick={() => handleLineToggle(line.id)}
                    style={{ flexShrink:0, display:'flex', alignItems:'center', gap:6,
                      padding:'5px 12px', borderRadius:6, cursor:'pointer',
                      transition:'all 0.15s',
                      background: act ? `${line.color}20` : 'transparent',
                      border: `1px solid ${act ? line.color+'60' : C.border}` }}>
                    <div style={{ width:8, height:8, borderRadius:4,
                      background:line.color, flexShrink:0 }} />
                    <span style={{ fontSize:11, fontWeight: act ? 700 : 500,
                      color: act ? line.color : C.g[60], fontFamily:FF }}>
                      {line.short}호선
                    </span>
                    {act && (
                      <span onClick={e => { e.stopPropagation(); setFilterLine(null); setFilterStation(null); }}
                        style={{ fontSize:10, color:line.color, lineHeight:1, cursor:'pointer' }}>×</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* [Row 3] 역 chips — 노선 선택 시만, 가볍게 */}
            {filterLine && stationsForLine.length > 0 && (
              <div style={{ display:'flex', alignItems:'center', gap:6,
                padding:'8px 16px 10px',
                overflowX:'auto', scrollbarWidth:'none',
                borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:10, color:C.g[70], fontFamily:FF,
                  flexShrink:0, fontWeight:600 }}>역</span>
                <div style={{ width:1, height:12, background:C.border, flexShrink:0 }} />
                {stationsForLine.map(stn => {
                  const act = filterStation === stn;
                  const lc  = selLineData?.color ?? C.primary;
                  return (
                    <div key={stn} onClick={() => setFilterStation(act ? null : stn)}
                      style={{ flexShrink:0, padding:'4px 10px', borderRadius:5,
                        cursor:'pointer', fontFamily:FF, fontSize:11,
                        fontWeight: act ? 700 : 400,
                        background: act ? `${lc}22` : 'transparent',
                        color:      act ? lc : C.g[60],
                        border:`1px solid ${act ? lc+'50' : 'transparent'}` }}>
                      {stn}
                    </div>
                  );
                })}
                {filterStation && (
                  <div onClick={() => setFilterStation(null)}
                    style={{ flexShrink:0, marginLeft:'auto',
                      fontSize:11, color:C.g[70], cursor:'pointer', fontFamily:FF }}>
                    역 초기화
                  </div>
                )}
              </div>
            )}

            {/* 활성 필터 결과 수 — 심플하게 */}
            {hasFilter && (
              <div style={{ display:'flex', alignItems:'center',
                justifyContent:'space-between', padding:'7px 16px 8px' }}>
                <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
                  <span style={{ color:C.white, fontWeight:700 }}>{filteredPosts.length}개</span>의 글
                </span>
                <span onClick={clearAll}
                  style={{ fontSize:11, color:C.g[60], cursor:'pointer',
                    fontFamily:FF, fontWeight:600 }}>
                  전체 초기화
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 콘텐츠 영역 ──────────────────────────────────────── */}
      {mode === 'posts' ? (
        filteredPosts.length > 0 ? (
          <div style={{ padding:'0 16px' }}>
            {filteredPosts.map((p, i) => {
              const lineData = SUBWAY_LINES_DATA.find(l => l.id === p.subwayLineId);
              const lc       = lineData?.color ?? C.primary;
              return (
                <div key={p.id} onClick={() => setSelectedPost(p)}
                  style={{ display:'flex', gap:12, padding:'14px 0',
                    borderBottom: i < filteredPosts.length-1 ? `1px solid ${C.border}` : 'none',
                    cursor:'pointer' }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    {/* 태그 행 */}
                    <div style={{ display:'flex', gap:5, marginBottom:6, flexWrap:'wrap' }}>
                      {p.urgent && <Tag t="긴급" bg={C.red} col='#fff' fw={800} />}
                      <Tag t={CAT_LABEL_CLEAN[p.category] ?? p.category}
                        bg={p.urgent ? 'rgba(235,77,61,0.12)' : 'rgba(255,255,255,0.07)'}
                        col={p.urgent ? C.red : C.g[60]} fw={600} />
                      <Tag t={`${p.station}역`}
                        bg={`${lc}15`} col={lc} fw={700} />
                    </div>
                    {/* 제목 */}
                    <div style={{ fontSize:14, fontWeight:600, color:C.white,
                      lineHeight:1.45, fontFamily:FF, marginBottom:6 }}>
                      {p.title}
                    </div>
                    {/* 메타 */}
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span
                        onClick={e => { e.stopPropagation(); setSelectedUser(p.writer); }}
                        style={{ fontSize:11, color:C.g[70], cursor:'pointer',
                          textDecoration:'none' }}>
                        {p.writer}
                      </span>
                      <span style={{ fontSize:11, color:C.g[80] }}>· {p.createdAt}</span>
                      <span style={{ fontSize:11, color:C.g[80] }}>댓글 {p.commentCnt}</span>
                      <span style={{ fontSize:11, color:C.g[80] }}>공감 {p.likes}</span>
                    </div>
                  </div>
                  {/* 호선 뱃지 썸네일 */}
                  <div style={{ width:52, height:52, flexShrink:0, borderRadius:10,
                    background:`${lc}15`, border:`1px solid ${lc}30`,
                    display:'flex', flexDirection:'column',
                    alignItems:'center', justifyContent:'center', gap:2 }}>
                    <div style={{ width:26, height:26, borderRadius:13, background:lc,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#fff', fontSize:12, fontWeight:900 }}>
                      {lineData?.short ?? p.subwayLineId}
                    </div>
                    <span style={{ fontSize:9, color:lc, fontWeight:700, fontFamily:FF }}>
                      {p.station}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 결과 없음 Empty State */
          <div style={{ display:'flex', flexDirection:'column',
            alignItems:'center', gap:12, padding:'56px 0 32px' }}>
            <span style={{ fontSize:14, color:C.g[70], fontFamily:FF }}>
              해당 조건의 글이 없어요
            </span>
            <div onClick={clearAll}
              style={{ padding:'8px 22px', border:`1px solid ${C.border}`,
                borderRadius:20, cursor:'pointer' }}>
              <span style={{ fontSize:12, color:C.g[60], fontFamily:FF }}>필터 초기화하기</span>
            </div>
          </div>
        )
      ) : mode === 'lost' ? (
        /* ── 유실물 탭 ───────────────────────────────────────── */
        <div>
          {/* 신고하기 배너 */}
          <div style={{ margin:'14px 16px 0', padding:'12px 14px',
            background:'rgba(255,255,255,0.04)', border:`1px solid ${C.border}`,
            borderRadius:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                분실물을 잃어버리셨나요?
              </div>
              <div style={{ fontSize:11, color:C.g[70], marginTop:2, fontFamily:FF }}>
                역무원에게 맡겨진 물건을 조회할 수 있어요
              </div>
            </div>
            <div style={{ flexShrink:0, padding:'7px 14px', borderRadius:6,
              background:C.primary, cursor:'pointer' }}>
              <span style={{ fontSize:12, fontWeight:800, color:'#fff', fontFamily:FF }}>
                조회하기
              </span>
            </div>
          </div>
          {/* 유실물 리스트 */}
          <div style={{ padding:'12px 16px 0' }}>
            {LOST_DATA.map((item, i) => {
              const lineData = SUBWAY_LINES_DATA.find(l => l.id === item.line);
              const lc = lineData?.color ?? C.primary;
              const isDone = item.status === '인계완료';
              return (
                <div key={item.id}
                  style={{ display:'flex', alignItems:'center', gap:12,
                    padding:'12px 0',
                    borderBottom: i < LOST_DATA.length-1 ? `1px solid ${C.border}` : 'none',
                    cursor:'pointer', opacity: isDone ? 0.5 : 1 }}>
                  {/* 호선 원형 */}
                  <div style={{ width:36, height:36, borderRadius:18, flexShrink:0,
                    background:`${lc}20`, border:`1px solid ${lc}40`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:12, fontWeight:900, color:lc, fontFamily:FF }}>
                    {lineData?.short ?? item.line}
                  </div>
                  {/* 텍스트 */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white,
                      fontFamily:FF, marginBottom:3,
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
                      {item.station} · {item.date}
                    </div>
                  </div>
                  {/* 상태 배지 */}
                  <div style={{ flexShrink:0, padding:'4px 10px', borderRadius:5,
                    background: isDone ? 'rgba(255,255,255,0.06)' : `${C.primary}18`,
                    border:`1px solid ${isDone ? C.border : C.primary+'44'}` }}>
                    <span style={{ fontSize:11, fontWeight:700, fontFamily:FF,
                      color: isDone ? C.g[70] : C.primary }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── 민원 탭 ─────────────────────────────────────────── */
        (() => {
          const COMPLAINTS = [
            { id:1, cat:'시설',   title:'강남역 2호선 외선 승강장 에스컬레이터 3주째 고장',        station:'강남',   line:'2',   writer:'강남러버',   time:'1시간 전',  likes:88, status:'처리중' },
            { id:2, cat:'안전',   title:'교대역 스크린도어 닫힘 속도 너무 빨라 위험합니다',          station:'교대',   line:'3',   writer:'안전제일',   time:'3시간 전',  likes:62, status:'접수중' },
            { id:3, cat:'혼잡',   title:'출근 시간 강남역 증차 요청 — 매일 2대 이상 보냅니다',      station:'강남',   line:'2',   writer:'통근마스터', time:'5시간 전',  likes:134,status:'접수중' },
            { id:4, cat:'청결',   title:'여의도역 화장실 환기 개선 요청합니다',                     station:'여의도', line:'5',   writer:'여의도man',  time:'어제',      likes:31, status:'완료'   },
            { id:5, cat:'안내',   title:'신분당선 판교역 외국어 안내 방송 개선 필요',               station:'판교',   line:'sin', writer:'판교개발자', time:'2일 전',    likes:24, status:'완료'   },
            { id:6, cat:'시설',   title:'홍대입구역 엘리베이터 위치 안내 표지판 부족',              station:'홍대입구',line:'2',  writer:'홍대러버',   time:'3일 전',    likes:19, status:'접수중' },
          ];
          const STATUS_COLOR = { '접수중':'#FE8A39', '처리중':C.primary, '완료':'#60B157' };
          const CAT_COLOR    = { '시설':'#509DD8', '안전':C.red, '혼잡':'#FE8A39', '청결':'#60B157', '안내':C.primary };
          return (
            <div>
              {/* 민원 작성 배너 */}
              <div style={{ margin:'14px 16px 0', padding:'12px 14px',
                background:'rgba(255,255,255,0.04)', border:`1px solid ${C.border}`,
                borderRadius:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>
                    불편사항을 제보해주세요
                  </div>
                  <div style={{ fontSize:11, color:C.g[70], marginTop:2, fontFamily:FF }}>
                    공감이 많을수록 빠르게 처리돼요
                  </div>
                </div>
                <div style={{ flexShrink:0, padding:'7px 14px', borderRadius:6,
                  background:C.primary, cursor:'pointer' }}>
                  <span style={{ fontSize:12, fontWeight:800, color:'#fff', fontFamily:FF }}>
                    민원 작성
                  </span>
                </div>
              </div>
              {/* 민원 리스트 */}
              <div style={{ padding:'8px 16px 0' }}>
                {COMPLAINTS.map((c, i) => {
                  const lineData = SUBWAY_LINES_DATA.find(l => l.id === c.line);
                  const lc = lineData?.color ?? C.primary;
                  const sc = STATUS_COLOR[c.status] ?? C.g[60];
                  const cc = CAT_COLOR[c.cat]    ?? C.g[60];
                  return (
                    <div key={c.id}
                      style={{ padding:'13px 0',
                        borderBottom: i < COMPLAINTS.length-1 ? `1px solid ${C.border}` : 'none',
                        cursor:'pointer' }}>
                      {/* 태그 행 */}
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                        <span style={{ fontSize:10, fontWeight:800, color:cc,
                          background:`${cc}18`, padding:'2px 7px',
                          borderRadius:4, fontFamily:FF }}>{c.cat}</span>
                        <span style={{ fontSize:10, fontWeight:700, color:lc,
                          background:`${lc}15`, padding:'2px 7px',
                          borderRadius:4, fontFamily:FF }}>{c.station}역</span>
                        {/* 상태 */}
                        <span style={{ marginLeft:'auto', fontSize:10, fontWeight:800,
                          color:sc, fontFamily:FF }}>{c.status}</span>
                      </div>
                      {/* 제목 */}
                      <div style={{ fontSize:13, fontWeight:600, color:C.white,
                        lineHeight:1.45, fontFamily:FF, marginBottom:7 }}>
                        {c.title}
                      </div>
                      {/* 메타 */}
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>
                          {c.writer} · {c.time}
                        </span>
                        <div style={{ display:'flex', alignItems:'center', gap:4, marginLeft:'auto' }}>
                          <span style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>공감</span>
                          <span style={{ fontSize:12, fontWeight:700,
                            color: c.likes >= 100 ? C.primary : C.g[50], fontFamily:FF }}>
                            {c.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   유실물 화면 — 무신사 USED 스타일 + 상태 필터 + 뷰 토글
   ═══════════════════════════════════════════════════════ */
/* ─── 유실물 상세 화면 ─────────────────────────────────────── */
function LostDetailScreen({ item, onBack }) {
  const lc       = C.line[item.line] ?? C.primary;
  const lineName = SUBWAY_LINES_DATA.find(l => l.id === item.line)?.name ?? (item.line + '호선');
  const isStored = item.status === '보관중';

  const infoRows = [
    { label:'호선',     value: lineName,         icon:'🚇' },
    { label:'역',       value: item.station,      icon:'📍' },
    { label:'습득 일시', value: item.date + (item.foundTime ? ' ' + item.foundTime : ''), icon:'🕐' },
    { label:'색상',     value: item.color ?? '-', icon:'🎨' },
    { label:'보관 장소', value: item.keepAt ?? '역무실', icon:'🏢' },
    { label:'문의 전화', value: item.phone ?? '-', icon:'📞' },
  ];

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:68, background:C.bg }}>
      {/* 헤더 */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg,
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
            <div onClick={onBack} style={{ width:32, height:32, borderRadius:16,
              background:C.glass1, border:`1px solid ${C.border}`,
              display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <span style={{ color:C.white, fontSize:16 }}>←</span>
            </div>
            <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>습득물 상세</span>
          </div>
        </div>
      </div>

      {/* 히어로 영역 */}
      <div style={{ margin:'16px', background:C.card, borderRadius:16,
        border:`1px solid ${C.border}`, padding:'28px 20px', textAlign:'center',
        position:'relative', overflow:'hidden' }}>
        {/* 호선 상단 바 */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:4, background:lc }} />
        {/* 상태 배지 */}
        <div style={{ position:'absolute', top:12, right:12 }}>
          <div style={{ padding:'4px 10px', borderRadius:12,
            background: isStored ? 'rgba(42,207,108,0.2)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${isStored ? 'rgba(42,207,108,0.4)' : C.border}` }}>
            <span style={{ fontSize:11, fontWeight:700,
              color: isStored ? C.keyColor : C.g[60], fontFamily:FF }}>
              {item.status}
            </span>
          </div>
        </div>
        {/* 아이콘 */}
        <div style={{ width:72, height:72, borderRadius:20, background:`${lc}20`,
          border:`1px solid ${lc}40`, display:'flex', alignItems:'center',
          justifyContent:'center', margin:'0 auto 14px', fontSize:32 }}>
          {item.emoji ?? '📦'}
        </div>
        <div style={{ fontSize:18, fontWeight:800, color:C.white, fontFamily:FF, marginBottom:6 }}>
          {item.title}
        </div>
        <div style={{ fontSize:13, color:C.g[60], lineHeight:1.5, fontFamily:FF }}>
          {item.desc ?? '상세 정보 없음'}
        </div>
      </div>

      {/* 정보 그리드 */}
      <div style={{ margin:'0 16px 16px' }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF, marginBottom:10 }}>
          상세 정보
        </div>
        <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
          overflow:'hidden' }}>
          {infoRows.map((r, i) => (
            <div key={r.label} style={{ display:'flex', alignItems:'center', padding:'12px 16px',
              borderBottom: i < infoRows.length-1 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{ fontSize:15, marginRight:10 }}>{r.icon}</span>
              <span style={{ fontSize:12, color:C.g[60], fontFamily:FF, width:70, flexShrink:0 }}>
                {r.label}
              </span>
              <span style={{ fontSize:13, fontWeight:600, color:C.white, fontFamily:FF, flex:1 }}>
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 진행 상태 타임라인 */}
      <div style={{ margin:'0 16px 20px' }}>
        <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF, marginBottom:10 }}>
          처리 현황
        </div>
        <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
          padding:'16px' }}>
          {[
            { label:'습득 신고',  done:true,      time: item.date + (item.foundTime ? ' ' + item.foundTime : '') },
            { label:'역무실 보관', done:isStored || !isStored, time: item.date },
            { label:'인계 완료',  done:!isStored, time: !isStored ? item.date : '대기 중' },
          ].map((step, i) => (
            <div key={step.label} style={{ display:'flex', alignItems:'flex-start', gap:12,
              marginBottom: i < 2 ? 12 : 0 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                <div style={{ width:22, height:22, borderRadius:11,
                  background: step.done ? lc : 'rgba(255,255,255,0.08)',
                  border: `2px solid ${step.done ? lc : C.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {step.done && <span style={{ fontSize:11, color:'#0E0F14', fontWeight:900 }}>✓</span>}
                </div>
                {i < 2 && <div style={{ width:2, height:18, marginTop:2,
                  background: step.done ? `${lc}60` : C.border }} />}
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700,
                  color: step.done ? C.white : C.g[60], fontFamily:FF }}>
                  {step.label}
                </div>
                <div style={{ fontSize:11, color:C.g[70], marginTop:2 }}>{step.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 주의사항 */}
      <div style={{ margin:'0 16px 20px', background:'rgba(239,196,0,0.08)',
        border:'1px solid rgba(239,196,0,0.25)', borderRadius:12, padding:'12px 14px' }}>
        <div style={{ fontSize:12, fontWeight:700, color:'#EFC400', marginBottom:4, fontFamily:FF }}>
          ⚠️ 찾아가기 전 확인사항
        </div>
        <div style={{ fontSize:11, color:'rgba(239,196,0,0.8)', lineHeight:1.6 }}>
          • 신분증을 지참해 주세요<br/>
          • 역무실 운영시간: 평일 6:00~24:00, 주말 동일<br/>
          • 보관 기간 초과 시 경찰청으로 이관됩니다
        </div>
      </div>

      {/* 액션 버튼 */}
      <div style={{ margin:'0 16px', display:'flex', gap:10 }}>
        <div onClick={() => { if(item.phone) window.open('tel:' + item.phone.replace(/-/g,'')); }}
          style={{ flex:1, padding:'14px', background:C.glass1,
            border:`1px solid ${C.border}`, borderRadius:12,
            display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
          <span style={{ fontSize:16 }}>📞</span>
          <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>전화 문의</span>
        </div>
        <div style={{ flex:1, padding:'14px', background:lc, borderRadius:12,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer' }}>
          <span style={{ fontSize:16 }}>🗺️</span>
          <span style={{ fontSize:13, fontWeight:700, color:'#0E0F14', fontFamily:FF }}>찾아가기</span>
        </div>
      </div>

      <Div8 h={30} />
    </div>
  );
}

/* ─── 유실물 신고 작성 폼 ─────────────────────────────────── */
function LostWriteScreen({ onBack, onSubmit }) {
  const [lostTitle,    setLostTitle]   = React.useState('');
  const [lostLine,     setLostLine]    = React.useState('2');
  const [lostStation,  setLostStation] = React.useState('강남역');
  const [lostDate,     setLostDate]    = React.useState('오늘');
  const [lostTime,     setLostTime]    = React.useState('');
  const [lostColor,    setLostColor]   = React.useState('');
  const [lostDesc,     setLostDesc]    = React.useState('');
  const [lostPhone,    setLostPhone]   = React.useState('');
  const [showLineSheet, setShowLineSheet] = React.useState(false);
  const [submitted,    setSubmitted]   = React.useState(false);

  const LINE_OPTS = [
    { id:'1', name:'1호선', color:'#0052A4' },
    { id:'2', name:'2호선', color:'#00A84D' },
    { id:'3', name:'3호선', color:'#EF7C1C' },
    { id:'4', name:'4호선', color:'#00A5DE' },
    { id:'5', name:'5호선', color:'#996CAC' },
    { id:'9', name:'9호선', color:'#BDB092' },
    { id:'sin', name:'신분당선', color:'#D4003B' },
    { id:'gyung', name:'경의중앙선', color:'#77C4A3' },
  ];

  const DATE_OPTS = ['오늘','어제','2일 전','3일 전','4일 전','5일 전','6일 전','일주일 이상'];
  const COLOR_OPTS = ['검정','흰색','회색','빨강','파랑','초록','노랑','분홍','기타'];

  const canSubmit = lostTitle.trim().length >= 2 && lostPhone.trim().length >= 6;

  const handleSubmit = () => {
    const selectedLine = LINE_OPTS.find(l => l.id === lostLine);
    const newItem = {
      id: Date.now(),
      title: lostTitle.trim(),
      line: lostLine,
      station: lostStation,
      date: lostDate,
      status: '분실신고',
      emoji: '🔍',
      desc: lostDesc || '분실 신고 접수됨',
      color: lostColor || '-',
      keepAt: '분실 신고 접수 대기 중',
      phone: lostPhone,
      foundTime: lostTime || '',
      foundBy: '본인 신고',
    };
    setSubmitted(true);
    setTimeout(() => {
      if (onSubmit) onSubmit(newItem);
    }, 1800);
  };

  if (submitted) return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', background:C.bg, padding:'40px 24px', gap:16 }}>
      <div style={{ width:72, height:72, borderRadius:36, background:'rgba(0,186,246,0.15)',
        border:'2px solid rgba(0,186,246,0.4)',
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>
        ✅
      </div>
      <div style={{ fontSize:18, fontWeight:800, color:C.white, fontFamily:FF, textAlign:'center' }}>
        분실 신고 완료!
      </div>
      <div style={{ fontSize:13, color:C.g[60], textAlign:'center', lineHeight:1.6 }}>
        신고가 접수되었습니다.<br/>습득 물건 발견 시 즉시 알림을 드릴게요.
      </div>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80, background:C.bg }}>
      {/* 헤더 */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg,
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
            <div onClick={onBack} style={{ width:32, height:32, borderRadius:16,
              background:C.glass1, border:`1px solid ${C.border}`,
              display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <span style={{ color:C.white, fontSize:16 }}>←</span>
            </div>
            <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>분실 신고</span>
          </div>
        </div>
      </div>

      <div style={{ padding:'20px 16px', display:'flex', flexDirection:'column', gap:20 }}>

        {/* 물품명 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            물품명 <span style={{ color:'#EF4444' }}>*</span>
          </div>
          <input
            value={lostTitle}
            onChange={e => setLostTitle(e.target.value)}
            placeholder="예) 검정 우산, 에코백, 갤럭시폰..."
            style={{ width:'100%', padding:'12px 14px', background:C.card,
              border:`1px solid ${C.border}`, borderRadius:10, outline:'none',
              color:C.white, fontSize:14, fontFamily:FF, boxSizing:'border-box',
              caretColor:C.primary }}
          />
        </div>

        {/* 호선 선택 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            호선
          </div>
          <div onClick={() => setShowLineSheet(true)}
            style={{ padding:'12px 14px', background:C.card, border:`1px solid ${C.border}`,
              borderRadius:10, cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
            {(() => {
              const ln = LINE_OPTS.find(l => l.id === lostLine);
              return (
                <>
                  <div style={{ width:12, height:12, borderRadius:6,
                    background: ln?.color ?? C.primary, flexShrink:0 }} />
                  <span style={{ flex:1, fontSize:14, color:C.white, fontFamily:FF }}>
                    {ln?.name ?? lostLine}
                  </span>
                  <span style={{ fontSize:12, color:C.g[60] }}>▼</span>
                </>
              );
            })()}
          </div>
        </div>

        {/* 역 입력 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            역 이름
          </div>
          <input
            value={lostStation}
            onChange={e => setLostStation(e.target.value)}
            placeholder="예) 강남역, 홍대입구역..."
            style={{ width:'100%', padding:'12px 14px', background:C.card,
              border:`1px solid ${C.border}`, borderRadius:10, outline:'none',
              color:C.white, fontSize:14, fontFamily:FF, boxSizing:'border-box',
              caretColor:C.primary }}
          />
        </div>

        {/* 분실 날짜 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            분실 날짜
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {DATE_OPTS.map(d => (
              <div key={d} onClick={() => setLostDate(d)}
                style={{ padding:'7px 14px', borderRadius:20, cursor:'pointer',
                  fontSize:12, fontWeight:700, fontFamily:FF,
                  background: lostDate === d ? C.primary : C.card,
                  color:      lostDate === d ? '#0E0F14' : C.g[60],
                  border:`1px solid ${lostDate === d ? C.primary : C.border}` }}>
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* 분실 시간 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            분실 시간 (선택)
          </div>
          <input
            value={lostTime}
            onChange={e => setLostTime(e.target.value)}
            placeholder="예) 오전 8시 30분"
            style={{ width:'100%', padding:'12px 14px', background:C.card,
              border:`1px solid ${C.border}`, borderRadius:10, outline:'none',
              color:C.white, fontSize:14, fontFamily:FF, boxSizing:'border-box',
              caretColor:C.primary }}
          />
        </div>

        {/* 색상 선택 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            물품 색상 (선택)
          </div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {COLOR_OPTS.map(c => (
              <div key={c} onClick={() => setLostColor(c)}
                style={{ padding:'7px 14px', borderRadius:20, cursor:'pointer',
                  fontSize:12, fontWeight:700, fontFamily:FF,
                  background: lostColor === c ? C.primary : C.card,
                  color:      lostColor === c ? '#0E0F14' : C.g[60],
                  border:`1px solid ${lostColor === c ? C.primary : C.border}` }}>
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* 물품 특징 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            물품 특징 설명 (선택)
          </div>
          <textarea
            value={lostDesc}
            onChange={e => setLostDesc(e.target.value)}
            placeholder="물품의 특징, 크기, 내용물 등을 자세히 적어주세요"
            rows={3}
            style={{ width:'100%', padding:'12px 14px', background:C.card,
              border:`1px solid ${C.border}`, borderRadius:10, outline:'none',
              color:C.white, fontSize:14, fontFamily:FF, boxSizing:'border-box',
              caretColor:C.primary, resize:'none', lineHeight:1.5 }}
          />
        </div>

        {/* 연락처 */}
        <div>
          <div style={{ fontSize:12, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
            연락처 <span style={{ color:'#EF4444' }}>*</span>
          </div>
          <input
            value={lostPhone}
            onChange={e => setLostPhone(e.target.value)}
            placeholder="010-0000-0000"
            type="tel"
            style={{ width:'100%', padding:'12px 14px', background:C.card,
              border:`1px solid ${C.border}`, borderRadius:10, outline:'none',
              color:C.white, fontSize:14, fontFamily:FF, boxSizing:'border-box',
              caretColor:C.primary }}
          />
          <div style={{ fontSize:11, color:C.g[80], marginTop:6, fontFamily:FF }}>
            습득물 발견 시 해당 번호로 연락드립니다
          </div>
        </div>

      </div>

      {/* 제출 버튼 */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, padding:'12px 16px',
        background:C.stickyBg, borderTop:`1px solid ${C.border}`,
        paddingBottom:'calc(12px + env(safe-area-inset-bottom,0px))' }}>
        <div onClick={canSubmit ? handleSubmit : undefined}
          style={{ padding:'15px', background: canSubmit ? C.primary : 'rgba(255,255,255,0.08)',
            borderRadius:12, textAlign:'center', cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition:'all 0.2s' }}>
          <span style={{ fontSize:15, fontWeight:800,
            color: canSubmit ? '#0E0F14' : C.g[60], fontFamily:FF }}>
            분실 신고 접수하기
          </span>
        </div>
      </div>

      {/* 호선 선택 바텀시트 */}
      {showLineSheet && (
        <div style={{ position:'fixed', inset:0, zIndex:200 }}>
          <div onClick={() => setShowLineSheet(false)}
            style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0,
            background:C.modalBg, borderRadius:'16px 16px 0 0',
            border:`1px solid ${C.border}`, paddingBottom:'env(safe-area-inset-bottom,16px)' }}>
            <div style={{ padding:'16px 20px 12px', display:'flex', alignItems:'center',
              borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:15, fontWeight:800, color:C.white, fontFamily:FF }}>호선 선택</span>
              <div onClick={() => setShowLineSheet(false)}
                style={{ marginLeft:'auto', width:28, height:28, borderRadius:14,
                  background:'rgba(255,255,255,0.08)',
                  display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <span style={{ color:C.g[70], fontSize:14 }}>✕</span>
              </div>
            </div>
            {LINE_OPTS.map(l => {
              const act = l.id === lostLine;
              return (
                <div key={l.id}
                  onClick={() => { setLostLine(l.id); setShowLineSheet(false); }}
                  style={{ padding:'14px 20px', display:'flex', alignItems:'center', gap:12,
                    background: act ? 'rgba(255,255,255,0.05)' : 'transparent', cursor:'pointer' }}>
                  <div style={{ width:14, height:14, borderRadius:7, background:l.color, flexShrink:0 }} />
                  <span style={{ fontSize:14, fontWeight: act ? 700 : 500,
                    color: act ? C.white : C.g[70], fontFamily:FF }}>
                    {l.name}
                  </span>
                  {act && <span style={{ marginLeft:'auto', color:C.primary, fontSize:14 }}>✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function LostScreen() {
  const [statusFilter, setStatusFilter] = useState('전체');
  const [viewMode,     setViewMode]     = useState('grid'); // 'grid' | 'list'
  const [selectedItem, setSelectedItem] = useState(null);   // 상세 화면
  const [showWrite,    setShowWrite]    = useState(false);  // 신고 작성 폼

  // ── if-guard 라우팅 ──────────────────────────────────
  if (selectedItem) {
    return <LostDetailScreen item={selectedItem} onBack={() => setSelectedItem(null)} />;
  }
  if (showWrite) {
    return (
      <LostWriteScreen
        onBack={() => setShowWrite(false)}
        onSubmit={newItem => { setShowWrite(false); setSelectedItem(newItem); }}
      />
    );
  }

  const filtered = statusFilter === '전체'
    ? LOST_DATA
    : LOST_DATA.filter(it => it.status === statusFilter);

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:68, background:C.bg }}>

      {/* 스티키 헤더 */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg,
        borderBottom:`1px solid ${C.border}` }}>
        <div style={{ paddingTop:'env(safe-area-inset-top,44px)' }}>
          <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px' }}>
            <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>유실물</span>
            <div style={{ marginLeft:'auto', display:'flex', gap:8, alignItems:'center' }}>
              {/* 그리드/리스트 뷰 토글 */}
              <div style={{ display:'flex', background:C.glass1,
                border:`1px solid ${C.border}`, borderRadius:8, overflow:'hidden' }}>
                {[['grid','⊞'],['list','☰']].map(([mode, icon]) => (
                  <div key={mode} onClick={() => setViewMode(mode)}
                    style={{ padding:'5px 10px', cursor:'pointer',
                      background: viewMode===mode ? 'rgba(255,255,255,0.12)' : 'transparent' }}>
                    <span style={{ fontSize:14,
                      color: viewMode===mode ? C.white : C.g[70] }}>{icon}</span>
                  </div>
                ))}
              </div>
              <span style={{ fontSize:12, color:C.g[60], cursor:'pointer', fontFamily:FF, fontWeight:600 }}>검색</span>
            </div>
          </div>
        </div>

        {/* 상태 필터 탭 */}
        <div style={{ display:'flex', alignItems:'center',
          padding:'6px 16px 8px', gap:6 }}>
          {['전체','보관중','인계완료'].map(s => {
            const act = s === statusFilter;
            return (
              <div key={s} onClick={() => setStatusFilter(s)}
                style={{ padding:'5px 14px', borderRadius:20, cursor:'pointer',
                  fontSize:12, fontWeight:700, fontFamily:FF, transition:'all 0.15s',
                  background: act ? C.white : 'rgba(255,255,255,0.05)',
                  color:      act ? '#0E0F14' : C.g[70],
                  border:    `1px solid ${act ? C.white : C.border}` }}>
                {s}
              </div>
            );
          })}
          <span style={{ marginLeft:'auto', fontSize:11, color:C.g[70], fontFamily:FF }}>
            {filtered.length}건
          </span>
        </div>
      </div>

      {/* 분실 신고 CTA 배너 */}
      <div onClick={() => setShowWrite(true)}
        style={{ margin:'14px 16px 0',
        background:C.card,
        border:`1px solid ${C.border}`, borderRadius:8,
        padding:'14px 16px', display:'flex', alignItems:'center',
        gap:12, cursor:'pointer' }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:800, color:C.white,
            fontFamily:FF, marginBottom:3 }}>
            물건을 잃어버리셨나요?
          </div>
          <div style={{ fontSize:11, color:C.g[60], lineHeight:1.5 }}>
            분실 신고하면 발견 즉시 알림을 드려요
          </div>
        </div>
        <div style={{ padding:'7px 14px', background:C.primary, borderRadius:20,
          flexShrink:0, cursor:'pointer' }}>
          <span style={{ fontSize:12, fontWeight:800, color:'#0E0F14', fontFamily:FF }}>신고</span>
        </div>
      </div>

      <Div8 h={14} />

      {/* 습득물 목록 */}
      <div style={{ padding:'0 16px' }}>
        <SecHead title="최근 습득물" />

        {viewMode === 'grid' ? (
          /* ── 그리드 뷰 ─────────────────────────────────── */
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {filtered.map(it => {
              const lc       = C.line[it.line] ?? C.primary;
              const lineName = SUBWAY_LINES_DATA.find(l => l.id === it.line)?.name ?? `${it.line}호선`;
              const isStored = it.status === '보관중';
              return (
                <div key={it.id} onClick={() => setSelectedItem(it)} style={{ cursor:'pointer' }}>
                  <div style={{ aspectRatio:'1', background:C.card, borderRadius:12,
                    border:`1px solid ${C.border}`,
                    display:'flex', flexDirection:'column', alignItems:'center',
                    justifyContent:'center', gap:6,
                    position:'relative', overflow:'hidden' }}>
                    {/* 상단 호선 컬러 바 */}
                    <div style={{ position:'absolute', top:0, left:0, right:0,
                      height:3, background:lc }} />
                    {/* 상태 배지 */}
                    <div style={{ position:'absolute', top:10, left:8 }}>
                      <Tag t={it.status}
                        bg={isStored ? 'rgba(42,207,108,0.2)' : 'rgba(255,255,255,0.08)'}
                        col={isStored ? C.keyColor : C.g[60]} fw={700} />
                    </div>
                    {/* 위시리스트 */}
                    <div style={{ position:'absolute', top:8, right:8,
                      width:26, height:26, borderRadius:13,
                      background:'rgba(255,255,255,0.08)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:13, color:C.g[70], cursor:'pointer' }}>
                      ♡
                    </div>
                    <div style={{ width:48, height:48, borderRadius:10, background:`${lc}20`, border:`1px solid ${lc}30`, display:'flex', alignItems:'center', justifyContent:'center', marginTop:6 }}><span style={{ fontSize:15, fontWeight:900, color:lc, fontFamily:FF }}>{it.title.charAt(0)}</span></div>
                  </div>
                  <div style={{ padding:'8px 2px 0' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:4, marginBottom:3 }}>
                      <div style={{ width:7, height:7, borderRadius:4, background:lc, flexShrink:0 }} />
                      <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                        {lineName} · {it.station}
                      </span>
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white,
                      fontFamily:FF, lineHeight:1.3 }}>
                      {it.title}
                    </div>
                    <div style={{ fontSize:11, color:C.g[80], marginTop:2 }}>
                      {it.date} 습득
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── 리스트 뷰 ─────────────────────────────────── */
          <div>
            {filtered.map((it, i) => {
              const lc       = C.line[it.line] ?? C.primary;
              const lineName = SUBWAY_LINES_DATA.find(l => l.id === it.line)?.name ?? `${it.line}호선`;
              const isStored = it.status === '보관중';
              return (
                <div key={it.id}
                  onClick={() => setSelectedItem(it)}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'13px 0',
                    borderBottom: i < filtered.length-1 ? `1px solid ${C.border}` : 'none',
                    cursor:'pointer' }}>
                  <div style={{ width:50, height:50, borderRadius:12, background:`${lc}15`,
                    border:`1px solid ${lc}28`, flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:12, fontWeight:900, color:'#fff', fontFamily:FF }}>{SUBWAY_LINES_DATA.find(l => l.id === it.line)?.short ?? it.line}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white,
                      fontFamily:FF, marginBottom:4 }}>
                      {it.title}
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <div style={{ width:6, height:6, borderRadius:3, background:lc }} />
                      <span style={{ fontSize:11, color:C.g[70] }}>
                        {lineName} · {it.station}
                      </span>
                      <span style={{ fontSize:11, color:C.g[80] }}>· {it.date}</span>
                    </div>
                  </div>
                  <Tag t={it.status}
                    bg={isStored ? 'rgba(42,207,108,0.15)' : 'rgba(255,255,255,0.06)'}
                    col={isStored ? C.keyColor : C.g[60]} fw={700} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Div8 h={24} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   마이 화면 — 4탭 허브 (개요 / 이동관리 / 활동기록 / 계정설정)
   PM 명세: 프로필 요약 + 이동 운영센터 + 활동 아카이브 + 설정 허브
   ═══════════════════════════════════════════════════════ */
/* ─── 역 즐겨찾기 편집 화면 ──────────────────────────────── */
function FavEditScreen({ stations, onBack, onSave }) {
  const LINE_OPTS = [
    { id:'s1', name:'1호선', color:'#2A3E91' }, { id:'s2', name:'2호선', color:'#60B157' },
    { id:'s3', name:'3호선', color:'#FE8A39' }, { id:'s4', name:'4호선', color:'#509DD8' },
    { id:'s5', name:'5호선', color:'#7F41D8' }, { id:'s9', name:'9호선', color:'#D1A946' },
    { id:'sin', name:'신분당선', color:'#BC2A38' }, { id:'gyung', name:'경의중앙', color:'#77C4A3' },
  ];
  const LABEL_OPTS = ['집', '회사', '학교', '카페', '헬스장', '병원', '기타'];

  // 모든 역 목록 (검색 자동완성)
  const ALL_STATIONS = SUBWAY_LINES_DATA.flatMap(l =>
    l.stations.map(s => ({ name: s + '역', lineId: l.id, lineName: l.name, color: l.color }))
  );

  const [list, setList] = React.useState(
    stations.filter(s => s.name).map((s, i) => ({ ...s, _key: i }))
  );
  const [editIdx, setEditIdx]   = React.useState(null); // 현재 편집 중인 인덱스
  const [showAdd,  setShowAdd]  = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(null); // 삭제 확인 인덱스

  // 편집 폼 state
  const [editLabel,   setEditLabel]   = React.useState('');
  const [editName,    setEditName]    = React.useState('');
  const [editLine,    setEditLine]    = React.useState('s2');
  const [editWalk,    setEditWalk]    = React.useState('도보 5분');
  const [nameSearch,  setNameSearch]  = React.useState('');
  const [showLineSel, setShowLineSel] = React.useState(false);

  const WALK_OPTS = ['도보 1분', '도보 3분', '도보 5분', '도보 10분', '도보 15분', '버스 환승'];

  const openEdit = (idx) => {
    const item = list[idx];
    setEditLabel(item.label);
    setEditName(item.name);
    setEditLine(item.line);
    setEditWalk(item.walk);
    setNameSearch('');
    setEditIdx(idx);
  };

  const openAdd = () => {
    setEditLabel('기타');
    setEditName('');
    setEditLine('s2');
    setEditWalk('도보 5분');
    setNameSearch('');
    setShowAdd(true);
  };

  const closeForm = () => { setEditIdx(null); setShowAdd(false); setShowLineSel(false); };

  const saveEdit = () => {
    if (!editName.trim()) return;
    setList(prev => prev.map((item, i) =>
      i === editIdx
        ? { ...item, label: editLabel, name: editName.trim(), line: editLine, walk: editWalk }
        : item
    ));
    closeForm();
  };

  const saveAdd = () => {
    if (!editName.trim()) return;
    setList(prev => [...prev, {
      id: Date.now(), label: editLabel,
      name: editName.trim(), line: editLine, walk: editWalk, _key: Date.now(),
    }]);
    closeForm();
  };

  const deleteItem = (idx) => {
    setList(prev => prev.filter((_, i) => i !== idx));
    setDeleteConfirm(null);
  };

  const moveUp   = idx => { if (idx === 0) return; const a = [...list]; [a[idx-1],a[idx]] = [a[idx],a[idx-1]]; setList(a); };
  const moveDown = idx => { if (idx === list.length-1) return; const a = [...list]; [a[idx],a[idx+1]] = [a[idx+1],a[idx]]; setList(a); };

  const searchResults = nameSearch.length >= 1
    ? ALL_STATIONS.filter(s => s.name.includes(nameSearch)).slice(0, 6)
    : [];

  // 편집/추가 폼 (바텀시트)
  const EditForm = ({ isAdd }) => (
    <div style={{ position:'fixed', inset:0, zIndex:300 }}>
      <div onClick={closeForm}
        style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0,
        background:C.modalBg, borderRadius:'18px 18px 0 0', border:`1px solid ${C.border}`,
        paddingBottom:'env(safe-area-inset-bottom,16px)', maxHeight:'90vh', overflowY:'auto',
        transition:'background 0.3s ease' }}>

        {/* 폼 헤더 */}
        <div style={{ display:'flex', alignItems:'center', padding:'18px 20px 14px',
          borderBottom:`1px solid ${C.border}` }}>
          <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>
            {isAdd ? '역 추가' : '역 편집'}
          </span>
          <div onClick={closeForm}
            style={{ marginLeft:'auto', width:28, height:28, borderRadius:14,
              background:C.glass2, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
            <span style={{ color:C.g[70], fontSize:14 }}>✕</span>
          </div>
        </div>

        <div style={{ padding:'16px 20px', display:'flex', flexDirection:'column', gap:16 }}>

          {/* 라벨 선택 */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
              라벨
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {LABEL_OPTS.map(l => (
                <div key={l} onClick={() => setEditLabel(l)}
                  style={{ padding:'6px 14px', borderRadius:16, cursor:'pointer', fontSize:12,
                    fontWeight:700, fontFamily:FF,
                    background: editLabel === l ? C.primary : C.glass1,
                    color:      editLabel === l ? '#0E0F14' : C.g[60],
                    border:`1px solid ${editLabel === l ? C.primary : C.border}` }}>
                  {l}
                </div>
              ))}
            </div>
          </div>

          {/* 역 이름 + 자동완성 */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
              역 이름
            </div>
            <input
              value={nameSearch || editName}
              onChange={e => { setNameSearch(e.target.value); setEditName(e.target.value); }}
              placeholder="역 이름 검색 (예: 강남역)"
              style={{ width:'100%', padding:'12px 14px', background:C.card,
                border:`1px solid ${nameSearch ? C.primary : C.border}`, borderRadius:10,
                outline:'none', color:C.white, fontSize:14, fontFamily:FF,
                caretColor:C.primary, boxSizing:'border-box', transition:'border 0.2s' }}
            />
            {searchResults.length > 0 && (
              <div style={{ marginTop:4, background:C.card, borderRadius:10,
                border:`1px solid ${C.border}`, overflow:'hidden' }}>
                {searchResults.map((s, i) => (
                  <div key={i} onClick={() => {
                      setEditName(s.name); setEditLine(s.lineId); setNameSearch('');
                    }}
                    style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:10,
                      borderBottom: i < searchResults.length-1 ? `1px solid ${C.border}` : 'none',
                      cursor:'pointer' }}>
                    <div style={{ width:10, height:10, borderRadius:5,
                      background:s.color, flexShrink:0 }} />
                    <span style={{ fontSize:13, color:C.white, fontFamily:FF }}>{s.name}</span>
                    <span style={{ fontSize:11, color:C.g[70], marginLeft:'auto' }}>{s.lineName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 호선 선택 */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
              호선
            </div>
            <div onClick={() => setShowLineSel(!showLineSel)}
              style={{ padding:'12px 14px', background:C.card, border:`1px solid ${C.border}`,
                borderRadius:10, cursor:'pointer', display:'flex', alignItems:'center', gap:10 }}>
              {(() => {
                const ln = LINE_OPTS.find(l => l.id === editLine);
                return (
                  <>
                    <div style={{ width:12, height:12, borderRadius:6,
                      background:ln?.color ?? C.primary, flexShrink:0 }} />
                    <span style={{ flex:1, fontSize:14, color:C.white, fontFamily:FF }}>
                      {ln?.name ?? editLine}
                    </span>
                    <span style={{ fontSize:12, color:C.g[60] }}>{showLineSel ? '▲' : '▼'}</span>
                  </>
                );
              })()}
            </div>
            {showLineSel && (
              <div style={{ marginTop:4, background:C.card, borderRadius:10,
                border:`1px solid ${C.border}`, overflow:'hidden' }}>
                {LINE_OPTS.map((l, i) => (
                  <div key={l.id} onClick={() => { setEditLine(l.id); setShowLineSel(false); }}
                    style={{ padding:'10px 14px', display:'flex', alignItems:'center', gap:10,
                      borderBottom: i < LINE_OPTS.length-1 ? `1px solid ${C.border}` : 'none',
                      cursor:'pointer',
                      background: editLine === l.id ? C.glass1 : 'transparent' }}>
                    <div style={{ width:12, height:12, borderRadius:6, background:l.color }} />
                    <span style={{ fontSize:13, fontWeight: editLine===l.id ? 700 : 500,
                      color: editLine===l.id ? C.white : C.g[70], fontFamily:FF }}>{l.name}</span>
                    {editLine === l.id && <span style={{ marginLeft:'auto', color:C.primary }}>✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 도보 시간 */}
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF, marginBottom:8 }}>
              이동 시간
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {WALK_OPTS.map(w => (
                <div key={w} onClick={() => setEditWalk(w)}
                  style={{ padding:'7px 14px', borderRadius:16, cursor:'pointer', fontSize:12,
                    fontWeight:700, fontFamily:FF,
                    background: editWalk === w ? C.primary : C.glass1,
                    color:      editWalk === w ? '#0E0F14' : C.g[60],
                    border:`1px solid ${editWalk === w ? C.primary : C.border}` }}>
                  {w}
                </div>
              ))}
            </div>
          </div>

          {/* 저장 버튼 */}
          <div onClick={isAdd ? saveAdd : saveEdit}
            style={{ padding:'15px', background: editName ? C.primary : C.glass2,
              borderRadius:12, textAlign:'center', cursor: editName ? 'pointer' : 'not-allowed',
              marginTop:4 }}>
            <span style={{ fontSize:15, fontWeight:800,
              color: editName ? '#0E0F14' : C.g[60], fontFamily:FF }}>
              {isAdd ? '역 추가하기' : '저장하기'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80, background:C.bg }}>
      {/* 헤더 */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg,
        borderBottom:`1px solid ${C.border}`, paddingTop:'env(safe-area-inset-top,44px)',
        transition:'background 0.3s ease' }}>
        <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
          <div onClick={onBack}
            style={{ width:32, height:32, borderRadius:16, background:C.glass1,
              border:`1px solid ${C.border}`, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
            <span style={{ color:C.white, fontSize:16 }}>←</span>
          </div>
          <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>
            즐겨찾기 역 편집
          </span>
          <div onClick={() => { onSave(list); onBack(); }}
            style={{ marginLeft:'auto', padding:'7px 16px', borderRadius:20, background:C.primary,
              cursor:'pointer' }}>
            <span style={{ fontSize:13, fontWeight:800, color:'#0E0F14', fontFamily:FF }}>완료</span>
          </div>
        </div>
      </div>

      {/* 안내 */}
      <div style={{ margin:'14px 16px 0', padding:'12px 14px', borderRadius:10,
        background:'rgba(0,186,246,0.08)', border:'1px solid rgba(0,186,246,0.2)' }}>
        <div style={{ fontSize:12, color:C.primary, fontFamily:FF, lineHeight:1.5 }}>
          💡 최대 6개까지 즐겨찾기할 수 있어요. 순서를 바꾸거나 편집·삭제할 수 있습니다.
        </div>
      </div>

      {/* 즐겨찾기 목록 */}
      <div style={{ margin:'16px 16px 0', display:'flex', flexDirection:'column', gap:8 }}>
        {list.map((s, i) => {
          const lc = LINE_OPTS.find(l => l.id === s.line)?.color ?? C.primary;
          const lineName = LINE_OPTS.find(l => l.id === s.line)?.name ?? s.line;
          return (
            <div key={s._key ?? s.id}
              style={{ background:C.card, border:`1px solid ${C.border}`,
                borderRadius:14, padding:'14px 16px',
                display:'flex', alignItems:'center', gap:12,
                transition:'background 0.3s ease' }}>

              {/* 호선 컬러 바 */}
              <div style={{ width:4, height:44, borderRadius:2,
                background:lc, flexShrink:0 }} />

              {/* 라벨 아이콘 */}
              <div style={{ width:40, height:40, borderRadius:20, flexShrink:0,
                background:`${lc}20`, border:`1px solid ${lc}35`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:11, fontWeight:900, color:lc, fontFamily:FF }}>
                  {s.label.charAt(0)}
                </span>
              </div>

              {/* 정보 */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:2 }}>
                  <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>{s.label}</span>
                  <div style={{ width:4, height:4, borderRadius:2, background:C.g[80] }} />
                  <span style={{ fontSize:11, color:C.g[70], fontFamily:FF }}>{lineName}</span>
                </div>
                <div style={{ fontSize:15, fontWeight:800, color:C.white, fontFamily:FF }}>
                  {s.name}
                </div>
                <div style={{ fontSize:11, color:C.g[70], marginTop:2 }}>{s.walk}</div>
              </div>

              {/* 액션 버튼들 */}
              <div style={{ display:'flex', flexDirection:'column', gap:4, alignItems:'center' }}>
                <div onClick={() => moveUp(i)}
                  style={{ width:26, height:26, borderRadius:6, background:C.glass1,
                    border:`1px solid ${C.border}`, display:'flex', alignItems:'center',
                    justifyContent:'center', cursor: i===0 ? 'not-allowed' : 'pointer',
                    opacity: i===0 ? 0.3 : 1, fontSize:12 }}>
                  ↑
                </div>
                <div onClick={() => moveDown(i)}
                  style={{ width:26, height:26, borderRadius:6, background:C.glass1,
                    border:`1px solid ${C.border}`, display:'flex', alignItems:'center',
                    justifyContent:'center',
                    cursor: i===list.length-1 ? 'not-allowed' : 'pointer',
                    opacity: i===list.length-1 ? 0.3 : 1, fontSize:12 }}>
                  ↓
                </div>
              </div>

              {/* 편집/삭제 */}
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <div onClick={() => openEdit(i)}
                  style={{ width:60, padding:'6px 0', borderRadius:8, background:C.glass2,
                    border:`1px solid ${C.border}`, textAlign:'center', cursor:'pointer' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:C.white, fontFamily:FF }}>편집</span>
                </div>
                <div onClick={() => setDeleteConfirm(i)}
                  style={{ width:60, padding:'6px 0', borderRadius:8,
                    background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)',
                    textAlign:'center', cursor:'pointer' }}>
                  <span style={{ fontSize:11, fontWeight:700, color:'#EF4444', fontFamily:FF }}>삭제</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* 역 추가 버튼 */}
        {list.length < 6 && (
          <div onClick={openAdd}
            style={{ background:'transparent', border:`2px dashed ${C.border}`,
              borderRadius:14, padding:'16px', display:'flex', alignItems:'center',
              justifyContent:'center', gap:10, cursor:'pointer',
              transition:'border 0.2s ease' }}>
            <div style={{ width:32, height:32, borderRadius:16, background:C.glass2,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:16, color:C.primary }}>+</span>
            </div>
            <span style={{ fontSize:14, fontWeight:700, color:C.g[60], fontFamily:FF }}>
              역 추가 ({list.length}/6)
            </span>
          </div>
        )}
      </div>

      <div style={{ height:30 }} />

      {/* 편집 바텀시트 */}
      {editIdx !== null && <EditForm isAdd={false} />}
      {showAdd     && <EditForm isAdd={true} />}

      {/* 삭제 확인 */}
      {deleteConfirm !== null && (
        <div style={{ position:'fixed', inset:0, zIndex:300 }}>
          <div onClick={() => setDeleteConfirm(null)}
            style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0,
            background:C.modalBg, borderRadius:'16px 16px 0 0',
            border:`1px solid ${C.border}`,
            padding:'24px 20px',
            paddingBottom:'calc(24px + env(safe-area-inset-bottom,0px))',
            transition:'background 0.3s ease' }}>
            <div style={{ fontSize:17, fontWeight:800, color:C.white, fontFamily:FF, marginBottom:6 }}>
              역 삭제
            </div>
            <div style={{ fontSize:13, color:C.g[60], marginBottom:20 }}>
              <b style={{ color:C.white }}>{list[deleteConfirm]?.name}</b>을(를) 즐겨찾기에서 삭제하시겠어요?
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <div onClick={() => setDeleteConfirm(null)}
                style={{ flex:1, padding:'14px', background:C.glass2,
                  border:`1px solid ${C.border}`, borderRadius:12,
                  textAlign:'center', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:700, color:C.white, fontFamily:FF }}>취소</span>
              </div>
              <div onClick={() => deleteItem(deleteConfirm)}
                style={{ flex:1, padding:'14px', background:'#EF4444',
                  borderRadius:12, textAlign:'center', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:FF }}>삭제</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── 프로필 편집 화면 ────────────────────────────────────── */
/* ── NotifToggle: masterOn 값을 prop으로 받는 독립 컴포넌트 ── */
function NotifToggle({ masterOn, value, onChange, small }) {
  var active  = masterOn && value;
  var w       = small ? 36 : 44;
  var h       = small ? 22 : 26;
  var br      = small ? 11 : 13;
  var dotW    = small ? 18 : 20;
  var dotBr   = small ? 9  : 10;
  var dotTop  = small ? 2  : 3;
  var dotOff  = small ? 20 : 23;
  var dotLeft = active ? ('calc(100% - ' + dotOff + 'px)') : (small ? 2 : 3);
  return (
    <div onClick={function(){ if(masterOn) onChange(!value); }}
      style={{ width:w, height:h, borderRadius:br,
        cursor: masterOn ? 'pointer' : 'not-allowed',
        background: active ? C.primary : C.glass2,
        border: '1px solid ' + (active ? C.primary : C.border),
        position:'relative', transition:'all 0.25s', flexShrink:0,
        opacity: masterOn ? 1 : 0.4 }}>
      <div style={{
        position:'absolute', top:dotTop, width:dotW, height:dotW,
        borderRadius:dotBr,
        background: active ? '#0E0F14' : C.g[60],
        left: dotLeft,
        transition:'left 0.25s, background 0.25s' }} />
    </div>
  );
}

/* ── NotifSectionTitle: 섹션 구분 타이틀 ── */
function NotifSectionTitle({ t, sub }) {
  return (
    <div style={{ padding:'20px 16px 8px' }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF,
        letterSpacing:'0.08em' }}>{t}</div>
      {sub ? <div style={{ fontSize:11, color:C.g[80], fontFamily:FF, marginTop:2 }}>{sub}</div> : null}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   NotificationSettingScreen — 푸시 알림 세분화 설정
══════════════════════════════════════════════════════════════ */
function NotificationSettingScreen({ onBack }) {
  /* ── 전체 알림 마스터 ── */
  const [masterOn,  setMasterOn]  = React.useState(true);

  /* ── 노선별 알림 상태 ── */
  const initLineAlerts = () => {
    const obj = {};
    SUBWAY_LINES_DATA.forEach(l => {
      obj[l.id] = { on: ['2','4','sin'].includes(l.id), congestion: true, delay: true, door: false };
    });
    return obj;
  };
  const [lineAlerts,   setLineAlerts]   = React.useState(initLineAlerts);
  const [expandedLine, setExpandedLine] = React.useState(null);

  /* ── 알림 유형 ── */
  const [typeAlerts, setTypeAlerts] = React.useState({
    lost:      true,
    community: true,
    meetup:    false,
    service:   true,
    marketing: false,
  });

  /* ── 키워드 알림 ── */
  const [keywords,    setKeywords]    = React.useState(['강남역', '지연', '혼잡', '사고']);
  const [kwInput,     setKwInput]     = React.useState('');
  const [kwFocus,     setKwFocus]     = React.useState(false);

  /* ── 방해 금지 시간 ── */
  const [quietOn,   setQuietOn]   = React.useState(true);
  const [quietFrom, setQuietFrom] = React.useState('23:00');
  const [quietTo,   setQuietTo]   = React.useState('07:00');

  /* ── 저장 애니메이션 ── */
  const [saved, setSaved] = React.useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); onBack(); }, 1000);
  };

  /* ── 헬퍼 ── */
  const toggleLine = (id) => setLineAlerts(p => ({
    ...p, [id]: { ...p[id], on: !p[id].on }
  }));
  const toggleLineSub = (id, key) => setLineAlerts(p => ({
    ...p, [id]: { ...p[id], [key]: !p[id][key] }
  }));
  const toggleType = (key) => setTypeAlerts(p => ({ ...p, [key]: !p[key] }));
  const addKeyword = () => {
    const kw = kwInput.trim();
    if (!kw || keywords.includes(kw) || keywords.length >= 10) return;
    setKeywords(p => [...p, kw]);
    setKwInput('');
  };
  const removeKeyword = (kw) => setKeywords(p => p.filter(k => k !== kw));

  /* ── 활성화된 노선 수 ── */
  var activeLineCount = Object.values(lineAlerts).filter(function(v){ return v.on; }).length;
  var activeTypeCount = Object.values(typeAlerts).filter(function(v){ return !!v; }).length;

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh',
      background:C.bg, overflow:'hidden' }}>

      {/* 저장 완료 오버레이 */}
      {saved && (
        <div style={{ position:'fixed', inset:0, zIndex:999,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(0,0,0,0.6)', backdropFilter:'blur(8px)' }}>
          <div style={{ background:C.card, borderRadius:20, padding:'28px 40px',
            textAlign:'center', border:`1px solid ${C.border}` }}>
            <div style={{ fontSize:40, marginBottom:10 }}>🔔</div>
            <div style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>저장 완료!</div>
            <div style={{ fontSize:12, color:C.g[60], fontFamily:FF, marginTop:4 }}>알림 설정이 적용되었어요</div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <div style={{ background:C.stickyBg, paddingTop:'env(safe-area-inset-top,44px)',
        flexShrink:0, borderBottom:`1px solid ${C.border}` }}>
        <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
          <button onClick={onBack}
            style={{ background:'none', border:'none', cursor:'pointer',
              fontSize:20, color:C.white, padding:4 }}>←</button>
          <span style={{ flex:1, fontSize:17, fontWeight:800, color:C.white, fontFamily:FF }}>
            알림 설정
          </span>
          <button onClick={handleSave}
            style={{ padding:'6px 16px', background:C.primary, border:'none',
              borderRadius:20, cursor:'pointer', fontSize:13, fontWeight:800,
              color:'#fff', fontFamily:FF }}>
            저장
          </button>
        </div>
      </div>

      {/* 스크롤 바디 */}
      <div style={{ flex:1, overflowY:'auto', paddingBottom:40 }}>

        {/* ── 마스터 토글 카드 ── */}
        <div style={{ margin:'16px 16px 4px', background:C.card, borderRadius:16,
          padding:'16px', border:`1px solid ${C.border}`,
          background: masterOn ? `linear-gradient(135deg,${C.primary}18,${C.card})` : C.card }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:44, height:44, borderRadius:22,
              background: masterOn ? `${C.primary}22` : C.glass1,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
              🔔
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:15, fontWeight:800, color:C.white, fontFamily:FF }}>
                푸시 알림
              </div>
              <div style={{ fontSize:12, color: masterOn ? C.primary : C.g[70], fontFamily:FF, marginTop:2 }}>
                {masterOn
                  ? `노선 ${activeLineCount}개 · 유형 ${activeTypeCount}개 활성`
                  : '모든 알림이 꺼져 있어요'}
              </div>
            </div>
            <NotifToggle masterOn={masterOn} value={masterOn} onChange={setMasterOn} />
          </div>
        </div>

        {/* ── 방해 금지 시간 ── */}
        <NotifSectionTitle t="방해 금지 시간" sub="설정한 시간대에는 모든 알림이 차단돼요" />
        <div style={{ margin:'0 16px', background:C.card, borderRadius:14,
          border:`1px solid ${C.border}`, overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14,
            padding:'14px 16px', borderBottom: quietOn ? `1px solid ${C.border}` : 'none' }}>
            <span style={{ fontSize:20 }}>🌙</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600, color:C.white, fontFamily:FF }}>방해 금지</div>
              <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:1 }}>
                {quietOn ? `${quietFrom} — ${quietTo} 사이 알림 차단` : '비활성화됨'}
              </div>
            </div>
            <NotifToggle masterOn={masterOn} value={quietOn} onChange={setQuietOn} />
          </div>
          {quietOn && (
            <div style={{ padding:'12px 16px', display:'flex', gap:12, alignItems:'center' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginBottom:4 }}>시작 시간</div>
                <select
                  value={quietFrom}
                  onChange={e => setQuietFrom(e.target.value)}
                  style={{ width:'100%', background:C.glass1, border:`1px solid ${C.border}`,
                    borderRadius:8, padding:'8px 10px', fontSize:13, color:C.white,
                    fontFamily:FF, outline:'none', cursor:'pointer' }}>
                  {['21:00','22:00','23:00','00:00'].map(t => (
                    <option key={t} value={t} style={{ background:'#1a1a2e' }}>{t}</option>
                  ))}
                </select>
              </div>
              <div style={{ fontSize:16, color:C.g[60], paddingTop:14 }}>—</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginBottom:4 }}>종료 시간</div>
                <select
                  value={quietTo}
                  onChange={e => setQuietTo(e.target.value)}
                  style={{ width:'100%', background:C.glass1, border:`1px solid ${C.border}`,
                    borderRadius:8, padding:'8px 10px', fontSize:13, color:C.white,
                    fontFamily:FF, outline:'none', cursor:'pointer' }}>
                  {['05:00','06:00','07:00','08:00','09:00'].map(t => (
                    <option key={t} value={t} style={{ background:'#1a1a2e' }}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* ── 노선별 알림 ── */}
        <NotifSectionTitle t="노선별 알림" sub="관심 노선의 혼잡도·지연 정보를 받아요" />
        <div style={{ margin:'0 16px', background:C.card, borderRadius:14,
          border:`1px solid ${C.border}`, overflow:'hidden' }}>
          {SUBWAY_LINES_DATA.map((l, idx) => {
            const la = lineAlerts[l.id] ?? { on:false, congestion:true, delay:true, door:false };
            const isExpanded = expandedLine === l.id;
            return (
              <div key={l.id} style={{ borderTop: idx > 0 ? `1px solid ${C.border}` : 'none' }}>
                {/* 노선 행 */}
                <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px',
                  cursor:'pointer', transition:'background 0.15s',
                  background: isExpanded ? C.glass1 : 'transparent' }}
                  onClick={() => la.on && setExpandedLine(isExpanded ? null : l.id)}>
                  <div style={{ width:28, height:28, borderRadius:14, background:l.color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:11, fontWeight:900, color:'#fff', fontFamily:FF, flexShrink:0 }}>
                    {l.id === 'sin' ? '신' : l.id === 'gyeong' ? '경' : l.id}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight: la.on ? 700 : 400,
                      color: la.on ? C.white : C.g[70], fontFamily:FF }}>
                      {l.name}
                    </div>
                    {la.on && (
                      <div style={{ fontSize:10, color:C.g[70], fontFamily:FF, marginTop:1 }}>
                        {[la.congestion && '혼잡도', la.delay && '지연', la.door && '열림문']
                          .filter(Boolean).join(' · ') || '세부 없음'}
                      </div>
                    )}
                  </div>
                  {la.on && (
                    <span style={{ fontSize:11, color:C.g[60], marginRight:8 }}>
                      {isExpanded ? '▲' : '▼'}
                    </span>
                  )}
                  <NotifToggle masterOn={masterOn} value={la.on} onChange={() => toggleLine(l.id)} small />
                </div>
                {/* 세부 설정 (확장 시) */}
                {isExpanded && la.on && (
                  <div style={{ background:C.glass1, padding:'10px 16px 14px', borderTop:`1px solid ${C.border}` }}>
                    {[
                      { key:'congestion', icon:'📊', label:'혼잡도 알림', desc:'실시간 혼잡 급증 시' },
                      { key:'delay',      icon:'⏱️', label:'지연·운행 알림', desc:'5분 이상 지연 발생 시' },
                      { key:'door',       icon:'🚪', label:'빠른 하차 문', desc:'탑승 전 열림 방향 안내' },
                    ].map(({ key, icon, label, desc }) => (
                      <div key={key} onClick={() => toggleLineSub(l.id, key)}
                        style={{ display:'flex', alignItems:'center', gap:12,
                          padding:'8px 4px', cursor:'pointer' }}>
                        <span style={{ fontSize:16, flexShrink:0 }}>{icon}</span>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:12, fontWeight:600, color:C.white, fontFamily:FF }}>{label}</div>
                          <div style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{desc}</div>
                        </div>
                        <div style={{ width:16, height:16, borderRadius:8,
                          background: la[key] ? C.primary : C.glass2,
                          border: `1.5px solid ${la[key] ? C.primary : C.border}`,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          transition:'all 0.2s' }}>
                          {la[key] && <span style={{ fontSize:9, color:'#0E0F14', fontWeight:900 }}>✓</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── 알림 유형 ── */}
        <NotifSectionTitle t="알림 유형" sub="받고 싶은 알림 카테고리를 선택해요" />
        <div style={{ margin:'0 16px', background:C.card, borderRadius:14,
          border:`1px solid ${C.border}`, overflow:'hidden' }}>
          {[
            { key:'lost',      icon:'🔍', label:'유실물 알림',     desc:'내가 신고한 분실물이 발견되면' },
            { key:'community', icon:'💬', label:'커뮤니티 반응',   desc:'내 글의 댓글·좋아요' },
            { key:'meetup',    icon:'🤝', label:'미트업 알림',     desc:'신청한 크루 모임 업데이트' },
            { key:'service',   icon:'📢', label:'서비스 공지',     desc:'중요 업데이트 및 점검 안내' },
            { key:'marketing', icon:'🎁', label:'혜택·이벤트',     desc:'프로모션 및 특가 정보' },
          ].map(({ key, icon, label, desc }, idx) => (
            <div key={key} onClick={() => toggleType(key)}
              style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
                borderTop: idx > 0 ? `1px solid ${C.border}` : 'none', cursor:'pointer',
                transition:'background 0.15s' }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:600, color:C.white, fontFamily:FF }}>{label}</div>
                <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:1 }}>{desc}</div>
              </div>
              <NotifToggle masterOn={masterOn} value={typeAlerts[key]} onChange={() => toggleType(key)} />
            </div>
          ))}
        </div>

        {/* ── 키워드 알림 ── */}
        <NotifSectionTitle t="키워드 알림" sub={`커뮤니티에서 키워드 언급 시 알림 (최대 10개)`} />
        <div style={{ margin:'0 16px', background:C.card, borderRadius:14,
          border:`1px solid ${C.border}`, padding:'14px 16px' }}>
          {/* 키워드 입력 */}
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', gap:8,
              background:C.glass1, border:`1.5px solid ${kwFocus ? C.primary : C.border}`,
              borderRadius:10, padding:'8px 12px', transition:'border 0.2s' }}>
              <span style={{ fontSize:14 }}>🔎</span>
              <input
                value={kwInput}
                onChange={e => setKwInput(e.target.value)}
                onFocus={() => setKwFocus(true)}
                onBlur={() => setKwFocus(false)}
                onKeyDown={e => e.key === 'Enter' && addKeyword()}
                placeholder="키워드 추가 (Enter)"
                maxLength={10}
                style={{ flex:1, background:'none', border:'none', outline:'none',
                  fontSize:13, color:C.white, fontFamily:FF }}
              />
              {kwInput && (
                <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>
                  {kwInput.length}/10
                </span>
              )}
            </div>
            <button onClick={addKeyword}
              disabled={!kwInput.trim() || keywords.length >= 10}
              style={{ padding:'0 14px', background: kwInput.trim() ? C.primary : C.glass2,
                border:'none', borderRadius:10, cursor: kwInput.trim() ? 'pointer' : 'not-allowed',
                fontSize:13, fontWeight:700, color: kwInput.trim() ? '#fff' : C.g[70],
                fontFamily:FF, transition:'all 0.2s', flexShrink:0 }}>
              추가
            </button>
          </div>

          {/* 키워드 칩 목록 */}
          {keywords.length > 0 ? (
            <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
              {keywords.map(kw => (
                <div key={kw}
                  style={{ display:'inline-flex', alignItems:'center', gap:6,
                    padding:'6px 12px', background:`${C.primary}18`,
                    border:`1px solid ${C.primary}44`, borderRadius:20 }}>
                  <span style={{ fontSize:12, fontWeight:700, color:C.primary, fontFamily:FF }}>
                    {kw}
                  </span>
                  <button onClick={() => removeKeyword(kw)}
                    style={{ background:'none', border:'none', cursor:'pointer',
                      fontSize:12, color:C.primary, opacity:0.7, padding:0,
                      lineHeight:1, fontFamily:FF }}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign:'center', padding:'16px 0',
              fontSize:13, color:C.g[70], fontFamily:FF }}>
              키워드를 추가하면 커뮤니티 언급 시 알림을 받아요
            </div>
          )}

          <div style={{ marginTop:10, fontSize:11, color:C.g[80], fontFamily:FF }}>
            {keywords.length}/10개 사용 중
          </div>
        </div>

        {/* ── 알림 미리보기 카드 ── */}
        <NotifSectionTitle t="알림 미리보기" />
        <div style={{ margin:'0 16px 40px', background:C.card, borderRadius:14,
          border:`1px solid ${C.border}`, padding:'14px 16px' }}>
          <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginBottom:10 }}>
            이런 알림을 보내드려요
          </div>
          {[
            { icon:'📊', title:'2호선 강남 방면 혼잡 급증', body:'현재 혼잡도 90% — 다음 열차 이용을 권장해요', time:'방금', color:C.line[2] ?? '#33CC66' },
            { icon:'⏱️', title:'4호선 10분 지연 운행 중', body:'당고개 방면 신호 장애로 지연 중이에요', time:'2분 전', color:C.line[4] ?? '#00A0E9' },
            { icon:'🔍', title:'‘검정 우산’ 습득 알림', body:'강남역 역무실에 보관 중인 유실물이 있어요', time:'5분 전', color:C.keyColor },
          ].map((n, i) => (
            <div key={i} style={{ display:'flex', gap:10, padding:'10px 0',
              borderTop: i>0 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ width:36, height:36, borderRadius:18,
                background:`${n.color}22`, border:`1px solid ${n.color}44`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:16, flexShrink:0 }}>
                {n.icon}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, fontWeight:700, color:C.white, fontFamily:FF,
                  marginBottom:2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                  {n.title}
                </div>
                <div style={{ fontSize:11, color:C.g[60], fontFamily:FF, lineHeight:1.4 }}>{n.body}</div>
              </div>
              <div style={{ fontSize:10, color:C.g[80], fontFamily:FF, flexShrink:0 }}>{n.time}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

function ProfileEditScreen({ onBack, onSave }) {
  const [nick,    setNick]    = React.useState('이효범');
  const [status,  setStatus]  = React.useState('강남역 2호선 맨날 타는 사람 🚇');
  const [home,    setHome]    = React.useState('양재역');
  const [work,    setWork]    = React.useState('강남역');
  const [favLines, setFavLines] = React.useState(['2', 'sin']);
  const [saved,   setSaved]   = React.useState(false);

  const LINE_OPTS = [
    { id:'1', name:'1호선', color:'#2A3E91' }, { id:'2', name:'2호선', color:'#60B157' },
    { id:'3', name:'3호선', color:'#FE8A39' }, { id:'4', name:'4호선', color:'#509DD8' },
    { id:'5', name:'5호선', color:'#7F41D8' }, { id:'9', name:'9호선', color:'#D1A946' },
    { id:'sin', name:'신분당선', color:'#BC2A38' }, { id:'gyung', name:'경의중앙', color:'#77C4A3' },
  ];

  const toggleLine = id => setFavLines(prev =>
    prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { if (onSave) onSave({ nick, status, home, work, favLines }); }, 1200);
  };

  const canSave = nick.trim().length >= 2;

  const Section = ({ title, children }) => (
    <div style={{ marginBottom:24 }}>
      <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF,
        letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10, padding:'0 16px' }}>
        {title}
      </div>
      <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
        margin:'0 16px', overflow:'hidden', transition:'background 0.3s ease' }}>
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value, onChange, placeholder, multiline, maxLen }) => (
    <div style={{ padding:'12px 16px', borderBottom:`1px solid ${C.border}` }}>
      <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginBottom:6 }}>{label}</div>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} maxLength={maxLen}
          rows={3}
          style={{ width:'100%', background:'transparent', border:'none', outline:'none',
            color:C.white, fontSize:14, fontFamily:FF, resize:'none', lineHeight:1.5,
            caretColor:C.primary, boxSizing:'border-box' }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} maxLength={maxLen}
          style={{ width:'100%', background:'transparent', border:'none', outline:'none',
            color:C.white, fontSize:14, fontFamily:FF,
            caretColor:C.primary, boxSizing:'border-box' }} />
      )}
      {maxLen && (
        <div style={{ fontSize:10, color:C.g[80], textAlign:'right', marginTop:4 }}>
          {value.length}/{maxLen}
        </div>
      )}
    </div>
  );

  if (saved) return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
      justifyContent:'center', background:C.bg, gap:16 }}>
      <div style={{ width:72, height:72, borderRadius:36,
        background:'rgba(0,186,246,0.15)', border:'2px solid rgba(0,186,246,0.4)',
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:30 }}>✅</div>
      <div style={{ fontSize:17, fontWeight:800, color:C.white, fontFamily:FF }}>저장 완료!</div>
      <div style={{ fontSize:13, color:C.g[60] }}>프로필이 업데이트되었습니다</div>
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:80, background:C.bg }}>
      {/* 헤더 */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg,
        borderBottom:`1px solid ${C.border}`, paddingTop:'env(safe-area-inset-top,44px)',
        transition:'background 0.3s ease' }}>
        <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
          <div onClick={onBack}
            style={{ width:32, height:32, borderRadius:16, background:C.glass1,
              border:`1px solid ${C.border}`, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
            <span style={{ color:C.white, fontSize:16 }}>←</span>
          </div>
          <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>프로필 편집</span>
          <div onClick={canSave ? handleSave : undefined}
            style={{ marginLeft:'auto', padding:'7px 16px', borderRadius:20,
              background: canSave ? C.primary : C.glass2, cursor: canSave ? 'pointer' : 'not-allowed' }}>
            <span style={{ fontSize:13, fontWeight:800,
              color: canSave ? '#0E0F14' : C.g[60], fontFamily:FF }}>저장</span>
          </div>
        </div>
      </div>

      {/* 아바타 */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
        padding:'28px 0 20px' }}>
        <div style={{ position:'relative' }}>
          <div style={{ width:88, height:88, borderRadius:44,
            background:`linear-gradient(135deg, ${C.primary}, #7C3AED)`,
            display:'flex', alignItems:'center', justifyContent:'center',
            border:`3px solid ${C.border}`, fontSize:32 }}>
            👤
          </div>
          <div style={{ position:'absolute', bottom:0, right:0, width:28, height:28,
            borderRadius:14, background:C.primary,
            border:`2px solid ${C.stickyBg}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', fontSize:13 }}>
            📷
          </div>
        </div>
        <div style={{ fontSize:12, color:C.g[60], marginTop:10, fontFamily:FF }}>
          프로필 사진 변경
        </div>
      </div>

      {/* 기본 정보 */}
      <Section title="기본 정보">
        <Field label="닉네임" value={nick} onChange={setNick}
          placeholder="닉네임 입력 (2~12자)" maxLen={12} />
        <Field label="상태메시지" value={status} onChange={setStatus}
          placeholder="나를 표현하는 한 마디" maxLen={50} multiline />
      </Section>

      {/* 주요 역 */}
      <Section title="주요 역">
        <div style={{ borderBottom:`1px solid ${C.border}` }}>
          <Field label="🏠 집 근처 역" value={home} onChange={setHome}
            placeholder="ex) 양재역" />
        </div>
        <Field label="🏢 직장/학교 근처 역" value={work} onChange={setWork}
          placeholder="ex) 강남역" />
      </Section>

      {/* 관심 노선 */}
      <div style={{ marginBottom:24, padding:'0 16px' }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF,
          letterSpacing:'0.08em', marginBottom:10 }}>관심 노선</div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {LINE_OPTS.map(l => {
            const act = favLines.includes(l.id);
            return (
              <div key={l.id} onClick={() => toggleLine(l.id)}
                style={{ display:'flex', alignItems:'center', gap:7, padding:'8px 14px',
                  borderRadius:20, cursor:'pointer', transition:'all 0.2s',
                  background: act ? `${l.color}22` : C.card,
                  border:`1px solid ${act ? l.color : C.border}` }}>
                <div style={{ width:9, height:9, borderRadius:5, background:l.color }} />
                <span style={{ fontSize:12, fontWeight:700, fontFamily:FF,
                  color: act ? C.white : C.g[70] }}>{l.name}</span>
                {act && <span style={{ fontSize:10, color:l.color }}>✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 저장 버튼 (하단 고정) */}
      <div style={{ position:'fixed', bottom:0, left:0, right:0, padding:'12px 16px',
        background:C.stickyBg, borderTop:`1px solid ${C.border}`,
        paddingBottom:'calc(12px + env(safe-area-inset-bottom,0px))' }}>
        <div onClick={canSave ? handleSave : undefined}
          style={{ padding:'15px', background: canSave ? C.primary : C.glass2,
            borderRadius:12, textAlign:'center', cursor: canSave ? 'pointer' : 'not-allowed' }}>
          <span style={{ fontSize:15, fontWeight:800,
            color: canSave ? '#0E0F14' : C.g[60], fontFamily:FF }}>
            프로필 저장하기
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── 설정 화면 ────────────────────────────────────────────── */
function SettingScreen({ onBack, onEditProfile, onFavEdit, isDark, themeMode, onThemeMode }) {
  var masterOn = true;  // 설정 화면의 모든 토글은 항상 활성 상태
  const [notifOn,         setNotifOn]         = React.useState(true);
  const [vibOn,           setVibOn]           = React.useState(true);
  const [autoRoute,       setAutoRoute]       = React.useState(false);
  const [dataMode,        setDataMode]        = React.useState(false);
  const [showLogout,      setShowLogout]      = React.useState(false);
  const [showLeave,       setShowLeave]       = React.useState(false);
  const [showNotifSetting,setShowNotifSetting]= React.useState(false);

  /* 알림 설정 화면으로 이동 */
  if (showNotifSetting) {
    return <NotificationSettingScreen onBack={() => setShowNotifSetting(false)} />;
  }

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)}
      style={{ width:44, height:26, borderRadius:13, cursor:'pointer', flexShrink:0,
        background: value ? C.primary : C.glass2,
        border:`1px solid ${value ? C.primary : C.border}`,
        position:'relative', transition:'all 0.25s ease' }}>
      <div style={{ position:'absolute', top:3, width:20, height:20, borderRadius:10,
        background: value ? '#0E0F14' : C.g[60],
        left: value ? 'calc(100% - 23px)' : 3,
        transition:'left 0.25s ease, background 0.25s ease' }} />
    </div>
  );

  const SectionTitle = ({ t }) => (
    <div style={{ fontSize:11, fontWeight:700, color:C.g[70], fontFamily:FF,
      letterSpacing:'0.08em', padding:'20px 16px 8px' }}>
      {t}
    </div>
  );

  const SettRow = ({ icon, label, desc, right, onClick, danger }) => (
    <div onClick={onClick}
      style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
        borderBottom:`1px solid ${C.border}`,
        cursor: onClick ? 'pointer' : 'default',
        transition:'background 0.15s' }}>
      <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:14, fontWeight:600, fontFamily:FF,
          color: danger ? '#EF4444' : C.white }}>{label}</div>
        {desc && <div style={{ fontSize:11, color:C.g[70], marginTop:2 }}>{desc}</div>}
      </div>
      {right}
    </div>
  );

  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:40, background:C.bg }}>
      {/* 헤더 */}
      <div style={{ position:'sticky', top:0, zIndex:100, background:C.stickyBg,
        borderBottom:`1px solid ${C.border}`, paddingTop:'env(safe-area-inset-top,44px)',
        transition:'background 0.3s ease' }}>
        <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px', gap:12 }}>
          <div onClick={onBack}
            style={{ width:32, height:32, borderRadius:16, background:C.glass1,
              border:`1px solid ${C.border}`, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
            <span style={{ color:C.white, fontSize:16 }}>←</span>
          </div>
          <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>설정</span>
        </div>
      </div>

      {/* 프로필 카드 */}
      <div onClick={onEditProfile}
        style={{ margin:'16px', background:C.card,
          border:`1px solid ${C.border}`, borderRadius:16,
          padding:'16px', display:'flex', alignItems:'center', gap:14, cursor:'pointer',
          transition:'background 0.3s ease' }}>
        <div style={{ width:56, height:56, borderRadius:28,
          background:`linear-gradient(135deg, ${C.primary}, #7C3AED)`,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
          flexShrink:0 }}>
          👤
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>이효범</div>
          <div style={{ fontSize:12, color:C.g[60], marginTop:2 }}>강남역 2호선 맨날 타는 사람 🚇</div>
          <div style={{ fontSize:11, color:C.primary, marginTop:4, fontWeight:600 }}>
            hb.lee@bodycodi.com
          </div>
        </div>
        <span style={{ fontSize:18, color:C.g[60] }}>›</span>
      </div>

      {/* 앱 설정 */}
      <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
        margin:'0 16px', overflow:'hidden', transition:'background 0.3s ease' }}>
        <NotifSectionTitle t="앱 설정" />
        {/* 테마 설정 — 라이트 / 다크 / 시스템 */}
        <div style={{ padding:'14px 16px', borderBottom:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <span style={{ fontSize:18 }}>{isDark ? '🌙' : '☀️'}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.white, fontFamily:FF }}>화면 모드</div>
              <div style={{ fontSize:11, color:C.g[70], fontFamily:FF, marginTop:2 }}>
                {themeMode === 'dark' ? '다크 모드 적용 중'
                  : themeMode === 'light' ? '라이트 모드 적용 중'
                  : '시스템 설정에 따름'}
              </div>
            </div>
          </div>
          {/* 세그먼트 버튼 */}
          <div style={{ display:'flex', gap:6 }}>
            {[
              { mode:'light',  icon:'☀️',  label:'라이트' },
              { mode:'dark',   icon:'🌙',  label:'다크'   },
              { mode:'system', icon:'📱',  label:'시스템' },
            ].map(function(item) {
              var act = themeMode === item.mode;
              return (
                <div key={item.mode}
                  onClick={function() { onThemeMode && onThemeMode(item.mode); }}
                  style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center',
                    gap:4, padding:'10px 8px', borderRadius:12, cursor:'pointer',
                    transition:'all 0.2s',
                    background: act ? C.primary + '22' : C.glass1,
                    border:'1.5px solid ' + (act ? C.primary : C.border) }}>
                  <span style={{ fontSize:18 }}>{item.icon}</span>
                  <span style={{ fontSize:11, fontWeight: act ? 800 : 500,
                    color: act ? C.primary : C.g[60], fontFamily:FF }}>
                    {item.label}
                  </span>
                  {act && (
                    <div style={{ width:4, height:4, borderRadius:2,
                      background:C.primary }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <SettRow icon="🔔" label="푸시 알림"
          desc={notifOn ? '실시간 알림 수신 중 · 탭해서 세부 설정' : '알림 꺼짐'}
          onClick={() => setShowNotifSetting(true)}
          right={
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <NotifToggle masterOn={masterOn} value={notifOn} onChange={setNotifOn} />
              <span style={{ fontSize:12, color:C.g[60] }}>›</span>
            </div>
          }
        />
        <SettRow icon="📳" label="진동"
          desc="알림 수신 시 진동"
          right={<NotifToggle masterOn={masterOn} value={vibOn} onChange={setVibOn} />}
        />
        <SettRow icon="🗺️" label="자동 경로 추천"
          desc="즐겨찾기 역 기반 자동 안내"
          right={<NotifToggle masterOn={masterOn} value={autoRoute} onChange={setAutoRoute} />}
        />
        <SettRow icon="📡" label="데이터 절약 모드"
          desc={dataMode ? '이미지 로딩 최소화' : '일반 화질'}
          right={<NotifToggle masterOn={masterOn} value={dataMode} onChange={setDataMode} />}
        />
      </div>

      {/* 계정 */}
      <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
        margin:'16px 16px 0', overflow:'hidden', transition:'background 0.3s ease' }}>
        <NotifSectionTitle t="계정" />
        <SettRow icon="📧" label="이메일"
          desc="hb.lee@bodycodi.com"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="🔒" label="비밀번호 변경"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="🔗" label="소셜 계정 연결"
          desc="카카오, 구글, 애플"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="🚇" label="자주 타는 노선 설정"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={onFavEdit} />
      </div>

      {/* 개인정보 */}
      <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
        margin:'16px 16px 0', overflow:'hidden', transition:'background 0.3s ease' }}>
        <NotifSectionTitle t="개인정보 & 보안" />
        <SettRow icon="👁️" label="공개 범위 설정"
          desc="프로필/글/댓글 공개 여부"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="🚫" label="차단 사용자 관리"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="🗑️" label="활동 데이터 삭제"
          desc="검색 기록, 최근 본 역 초기화"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
      </div>

      {/* 지원 */}
      <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
        margin:'16px 16px 0', overflow:'hidden', transition:'background 0.3s ease' }}>
        <NotifSectionTitle t="지원" />
        <SettRow icon="📋" label="이용약관"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="🔐" label="개인정보처리방침"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="💬" label="문의하기"
          desc="고객센터 운영시간: 평일 10:00~18:00"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="⭐" label="앱 평가하기"
          right={<span style={{ fontSize:12, color:C.g[70] }}>›</span>}
          onClick={() => {}} />
        <SettRow icon="📱" label="앱 버전"
          desc="v2.4.1 (최신 버전)"
          right={<span style={{ fontSize:11, color:C.keyColor, fontWeight:700 }}>최신</span>}
        />
      </div>

      {/* 로그아웃/탈퇴 */}
      <div style={{ background:C.card, borderRadius:12, border:`1px solid ${C.border}`,
        margin:'16px 16px 0', overflow:'hidden', transition:'background 0.3s ease' }}>
        <SettRow icon="🚪" label="로그아웃" danger
          onClick={() => setShowLogout(true)}
          right={<span style={{ fontSize:12, color:'#EF4444' }}>›</span>}
        />
        <SettRow icon="⚠️" label="회원 탈퇴" danger
          desc="탈퇴 시 모든 데이터가 삭제됩니다"
          onClick={() => setShowLeave(true)}
          right={<span style={{ fontSize:12, color:'#EF4444' }}>›</span>}
        />
      </div>

      <div style={{ height:32 }} />

      {/* 로그아웃 확인 모달 */}
      {showLogout && (
        <div style={{ position:'fixed', inset:0, zIndex:300 }}>
          <div onClick={() => setShowLogout(false)}
            style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.65)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0,
            background:C.modalBg, borderRadius:'16px 16px 0 0',
            border:`1px solid ${C.border}`,
            padding:'24px 20px', paddingBottom:'calc(24px + env(safe-area-inset-bottom,0px))',
            transition:'background 0.3s ease' }}>
            <div style={{ fontSize:18, fontWeight:800, color:C.white,
              fontFamily:FF, marginBottom:8 }}>로그아웃</div>
            <div style={{ fontSize:13, color:C.g[60], marginBottom:24 }}>
              정말 로그아웃 하시겠어요?
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <div onClick={() => setShowLogout(false)}
                style={{ flex:1, padding:'14px', background:C.glass2,
                  border:`1px solid ${C.border}`, borderRadius:12,
                  textAlign:'center', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:700, color:C.white, fontFamily:FF }}>취소</span>
              </div>
              <div onClick={() => setShowLogout(false)}
                style={{ flex:1, padding:'14px', background:'#EF4444',
                  borderRadius:12, textAlign:'center', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:700, color:'#fff', fontFamily:FF }}>로그아웃</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 확인 모달 */}
      {showLeave && (
        <div style={{ position:'fixed', inset:0, zIndex:300 }}>
          <div onClick={() => setShowLeave(false)}
            style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.65)' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0,
            background:C.modalBg, borderRadius:'16px 16px 0 0',
            border:`1px solid ${C.border}`,
            padding:'24px 20px', paddingBottom:'calc(24px + env(safe-area-inset-bottom,0px))',
            transition:'background 0.3s ease' }}>
            <div style={{ fontSize:18, fontWeight:800, color:'#EF4444',
              fontFamily:FF, marginBottom:8 }}>⚠️ 회원 탈퇴</div>
            <div style={{ fontSize:13, color:C.g[60], lineHeight:1.6, marginBottom:8 }}>
              탈퇴 시 아래 데이터가 모두 삭제됩니다:
            </div>
            {['작성한 모든 게시글/댓글', '즐겨찾기 역 · 경로', '커뮤니티 포인트 · 뱃지'].map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:8,
                padding:'6px 0', borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:'#EF4444', fontSize:12 }}>✕</span>
                <span style={{ fontSize:12, color:C.g[60] }}>{item}</span>
              </div>
            ))}
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              <div onClick={() => setShowLeave(false)}
                style={{ flex:1, padding:'14px', background:C.glass2,
                  border:`1px solid ${C.border}`, borderRadius:12,
                  textAlign:'center', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:700, color:C.white, fontFamily:FF }}>취소</span>
              </div>
              <div onClick={() => setShowLeave(false)}
                style={{ flex:1, padding:'14px', background:'#7F1D1D',
                  borderRadius:12, textAlign:'center', cursor:'pointer' }}>
                <span style={{ fontSize:14, fontWeight:700, color:'#FCA5A5', fontFamily:FF }}>탈퇴하기</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MyScreen({ isDark, themeMode, onThemeMode }) {
  const [actSubTab,    setActSubTab]    = useState('좋아요');
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSettings,   setShowSettings]   = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showFavEdit,    setShowFavEdit]    = useState(false);
  const [pubToggles, setPubToggles] = useState({
    profile: true, email: false, genderAge: false, posts: true, comments: false,
  });

  /* ── 목 데이터 ─────────────────────────────────────────── */
  const [FAV_STATIONS, setFavStations] = React.useState([
    { id:1, label:'집',   name:'양재역', line:'s3', walk:'도보 3분' },
    { id:2, label:'회사', name:'강남역', line:'s2', walk:'도보 1분' },
    { id:3, label:'학교', name:'신촌역', line:'s2', walk:'도보 5분' },
    { id:4, label:'+추가', name:null,   line:null,  walk:null       },
  ]);
  const QUICK_LINKS = [
    { id:'msg',   label:'쪽지',    badge:3  },
    { id:'alarm', label:'알림',    badge:12 },
    { id:'comm',  label:'커뮤니티', badge:0  },
    { id:'civil', label:'민원',    badge:0  },
    { id:'delay', label:'지연센터', badge:0  },
  ];
  const MY_STORIES = [
    { id:1, nick:'이효범', station:'강남역',   caption:'강남 벚꽃 진짜 장난 아님', lineId:'2',   bg:'#1A1B22' },
    { id:2, nick:'이효범', station:'판교역',   caption:'출근길 꿀팁 정리해봤어요',  lineId:'sin', bg:'#1E1A28' },
    { id:3, nick:'이효범', station:'여의도역', caption:'퇴근길 노을 뷰 맛집',       lineId:'5',   bg:'#1C1810' },
  ];
  const LIKED_POSTS = [
    { id:1, title:'강남역 2호선 승강장 혼잡도 오늘 진짜 심각합니다', cat:'ISSUE',   time:'3분 전',  lineId:'2'   },
    { id:2, title:'선릉역 근처 점심 맛집 추천 받습니다',             cat:'FREE',    time:'15분 전', lineId:'2'   },
    { id:3, title:'신분당선 판교역 스타벅스 아침마다 20분 대기',     cat:'FREE',    time:'2시간 전', lineId:'sin' },
  ];
  const MY_POSTS = [
    { id:4, title:'강남역 2호선 오늘 아침 진짜 너무 밀렸어요 ㅠ',  tag:'이슈', tagColor:'#EF4444', time:'3분 전',   lineId:'2',   likes:24,  comments:8,  writer:'이효범', thumb:'linear-gradient(145deg,#7F1D1D,#450A0A)' },
    { id:5, title:'판교역 신분당선 빠른 하차 꿀팁 정리해봤어요',    tag:'꿀팁', tagColor:'#34D399', time:'1시간 전', lineId:'sin', likes:57,  comments:19, writer:'이효범', thumb:'linear-gradient(145deg,#064E3B,#022C22)' },
    { id:6, title:'강남역 편의시설 총정리 - 화장실·엘리베이터·ATM', tag:'정보', tagColor:'#00BAF6', time:'어제',    lineId:'2',   likes:88,  comments:33, writer:'이효범', thumb:'linear-gradient(145deg,#0C4A6E,#082F49)' },
  ];
  const BOOKMARKED = [
    { id:1, title:'5호선 오늘도 연착... 왜 항상 이러는건지',   cat:'ISSUE',   time:'32분 전',  lineId:'5' },
    { id:2, title:'2호선 성수행 빠른 하차 위치 총정리',       cat:'INSIGHT', time:'1시간 전', lineId:'2' },
  ];
  const ROUTES = [
    { id:1, from:'양재역', to:'강남역', line:'3호선→2호선', mins:8  },
    { id:2, from:'강남역', to:'판교역', line:'신분당선',    mins:15 },
  ];
  const PEOPLE = [
    { id:1, nick:'판교개발자', station:'판교역',   match:82 },
    { id:2, nick:'강남러버',   station:'강남역',   match:75 },
    { id:3, nick:'여의도man',  station:'여의도역', match:68 },
  ];
  const PUB_ITEMS = [
    { key:'profile',   label:'프로필 전체 공개', desc:'기본 계정 정보를 모두에게 공개' },
    { key:'email',     label:'이메일 공개',       desc:'프로필에 이메일 주소 표시' },
    { key:'genderAge', label:'성별/연령대 공개',  desc:'성별과 연령대를 프로필에 표시' },
    { key:'posts',     label:'작성 글 공개',      desc:'내가 쓴 게시글을 프로필에 노출' },
    { key:'comments',  label:'작성 댓글 공개',    desc:'내가 쓴 댓글을 프로필에 노출' },
  ];
  const POLICY_LINKS = [
    { label:'이용약관',         value:null      },
    { label:'개인정보처리방침', value:null      },
    { label:'고객센터',         value:null      },
    { label:'앱 버전',          value:'v2.4.1'  },
  ];

  const togglePub = key => setPubToggles(p => ({ ...p, [key]: !p[key] }));

  /* ── 화면 라우팅 */
  if (showFavEdit) {
    return (
      <FavEditScreen
        stations={FAV_STATIONS}
        onBack={() => setShowFavEdit(false)}
        onSave={updated => {
          // 편집 완료 시 즐겨찾기 목록 업데이트
          const placeholder = { id:99, label:'+추가', name:null, line:null, walk:null };
          setFavStations([...updated.slice(0,4), placeholder].slice(0,4));
          setShowFavEdit(false);
        }}
      />
    );
  }
  if (showProfileEdit) {
    return (
      <ProfileEditScreen
        onBack={() => setShowProfileEdit(false)}
        onSave={() => setShowProfileEdit(false)}
      />
    );
  }
  if (showSettings) {
    return (
      <SettingScreen
        onBack={() => setShowSettings(false)}
        onEditProfile={() => { setShowSettings(false); setShowProfileEdit(true); }}
        onFavEdit={() => { setShowSettings(false); setShowFavEdit(true); }}
        isDark={isDark}
        themeMode={themeMode}
        onThemeMode={onThemeMode}
      />
    );
  }
  if (selectedUser) {
    return <UserProfileScreen nick={selectedUser} onBack={() => setSelectedUser(null)} />;
  }
  if (selectedPost) {
    return (
      <PostDetailScreen
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onUser={nick => { setSelectedPost(null); setSelectedUser(nick); }}
      />
    );
  }

  /* ── 탭 렌더러 ─────────────────────────────────────────── */

  /* ① 개요 */
  const renderOverview = () => (
    <>
      {/* 내 스토리 */}
      <div style={{ margin:'16px 0 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between',
          alignItems:'center', padding:'0 16px', marginBottom:10 }}>
          <span style={{ fontSize:16, fontWeight:800, color:C.white,
            fontFamily:FF, letterSpacing:'-0.03em' }}>내 스토리</span>
          <span style={{ fontSize:12, color:C.g[60], fontFamily:FF, cursor:'pointer' }}>관리 ›</span>
        </div>
        <div style={{ display:'flex', gap:8, padding:'0 16px',
          overflowX:'auto', scrollbarWidth:'none' }}>
          {MY_STORIES.map(st => (
            <div key={st.id}
              style={{ flexShrink:0, width:128, height:192,
                borderRadius:14, overflow:'hidden', position:'relative',
                cursor:'pointer', background:st.bg,
                border:`1px solid rgba(255,255,255,0.07)` }}>
              {/* 상단 그라디언트 */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:64, zIndex:2,
                background:'linear-gradient(to bottom,rgba(0,0,0,0.55),transparent)',
                pointerEvents:'none' }} />
              {/* 하단 그라디언트 */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:72, zIndex:2,
                background:'linear-gradient(to top,rgba(0,0,0,0.72),transparent)',
                pointerEvents:'none' }} />
              {/* 좌상단: 호선 배지 + 닉네임 */}
              <div style={{ position:'absolute', top:9, left:9,
                display:'flex', alignItems:'center', gap:5, zIndex:3 }}>
                <div style={{ width:24, height:24, borderRadius:12, flexShrink:0,
                  background: C.line[st.lineId] ?? C.primary,
                  border:'1.5px solid rgba(255,255,255,0.45)',
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:9, fontWeight:900, color:'#fff', fontFamily:FF }}>
                    {SUBWAY_LINES_DATA.find(l => l.id === st.lineId)?.short ?? st.lineId}
                  </span>
                </div>
                <span style={{ fontSize:10, color:'rgba(255,255,255,0.92)',
                  fontFamily:FF, fontWeight:700,
                  textShadow:'0 1px 4px rgba(0,0,0,0.7)',
                  maxWidth:78, overflow:'hidden',
                  textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {st.nick}
                </span>
              </div>
              {/* 중앙 호선 원형 배지 */}
              <div style={{ position:'absolute', top:'50%', left:'50%',
                transform:'translate(-50%,-58%)', zIndex:1,
                width:52, height:52, borderRadius:26,
                background: C.line[st.lineId] ?? C.primary,
                display:'flex', alignItems:'center', justifyContent:'center',
                border:'2px solid rgba(255,255,255,0.2)' }}>
                <span style={{ fontSize:17, fontWeight:900, color:'#fff', fontFamily:FF }}>
                  {SUBWAY_LINES_DATA.find(l => l.id === st.lineId)?.short ?? st.lineId}
                </span>
              </div>
              {/* 하단: 캡션 + 역명 */}
              <div style={{ position:'absolute', bottom:9, left:9, right:9, zIndex:3 }}>
                <div style={{ fontSize:10, fontWeight:700,
                  color:'rgba(255,255,255,0.9)', fontFamily:FF, lineHeight:1.4,
                  textShadow:'0 1px 4px rgba(0,0,0,0.8)',
                  overflow:'hidden', display:'-webkit-box',
                  WebkitLineClamp:2, WebkitBoxOrient:'vertical' }}>
                  {st.caption}
                </div>
                <div style={{ fontSize:9, color:'rgba(255,255,255,0.5)',
                  marginTop:3, fontFamily:FF }}>
                  {st.station}
                </div>
              </div>
            </div>
          ))}
          {/* 새 스토리 추가 카드 */}
          <div style={{ flexShrink:0, width:128, height:192, borderRadius:14,
            border:`1.5px dashed rgba(255,255,255,0.13)`,
            background:'rgba(255,255,255,0.03)',
            display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center',
            gap:8, cursor:'pointer' }}>
            <div style={{ width:38, height:38, borderRadius:19,
              background:`${C.primary}18`, border:`1.5px solid ${C.primary}44`,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ fontSize:20, color:C.primary, lineHeight:1 }}>＋</span>
            </div>
            <span style={{ fontSize:11, color:C.g[70], fontFamily:FF,
              fontWeight:600, textAlign:'center', lineHeight:1.5 }}>
              {'새 스토리\n추가하기'}
            </span>
          </div>
        </div>
      </div>

      <Div8 h={16} />

      {/* 빠른 링크 */}
      <div style={{ margin:'0 16px' }}>
        <SecHead title="빠른 링크" />
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          {QUICK_LINKS.map(q => (
            <div key={q.id} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6, cursor:'pointer' }}>
              <div style={{ position:'relative', width:48, height:48, borderRadius:14,
                background:C.glass1, border:`1px solid ${C.border}`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:11, fontWeight:800, color:C.g[60], fontFamily:FF }}>{q.label.charAt(0)}</span>
                {q.badge > 0 && (
                  <div style={{ position:'absolute', top:-4, right:-4, minWidth:16, height:16,
                    borderRadius:8, background:C.red, display:'flex', alignItems:'center',
                    justifyContent:'center', padding:'0 3px', border:'2px solid #0E0F14' }}>
                    <span style={{ fontSize:9, fontWeight:800, color:'#fff' }}>{q.badge}</span>
                  </div>
                )}
              </div>
              <span style={{ fontSize:10, color:C.g[70], fontFamily:FF }}>{q.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Div8 h={16} />

      {/* 출석 체크 카드 */}
      <div style={{ margin:'0 16px' }}>
        <DCard style={{ padding:0, overflow:'hidden' }}>
          <div style={{ height:48, background:'rgba(255,255,255,0.03)', borderBottom:`1px solid ${C.border}`,
            display:'flex', alignItems:'center', padding:'0 16px' }}>
            <span style={{ fontSize:11, fontWeight:700, color:C.primary, fontFamily:FF }}>출석 이벤트</span>
          </div>
          <div style={{ padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:C.white, fontFamily:FF, marginBottom:2 }}>
                오늘 출석하고 최대 5,000P 받기
              </div>
              <div style={{ fontSize:11, color:C.g[70] }}>연속 3일 출석 중</div>
            </div>
            <div style={{ padding:'8px 16px', background:C.white, borderRadius:20, cursor:'pointer', flexShrink:0 }}>
              <span style={{ fontSize:12, fontWeight:800, color:'#0E0F14', fontFamily:FF }}>출석하기</span>
            </div>
          </div>
        </DCard>
      </div>
    </>
  );

  /* ② 이동관리 */
  const renderMovement = () => (
    <>
      {/* 즐겨찾는 역 4슬롯 */}
      <div style={{ margin:'16px 16px 0' }}>
        <SecHead title="즐겨찾는 역" action="편집 ›" onAction={() => setShowFavEdit(true)} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          {FAV_STATIONS.map(s => (
            <div key={s.id}
              onClick={() => setShowFavEdit(true)}
              style={{ background:C.card,
              border: s.name ? `1px solid ${C.border}` : `1px dashed ${C.border}`,
              borderRadius:14, padding:'12px 14px',
              display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
              {s.name ? (
                <>
                  <div style={{ width:38, height:38, borderRadius:19, flexShrink:0,
                    background:`${C.line[s.line]}22`,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontSize:11, fontWeight:800, color:C.line[s.line] ?? C.primary, fontFamily:FF }}>{s.label.charAt(0)}</span>
                  </div>
                  <div>
                    <div style={{ fontSize:10, color:C.g[70], marginBottom:2 }}>{s.label}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>{s.name}</div>
                    <div style={{ fontSize:10, color:C.g[70], marginTop:1 }}>{s.walk}</div>
                  </div>
                </>
              ) : (
                <div style={{ flex:1, display:'flex', alignItems:'center',
                  justifyContent:'center', gap:6, opacity:0.45 }}>
                  <span style={{ fontSize:22, color:C.g[70] }}>+</span>
                  <span style={{ fontSize:12, color:C.g[70], fontFamily:FF }}>역 추가</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Div8 h={16} />

      {/* 출퇴근 코치 */}
      <div style={{ margin:'0 16px' }}>
        <SecHead title="출퇴근 코치" />
        <div style={{ background:C.card,
          border:`1px solid ${C.border}`, borderRadius:8, padding:'14px 16px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
            <div style={{ width:8, height:8, borderRadius:4, background:C.keyColor }} />
            <span style={{ fontSize:13, fontWeight:800, color:C.white, fontFamily:FF }}>오늘 출근길 가이던스</span>
          </div>
          <div style={{ fontSize:12, color:C.g[50], lineHeight:1.65, marginBottom:12 }}>
            강남 → 광화문 · 08:12 출발 권장 (21분 후)<br />
            현재 2호선 내선 혼잡 예상 → 신분당선 환승 권장
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ flex:1, padding:'9px 0', background:'rgba(0,186,246,0.15)',
              borderRadius:8, textAlign:'center', cursor:'pointer' }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.primary, fontFamily:FF }}>대체 경로 보기</span>
            </div>
            <div style={{ flex:1, padding:'9px 0', background:C.glass1,
              borderRadius:8, textAlign:'center', cursor:'pointer', border:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.g[60], fontFamily:FF }}>설정 변경</span>
            </div>
          </div>
        </div>
      </div>

      <Div8 h={16} />

      {/* 즐겨찾기 경로 */}
      <div style={{ margin:'0 16px' }}>
        <SecHead title="즐겨찾기 경로" action="경로 추가 ›" />
        <DCard style={{ padding:'4px 16px' }}>
          {ROUTES.map((r, i) => (
            <div key={r.id} style={{ display:'flex', alignItems:'center',
              justifyContent:'space-between', padding:'11px 0',
              borderBottom: i < ROUTES.length-1 ? `1px solid ${C.border}` : 'none',
              cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>{r.from}</span>
                <span style={{ fontSize:11, color:C.g[70] }}>→</span>
                <span style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF }}>{r.to}</span>
                <Tag t={r.line} bg='rgba(255,255,255,0.07)' col={C.g[60]} fw={600} />
              </div>
              <span style={{ fontSize:12, color:C.primary, fontWeight:700 }}>{r.mins}분</span>
            </div>
          ))}
        </DCard>
      </div>

      <Div8 h={16} />

      {/* 경로 기반 인맥 추천 */}
      <div style={{ margin:'0 16px' }}>
        <SecHead title="경로 기반 인맥 추천" action="전체 ›" />
        <div style={{ display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none' }}>
          {PEOPLE.map(p => (
            <DCard key={p.id} style={{ flexShrink:0, width:128, padding:'14px 12px', textAlign:'center' }}>
              <div style={{ width:44, height:44, borderRadius:22,
                background:'rgba(255,255,255,0.08)',
                margin:'0 auto 8px', display:'flex', alignItems:'center',
                justifyContent:'center' }}><span style={{ fontSize:14, fontWeight:800, color:C.g[60], fontFamily:FF }}>{p.nick.charAt(0)}</span></div>
              <div style={{ fontSize:13, fontWeight:700, color:C.white, fontFamily:FF, marginBottom:2 }}>{p.nick}</div>
              <div style={{ fontSize:10, color:C.g[70], marginBottom:6 }}>{p.station}</div>
              <div style={{ fontSize:11, color:C.keyColor, fontWeight:700, marginBottom:8 }}>
                경로 일치 {p.match}%
              </div>
              <div style={{ padding:'6px 0', background:'rgba(0,186,246,0.12)',
                borderRadius:6, cursor:'pointer' }}>
                <span style={{ fontSize:11, fontWeight:700, color:C.primary, fontFamily:FF }}>메시지</span>
              </div>
            </DCard>
          ))}
        </div>
      </div>

      <Div8 h={16} />

      {/* 지연 증빙 생성 */}
      <div style={{ margin:'0 16px' }}>
        <SecHead title="지연 증빙 생성" />
        <DCard>
          <div style={{ fontSize:12, color:C.g[70], lineHeight:1.6, marginBottom:12 }}>
            지연 상황을 선택하면 증빙 텍스트를 자동 생성해 드려요
          </div>
          <div style={{ display:'flex', gap:7, marginBottom:12, flexWrap:'wrap' }}>
            {['2호선 지연', '신분당선 지연', '직접 입력'].map(opt => (
              <div key={opt} style={{ padding:'6px 13px', borderRadius:20,
                border:`1px solid ${C.border}`, cursor:'pointer' }}>
                <span style={{ fontSize:11, color:C.g[60], fontFamily:FF }}>{opt}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:'10px 14px', background:'rgba(255,255,255,0.04)',
            borderRadius:8, border:`1px solid ${C.border}`,
            fontSize:12, color:C.g[50], lineHeight:1.65, marginBottom:12 }}>
            2호선 내선 강남역 출발 기준 약 12분 지연이 발생하여 도착이 늦어졌음을 알립니다.
            (2026.03.08 08:32 기준)
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <div style={{ flex:1, padding:'10px 0', background:C.white,
              borderRadius:8, textAlign:'center', cursor:'pointer' }}>
              <span style={{ fontSize:12, fontWeight:800, color:'#0E0F14', fontFamily:FF }}>복사하기</span>
            </div>
            <div style={{ flex:1, padding:'10px 0', background:C.glass1,
              borderRadius:8, textAlign:'center', cursor:'pointer', border:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12, fontWeight:700, color:C.g[60], fontFamily:FF }}>공유하기</span>
            </div>
          </div>
        </DCard>
      </div>
    </>
  );

  /* ③ 활동기록 */
  const renderActivity = () => {
    const ACT_TABS = ['좋아요', '북마크', '내가 쓴 글', '내 스토리'];
    const listData = actSubTab === '좋아요' ? LIKED_POSTS : actSubTab === '북마크' ? BOOKMARKED : actSubTab === '내가 쓴 글' ? MY_POSTS : [];

    return (
      <>
        {/* 서브탭 */}
        <div style={{ display:'flex', gap:6, padding:'16px 16px 0' }}>
          {ACT_TABS.map(t => {
            const isAct = t === actSubTab;
            return (
              <div key={t} onClick={() => setActSubTab(t)}
                style={{ padding:'6px 16px', borderRadius:20, cursor:'pointer', fontFamily:FF,
                  fontSize:12, fontWeight:700,
                  background: isAct ? C.white : 'transparent',
                  color: isAct ? '#0E0F14' : C.g[70],
                  border:`1px solid ${isAct ? C.white : C.border}` }}>
                {t}
              </div>
            );
          })}
        </div>

        {actSubTab === '내 스토리' ? (
          <div style={{ padding:'16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:2 }}>
              {MY_STORIES.map(st => (
                <div key={st.id}
                  style={{ aspectRatio:'1', background:C.glass1,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    cursor:'pointer', position:'relative' }}>
                  <span style={{ fontSize:12, fontWeight:900, color:'rgba(255,255,255,0.7)', fontFamily:FF }}>{st.nick}</span>
                  <div style={{ position:'absolute', bottom:4, left:3, right:3 }}>
                    <div style={{ fontSize:8, color:'rgba(255,255,255,0.7)',
                      background:'rgba(0,0,0,0.5)', borderRadius:3,
                      padding:'1px 4px', textAlign:'center' }}>
                      {st.caption}
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ aspectRatio:'1', background:'rgba(255,255,255,0.03)',
                border:`1px dashed ${C.border}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:24, color:C.g[80], cursor:'pointer' }}>＋</div>
            </div>
          </div>
        ) : (
          <div style={{ margin:'16px 16px 0' }}>
            <DCard style={{ padding:'4px 16px' }}>
              {listData.length > 0 ? listData.map((p, i) => (
                <div key={p.id}
                  onClick={() => {
                    if (actSubTab === '내가 쓴 글') {
                      setSelectedPost(p);
                    }
                  }}
                  style={{ display:'flex', gap:10, padding:'12px 0',
                    borderBottom: i < listData.length-1 ? `1px solid ${C.border}` : 'none',
                    cursor: actSubTab === '내가 쓴 글' ? 'pointer' : 'default',
                    transition:'opacity 0.15s' }}>
                  {/* 노선 뱃지 */}
                  <div style={{ width:40, height:40, flexShrink:0, borderRadius:8,
                    background:`${C.line[p.lineId]}1A`, border:`1px solid ${C.border}`,
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width:20, height:20, borderRadius:10,
                      background:C.line[p.lineId],
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'#fff', fontSize:9, fontWeight:900 }}>
                      {p.lineId.replace('sin','신')}
                    </div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, color:C.white, lineHeight:1.4, marginBottom:5, fontFamily:FF }}>
                      {p.title}
                    </div>
                    <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                      <Tag t={p.cat} bg='rgba(255,255,255,0.07)' col={C.g[60]} fw={600} />
                      <span style={{ fontSize:11, color:C.g[70] }}>{p.time}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div style={{ padding:'28px 0', textAlign:'center', color:C.g[80], fontSize:12 }}>
                  아직 {actSubTab}한 글이 없어요
                </div>
              )}
            </DCard>
          </div>
        )}
      </>
    );
  };

  /* ④ 계정설정 */
  const renderSettings = () => (
    <>
      {/* 프로필 공개 범위 */}
      <div style={{ margin:'16px 16px 0' }}>
        <SecHead title="프로필 공개 범위" action="미리보기 ›" />
        <DCard style={{ padding:'4px 16px' }}>
          {PUB_ITEMS.map((item, i) => (
            <div key={item.key}
              style={{ display:'flex', alignItems:'center', padding:'13px 0',
                borderBottom: i < PUB_ITEMS.length-1 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.white, fontFamily:FF, marginBottom:2 }}>
                  {item.label}
                </div>
                <div style={{ fontSize:11, color:C.g[70] }}>{item.desc}</div>
              </div>
              {/* 슬라이드 토글 */}
              <div onClick={() => togglePub(item.key)}
                style={{ width:44, height:24, borderRadius:12, cursor:'pointer', flexShrink:0,
                  background: pubToggles[item.key] ? C.primary : 'rgba(255,255,255,0.1)',
                  position:'relative', transition:'background 0.2s' }}>
                <div style={{ width:18, height:18, borderRadius:9, background:'#fff',
                  position:'absolute', top:3,
                  left: pubToggles[item.key] ? 23 : 3,
                  transition:'left 0.2s' }} />
              </div>
            </div>
          ))}
        </DCard>
        <div style={{ fontSize:11, color:C.g[80], marginTop:7, lineHeight:1.55, paddingLeft:2 }}>
          비공개 시 해당 정보는 타인 프로필에서 숨겨집니다. 단, 게시판 검색 결과는 별도 정책을 따릅니다.
        </div>
      </div>

      <Div8 h={16} />

      {/* 언어 설정 */}
      <div style={{ margin:'0 16px' }}>
        <SecHead title="언어 설정" />
        <DCard style={{ padding:'4px 16px' }}>
          {[['한국어', true], ['English', false], ['日本語', false]].map(([lang, sel], i) => (
            <div key={lang}
              style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'12px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none',
                cursor:'pointer' }}>
              <span style={{ fontSize:13, color: sel ? C.white : C.g[70], fontFamily:FF,
                fontWeight: sel ? 700 : 400 }}>{lang}</span>
              {sel && <span style={{ fontSize:12, color:C.primary, fontWeight:700 }}>선택됨</span>}
            </div>
          ))}
        </DCard>
      </div>

      <Div8 h={16} />

      {/* 앱 정보 및 정책 */}
      <div style={{ margin:'0 16px' }}>
        <SecHead title="앱 정보 및 정책" />
        <DCard style={{ padding:'4px 16px' }}>
          {POLICY_LINKS.map((pl, i) => (
            <div key={pl.label}
              style={{ display:'flex', alignItems:'center', padding:'13px 0',
                borderBottom: i < POLICY_LINKS.length-1 ? `1px solid ${C.border}` : 'none',
                cursor:'pointer' }}>
              <span style={{ fontSize:13, color:C.white, flex:1, fontFamily:FF }}>{pl.label}</span>
              {pl.value
                ? <span style={{ fontSize:11, color:C.g[70] }}>{pl.value}</span>
                : <span style={{ fontSize:14, color:C.g[70] }}>›</span>}
            </div>
          ))}
        </DCard>
      </div>

      <Div8 h={16} />

      {/* 로그아웃 / 회원탈퇴 */}
      <div style={{ margin:'0 16px', display:'flex', gap:8 }}>
        <div style={{ flex:1, padding:'13px 0', background:C.card, borderRadius:10,
          textAlign:'center', cursor:'pointer', border:`1px solid ${C.border}` }}>
          <span style={{ fontSize:13, fontWeight:700, color:C.g[60], fontFamily:FF }}>로그아웃</span>
        </div>
        <div style={{ flex:1, padding:'13px 0', background:'rgba(235,77,61,0.08)',
          borderRadius:10, textAlign:'center', cursor:'pointer',
          border:'1px solid rgba(235,77,61,0.2)' }}>
          <span style={{ fontSize:13, fontWeight:700, color:C.red, fontFamily:FF }}>회원탈퇴</span>
        </div>
      </div>
    </>
  );

  /* ── 렌더 ────────────────────────────────────────────────── */
  return (
    <div style={{ flex:1, overflowY:'auto', paddingBottom:68, background:C.bg }}>

      {/* 스티키 헤더 */}
      <div style={{ background:C.stickyBg, borderBottom:`1px solid ${C.border}`,
        paddingTop:'env(safe-area-inset-top,44px)', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ height:52, display:'flex', alignItems:'center', padding:'0 16px' }}>
          <span style={{ fontSize:16, fontWeight:800, color:C.white, fontFamily:FF }}>마이</span>
          <div style={{ marginLeft:'auto', display:'flex', gap:2 }}>
            <div style={{ width:36, height:36, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.g[60]} strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </div>
            <div onClick={() => setShowSettings(true)}
              style={{ width:36, height:36, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={C.g[60]} strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 히어로 카드 */}
      <div style={{ background:C.card, borderBottom:`1px solid ${C.border}`,
        padding:'20px 16px 16px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
          {/* 프로필 아바타 */}
          <div style={{ width:66, height:66, borderRadius:33, flexShrink:0,
            background:C.primary,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:24, fontWeight:900, color:'#fff', fontFamily:FF }}>효</span>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17, fontWeight:800, color:C.white, fontFamily:FF, marginBottom:3 }}>
              아하철님
            </div>
            <div style={{ fontSize:12, color:C.g[70], marginBottom:7 }}>
              hb.lee@bodycodi.com
            </div>
            <div style={{ display:'flex', gap:5 }}>
              <Tag t="강남역" bg={`${C.line.s2}22`} col={C.line.s2} fw={700} />
              <Tag t="2호선" bg={`${C.line.s2}22`} col={C.line.s2} fw={700} />
            </div>
          </div>
          <div style={{ padding:'7px 13px', border:`1px solid ${C.border}`,
            borderRadius:20, cursor:'pointer', flexShrink:0 }}>
            <span onClick={() => setShowProfileEdit(true)}
              style={{ fontSize:12, fontWeight:700, color:C.g[60], fontFamily:FF, cursor:'pointer' }}>프로필 편집</span>
          </div>
        </div>

        {/* 스탯 3열 */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          background:'rgba(255,255,255,0.04)', borderRadius:10, padding:'12px 0',
          border:`1px solid ${C.border}` }}>
          {[['즐겨찾기','3개'], ['이동기록','24회'], ['포인트','1,230P']].map(([label, val], i) => (
            <div key={label}
              style={{ textAlign:'center', cursor:'pointer',
                borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontSize:15, fontWeight:900, color:C.white, fontFamily:FF }}>{val}</div>
              <div style={{ fontSize:10, color:C.g[70], marginTop:3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 원페이지 스크롤 — 개요 → 이동관리 → 활동기록 → 계정설정 */}
      <div style={{ paddingBottom:16 }}>
        {renderOverview()}
        <Div8 h={8} />
        {renderMovement()}
        <Div8 h={8} />
        {renderActivity()}
        <Div8 h={8} />
        {renderSettings()}
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   앱 루트
   ═══════════════════════════════════════════════════════ */
export default /* ══════════════════════════════════════════════════════════
   온보딩 화면
   ══════════════════════════════════════════════════════════ */

function MusinsaStyleApp() {
  const [screen,    setScreen]    = useState('홈');
  /* 테마: 'dark' | 'light' | 'system' */
  const [themeMode, setThemeMode] = useState('dark');

  /* system 설정일 때 OS 다크모드 감지 */
  const [sysDark, setSysDark] = useState(
    function() { return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches); }
  );
  useEffect(function() {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var handler = function(e) { setSysDark(e.matches); };
    mq.addEventListener('change', handler);
    return function() { mq.removeEventListener('change', handler); };
  }, []);

  /* 실제 다크 여부 계산 */
  var isDark = themeMode === 'system' ? sysDark : themeMode === 'dark';

  /* 테마 모드 변경 핸들러 */
  var handleThemeMode = function(mode) {
    setThemeMode(mode);
    var dark = mode === 'system'
      ? !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      : mode === 'dark';
    applyTheme(dark);
  };

  /* 초기/변경 시 테마 적용 */
  useEffect(function() { applyTheme(isDark); }, [isDark]);

  return (
    <div style={{ width:'100%', maxWidth:390, minHeight:'100dvh', background:C.bg,
      fontFamily:FF, position:'relative', overflow:'hidden',
      margin:'0 auto', display:'flex', flexDirection:'column',
      transition:'background 0.3s ease, color 0.3s ease' }}>

      {screen === '홈'      && <HomeScreen   isDark={isDark} />}
      {screen === '지하철'  && <SubwayScreen isDark={isDark} />}
      {screen === '커뮤니티' && <CommunityScreen isDark={isDark} />}
      {screen === '유실물'  && <LostScreen   isDark={isDark} />}
      {screen === '마이'    && <MyScreen     isDark={isDark} themeMode={themeMode} onThemeMode={handleThemeMode} />}

      <BottomNav screen={screen} setScreen={setScreen} />
    </div>
  );
}
