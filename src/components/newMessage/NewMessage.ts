import Block, {EventType} from '../block/Block';
import template from './newMessage.tmpl';

type Props = {
  events?: Record<string, EventType>;
};
export default class NewMessage extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
