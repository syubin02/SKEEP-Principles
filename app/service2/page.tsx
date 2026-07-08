import type { Metadata } from "next";
import { CTA } from "../components/sections/CTA";
import { ContextSummary } from "../components/service2/ContextSummary";
import { ImageTextCard } from "../components/service2/ImageTextCard";
import { LeaveNothing } from "../components/service2/LeaveNothing";
import { ResetSequence } from "../components/service2/ResetSequence";
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
      <ResetSequence />
      <ContextSummary />
      <ImageTextCard />
      <CTA />
    </main>
  );
}
