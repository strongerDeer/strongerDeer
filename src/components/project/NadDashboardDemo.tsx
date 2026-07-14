import styles from "./NadDashboardDemo.module.scss";

type Kpi = {
  label: string;
  goal: string;
  value: string;
  note: string;
  rate: number;
  bars: { month: string; height: number; value?: string }[];
  tone?: "green";
};

const kpis: Kpi[] = [
  {
    label: "누적 PV",
    goal: "목표 10,000회",
    value: "4,820회",
    note: "이벤트 도달 규모 — 페이지 노출·소비 총량",
    rate: 48,
    bars: [
      { month: "6월", height: 62, value: "2,980" },
      { month: "7월", height: 38, value: "1,840" },
      { month: "8월", height: 0 },
      { month: "9월", height: 0 },
    ],
  },
  {
    label: "순방문(MAU)",
    goal: "목표 3,000명",
    value: "2,410명",
    note: "실제 도달 인원(중복 제외) — 1인당 여러 번 볼 수 있는 PV와 분리",
    rate: 80,
    bars: [
      { month: "6월", height: 78, value: "1,760" },
      { month: "7월", height: 29, value: "650" },
      { month: "8월", height: 0 },
      { month: "9월", height: 0 },
    ],
  },
  {
    label: "일평균 DAU",
    goal: "목표 50명",
    value: "58명",
    note: "지속 참여 신호 — 하루 평균 방문자, 이벤트 열기·리텐션 지표",
    rate: 100,
    bars: [
      { month: "6월", height: 90, value: "64" },
      { month: "7월", height: 82, value: "58" },
      { month: "8월", height: 0 },
      { month: "9월", height: 0 },
    ],
  },
  {
    label: "누적 회원가입",
    goal: "목표 150명",
    value: "240명",
    note: "방문이 회원으로 전환 — 전역 수치라 회차 경유는 구분 안 됨",
    rate: 100,
    bars: [
      { month: "6월", height: 58, value: "139" },
      { month: "7월", height: 42, value: "101" },
      { month: "8월", height: 0 },
      { month: "9월", height: 0 },
    ],
    tone: "green",
  },
];

type CompareRow = {
  round: string;
  desc: string;
  pv: string;
  visitors: string;
  engage: string;
  engageNote: string;
  stay: string;
  join: string;
};

const compareRows: CompareRow[] = [
  {
    round: "1회차",
    desc: "댓글 이벤트",
    pv: "2,450",
    visitors: "1,980",
    engage: "86",
    engageNote: "댓글 · 4.3%",
    stay: "2분 40초",
    join: "240",
  },
  {
    round: "2회차",
    desc: "팬 퀴즈",
    pv: "320",
    visitors: "58",
    engage: "31",
    engageNote: "완주",
    stay: "3분 10초",
    join: "52",
  },
  {
    round: "3회차",
    desc: "투표 이벤트",
    pv: "410",
    visitors: "92",
    engage: "27",
    engageNote: "투표",
    stay: "2분 05초",
    join: "88",
  },
  {
    round: "4회차",
    desc: "오프라인 연계",
    pv: "260",
    visitors: "140",
    engage: "—",
    engageNote: "",
    stay: "1분 30초",
    join: "120",
  },
];

// 오픈 후 N일째(1~14일)로 정규화한 회차별 일별 PV 더미 곡선
const chartLines = [
  { className: "line1", label: "1회차", points: "48,60 94,75 141,90 187,110 233,130 280,145 326,160 372,175 419,185 465,192 511,198 558,202 604,205 650,208" },
  { className: "line2", label: "2회차", points: "48,205 94,200 141,196 187,190 233,186 280,180 326,176 372,172 419,168 465,165 511,162 558,160 604,158 650,155" },
  { className: "line3", label: "3회차", points: "48,208 94,206 141,200 187,150 233,120 280,140 326,170 372,185 419,195 465,200 511,204 558,206 604,207 650,208" },
  { className: "line4", label: "4회차", points: "48,210 94,202 141,193 187,185 233,176 280,168 326,159 372,151 419,142 465,134 511,125 558,117 604,108 650,100" },
];

