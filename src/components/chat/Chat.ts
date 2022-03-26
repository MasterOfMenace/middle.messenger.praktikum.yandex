import {formSubmitHandler} from '../../utils';
import {Avatar} from '../avatar';
import Block from '../block/Block';
import {ChatShortInfo} from '../chatList/ChatList';
import {List} from '../list';
import {Message} from '../message';
// import {MessageGroup} from '../messageGroup';
import {NewMessage} from '../newMessage';
import {UserInfo} from '../userInfo';
import {UserShortInfo} from '../userShortInfo';
import template from './chat.tmpl';
import imagePlaceholder from '../../../static/images/image-placeholder.jpg';
import {User} from '../../api/authApi/AuthApi';

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
            this.props.onSendMessage(message);
          },
        },
      },
    });

    // пробую сделать сначала просто вывод сообщений, потом группировку по дате

    // this.children.messagesGroup = new List({
    //   className: 'messages',
    //   items: this.props.messages.map((item) => {
    //     return new MessageGroup({
    //       date: item.date,
    //       messages: item.messages,
    //     });
    //   }),
    // });

    const messagesGroup = new List({
      className: 'messages',
      items: props.messages.map((item) => {
        return new Message({
          avatar: new Avatar({
            avatarSrc: this.props.chatUsers.find((user) => user.id === item.user_id)?.avatar ?? '',
          }),
          message: {
            text: item.content,
            time: item.time,
          },
          className: item.user_id === this.props.currentUser.id ? 'message--current-user' : '',
        });
      }),
    });

    super('main', {
      ...props,
      newMessage,
      messagesGroup,
    });
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
            time: item.time,
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
    this.children.companion = new UserInfo({
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
      companion: this.children.companion,
    });
  }
}
