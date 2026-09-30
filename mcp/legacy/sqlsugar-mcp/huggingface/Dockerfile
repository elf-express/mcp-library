# HuggingFace Spaces 用的精簡 Dockerfile
# 直接拉 GHCR 預建映像,避免重新 build
FROM ghcr.io/elf-express/sqlsugar-mcp:latest

# HF Spaces build 時會自動注入 `git config` 步驟,alpine 基底需先裝 git
RUN apk add --no-cache git

# HuggingFace Spaces 會自動把 app_port 設為 environment PORT
# 但我們映像預設已是 5688,讓 README.md frontmatter 的 app_port 對齊即可
ENV TRANSPORT=http
ENV PORT=5688

EXPOSE 5688

CMD ["node", "dist/index.js"]
