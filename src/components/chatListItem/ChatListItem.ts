import Block from '../block/Block';
import {ChatShortInfo} from '../chatList/ChatList';
import template from './chatListItem.tmpl';
import placeholder from '../../../static/images/image-placeholder.jpg';

type Props = {
  currentChat?: ChatShortInfo | null;
  userName: string;
  messageTime: string;
  message: string;
  events?: any;
  chat: ChatShortInfo;
};

export default class ChatListItem extends Block<Props> {
  constructor(props: Props) {
    super('li', {
      ...props,
      events: {
        click: {
          event: () => {
            props.events?.click?.event(this.props.chat);
          },
        },
      },
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      avatarSrc: this.props.chat.avatar ?? placeholder,
      currentClass:
        this.props.currentChat?.id === this.props.chat.id ? 'chat-list__item--active' : '',
    });
  }
}
