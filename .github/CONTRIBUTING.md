# How to contribute

Thank you for being part of the Telefónica Innovación Digital Open Source Community!

# Table of Contents

- [Getting started](#getting-started)
- [Test the action locally](#test-the-action-locally)
- [E2E tests](#e2e-tests)
- [Branching model](#branching-model)
- [Pull Request](#pull-request)
- [Release process](#release-process)
- [License](#license)
  - [Licensing of new files](#licensing-of-new-files)
  - [Public Domain](#public-domain)
- [Pull Request](#pull-request)
- [Code of Conduct](#code-of-conduct)
- [Contributor License Agreement](#contributor-license-agreement)

## Getting started

1. :hammer_and_wrench: Install the dependencies

   ```bash
   pnpm install
   ```

2. :white_check_mark: Run the unit tests

   ```bash
   $ pnpm test:unit

   PASS  test/unit/specs/main.spec.ts
   PASS  test/unit/specs/index.spec.ts
   ...

## Test the action locally

The action is a Docker container that runs a Node.js script. To test the action locally, you can run the Docker compose file in the root of the repository. This will build the Docker image and run the action in a container.

```bash
$ docker compose build
$ docker compose run action
```

> [!CAUTION]
> The Docker image won't work in some systems due to the usage of Chromium, as in MacOS with M1 processors. In this case, you can [run the Node.js code instead](#test-the-nodejs-code-locally).

You can provide a `.env` file to set environment variables used by the GitHub Actions Toolkit. For more information, see the example file, [`.env.example`](./.env.example), and the
[GitHub Actions Documentation](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables).

> [!IMPORTANT]
> The root workspace directory is mounted as a volume in the container in the `/github/workspace` folder. You can set another workspace subdirectory for testing the synchronization locally by setting the `INPUT_CWD` environment variable to the desired directory (e.g. `INPUT_CWD=test-action`).

### Test the Node.js code locally

Apart from running the unit tests, you can also run the Node.js code locally by following these steps:

* Modify the `src/action/main.ts` file to change the `BASE_CWD` variable from `/github/workspace` to the desired directory (e.g. `test-action`).
* Build the action code using the `pnpm build` command.
* Add your markdown file and configuration files to the desired directory (e.g. `test-action/markdown-confluence-sync.config.js` and `test-action/docs/foo.md`).
* Run the action code using `node bin/markdown-confluence-sync-action.js`.

## E2E tests

This project includes end-to-end tests, consisting in a workflow that uses the action to sync the documentation of the project itself to a Confluence page, and then checks if the page was updated correctly. Once the documentation has been synced, you can run tests using the following command:

```bash
npm run test:e2e
```

The tests require the following environment variables to be set, which can be defined in a `.env` file:

```txt .env
CONFLUENCE_URL=https://your-confluence-url.net
CONFLUENCE_PAT=******
CONFLUENCE_README_PAGE_ID=page-id-of-the-readme-page
```

## Branching model

In short, we have a "main" branch and a "release" branch. The "main" branch must always reflect the latest stable published version of the packages in the repository. The "release" branch is used to prepare the release of features without having to promote any unpublished changes to the "main" branch. It is the default branch for PRs.

Some important points to consider:

* __The "main" branch must always reflect the latest stable published version of the packages in the repository__.
* We have a "release" branch for the following reasons:
   * To enable the maintainer to prepare the release of features without having to promote any unpublished changes to the "main" branch. By preparing the release we mainly mean to decide how to group changes in different releases.
   * It is long-lived because we also have bots that will open PRs. So, they can be configured to open PRs to the "release" branch, and their changes will also enter in the process of preparing the release, such as changes from any other contributor.
* __The "release" branch is the default branch for PRs.__ Only a project maintainer should open a PR to the "main" branch, and only when the release is ready to be published.
* Usually, feature branches should be short-lived, and they should be merged into the "release" branch as soon as possible. This way, the changes will be included in the next release, and the feature branch can be deleted.
* When necessary, a medium-lived branch can be created from the "release" branch to group changes that will be released together and require more time to be prepared. Once the changes are ready, the branch can be merged into the "release" branch.

## Merging strategy

We use the __squash and merge strategy for merging PRs to the release branch__. This means that all the changes in the PR will be squashed into a single commit before being merged. The reasons are:

* To keep the history clean in the release branch
* To make easier to understand the changes in each release.

But we use the __merge commit strategy for merging PRs to the main branch from the release branch__. The reasons are:

* To keep in the history the information about the features that were merged separately into the release branch. This is very important, because we may have changes from different packages in the release branch. Squashing all the changes into a single commit would make it difficult to understand or revert the changes for a specific package.
* To avoid having to rebase the release branch every time a PR is merged to the main branch.

# Release process

Once the PR is approved and __merged into the release branch__, a project maintainer can start the release process by:

1. Checking the version number in the `package.json` file and updating it if necessary.
2. Checking the action version in the `.github/actions/check-and-comment/action.yml` file and updating it if necessary.
3. Updating the CHANGELOG.md file with the changes in the new version.
4. Remove the beta tags created for the PR check.
5. Tagging the release branch with the corresponding version numbers.

   This project includes a helper script, [`script/release`](./script/release)
   designed to streamline the process of tagging and pushing new releases for
   GitHub Actions.

   GitHub Actions allows users to select a specific version of the action to use,
   based on release tags. This script simplifies this process by performing the
   following steps:

   1. **Retrieving the latest release tag:** The script starts by fetching the most
      recent SemVer release tag of the current branch, by looking at the local data
      available in your repository.
   2. **Prompting for a new release tag:** The user is then prompted to enter a new
      release tag. To assist with this, the script displays the tag retrieved in
      the previous step, and validates the format of the inputted tag (vX.X.X). The
      user is also reminded to update the version field in package.json.
   3. **Tagging the new release:** The script then tags a new release and syncs the
      separate major tag (e.g. v1, v2) with the new release tag (e.g. v1.0.0,
      v2.1.2). When the user is creating a new major release, the script
      auto-detects this and creates a `releases/v#` branch for the previous major
      version.
   4. **Pushing changes to remote:** Finally, the script pushes the necessary
      commits, tags and branches to the remote repository. From here, you will need
      to create a new release in GitHub so users can easily reference the new tags
      in their workflows.
6. Create a new release in GitHub with the tag created in the previous step and the changes in the CHANGELOG.md file.
7. Merge the release branch into the main branch.

# License

By contributing to this project, you agree that your contributions will be licensed under the [LICENSE](../LICENSE) file in the root of this repository, and that you agree to the [Contributor License Agreement](#contributor-license-agreement).

## Licensing of new files

This project adheres to the [Software Package Data Exchange (SPDX)](https://spdx.dev/). SPDX is a standard format for communicating the components, licenses, and copyrights associated with software packages. It is a simple and concise way to communicate licensing information. Read more about how to define headers using the SPDX ids [here](https://spdx.dev/learn/handling-license-info/).

This license must be used for all new code, unless the containing project, module or externally-imported codebase uses a different license. If you can't put a header in the file due to its structure, please put it in a LICENSE file in the same directory.

```
// SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital

# SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital
# SPDX-License-Identifier: Apache-2.0

<!--
   SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital
   SPDX-License-Identifier: Apache-2.0
-->

SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital
SPDX-License-Identifier: Apache-2.0
```

> ![TIP]
> When modifying  an existing file, you should not change the license year. Instead, please add " - {{ year }}" to the existing year. For example, if the existing license is `2019` and you are doing the change at 2024, you should change it to `2019 - 2024`.

## MIT License

This license can be used for test scripts and other short code snippets, at the discretion of the author.

```
// SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital
// SPDX-License-Identifier: MIT

# SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital
# SPDX-License-Identifier: MIT

<!--
   SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital
   SPDX-License-Identifier: MIT
-->

SPDX-FileCopyrightText: {{ year }} Telefónica Innovación Digital
SPDX-License-Identifier: MIT
```

# Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

* Fill the PR template. This template helps reviewers understand your changes as well as the purpose of your pull request.
* Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue) if you are solving one.
* Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge. Once you submit your PR, a maintainer will review your proposal. We may ask questions or request additional information.
* We may ask for changes to be made before a PR can be merged, either using suggested changes or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
* As you update your PR and apply changes, mark each conversation as resolved.
* If you run into any merge issues, checkout this git tutorial to help you resolve merge conflicts and other issues.

# Code of Conduct

Please read our [Code of Conduct](../.github/CODE_OF_CONDUCT.md) before contributing.

# Contributor License Agreement

This is a human-readable summary of (and not a substitute for) the [full agreement](./CLA.md). This highlights only some of the key terms of the CLA. It has no legal value and you should carefully review all the terms of the [actual CLA before agreeing](./CLA.md).

* __Grant of copyright license__. You give Telefónica Innovación Digital permission to use your copyrighted work in commercial products.
* __Grant of patent license__. If your contributed work uses a patent, you give Telefónica Innovación Digital a license to use that patent including within commercial products. You also agree that you have permission to grant this license.
* __No Warranty or Support Obligations__. By making a contribution, you are not obligating yourself to provide support for the contribution, and you are not taking on any warranty obligations or providing any assurances about how it will perform.

The [CLA](./CLA.md) does not change the terms of the underlying license used by our software such as the Business Source License, Mozilla Public License, or MIT License. You are still free to use our projects within your own projects or businesses, republish modified source code, and more subject to the terms of the project license. Please reference the appropriate license for the project you're contributing to to learn more.
