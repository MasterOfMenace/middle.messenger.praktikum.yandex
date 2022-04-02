export function getValueByPath<T extends Record<string, any>>(
  object: T,
  path: string,
  defaultValue?: string,
) {
  const keys = path.split('.');
  let result = object;

  for (const key of keys) {
    if (key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }

    if (result === undefined && defaultValue) {
      return defaultValue;
    }
  }
  return result;
}
