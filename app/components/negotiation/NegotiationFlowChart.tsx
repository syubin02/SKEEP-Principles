import styles from "./NegotiationFlowChart.module.css";

type FlowBox = {
  kind: "box" | "highlight";
  label?: string;
  text: string;
};

type FlowDecision = {
  kind: "decision";
  text: string;
  branch: string;
};

type FlowEnd = {
  kind: "end";
  text: string;
};

type FlowNode = FlowBox | FlowDecision | FlowEnd;

const TOP_NODES: FlowBox[] = [
  { kind: "box", label: "Environment Owner", text: "환경 내 규칙 설정" },
  { kind: "box", label: "Environment Owner", text: "앵커 환경 지정" },
  { kind: "highlight", label: "Anchor Environment", text: "환경 내 규칙 학습" },
];

const LEGAL_NODE: FlowBox = { kind: "box", label: "Legal rules", text: "법적/제도적 제약" };

const MAIN_FLOW: FlowNode[] = [
  { kind: "box", text: "사용자의 사용 의도 감지" },
  { kind: "box", label: "User B's SKEEP", text: "목적에 따라 시간, 필수 조건 등 패킷하여 맥락 전달" },
  { kind: "box", label: "Environment Agent", text: "자원 상태와 제약 검증" },
  { kind: "decision", text: "현재 다른 사용자가 목적 수행을 위해 환경을 사용중인가?", branch: "이용 권한 발금 기기, 공간 실행" },
  { kind: "box", text: "충돌 감지 협상 필요 판단" },
  { kind: "box", label: "User B's SKEEP", text: "현재 목적 상태, 양보 가능 범위 전달" },
  { kind: "box", label: "Anchor Environment", text: "규칙 기반 조율" },
  { kind: "highlight", label: "CNP", text: "사용 조건, 시간, 공유가능범위 동의 맥락 교환" },
  { kind: "decision", text: "복수 사용자 / 복수 자원의 조합 이슈가 있는가", branch: "단일 자원 협상" },
  { kind: "highlight", label: "DCOP", text: "전체 목적이 가장 덜 침해되는 사용 조건 계산" },
  { kind: "box", text: "합의된 사용 방식 확정" },
  { kind: "box", text: "합의된 조건 실행" },
  { kind: "decision", text: "사용 중 상황 변화 발생", branch: "사용 종료 및 기록 반영" },
  { kind: "end", text: "영향 범위 분석 및 신규 요청" },
];

function Arrow({ dashed }: { dashed?: boolean }) {
  return (
    <div className={dashed ? `${styles.arrow} ${styles.arrowDashed}` : styles.arrow}>
      <span className={styles.arrowHead} />
    </div>
  );
}

function BoxNode({ node }: { node: FlowBox }) {
  return (
    <div className={node.kind === "highlight" ? `${styles.box} ${styles.boxHighlight}` : styles.box}>
      {node.label && <span className={styles.boxLabel}>{node.label}</span>}
      <span className={styles.boxText}>{node.text}</span>
    </div>
  );
}

function DecisionNode({ node }: { node: FlowDecision }) {
  return (
    <div className={styles.decisionCol}>
      <div className={styles.decision}>
        <span className={styles.decisionText}>{node.text}</span>
      </div>
      <div className={styles.branchDown}>
        <span className={styles.branchTag}>N</span>
      </div>
      <div className={styles.branchBox}>
        <span className={styles.boxText}>{node.branch}</span>
      </div>
    </div>
  );
}

export function NegotiationFlowChart() {
  return (
    <div className={styles.canvas}>
      <div className={styles.legalRow}>
        <BoxNode node={LEGAL_NODE} />
        <div className={styles.legalConnector} />
      </div>

      <div className={styles.topRow}>
        {TOP_NODES.map((node, i) => (
          <div key={node.text} className={styles.topRowItem}>
            <BoxNode node={node} />
            {i < TOP_NODES.length - 1 && <Arrow />}
          </div>
        ))}
        <div className={styles.loopLine}>
          <span className={styles.loopArrowHead} />
        </div>
      </div>

      <div className={styles.dropConnector} />

      <div className={styles.mainRow}>
        {MAIN_FLOW.map((node, i) => (
          <div key={i} className={styles.mainRowItem}>
            {node.kind === "decision" ? (
              <DecisionNode node={node} />
            ) : node.kind === "end" ? (
              <div className={`${styles.box} ${styles.boxEnd}`}>
                <span className={styles.boxText}>{node.text}</span>
              </div>
            ) : (
              <BoxNode node={node} />
            )}
            {i < MAIN_FLOW.length - 1 && <Arrow dashed={node.kind === "decision"} />}
          </div>
        ))}
      </div>
    </div>
  );
}
