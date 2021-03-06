import Block from '../../components/block/Block';
import {renderDOM} from '../../utils';

export default class Route<T extends Block = Block> {
  _pathname: string;

  _blockClass: new (props?: any) => T;

  _block: T | null;

  _props: Record<string, any>;

  constructor(pathname: string, view: new (props?: any) => T, props: Record<string, any>) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._block?.show();
    }
  }

  leave() {
    if (this._block) {
      this._block.removeElement();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      const View = this._blockClass;
      this._block = new View();
    }

    const rootDiv = document.querySelector(this._props.rootQuery);

    if (rootDiv) {
      renderDOM(rootDiv, this._block);
    }
  }
}
