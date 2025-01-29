// SPDX-FileCopyrightText: 2024 Telefónica Innovación Digital and contributors
// SPDX-License-Identifier: Apache-2.0

import { getLatestVersion } from "../support/changelog";
import {
  getChangelogPageBody,
  getChangelogPageTitle,
  getReadmePageTitle,
  getReadmePageChildren,
} from "../support/confluence";

describe("check sync", () => {
  describe("readme page", () => {
    it("should have right title", async () => {
      const pageTitle = await getReadmePageTitle();

      expect(pageTitle).toEqual(
        expect.stringContaining(
          "[Cross] [Markdown Confluence Sync] Github action",
        ),
      );
    });

    it("should have one child", async () => {
      const pageChildren = await getReadmePageChildren();

      expect(pageChildren?.length).toBe(1);
    });
  });

  describe("release page", () => {
    it("should have right title", async () => {
      const pageTitle = await getChangelogPageTitle();

      expect(pageTitle).toEqual(
        expect.stringContaining(
          "[Cross] [Markdown Confluence Sync] [Github action] Releases",
        ),
      );
    });

    it("should include the latest release", async () => {
      const version = await getLatestVersion();

      const pageContent = await getChangelogPageBody();

      expect(pageContent).toEqual(expect.stringContaining(version));
    });
  });
});
