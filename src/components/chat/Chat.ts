import {formSubmitHandler, getTimeFromDate} from '../../utils';
import {Avatar} from '../avatar';
import Block from '../block/Block';
import {ChatShortInfo} from '../chatList/ChatList';
import {List} from '../list';
import {Message} from '../message';
import {NewMessage} from '../newMessage';
import {UserInfo} from '../userInfo';
import {UserShortInfo} from '../userShortInfo';
import template from './chat.tmpl';
import imagePlaceholder from '../../../static/images/image-placeholder.jpg';
import {User} from '../../api/authApi/AuthApi';
import {Button} from '../button';
import {AddUserModal} from '../../AddUserModal/AddUserModal';
import {ChatPageController} from '../../pages/chatPage/chatPage.controller';

type ChatProps = {
  messages: ChatMessage[];
  currentChat: ChatShortInfo | null;
  chatUsers: User[];
  currentUser: User;
  onSendMessage: (message: string) => void;
};

export type ChatMessage = {
  id: number;
  is_read: boolean;
  chat_id: number;
  time: string;
  type: string;
  user_id: string | number;
  content: string;
  file?: ChatFile | null;
};

type ChatFile = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    const newMessage = new NewMessage({
      events: {
        submit: {
          event: (evt) => {
            const {message} = formSubmitHandler(evt);
            (evt.target as HTMLFormElement).reset();

            this.props.onSendMessage(message);
          },
        },
      },
    });

    // пробую сделать сначала просто вывод сообщений, потом группировку по дате

    const messagesGroup = new List({
      className: 'messages-list',
      items: props.messages.map((item) => {
        return new Message({
          avatar: new Avatar({
            avatarSrc: this.props.chatUsers.find((user) => user.id === item.user_id)?.avatar ?? '',
          }),
          message: {
            text: item.content,
            time: getTimeFromDate(item.time),
          },
          className: item.user_id === this.props.currentUser.id ? 'message--current-user' : '',
        });
      }),
    });

    const addUserButton = new Button({
      type: 'button',
      text: `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="2"/>
<path d="M17 22H5.266C4.98238 22.0001 4.70199 21.9398 4.44345 21.8232C4.1849 21.7066 3.9541 21.5364 3.76638 21.3238C3.57865 21.1112 3.43829 20.8611 3.3546 20.5901C3.27092 20.3191 3.24583 20.0334 3.281 19.752L3.671 16.628C3.7617 15.9022 4.11442 15.2346 4.66283 14.7506C5.21125 14.2667 5.91758 13.9997 6.649 14H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 13V19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 16H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
      className: 'button button--icon',
      events: {
        click: {
          event: () => {
            (this.children.modal as Block).show();
          },
        },
      },
    });

    const modal = new AddUserModal({
      onSelectUser: (id: number) => {
        if (id && this.props.currentChat?.id) {
          ChatPageController.addUserToChat(id, this.props.currentChat.id);
        }
      },
    });

    super('main', {
      ...props,
      newMessage,
      messagesGroup,
      addUserButton,
      modal,
    });
  }

  componentDidMount(): void {
    (this.children.modal as Block).hide();
  }

  componentDidUpdate(_: ChatProps, newProps: ChatProps): boolean {
    (this.children.messagesGroup as Block).setProps({
      items: newProps.messages.map((item) => {
        return new Message({
          avatar: new Avatar({
            avatarSrc: this.props.chatUsers.find((user) => user.id === item.user_id)?.avatar ?? '',
            wrapperClassName: 'avatar avatar--message',
          }),
          className: item.user_id === this.props.currentUser.id ? 'message--current-user' : '',
          message: {
            text: item.content,
            time: getTimeFromDate(item.time),
          },
        });
      }),
    });

    // скролл при добавлении новых сообщений подскакивает до самого верха, не придумал как это сделать иначе
    const element = (this.children.messagesGroup as Block)?.getContent();

    setTimeout(() => {
      element?.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth',
      });
    }, 200);

    return true;
  }

  render() {
    this.children.chatInfo = new UserInfo({
      className: 'user-short-info user-short-info--companion',
      avatar: new Avatar({
        avatarSrc: this.props.currentChat?.avatar ?? imagePlaceholder,
        wrapperClassName: 'avatar avatar--message',
        imageClassName: 'avatar__image',
      }),
      shortInfo: new UserShortInfo({
        className: 'user-short-info__user-info',
        userNameClass: 'user-short-info__user-name',
        userPhoneClass: 'user-short-info__user-phone',
        userName: this.props.currentChat?.title ?? '',
        userPhone: '',
      }),
    });

    return this.compile(template, {
      ...this.props,
      chatInfo: this.children.chatInfo,
    });
  }
}
