/**
 * corpus-roots.test.ts — 多語料根目錄
 * 一個 corpora 根 = 其下每個子目錄是一個語料;books 結構下每本書的 corpus/ 都是一個根。
 */
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import {
  discoverCorpora,
  listBookCorpusRoots,
  resolveCorporaDirs,
  _clearCaches,
} from "../src/corpus.js";

let books: string;
const originalEnv = process.env.DOCS_CORPORA_DIR;

function write(rel: string, content: string) {
  const p = path.join(books, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf-8");
}

beforeAll(() => {
  books = fs.mkdtempSync(path.join(os.tmpdir(), "docs-books-"));
  write("alpha/corpus/alpha-en/corpus.json", JSON.stringify({ title: "Alpha" }));
  write("alpha/corpus/alpha-en/a.md", "# A\n");
  write("alpha/source/raw.md", "# 原稿不是語料\n");
  write("beta/corpus/beta-zh-tw/b.md", "# B\n");
  write("beta/corpus/dup-en/first.md", "# 先掃到\n");
  write("gamma/corpus/dup-en/second.md", "# 後掃到\n");
  write("delta/source/only.md", "# 只有原稿\n");
  write(".vscode/extensions.json", "{}");
});

afterEach(() => {
  if (originalEnv === undefined) delete process.env.DOCS_CORPORA_DIR;
  else process.env.DOCS_CORPORA_DIR = originalEnv;
  _clearCaches();
  vi.restoreAllMocks();
});

afterAll(() => fs.rmSync(books, { recursive: true, force: true }));

describe("listBookCorpusRoots", () => {
  it("只回傳有 corpus/ 的書,略過 . 開頭目錄與只有 source/ 的書", () => {
    const roots = listBookCorpusRoots(books).map((r) => path.relative(books, r).split(path.sep).join("/"));
    expect(roots).toEqual(["alpha/corpus", "beta/corpus", "gamma/corpus"]);
  });
  it("books 目錄不存在時回空陣列", () => {
    expect(listBookCorpusRoots(path.join(books, "nope"))).toEqual([]);
  });
});

describe("resolveCorporaDirs", () => {
  it("DOCS_CORPORA_DIR 可用 path.delimiter 指定多個根,空段忽略", () => {
    const a = path.join(books, "alpha", "corpus");
    const b = path.join(books, "beta", "corpus");
    process.env.DOCS_CORPORA_DIR = [a, "", b, ""].join(path.delimiter);
    expect(resolveCorporaDirs()).toEqual([path.resolve(a), path.resolve(b)]);
  });
});

describe("discoverCorpora(多根)", () => {
  it("合併所有根的語料", () => {
    process.env.DOCS_CORPORA_DIR = listBookCorpusRoots(books).join(path.delimiter);
    _clearCaches();
    const ids = discoverCorpora().map((c) => c.id);
    expect(ids).toEqual(["alpha-en", "beta-zh-tw", "dup-en"]);
  });
  it("id 重複時保留先掃到的根並警告", () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    process.env.DOCS_CORPORA_DIR = listBookCorpusRoots(books).join(path.delimiter);
    _clearCaches();
    const dup = discoverCorpora().find((c) => c.id === "dup-en")!;
    expect(dup.dir).toBe(path.join(books, "beta", "corpus", "dup-en"));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("dup-en"));
  });
});
