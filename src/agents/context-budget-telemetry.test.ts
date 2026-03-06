import { describe, expect, it, vi } from "vitest";
import { buildContextBudgetTelemetry } from "./context-budget-telemetry.js";

describe("context-budget-telemetry", () => {
  it("builds deterministic layer totals and computes unknown via bounded drift", () => {
    vi.spyOn(Date, "now").mockReturnValue(1_700_000_000_000);
    const telemetry = buildContextBudgetTelemetry({
      turnId: "run-1",
      sessionId: "s1",
      sessionKey: "k1",
      provider: "openai",
      model: "gpt-5",
      systemPromptChars: 400,
      workspaceChars: 80,
      runtimeChars: 40,
      toolsChars: 120,
      historyChars: 200,
      startedAt: 1_700_000_000_000,
    });

    expect(telemetry.schemaVersion).toBe("1.0");
    expect(telemetry.countMethod).toBe("char_div4_estimate");
    const systemEst = Math.ceil(400 / 4);
    const knownSystemEst =
      telemetry.tokens.core +
      telemetry.tokens.runtime +
      telemetry.tokens.workspace +
      telemetry.tokens.tools;
    expect(telemetry.tokens.unknown).toBe(Math.max(0, systemEst - knownSystemEst));
    expect(telemetry.tokens.total).toBe(
      telemetry.tokens.core +
        telemetry.tokens.runtime +
        telemetry.tokens.workspace +
        telemetry.tokens.history +
        telemetry.tokens.tools +
        telemetry.tokens.unknown,
    );
  });
});
