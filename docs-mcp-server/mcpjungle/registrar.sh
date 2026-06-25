#!/usr/bin/env sh
# 一次性註冊容器:等 gateway 起來後,把 server 設定檔全部註冊,然後結束。
# 供 docker-compose 的 registrar 服務使用(沿用 mcpjungle image,內含 /mcpjungle CLI)。
# 這讓「git pull -> docker compose up」即完成「部署 + 註冊」,適合 Portainer/Komodo/Dockge 等 GitOps 工具。
set -eu

REGISTRY="${REGISTRY_URL:-http://mcpjungle:8080}"
CONFIGS="${CONFIGS_DIR:-/configs}"
# 要註冊哪些(空白分隔);可用 env REGISTER_LIST 覆寫
LIST="${REGISTER_LIST:-sqlsugar fc filesystem fetch time}"

echo "registrar: 等待 gateway $REGISTRY ..."
i=0
until /mcpjungle --registry "$REGISTRY" list servers >/dev/null 2>&1; do
  i=$((i + 1))
  if [ "$i" -gt 60 ]; then echo "registrar: 等 gateway 逾時(120s)"; exit 1; fi
  sleep 2
done
echo "registrar: gateway 就緒,開始註冊"

for name in $LIST; do
  cfg="$CONFIGS/$name.json"
  if [ ! -f "$cfg" ]; then echo "   (找不到 $cfg,略過)"; continue; fi
  echo ">> 註冊 $name"
  /mcpjungle --registry "$REGISTRY" register -c "$cfg" || echo "   (略過 $name:可能已註冊或失敗)"
done

echo "registrar: 完成,目前 servers:"
/mcpjungle --registry "$REGISTRY" list servers || true
