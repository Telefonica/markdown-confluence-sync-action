// SPDX-FileCopyrightText: 2024 Telefónica Innovación Digital and contributors
// SPDX-License-Identifier: Apache-2.0

import { getLatestVersion } from "../support/changelog";
import {
  getChangelogPageBody,
  getChangelogPageTitle,
  getReadmePageTitle,
} from "../support/confluence";

describe("check sync", () => {
  describe("readme page", () => {
    it("should have right title", async () => {
      const changelogPageTitle = await getReadmePageTitle();

      expect(changelogPageTitle).toEqual(
        expect.stringContaining("[Cross] Markdown Confluence Sync"),
      );
    });
  });

  describe("release page", () => {
    it("should have right title", async () => {
      const changelogPageTitle = await getChangelogPageTitle();

      expect(changelogPageTitle).toEqual(
        expect.stringContaining("[Cross] [Markdown Confluence Sync] Releases"),
      );
    });

    it("should include the latest release", async () => {
      const version = await getLatestVersion();

      const changelogPage = await getChangelogPageBody();

      expect(changelogPage).toEqual(expect.stringContaining(version));
    });
  });
});