const NadDashboardDemo = () => {
  return (
    <section className={styles.demo} aria-label="더미 데이터로 재현한 NAD 이벤트 성과 대시보드 UI">
      <div className={styles.demoLabel}>예시 화면 · 실데이터 아님</div>

      <nav className={styles.nav} aria-label="대시보드 예시 메뉴">
        <div>
          <span>대시보드</span>
          <strong>SPHERE</strong>
        </div>
        <div className={styles.deepNav}>
          <span>GA4 심층 분석</span>
          <span>검색·SEO</span>
          <span>품질</span>
        </div>
      </nav>

      <header className={styles.header}>
        <div>
          <p className={styles.title}>
            SPHERE <em>페이지 분석</em>
          </p>
          <p className={styles.meta}>
            2026-06-08 ~ · 전체 회차 합산
            <span className={styles.metaChip}>오픈 D+97</span>
            <span className={styles.metaChip}>데이터 갱신 07-14</span>
          </p>
        </div>
        <span className={styles.sync}>⟳ 동기화</span>
      </header>

      <p className={styles.notice}>
        ⓘ 당일 데이터는 GA 처리 지연으로 1~2일 후 반영됩니다. 오늘·어제 수치는 아직 집계 중일 수 있습니다.
      </p>

      <div className={styles.metrics}>
        {kpis.map((kpi) => (
          <article key={kpi.label} className={kpi.tone === "green" ? styles.kpiGreen : undefined}>
            <div className={styles.kpiHead}>
              <span>{kpi.label}</span>
              <em>{kpi.goal}</em>
            </div>
            <strong>{kpi.value}</strong>
            <small>{kpi.note}</small>
            <div className={styles.rateRow}>
              <span>목표 달성률</span>
              <b>{kpi.rate === 100 ? "100%+" : `${kpi.rate}%`}</b>
            </div>
            <div className={styles.progress}>
              <span style={{ width: `${kpi.rate}%` }} />
            </div>
            <div className={styles.miniBars}>
              {kpi.bars.map((bar) => (
                <div key={bar.month}>
                  <i>
                    <span style={{ height: `${bar.height}%` }} />
                  </i>
                  <small>{bar.month}</small>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className={styles.rounds}>
        <strong>전체</strong>
        <span>1회차</span>
        <span>2회차</span>
        <span>3회차</span>
        <span>4회차</span>
      </div>

      <div className={styles.periodBar}>
        <div className={styles.periodCurrent}>
          <span>기간</span>
          <div>
            <strong>최근 30일</strong>
            <small>2026-06-15 ~ 2026-07-14</small>
          </div>
        </div>
        <div className={styles.periodOptions}>
          <span>오늘</span>
          <span>이번주</span>
          <span>이번달</span>
          <span>최근 7일</span>
          <strong>최근 30일</strong>
          <span>직접 선택</span>
        </div>
      </div>

      <div className={styles.sectionTabs}>
        <span>일별 추세</span>
        <strong>회차 비교</strong>
        <span>인구통계</span>
        <span>지역</span>
      </div>

      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr>
              <th>회차</th>
              <th>도달(PV)</th>
              <th>순방문</th>
              <th>핵심 참여</th>
              <th>평균 체류</th>
              <th>가입 ⚠️</th>
            </tr>
          </thead>
          <tbody>
            {compareRows.map((row) => (
              <tr key={row.round}>
                <td className={styles.roundCell}>
                  <strong>{row.round}</strong>
                  <span>{row.desc}</span>
                </td>
                <td className={styles.accent}>{row.pv}</td>
                <td>{row.visitors}</td>
                <td>
                  <b>{row.engage}</b>
                  {row.engageNote && <small>{row.engageNote}</small>}
                </td>
                <td>{row.stay}</td>
                <td className={styles.dim}>{row.join}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.footnote}>
        도달(PV)은 선택한 정규화 기간 기준 · 핵심 참여는 회차 성격별(댓글 개수·참여율 / 완주 / 투표) 지표 · ⚠️ 가입은
        전역 수치(회차 경유 구분 불가)
      </p>

      <article className={styles.chartCard}>
        <div className={styles.cardHead}>
          <div>
            <strong>오픈 후 일차별 PV (상대기간 정렬)</strong>
            <p>회차별 오픈일을 1일째로 정규화해 동일 기간 비교</p>
          </div>
          <div className={styles.legend}>
            {chartLines.map((line) => (
              <span key={line.label} className={styles[line.className]}>
                {line.label}
              </span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 680 250" role="img" aria-label="회차별 오픈 후 일차별 PV 더미 데이터 추세 차트">
          <g className={styles.gridLines}>
            <line x1="48" y1="40" x2="650" y2="40" />
            <line x1="48" y1="95" x2="650" y2="95" />
            <line x1="48" y1="150" x2="650" y2="150" />
            <line x1="48" y1="210" x2="650" y2="210" />
          </g>
          {chartLines.map((line) => (
            <polyline key={line.label} className={styles[line.className]} points={line.points} />
          ))}
          <g className={styles.axisLabels}>
            <text x="48" y="232">1일</text>
            <text x="184" y="232">4일</text>
            <text x="326" y="232">7일</text>
            <text x="466" y="232">10일</text>
            <text x="630" y="232">14일</text>
          </g>
        </svg>
      </article>
    </section>
  );
};

export default NadDashboardDemo;
