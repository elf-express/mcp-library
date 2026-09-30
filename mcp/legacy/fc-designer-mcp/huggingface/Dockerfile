# HuggingFace Spaces 用的精簡 Dockerfile
# 直接拉 GHCR 預建映像,避免在 HF 上重新 build
FROM ghcr.io/elf-express/fc-designer-mcp:latest

# HF Spaces build 時會自動注入 git config 步驟,alpine 基底需先裝 git
RUN apk add --no-cache git

# 映像預設已是 5689,讓 README.md frontmatter 的 app_port 對齊即可
ENV TRANSPORT=http
ENV PORT=5689

EXPOSE 5689

CMD ["node", "dist/index.js"]
