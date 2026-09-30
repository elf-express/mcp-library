import { describe, it, expect, afterEach } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { sourceUrlFor } from "../src/notes";

describe("sourceUrlFor — 跨目錄 cache 隔離", () => {
  const dirsToCleanup: string[] = [];
  const originalEnv = process.env.SQLSUGAR_NOTES_DIR;

  afterEach(() => {
    // 還原環境變數
    if (originalEnv === undefined) {
      delete process.env.SQLSUGAR_NOTES_DIR;
    } else {
      process.env.SQLSUGAR_NOTES_DIR = originalEnv;
    }
    // 清理暫存目錄
    for (const d of dirsToCleanup) {
      try {
        fs.rmSync(d, { recursive: true, force: true });
      } catch {
        /* ignore */
      }
    }
    dirsToCleanup.length = 0;
  });

  it("切換 SQLSUGAR_NOTES_DIR 時應讀到新目錄的 sources.json,即使 mtime 相同", () => {
    // 建立兩個暫存目錄,各放內容不同的 sources.json
    const dirA = fs.mkdtempSync(path.join(os.tmpdir(), "sqlsugar-test-A-"));
    const dirB = fs.mkdtempSync(path.join(os.tmpdir(), "sqlsugar-test-B-"));
    dirsToCleanup.push(dirA, dirB);

    const sourcesA: Record<string, string> = { "xxx.md": "https://source-from-dirA.example.com" };
    const sourcesB: Record<string, string> = { "xxx.md": "https://source-from-dirB.example.com" };

    fs.writeFileSync(path.join(dirA, "sources.json"), JSON.stringify(sourcesA), "utf-8");
    fs.writeFileSync(path.join(dirB, "sources.json"), JSON.stringify(sourcesB), "utf-8");

    // 強制兩個 sources.json 有完全相同的 mtime
    const sharedMtime = new Date(2000, 0, 1, 0, 0, 0, 0); // 2000-01-01 00:00:00
    fs.utimesSync(path.join(dirA, "sources.json"), sharedMtime, sharedMtime);
    fs.utimesSync(path.join(dirB, "sources.json"), sharedMtime, sharedMtime);

    // 先用目錄 A 載入
    process.env.SQLSUGAR_NOTES_DIR = dirA;
    const urlFromA = sourceUrlFor("xxx.md");
    expect(urlFromA).toBe("https://source-from-dirA.example.com");

    // 切換到目錄 B(mtime 相同),應該拿到 B 的內容
    process.env.SQLSUGAR_NOTES_DIR = dirB;
    const urlFromB = sourceUrlFor("xxx.md");
    expect(urlFromB).toBe("https://source-from-dirB.example.com");
  });
});
