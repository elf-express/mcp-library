#!/usr/bin/env sh
# 一次性註冊容器:由各書 corpus.json 產生書本註冊設定,連同 registry/*.json 註冊進 gateway,然後結束。
#   - 註冊前先驗證:語料設定不合法、registry/*.json 與語料同名、REGISTER_LIST 指到不存在的設定
#     → 列出原因並以 1 結束,不註冊任何 server
#   - 等 gateway 就緒;每個 server 註冊含重試;已註冊則略過(冪等,redeploy 安全)
# 環境變數:
#   REGISTRY_URL      gateway 位址(預設 http://mcpjungle:8080)
#   REGISTER_LIST     空白分隔的 server 名;有值時只註冊這些
#   REGISTER_EXTRAS   預設 1;0 = 預設清單只含書本,不含 registry/*.json
#   DOCS_MCP_URL / DOCS_MCP_AUTH_TOKEN  傳給 gen-book-configs.mjs
set -eu

REGISTRY="${REGISTRY_URL:-http://mcpjungle:8080}"
CLI="${MCPJUNGLE_BIN:-/mcpjungle}"
BOOKS="${BOOKS_DIR:-/books}"
CONFIGS="${CONFIGS_DIR:-/configs}"
GEN="${GEN_DIR:-/tmp/book-configs}"
HERE="$(cd "$(dirname "$0")" && pwd)"

fail() { echo "registrar: $1(未註冊任何 server)"; exit 1; }

rm -rf "$GEN"
node "$HERE/gen-book-configs.mjs" "$BOOKS" "$GEN" >/dev/null || fail "語料設定不合法"

for f in "$CONFIGS"/*.json; do
  [ -f "$f" ] || continue
  if [ -f "$GEN/$(basename "$f")" ]; then fail "registry/$(basename "$f") 與語料 id 同名"; fi
done

config_of() {
  for d in "$GEN" "$CONFIGS" "$CONFIGS/optional"; do
    if [ -f "$d/$1.json" ]; then echo "$d/$1.json"; return 0; fi
  done
  return 1
}

if [ -n "${REGISTER_LIST:-}" ]; then
  LIST="$REGISTER_LIST"
else
  LIST=""
  for f in "$GEN"/*.json; do if [ -f "$f" ]; then LIST="$LIST $(basename "$f" .json)"; fi; done
  if [ "${REGISTER_EXTRAS:-1}" != "0" ]; then
    for f in "$CONFIGS"/*.json; do if [ -f "$f" ]; then LIST="$LIST $(basename "$f" .json)"; fi; done
  fi
fi

missing=""
for name in $LIST; do config_of "$name" >/dev/null || missing="$missing $name"; done
[ -z "$missing" ] || fail "找不到設定檔:$missing"
echo "registrar: 待註冊:$LIST"

echo "registrar: 等待 gateway $REGISTRY ..."
i=0
until "$CLI" --registry "$REGISTRY" list servers >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -gt 60 ]; then echo "registrar: 等 gateway 逾時(120s)"; exit 1; fi
  sleep 2
done
echo "registrar: gateway 就緒"

is_registered() {
  "$CLI" --registry "$REGISTRY" list servers 2>/dev/null | grep -qE "^[0-9]+\. $1$"
}

failed=""
for name in $LIST; do
  cfg="$(config_of "$name")"
  if is_registered "$name"; then echo ">> $name 已註冊,略過"; continue; fi
  echo ">> 註冊 $name(含重試,等待上游就緒)"
  j=0
  until "$CLI" --registry "$REGISTRY" register -c "$cfg"; do
    if is_registered "$name"; then break; fi
    j=$((j + 1))
    if [ "$j" -ge 20 ]; then echo "   ($name 重試 20 次仍失敗)"; failed="$failed $name"; break; fi
    echo "   ($name 上游尚未就緒,3s 後重試 #$j)"
    sleep 3
  done
done

echo "registrar: 完成,目前 servers:"
"$CLI" --registry "$REGISTRY" list servers 2>/dev/null | grep -E '^[0-9]+\.' || true
if [ -n "$failed" ]; then echo "registrar: 註冊失敗:$failed"; exit 1; fi
