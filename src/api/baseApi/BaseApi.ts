export abstract class BaseApi {
  create(...args: any[]): Promise<unknown> | void;

  create() {
    throw new Error('method not implemented');
  }

  request(...args: any[]): Promise<unknown> | void;

  request() {
    throw new Error('method not implemented');
  }

  update(...args: any[]): Promise<unknown> | void;

  update() {
    throw new Error('method not implemented');
  }

  delete(...args: any[]): Promise<unknown> | void;

  delete() {
    throw new Error('method not implemented');
  }
}
