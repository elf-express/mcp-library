#!/usr/bin/env bash
# 一鍵把 docs 語料 + MCPJungle 官方 stdio 工具註冊到 gateway。
#
# 前置:
#   - 裝官方 mcpjungle CLI:brew install mcpjungle/mcpjungle/mcpjungle(或 GitHub Releases 下載)
#   - gateway 用 -stdio image(npx/uvx 才能跑官方 stdio server)
#
# 用法:
#   REGISTRY=http://localhost:18800 ./register.sh            # docs(A:sqlsugar+fc)+ 工具(filesystem/fetch/time)
#   REGISTRY=...                    ./register.sh all        # docs(B:整包一個 docs)+ 工具
#   REGISTRY=...                    ./register.sh none       # 只註冊官方工具,不註冊 docs
#   REGISTRY=... WITH_TOOLS=0       ./register.sh            # 只註冊 docs,不註冊官方工具
#
# 註:url(http://docs-mcp-server:5690/...)是 gateway 去連本 server 用的容器名;
#     --registry(=18800)是 CLI 去連 gateway 用的位址。兩者方向相反,別搞混。
set -euo pipefail

REGISTRY="${REGISTRY:-http://localhost:18800}"
WITH_TOOLS="${WITH_TOOLS:-1}"
DIR="$(cd "$(dirname "$0")" && pwd)/servers"
DOCS_MODE="${1:-per-book}"

reg() { echo ">> 註冊 $(basename "$1")"; mcpjungle --registry "$REGISTRY" register -c "$1"; }

# 1) docs 語料
case "$DOCS_MODE" in
  per-book|a) reg "$DIR/sqlsugar.json"; reg "$DIR/fc.json" ;;
  all|b)      reg "$DIR/docs-all.json" ;;
  none)       echo ">> 略過 docs 語料" ;;
  *) echo "用法: $0 [per-book|all|none]   (WITH_TOOLS=0 可略過官方工具)"; exit 1 ;;
esac

# 2) MCPJungle 官方 stdio 工具(無需 token 的)
if [ "$WITH_TOOLS" = "1" ]; then
  reg "$DIR/filesystem.json"
  reg "$DIR/fetch.json"
  reg "$DIR/time.json"
else
  echo ">> 略過官方工具(WITH_TOOLS=0)"
fi

echo "---- 已註冊工具 ----"
mcpjungle --registry "$REGISTRY" list tools
