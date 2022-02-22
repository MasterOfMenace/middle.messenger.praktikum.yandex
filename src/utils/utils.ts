export function getValueByPath<T extends Record<string, any>>(
  object: T,
  path: string,
  defaultValue?: string,
): string {
  const keys = path.split('.');

  let result;

  for (const key of keys) {
    result = object[key];

    if (result === undefined && defaultValue) {
      return defaultValue;
    }
  }
  return result;
}
