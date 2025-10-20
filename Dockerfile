FROM --platform=linux/amd64 node:22
RUN corepack enable && corepack prepare pnpm@9.4.0 --activate

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

# cspell: disable
# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer, and the fonts needed for Mermaid
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && apt-get install chromium -y \
  && apt-get install -y \
    fonts-noto-cjk fonts-noto-color-emoji \
    fonts-terminus fonts-dejavu fonts-freefont-ttf \
    fonts-font-awesome fonts-inconsolata \
    fonts-linuxlibertine \
  && fc-cache -f \
  && rm -rf /var/lib/apt/lists/*

# NOTE: We need to install Mermaid globally, as we are not installing the package.json dependencies due to private packages
RUN npm i -g mermaid@11.5.0 @mermaid-js/mermaid-cli@11.4.0

WORKDIR /usr/src/app

COPY . .

ENTRYPOINT [ "node", "/usr/src/app/bin/markdown-confluence-sync-action.js"]
