import {formSubmitHandler} from '../../utils';
import {Avatar} from '../avatar';
import Block from '../block/Block';
import {List} from '../list';
import {MessageGroup} from '../messageGroup';
import {NewMessage} from '../newMessage';
import {UserInfo} from '../userInfo';
import {UserShortInfo} from '../userShortInfo';
import template from './chat.tmpl';

type ChatProps = {
  messages: any[];
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
};

export class Chat extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super('main', props);
  }

  render() {
    this.children.newMessage = new NewMessage({
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

    this.children.messagesGroup = new List({
      className: 'messages',
      items: this.props.messages.map((item) => {
        return new MessageGroup({
          date: item.date,
          messages: item.messages,
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
