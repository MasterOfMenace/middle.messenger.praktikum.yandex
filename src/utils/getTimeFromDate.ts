export function getTimeFromDate(value?: number | string | null): string {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}
