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
