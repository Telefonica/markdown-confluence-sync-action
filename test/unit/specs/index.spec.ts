// SPDX-FileCopyrightText: 2024 Telefónica Innovación Digital
// SPDX-License-Identifier: Apache-2.0

import * as main from "../../../src/main";

jest.mock<typeof import("@tid-xcut/markdown-confluence-sync")>(
  "@tid-xcut/markdown-confluence-sync",
  () => ({
    MarkdownConfluenceSync: jest.fn(),
  }),
);

// Mock the action's entrypoint
const runMock = jest.spyOn(main, "run").mockImplementation();

describe("index", () => {
  it("calls run when imported", () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("../../../src/index");

    expect(runMock).toHaveBeenCalled();
  });
});
