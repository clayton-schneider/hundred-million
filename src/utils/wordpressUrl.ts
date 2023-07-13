const WORDPRESSURL =
  import.meta.env.MODE === "production"
    ? "https://100millionus.tempurl.host/graphql/"
    : "https://100millionus.tempurl.host/graphql/";
export default WORDPRESSURL;
