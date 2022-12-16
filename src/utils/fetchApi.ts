import WORDPRESSURL from "./wordpressUrl";
async function fetchAPI(query) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(WORDPRESSURL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  const json = await res.json();
  if (json.errors) {
    console.log(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getLatestArticles() {
  const data = await fetchAPI(
    `{
  articles(first: 2) {
    nodes {
      slug
      date
      title
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails{
            height
            width
          }
        }
      }
    }
  }
}`
  );
  return data.articles.nodes;
}

export async function getAllArticleSlugs() {
  const data = await fetchAPI(
    `
    {
  articles {
    nodes {
      slug
    }
  }
}
    `
  );

  return data.articles.nodes;
}

export async function getArticleBySlug(slug) {
  const data = await fetchAPI(
    `
  {
  article(id: "${slug}", idType: SLUG) {
    body
    title
  }
}
  `
  );
  return data.article;
}
