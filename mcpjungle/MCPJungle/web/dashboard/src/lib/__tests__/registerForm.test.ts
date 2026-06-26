import { describe, expect, it } from "vitest";
import { parseServerJson, buildRegisterPayload } from "../registerForm";

describe("parseServerJson", () => {
  it("rejects invalid JSON", () => {
    const r = parseServerJson("{ not json");
    expect(r.ok).toBe(false);
  });

  it("rejects missing name", () => {
    const r = parseServerJson(JSON.stringify({ transport: "stdio", command: "npx" }));
    expect(r).toEqual({ ok: false, errorKey: "addServer.error.nameRequired" });
  });

  it("rejects invalid transport", () => {
    const r = parseServerJson(JSON.stringify({ name: "x", transport: "ftp" }));
    expect(r).toEqual({ ok: false, errorKey: "addServer.error.transportInvalid" });
  });

  it("accepts a valid stdio server", () => {
    const r = parseServerJson(
      JSON.stringify({ name: "filesystem", transport: "stdio", command: "npx", args: ["-y", "x"] }),
    );
    expect(r).toEqual({
      ok: true,
      payload: { name: "filesystem", transport: "stdio", command: "npx", args: ["-y", "x"] },
    });
  });

  it("accepts a valid streamable_http server", () => {
    const r = parseServerJson(JSON.stringify({ name: "ctx", transport: "streamable_http", url: "https://x/mcp" }));
    expect(r.ok).toBe(true);
  });

  it("rejects stdio without command", () => {
    const r = parseServerJson(JSON.stringify({ name: "x", transport: "stdio" }));
    expect(r).toEqual({ ok: false, errorKey: "addServer.error.commandRequired" });
  });

  it("rejects streamable_http without url", () => {
    const r = parseServerJson(JSON.stringify({ name: "x", transport: "streamable_http" }));
    expect(r).toEqual({ ok: false, errorKey: "addServer.error.urlRequired" });
  });
});

describe("buildRegisterPayload", () => {
  const base = {
    name: "s", description: "", session_mode: "stateless" as const,
    command: "", args_text: "", env_rows: [{ key: "", value: "" }],
    url: "", bearer_token: "", header_rows: [{ key: "", value: "" }],
  };
  it("builds stdio payload with args + env", () => {
    const p = buildRegisterPayload({ ...base, transport: "stdio", command: "npx", args_text: "-y\nx", env_rows: [{ key: "K", value: "v" }] });
    expect(p).toMatchObject({ name: "s", transport: "stdio", command: "npx", args: ["-y", "x"], env: { K: "v" } });
  });
  it("builds streamable_http payload with headers", () => {
    const p = buildRegisterPayload({ ...base, transport: "streamable_http", url: "https://x/mcp", header_rows: [{ key: "H", value: "v" }] });
    expect(p).toMatchObject({ name: "s", transport: "streamable_http", url: "https://x/mcp", headers: { H: "v" } });
  });
});
