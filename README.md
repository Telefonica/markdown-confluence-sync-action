# Markdown Confluence Sync action

This action syncs markdown files to Confluence using the [Markdown Confluence Sync](https://github.com/Telefonica/cross-confluence-tools/tree/main/components/markdown-confluence-sync) library.


## Table of contents

- [Features](#features)
- [Usage](#usage)
  - [Markdown files to sync](#markdown-files-to-sync)
  - [Tree operation mode](#tree-operation-mode)
  - [Flat operation mode](#flat-operation-mode)
- [Configuration](#configuration)
  - [Inputs](#inputs)
  - [Configuration file](#configuration-file)
  - [Environment variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

* It creates/updates/deletes [Confluence](https://www.atlassian.com/es/software/confluence) pages based on markdown files in a directory.
* Upload images to Confluence and update links in markdown files
* Supports Mermaid diagrams
* Per-page configuration using [frontmatter metadata](https://jekyllrb.com/docs/front-matter/)
* Works great with [Docusaurus](https://docusaurus.io/)
* Two modes of operation:
  * **tree**: Mirrors the hierarchical pages structure from given folder under a Confluence root page
  * **flat**: Synchronize a list of markdown files matched by a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) as children page of a Confluence root page, without any hierarchy.
    * As an extra in this mode, a Confluence id can be provided to each page using frontmatter, and, in such case, the corresponding Confluence page will be updated, no matter if it is a child of the root page or not.

> [!INFO]
> Read the [Markdown Confluence Sync library documentation](https://github.com/Telefonica/cross-confluence-tools/tree/main/components/markdown-confluence-sync) for detailed information about all features and configuration options.

## Usage

### Markdown files to sync

First of all, your markdown files must have a frontmatter metadata block at the beginning of the file. This metadata block must be in YAML format and must contain at least the `title` and the `sync_to_confluence` fields. The `sync_to_confluence` field must be set to `true` to indicate that the page should be synchronized with Confluence.

```markdown
---
title: My page title
sync_to_confluence: true
---

# My page content
```

### Tree operation mode

You should use __tree__ mode in case your markdown files are organized in a hierarchical structure and you want to mirror this structure in Confluence. For example:

```text
docs/
├── getting-started.md
└── user-guide/
    ├── index.md
    ├── installation.md
    └── configuration.md
```

```yaml
- name: Sync markdown files to Confluence
  uses: Telefonica/markdown-confluence-sync-action@v1
  with:
    mode: tree
    docs-dir: './docs'
    confluence-url: 'https://your.confluence.es'
    confluence-root-page-id: '123456789'
    confluence-space-key: 'YOUR-SPACE-KEY'
    confluence-personal-access-token: ${{ secrets.CONFLUENCE_PAT }}
```

> [!TIP]
> Read the [tree mode docs](https://github.com/Telefonica/cross-confluence-tools/tree/main/components/markdown-confluence-sync#tree-mode) for further information about configuration options and how to organize your markdown files.

### Flat operation mode

You should use __flat__ mode in case your markdown files are not organized in a hierarchical structure and you want to synchronize all of them as children of a Confluence root page.

As an extra in this mode, a Confluence id can be provided to each page using frontmatter, and, in such case, the corresponding Confluence page will be updated, no matter if it is a child of the root page or not.

For example:

```markdown
---
title: My page title
sync_to_confluence: true
confluence_page_id: 123456789
---
```

```yaml
- name: Sync markdown files to Confluence
  uses: Telefonica/markdown-confluence-sync-action@v1
  with:
    mode: flat
    docs-dir: './docs'
    confluence-url: 'https://your.confluence.es'
    confluence-root-page-id: '123456789'
    confluence-space-key: 'YOUR-SPACE-KEY'
    confluence-personal-access-token: ${{ secrets.CONFLUENCE_PAT }}
```

## Configuration

The action accepts a configuration file in the root of the repository, and it can be also configured using Github action inputs or even environment variables.

> [!TIP]
> You can also use a combination of all methods. In such case, the action inputs will override the configuration file values and the environment variables.

### Inputs

> [!WARNING]
> Inputs appearing here as required are required by the action, but they can be provided in the configuration file or environment variables, not necessarily in the action inputs.


| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `mode` | Operation mode: `tree` or `flat` | No | `tree` |
| `docs-dir` | Path to the directory containing the markdown files | __Yes__ | |
| `files-pattern` | Pattern to filter the files to sync in flat mode | No | |
| `confluence-url` | Confluence base URL | __Yes__ | |
| `confluence-root-page-id` | ID of the Confluence page under which the pages will be synchronized | __Yes__ | |
| `confluence-space-key` | Key of the Confluence space where the pages will be synced | __Yes__ | |
| `confluence-personal-access-token` | Confluence personal access token | __Yes__ | |
| `confluence-root-page-name` | Customize Confluence page titles by adding a prefix to all of them for improved organization and clarity | No | |
| `confluence-notice-message` | Notice message to add at the beginning of the Confluence pages | No | `<p><strong>AUTOMATION NOTICE: This page is synced automatically, changes made manually will be lost</strong></p>` |
| `confluence-notice-template` | Template string to use for the notice message | No | |
| `confluence-dry-run` | Dry run mode: Do not update Confluence pages. Only log pages to sync | No | `false `|
| `log-level` | Log level: `silent`, `silly`, `debug`, `verbose`, `info`, `warn`, `error` | No | `info` |

### Configuration file

It supports many patterns for naming the file, as well as file formats.

Just take into account that the namespace for the configuration is `markdown-confluence-sync`, so, possible configuration files may be:

* `markdown-confluence-sync.config.js`.
* `.markdown-confluence-syncrc.yaml`.
* `.markdown-confluence-syncrc.json`.

```js title="markdown-confluence-sync.config.js"
module.exports = {
  docsDir: "docs",
  confluence: {
    url: "https://my-confluence.es",
    personalAccessToken: "*******",
    spaceKey: "MY-SPACE",
    rootPageId: "my-root-page-id"
  }
}
```

> [!INFO]
> Read the [Markdown Confluence Sync library docs](https://github.com/Telefonica/cross-confluence-tools/tree/main/components/markdown-confluence-sync#configuration-file) for further info about the configuration file.

### Environment variables

The action can be configured using environment variables. The environment variables must be prefixed with `MARKDOWN_CONFLUENCE_SYNC_` and use uppercase letters.

Read the [Markdown Confluence Sync library docs](https://github.com/Telefonica/cross-confluence-tools/tree/main/components/markdown-confluence-sync#environment-variables) for further info about environment variables.

## Contributing

Please read our [Contributing Guidelines](./.github/CONTRIBUTING.md) for details on how to contribute to this project before submitting a pull request.

## License

This project is licensed under the Apache-2.0 License - see the [LICENSE](./LICENSE) file for details.
