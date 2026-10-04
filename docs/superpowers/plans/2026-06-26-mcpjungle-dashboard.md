# MCPJungle Dashboard 改善 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 MCPJungle dashboard(React18+TS+Vite)加 i18n(en+zh-TW)、把 Add Server 改成分段控件三模式(Remote/Local/貼 JSON)、新增 in-app 安裝說明頁,並 PR 回上游。

**Architecture:** 純前端改動,後端 Go 不動。三個 phase = 三個 PR,各自獨立可 merge;PR1(i18n 基建)先行,PR2/PR3 依賴它。測試策略:純邏輯函式用 vitest 單元測試,UI 改動靠 `tsc --noEmit` + `vite build` + 手動驗證。

**Tech Stack:** React 18, TypeScript 5.5, Vite 5, react-i18next, i18next-browser-languagedetector, vitest。

**工作目錄:** MCPJungle fork 的 worktree,所有路徑相對 `web/dashboard/`。spec:`mcp-library/docs/superpowers/specs/2026-06-26-mcpjungle-dashboard-design.md`。

## Global Constraints

- **視覺**:只用 MCPJungle 現有 CSS token(`--accent #1f883d`、`--bg-soft`、`--panel`、`--border`、`--text`、`--muted`、`--shadow`、`--radius-md`),不引入任何別套品牌(DBX)的顏色/字體。
- **i18n**:預設語言 `en`(base,所有 key 來源);第一版語言包只有 `en` + `zh-TW`;用 react-i18next;key 用巢狀 namespace(`nav.*`、`section.*`、`addServer.*`、`setupGuide.*`、`common.*`)。
- **測試**:純函式(payload 組裝、JSON 解析驗證、args 解析)寫 vitest 單元測試;UI 元件不寫測試,靠 typecheck + build + 手動驗證。
- **OAuth flow 保留不動**:`registerOAuth` 相關 state、`pollOAuthSession`、OAuth step UI 一律保持現有行為。
- **register API 不變**:`POST /api/dashboard/servers`,body = `DashboardRegisterServerInput`。後端 Go 完全不碰。
- **上游風格**:2 空格縮排、現有 class 命名慣例(kebab-case)、現有檔案組織;每個 phase 結束 squash 成一個乾淨 commit 對應一個 PR。
- **commit 時機**:每個 task 結束 commit;每個 phase(PR)完成後該分支即可開 PR。

---

## Phase 1 — PR1:i18n 基建

**交付物**:dashboard 全畫面字串走 i18n,sidebar 底部可切 en / 繁體中文,語言選擇持久化。功能行為不變。

### Task 1: 加入 vitest 與 i18n 依賴、測試骨架

**Files:**
- Modify: `web/dashboard/package.json`
- Create: `web/dashboard/vitest.config.ts`
- Create: `web/dashboard/src/lib/__tests__/smoke.test.ts`

**Interfaces:**
- Produces: `npm test` 指令(`vitest run`),供後續純函式 task 使用。

- [ ] **Step 1: 加依賴與 test script**

`package.json` 的 `dependencies` 加:
```json
"react-i18next": "^15.1.0",
"i18next": "^23.16.0",
"i18next-browser-languagedetector": "^8.0.0"
```
`devDependencies` 加:
```json
"vitest": "^2.1.0"
```
`scripts` 加:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 2: 建 vitest config**

`web/dashboard/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: 寫 smoke 測試確認 vitest 跑得起來**

`web/dashboard/src/lib/__tests__/smoke.test.ts`:
```ts
import { describe, expect, it } from "vitest";

