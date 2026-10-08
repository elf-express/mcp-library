/**
 * Stalwart 官方文件(stalwartlabs/website 的 src/content/docs/docs,Starlight md/mdx)
 * → docs-mcp 語料 stalwart-en 的篩選、排序與轉換(純函式,供匯入腳本與測試使用)。
 */

export const SITE = "https://stalw.art";

/** 收錄 .md / .mdx;`_` 開頭的是 Starlight 片段(partial),不是獨立頁面 */
export function isIncluded(relPath: string): boolean {
  const base = relPath.split("/").pop()!;
  return /\.mdx?$/.test(base) && !base.startsWith("_");
}

/** 原稿相對路徑 → 網址路徑(去副檔名、index 取目錄、`_` 轉 `-`,與 Starlight slug 一致) */
export function slugOf(relPath: string): string {
  const parts = relPath.replace(/\.mdx?$/, "").toLowerCase().replace(/_/g, "-").split("/");
  if (parts[parts.length - 1] === "index") parts.pop();
  return parts.join("/");
}

/** 官方頁面網址(結尾帶 `/`,為 stalw.art 的正規網址) */
export function sourceUrl(relPath: string): string {
  const slug = slugOf(relPath);
  return `${SITE}/docs/${slug ? slug + "/" : ""}`;
}

/** 解析相對連結的基準:index 頁以目錄為準(帶 `/`),其他頁不帶 `/`(與瀏覽器在官網上的解析一致) */
function linkBase(relPath: string): string {
  const isIndex = /(^|\/)index\.mdx?$/.test(relPath);
  return isIndex ? sourceUrl(relPath) : sourceUrl(relPath).replace(/\/$/, "");
}

function unquote(v: string): string {
  const t = v.trim();
  if (t.startsWith('"')) return JSON.parse(t) as string;
  if (t.startsWith("'") && t.endsWith("'")) return t.slice(1, -1).replace(/''/g, "'");
  return t;
}

/** 解析扁平 YAML(front matter 與 _meta.yml 都只有 `key: value` 一層) */
export function parseFlatYaml(text: string): Record<string, string> {
  const data: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (m && m[2] !== "") data[m[1]] = unquote(m[2]);
  }
  return data;
}

/** 拆出 front matter 與正文 */
export function splitFrontMatter(raw: string): { data: Record<string, string>; body: string } {
  const text = raw.replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { data: {}, body: text };
  return { data: parseFlatYaml(m[1]), body: text.slice(m[0].length) };
}

function decodeEntities(s: string): string {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
}

function absolutize(href: string, base: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#")) return href;
  if (href.startsWith("/")) return SITE + href;
  return new URL(href, base).href;
}

const LEFTOVER = /<\/?(LinkCard|CardGrid|Tabs|TabItem|svg)\b|^import\s.+\sfrom\s+['"]/;

export interface BodyResult {
  content: string;
  /** 轉換後仍殘留 MDX 元件 / import 的行(行號從 1 起算,以正文計) */
  leftovers: number[];
}

/**
 * 轉換正文(程式碼區塊內一律不動):
 *  - 移除 MDX 的 import 行、`<CardGrid>`、`<Tabs>` 外框、整行的 `<video>`
 *  - `<TabItem label="X">` → `#### X`
 *  - `<LinkCard title="T" href="H" />` → `- [T](絕對網址)`
 *  - 移除行內 `<svg>` 圖示;`<code>x</code>` → `` `x` ``
 *  - 站內連結(`/docs/…`、相對路徑)改為 stalw.art 絕對網址
 */
export function transformBody(body: string, relPath: string): BodyResult {
  const base = linkBase(relPath);
  const out: string[] = [];
  const leftovers: number[] = [];
  let fence: string | null = null;
  const lines = body.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const f = line.match(/^\s*(```+|~~~+)/);
    if (fence) {
      if (f && f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      out.push(line);
      continue;
    }
    if (f) {
      fence = f[1];
      out.push(line);
      continue;
    }
    if (/^import\s.+\sfrom\s+['"][^'"]+['"];?\s*$/.test(line)) continue;
    if (/^\s*<\/?(CardGrid|Tabs)\b[^>]*>\s*$/.test(line) || /^\s*<\/TabItem>\s*$/.test(line)) continue;
    if (/^\s*<video\b[^>]*>\s*<\/video>\s*$/.test(line)) continue;
    const tab = line.match(/^\s*<TabItem\s+label="([^"]+)"[^>]*>\s*$/);
    if (tab) {
      out.push(`#### ${tab[1]}`);
      continue;
    }
    const card = line.match(/^\s*<LinkCard\s+title="([^"]+)"\s+href="([^"]+)"[^>]*\/>\s*$/);
    if (card) {
      out.push(`- [${card[1]}](${absolutize(card[2], base)})`);
      continue;
    }
    if (/<svg\b/.test(line)) line = line.replace(/<svg\b[\s\S]*?<\/svg>/g, "").replace(/ {2,}/g, " ");
    line = line
      .replace(/<code>([\s\S]*?)<\/code>/g, (_, c: string) => "`" + decodeEntities(c) + "`")
      .replace(/\]\(([^)\s]+)\)/g, (_, h: string) => `](${absolutize(h, base)})`);
    if (LEFTOVER.test(line)) leftovers.push(i + 1);
    out.push(line);
  }
  return { content: out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n", leftovers };
}

export interface SourceFile {
  /** 相對 source/en 的路徑,`/` 分隔 */
  rel: string;
  raw: string;
}

export interface DirMeta {
  label?: string;
  order?: number;
}

export interface Page {
  /** 語料內相對路徑(最多一層分類目錄) */
  out: string;
  content: string;
}

export interface PlanResult {
  pages: Page[];
  errors: string[];
}

