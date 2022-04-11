export function queryStringify(data: object) {
  return Object.entries(data)
    .map(([k, v], i) => {
      if (i === 0) {
        return `?${k}=${v.toString()}`;
      }

      return `&${k}=${v.toString()}`;
    })
    .join('');
}
