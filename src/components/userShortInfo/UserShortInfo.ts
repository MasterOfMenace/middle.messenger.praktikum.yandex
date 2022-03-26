import Block, {EventType} from '../block/Block';
import template from './userShortInfo.tmpl';

type UserShortInfoProps = {
  className: string;
  userNameClass: string;
  userPhoneClass: string;
  userName: string;
  userPhone: string;
  events?: Record<string, EventType>;
};

export default class UserShortInfo extends Block<UserShortInfoProps> {
  constructor(props: UserShortInfoProps) {
    super('div', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
