# Registrar 映像:mcpjungle CLI(/mcpjungle)+ node(base 內建 v20)+ 各書 corpus.json + 非書本註冊檔 + 腳本。
# build context = mcpjungle/(見根 compose.yaml);books/*/source 由 mcpjungle/.dockerignore 排除。
# 設定烤進映像,不用 bind mount(Dockhand 等把 repo clone 進自己容器,相對 bind mount 會找不到)。
FROM ghcr.io/mcpjungle/mcpjungle:latest-stdio
COPY books/ /books/
COPY registry/*.json /configs/
COPY registry/optional/ /configs/optional/
COPY registry/registrar.sh registry/gen-book-configs.mjs /registry/
ENTRYPOINT ["/bin/sh", "/registry/registrar.sh"]
