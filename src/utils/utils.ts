export function getValueByPath<T extends Record<string, any>>(
  object: T,
  path: string,
  defaultValue?: string,
): string {
  const keys = path.split('.');
  let result: any = object;

  for (const key of keys) {
    result = result[key];

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
    if (input instanceof HTMLInputElement && input.type !== 'submit') {
      formData[input.name] = input.value;
    }
  }
  // eslint-disable-next-line no-console
  console.log(formData);
}
