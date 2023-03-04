export default {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "APIs Document for internet store",
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
      },
    },
  },
  security: [
    {
      bearerAuth: ["read", "write"],
    },
  ],
  servers: [
    {
      url:
        process.env.NODE_ENV === "local"
          ? `http://localhost:${process.env.PORT}/api/v1`
          : "",
    },
  ],
  // TODO -> change on real entities when will be ready
  paths: Object.assign({}, {}),
};
