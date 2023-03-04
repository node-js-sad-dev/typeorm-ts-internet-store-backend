export const inPath = (paramName, isRequired, paramSchema) => {
  return {
    in: "path",
    name: paramName,
    required: isRequired,
    schema: paramSchema,
  };
};

export const inQuery = (paramName, isRequired, paramSchema) => {
  return {
    in: "query",
    name: paramName,
    required: isRequired,
    schema: paramSchema,
  };
};

export const paginationPage = inQuery("page", false, {
  type: "number",
  default: 1,
});
export const paginationLimit = inQuery("limit", false, {
  type: "number",
  default: 10,
});
