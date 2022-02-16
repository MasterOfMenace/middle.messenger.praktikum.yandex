export function getValueByPath(object, path, defaultValue) {
  const keys = path.split(".");

  let result = object;

  for (let key of keys) {
    result = result[key];

    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}
