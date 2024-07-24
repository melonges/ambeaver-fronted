// eslint-disable-next-line no-undef
module.exports = {
  ambeaver: {
    output: {
      mode: "tags-split",
      target: "src/modules/api/ambeaver.ts",
      schemas: "src/modules/api/model",
      client: "react-query",
      prettier: true,
    },
    input: {
      target: "./src/modules/api/schemas/schema.yaml",
    },
  },
};
