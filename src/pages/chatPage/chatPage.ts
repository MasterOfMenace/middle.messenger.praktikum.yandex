import Block from '../../components/block/Block';
import {UserShortInfo} from '../../components/userShortInfo';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {isEqual} from '../../utils';
// import {List} from '../../components/list';
// import {Message} from '../../components/message';
// import {mockMessageData} from './mocks/mocks';
import template from './chatPage.tmpl';
import avatarSrc from '../../../static/images/avatar.jpg';
import {ChatPageController} from './chatPage.controller';
import store, {STORE_EVENTS} from '../../store/Store';
import {ChatShortInfo, ChatList} from '../../components/chatList/ChatList';
import {Chat, ChatMessage} from '../../components/chat/Chat';
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
  messagesGroup: ChatMessage[];
};

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
    const chat = new EmptyChat({
      message: 'Чтобы начать общение выберите чат или создайте новый',
    });

    const chats = new ChatList({
      chatsList: pageProps.chats,
      onChatSelect: (chatId) => {
        ChatPageController.changeChat(chatId);
      },
      currentChat: pageProps.currentChat,
    });

    super('div', {
      ...pageProps,
      chat,
      chats,
    });

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      this.setProps({
        chats: store.getState().chats ?? [],
        currentChat: store.getState().currentChat,
        currentUser: store.getState().user ?? {},
        messagesGroup:
          (store.getState().chat as {messages: ChatMessage[]})?.messages.reverse() ?? [],
      });
    });
    ChatPageController.initChatPage();
  }

  componentDidMount(): void {
    console.log('chat page mounted');
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (!oldProps.currentChat && !!newProps.currentChat) {
      this.children.chat = new Chat({
        messages: this.props.messagesGroup,
        companionInfo: this.props.companion,
        onSendMessage: (message) => {
          ChatPageController.sendMessage(message);
        },
      });
    }

    if (!isEqual(oldProps.currentUser, newProps.currentUser)) {
      this.setProps({
        currentUser: newProps.currentUser,
      });
    }

    if (!isEqual(oldProps.chats, newProps.chats)) {
      this.setProps({
        chats: newProps.chats,
      });

      (this.children.chats as Block).setProps({
        chatsList: newProps.chats,
      });
    }

    if (oldProps.currentChat !== newProps.currentChat) {
      this.setProps({
        currentChat: newProps.currentChat,
      });

      (this.children.chats as Block).setProps({
        currentChat: newProps.currentChat,
      });
    }

    if (!isEqual(oldProps.messagesGroup, newProps.messagesGroup)) {
      this.setProps({
        messagesGroup: newProps.messagesGroup,
      });
      (this.children.chat as Block).setProps({
        messages: newProps.messagesGroup,
      });
    }
    return true;
  }

  render() {
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

    return this.compile(template, this.props);
  }
}
