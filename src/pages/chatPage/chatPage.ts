import Block from '../../components/block/Block';
import {UserShortInfo} from '../../components/userShortInfo';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {formSubmitHandler, isEqual} from '../../utils';
import {List} from '../../components/list';
import {Message} from '../../components/message';
import {MessageGroup} from '../../components/messageGroup';
import {NewMessage} from '../../components/newMessage';
import {mockMessageData} from './mocks/mocks';
import template from './chatPage.tmpl';
import avatarSrc from '../../../static/images/avatar.jpg';
import {ChatPageController} from './chatPage.controller';
import store, {STORE_EVENTS} from '../../store/Store';
import {ChatList} from '../../components/chatList/ChatList';

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
  chats: any[];
  currentChat: number | null;
  companion: UserInfo;
  messagesGroup: List;
  newMessage: NewMessage;
};

const companion = new UserInfo({
  className: '"user-short-info user-short-info--companion"',
  avatar: new Avatar({
    avatarSrc,
    wrapperClassName: '"avatar avatar--message"',
    imageClassName: '"avatar__image"',
  }),
  shortInfo: new UserShortInfo({
    className: '"user-short-info__user-info"',
    userNameClass: '"user-short-info__user-name"',
    userPhoneClass: '"user-short-info__user-phone"',
    userName: 'Алексей',
    userPhone: '+7 (985) 123 - 45 - 44',
  }),
});

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

const messagesGroup = new List({
  className: 'messages',
  items: messagesGroupData.map((item) => {
    return new MessageGroup({
      date: item.date,
      messages: item.messages,
    });
  }),
});

const newMessage = new NewMessage({
  events: {
    submit: {
      event: (evt) => formSubmitHandler(evt),
    },
    focus: {
      event: (evt) => {
        const target = evt.target as HTMLInputElement;
        const isValid = target.checkValidity();

        if (!isValid) {
          target.reportValidity();
        }
      },
      useCapture: true,
    },
  },
});

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
  companion,
  messagesGroup,
  newMessage,
};

export class ChatPage extends Block<Props> {
  constructor() {
    super('div', pageProps);

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      this.setProps({
        chats: store.getState().chats ?? [],
        currentChat: store.getState().currentChat,
        currentUser: store.getState().user ?? {},
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

    return this.compile(template, {
      ...this.props,
      chats: this.children.chats,
    });
  }
}
