export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::poweredBy",
  {
    name: "strapi::cors",
    config: {
      enabled: true, // enable CORS
      origin: ["http://localhost:3000", "https://seger.rafidirg.com"], // allowed origins
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      headers: "*", // allow all headers
      credentials: true, // if you need to send cookies or auth headers
    },
  },
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
