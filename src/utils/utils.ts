import Block, {Children} from '../components/block/Block';

export function getValueByPath<T extends Record<string, any>>(
  object: T,
  path: string,
  defaultValue?: string,
) {
  const keys = path.split('.');
  let result = object;

  for (const key of keys) {
    result = result[key];

    if (result === undefined && defaultValue) {
      return defaultValue;
    }
  }
  return result;
}

export function formSubmitHandler(evt: Event) {
  console.log(evt);
  evt.preventDefault();
  const {elements} = evt.target as HTMLFormElement;
  const formData: Record<string, string> = {};

  for (const input of elements) {
    if (input instanceof HTMLInputElement && input.type !== 'submit') {
      formData[input.name] = input.value;
    }
  }
  // eslint-disable-next-line no-console
  console.log(formData);
}

export function isBlockArray(children: Children): children is Block[] {
  if (Array.isArray(children)) {
    return children.every((child) => child instanceof Block);
  }
  return false;
}

function isObject(obj: unknown): obj is Record<string, unknown> {
  return typeof obj === 'object' && Boolean(obj);
}

export function getDeepCopy<T>(object: T): T {
  if (!object) {
    return;
  }
  const copy = <{[key: string]: any}>{};
  console.log(object);

  Object.entries(object).forEach(([k, v]) => {
    if (isObject(v)) {
      copy[k] = getDeepCopy(v);
    } else {
      copy[k] = v;
    }
  });
  return copy as T;
}
