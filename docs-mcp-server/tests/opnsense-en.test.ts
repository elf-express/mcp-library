/**
 * opnsense-en.test.ts — smoke test for a newly added corpus (uses the REAL bundled corpus, no fixtures).
 * Based on elf-mcp-knowledge templates/corpus-smoke.test.ts.
 * Assertions must use real headings / keywords from the corpus (see evidence E7: no loosened matching).
 */
import { beforeEach, describe, expect, it } from "vitest";
import {
  _clearCaches,
  getCorpus,
  listMarkdownFiles,
  doListCorpora,
  doSearch,
  doRead,
  doOutline,
  doCheatsheet,
  doSymbol,
  doCodeSearch,
  sourceLine,
} from "../src/corpus.js";

const ID = "opnsense-en";

beforeEach(() => _clearCaches());

describe(`corpus ${ID} — discovery`, () => {
  it("is discovered with title and declared capabilities", () => {
    const c = getCorpus(ID);
    expect(c).toBeDefined();
    expect(c!.title).toBe("OPNsense Documentation");
    expect(c!.capabilities).toEqual({ cheatsheet: false, examples: false, symbol: false }); // match corpus.json exactly
  });

  it("has the expected number of markdown documents (377 pages + 000 目錄.md, no 000 全書)", () => {
    const files = listMarkdownFiles(getCorpus(ID)!);
    expect(files.length).toBe(378);
    expect(files.some((f) => f.filename.startsWith("000 全書"))).toBe(false);
    expect(files.some((f) => f.filename === "000 目錄.md")).toBe(true);
  });

  it("docs_list_corpora scoped to this corpus lists only it", () => {
    const out = doListCorpora({ onlyId: ID });
    expect(out).toMatch(new RegExp(`## ${ID}`));
    expect(out).toMatch(/docs_outline/);
    expect(out).toMatch(/共 1 個/);
  });
});

describe(`corpus ${ID} — core tools`, () => {
  it("docs_search finds a real keyword", () => {
    const out = doSearch(ID, "firewall rules", 5, 1);
    expect(out).not.toMatch(/找不到/);
    expect(out).toContain(`## [${ID}] `); // literal, not a RegExp char class
  });

  it("docs_outline lists a real file", () => {
    expect(doOutline(ID, undefined, false)).toMatch(/137 Rules/);
  });

  it("docs_read reads a real file by exact filename and shows the sources.json URL", () => {
    const out = doRead(ID, "137 Rules.md");
    expect(out).toContain("# [opnsense-en] 137 Rules.md");
    expect(out).toContain("📖 官方文件來源:https://docs.opnsense.org/manual/firewall.html");
    expect(out).toMatch(/^# Rules$/m);
  });

  it("source URL comes from sources.json without the YAML closing quote", () => {
    expect(sourceLine(getCorpus(ID)!, "137 Rules.md")).toBe("📖 官方文件來源:https://docs.opnsense.org/manual/firewall.html");
  });
});

// This corpus enables no capability: keep the gating test for each.
describe(`corpus ${ID} — capability gating`, () => {
  it("cheatsheet: disabled corpus returns the friendly hint", () => {
    expect(doCheatsheet(ID, "137 Rules.md")).toMatch(/未啟用速查表/);
  });
  it("symbol: disabled corpus returns the friendly hint", () => {
    expect(doSymbol(ID, "137 Rules", 8)).toMatch(/未啟用 symbol/);
  });
  it("examples: disabled corpus returns the friendly hint", () => {
    expect(doCodeSearch(ID, "", 10, 2)).toMatch(/未啟用 examples|無代碼範例/);
  });
});
