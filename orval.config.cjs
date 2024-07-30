// eslint-disable-next-line no-undef
module.exports = {
  ambeaver: {
    output: {
      mode: "tags-split",
      target: "src/modules/api/ambeaver.ts",
      schemas: "src/modules/api/model",
      client: "react-query",
      prettier: true,

      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          options: {
            staleTime: 10000,
          },
        },
      },
    },
    input: {
      target: "./src/modules/api/schemas/schema.yaml",
    },
  },
};
