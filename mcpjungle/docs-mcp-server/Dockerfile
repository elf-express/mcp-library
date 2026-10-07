# ---- build stage ----
FROM node:26-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- runtime stage ----
FROM node:26-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV TRANSPORT=http
ENV PORT=5690

# production deps only
COPY package.json package-lock.json* ./
RUN npm install --omit=dev && npm cache clean --force

# compiled server + bundled corpora(每個語料一個子目錄)
COPY --from=build /app/dist ./dist
COPY corpora ./corpora

EXPOSE 5690

# Optional: provide MCP_AUTH_TOKEN at runtime to require a bearer token.
#   docker run -e MCP_AUTH_TOKEN=your-secret -p 5690:5690 docs-mcp-server
CMD ["node", "dist/index.js"]
