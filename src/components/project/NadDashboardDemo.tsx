import styles from "./NadDashboardDemo.module.scss";

const metrics = [
  { label: "PV", value: "12,480", change: "+14.2%", note: "선택 기간 누적" },
  { label: "순 방문", value: "4,260", change: "+8.7%", note: "중복 방문 제외" },
  { label: "일평균 DAU", value: "386", change: "+11.4%", note: "기간 일평균" },
  { label: "신규 가입", value: "214", change: "+6.1%", note: "가입 완료 기준" },
];

const NadDashboardDemo = () => {
  return (
    <section className={styles.demo} aria-label="더미 데이터로 재현한 NAD 대시보드 UI">
      <div className={styles.demoLabel}>예시 화면 · 실데이터 아님</div>

      <nav className={styles.nav} aria-label="대시보드 예시 메뉴">
        <div>
          <strong>대시보드</strong>
          <span>SPHERE</span>
        </div>
        <div className={styles.deepNav}>
          <span>GA4 심층 분석</span>
          <span>검색·SEO</span>
          <span>품질</span>
        </div>
      </nav>

      <header className={styles.header}>
        <div>
          <h3>이벤트 성과 대시보드</h3>
          <p>회차별 성과와 Shop 품질 지표를 같은 기준으로 비교</p>
        </div>
        <span className={styles.status}>● 데이터 연결 정상</span>
      </header>

      <div className={styles.rounds}>
        <strong>전체 회차</strong>
        <span>ROUND 01</span>
        <span>ROUND 02</span>
        <span>ROUND 03</span>
      </div>

      <div className={styles.metrics}>
        {metrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <div>
              <strong>{metric.value}</strong>
              <em>{metric.change}</em>
            </div>
            <small>{metric.note}</small>
          </article>
        ))}
      </div>

      <div className={styles.filters}>
        <strong>성과 비교</strong>
        <span>최근 30일</span>
        <span>오픈 후 14일</span>
        <span>전체 채널</span>
      </div>

      <div className={styles.dashboardGrid}>
        <article className={styles.chartCard}>
          <div className={styles.cardHead}>
            <div>
              <strong>회차별 누적 도달</strong>
              <p>오픈 후 N일 기준 상대기간 비교</p>
            </div>
            <div className={styles.legend}><span>PV</span><span>DAU</span></div>
          </div>
          <svg viewBox="0 0 680 250" role="img" aria-label="더미 데이터 추세 차트">
            <g className={styles.gridLines}>
              <line x1="48" y1="40" x2="650" y2="40" />
              <line x1="48" y1="95" x2="650" y2="95" />
              <line x1="48" y1="150" x2="650" y2="150" />
              <line x1="48" y1="205" x2="650" y2="205" />
            </g>
            <polyline className={styles.pvLine} points="48,198 120,174 192,180 264,132 336,142 408,94 480,108 552,60 624,45" />
            <polyline className={styles.dauLine} points="48,208 120,194 192,164 264,176 336,140 408,150 480,118 552,128 624,90" />
            <g className={styles.axisLabels}>
              <text x="48" y="232">D+1</text><text x="184" y="232">D+4</text><text x="326" y="232">D+7</text><text x="466" y="232">D+10</text><text x="606" y="232">D+14</text>
            </g>
          </svg>
        </article>

        <article className={styles.goalCard}>
          <div className={styles.cardHead}>
            <div><strong>목표 도달</strong><p>운영 목표 대비 진행률</p></div>
          </div>
          <div className={styles.goalValue}>78%</div>
          <div className={styles.progress}><span /></div>
          <ul>
            <li><span>유입</span><strong>84%</strong></li>
            <li><span>참여</span><strong>72%</strong></li>
            <li><span>가입</span><strong>63%</strong></li>
          </ul>
        </article>
      </div>

      <div className={styles.quality}>
        <div><span>Core Web Vitals</span><strong>통과</strong></div>
        <div><span>Lighthouse</span><strong>주간 비교</strong></div>
        <div><span>Image · Bundle</span><strong>회귀 없음</strong></div>
        <div><span>SEO</span><strong>기본 설정 정상</strong></div>
      </div>
    </section>
  );
};

export default NadDashboardDemo;
