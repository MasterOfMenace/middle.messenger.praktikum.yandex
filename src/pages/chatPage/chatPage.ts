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
  onSubmit: (name: string) => console.log(name),
  isVisible: false,
});

window.modalChat = modal;

// setTimeout(() => {
//   modal.hide();
// }, 2000);

// modal.hide();
export class ChatPage extends Block<Props> {
  constructor() {
    const chat = new EmptyChat({
      message: 'Чтобы начать общение выберите чат или создайте новый',
    });

    const chats = new ChatList({
      chatsList: pageProps.chats,
      onChatSelect: (selectedChat) => {
        ChatPageController.changeChat(selectedChat);
      },
      currentChat: pageProps.currentChat,
    });

    const addChatButton = new Button({
      type: 'button',
      text: 'Создать чат',
      className: 'button',
      events: {
        click: {
          event: () => {
            console.log('clicked');
            console.log(this.children);
            this.children.modal.show();
          },
        },
      },
    });

    super('div', {
      ...pageProps,
      chat,
      chats,
      modal,
      addChatButton,
    });

    store.subscribe(STORE_EVENTS.UPDATED, () => {
      this.setProps({
        chats: store.getState().chats ?? [],
        currentChat: store.getState().currentChat,
        currentUser: store.getState().user ?? {},
        chatUsers: (store.getState().chat as {users: User[]})?.users ?? [],
        messagesGroup:
          (store.getState().chat as {messages: ChatMessage[]})?.messages?.reverse() ?? [],
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

    if (!isEqual(oldProps.chatUsers, newProps.chatUsers)) {
      (this.children.chat as Block).setProps({
        chatUsers: newProps.chatUsers,
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
    console.log(this.props);

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