describe("vitest wiring", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 4: 安裝並跑測試**

Run: `cd web/dashboard && npm install && npm test`
Expected: 1 passed。

- [ ] **Step 5: Commit**

```bash
git add web/dashboard/package.json web/dashboard/package-lock.json web/dashboard/vitest.config.ts web/dashboard/src/lib/__tests__/smoke.test.ts
git commit -m "chore(dashboard): add vitest + i18n deps and test harness"
```

### Task 2: i18n 初始化 + locale 骨架 + main.tsx 掛載

**Files:**
- Create: `web/dashboard/src/i18n.ts`
- Create: `web/dashboard/src/locales/en.json`
- Create: `web/dashboard/src/locales/zh-TW.json`
- Modify: `web/dashboard/src/main.tsx`

**Interfaces:**
- Produces: 全域 i18n 實例(import 副作用初始化);`useTranslation()` 在任何元件可用;`i18n.changeLanguage(lng)` 切換語言。

- [ ] **Step 1: 建 en.json 骨架**(僅放本 task 需要的最小 key,後續 task 增補)

`web/dashboard/src/locales/en.json`:
```json
{
  "common": {
    "language": "Language"
  }
}
```

- [ ] **Step 2: 建 zh-TW.json 對應**

`web/dashboard/src/locales/zh-TW.json`:
```json
{
  "common": {
    "language": "語言"
  }
}
```

- [ ] **Step 3: 建 i18n.ts**

`web/dashboard/src/i18n.ts`:
```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import zhTW from "./locales/zh-TW.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "zh-TW", label: "繁體中文" },
] as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      "zh-TW": { translation: zhTW },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "zh-TW"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "mcpjungle-lang",
    },
  });

export default i18n;
```

- [ ] **Step 4: main.tsx 掛載 i18n(在 App 之前 import,確保 render 前初始化)**

`web/dashboard/src/main.tsx` 在 `import App from "./App";` 上方加一行:
```ts
import "./i18n";
```

- [ ] **Step 5: typecheck + build 驗證**

Run: `cd web/dashboard && npm run build`
Expected: tsc 無錯、vite build 成功(JSON import 需 `resolveJsonModule`,Vite 預設支援;若 tsc 報錯,確認 `tsconfig.json` 有 `"resolveJsonModule": true`,沒有就加)。

- [ ] **Step 6: Commit**

```bash
git add web/dashboard/src/i18n.ts web/dashboard/src/locales web/dashboard/src/main.tsx web/dashboard/tsconfig.json
git commit -m "feat(dashboard): initialize react-i18next with en + zh-TW"
```

### Task 3: NavSidebar 字串 i18n 化(建立抽取範式)

**Files:**
- Modify: `web/dashboard/src/components/NavSidebar.tsx`
- Modify: `web/dashboard/src/locales/en.json`
- Modify: `web/dashboard/src/locales/zh-TW.json`

**Interfaces:**
- Consumes: `useTranslation` from react-i18next。
- Produces: `nav.*` key 命名範式,後續 App.tsx 抽取依此模式。

- [ ] **Step 1: en.json 增補 nav key**

在 en.json 加(與 `common` 同層):
```json
"nav": {
  "servers": "Servers",
  "tools": "Tools",
  "toolGroups": "Tool Groups",
  "prompts": "Prompts",
  "resources": "Resources",
  "systemInfo": "System Info",
  "reportBugs": "Report Bugs",
  "documentation": "Documentation"
}
```

- [ ] **Step 2: zh-TW.json 對應**

```json
"nav": {
  "servers": "伺服器",
  "tools": "工具",
  "toolGroups": "工具群組",
  "prompts": "提示",
  "resources": "資源",
  "systemInfo": "系統資訊",
  "reportBugs": "回報問題",
  "documentation": "說明文件"
}
```

- [ ] **Step 3: NavSidebar.tsx 改用 t()**

把 `items` 的 `label` 由寫死字串改為 i18n key,渲染時 `t()`。把第 3-10 行的 `items` 改為:
```tsx
const items: Array<{ key: AppSection; labelKey: string }> = [
  { key: "servers", labelKey: "nav.servers" },
  { key: "tools", labelKey: "nav.tools" },
  { key: "tool_groups", labelKey: "nav.toolGroups" },
  { key: "prompts", labelKey: "nav.prompts" },
  { key: "resources", labelKey: "nav.resources" },
  { key: "diagnostics", labelKey: "nav.systemInfo" },
];
```
元件內加 `const { t } = useTranslation();`(從 `react-i18next` import),把 `{item.label}` 改成 `{t(item.labelKey)}`,把 `Report Bugs`/`Documentation` 兩個 `<span>` 內容改成 `{t("nav.reportBugs")}` / `{t("nav.documentation")}`。

- [ ] **Step 4: 手動驗證**

Run: `cd web/dashboard && npm run dev`,瀏覽器開 dashboard,確認側欄文字正常顯示(英文)。
Expected: 側欄項目顯示正常,無 raw key(如顯示 `nav.servers` 表示 i18n 沒初始化,回頭查 Task 2)。

- [ ] **Step 5: Commit**

```bash
git add web/dashboard/src/components/NavSidebar.tsx web/dashboard/src/locales
git commit -m "feat(dashboard): i18n NavSidebar labels"
```

### Task 4: App.tsx 字串抽取

**Files:**
- Modify: `web/dashboard/src/App.tsx`
- Modify: `web/dashboard/src/locales/en.json`
- Modify: `web/dashboard/src/locales/zh-TW.json`

**Interfaces:**
- Consumes: `useTranslation`(在 `App` 元件內 `const { t } = useTranslation();`)。
- 注意:`sectionMeta` 是模組層常數,改成 function `getSectionMeta(t)` 或在元件內 `useMemo`,因為 `t` 是 hook 取得。

**抽取清單(分組,逐組做)** — 把以下寫死英文改成 `t("…")` 並在兩個 locale 補 key。**key 命名照 `section.*` / `feedback.*` / `addServer.*` / `toolGroup.*` / `common.*`**:

1. `sectionMeta`(App.tsx 101-126):六個 section 的 `title`/`subtitle` → `section.servers.title` 等。改寫成元件內 `const sectionMeta = useMemo(() => ({...}), [t]);`(或 `getSectionMeta(t)` 純函式置於元件外、傳 `t`)。
2. 載入/錯誤畫面(957-969):`Loading dashboard`、`Querying…`、`Dashboard API unavailable`、`Failed to load…` → `common.loading.*`。
3. Feedback banner(950-955):`Updated` / `Request failed` → `feedback.updated` / `feedback.failed`。
4. Servers 區(997-1010、1045-1075):`Registered MCP servers`、`Search servers`、`+ Add Server`、`Enabled`/`Disabled`、`Enable`/`Disable`/`Saving...`、`tools`、delete 確認文字(830-832)、`+ Add Tool Group` 等 → `section.servers.*` / `common.*`。
5. Modal(register + tool group)所有 `<span>` label、`placeholder`、按鈕、`Close`/`Cancel`、validation 訊息(404-414 的 `getRegisterValidationError` 回傳字串)、OAuth step 文案(1951-1962、2178-2185) → `addServer.*`。**validation 純函式改為回傳 key**(見下)。
6. 各 section 表頭、空狀態、`No description`、`Unknown`、`None` 等 → `common.*`。

- [ ] **Step 1: 把 validation 純函式改成回傳 i18n key(可測)**

`getRegisterValidationError`(App.tsx 404-415)改成回傳 key 字串(或空字串):
```ts
function getRegisterValidationError(form: RegisterServerFormState): string {
  if (!form.name.trim()) return "addServer.error.nameRequired";
  if (form.transport === "stdio" && !form.command.trim()) return "addServer.error.commandRequired";
  if ((form.transport === "streamable_http" || form.transport === "sse") && !form.url.trim()) {
    return "addServer.error.urlRequired";
  }
  return "";
}
```
呼叫端(702-706)改成 `setRegisterError(key ? t(key) : "")`。

- [ ] **Step 2: 逐組抽取上述 1-6**,每組改完存檔。en/zh-TW 同步補 key。`sectionMeta` 改成元件內 `useMemo`。

- [ ] **Step 3: typecheck**

Run: `cd web/dashboard && npm run typecheck`
Expected: 無錯(特別注意 `sectionMeta` 從常數改 hook 後,所有引用點 `currentSectionMeta` 仍可用)。

- [ ] **Step 4: 手動驗證 + grep 殘留**

Run: `cd web/dashboard && npm run dev`,逐頁點過 Servers/Tools/Tool Groups/Prompts/Resources/System Info、開 Add Server / Add Tool Group modal,確認無 raw key、無漏字。
Run: `grep -nE '>[A-Z][a-z]+ [A-Z]' web/dashboard/src/App.tsx`(粗篩殘留英文,人工判斷)。
Expected: 可見字串皆來自 `t()`(技術性 code 字面如 transport 值 `stdio`/`streamable_http` 不算文案,保留)。

- [ ] **Step 5: Commit**

```bash
git add web/dashboard/src/App.tsx web/dashboard/src/locales
git commit -m "feat(dashboard): i18n App.tsx user-facing strings"
```

### Task 5: 語言切換器 + sidebar 底部

**Files:**
- Create: `web/dashboard/src/components/LanguageSwitcher.tsx`
- Modify: `web/dashboard/src/components/NavSidebar.tsx`
- Modify: `web/dashboard/src/styles.css`

**Interfaces:**
- Consumes: `SUPPORTED_LANGUAGES` from `@/i18n`;`useTranslation`(`i18n.changeLanguage`、`i18n.language`)。

- [ ] **Step 1: 建 LanguageSwitcher**

`web/dashboard/src/components/LanguageSwitcher.tsx`:
```tsx
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES } from "@/i18n";

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  return (
    <label className="language-switcher">
      <span className="language-switcher-label">{t("common.language")}</span>
      <select
        className="table-filter form-input compact-select"
        onChange={(event) => void i18n.changeLanguage(event.target.value)}
        value={i18n.resolvedLanguage}
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng.code} value={lng.code}>
            {lng.label}
          </option>
        ))}
      </select>
    </label>
  );
}
```

- [ ] **Step 2: 放進 NavSidebar 底部**(在 Documentation `<a>` 之後、`</aside>` 之前)加 `<LanguageSwitcher />`(import 之)。

- [ ] **Step 3: 加最小樣式**

`styles.css` 末尾:
```css
.language-switcher {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 12px;
  margin-top: auto;
}
.language-switcher-label {
  font-size: 12px;
  color: var(--muted);
}
```

- [ ] **Step 4: 手動驗證**

Run: `npm run dev`,點語言切換成「繁體中文」→ 全畫面切繁中;重整頁面 → 仍是繁中(localStorage 持久化)。
Expected: 切換即時生效、持久化。

- [ ] **Step 5: Commit**

```bash
git add web/dashboard/src/components/LanguageSwitcher.tsx web/dashboard/src/components/NavSidebar.tsx web/dashboard/src/styles.css
git commit -m "feat(dashboard): add language switcher (en / zh-TW)"
```

> **PR1 完成**:`npm run build` + `npm test` 綠 → 開 PR「feat(dashboard): i18n (en + zh-TW)」。

---

## Phase 2 — PR2:Add Server 分段控件三模式

**交付物**:register Modal 從「transport 下拉」改為「Remote URL / Local 指令 / 貼 JSON」分段控件;新增貼 JSON 模式;Modal 抽成獨立元件。OAuth flow 不變。

### Task 6: SegmentedControl 通用元件

**Files:**
- Create: `web/dashboard/src/components/SegmentedControl.tsx`
- Modify: `web/dashboard/src/styles.css`

**Interfaces:**
- Produces: `SegmentedControl<T extends string>({ options, value, onChange })`,`options: Array<{ value: T; label: string }>`。

- [ ] **Step 1: 建元件**

`web/dashboard/src/components/SegmentedControl.tsx`:
```tsx
interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: Array<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div className="segmented" role="tablist" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`segmented-option ${value === option.value ? "is-active" : ""}`}
          onClick={() => onChange(option.value)}
          role="tab"
          aria-selected={value === option.value}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 加 CSS(用現有 token,激活段浮起)**

`styles.css` 末尾:
```css
.segmented {
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}
.segmented-option {
  height: 30px;
  padding: 0 14px;
  border: none;
  border-radius: 9px;
  background: transparent;
  color: var(--muted);
  font: 500 13px inherit;
  cursor: pointer;
}
.segmented-option.is-active {
  background: var(--panel-strong);
  color: var(--text);
  box-shadow: var(--shadow);
}
```

- [ ] **Step 3: typecheck**

Run: `cd web/dashboard && npm run typecheck`
Expected: 無錯。

- [ ] **Step 4: Commit**

```bash
git add web/dashboard/src/components/SegmentedControl.tsx web/dashboard/src/styles.css
git commit -m "feat(dashboard): add SegmentedControl component"
```

### Task 7: 貼 JSON 解析驗證純函式(TDD)

**Files:**
- Create: `web/dashboard/src/lib/registerForm.ts`
- Create: `web/dashboard/src/lib/__tests__/registerForm.test.ts`

**Interfaces:**
- Produces: `parseServerJson(text: string): { ok: true; payload: DashboardRegisterServerInput } | { ok: false; errorKey: string }`。

- [ ] **Step 1: 寫失敗測試**

`web/dashboard/src/lib/__tests__/registerForm.test.ts`:
```ts
import { describe, expect, it } from "vitest";
import { parseServerJson } from "../registerForm";

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
});
```

- [ ] **Step 2: 跑測試確認失敗**

Run: `cd web/dashboard && npm test`
Expected: FAIL（`parseServerJson` not defined）。

- [ ] **Step 3: 實作**

`web/dashboard/src/lib/registerForm.ts`:
```ts
import type { DashboardRegisterServerInput } from "./types";

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
  return { ok: true, payload: obj as unknown as DashboardRegisterServerInput };
}
```

- [ ] **Step 4: 跑測試確認通過**

Run: `cd web/dashboard && npm test`
Expected: PASS（5 passed）。

- [ ] **Step 5: Commit**

```bash
git add web/dashboard/src/lib/registerForm.ts web/dashboard/src/lib/__tests__/registerForm.test.ts
git commit -m "feat(dashboard): add parseServerJson with tests"
```

### Task 8: buildRegisterPayload 抽出並加測試(TDD,鎖住既有行為)

**Files:**
- Modify: `web/dashboard/src/App.tsx`（移出純函式）
- Modify: `web/dashboard/src/lib/registerForm.ts`（接收 `buildRegisterPayload`、`splitArgs`、`rowsToMap`、`RegisterServerFormState`、`KeyValueRow`）
- Modify: `web/dashboard/src/lib/__tests__/registerForm.test.ts`

**Interfaces:**
- Produces: `buildRegisterPayload(form: RegisterServerFormState): DashboardRegisterServerInput`、型別 `RegisterServerFormState`、`KeyValueRow`（從 App.tsx 移到 `lib/registerForm.ts`,App.tsx import 回來）。

- [ ] **Step 1: 把型別與純函式搬到 lib/registerForm.ts**

將 App.tsx 的 `KeyValueRow`(61-64)、`RegisterServerFormState`(66-77)、`createEmptyPair`(366-368)、`rowsToMap`(385-395)、`splitArgs`(397-402)、`buildRegisterPayload`(417-446)剪到 `lib/registerForm.ts` 並 `export`;App.tsx 改為 `import { ... } from "@/lib/registerForm"`。行為不變。

- [ ] **Step 2: 加行為測試**

在 `registerForm.test.ts` 加:
```ts
import { buildRegisterPayload } from "../registerForm";

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
```

- [ ] **Step 3: 跑測試 + typecheck**

Run: `cd web/dashboard && npm test && npm run typecheck`
Expected: 全 PASS、typecheck 無錯。

- [ ] **Step 4: Commit**

```bash
git add web/dashboard/src/App.tsx web/dashboard/src/lib/registerForm.ts web/dashboard/src/lib/__tests__/registerForm.test.ts
git commit -m "refactor(dashboard): extract register form logic to lib + tests"
```

### Task 9: AddServerModal 元件 + 分段三模式

**Files:**
- Create: `web/dashboard/src/components/AddServerModal.tsx`
- Modify: `web/dashboard/src/App.tsx`（移除內嵌 register Modal JSX,改用 `<AddServerModal .../>`）
- Modify: `web/dashboard/src/locales/en.json`、`zh-TW.json`

**Interfaces:**
- Consumes: `SegmentedControl`、`parseServerJson`、`buildRegisterPayload`、register state/handlers（由 App 以 props 傳入,或把 register 相關 state 一起搬進 modal — 見 Step 1 決策）。
- 新增模式 state:`mode: "remote" | "local" | "json"`(與 `transport` 分離)。`remote` 內以小分段選 `streamable_http`/`sse`;`local` → `transport=stdio`;`json` → textarea + `parseServerJson`。

- [ ] **Step 1: 決定邊界**:把 register 相關 state(`registerForm`、`registerError`、`registerOAuth`、`registerOpen` 的開關 handlers、`submitRegisterServer`、OAuth 相關)**保留在 App**,`AddServerModal` 收 props（受控元件）。Props 介面:
```tsx
interface AddServerModalProps {
  form: RegisterServerFormState;
  mode: "remote" | "local" | "json";
  jsonText: string;
  error: string;
  busy: boolean;
  oauth: RegisterOAuthState | null;
  onModeChange: (mode: "remote" | "local" | "json") => void;
  onField: <K extends keyof RegisterServerFormState>(field: K, value: RegisterServerFormState[K]) => void;
  onJsonText: (text: string) => void;
  onKeyValue: (field: "env_rows" | "header_rows", index: number, key: "key" | "value", value: string) => void;
  onAddRow: (field: "env_rows" | "header_rows") => void;
  onRemoveRow: (field: "env_rows" | "header_rows", index: number) => void;
  onClose: () => void;
  onSubmit: () => void;
  oauthHandlers: { onStart: () => void; onReset: () => void };
}
```
App 新增 `mode`/`jsonText` 兩個 state;`mode` 改變時同步 `transport`(remote→streamable_http 預設、local→stdio)。

- [ ] **Step 2: 搬 JSX**:把 App.tsx 1936-2206 的 register Modal JSX 搬進 `AddServerModal.tsx`,頂部 transport `<select>`(2002-2016)換成 `<SegmentedControl>`(三選:Remote/Local/貼 JSON,label 走 i18n)。各模式顯示:
  - `remote`:小分段選 Streamable HTTP / SSE + url + bearer + (僅 streamable_http) headers
  - `local`:command + args + env
  - `json`:一個 `<textarea>` 綁 `jsonText`,送出時用 `parseServerJson`
  OAuth step JSX 原樣保留。

- [ ] **Step 3: 送出邏輯**:`onSubmit` 在 App 內,`json` 模式時走 `parseServerJson(jsonText)`(失敗 setError(t(errorKey))),成功用回傳 payload 呼叫 `api.registerServer`;`remote`/`local` 模式沿用 `buildRegisterPayload(form)`。

- [ ] **Step 4: i18n key**:`addServer.tab.remote/local/json`、`addServer.field.*`、`addServer.error.transportInvalid`/`jsonInvalid`、`addServer.json.placeholder`(放一段範例)等,en/zh-TW 補齊。

- [ ] **Step 5: typecheck + build + 手動驗證**

Run: `cd web/dashboard && npm run build`
Expected: 無錯。
手動:`npm run dev` → 開 Add Server → 三段切換顯示對應欄位 → 各註冊一個(Remote 用 context7、Local 用 filesystem `npx -y @modelcontextprotocol/server-filesystem /host`、JSON 貼一段)→ 都成功;OAuth server(若有)流程不變。

- [ ] **Step 6: Commit**

```bash
git add web/dashboard/src/components/AddServerModal.tsx web/dashboard/src/App.tsx web/dashboard/src/locales
git commit -m "feat(dashboard): segmented Add Server modal (remote/local/json)"
```

> **PR2 完成**:`npm run build` + `npm test` 綠 → 開 PR「feat(dashboard): segmented Add Server with JSON paste mode」。

---

## Phase 3 — PR3:安裝說明頁

**交付物**:sidebar 在 Documentation 下方新增 in-app 導航項;點開是教學式說明頁(三種安裝方式,每種給可照抄實例 + 對應欄位標註),走 i18n。

### Task 10: AppSection 擴充 + setup_guide section

> **與 Task 11 為同一交付單元**:Task 10 擴充 section、Task 11 建 `SetupGuidePage`,兩者必須一起 typecheck / 一起 commit(分開無法單獨編譯)。派子代理時當「一個 task」派。

**Files:**
- Modify: `web/dashboard/src/lib/types.ts`（`AppSection` 加 `setup_guide`）
- Modify: `web/dashboard/src/App.tsx`（`sectionMeta` 加一筆、render 區加 setup_guide 分支）
- Modify: `web/dashboard/src/locales/en.json`、`zh-TW.json`

**Interfaces:**
- Produces: `AppSection` 多一個 `"setup_guide"` 成員;App render 在 `section === "setup_guide"` 時顯示 `<SetupGuidePage />`。

- [ ] **Step 1: types.ts 擴充**

`AppSection` union(types.ts 1-7)加 `| "setup_guide"`。

- [ ] **Step 2: sectionMeta 加筆**:在 Task 4 改成的 `getSectionMeta`/`useMemo` 內加 `setup_guide: { title: t("setupGuide.title"), subtitle: t("setupGuide.subtitle") }`。

- [ ] **Step 3: render 分支**:在 App 的 content-grid 內加 `{section === "setup_guide" ? <SetupGuidePage /> : null}`（SetupGuidePage 於 Task 11 建立;本 step 先留 import + 分支,Task 11 補元件）。

- [ ] **Step 4: i18n key 骨架**:en/zh-TW 加 `setupGuide.title`、`setupGuide.subtitle`、`setupGuide.navTitle`。

- [ ] **Step 5: typecheck**

Run: `cd web/dashboard && npm run typecheck`
Expected: 無錯（SetupGuidePage 若尚未建立會報錯 → 與 Task 11 合併驗證,本 task commit 可在 Task 11 後）。

- [ ] **Step 6: Commit**（與 Task 11 合併為一個 commit;此 task 不單獨 commit）

### Task 11: SetupGuidePage 元件（教學式）

**Files:**
- Create: `web/dashboard/src/components/SetupGuidePage.tsx`
- Modify: `web/dashboard/src/locales/en.json`、`zh-TW.json`
- Modify: `web/dashboard/src/styles.css`（教學卡片樣式,用現有 token）

**Interfaces:**
- Consumes: `useTranslation`、`CopyButton`（現有元件,可複製範例）。

- [ ] **Step 1: 建元件**（三種安裝方式,每種一張卡:說明 + 可複製範例 + 「填在哪格」對照）

`SetupGuidePage.tsx` 結構（用 `t()` 取所有文案,範例值可直接內嵌字串常數因為是 code 範例非 UI 文案）:
```tsx
import { useTranslation } from "react-i18next";
import { CopyButton } from "@/components/CopyButton";

