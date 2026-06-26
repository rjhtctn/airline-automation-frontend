export const removeEmptyValues = (obj) =>
  Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => [key, value === "" ? null : value])
      .filter(([, value]) => value !== undefined)
  );
