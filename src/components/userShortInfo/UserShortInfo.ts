import Block from '../block/Block';
import template from './userShortInfo.tmpl';

type UserShortInfoProps = {
  className: string;
  userNameClass: string;
  userPhoneClass: string;
  userName: string;
  userPhone: string;
};

export default class UserShortInfo extends Block<UserShortInfoProps> {
  constructor(props: UserShortInfoProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
