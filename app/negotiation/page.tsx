import type { Metadata } from "next";
import { StatementBlock } from "../components/service2/StatementBlock";
import { EnvironmentLayers } from "../components/negotiation/EnvironmentLayers";
import { EvaluationCriteria } from "../components/negotiation/EvaluationCriteria";
import { MoreStory } from "../components/negotiation/MoreStory";
import { NegotiationDiagram } from "../components/negotiation/NegotiationDiagram";
import { NegotiationPillars } from "../components/negotiation/NegotiationPillars";
import { ProtectionPrinciples } from "../components/negotiation/ProtectionPrinciples";

export const metadata: Metadata = {
  title: "SKEEP | Negotiation",
  description: "충돌이 생긴 순간부터, 합의에 이를 때까지.",
};

export default function NegotiationPage() {
  return (
    <main>
      <StatementBlock heading={["당신이 원하는 그대로", "가장 자연스럽게"]} background="#e7eaf0" />
      <EvaluationCriteria />
      <EnvironmentLayers />
      <NegotiationPillars />
      <MoreStory />
      <NegotiationDiagram />
      <ProtectionPrinciples />
    </main>
  );
}
