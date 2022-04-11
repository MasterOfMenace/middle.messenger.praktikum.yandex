import {queryStringify} from '../utils';

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
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
