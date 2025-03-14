FROM node:22-alpine AS installer
RUN corepack enable && corepack prepare pnpm@9.4.0 --activate
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --no-optional
COPY . .

FROM node:22-alpine
WORKDIR /usr/src/app
COPY --from=installer /usr/src/app ./
ENTRYPOINT [ "node", "/usr/src/app/bin/markdown-confluence-sync-action.js"]
