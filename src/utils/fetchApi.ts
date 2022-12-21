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

export default fetchAPI;
