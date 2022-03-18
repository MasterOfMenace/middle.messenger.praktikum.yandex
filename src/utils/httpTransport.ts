const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type Options = {
  timeout?: number;
  method?: string;
  headers?: object;
  data?: object;
};

type RequestOptions = {
  // timeout: number;
  method: string;
  headers?: object;
  data?: object;
};

/**
 * Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 */
function queryStringify(data: object) {
  return Object.entries(data)
    .map(([k, v], i) => {
      if (i === 0) {
        return `?${k}=${v.toString()}`;
      }

      return `&${k}=${v.toString()}`;
    })
    .join('');
}

export default class HTTPTransport {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getUrl(url: string): string {
    return `${this.baseUrl}${url}`;
  }

  get = (url: string, options?: Options) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.GET}, options?.timeout);
  };

  post = (url: string, options?: Options) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.POST}, options?.timeout);
  };

  put = (url: string, options?: Options) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.PUT}, options?.timeout);
  };

  delete = (url: string, options?: Options) => {
    return this.request(this.getUrl(url), {...options, method: METHODS.PUT}, options?.timeout);
  };

  request = (url: string, options: RequestOptions, timeout = 5000) => {
    const {method, headers, data} = options;

    let params = '';

    if (method === METHODS.GET && data) {
      params = queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url + params);

      xhr.withCredentials = true;
      xhr.timeout = timeout;

      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (headers) {
        Object.entries(headers).forEach(([k, v]) => {
          xhr.setRequestHeader(k, v);
        });
      }

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
