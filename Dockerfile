FROM node:22-alpine
RUN corepack enable && corepack prepare pnpm@9.4.0 --activate
WORKDIR /usr/src/app

ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_DOWNLOAD="true"
ADD install-dependencies.sh install-dependencies.sh
RUN chmod 755 install-dependencies.sh && /bin/sh install-dependencies.sh

RUN npm i -g mermaid@11.5.0 @mermaid-js/mermaid-cli@11.4.0

COPY . .

ENTRYPOINT [ "node", "/usr/src/app/bin/markdown-confluence-sync-action.js"]
