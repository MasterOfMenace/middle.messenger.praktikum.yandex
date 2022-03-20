import {UserDataSignUp} from '../../api/authApi/AuthApi';
import {Avatar} from '../avatar';
import Block from '../block/Block';
import {ChatListItem} from '../chatListItem';
import template from './chatlist.tmpl';

/*
[
  {
    "id": 123,
    "title": "my-chat",
    "avatar": "/123/avatar1.jpg",
    "unread_count": 15,
    "last_message": {
      "user": {
        "first_name": "Petya",
        "second_name": "Pupkin",
        "avatar": "/path/to/avatar.jpg",
        "email": "my@email.com",
        "login": "userLogin",
        "phone": "8(911)-222-33-22"
      },
      "time": "2020-01-02T14:22:22.000Z",
      "content": "this is message content"
    }
  }
]
*/

export type ChatShortInfo = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: Omit<UserDataSignUp, 'password'>;
    time: string;
    content: string;
  };
};

type Props = {
  chatsList: ChatShortInfo[];
  currentChat: number | null;
  onChatSelect: (chatId: number) => void;
};

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  render() {
    this.children.chats = this.props.chatsList.map(
      // разобраться как сделать так чтобы объявлять childrens в конструкторе
      (chat) =>
        new ChatListItem({
          currentChat: this.props.currentChat,
          id: chat.id,
          avatar: new Avatar({
            avatarSrc: chat.avatar,
            wrapperClassName: '"avatar avatar--message"',
          }),
          userName: chat.last_message?.user?.first_name,
          messageTime: chat.last_message?.time,
          message: chat.last_message?.content,
          events: {
            click: {
              event: (id: number) => {
                this.props.onChatSelect(id);
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
