export const cleanQuery = (obj: object) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) => v !== "" && v !== null && v !== undefined
    )
  );
