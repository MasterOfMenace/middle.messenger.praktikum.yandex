import {Avatar} from '../avatar';
import Block from '../block/Block';
import template from './chatListItem.tmpl';

type Props = {
  avatar: Avatar;
  userName: string;
  messageTime: string;
  message: string;
};

export default class ChatListItem extends Block<Props> {
  constructor(props: Props) {
    super('li', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
