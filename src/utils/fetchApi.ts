import WORDPRESSURL from "./wordpressUrl";
async function fetchAPI(query) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(WORDPRESSURL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  try {
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.log("error on res.json");
    console.error(err);
  }
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

export async function getArticlesForArchive() {
  const data = await fetchAPI(
    `
{
  articles {
    nodes {
      slug
      date
      title
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
}
`
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
    date
    body
    title
    featuredImage {
      node {
        altText
        sourceUrl
        mediaDetails {
          height
          width
        }
      }
    }
  }
}
  `
  );
  return data.article;
}
