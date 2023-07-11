import fetchAPI from "../fetchApi";

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
    summary
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
