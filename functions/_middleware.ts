import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

const mailMiddleware: PagesFunction = (context) =>
  mailchannelsPlugin({
    personalizations: [
      {
        to: [{ name: "Clayton Schneider", email: "clayton@simply-sprout.com" }],
      },
    ],
    from: {
      name: "Website Form Submission",
      email: "noreply@simply-sprout.com",
    },
    respondWith: () => {
      return Response.redirect("https://hundred-million.pages.dev/about", 302);
    },
  })(context);

export const onRequest: PagesFunction[] = [mailMiddleware];