interface Node {
  name: string;
  rel: string;
  order: number;
  dir?: { label: string; children: Node[] };
  file?: { title: string; description?: string; body: string };
}

function safeName(s: string): string {
  return s.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, " ").trim();
}

const pad = (n: number, w: number) => String(n).padStart(w, "0");

/**
 * 依 _meta.yml 的 order / label 與各頁 sidebar_position 排出閱讀順序,產生語料頁面:
 *  - 頂層目錄 → 分類資料夾 `NN <label>`;頂層的單頁放語料根目錄
 *  - 更深的目錄攤平,檔名 `NNN <標題>.md`(NNN 為分類內流水號)
 *  - 標題重複(如 62 篇 "Overview")時往上加目錄 label 直到唯一
 *  - 每篇:front matter(title / source / description)+ `# 標題` + `> Section:` 路徑 + 正文
 */
export function planCorpus(files: SourceFile[], metas: Record<string, DirMeta>): PlanResult {
  const errors: string[] = [];
  const root: Node = { name: "", rel: "", order: 0, dir: { label: "", children: [] } };

  const dirNode = (rel: string): Node => {
    let cur = root;
    if (!rel) return cur;
    let acc = "";
    for (const part of rel.split("/")) {
      acc = acc ? `${acc}/${part}` : part;
      let next = cur.dir!.children.find((c) => c.dir && c.name === part);
      if (!next) {
        const meta = metas[acc] ?? {};
        next = { name: part, rel: acc, order: meta.order ?? Infinity, dir: { label: meta.label ?? part, children: [] } };
        cur.dir!.children.push(next);
      }
      cur = next;
    }
    return cur;
  };

  for (const f of files) {
    if (!isIncluded(f.rel)) continue;
    const { data, body } = splitFrontMatter(f.raw);
    if (!data.title) {
      errors.push(`${f.rel}:front matter 沒有 title`);
      continue;
    }
    const dirRel = f.rel.includes("/") ? f.rel.slice(0, f.rel.lastIndexOf("/")) : "";
    const name = f.rel.slice(f.rel.lastIndexOf("/") + 1);
    const isIndex = /^index\.mdx?$/.test(name);
    const parent = dirNode(dirRel);
    const pos = data.sidebar_position !== undefined ? Number(data.sidebar_position) : Infinity;
    parent.dir!.children.push({
      name,
      rel: f.rel,
      order: isIndex ? -Infinity : pos,
      file: { title: data.title, description: data.description, body },
    });
    // 目錄沒有 _meta.yml 時,以 index 頁的標題 / 位置代替
    if (isIndex && parent !== root && !metas[dirRel]) {
      parent.dir!.label = data.title;
      if (Number.isFinite(pos)) parent.order = pos;
    }
  }

  const sortTree = (n: Node) => {
    if (!n.dir) return;
    n.dir.children.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
    n.dir.children.forEach(sortTree);
  };
  sortTree(root);

  // 攤平成 (分類, 頁面, 祖先 label 鏈)
  interface Flat { cat: string; node: Node; chain: string[] }
  const flat: Flat[] = [];
  const walk = (n: Node, cat: string, chain: string[]) => {
    for (const c of n.dir!.children) {
      if (c.file) flat.push({ cat, node: c, chain });
      else walk(c, cat, [...chain, c.dir!.label]);
    }
  };
  let catNo = 0;
  for (const c of root.dir!.children) {
    if (c.file) flat.push({ cat: "", node: c, chain: [] });
    else walk(c, `${pad(++catNo, 2)} ${safeName(c.dir!.label)}`, [c.dir!.label]);
  }

  // 標題去重:重複者往上加祖先 label(跳過與標題同名的 label),直到唯一或用完
  const display = flat.map((x) => x.node.file!.title);
  const prefixes = flat.map((x) => x.chain.filter((l) => l.toLowerCase() !== x.node.file!.title.toLowerCase()));
  for (let depth = 1; ; depth++) {
    const count = new Map<string, number>();
    for (const t of display) count.set(t.toLowerCase(), (count.get(t.toLowerCase()) ?? 0) + 1);
    let changed = false;
    flat.forEach((x, i) => {
      if (count.get(display[i].toLowerCase())! > 1 && depth <= prefixes[i].length) {
        const prefix = prefixes[i].slice(-depth).join(" - ");
        display[i] = `${prefix} - ${x.node.file!.title}`;
        changed = true;
      }
    });
    if (!changed) break;
  }

  const pages: Page[] = [];
  const seq = new Map<string, number>();
  const used = new Set<string>();
  flat.forEach((x, i) => {
    const n = (seq.get(x.cat) ?? 0) + 1;
    seq.set(x.cat, n);
    const fileName = `${pad(n, 3)} ${safeName(display[i])}.md`;
    const out = x.cat ? `${x.cat}/${fileName}` : fileName;
    if (used.has(out.toLowerCase())) errors.push(`${x.node.rel}:輸出檔名重複 ${out}`);
    used.add(out.toLowerCase());

    const { title, description, body } = x.node.file!;
    const r = transformBody(body, x.node.rel);
    if (r.leftovers.length) errors.push(`${x.node.rel}:第 ${r.leftovers.join(", ")} 行仍有 MDX 元件或 import`);
    const fm = ["---", `title: ${JSON.stringify(title)}`, `source: ${sourceUrl(x.node.rel)}`];
    if (description) fm.push(`description: ${JSON.stringify(description)}`);
    fm.push("---", "");
    const head = [`# ${display[i]}`, ""];
    if (x.chain.length) head.push(`> Section: ${x.chain.join(" › ")}`, "");
    pages.push({ out, content: fm.join("\n") + "\n" + head.join("\n") + "\n" + r.content });
  });

  return { pages, errors };
}
