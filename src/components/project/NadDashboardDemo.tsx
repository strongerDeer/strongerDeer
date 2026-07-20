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

// 오픈 후 N일째(1~14일)로 정규화한 회차별 일별 PV 더미 곡선.
// 좌표는 [x, y] 배열 — 아래 buildSmoothPath로 부드러운 곡선 path를 만든다.
const CHART = { w: 680, h: 250, top: 40, bottom: 210, left: 48, right: 650 };

type ChartLine = {
  className: string;
  label: string;
  color: string;
  points: [number, number][];
};

const chartLines: ChartLine[] = [
  {
    className: "line1",
    label: "1회차",
    color: "#6366f1",
    points: [[48, 60], [94, 75], [141, 90], [187, 110], [233, 130], [280, 145], [326, 160], [372, 175], [419, 185], [465, 192], [511, 198], [558, 202], [604, 205], [650, 208]],
  },
  {
    className: "line2",
    label: "2회차",
    color: "#10b981",
    points: [[48, 205], [94, 200], [141, 196], [187, 190], [233, 186], [280, 180], [326, 176], [372, 172], [419, 168], [465, 165], [511, 162], [558, 160], [604, 158], [650, 155]],
  },
  {
    className: "line3",
    label: "3회차",
    color: "#ec4899",
    points: [[48, 208], [94, 206], [141, 200], [187, 150], [233, 120], [280, 140], [326, 170], [372, 185], [419, 195], [465, 200], [511, 204], [558, 206], [604, 207], [650, 208]],
  },
  {
    className: "line4",
    label: "4회차",
    color: "#f59e0b",
    points: [[48, 210], [94, 202], [141, 193], [187, 185], [233, 176], [280, 168], [326, 159], [372, 151], [419, 142], [465, 134], [511, 125], [558, 117], [604, 108], [650, 100]],
  },
];

// 점들을 Catmull-Rom 스플라인으로 이어 부드러운 곡선 path(d 속성)를 만든다.
// tension 0.5로 자연스러운 곡률. 각진 polyline 대신 이 path를 stroke한다.
function buildSmoothPath(points: [number, number][]): string {
  if (points.length < 2) return "";
  const d = [`M ${points[0][0]} ${points[0][1]}`];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d.push(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2[0]} ${p2[1]}`);
  }
  return d.join(" ");
}

// 곡선 아래를 채우는 area path — 선 path에 바닥선(bottom)까지 닫아준다.
function buildAreaPath(points: [number, number][]): string {
  const line = buildSmoothPath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last[0]} ${CHART.bottom} L ${first[0]} ${CHART.bottom} Z`;
}

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
        <svg
          viewBox="0 0 720 250"
          role="img"
          aria-label="회차별 오픈 후 일차별 PV 더미 데이터 추세 차트"
        >
          <defs>
            {chartLines.map((line) => (
              <linearGradient
                key={line.className}
                id={`area-${line.className}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={line.color} stopOpacity="0.16" />
                <stop offset="100%" stopColor={line.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* 가로 그리드 + Y축 값(상대 규모) */}
          <g className={styles.gridLines}>
            {[40, 95, 150, 210].map((y) => (
              <line key={y} x1="48" y1={y} x2="650" y2={y} />
            ))}
          </g>
          <g className={styles.yLabels}>
            <text x="40" y="44">높음</text>
            <text x="40" y="154">보통</text>
            <text x="40" y="213">0</text>
          </g>

          {/* 면적 그라데이션(곡선 아래) */}
          {chartLines.map((line) => (
            <path
              key={`area-${line.className}`}
              className={styles.area}
              d={buildAreaPath(line.points)}
              fill={`url(#area-${line.className})`}
            />
          ))}

          {/* 부드러운 곡선 */}
          {chartLines.map((line) => (
            <path
              key={line.className}
              className={styles[line.className]}
              d={buildSmoothPath(line.points)}
            />
          ))}

          {/* 끝점 마커 + 최종 값 라벨.
              라벨 y는 끝점 y 순서대로 최소 간격(14px)을 확보해 겹침을 피한다
              (1·3회차처럼 끝점이 같은 높이일 때 라벨이 뭉치는 문제 방지). */}
          {(() => {
            const ends = chartLines
              .map((line) => ({ line, x: line.points[line.points.length - 1][0], y: line.points[line.points.length - 1][1] }))
              .sort((a, b) => a.y - b.y);
            const MIN_GAP = 14;
            for (let i = 1; i < ends.length; i++) {
              if (ends[i].y - ends[i - 1].y < MIN_GAP) {
                ends[i] = { ...ends[i], y: ends[i - 1].y + MIN_GAP };
              }
            }
            return ends.map(({ line, x, y }) => {
              const [, markerY] = line.points[line.points.length - 1];
              return (
                <g key={`end-${line.className}`}>
                  <circle cx={x} cy={markerY} r="3.5" fill="#fff" stroke={line.color} strokeWidth="2.5" />
                  <text x={x + 9} y={y + 3} className={styles.endLabel} fill={line.color}>
                    {line.label}
                  </text>
                </g>
              );
            });
          })()}

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
