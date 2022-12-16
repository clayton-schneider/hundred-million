const WORDPRESSURL =
  import.meta.env.MODE === "production"
    ? "https://simplysproutstaging.com/graphql/"
    : "https://simplysproutstaging.com/graphql/";
export default WORDPRESSURL;
