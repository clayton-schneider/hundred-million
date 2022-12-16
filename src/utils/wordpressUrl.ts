const WORDPRESSURL =
  import.meta.env.MODE === "production"
    ? "https:live.com"
    : "https://simplysproutstaging.com/graphql/";
export default WORDPRESSURL;
