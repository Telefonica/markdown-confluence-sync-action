// SPDX-FileCopyrightText: 2024 Telefónica Innovación Digital
// SPDX-License-Identifier: MIT

import { replaceInFile } from "replace-in-file";
import { copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const filePath = "dist/index.js";

// eslint-disable-next-line no-console
console.log("Replacing __filename and __dirname in", filePath);

// NOTE: This is an ugly hack to avoid the usage of __dirname and __filename in bundled code, which seems to be added by ncc bundler.
// It is necessary to investigate further and see whether is possible to avoid this hack. Probably using directly rollup, esbuild or webpack, which are more customizable.
// For the moment, this workaround is enough to make the code work when loading the markdown-confluence-sync configuration file.

const importResult = await replaceInFile({
  files: filePath,
  from: [/__filename/g, /__dirname/g],
  to: ["import.meta.filename", "import.meta.dirname"],
});

// eslint-disable-next-line no-console
console.log("Replacement import results:", importResult);

// eslint-disable-next-line no-console
console.log("Fixing mermaid code blocks error handling", filePath);

// NOTE: Change the markdown-confluence-sync code to throw an error instead of logging it when there is an error replacing mermaid code blocks.
// This should be added as an option to the original library instead of hacking it in the bundled code.
const fixMermaidCodeBlocksErrorHandlingResult = await replaceInFile({
  files: filePath,
  from: 'file.message(e, node, "remark-replace-mermaid");',
  to: 'file.fail(e, node, "remark-replace-mermaid");',
});

if (!fixMermaidCodeBlocksErrorHandlingResult[0]?.hasChanged) {
  throw new Error("Error replacing error handling in mermaid code blocks");
}

// eslint-disable-next-line no-console
console.log("Fixing mermaid binary path", filePath);

// NOTE: This is an ugly hack to make the mermaid cli work in the Docker image. We remove the mermaid custom binary path, which originally points to the package node_modules, to the user's global node_modules.
// This is because we don't install dependencies in the Docker image because there are private dependencies that are not available in the public npm registry.
const fixMermaidBinPathResult = await replaceInFile({
  files: filePath,
  from: "path: DEPENDENCIES_BIN_PATH,",
  to: "/*path: DEPENDENCIES_BIN_PATH,*/",
});

if (!fixMermaidBinPathResult[0]?.hasChanged) {
  throw new Error("Error replacing mermaid cli bin path");
}

// eslint-disable-next-line no-console
console.log("Fixing puppeteer config path", filePath);

copyFileSync(
  resolve(
    dirname(
      fileURLToPath(import.meta.resolve("@tid-xcut/markdown-confluence-sync")),
    ),
    "..",
    "config",
    "puppeteer-config.json",
  ),
  resolve(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "dist",
    "puppeteer-config.json",
  ),
);

// NOTE: This is an ugly hack to provide a different path to the markdown-confluence-sync puppeteer-config file. As the library is not installed in the Docker image
// because it is a private package, we copy the file to this repository and change the path in the code.
const fixPuppeteerConfigResult = await replaceInFile({
  files: filePath,
  from: '(PACKAGE_ROOT, "config"), "puppeteer-config.json"',
  to: '("/usr/src/app", "dist"), "puppeteer-config.json"',
});

if (!fixPuppeteerConfigResult[0]?.hasChanged) {
  throw new Error("Error replacing mermaid cli bin path");
}
