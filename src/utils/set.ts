import {merge} from './merge';
import {isObject} from './predicates';

export function set<T extends Indexed>(object: T, path: string, value: unknown): T {
  if (!isObject(object)) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const pathArr = path.split('.');
  const assignable = pathArr.reduceRight<Indexed>((prev, curr) => {
    return {
      [curr]: prev,
    };
  }, value as any);
  return merge(object, assignable as T);
}
