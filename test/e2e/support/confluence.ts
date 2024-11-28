import { ConfluenceClient } from "confluence.js";

const README_PAGE_ID = process.env.CONFLUENCE_ROOT_PAGE_ID as string;

/**
 * Create a new Confluence client instance.
 * @returns New Confluence client
 */
function createConfluenceClient() {
  return new ConfluenceClient({
    host: process.env.CONFLUENCE_URL as string,
    authentication: {
      personalAccessToken: process.env.CONFLUENCE_PAT as string,
    },
    apiPrefix: "/rest/",
  });
}

async function getPageContent(id: string) {
  const client = createConfluenceClient();
  const content = await client.content.getContentById({
    id,
    expand: ["body.view", "children.page"],
  });
  return content;
}

async function getReadmePageContent() {
  return getPageContent(README_PAGE_ID);
}

export async function getReadmePageChildren() {
  const content = await getReadmePageContent();
  return content.children?.page?.results;
}

async function getChangelogPageContent() {
  const readmeChildren = await getReadmePageChildren();
  const changelogId = readmeChildren ? readmeChildren[0]?.id : undefined;

  if (!changelogId) {
    throw new Error("Readme page does not have any children");
  }

  const changelogContent = await getPageContent(changelogId);

  return changelogContent;
}

export async function getChangelogPageBody() {
  const content = await getChangelogPageContent();
  return content.body?.view?.value;
}

export async function getChangelogPageTitle() {
  const content = await getChangelogPageContent();
  return content.title;
}

export async function getReadmePageTitle() {
  const content = await getReadmePageContent();
  return content.title;
}
