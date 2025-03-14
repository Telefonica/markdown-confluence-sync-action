module.exports = {
  docsDir: ".",
  mode: "id",
  filesPattern: "*.md",
  filesMetadata: [
    {
      path: "README.md",
      id: "337906332",
      title: "[Cross] [Markdown Confluence Sync] Github action",
    },
    {
      path: "CHANGELOG.md",
      id: "337906354",
      title: "[Cross] [Markdown Confluence Sync] [Github action] Releases",
    },
  ],
  confluence: {
    url: "https://confluence.tid.es",
    spaceKey: "CTO",
    personalAccessToken: "MzIwMzkzNDYwODM5OhVoiRRF3E2OHs1sk5uXnrDXo53b",
  },
  logLevel: "debug",
};
