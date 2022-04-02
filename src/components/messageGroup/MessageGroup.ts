import Block from '../block/Block';
import List from '../list/List';
import template from './messageGroup.tmpl';

type Props = {
  date: string;
  messages: List;
};

export default class MessageGroup extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
