import * as core from "@actions/core";
import * as main from "../../../src/main";
import { MarkdownConfluenceSync } from "@tid-xcut/markdown-confluence-sync";

jest.mock<typeof import("@tid-xcut/markdown-confluence-sync")>(
  "@tid-xcut/markdown-confluence-sync",
  () => ({
    MarkdownConfluenceSync: jest.fn().mockImplementation(() => ({
      sync: jest.fn(),
    })),
  }),
);

describe("action", () => {
  let getInputMock: jest.SpiedFunction<typeof core.getInput>;
  let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;
  const runMock = jest.spyOn(main, "run");

  beforeEach(() => {
    jest.clearAllMocks();

    getInputMock = jest.spyOn(core, "getInput").mockImplementation();

    setFailedMock = jest.spyOn(core, "setFailed").mockImplementation();
  });

  describe("input parameters", () => {
    const INPUTS = [
      {
        key: "cwd",
        value: "foo-cwd",
        expected: {
          cwd: "foo-cwd",
        },
      },
      {
        key: "log-level",
        value: "foo-log-level",
        expected: {
          logLevel: "foo-log-level",
        },
      },
      {
        key: "mode",
        value: "flat",
        expected: {
          mode: "flat",
        },
      },
      {
        key: "files-pattern",
        value: "foo-files-pattern",
        expected: {
          filesPattern: "foo-files-pattern",
        },
      },
      {
        key: "docs-dir",
        value: "foo-docs-dir",
        expected: {
          docsDir: "foo-docs-dir",
        },
      },
      {
        key: "confluence-url",
        value: "foo-url",
        expected: {
          confluence: expect.objectContaining({
            url: "foo-url",
          }),
        },
      },
      {
        key: "confluence-personal-access-token",
        value: "foo-token",
        expected: {
          confluence: expect.objectContaining({
            personalAccessToken: "foo-token",
          }),
        },
      },
      {
        key: "confluence-space-key",
        value: "foo-space-key",
        expected: {
          confluence: expect.objectContaining({
            spaceKey: "foo-space-key",
          }),
        },
      },
      {
        key: "confluence-root-page-id",
        value: "foo-root-page-id",
        expected: {
          confluence: expect.objectContaining({
            rootPageId: "foo-root-page-id",
          }),
        },
      },
      {
        key: "confluence-root-page-name",
        value: "foo-root-page-name",
        expected: {
          confluence: expect.objectContaining({
            rootPageName: "foo-root-page-name",
          }),
        },
      },
      {
        key: "confluence-notice-message",
        value: "foo-notice-message",
        expected: {
          confluence: expect.objectContaining({
            noticeMessage: "foo-notice-message",
          }),
        },
      },
      {
        key: "confluence-notice-template",
        value: "foo-notice-template",
        expected: {
          confluence: expect.objectContaining({
            noticeTemplate: "foo-notice-template",
          }),
        },
      },
      {
        key: "confluence-dry-run",
        value: "true",
        expected: {
          confluence: expect.objectContaining({
            dryRun: true,
          }),
        },
      },
      {
        key: "confluence-dry-run",
        value: "false",
        expected: {
          confluence: expect.objectContaining({
            dryRun: false,
          }),
        },
      },
    ];

    it.each(INPUTS.map((input) => [input.key, input.value, input.expected]))(
      "should set the %s option",
      async (key, value, expected) => {
        getInputMock.mockImplementation((name) => {
          // eslint-disable-next-line jest/no-conditional-in-test
          if (name === key) {
            return value;
          }
          return "";
        });

        await main.run();

        expect(runMock).toHaveReturned();

        expect(MarkdownConfluenceSync).toHaveBeenCalledWith(
          expect.objectContaining(expected),
        );
      },
    );
  });

  describe("when any error occurs", () => {
    it("should set action as failed", async () => {
      jest.mocked(MarkdownConfluenceSync).mockImplementation(() => {
        return {
          sync: jest.fn().mockRejectedValue(new Error("Foo error")),
        };
      });

      await main.run();

      expect(runMock).toHaveReturned();

      expect(setFailedMock).toHaveBeenNthCalledWith(1, "Foo error");
    });
  });
});
