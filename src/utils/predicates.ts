export function isObject(value: unknown): value is Indexed {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}
