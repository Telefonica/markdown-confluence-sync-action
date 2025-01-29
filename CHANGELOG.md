---
sync_to_confluence: true
title: "[Markdown Confluence Sync] [Github action] Releases"
---

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

#### Added
#### Changed
#### Fixed
#### Deprecated
#### Removed

## [1.1.0] - 2025-01-29

### Added

* feat: Add `files-metadata` input. It allows the user to provide a JSON array with the metadata of the files to be synchronized. This way, the user can set the Confluence id, title, and if the file should be synchronized or not without the need to add frontmatter to the markdown files.
* feat: Support `id` mode. It allows the user to provide a list of files to be synchronized only by their Confluence id.

### Changed

* chore(deps): Bump @tid-xcut/markdown-confluence-sync from 1.0.0 to 1.1.0 (Add id mode and filesMetadata option)

## [1.0.0] - 2024-11-28

### Added

* feat: First stable release
* test: Add E2E tests

## [1.0.0-beta.4] - 2024-11-28

### Added

* feat: Add input `cwd`, enabling the user to set the current working directory from where resolve `docs-dir`, `files-pattern`, and search for the configuration file.

### Changed

* chore: Bump @tid-xcut/markdown-confluence-sync from 1.0.0-beta.3 to 1.0.0-beta.4

## [1.0.0-beta.3] - 2024-11-27

### Removed

* docs: Remove wrong documentation about logs. It is not necessary to set the `ACTIONS_STEP_DEBUG` option to see the libraries logs in the pipelines.

### Fixed

* fix: Fix reading the configuration file, by avoiding the usage of `__filename` and `__dirname` in the bundled code, given that it is an ESM module.

## [1.0.0-beta.2] - 2024-11-27

### Changed

* chore: Bump @tid-xcut/markdown-confluence-sync from 1.0.0-beta.2 to 1.0.0-beta.3

## [1.0.0-beta.1] - 2024-11-27

### Added

* feat: First release
