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

export function formSubmitHandler(evt: Event) {
  evt.preventDefault();
  const {elements} = evt.target as HTMLFormElement;
  const formData: Record<string, string> = {};

  for (const input of elements) {
    if (
      (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) &&
      input.type !== 'submit'
    ) {
      input.checkValidity();
      formData[input.name] = input.value;
    }
  }
  return formData;
}

export function isObject(value: unknown): value is Indexed {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

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

// export function isEqual<T>(lhs: T, rhs: T): boolean {
//   return lhs === rhs;
// }

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

// function isObject

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

export function merge(lhs: Indexed, rhs: Indexed) {
  if (!rhs) {
    return lhs;
  }

  if (isObject(lhs) && isObject(rhs)) {
    for (const key in rhs) {
      if (isObject(rhs[key])) {
        if (!lhs[key]) {
          Object.assign(lhs, {[key]: {}});
        }
        merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        Object.assign(lhs, {[key]: rhs[key]});
      }
    }
  }

  return lhs;
}

export function set(object: Indexed, path: string, value: unknown): Indexed {
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
  return merge(object, assignable);
}
