import {formSubmitHandler} from '../../utils';
import {Avatar} from '../avatar';
import Block from '../block/Block';
import {List} from '../list';
import {Message} from '../message';
import {MessageGroup} from '../messageGroup';
import {NewMessage} from '../newMessage';
import {UserInfo} from '../userInfo';
import {UserShortInfo} from '../userShortInfo';
import template from './chat.tmpl';

type ChatProps = {
  // messages: any[];
  messages: ChatMessage[];
  companionInfo: {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    avatar: string;
    email: string;
    phone: string;
  };
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

/*
    структура сообщения
    {
      chat_id: "number",
      time: "string",
      type: "string",
      user_id: "string",
      content: "string",
      file?: {
          id: "number",
          user_id: "number",
          path: "string",
          filename: "string",
          content_type: "string",
          content_size: "number",
          upload_date: "string",
      }
  },
    */

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super('main', props);
  }

  render() {
    this.children.newMessage = new NewMessage({
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

    this.children.messagesGroup = new List({
      className: 'messages',
      items: this.props.messages.map((item) => {
        return new Message({
          // avatar: new Avatar({
          //   ...message.avatar,
          // }),
          message: {
            text: item.content,
            time: item.time,
          },
          // className: item.className,
        });
      }),
    });

    this.children.companion = new UserInfo({
      className: '"user-short-info user-short-info--companion"',
      avatar: new Avatar({
        avatarSrc: this.props.companionInfo.avatar,
        wrapperClassName: '"avatar avatar--message"',
        imageClassName: '"avatar__image"',
      }),
      shortInfo: new UserShortInfo({
        className: '"user-short-info__user-info"',
        userNameClass: '"user-short-info__user-name"',
        userPhoneClass: '"user-short-info__user-phone"',
        userName: this.props.companionInfo.first_name,
        userPhone: this.props.companionInfo.phone,
      }),
    });

    return this.compile(template, {
      ...this.props,
      messagesGroup: this.children.messagesGroup,
      newMessage: this.children.newMessage,
      companion: this.children.companion,
    });
  }
}
