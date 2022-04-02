import {isObject} from './predicates';

export function merge<T extends Indexed>(lhs: T, rhs: T) {
  if (!rhs) {
    return lhs;
  }

  if (isObject(lhs) && isObject(rhs)) {
    for (const key in rhs) {
      if (isObject(rhs[key])) {
        if (!lhs[key]) {
          Object.assign(lhs, {[key]: {}});
        }
        merge(lhs[key] as T, rhs[key] as T);
      } else {
        Object.assign(lhs, {[key]: rhs[key]});
      }
    }
  }

  return lhs;
}
