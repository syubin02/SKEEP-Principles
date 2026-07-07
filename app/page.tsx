import { CTA } from "./components/sections/CTA";
import { Detour } from "./components/sections/Detour";
import { EnvironmentCollage } from "./components/sections/EnvironmentCollage";
import { FeaturePillar } from "./components/sections/FeaturePillar";
import { Hero } from "./components/sections/Hero";
import { IcebreakSkip } from "./components/sections/IcebreakSkip";
import { Principles } from "./components/sections/Principles";
import { RoleFlow } from "./components/sections/RoleFlow";

export default function Home() {
  return (
    <main>
      <Hero />
      <IcebreakSkip />
      <RoleFlow />
      <Detour />
      <Principles />
      <FeaturePillar
        eyebrow="Service"
        heading="하나의 서비스, 더 다채로운 가능성"
        body={"필요한 AI 스킬과 워크플로우를 불러와,\n지금 하던 일을 끊김 없이 이어갑니다."}
        questions={[
          {
            label: "Q1.",
            text: "서비스에 무엇이 다운로드 되나요?",
            answer:
              "목적을 수행하기 위해 필요한 AI 스킬과 워크플로우가 다운로드됩니다. 환경에 없는 기능을 잠시 확장하여, 작업 흐름이 끊기지 않게 돕습니다.",
          },
          { label: "Q2.", text: "기존 서비스를 대체하는 방식인가요?" },
          { label: "Q3.", text: "여러 기능을 동시에 다운받을 수 있나요?" },
        ]}
      />
      <FeaturePillar
        eyebrow="Product"
        heading="하나의 제품, 더 확장된 가능성"
        body={"기능 모듈과 드라이버를 통해,\n사용자가 익숙한 제품으로 완전히 새로운 일을 수행합니다."}
        questions={[
          { label: "Q1.", text: "별도의 장비를 추가해야 하나요?" },
          { label: "Q2.", text: "처음 쓰는 제품에서도 바로 사용할 수 있나요?" },
          { label: "Q3.", text: "제품의 원래 기능/에이전트는 그대로 유지되나요?" },
        ]}
      />
      <FeaturePillar
        eyebrow="Space"
        heading="하나의 공간, 더 넓은 가능성"
        body={"공간 에이전트에 필요한 기능을 임시로 배포해,\n기존 자원을 새로운 목적에 맞게 활용합니다."}
        questions={[
          { label: "Q1.", text: "공간에는 어떤 능력을 더할 수 있나요?" },
          { label: "Q2.", text: "다른 사람의 경험에 영향을 주지는 않나요?" },
          { label: "Q3.", text: "모든 공간에서 같은 방식으로 작동하나요?" },
        ]}
      />
      <EnvironmentCollage />
      <CTA />
    </main>
  );
}
