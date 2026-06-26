import type { DashboardOAuthAuthorizationRequired, DashboardRegisterServerInput } from "./types";

export interface KeyValueRow {
  key: string;
  value: string;
}

export interface RegisterOAuthState {
  authorization: DashboardOAuthAuthorizationRequired;
  hasOpenedBrowser: boolean;
  error: string;
}

export interface RegisterServerFormState {
  name: string;
  description: string;
  transport: "stdio" | "streamable_http" | "sse";
  session_mode: "stateless" | "stateful";
  command: string;
  args_text: string;
  env_rows: KeyValueRow[];
  url: string;
  bearer_token: string;
  header_rows: KeyValueRow[];
}

export function createEmptyPair(): KeyValueRow {
  return { key: "", value: "" };
}

export function rowsToMap(rows: KeyValueRow[]) {
  const output: Record<string, string> = {};
  rows.forEach((row) => {
    const key = row.key.trim();
    if (!key) {
      return;
    }
    output[key] = row.value;
  });
  return output;
}

export function splitArgs(input: string) {
  return input
    .split("\n")
    .map((value) => value.trim())
    .filter(Boolean);
}

export function buildRegisterPayload(form: RegisterServerFormState): DashboardRegisterServerInput {
  const payload: DashboardRegisterServerInput = {
    name: form.name.trim(),
    description: form.description.trim(),
    transport: form.transport,
    session_mode: form.session_mode,
  };

  if (form.transport === "stdio") {
    payload.command = form.command.trim();
    payload.args = splitArgs(form.args_text);
    const env = rowsToMap(form.env_rows);
    if (Object.keys(env).length > 0) {
      payload.env = env;
    }
    return payload;
  }

  payload.url = form.url.trim();
  if (form.bearer_token.trim()) {
    payload.bearer_token = form.bearer_token.trim();
  }
  if (form.transport === "streamable_http") {
    const headers = rowsToMap(form.header_rows);
    if (Object.keys(headers).length > 0) {
      payload.headers = headers;
    }
  }
  return payload;
}

const VALID_TRANSPORTS = ["stdio", "streamable_http", "sse"] as const;

export function parseServerJson(
  text: string,
): { ok: true; payload: DashboardRegisterServerInput } | { ok: false; errorKey: string } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, errorKey: "addServer.error.jsonInvalid" };
  }
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return { ok: false, errorKey: "addServer.error.jsonInvalid" };
  }
  const obj = raw as Record<string, unknown>;
  if (typeof obj.name !== "string" || !obj.name.trim()) {
    return { ok: false, errorKey: "addServer.error.nameRequired" };
  }
  if (typeof obj.transport !== "string" || !VALID_TRANSPORTS.includes(obj.transport as never)) {
    return { ok: false, errorKey: "addServer.error.transportInvalid" };
  }
  if (obj.transport === "stdio" && (typeof obj.command !== "string" || !obj.command.trim())) {
    return { ok: false, errorKey: "addServer.error.commandRequired" };
  }
  if (
    (obj.transport === "streamable_http" || obj.transport === "sse") &&
    (typeof obj.url !== "string" || !obj.url.trim())
  ) {
    return { ok: false, errorKey: "addServer.error.urlRequired" };
  }
  return { ok: true, payload: obj as unknown as DashboardRegisterServerInput };
}
