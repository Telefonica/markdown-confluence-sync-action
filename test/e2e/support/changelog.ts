// SPDX-FileCopyrightText: 2024 Telefónica Innovación Digital and contributors
// SPDX-License-Identifier: Apache-2.0

import { readFile } from "fs/promises";
import { resolve } from "path";

const ROOT_PATH = resolve(__dirname, "..", "..", "..");

/**
 * Reads the content of the changelog.
 * @returns The content of the changelog.
 */
async function readChangeLog() {
  const changelogContent = await readFile(
    resolve(ROOT_PATH, "CHANGELOG.md"),
    "utf-8",
  );
  return changelogContent;
}

/**
 * Read the latest version from the changelog and return it.
 * @returns The latest version from the changelog.
 */
export async function getLatestVersion() {
  const changelog = await readChangeLog();
  const version = changelog.match(/## \[(\d+\.\d+\.\d+.*)\]/)?.[1];
  if (!version) {
    throw new Error("Could not find the latest version in the changelog.");
  }
  return version;
}
