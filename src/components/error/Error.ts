import Block, {PropsWithChildren} from '../block/Block';
import template from './error.tmpl';

export default class Error extends Block {
  constructor(props: PropsWithChildren) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
