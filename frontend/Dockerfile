# ── builder stage ─────────────────────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files for layer caching
COPY package.json package-lock.json ./

RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── runtime stage (nginx serves static files) ─────────────────────────────────
FROM nginx:alpine AS runtime

# Remove default nginx config and replace with our own
RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config: serve SPA and proxy /api to backend
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
