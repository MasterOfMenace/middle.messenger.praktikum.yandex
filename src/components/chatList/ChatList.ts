import {UserDataSignUp} from '../../api/authApi/AuthApi';
import {getTimeFromDate} from '../../utils';
import Block from '../block/Block';
import {ChatListItem} from '../chatListItem';
import template from './chatlist.tmpl';
import {getLastMessageContent} from './chatList.utils';

export type ChatShortInfo = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: null | LastMessage;
};

export type LastMessage = {
  user: Omit<UserDataSignUp, 'password'>;
  time: string;
  content: string;
};

type Props = {
  chatsList: ChatShortInfo[];
  currentChat: ChatShortInfo | null;
  onChatSelect: (chatId: ChatShortInfo) => void;
};

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    this.children.chats = this.props.chatsList.map(
      // разобраться как сделать так чтобы объявлять childrens в конструкторе
      (item) =>
        new ChatListItem({
          currentChat: this.props.currentChat,
          chat: item,
          userName: item.title,
          messageTime: getTimeFromDate(item.last_message?.time),
          message: getLastMessageContent(item.last_message),
          events: {
            click: {
              event: (selected: ChatShortInfo) => {
                this.props.onChatSelect(selected);
              },
            },
          },
        }),
    );

    return this.compile(template, {
      ...this.props,
      chats: this.children.chats,
    });
  }
}
