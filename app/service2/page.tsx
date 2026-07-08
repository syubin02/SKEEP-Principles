import type { Metadata } from "next";
import { CTA } from "../components/sections/CTA";
import { ContextSummary } from "../components/service2/ContextSummary";
import { ImageTextCard } from "../components/service2/ImageTextCard";
import { LeaveNothing } from "../components/service2/LeaveNothing";
import { ResetTransition } from "../components/service2/ResetTransition";
import { StatementBlock } from "../components/service2/StatementBlock";

export const metadata: Metadata = {
  title: "SKEEP | Leave Nothing",
  description: "기기에는 흔적 없이, 내 맥락은 끊김 없이.",
};

export default function Service2Page() {
  return (
    <main>
      <StatementBlock heading={["기기에는 흔적 없이", "내 맥락은 끊김 없이"]} />
      <LeaveNothing />
      <ResetTransition />
      <StatementBlock
        heading={["패킷 회수 중... (3개)"]}
        body={["상호작용이 끝나면, SKEEP은 맥락 패킷을 회수하고", "환경은 원래 상태로 돌아갑니다."]}
      />
      <StatementBlock
        heading={["패킷 회수 중... (2개)"]}
        body={["상호작용이 끝나면 SKEEP은 맥락 패킷을 회수하고", "환경은 원래 상태로 돌아갑니다."]}
      />
      <StatementBlock
        heading={["패킷 회수 중... (1개)"]}
        body={["상호작용이 끝나면 SKEEP은 맥락 패킷을 회수하고", "환경은 원래 상태로 돌아갑니다."]}
      />
      <StatementBlock heading={["다시, 처음처럼"]} />
      <ContextSummary />
      <ImageTextCard />
      <CTA />
    </main>
  );
}
