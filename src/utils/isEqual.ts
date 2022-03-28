import {isFunction, isObject} from './predicates';

export function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    const aVal = a[key];
    const bVal = b[key];

    const isBothValuesObjects = isObject(aVal) && isObject(bVal);
    const isBothFunctions = isFunction(aVal) && isFunction(bVal);

    if (isBothValuesObjects && !isEqual(aVal, bVal)) {
      return false;
    }

    if (!isBothValuesObjects && !isBothFunctions && aVal !== bVal) {
      return false;
    }

    if (isBothFunctions && aVal.toString() !== bVal.toString()) {
      return false;
    }
  }
  return true;
}

export type Indexed<T = unknown> = {
  [key in string]: T;
};
