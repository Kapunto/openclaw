import fs from "node:fs/promises";
import path from "node:path";
import type { OpenClawConfig } from "../config/config.js";
import { resolveStateDir } from "../config/paths.js";

export type ContextBudgetTelemetry = {
  schemaVersion: "1.0";
  turnId: string;
  sessionId: string;
  sessionKey?: string;
  provider?: string;
  model?: string;
  timestamp: number;
  countMethod: "char_div4_estimate";
  tokens: {
    core: number;
    runtime: number;
    workspace: number;
    history: number;
    tools: number;
    unknown: number;
    total: number;
  };
  overheadMs: number;
};

function est(chars: number): number {
  return Math.ceil(Math.max(0, chars) / 4);
}

function line(event: ContextBudgetTelemetry): string {
  return JSON.stringify(event) + "\n";
}

export function buildContextBudgetTelemetry(params: {
  turnId: string;
  sessionId: string;
  sessionKey?: string;
  provider?: string;
  model?: string;
  systemPromptChars: number;
  workspaceChars: number;
  runtimeChars: number;
  toolsChars: number;
  historyChars: number;
  startedAt: number;
}): ContextBudgetTelemetry {
  const coreChars = Math.max(
    0,
    params.systemPromptChars - params.workspaceChars - params.runtimeChars - params.toolsChars,
  );
  const core = est(coreChars);
  const runtime = est(params.runtimeChars);
  const workspace = est(params.workspaceChars);
  const history = est(params.historyChars);
  const tools = est(params.toolsChars);
  const systemEst = est(params.systemPromptChars);
  const knownSystemEst = core + runtime + workspace + tools;
  const unknown = Math.max(0, systemEst - knownSystemEst);
  const total = core + runtime + workspace + history + tools + unknown;
  return {
    schemaVersion: "1.0",
    turnId: params.turnId,
    sessionId: params.sessionId,
    sessionKey: params.sessionKey,
    provider: params.provider,
    model: params.model,
    timestamp: Date.now(),
    countMethod: "char_div4_estimate",
    tokens: { core, runtime, workspace, history, tools, unknown, total },
    overheadMs: Math.max(0, Date.now() - params.startedAt),
  };
}

export async function exportContextBudgetTelemetryJsonl(
  telemetry: ContextBudgetTelemetry,
  cfg?: OpenClawConfig,
): Promise<void> {
  const enabled = cfg?.diagnostics?.enabled === true;
  if (!enabled) {
    return;
  }
  const outPath = path.join(
    resolveStateDir(process.env),
    "diagnostics",
    "context-budget-baseline.jsonl",
  );
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.appendFile(outPath, line(telemetry), "utf8");
}
