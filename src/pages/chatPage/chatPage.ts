import Block from '../../components/block/Block';
import {UserShortInfo} from '../../components/userShortInfo';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {formSubmitHandler} from '../../utils';
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
  currentUser: UserInfo;
  chats: any[];
  companion: UserInfo;
  messagesGroup: List;
  newMessage: NewMessage;
};

const currentUser = new UserInfo({
  className: '"user-short-info"',
  avatar: new Avatar({
    avatarSrc,
    wrapperClassName: '"avatar"',
    imageClassName: '"avatar__image"',
  }),
  shortInfo: new UserShortInfo({
    className: '"user-short-info__user-info"',
    userNameClass: '"user-short-info__user-name"',
    userPhoneClass: '"user-short-info__user-phone"',
    userName: 'Snoop Dogg',
    userPhone: '+7 (985) 123 - 45 - 44',
  }),
});

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

const pageProps = {
  currentUser,
  chats: [],
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
      });
    });
    ChatPageController.getChats();
  }

  render() {
    this.children.chats = new ChatList({
      chatsList: this.props.chats,
    });
    return this.compile(template, {
      ...this.props,
      chats: this.children.chats,
    });
  }
}
