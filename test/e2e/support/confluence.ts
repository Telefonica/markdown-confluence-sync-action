import { ConfluenceClient } from "confluence.js";

const CHANGELOG_PAGE_ID = process.env.CONFLUENCE_CHANGELOG_PAGE_ID as string;
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

async function getChangelogPageContent(id: string) {
  const client = createConfluenceClient();
  const content = await client.content.getContentById({
    id,
    expand: ["body.view"],
  });
  return content;
}

export async function getChangelogPageBody() {
  const content = await getChangelogPageContent(CHANGELOG_PAGE_ID);
  return content.body?.view?.value;
}

export async function getChangelogPageTitle() {
  const content = await getChangelogPageContent(CHANGELOG_PAGE_ID);
  return content.title;
}

export async function getReadmePageTitle() {
  const content = await getChangelogPageContent(README_PAGE_ID);
  return content.title;
}
