import fetchAPI from "../fetchApi";

export async function getFeaturedResources(
  type: "general" | "teachers" | "individuals" | "organizations" = "general"
) {
  const data = await fetchAPI(
    `
{
  resources(
    where: {taxQuery: {taxArray: {field: SLUG, taxonomy: TARGETAUDIENCE, terms: "${type}"}}}
    first: 3
  ) {
    nodes {
      slug
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
}    
    `
  );
  return data.resources.nodes;
}

export async function getResourcesForArchive() {
  const data = await fetchAPI(
    `
{
  resources {
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

  return data.resources.nodes;
}

export async function getAllResourcesSlugs() {
  const data = await fetchAPI(
    `
    {
  resources {
    nodes {
      slug
    }
  }
}
    `
  );

  return data.resources.nodes;
}

export async function getResourcesBySlug(slug) {
  const data = await fetchAPI(
    `
  {
  resource(id: "${slug}", idType: SLUG) {
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
  return data.resource;
}
