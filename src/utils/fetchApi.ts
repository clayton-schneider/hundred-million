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
