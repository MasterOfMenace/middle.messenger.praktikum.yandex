import {isObject} from './predicates';

export function getDeepCopy<T>(object: T): T {
  if (!object) {
    throw new Error('object not passed into function');
  }

  const copy = <{[key: string]: any}>{};

  Object.entries(object).forEach(([k, v]) => {
    if (isObject(v)) {
      copy[k] = getDeepCopy(v);
    } else {
      copy[k] = v;
    }
  });
  return copy as T;
}
