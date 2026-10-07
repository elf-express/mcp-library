# build context = mcpjungle/(見根 compose 與 .github/workflows/docker-publish.yml),才拿得到 books/*/corpus/
#   docker build -f docs-mcp-server/Dockerfile -t docs-mcp-server .   (在 mcpjungle/ 執行)

# ---- build stage ----
FROM node:26-alpine AS build
WORKDIR /app
COPY docs-mcp-server/package.json docs-mcp-server/package-lock.json* ./
RUN npm install
COPY docs-mcp-server/tsconfig.json ./
COPY docs-mcp-server/src ./src
RUN npm run build

# ---- runtime stage ----
FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV TRANSPORT=http
ENV PORT=5690

# production deps only
COPY docs-mcp-server/package.json docs-mcp-server/package-lock.json* ./
RUN npm install --omit=dev && npm cache clean --force

COPY --from=build /app/dist ./dist
# 每本書的 corpus/ 內容併入 corpora/,成為 corpora/<id>/
COPY books/*/corpus/ ./corpora/

EXPOSE 5690

# Optional: provide MCP_AUTH_TOKEN at runtime to require a bearer token.
#   docker run -e MCP_AUTH_TOKEN=your-secret -p 5690:5690 docs-mcp-server
CMD ["node", "dist/index.js"]
