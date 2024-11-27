// SPDX-FileCopyrightText: 2024 Telefónica Innovación Digital and contributors
// SPDX-License-Identifier: MIT

const { resolve } = require("path");

const DICTIONARIES_BASE_PATH = resolve(__dirname, "cspell");

module.exports = {
  // Version of the setting file.  Always 0.2
  version: "0.2",
  // Paths to be ignored
  ignorePaths: [
    "**/node_modules/**",
    ".husky/**",
    "**/pnpm-lock.yaml",
    "**/cspell/*.txt",
    "cspell.config.cjs",
    "**/.gitignore",
    "**/coverage/**",
    "**/dist/**",
  ],
  caseSensitive: false,
  // Language - current active spelling language
  language: "en",
  // Dictionaries to be used
  dictionaryDefinitions: [
    { name: "company", path: `${DICTIONARIES_BASE_PATH}/company.txt` },
    {
      name: "missing",
      path: `${DICTIONARIES_BASE_PATH}/missing.txt`,
    },
  ],
  dictionaries: ["company", "missing"],
  languageSettings: [
    {
      // In markdown files
      languageId: "markdown",
      // Exclude code blocks from spell checking
      ignoreRegExpList: ["/^\\s*```[\\s\\S]*?^\\s*```/gm"],
    },
  ],
  // The minimum length of a word before it is checked.
  minWordLength: 4,
  // cspell:disable-next-line FlagWords - list of words to be always considered incorrect. This is useful for offensive words and common spelling errors. For example "hte" should be "the"
  flagWords: ["hte"],
};
