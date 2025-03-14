# cspell: disable

FROM ghcr.io/puppeteer/puppeteer:22

USER root

# Add user so we don't need --no-sandbox.
RUN mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# Run everything after as non-privileged user.
USER pptruser

WORKDIR /usr/src/app
COPY . .

ENTRYPOINT [ "/usr/local/bin/node", "/usr/src/app/bin/markdown-confluence-sync-action.js"]
