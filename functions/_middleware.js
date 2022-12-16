import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

const errorHandler = async ({ next }) => {
  try {
    return await next();
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
};

const mailMiddleware = (context) =>
  mailchannelsPlugin({
    personalizations: [
      {
        to: [{ name: "First Last", email: "clayton@simply-sprout.com" }],
      },
    ],
    from: { name: "Website Contact Form", email: "no-reply@simply-sprout.com" },
    respondWith: () =>
      new Response(null, {
        status: 302,
        headers: { location: "/thank-you" },
      }),
  })(context);

export const onRequest = [errorHandler, mailMiddleware];
