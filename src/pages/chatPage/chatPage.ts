import Block from '../../components/block/Block';
import {UserShortInfo} from '../../components/userShortInfo';
import {UserInfo} from '../../components/userInfo';
import {Avatar} from '../../components/avatar';
import {isEqual} from '../../utils';
import template from './chatPage.tmpl';
import {ChatPageController} from './chatPage.controller';
import store, {STORE_EVENTS} from '../../store/Store';
import {ChatShortInfo, ChatList} from '../../components/chatList/ChatList';
import {Chat, ChatMessage} from '../../components/chat/Chat';
import {EmptyChat} from '../../components/emptyChat/EmptyChat';
import {User} from '../../api/authApi/AuthApi';
import {CreateChatModal} from '../../components/createChatModal/CreateChatModal';
import {Button} from '../../components/button';

type Props = {
  currentUser: User;
  chats: ChatShortInfo[];
  currentChat: ChatShortInfo | null;
  messagesGroup: ChatMessage[];
  chatUsers: User[];
};

const pageProps: Props = {
  currentUser: {} as User,
  chats: [],
  currentChat: null,
  messagesGroup: [],
  chatUsers: [],
};

const modal = new CreateChatModal({
  onSubmit: (name: string) => {
    ChatPageController.createChat(name);
  },
});
export class ChatPage extends Block<Props> {
  // большое количество ререндеров, не могу разобраться как решить
  constructor() {
    const chat = new EmptyChat({
      message: 'Чтобы начать общение выберите чат или создайте новый',
    });

    const chatsList = new ChatList({
      chatsList: pageProps.chats,
      onChatSelect: (selectedChat) => {
        ChatPageController.changeChat(selectedChat);
      },
      currentChat: pageProps.currentChat,
    });

    const addChatButton = new Button({
      type: 'button',
      text: `
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 19C17.771 19 19.657 19 20.828 17.828C22 16.657 22 14.771 22 11C22 7.229 22 5.343 20.828 4.172C19.657 3 17.771 3 14 3H10C6.229 3 4.343 3 3.172 4.172C2 5.343 2 7.229 2 11C2 14.771 2 16.657 3.172 17.828C3.825 18.482 4.7 18.771 6 18.898" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 19C12.764 19 11.402 19.5 10.159 20.145C8.161 21.182 7.162 21.701 6.67 21.37C6.178 21.04 6.271 20.015 6.458 17.966L6.5 17.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.9999 11L9.00038 10.9863M12.0136 8.00049L11.9999 11L12.0136 8.00049ZM11.9999 11L11.9862 13.9995L11.9999 11ZM11.9999 11L14.9994 11.0137L11.9999 11Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      className: 'button button--icon',
      events: {
        click: {
          event: () => {
            (this.children.modal as Block).show();
          },
        },
      },
    });

    super('div', {
      ...pageProps,
      chat,
      chatsList,
      modal,
      addChatButton,
    });

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      this.setProps({
        chats: store.getState().chats ?? [],
        currentChat: store.getState().currentChat,
        currentUser: store.getState().user ?? {},
        chatUsers: store.getState().chat?.users ?? [],
        messagesGroup: store.getState().chat?.messages?.reverse() ?? [],
      });
    });
    ChatPageController.initChatPage();
  }

  componentDidMount(): void {
    (this.children.modal as Block).hide();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (!oldProps.currentChat && !!newProps.currentChat) {
      this.children.chat = new Chat({
        currentUser: this.props.currentUser,
        messages: this.props.messagesGroup,
        currentChat: this.props.currentChat,
        chatUsers: this.props.chatUsers,
        onSendMessage: (message) => {
          ChatPageController.sendMessage(message);
        },
      });
    }

    if (newProps.chats) {
      (this.children.chatsList as Block).setProps({
        chatsList: newProps.chats,
      });
    }

    if (newProps.currentChat?.id) {
      (this.children.chatsList as Block).setProps({
        currentChat: newProps.currentChat,
      });
    }

    if (!isEqual(oldProps.chatUsers, newProps.chatUsers)) {
      (this.children.chat as Block).setProps({
        chatUsers: newProps.chatUsers,
      });
    }

    if (!isEqual(oldProps.messagesGroup, newProps.messagesGroup)) {
      (this.children.chat as Block).setProps({
        messages: newProps.messagesGroup,
      });
    }
    return true;
  }

  render() {
    this.children.currentUser = new UserInfo({
      className: 'user-short-info',
      avatar: new Avatar({
        avatarSrc: this.props.currentUser.avatar ?? '',
        wrapperClassName: 'avatar',
        imageClassName: 'avatar__image',
      }),
      shortInfo: new UserShortInfo({
        className: 'user-short-info__user-info',
        userNameClass: 'user-short-info__user-name',
        userPhoneClass: 'user-short-info__user-phone',
        userName: this.props.currentUser.first_name,
        userPhone: this.props.currentUser.phone,
      }),
    });

    return this.compile(template, this.props);
  }
}
