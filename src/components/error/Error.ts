import {Templator} from '../../utils';
import Block, {Props} from '../block/Block';
import template from './error.tmpl';

export default class Error extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    const templator = new Templator(template);
    return templator.compile(this.props);
  }
}