const JSON_EXAMPLE = `{
  "name": "context7",
  "transport": "streamable_http",
  "url": "https://mcp.context7.com/mcp"
}`;

export function SetupGuidePage() {
  const { t } = useTranslation();
  return (
    <section className="setup-guide">
      <p className="setup-guide-intro">{t("setupGuide.intro")}</p>

      <article className="setup-guide-card">
        <h3>{t("setupGuide.remote.title")}</h3>
        <p>{t("setupGuide.remote.body")}</p>
        <div className="setup-guide-example">
          <code>https://mcp.context7.com/mcp</code>
          <CopyButton ariaLabel="Copy URL" title="Copy" value="https://mcp.context7.com/mcp" />
        </div>
        <p className="setup-guide-fields">{t("setupGuide.remote.fields")}</p>
      </article>

      <article className="setup-guide-card">
        <h3>{t("setupGuide.local.title")}</h3>
        <p>{t("setupGuide.local.body")}</p>
        <div className="setup-guide-example">
          <code>npx -y @modelcontextprotocol/server-filesystem /host</code>
          <CopyButton ariaLabel="Copy command" title="Copy" value="npx -y @modelcontextprotocol/server-filesystem /host" />
        </div>
        <p className="setup-guide-fields">{t("setupGuide.local.fields")}</p>
        <p className="setup-guide-note">{t("setupGuide.local.note")}</p>
      </article>

      <article className="setup-guide-card">
        <h3>{t("setupGuide.json.title")}</h3>
        <p>{t("setupGuide.json.body")}</p>
        <div className="setup-guide-example">
          <pre><code>{JSON_EXAMPLE}</code></pre>
          <CopyButton ariaLabel="Copy JSON" title="Copy" value={JSON_EXAMPLE} />
        </div>
      </article>
    </section>
  );
}
```

- [ ] **Step 2: 教學文案 en/zh-TW**（`setupGuide.intro`、`*.remote.{title,body,fields}`、`*.local.{title,body,fields,note}`、`*.json.{title,body}`）。`fields` 文案描述「哪格填什麼」,例:en `"Server name → a label like 'context7'; Target URL → the example above."`;zh-TW「Server name 欄填一個名字(如 context7);Target URL 欄填上面那串網址。」`local.note`:stdio 需 gateway 為 `-stdio` image。

- [ ] **Step 3: 樣式**（`styles.css`,用 token）:
```css
.setup-guide { display: flex; flex-direction: column; gap: 16px; }
.setup-guide-card { background: var(--panel); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 16px 20px; }
.setup-guide-example { display: flex; align-items: center; gap: 8px; background: var(--bg-soft); border-radius: 8px; padding: 8px 12px; margin: 8px 0; }
.setup-guide-fields { color: var(--muted); font-size: 13px; }
.setup-guide-note { color: var(--bad); font-size: 12px; }
```

- [ ] **Step 4: typecheck + build + 手動**

Run: `cd web/dashboard && npm run build`
Expected: 無錯。手動:側欄點說明項 → 顯示三張卡、複製鈕可用、切語言文案跟著變。

- [ ] **Step 5: Commit**（含 Task 10 的改動）

```bash
git add web/dashboard/src/lib/types.ts web/dashboard/src/App.tsx web/dashboard/src/components/SetupGuidePage.tsx web/dashboard/src/locales web/dashboard/src/styles.css
git commit -m "feat(dashboard): add in-app setup guide page"
```

### Task 12: NavSidebar 加說明頁導航項

**Files:**
- Modify: `web/dashboard/src/components/NavSidebar.tsx`
- Modify: `web/dashboard/src/styles.css`（如需區分內部 section 與外部連結樣式）

**Interfaces:**
- Consumes: `active`/`onSelect`(現有 props,型別已含 `setup_guide`)。

- [ ] **Step 1: 加導航項**:在 Documentation `<a>` 下方加一個 `<button class="nav-item ...">`（in-app section,非外部連結),`onClick={() => onSelect("setup_guide")}`,文字 `t("setupGuide.navTitle")`,active 樣式比照現有 nav-item。位置 = 用戶截圖紅框(Documentation 下方)。

- [ ] **Step 2: 手動驗證**

Run: `cd web/dashboard && npm run dev`
Expected: 側欄 Documentation 下方出現說明項,點擊切到說明頁、高亮正確,其他頁切換不受影響。

- [ ] **Step 3: Commit**

```bash
git add web/dashboard/src/components/NavSidebar.tsx web/dashboard/src/styles.css
git commit -m "feat(dashboard): add setup guide nav item"
```

> **PR3 完成**:`npm run build` + `npm test` 綠 → 開 PR「feat(dashboard): in-app setup guide page」。

---

## 跨 phase 收尾

- [ ] 三個 PR 各自 `npm run build`(含 `tsc --noEmit`)、`npm test` 綠。
- [ ] 完整 build 後若要在 Go binary 驗證:回 repo 根照上游 build 流程(`web/dashboard` 產物 `go:embed`)重 build binary,起 server 確認 UI。
- [ ] 對齊上游 CONTRIBUTING:確認 lint/format(若上游有 eslint/prettier 設定,實作中沿用)。
- [ ] 每個 PR 描述附「為什麼 + 截圖 + 測試方式」,i18n PR 註明新增 `react-i18next` 依賴的理由。

## 風險

| 風險 | 緩解 |
|---|---|
| 上游不收 i18n 依賴 | PR1 獨立;若被拒,改私有 fork build `ghcr.io/elf-express/mcpjungle` 自用 |
| App.tsx 2211 行抽字串/搬元件易回歸 | Task 4 分組逐步;Task 8/9 先抽純函式加測試鎖行為;每步 typecheck |
| `sectionMeta` 常數改 hook 影響引用 | Task 4 Step 3 typecheck 把關 |
| 上游有既定 lint 規則衝突 | 收尾對齊 CONTRIBUTING |
