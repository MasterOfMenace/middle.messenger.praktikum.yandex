import Block from '../../components/block/Block';
import {UserShortInfo} from '../../components/userShortInfo';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {isEqual} from '../../utils';
import {List} from '../../components/list';
import {Message} from '../../components/message';
import {mockMessageData} from './mocks/mocks';
import template from './chatPage.tmpl';
import avatarSrc from '../../../static/images/avatar.jpg';
import {ChatPageController} from './chatPage.controller';
import store, {STORE_EVENTS} from '../../store/Store';
import {ChatShortInfo, ChatList} from '../../components/chatList/ChatList';
import {Chat} from '../../components/chat/Chat';
import {EmptyChat} from '../../components/emptyChat/EmptyChat';

type Props = {
  currentUser: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
  };
  chats: ChatShortInfo[];
  currentChat: number | null;
  companion: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
  };
  messagesGroup: any[];
};

const messagesGroupData = [
  {
    date: '04 января',
    messages: new List({
      className: 'messages-list',
      items: mockMessageData.map(
        (message) =>
          new Message({
            avatar: new Avatar({
              ...message.avatar,
            }),
            message: message.message,
            className: message.className,
          }),
      ),
    }),
  },
  {
    date: '05 января',
    messages: new List({
      className: 'messages-list',
      items: mockMessageData.map(
        (message) =>
          new Message({
            avatar: new Avatar({
              ...message.avatar,
            }),
            message: message.message,
            className: message.className,
          }),
      ),
    }),
  },
];

const pageProps: Props = {
  currentUser: {
    id: 380551,
    first_name: 'Иван',
    second_name: '',
    avatar: avatarSrc,
    display_name: '',
    login: 'iivan',
    email: 'ivan@post.ip',
    phone: '89123456789',
  },
  chats: [],
  currentChat: null,
  companion: {
    id: 380551,
    first_name: 'Иван',
    second_name: '',
    avatar: avatarSrc,
    display_name: '',
    login: 'iivan',
    email: 'ivan@post.ip',
    phone: '89123456789',
  },
  messagesGroup: [],
};

export class ChatPage extends Block<Props> {
  constructor() {
    super('div', pageProps);

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      this.setProps({
        chats: store.getState().chats ?? [],
        currentChat: store.getState().currentChat,
        currentUser: store.getState().user ?? {},
        messagesGroup: messagesGroupData,
      });
    });
    ChatPageController.initChatPage();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (!isEqual(oldProps.currentUser, newProps.currentUser)) {
      this.setProps({
        currentUser: newProps.currentUser,
      });
    }

    if (!isEqual(oldProps.chats, newProps.chats)) {
      this.setProps({
        chats: newProps.chats,
      });
    }

    if (oldProps.currentChat !== newProps.currentChat) {
      this.setProps({
        currentChat: newProps.currentChat,
      });
    }
    return true;
  }

  render() {
    this.children.chats = new ChatList({
      chatsList: this.props.chats,
      onChatSelect: (chatId) => {
        ChatPageController.changeChat(chatId);
      },
      currentChat: this.props.currentChat,
    });

    this.children.currentUser = new UserInfo({
      className: '"user-short-info"',
      avatar: new Avatar({
        avatarSrc: this.props.currentUser.avatar,
        wrapperClassName: '"avatar"',
        imageClassName: '"avatar__image"',
      }),
      shortInfo: new UserShortInfo({
        className: '"user-short-info__user-info"',
        userNameClass: '"user-short-info__user-name"',
        userPhoneClass: '"user-short-info__user-phone"',
        userName: this.props.currentUser.first_name,
        userPhone: this.props.currentUser.phone,
      }),
    });

    if (!this.props.currentChat) {
      this.children.chat = new EmptyChat({
        message: 'Чтобы начать общение выберите чат или создайте новый',
      });
    } else {
      this.children.chat = new Chat({
        messages: this.props.messagesGroup,
        companionInfo: this.props.companion,
      });
    }

    return this.compile(template, {
      ...this.props,
      chats: this.children.chats,
      chat: this.children.chat,
    });
  }
}
