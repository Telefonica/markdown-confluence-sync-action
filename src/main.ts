// SPDX-FileCopyrightText: 2024 Telefónica Innovación Digital
// SPDX-License-Identifier: Apache-2.0

import * as core from "@actions/core";
import { MarkdownConfluenceSync } from "@telefonica/markdown-confluence-sync";
import { parse } from "yaml";
import { join, isAbsolute } from "path";

// NOTE: Change this value to a relative path to the repository root to test the node.js code locally, such as "test-action". Docs and configuration should be placed there.
const BASE_CWD = "/github/workspace";

function valueIfDefined<T = string>(value: T | undefined): T | undefined {
  return value === "" ? undefined : value;
}

function booleanIfDefined(value: string | undefined): boolean | undefined {
  if (valueIfDefined(value)) {
    return value === "true";
  }
}

function parseInputObject<T>(input?: string): T | undefined {
  if (input !== undefined && input !== "") {
    return parse(input) as T;
  }
}

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const logLevel: MarkdownConfluenceSync.Config["logLevel"] | undefined =
      core.getInput("log-level") as
        | MarkdownConfluenceSync.Config["logLevel"]
        | undefined;
    const mode: MarkdownConfluenceSync.Config["mode"] | undefined =
      core.getInput("mode") as
        | MarkdownConfluenceSync.Config["mode"]
        | undefined;
    const filesPattern: string = core.getInput("files-pattern");
    const ignoreInput: string | undefined = valueIfDefined(
      core.getInput("ignore"),
    );
    const ignorePatterns: string[] | undefined = ignoreInput
      ? ignoreInput.split(";")
      : undefined;
    const docsDir: string = core.getInput("docs-dir");
    const filesMetadata: MarkdownConfluenceSync.Config["filesMetadata"] =
      parseInputObject<MarkdownConfluenceSync.Config["filesMetadata"]>(
        core.getMultilineInput("files-metadata")?.join("\n"),
      );
    const confluenceUrl: string = core.getInput("confluence-url");
    const confluencePersonalAccessToken: string = core.getInput(
      "confluence-personal-access-token",
    );
    const confluenceSpaceKey: string = core.getInput("confluence-space-key");
    const confluenceRootPageId: string = core.getInput(
      "confluence-root-page-id",
    );
    const confluenceRootPageName: string = core.getInput(
      "confluence-root-page-name",
    );
    const confluenceNoticeMessage: string = core.getInput(
      "confluence-notice-message",
    );
    const confluenceNoticeTemplate: string = core.getInput(
      "confluence-notice-template",
    );
    const confluenceDryRun: string = core.getInput("confluence-dry-run");

    const cwd: string | undefined = valueIfDefined(core.getInput("cwd"));
    if (cwd && isAbsolute(cwd)) {
      throw new Error(
        `The cwd input must be a relative path, but it is an absolute path: ${cwd}`,
      );
    }

    const fullCwd = cwd ? join(BASE_CWD, cwd) : BASE_CWD;

    const markdownToConfluence = new MarkdownConfluenceSync({
      cwd: fullCwd,
      logLevel:
        valueIfDefined<MarkdownConfluenceSync.Config["logLevel"]>(logLevel),
      filesMetadata,
      mode: valueIfDefined<MarkdownConfluenceSync.Config["mode"]>(mode),
      filesPattern: valueIfDefined(filesPattern),
      ignore: ignorePatterns,
      docsDir: valueIfDefined(docsDir),
      confluence: {
        url: valueIfDefined(confluenceUrl),
        personalAccessToken: valueIfDefined(confluencePersonalAccessToken),
        spaceKey: valueIfDefined(confluenceSpaceKey),
        rootPageId: valueIfDefined(confluenceRootPageId),
        rootPageName: valueIfDefined(confluenceRootPageName),
        noticeMessage: valueIfDefined(confluenceNoticeMessage),
        noticeTemplate: valueIfDefined(confluenceNoticeTemplate),
        dryRun: booleanIfDefined(confluenceDryRun),
      },
      config: {
        readArguments: false,
        readEnvironment: true,
        readFile: true,
      },
    });
    await markdownToConfluence.sync();
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}
