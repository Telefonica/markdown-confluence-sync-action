import { replaceInFile } from "replace-in-file";

const filePath = "dist/index.js";

// eslint-disable-next-line no-console
console.log("Replacing __filename and __dirname in", filePath);

// NOTE: This is an ugly hack to avoid the usage of __dirname and __filename in bundled code, which seems to be added by ncc bundler.
// It is necessary to investigate further and see whether is possible to avoid this hack. Probably using directly rollup, esbuild or webpack, which are more customizable.
// For the moment, this workaround is enough to make the code work when loading the markdown-confluence-sync configuration file.

const result = await replaceInFile({
  files: filePath,
  from: [/__filename/g, /__dirname/g],
  to: ["import.meta.filename", "import.meta.dirname"],
});

// eslint-disable-next-line no-console
console.log("Replacement result:", result);
