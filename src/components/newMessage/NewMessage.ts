import Block from '../block/Block';
import template from './newMessage.tmpl';

type Props = Record<string, never>;
export default class NewMessage extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
