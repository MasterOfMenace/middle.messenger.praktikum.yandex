import {Avatar} from '../avatar';
import Block from '../block/Block';
import template from './chatListItem.tmpl';

type Props = {
  currentChat?: number | null;
  avatar: Avatar;
  userName: string;
  messageTime: string;
  message: string;
  id: number;
  events?: any;
};

export default class ChatListItem extends Block<Props> {
  constructor(props: Props) {
    super('li', {
      ...props,
      events: {
        click: {
          event: () => {
            props.events?.click?.event(this.props.id);
          },
        },
      },
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      currentClass: this.props.currentChat === this.props.id ? 'chat-list__item--active' : '',
    });
  }
}
