# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

#### Added
#### Changed
#### Fixed
#### Deprecated
#### Removed

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
