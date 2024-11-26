# Markdown Confluence Sync action

This action syncs markdown files to Confluence using the [Markdown Confluence Sync](https://github.com/Telefonica/cross-confluence-tools/tree/main/components/markdown-confluence-sync) library.

* It creates/updates/deletes [Confluence](https://www.atlassian.com/es/software/confluence) pages based on markdown files in a directory.
* Upload images to Confluence and update links in markdown files
* Supports Mermaid diagrams
* Per-page configuration using [frontmatter metadata](https://jekyllrb.com/docs/front-matter/)
* Works great with [Docusaurus](https://docusaurus.io/)
* Two modes of operation:
  * **tree**: Mirrors the hierarchical pages structure from given folder under a Confluence root page
  * **flat**: Synchronize a list of markdown files matched by a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) as children page of a Confluence root page, without any hierarchy.
    * As an extra in this mode, a Confluence id can be provided to each page using frontmatter, and, in such case, the corresponding Confluence page will be always updated, no matter if it is a child of the root page or not.

> [!TIP]
> Read the [Markdown Confluence Sync library documentation](https://github.com/Telefonica/cross-confluence-tools/tree/main/components/markdown-confluence-sync) for detailed information about all features and configuration options.