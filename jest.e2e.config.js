/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  testTimeout: 120000,

  // The glob patterns Jest uses to detect test files
  testMatch: ["<rootDir>/test/e2e/specs/*.spec.ts"],

  setupFiles: ["<rootDir>/test/e2e/support/setup.ts"],

  transform: {
    "^.+.ts$": [
      "ts-jest",
      {
        tsConfig: "test/tsconfig.json",
      },
    ],
  },
};
